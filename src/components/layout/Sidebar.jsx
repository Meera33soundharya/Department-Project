import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    GraduationCap,
    CalendarCheck,
    BarChart3,
    Settings,
    School,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Attendance', href: '/attendance', icon: CalendarCheck },
    { name: 'Results', href: '/results', icon: BarChart3 },
    { name: 'Students', href: '/students', icon: GraduationCap },
    { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
    const location = useLocation();

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border">
            <div className="flex h-full flex-col">
                {/* Logo */}
                <div className="flex h-16 items-center gap-3 px-6 border-b border-sidebar-border">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary">
                        <School className="h-5 w-5 text-sidebar-primary-foreground" />
                    </div>
                    <div>
                        <h1 className="text-sm font-semibold text-sidebar-foreground">DeptManager</h1>
                        <p className="text-xs text-sidebar-muted">Student Management</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-1 px-3 py-4">
                    {navigation.map((item) => {
                        const isActive = location.pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={cn(
                                    'sidebar-link',
                                    isActive && 'sidebar-link-active'
                                )}
                            >
                                <item.icon className="h-5 w-5" />
                                <span className="text-sm font-medium">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* User Info */}
                <div className="border-t border-sidebar-border p-4">
                    <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-sidebar-accent flex items-center justify-center">
                            <span className="text-sm font-medium text-sidebar-foreground">AD</span>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-sidebar-foreground">Admin</p>
                            <p className="text-xs text-sidebar-muted">admin@university.edu</p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
