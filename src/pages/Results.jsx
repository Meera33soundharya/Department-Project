import { useState } from 'react';
import { Search, Filter, Download, Award } from 'lucide-react';
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
import { resultsData } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const gradeStyles = {
    'A+': 'bg-success/10 text-success border-success/20',
    A: 'bg-success/10 text-success border-success/20',
    'B+': 'bg-primary/10 text-primary border-primary/20',
    B: 'bg-primary/10 text-primary border-primary/20',
    C: 'badge-warning',
    D: 'badge-warning',
    F: 'badge-destructive',
};

const statusStyles = {
    pass: 'badge-success',
    fail: 'badge-destructive',
};

const Results = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [gradeFilter, setGradeFilter] = useState('all');

    const filteredData = resultsData.filter((record) => {
        const matchesSearch =
            record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.enrollmentNo.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesGrade = gradeFilter === 'all' || record.grade === gradeFilter;
        return matchesSearch && matchesGrade;
    });

    const passCount = resultsData.filter((r) => r.status === 'pass').length;
    const failCount = resultsData.filter((r) => r.status === 'fail').length;
    const averageMarks =
        resultsData.reduce((acc, r) => acc + r.totalMarks, 0) / resultsData.length;

    // Handle Export button click
    const handleExportResults = () => {
        try {
            const headers = ['Student Name', 'Enrollment No', 'Department', 'Subject', 'Semester', 'Internal', 'External', 'Total', 'Grade', 'Status'];
            const csvData = filteredData.map(record => [
                record.studentName,
                record.enrollmentNo,
                record.department,
                record.subject,
                record.semester,
                record.internalMarks,
                record.externalMarks,
                record.totalMarks,
                record.grade,
                record.status
            ].join(','));

            const csv = [headers.join(','), ...csvData].join('\n');
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `results_${new Date().toISOString().split('T')[0]}.csv`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);

            toast.success('Results exported successfully!', {
                description: `${filteredData.length} results exported to CSV`
            });
        } catch (error) {
            toast.error('Export failed', {
                description: 'There was an error exporting the results'
            });
        }
    };

    return (
        <MainLayout>
            <div className="space-y-6">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">
                            Examination Results
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            View and manage student academic results
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm" onClick={handleExportResults}>
                            <Download className="h-4 w-4 mr-2" />
                            Export Results
                        </Button>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="stat-card">
                        <p className="text-sm font-medium text-muted-foreground">
                            Average Marks
                        </p>
                        <p className="text-3xl font-bold text-foreground mt-2">
                            {averageMarks.toFixed(1)}
                        </p>
                        <Progress value={averageMarks} className="mt-3 h-2" />
                    </div>
                    <div className="stat-card">
                        <p className="text-sm font-medium text-muted-foreground">
                            Pass Rate
                        </p>
                        <p className="text-3xl font-bold text-success mt-2">
                            {Math.round((passCount / resultsData.length) * 100)}%
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                            {passCount} out of {resultsData.length} passed
                        </p>
                    </div>
                    <div className="stat-card">
                        <p className="text-sm font-medium text-muted-foreground">
                            Top Scorers (A+)
                        </p>
                        <p className="text-3xl font-bold text-primary mt-2">
                            {resultsData.filter((r) => r.grade === 'A+').length}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">90+ marks</p>
                    </div>
                    <div className="stat-card">
                        <p className="text-sm font-medium text-muted-foreground">
                            Failed Students
                        </p>
                        <p className="text-3xl font-bold text-destructive mt-2">
                            {failCount}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">Below 40 marks</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by name, subject, or enrollment..."
                            className="pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Select value={gradeFilter} onValueChange={setGradeFilter}>
                        <SelectTrigger className="w-[180px]">
                            <Filter className="h-4 w-4 mr-2" />
                            <SelectValue placeholder="Filter by grade" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Grades</SelectItem>
                            <SelectItem value="A+">A+</SelectItem>
                            <SelectItem value="A">A</SelectItem>
                            <SelectItem value="B+">B+</SelectItem>
                            <SelectItem value="B">B</SelectItem>
                            <SelectItem value="C">C</SelectItem>
                            <SelectItem value="D">D</SelectItem>
                            <SelectItem value="F">F</SelectItem>
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
                                <TableHead className="font-semibold">Subject</TableHead>
                                <TableHead className="font-semibold">Internal</TableHead>
                                <TableHead className="font-semibold">External</TableHead>
                                <TableHead className="font-semibold">Total</TableHead>
                                <TableHead className="font-semibold">Grade</TableHead>
                                <TableHead className="font-semibold">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredData.map((record) => (
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
                                    <TableCell>
                                        <div>
                                            <p className="font-medium text-foreground">
                                                {record.subject}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {record.semester}
                                            </p>
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-mono text-sm">
                                        {record.internalMarks}/30
                                    </TableCell>
                                    <TableCell className="font-mono text-sm">
                                        {record.externalMarks}/70
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold">{record.totalMarks}</span>
                                            <span className="text-muted-foreground">/100</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant="outline"
                                            className={cn(gradeStyles[record.grade])}
                                        >
                                            <Award className="h-3 w-3 mr-1" />
                                            {record.grade}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant="outline"
                                            className={cn(statusStyles[record.status])}
                                        >
                                            {record.status === 'pass' ? 'Pass' : 'Fail'}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </MainLayout>
    );
};

export default Results;
