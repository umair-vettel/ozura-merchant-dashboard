"use client";

import { useTheme } from "next-themes";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

// import { useConfig } from "@/hooks/use-config";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { themes } from "@/components/themes";

const data = [
  {
    month: "Apr",
    today: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    month: "May",
    today: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    month: "Jun",
    today: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    month: "Jul",
    today: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    month: "Aug",
    today: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    month: "Sep",
    today: Math.floor(Math.random() * 5000) + 1000,
  },
];

export function DarsChart() {
  const { theme: mode } = useTheme();
  //   const [config] = useConfig();

  //   const theme = themes.find((theme) => theme.name === config.theme);

  return (
    <Card>
      <CardHeader>
        <CardTitle>DARS</CardTitle>
        <CardDescription>+19% from last month</CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-[150px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
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
                          {/* <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Today
                            </span>
                            <span className="font-bold">
                              {payload[1].value}
                            </span>
                          </div> */}
                        </div>
                      </div>
                    );
                  }

                  return null;
                }}
              />

              <XAxis
                dataKey="month"
                // tickLine={false}
                // axisLine={false}
                style={{ fontSize: "12px", color: "#fff", opacity: 1 }}
              />
              {/* <Line
                type="monotone"
                strokeWidth={2}
                dataKey="average"
                activeDot={{
                  r: 6,
                  style: { fill: "var(--theme-primary)", opacity: 0.25 },
                }}
                style={
                  {
                    stroke: "#fff",
                    opacity: 0.25,
                  } as React.CSSProperties
                }
              /> */}
              <Line
                type="monotone"
                dataKey="today"
                strokeWidth={2}
                activeDot={{
                  r: 8,
                  style: { fill: "var(--theme-primary)" },
                }}
                style={
                  {
                    stroke: "#fff",
                  } as React.CSSProperties
                }
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
