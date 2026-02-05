import { MainLayout } from '@/components/layout/MainLayout';
import { Search, Plus, Mail, BookOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { students } from '@/data/mockData';

const Students = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredStudents = students.filter(
        (student) =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.enrollmentNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.course.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <MainLayout>
            <div className="space-y-6">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Students</h1>
                        <p className="text-muted-foreground mt-1">
                            Manage student records and information
                        </p>
                    </div>
                    <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Student
                    </Button>
                </div>

                {/* Search */}
                <div className="relative max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search students..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Student Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredStudents.map((student) => (
                        <div
                            key={student.id}
                            className="stat-card hover:shadow-md transition-all cursor-pointer"
                        >
                            <div className="flex items-start gap-4">
                                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <span className="text-lg font-semibold text-primary">
                                        {student.name
                                            .split(' ')
                                            .map((n) => n[0])
                                            .join('')}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-foreground truncate">
                                        {student.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {student.enrollmentNo}
                                    </p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                                            {student.department}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-border space-y-2">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <BookOpen className="h-4 w-4" />
                                    <span>{student.course} - Semester {student.semester}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Mail className="h-4 w-4" />
                                    <span className="truncate">{student.email}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
};

export default Students;
