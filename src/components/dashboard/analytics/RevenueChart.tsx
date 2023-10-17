import { useTheme } from "next-themes";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
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
    totalRevenue: number;
  }[];
  transactionsGraphData: {
    month: number;
    totalTransactions: number;
  }[];
}

// Modify the component to accept the Stats interface as props
interface RevenueChartProps {
  stats: Stats;
}

export function RevenueChart({ stats }: RevenueChartProps) {
  const { theme: mode } = useTheme();
  const extendedData = [...stats.revenueGraphData];
  if (extendedData.length < 10) {
    const today = new Date();
    for (let i = 1; i <= 10 - extendedData.length; i++) {
      const date = new Date(today);
      date.setMonth(date.getMonth() - i);
      extendedData.unshift({
        month: date.getMonth(),
        totalRevenue: date.getMonth() * 5,
      });
    }
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue</CardTitle>
        <CardDescription>
          {stats.revenue.change < 100 &&
            `${stats.revenue.change}% from last month`}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={extendedData} // Use stats.revenueGraphData for the chart data
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 30, // Add some bottom margin for XAxis labels
              }}
            >
              <XAxis
                dataKey="month"
                style={{ fontSize: "12px", color: "#fff", opacity: 1 }}
              />
              <YAxis style={{ fontSize: "12px", color: "#fff", opacity: 1 }} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Total Revenue
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
              <Bar
                dataKey="totalRevenue"
                fill="#8db9bb" // Adjust the color as needed
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
