"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Overview } from "@/components/dashboard/analytics/overview";
import { RecentSales } from "@/components/dashboard/recent-sales";

import { DARSChart } from "@/components/dashboard/analytics/DarsChart";
import { TransactionsChart } from "@/components/dashboard/analytics/TransactionsChart";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import CurrencyPieChart from "@/components/dashboard/analytics/CurrencyPieChart";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import { RevenueChart } from "./analytics/RevenueChart";
import { NewUsersChart } from "./analytics/NewUsersChart";
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
  newUsersChartData: {
    month: string;
    count: number;
  }[];
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
    revenueGraphData: [],
    transactionsGraphData: [],
    last5Transactions: [],
    paymentMethodPercentages: {
      USD: 0,
      ETH: 0,
      USDT: 0,
    },
    totalRevenue: 0,
    newUsersChartData: [],
  });
  const [userData, setUserData] = useState<any>({});
  const getStats = async () => {
    try {
      const path = `${process.env.NEXT_PUBLIC_API_URL}/payments/stats`;
      const user = localStorage.getItem("user") || "";
      const token = JSON.parse(user).token;

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const res = await axios.get(path, { headers });
      const data: Stats = res.data;
      setStats(data);
    } catch (err) {
      console.log(err);
    }
  };
  const getUserData = async () => {
    try {
      const user = localStorage.getItem("user") || "";
      setUserData(JSON.parse(user));
    } catch (err) {
      console.log(err);
    }
  };
  async function fetchGasData() {
    try {
      const startDate = moment().subtract(30, "days").format("YYYY-MM-DD");
      const endDate = moment().format("YYYY-MM-DD");

      // Make a request to an API that provides historical gas prices for Matic (Polygon)
      const fetch = await axios.get(
        `https://api.coingecko.com/api/v3/coins/polygon/gas_chart?vs_currencies=usd&from=${startDate}&to=${endDate}`,
      );

      // Extract the gas price data from the response
      const gasPriceData = fetch.data["usd"];

      const response = gasPriceData;
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json(); // Parse the JSON response
      console.log("Gas price data:", data);
      // Use the data as needed in your application
    } catch (error) {
      console.error("Error fetching gas data:", error);
    }
  }
  useEffect(() => {
    getStats();
    getUserData();
    fetchGasData();
  }, []);
  return (
    <>
      <div className="flex items-center justify-between space-y-2 mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
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
                ${stats.feesCollected.current.toFixed(4).toLocaleString()}
              </div>
              {stats.feesCollected.change == 0 &&
                stats.feesCollected.change < 100 && (
                  <p className="text-xs text-muted-foreground">
                    +{stats.feesCollected.change.toLocaleString()}% from last
                    month
                  </p>
                )}
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
              {stats.revenue.change < 100 && (
                <p className="text-xs text-muted-foreground">
                  +{stats.revenue.change.toLocaleString()}% from last month
                </p>
              )}
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
              {stats.transactions.change < 100 && (
                <p className="text-xs text-muted-foreground">
                  +{stats.transactions.change.toLocaleString()}% from last month
                </p>
              )}
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
              {stats.averageOrderValue.change < 100 && (
                <p className="text-xs text-muted-foreground">
                  +{stats.averageOrderValue.change.toLocaleString()}% from last
                  month
                </p>
              )}
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
          <Card className="col-span-4">
            <RevenueChart stats={stats} />
          </Card>

          <div className="col-span-4 md:col-span-3 lg:col-span-4 space-y-4">
            <TransactionsChart stats={stats} />
            <NewUsersChart stats={stats} />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
          <Card
            className={stats?.totalRevenue > 0 ? "col-span-5" : "col-span-8"}
          >
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
              <RecentSales data={stats.last5Transactions} />
            </CardContent>
          </Card>
          {stats?.totalRevenue > 0 && (
            <div className="col-span-2 md:col-span-3 lg:col-span-3 space-y-4">
              <CurrencyPieChart
                data={stats?.paymentMethodPercentages}
                totalRevenue={stats?.totalRevenue.toFixed(4)}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
