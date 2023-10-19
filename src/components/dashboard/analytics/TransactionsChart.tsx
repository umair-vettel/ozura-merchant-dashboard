import { useTheme } from "next-themes";
import {
  LineChart,
  Line,
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
  last5Transactions: any;
  paymentMethodPercentages: {
    USD: number;
    ETH: number;
    USDT: number;
  };
  totalRevenue: number;
}

// Modify the component to accept the Stats interface as props
interface TransactionsChartProps {
  stats: Stats;
}

export function TransactionsChart({ stats }: TransactionsChartProps) {
  const { theme: mode } = useTheme();

  const extendedData = [...stats.transactionsGraphData];
  if (extendedData.length < 10) {
    const today = new Date();
    for (let i = 1; i <= 10 - extendedData.length; i++) {
      const date = new Date(today);
      date.setMonth(date.getMonth() - i);
      extendedData.unshift({
        month: date.getMonth(),
        totalTransactions: date.getMonth(),
      });
    }
  }
  const monthNames = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  // Custom tick formatter function
  const formatXAxisTick = (value: any) => {
    // Convert month number to abbreviated month name
    const monthNumber = parseInt(value, 10);
    return monthNames[monthNumber - 1]; // Subtract 1 to adjust for array indexing
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transactions</CardTitle>
        <CardDescription>
          {stats.transactions.change < 100 &&
            `${stats.transactions.change}% from last month`}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={extendedData}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 30, // Add some bottom margin for XAxis labels
              }}
            >
              <XAxis
                dataKey="month"
                tickFormatter={formatXAxisTick}
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
                              Total Transactions
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
              <Line
                type="monotone"
                dataKey="totalTransactions" // Update dataKey to match the count property in stats.transactionsGraphData
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
