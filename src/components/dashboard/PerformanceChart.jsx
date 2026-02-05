import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from 'recharts';

const COLORS = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
    'hsl(var(--chart-5))',
];

export function PerformanceChart({ data }) {
    return (
        <div className="stat-card animate-fade-in">
            <h3 className="text-lg font-semibold text-foreground mb-6">
                Department Performance Scores
            </h3>
            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} layout="vertical" barCategoryGap="20%">
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                        <XAxis
                            type="number"
                            domain={[0, 100]}
                            tick={{ fill: 'hsl(var(--muted-foreground))' }}
                            axisLine={{ stroke: 'hsl(var(--border))' }}
                        />
                        <YAxis
                            type="category"
                            dataKey="name"
                            tick={{ fill: 'hsl(var(--muted-foreground))' }}
                            axisLine={{ stroke: 'hsl(var(--border))' }}
                            width={80}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'hsl(var(--card))',
                                border: '1px solid hsl(var(--border))',
                                borderRadius: '8px',
                            }}
                            formatter={(value) => [`${value}%`, 'Score']}
                        />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                            {data.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
