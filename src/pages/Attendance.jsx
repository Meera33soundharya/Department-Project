import { useState } from 'react';
import { Search, Filter, Download, Calendar } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { attendanceData } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const statusStyles = {
    present: 'badge-success',
    absent: 'badge-destructive',
    late: 'badge-warning',
    excused: 'bg-primary/10 text-primary border-primary/20',
};

const statusLabels = {
    present: 'Present',
    absent: 'Absent',
    late: 'Late',
    excused: 'Excused',
};

const Attendance = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const filteredData = attendanceData.filter((record) => {
        const matchesSearch =
            record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.enrollmentNo.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus =
            statusFilter === 'all' || record.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // Handle Today button click
    const handleTodayClick = () => {
        const today = new Date().toISOString().split('T')[0];
        toast.success(`Showing attendance for today: ${today}`, {
            description: `Found ${filteredData.length} records`
        });
    };

    // Handle Export button click
    const handleExportClick = () => {
        try {
            // Create CSV content
            const headers = ['Student Name', 'Enrollment No', 'Department', 'Date', 'Check In', 'Check Out', 'Attendance %', 'Status'];
            const csvData = filteredData.map(record => {
                const attendancePercent = Math.round((record.attendedClasses / record.totalClasses) * 100);
                return [
                    record.studentName,
                    record.enrollmentNo,
                    record.department,
                    record.date,
                    record.checkIn,
                    record.checkOut,
                    `${attendancePercent}%`,
                    record.status
                ].join(',');
            });

            const csv = [headers.join(','), ...csvData].join('\n');

            // Create and download file
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `attendance_${new Date().toISOString().split('T')[0]}.csv`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);

            toast.success('Attendance exported successfully!', {
                description: `${filteredData.length} records exported to CSV`
            });
        } catch (error) {
            toast.error('Export failed', {
                description: 'There was an error exporting the data'
            });
        }
    };

    return (
        <MainLayout>
            <div className="space-y-6">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Attendance</h1>
                        <p className="text-muted-foreground mt-1">
                            Track and manage student attendance records
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm" onClick={handleTodayClick}>
                            <Calendar className="h-4 w-4 mr-2" />
                            Today
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleExportClick}>
                            <Download className="h-4 w-4 mr-2" />
                            Export
                        </Button>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by name, enrollment no, or department..."
                            className="pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[180px]">
                            <Filter className="h-4 w-4 mr-2" />
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="present">Present</SelectItem>
                            <SelectItem value="absent">Absent</SelectItem>
                            <SelectItem value="late">Late</SelectItem>
                            <SelectItem value="excused">Excused</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Table */}
                <div className="stat-card p-0 overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/50">
                                <TableHead className="font-semibold">Student</TableHead>
                                <TableHead className="font-semibold">Department</TableHead>
                                <TableHead className="font-semibold">Date</TableHead>
                                <TableHead className="font-semibold">Check In</TableHead>
                                <TableHead className="font-semibold">Check Out</TableHead>
                                <TableHead className="font-semibold">Attendance %</TableHead>
                                <TableHead className="font-semibold">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredData.map((record) => {
                                const attendancePercent = Math.round(
                                    (record.attendedClasses / record.totalClasses) * 100
                                );
                                return (
                                    <TableRow key={record.id} className="data-table-row">
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                                                    <span className="text-sm font-medium text-primary">
                                                        {record.studentName
                                                            .split(' ')
                                                            .map((n) => n[0])
                                                            .join('')}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-foreground">
                                                        {record.studentName}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {record.enrollmentNo}
                                                    </p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {record.department}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {record.date}
                                        </TableCell>
                                        <TableCell className="font-mono text-sm">
                                            {record.checkIn}
                                        </TableCell>
                                        <TableCell className="font-mono text-sm">
                                            {record.checkOut}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Progress
                                                    value={attendancePercent}
                                                    className="w-16 h-2"
                                                />
                                                <span
                                                    className={cn(
                                                        'text-sm font-medium',
                                                        attendancePercent >= 75
                                                            ? 'text-success'
                                                            : 'text-destructive'
                                                    )}
                                                >
                                                    {attendancePercent}%
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className={cn(statusStyles[record.status])}
                                            >
                                                {statusLabels[record.status]}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-4 gap-4">
                    <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                        <p className="text-sm font-medium text-success">Present</p>
                        <p className="text-2xl font-bold text-success">
                            {attendanceData.filter((r) => r.status === 'present').length}
                        </p>
                    </div>
                    <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                        <p className="text-sm font-medium text-destructive">Absent</p>
                        <p className="text-2xl font-bold text-destructive">
                            {attendanceData.filter((r) => r.status === 'absent').length}
                        </p>
                    </div>
                    <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                        <p className="text-sm font-medium text-warning">Late</p>
                        <p className="text-2xl font-bold text-warning">
                            {attendanceData.filter((r) => r.status === 'late').length}
                        </p>
                    </div>
                    <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                        <p className="text-sm font-medium text-primary">Excused</p>
                        <p className="text-2xl font-bold text-primary">
                            {attendanceData.filter((r) => r.status === 'excused').length}
                        </p>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Attendance;
