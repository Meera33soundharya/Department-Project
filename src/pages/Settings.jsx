import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Bell, User, Shield } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const Settings = () => {
    const [name, setName] = useState('Admin User');
    const [email, setEmail] = useState('admin@company.com');
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [attendanceAlerts, setAttendanceAlerts] = useState(true);
    const [performanceReports, setPerformanceReports] = useState(false);
    const [twoFactorAuth, setTwoFactorAuth] = useState(false);

    const handleSaveProfile = () => {
        toast.success('Profile updated successfully!', {
            description: 'Your changes have been saved'
        });
    };

    const handleChangePassword = () => {
        toast.info('Change Password', {
            description: 'Password change feature coming soon'
        });
    };

    const handleToggle = (setting, value) => {
        const messages = {
            emailNotifications: value ? 'Email notifications enabled' : 'Email notifications disabled',
            attendanceAlerts: value ? 'Attendance alerts enabled' : 'Attendance alerts disabled',
            performanceReports: value ? 'Performance reports enabled' : 'Performance reports disabled',
            twoFactorAuth: value ? 'Two-factor authentication enabled' : 'Two-factor authentication disabled'
        };

        toast.success('Settings updated', {
            description: messages[setting]
        });
    };

    return (
        <MainLayout>
            <div className="space-y-6 max-w-2xl">
                {/* Page Header */}
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Settings</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage your application preferences
                    </p>
                </div>

                {/* Profile Section */}
                <div className="stat-card space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-foreground">Profile</h2>
                            <p className="text-sm text-muted-foreground">
                                Update your personal information
                            </p>
                        </div>
                    </div>
                    <Separator />
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <Button className="w-fit" onClick={handleSaveProfile}>
                            Save Changes
                        </Button>
                    </div>
                </div>

                {/* Notifications Section */}
                <div className="stat-card space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Bell className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-foreground">
                                Notifications
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                Configure notification preferences
                            </p>
                        </div>
                    </div>
                    <Separator />
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-foreground">Email Notifications</p>
                                <p className="text-sm text-muted-foreground">
                                    Receive email updates
                                </p>
                            </div>
                            <Switch
                                checked={emailNotifications}
                                onCheckedChange={(checked) => {
                                    setEmailNotifications(checked);
                                    handleToggle('emailNotifications', checked);
                                }}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-foreground">
                                    Attendance Alerts
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Get notified about attendance issues
                                </p>
                            </div>
                            <Switch
                                checked={attendanceAlerts}
                                onCheckedChange={(checked) => {
                                    setAttendanceAlerts(checked);
                                    handleToggle('attendanceAlerts', checked);
                                }}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-foreground">
                                    Performance Reports
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Weekly performance summaries
                                </p>
                            </div>
                            <Switch
                                checked={performanceReports}
                                onCheckedChange={(checked) => {
                                    setPerformanceReports(checked);
                                    handleToggle('performanceReports', checked);
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Security Section */}
                <div className="stat-card space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Shield className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-foreground">Security</h2>
                            <p className="text-sm text-muted-foreground">
                                Manage your security settings
                            </p>
                        </div>
                    </div>
                    <Separator />
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-foreground">
                                    Two-Factor Authentication
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Add an extra layer of security
                                </p>
                            </div>
                            <Switch
                                checked={twoFactorAuth}
                                onCheckedChange={(checked) => {
                                    setTwoFactorAuth(checked);
                                    handleToggle('twoFactorAuth', checked);
                                }}
                            />
                        </div>
                        <Button variant="outline" onClick={handleChangePassword}>
                            Change Password
                        </Button>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Settings;
