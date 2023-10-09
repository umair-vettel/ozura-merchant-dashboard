import { useTheme } from "next-themes";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Define a TypeScript interface for the Stats object
interface Stats {
  feesCollected: {
    current: number;
    change: number;
  };
  revenue: {
    current: number;
    change: number;
  };
  transactions: {
    current: number;
    change: number;
  };
  averageOrderValue: {
    current: number;
    change: number;
  };
  revenueGraphData: {
    month: number;
    revenue: number;
  }[];
  transactionsGraphData: {
    month: number;
    count: number;
  }[];
}

// Modify the component to accept the Stats interface as props
interface RevenueChartProps {
  stats: Stats;
}

export function RevenueChart({ stats }: RevenueChartProps) {
  const { theme: mode } = useTheme();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue</CardTitle>
        <CardDescription>{`${stats.revenue.change}% from last month`}</CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-[150px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={stats.revenueGraphData} // Use stats.revenueGraphData for the chart data
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Average
                            </span>
                            <span className="font-bold text-muted-foreground">
                              {payload[0].value}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return null;
                }}
              />

              <XAxis
                dataKey="month"
                style={{ fontSize: "12px", color: "#fff", opacity: 1 }}
              />

              <Line
                type="monotone"
                dataKey="today"
                strokeWidth={2}
                activeDot={{
                  r: 8,
                  style: { fill: "var(--theme-primary)" },
                }}
                style={{
                  stroke: "#8db9bb",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
