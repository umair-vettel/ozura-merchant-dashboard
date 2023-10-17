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
interface DARSChartProps {
  stats: Stats;
}

export function DARSChart({ stats }: DARSChartProps) {
  const { theme: mode } = useTheme();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Blockchain Fees</CardTitle>
        <CardDescription>
          {stats.transactions.change < 100 &&
            `${stats.transactions.change}% from last month`}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-[150px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={stats.transactionsGraphData}
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
                dataKey="month" // Update dataKey to match the month property in stats.transactionsGraphData
                style={{ fontSize: "12px", color: "#fff", opacity: 1 }}
              />
              <Line
                type="monotone"
                dataKey="revenue" // Update dataKey to match the revenue property in stats.transactionsGraphData
                strokeWidth={2}
                activeDot={{
                  r: 8,
                  style: { fill: "var(--theme-primary)" },
                }}
                style={{
                  stroke: "#8E617E",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
