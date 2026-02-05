// Results Data Model
export class ResultModel {
    constructor(data = {}) {
        this.id = data.id || null;
        this.studentId = data.studentId || '';
        this.studentName = data.studentName || '';
        this.enrollmentNo = data.enrollmentNo || '';
        this.department = data.department || '';
        this.semester = data.semester || '';
        this.subject = data.subject || '';
        this.subjectCode = data.subjectCode || '';
        this.internalMarks = data.internalMarks || 0;
        this.externalMarks = data.externalMarks || 0;
        this.totalMarks = data.totalMarks || 0;
        this.maxMarks = data.maxMarks || 100;
        this.grade = data.grade || this.calculateGrade();
        this.gradePoint = data.gradePoint || this.calculateGradePoint();
        this.status = data.status || this.calculateStatus();
        this.examDate = data.examDate || null;
        this.publishedDate = data.publishedDate || null;
        this.remarks = data.remarks || '';
        this.createdAt = data.createdAt || new Date().toISOString();
        this.updatedAt = data.updatedAt || new Date().toISOString();
    }

    // Calculate grade based on total marks
    calculateGrade() {
        const percentage = this.getPercentage();

        if (percentage >= 90) return 'A+';
        if (percentage >= 80) return 'A';
        if (percentage >= 70) return 'B+';
        if (percentage >= 60) return 'B';
        if (percentage >= 50) return 'C';
        if (percentage >= 40) return 'D';
        return 'F';
    }

    // Calculate grade point
    calculateGradePoint() {
        const gradePoints = {
            'A+': 10,
            'A': 9,
            'B+': 8,
            'B': 7,
            'C': 6,
            'D': 5,
            'F': 0
        };

        return gradePoints[this.grade] || 0;
    }

    // Calculate pass/fail status
    calculateStatus() {
        const minPassMarks = this.maxMarks * 0.4; // 40% is passing
        return this.totalMarks >= minPassMarks ? 'pass' : 'fail';
    }

    // Get percentage
    getPercentage() {
        if (this.maxMarks === 0) return 0;
        return Math.round((this.totalMarks / this.maxMarks) * 100);
    }

    // Check if student passed
    isPassed() {
        return this.status === 'pass';
    }

    // Check if result is distinction
    isDistinction() {
        return this.getPercentage() >= 75;
    }

    // Validate result data
    validate() {
        const errors = [];

        if (!this.studentId) errors.push('Student ID is required');
        if (!this.subject) errors.push('Subject is required');
        if (!this.semester) errors.push('Semester is required');

        if (this.internalMarks < 0 || this.internalMarks > 30) {
            errors.push('Internal marks must be between 0 and 30');
        }

        if (this.externalMarks < 0 || this.externalMarks > 70) {
            errors.push('External marks must be between 0 and 70');
        }

        if (this.totalMarks !== this.internalMarks + this.externalMarks) {
            errors.push('Total marks must equal internal + external marks');
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
            semester: this.semester,
            subject: this.subject,
            subjectCode: this.subjectCode,
            internalMarks: this.internalMarks,
            externalMarks: this.externalMarks,
            totalMarks: this.totalMarks,
            maxMarks: this.maxMarks,
            percentage: this.getPercentage(),
            grade: this.grade,
            gradePoint: this.gradePoint,
            status: this.status,
            isPassed: this.isPassed(),
            isDistinction: this.isDistinction(),
            examDate: this.examDate,
            publishedDate: this.publishedDate,
            remarks: this.remarks,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}

// Results Collection Manager
export class ResultsCollection {
    constructor(records = []) {
        this.records = records.map(r => new ResultModel(r));
    }

    // Add new result
    add(record) {
        const result = new ResultModel(record);
        const validation = result.validate();

        if (!validation.isValid) {
            throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
        }

        this.records.push(result);
        return result;
    }

    // Update result
    update(id, updates) {
        const index = this.records.findIndex(r => r.id === id);
        if (index === -1) {
            throw new Error('Result record not found');
        }

        this.records[index] = new ResultModel({
            ...this.records[index].toJSON(),
            ...updates,
            updatedAt: new Date().toISOString()
        });

        return this.records[index];
    }

    // Delete result
    delete(id) {
        const index = this.records.findIndex(r => r.id === id);
        if (index === -1) {
            throw new Error('Result record not found');
        }

        this.records.splice(index, 1);
        return true;
    }

    // Get results by student ID
    getByStudentId(studentId) {
        return this.records.filter(r => r.studentId === studentId);
    }

    // Get results by semester
    getBySemester(semester) {
        return this.records.filter(r => r.semester === semester);
    }

    // Get results by department
    getByDepartment(department) {
        return this.records.filter(r => r.department === department);
    }

    // Calculate student GPA
    calculateGPA(studentId) {
        const studentResults = this.getByStudentId(studentId);
        if (studentResults.length === 0) return 0;

        const totalGradePoints = studentResults.reduce((sum, r) => sum + r.gradePoint, 0);
        return (totalGradePoints / studentResults.length).toFixed(2);
    }

    // Calculate student CGPA (semester-wise)
    calculateCGPA(studentId) {
        const studentResults = this.getByStudentId(studentId);
        if (studentResults.length === 0) return 0;

        // Group by semester
        const semesterGPAs = {};
        studentResults.forEach(result => {
            if (!semesterGPAs[result.semester]) {
                semesterGPAs[result.semester] = [];
            }
            semesterGPAs[result.semester].push(result.gradePoint);
        });

        // Calculate average GPA per semester
        const semesterAverages = Object.values(semesterGPAs).map(gps => {
            return gps.reduce((sum, gp) => sum + gp, 0) / gps.length;
        });

        // Calculate CGPA
        const cgpa = semesterAverages.reduce((sum, avg) => sum + avg, 0) / semesterAverages.length;
        return cgpa.toFixed(2);
    }

    // Get overall statistics
    getStatistics() {
        const total = this.records.length;
        const passed = this.records.filter(r => r.isPassed()).length;
        const failed = total - passed;
        const distinction = this.records.filter(r => r.isDistinction()).length;

        const totalMarks = this.records.reduce((sum, r) => sum + r.totalMarks, 0);
        const averageMarks = total > 0 ? Math.round(totalMarks / total) : 0;

        // Grade distribution
        const gradeDistribution = {};
        this.records.forEach(r => {
            gradeDistribution[r.grade] = (gradeDistribution[r.grade] || 0) + 1;
        });

        return {
            total,
            passed,
            failed,
            distinction,
            passPercentage: total > 0 ? Math.round((passed / total) * 100) : 0,
            failPercentage: total > 0 ? Math.round((failed / total) * 100) : 0,
            averageMarks,
            gradeDistribution
        };
    }

    // Get department-wise statistics
    getDepartmentStatistics() {
        const deptStats = {};

        this.records.forEach(record => {
            if (!deptStats[record.department]) {
                deptStats[record.department] = {
                    total: 0,
                    passed: 0,
                    failed: 0,
                    totalMarks: 0,
                    gradeDistribution: {}
                };
            }

            const stats = deptStats[record.department];
            stats.total++;
            stats.totalMarks += record.totalMarks;

            if (record.isPassed()) {
                stats.passed++;
            } else {
                stats.failed++;
            }

            stats.gradeDistribution[record.grade] = (stats.gradeDistribution[record.grade] || 0) + 1;
        });

        // Calculate averages and percentages
        Object.keys(deptStats).forEach(dept => {
            const stats = deptStats[dept];
            stats.averageMarks = Math.round(stats.totalMarks / stats.total);
            stats.passPercentage = Math.round((stats.passed / stats.total) * 100);
        });

        return deptStats;
    }

    // Get subject-wise statistics
    getSubjectStatistics() {
        const subjectStats = {};

        this.records.forEach(record => {
            if (!subjectStats[record.subject]) {
                subjectStats[record.subject] = {
                    total: 0,
                    passed: 0,
                    totalMarks: 0,
                    highestMarks: 0,
                    lowestMarks: 100
                };
            }

            const stats = subjectStats[record.subject];
            stats.total++;
            stats.totalMarks += record.totalMarks;

            if (record.isPassed()) stats.passed++;
            if (record.totalMarks > stats.highestMarks) stats.highestMarks = record.totalMarks;
            if (record.totalMarks < stats.lowestMarks) stats.lowestMarks = record.totalMarks;
        });

        // Calculate averages
        Object.keys(subjectStats).forEach(subject => {
            const stats = subjectStats[subject];
            stats.averageMarks = Math.round(stats.totalMarks / stats.total);
            stats.passPercentage = Math.round((stats.passed / stats.total) * 100);
        });

        return subjectStats;
    }

    // Get all records as JSON
    toJSON() {
        return this.records.map(r => r.toJSON());
    }
}
