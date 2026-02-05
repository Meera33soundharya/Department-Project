import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';
export function AttendanceChart({ data }) {
    return (
        <div className="stat-card animate-fade-in">
            <h3 className="text-lg font-semibold text-foreground mb-6">
                Weekly Attendance Overview
            </h3>
            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} barCategoryGap="20%">
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                        <XAxis
                            dataKey="name"
                            tick={{ fill: 'hsl(var(--muted-foreground))' }}
                            axisLine={{ stroke: 'hsl(var(--border))' }}
                        />
                        <YAxis
                            tick={{ fill: 'hsl(var(--muted-foreground))' }}
                            axisLine={{ stroke: 'hsl(var(--border))' }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'hsl(var(--card))',
                                border: '1px solid hsl(var(--border))',
                                borderRadius: '8px',
                            }}
                        />
                        <Legend />
                        <Bar
                            dataKey="present"
                            name="Present"
                            fill="hsl(var(--success))"
                            radius={[4, 4, 0, 0]}
                        />
                        <Bar
                            dataKey="absent"
                            name="Absent"
                            fill="hsl(var(--destructive))"
                            radius={[4, 4, 0, 0]}
                        />
                        <Bar
                            dataKey="late"
                            name="Late"
                            fill="hsl(var(--warning))"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
