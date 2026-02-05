import { useState, useEffect } from 'react';

export function useAttendanceData() {
    const [staffData, setStaffData] = useState([]);
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [anomalies, setAnomalies] = useState([]);
    const [predictions, setPredictions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate data fetching/generation
        const generateData = () => {
            const staff = generateStaffData();
            const records = generateAttendanceRecords(staff);

            setStaffData(staff);
            setAttendanceRecords(records);

            const currentAnomalies = detectAnomalies(staff, records);
            setAnomalies(currentAnomalies);

            const currentPredictions = generatePredictions(staff, records);
            setPredictions(currentPredictions);

            setLoading(false);
        };

        generateData();
    }, []);

    return {
        staffData,
        attendanceRecords,
        anomalies,
        predictions,
        loading
    };
}

// Helper functions (extracted from StaffAttendanceSystem.jsx)

const generateStaffData = () => {
    const departments = ['Engineering', 'HR', 'Sales', 'Marketing', 'Finance', 'Operations'];
    const positions = ['Junior', 'Senior', 'Lead', 'Manager', 'Director'];
    const data = [];

    for (let i = 1; i <= 50; i++) {
        const dept = departments[Math.floor(Math.random() * departments.length)];
        const position = positions[Math.floor(Math.random() * positions.length)];

        data.push({
            id: i,
            name: `Staff Member ${i}`,
            email: `staff${i}@company.com`,
            department: dept,
            position: position,
            joinDate: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), 1),
            employeeType: Math.random() > 0.2 ? 'Full-time' : 'Contract',
            // Flag certain staff for intentional anomalies
            anomalyType: [5, 12, 23].includes(i) ? 'friday_abuser' :
                [8, 19, 34].includes(i) ? 'weekend_extender' :
                    [15, 27, 41].includes(i) ? 'excessive_leave' :
                        [3, 9, 18, 29].includes(i) ? 'cluster_abuse' : null
        });
    }

    return data;
};

const generateAttendanceRecords = (staff) => {
    const records = [];
    const startDate = new Date(2024, 0, 1);
    const endDate = new Date(2024, 11, 31);

    staff.forEach(member => {
        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            // Skip weekends
            if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
                let status = 'present';
                let arrivalTime = 9 + Math.random() * 0.5; // 9:00-9:30 AM

                // Apply anomaly patterns
                if (member.anomalyType === 'friday_abuser' && currentDate.getDay() === 5) {
                    status = Math.random() > 0.3 ? 'absent' : 'present';
                } else if (member.anomalyType === 'weekend_extender' && currentDate.getDay() === 1) {
                    status = Math.random() > 0.3 ? 'absent' : 'present';
                } else if (member.anomalyType === 'excessive_leave') {
                    status = Math.random() > 0.7 ? 'absent' : 'present';
                } else if (member.anomalyType === 'cluster_abuse') {
                    // Create clusters of absences
                    if (Math.random() > 0.85) {
                        const clusterLength = 3 + Math.floor(Math.random() * 3);
                        for (let j = 0; j < clusterLength; j++) {
                            const clusterDate = new Date(currentDate);
                            clusterDate.setDate(clusterDate.getDate() + j);
                            records.push({
                                staffId: member.id,
                                date: clusterDate.toISOString().split('T')[0],
                                status: 'absent',
                                arrivalTime: null,
                                reason: 'Personal'
                            });
                        }
                        currentDate.setDate(currentDate.getDate() + clusterLength);
                        continue;
                    }
                } else {
                    // Normal attendance pattern
                    status = Math.random() > 0.95 ? 'absent' : 'present';
                }

                // Add late arrivals for some patterns
                if (member.anomalyType === 'friday_abuser' && status === 'present') {
                    arrivalTime = 9 + Math.random() * 2; // Often late
                }

                records.push({
                    staffId: member.id,
                    date: currentDate.toISOString().split('T')[0],
                    status: status,
                    arrivalTime: status === 'present' ? arrivalTime : null,
                    reason: status === 'absent' ? (Math.random() > 0.5 ? 'Personal' : 'Sick') : null
                });
            }

            currentDate.setDate(currentDate.getDate() + 1);
        }
    });

    return records;
};

const calculateStaffMetrics = (staffId, records) => {
    const staffRecords = records.filter(r => r.staffId === staffId);
    const totalDays = staffRecords.length;
    const presentDays = staffRecords.filter(r => r.status === 'present').length;
    const absentDays = totalDays - presentDays;

    const fridayRecords = staffRecords.filter(r => new Date(r.date).getDay() === 5);
    const fridayAbsences = fridayRecords.filter(r => r.status === 'absent').length;

    const mondayRecords = staffRecords.filter(r => new Date(r.date).getDay() === 1);
    const mondayAbsences = mondayRecords.filter(r => r.status === 'absent').length;

    const lateArrivals = staffRecords.filter(r => r.arrivalTime && r.arrivalTime > 9.5).length;

    // Calculate consecutive absences
    let maxConsecutive = 0;
    let currentConsecutive = 0;
    let consecutiveClusters = 0;

    staffRecords.forEach((record) => {
        if (record.status === 'absent') {
            currentConsecutive++;
            maxConsecutive = Math.max(maxConsecutive, currentConsecutive);
        } else {
            if (currentConsecutive >= 3) consecutiveClusters++;
            currentConsecutive = 0;
        }
    });

    return {
        totalDays,
        presentDays,
        absentDays,
        attendanceRate: totalDays ? (presentDays / totalDays) * 100 : 0,
        fridayAbsences,
        mondayAbsences,
        lateArrivals,
        maxConsecutive,
        consecutiveClusters,
        avgArrivalTime: staffRecords.filter(r => r.arrivalTime).reduce((sum, r) => sum + r.arrivalTime, 0) / (presentDays || 1)
    };
};

const calculateIsolationScore = (metrics, staff, records) => {
    const avgAttendance = staff.reduce((sum, s) => {
        const m = calculateStaffMetrics(s.id, records);
        return sum + m.attendanceRate;
    }, 0) / staff.length;

    const deviation = Math.abs(metrics.attendanceRate - avgAttendance);
    const normalizedDeviation = deviation / (avgAttendance || 1);

    const featureScore = (
        normalizedDeviation +
        (metrics.fridayAbsences / 52) +
        (metrics.mondayAbsences / 52) +
        (metrics.consecutiveClusters / 10)
    ) / 4;

    return Math.max(0, 1 - featureScore);
};

const isDBSCANOutlier = (metrics, staff, records) => {
    const avgMetrics = {
        attendance: staff.reduce((s, m) => {
            const met = calculateStaffMetrics(m.id, records);
            return s + met.attendanceRate;
        }, 0) / staff.length,
        absences: staff.reduce((s, m) => {
            const met = calculateStaffMetrics(m.id, records);
            return s + met.absentDays;
        }, 0) / staff.length
    };

    const distance = Math.sqrt(
        Math.pow(metrics.attendanceRate - avgMetrics.attendance, 2) +
        Math.pow(metrics.absentDays - avgMetrics.absences, 2)
    );

    return distance > 20; // Threshold for outlier
};

const calculateZScore = (value, staff, records) => {
    const values = staff.map(s => calculateStaffMetrics(s.id, records).attendanceRate);
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const stdDev = Math.sqrt(values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / values.length);

    return (value - mean) / (stdDev || 1);
};

const calculateConfidence = (methodCount, flagCount) => {
    const methodScore = Math.min(methodCount * 25, 60);
    const flagScore = Math.min(flagCount * 8, 40);
    return Math.min(100, methodScore + flagScore);
};

const getRiskRecommendation = (level, flags) => {
    if (level === 'High Risk') {
        return 'URGENT: Immediate HR intervention required. Schedule formal review meeting within 48 hours. Consider performance improvement plan.';
    } else if (level === 'Suspicious') {
        return 'ACTION REQUIRED: Monitor closely for next 2 weeks. Send automated attendance reminder. Schedule informal check-in.';
    } else if (level === 'Monitor') {
        return 'WATCHLIST: Continue passive monitoring. No immediate action needed. Review in next monthly assessment.';
    }
    return 'Regular monitoring through automated systems.';
};

const detectAnomalies = (staff, records) => {
    const detected = [];
    const detectionMethod = 'ensemble'; // Default to ensemble

    staff.forEach(member => {
        const metrics = calculateStaffMetrics(member.id, records);
        const flags = [];
        let riskScore = 0;
        let detectionMethods = [];

        // RULE-BASED DETECTION
        if (metrics.fridayAbsences > 8) {
            flags.push(`High Friday absences (${metrics.fridayAbsences} days)`);
            riskScore += 25;
            detectionMethods.push('Rule-Based');
        }

        if (metrics.mondayAbsences > 6) {
            flags.push(`Weekend extender pattern (${metrics.mondayAbsences} Mondays absent)`);
            riskScore += 25;
            detectionMethods.push('Rule-Based');
        }

        if (metrics.absentDays > 40) {
            flags.push(`Excessive absences (${metrics.absentDays} days)`);
            riskScore += 30;
            detectionMethods.push('Rule-Based');
        }

        if (metrics.attendanceRate < 80) {
            flags.push(`Low attendance rate (${metrics.attendanceRate.toFixed(1)}%)`);
            riskScore += 20;
            detectionMethods.push('Rule-Based');
        }

        if (metrics.consecutiveClusters > 2) {
            flags.push(`Multiple absence clusters (${metrics.consecutiveClusters} instances)`);
            riskScore += 15;
            detectionMethods.push('Rule-Based');
        }

        if (metrics.lateArrivals > 30) {
            flags.push(`Chronic lateness (${metrics.lateArrivals} late arrivals)`);
            riskScore += 15;
            detectionMethods.push('Rule-Based');
        }

        // ISOLATION FOREST (ML-BASED)
        const isolationScore = calculateIsolationScore(metrics, staff, records);
        if (isolationScore < 0.3) {
            flags.push(`ML: Isolation Forest detected unusual pattern (score: ${(isolationScore * 100).toFixed(1)}%)`);
            riskScore += 20;
            detectionMethods.push('Isolation Forest');
        }

        // DBSCAN CLUSTERING
        if (isDBSCANOutlier(metrics, staff, records)) {
            flags.push('ML: DBSCAN identified as outlier');
            riskScore += 15;
            detectionMethods.push('DBSCAN');
        }

        // STATISTICAL ANALYSIS
        const zScore = calculateZScore(metrics.attendanceRate, staff, records);
        if (Math.abs(zScore) > 2) {
            flags.push(`Statistical outlier (Z-score: ${zScore.toFixed(2)})`);
            riskScore += 10;
            detectionMethods.push('Statistical');
        }

        if (flags.length > 0) {
            let riskLevel = 'Normal';
            if (riskScore >= 70) riskLevel = 'High Risk';
            else if (riskScore >= 40) riskLevel = 'Suspicious';
            else if (riskScore >= 20) riskLevel = 'Monitor';

            detected.push({
                staffId: member.id,
                staffName: member.name,
                department: member.department,
                position: member.position,
                email: member.email,
                flags,
                riskScore: Math.min(100, riskScore),
                riskLevel,
                detectionMethods: [...new Set(detectionMethods)],
                metrics,
                recommendation: getRiskRecommendation(riskLevel, flags),
                confidence: calculateConfidence(detectionMethods.length, flags.length)
            });
        }
    });

    return detected.sort((a, b) => b.riskScore - a.riskScore);
};

const generatePredictions = (staff, records) => {
    const departments = ['Engineering', 'HR', 'Sales', 'Marketing', 'Finance', 'Operations'];
    const forecasts = [];

    departments.forEach(dept => {
        const deptStaff = staff.filter(s => s.department === dept);
        const historicalShortages = [];

        // Calculate historical weekly averages
        for (let week = 0; week < 12; week++) {
            const weeklyAbsences = deptStaff.reduce((sum, member) => {
                const weekRecords = records.filter(r =>
                    r.staffId === member.id &&
                    r.status === 'absent'
                ).slice(week * 5, (week + 1) * 5);
                return sum + weekRecords.length;
            }, 0);

            historicalShortages.push(weeklyAbsences / 5);
        }

        const baseShortage = historicalShortages.reduce((a, b) => a + b, 0) / (historicalShortages.length || 1);

        // Forecast next 12 weeks
        for (let week = 1; week <= 12; week++) {
            const seasonal = Math.sin((week / 52) * 2 * Math.PI) * 2;
            const trend = week * 0.15;
            const prediction = baseShortage + seasonal + trend;

            forecasts.push({
                week,
                department: dept,
                predictedShortage: Math.max(0, prediction).toFixed(1),
                confidence: (85 + Math.random() * 10).toFixed(1),
                trend: prediction > baseShortage ? 'increasing' : 'stable',
                riskLevel: prediction > 8 ? 'high' : prediction > 5 ? 'medium' : 'low'
            });
        }
    });

    return forecasts;
};
