// Attendance Data Model
export class AttendanceModel {
    constructor(data = {}) {
        this.id = data.id || null;
        this.studentId = data.studentId || '';
        this.studentName = data.studentName || '';
        this.enrollmentNo = data.enrollmentNo || '';
        this.department = data.department || '';
        this.date = data.date || new Date().toISOString().split('T')[0];
        this.checkIn = data.checkIn || null;
        this.checkOut = data.checkOut || null;
        this.status = data.status || 'absent'; // 'present', 'absent', 'late', 'excused'
        this.totalClasses = data.totalClasses || 0;
        this.attendedClasses = data.attendedClasses || 0;
        this.remarks = data.remarks || '';
        this.createdAt = data.createdAt || new Date().toISOString();
        this.updatedAt = data.updatedAt || new Date().toISOString();
    }

    // Calculate attendance percentage
    getAttendancePercentage() {
        if (this.totalClasses === 0) return 0;
        return Math.round((this.attendedClasses / this.totalClasses) * 100);
    }

    // Check if attendance is below threshold
    isBelowThreshold(threshold = 75) {
        return this.getAttendancePercentage() < threshold;
    }

    // Validate attendance data
    validate() {
        const errors = [];

        if (!this.studentId) errors.push('Student ID is required');
        if (!this.date) errors.push('Date is required');
        if (!['present', 'absent', 'late', 'excused'].includes(this.status)) {
            errors.push('Invalid status');
        }
        if (this.status === 'present' && !this.checkIn) {
            errors.push('Check-in time required for present status');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    // Convert to JSON
    toJSON() {
        return {
            id: this.id,
            studentId: this.studentId,
            studentName: this.studentName,
            enrollmentNo: this.enrollmentNo,
            department: this.department,
            date: this.date,
            checkIn: this.checkIn,
            checkOut: this.checkOut,
            status: this.status,
            totalClasses: this.totalClasses,
            attendedClasses: this.attendedClasses,
            remarks: this.remarks,
            attendancePercentage: this.getAttendancePercentage(),
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}

// Attendance Collection Manager
export class AttendanceCollection {
    constructor(records = []) {
        this.records = records.map(r => new AttendanceModel(r));
    }

    // Add new attendance record
    add(record) {
        const attendance = new AttendanceModel(record);
        const validation = attendance.validate();

        if (!validation.isValid) {
            throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
        }

        this.records.push(attendance);
        return attendance;
    }

    // Update attendance record
    update(id, updates) {
        const index = this.records.findIndex(r => r.id === id);
        if (index === -1) {
            throw new Error('Attendance record not found');
        }

        this.records[index] = new AttendanceModel({
            ...this.records[index].toJSON(),
            ...updates,
            updatedAt: new Date().toISOString()
        });

        return this.records[index];
    }

    // Delete attendance record
    delete(id) {
        const index = this.records.findIndex(r => r.id === id);
        if (index === -1) {
            throw new Error('Attendance record not found');
        }

        this.records.splice(index, 1);
        return true;
    }

    // Get attendance by student ID
    getByStudentId(studentId) {
        return this.records.filter(r => r.studentId === studentId);
    }

    // Get attendance by date
    getByDate(date) {
        return this.records.filter(r => r.date === date);
    }

    // Get attendance by date range
    getByDateRange(startDate, endDate) {
        return this.records.filter(r => {
            const recordDate = new Date(r.date);
            return recordDate >= new Date(startDate) && recordDate <= new Date(endDate);
        });
    }

    // Get attendance statistics
    getStatistics() {
        const total = this.records.length;
        const present = this.records.filter(r => r.status === 'present').length;
        const absent = this.records.filter(r => r.status === 'absent').length;
        const late = this.records.filter(r => r.status === 'late').length;
        const excused = this.records.filter(r => r.status === 'excused').length;

        return {
            total,
            present,
            absent,
            late,
            excused,
            presentPercentage: total > 0 ? Math.round((present / total) * 100) : 0,
            absentPercentage: total > 0 ? Math.round((absent / total) * 100) : 0
        };
    }

    // Get department-wise statistics
    getDepartmentStatistics() {
        const deptStats = {};

        this.records.forEach(record => {
            if (!deptStats[record.department]) {
                deptStats[record.department] = {
                    total: 0,
                    present: 0,
                    absent: 0,
                    late: 0,
                    excused: 0
                };
            }

            deptStats[record.department].total++;
            deptStats[record.department][record.status]++;
        });

        // Calculate percentages
        Object.keys(deptStats).forEach(dept => {
            const stats = deptStats[dept];
            stats.attendanceRate = Math.round((stats.present / stats.total) * 100);
        });

        return deptStats;
    }

    // Get all records as JSON
    toJSON() {
        return this.records.map(r => r.toJSON());
    }
}
