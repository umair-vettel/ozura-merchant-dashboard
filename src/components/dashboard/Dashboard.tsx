"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Overview } from "@/components/dashboard/analytics/overview";
import { RecentSales } from "@/components/dashboard/recent-sales";

import { DarsChart } from "@/components/dashboard/analytics/DarsChart";
import { TransactionsChart } from "@/components/dashboard/analytics/TransactionsChart";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import CurrencyPieChart from "@/components/dashboard/analytics/CurrencyPieChart";
import axios from "axios";
import { useEffect, useState } from "react";
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
}
export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    feesCollected: {
      current: 0,
      change: 0,
    },
    revenue: {
      current: 0,
      change: 0,
    },
    transactions: {
      current: 0,
      change: 0,
    },
    averageOrderValue: {
      current: 0,
      change: 0,
    },
  });
  const getStats = async () => {
    try {
      const path = `${process.env.NEXT_PUBLIC_API_URL}/payments/stats`;
      const res = await axios.get(path);
      const data: Stats = res.data;
      setStats(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getStats();
  }, []);
  return (
    <>
      <div className="flex items-center justify-between space-y-2 mb-6">
        <h2 className="text-3xl font-bold tracking-tight">
          Good Afternoon, John!
        </h2>
      </div>

      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Fees Collected
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${stats.feesCollected.current.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                +{stats.feesCollected.change.toLocaleString()}% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Revenue This Month
              </CardTitle>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 10h20" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${stats.revenue.current.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                +{stats.revenue.change.toLocaleString()}% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Transactions
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.transactions.current.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                +{stats.transactions.change.toLocaleString()}% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Average Order Value
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${stats.averageOrderValue.current.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                +{stats.averageOrderValue.change.toLocaleString()} since last
                month
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Revenue</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview />
            </CardContent>
          </Card>

          <div className="col-span-4 md:col-span-3 lg:col-span-4 space-y-4">
            <TransactionsChart />
            <DarsChart />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
          <Card className="col-span-5">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle>Recent Transactions</CardTitle>

              {/* <Link href="/transactions" className="flex gap-2 items-center">
                <span className="hidden md:flex"> View All</span>
                <ArrowRightIcon size={14} />
              </Link> */}
              <Link href="/transactions" className="flex gap-2 items-center">
                <Button
                  variant="outline"
                  size={"default"}
                  type="submit"
                  className="flex gap-2 items-center"
                >
                  <span className="hidden md:flex"> View All</span>
                  <ArrowRightIcon size={14} />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <RecentSales />
            </CardContent>
          </Card>
          <div className="col-span-2 md:col-span-3 lg:col-span-3 space-y-4">
            <CurrencyPieChart />
          </div>
        </div>
      </div>
    </>
  );
}
