import { Clock, UserCheck, UserX, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const iconStyles = {
    'check-in': 'bg-success/10 text-success',
    'check-out': 'bg-primary/10 text-primary',
    'late': 'bg-warning/10 text-warning',
    'absent': 'bg-destructive/10 text-destructive',
};

const iconMap = {
    'check-in': UserCheck,
    'check-out': Clock,
    'late': AlertCircle,
    'absent': UserX,
};

export function RecentActivity({ data }) {
    const activities = data || [
        {
            id: 1,
            type: 'check-in',
            message: 'Aarav Sharma marked present',
            time: '9:00 AM',
        },
        {
            id: 2,
            type: 'late',
            message: 'Priya Patel arrived late',
            time: '9:15 AM',
        },
        {
            id: 3,
            type: 'check-in',
            message: 'Rahul Kumar marked present',
            time: '8:55 AM',
        },
        {
            id: 4,
            type: 'absent',
            message: 'Sneha Gupta marked absent',
            time: '10:00 AM',
        },
        {
            id: 5,
            type: 'check-out',
            message: 'Vikram Singh on medical leave',
            time: '9:30 AM',
        },
    ];

    return (
        <div className="stat-card animate-fade-in">
            <h3 className="text-lg font-semibold text-foreground mb-6">Recent Activity</h3>
            <div className="space-y-4">
                {activities.map((activity) => {
                    const Icon = iconMap[activity.type];
                    return (
                        <div
                            key={activity.id}
                            className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                            <div
                                className={cn(
                                    'h-10 w-10 rounded-full flex items-center justify-center',
                                    iconStyles[activity.type]
                                )}
                            >
                                <Icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-foreground truncate">
                                    {activity.message}
                                </p>
                                <p className="text-xs text-muted-foreground">{activity.time}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
