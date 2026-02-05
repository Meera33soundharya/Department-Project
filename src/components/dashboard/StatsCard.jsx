import { cn } from '@/lib/utils';

const variantStyles = {
    default: 'bg-muted text-foreground',
    primary: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
};

export function StatsCard({
    title,
    value,
    subtitle,
    icon: Icon,
    trend,
    variant = 'default',
}) {
    return (
        <div className="stat-card animate-fade-in">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-muted-foreground">{title}</p>
                    <p className="mt-2 text-3xl font-semibold text-foreground">{value}</p>
                    {subtitle && (
                        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
                    )}
                    {trend && (
                        <p
                            className={cn(
                                'mt-2 text-sm font-medium',
                                trend.isPositive ? 'text-success' : 'text-destructive'
                            )}
                        >
                            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}% from last month
                        </p>
                    )}
                </div>
                <div className={cn('rounded-xl p-3', variantStyles[variant])}>
                    <Icon className="h-6 w-6" />
                </div>
            </div>
        </div>
    );
}
