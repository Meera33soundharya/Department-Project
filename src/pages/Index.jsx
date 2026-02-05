import { MainLayout } from '@/components/layout/MainLayout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { AttendanceChart } from '@/components/dashboard/AttendanceChart';
import { DepartmentPieChart } from '@/components/dashboard/DepartmentPieChart';
import { PerformanceChart } from '@/components/dashboard/PerformanceChart';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { Users, UserCheck, UserX, Award } from 'lucide-react';

// Mock data - In a real app, this would come from an API
const weekData = [
    { name: 'Mon', present: 145, absent: 15, late: 10 },
    { name: 'Tue', present: 152, absent: 10, late: 8 },
    { name: 'Wed', present: 148, absent: 18, late: 4 },
    { name: 'Thu', present: 155, absent: 8, late: 7 },
    { name: 'Fri', present: 142, absent: 22, late: 6 },
];

const departmentData = [
    { name: 'CSE', value: 85, color: 'hsl(var(--primary))' },
    { name: 'ECE', value: 65, color: '#3b82f6' },
    { name: 'ME', value: 45, color: '#10b981' },
    { name: 'CE', value: 35, color: '#f59e0b' },
];

const performanceData = [
    { name: 'Sem 1', avg: 75, top: 92 },
    { name: 'Sem 2', avg: 72, top: 94 },
    { name: 'Sem 3', avg: 78, top: 91 },
    { name: 'Sem 4', avg: 82, top: 96 },
    { name: 'Sem 5', avg: 74, top: 89 },
    { name: 'Sem 6', avg: 79, top: 95 },
];

const Dashboard = () => {
    return (
        <MainLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
                    <p className="text-muted-foreground mt-1">
                        Overview of department attendance and performance
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatsCard
                        title="Total Students"
                        value="200"
                        subtitle="Across 4 Departments"
                        icon={Users}
                        variant="primary"
                        trend={{ value: 5, isPositive: true }}
                    />
                    <StatsCard
                        title="Present Today"
                        value="165"
                        subtitle="82.5% Attendance"
                        icon={UserCheck}
                        variant="success"
                        trend={{ value: 2.5, isPositive: true }}
                    />
                    <StatsCard
                        title="On Leave"
                        value="12"
                        subtitle="Approved Leaves"
                        icon={UserX}
                        variant="warning"
                        trend={{ value: 1, isPositive: false }}
                    />
                    <StatsCard
                        title="Avg Performance"
                        value="78%"
                        subtitle="Current Semester"
                        icon={Award}
                        variant="default"
                        trend={{ value: 3.2, isPositive: true }}
                    />
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <AttendanceChart data={weekData} />
                    <PerformanceChart data={performanceData} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                        <DepartmentPieChart data={departmentData} />
                    </div>
                    <div className="lg:col-span-2">
                        <RecentActivity />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Dashboard;
