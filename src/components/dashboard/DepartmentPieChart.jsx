import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';


const COLORS = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
    'hsl(var(--chart-5))',
    'hsl(var(--primary))',
];

export function DepartmentPieChart({ data }) {
    return (
        <div className="stat-card animate-fade-in">
            <h3 className="text-lg font-semibold text-foreground mb-6">
                Employee Distribution by Department
            </h3>
            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={2}
                            dataKey="value"
                        >
                            {data.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'hsl(var(--card))',
                                border: '1px solid hsl(var(--border))',
                                borderRadius: '8px',
                            }}
                            formatter={(value) => [`${value} employees`, 'Count']}
                        />
                        <Legend
                            formatter={(value) => (
                                <span style={{ color: 'hsl(var(--foreground))' }}>{value}</span>
                            )}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
