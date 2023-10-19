"use client";
import { Payment, columns, withdrawalTableColumn } from "./columns";
import { DataTable } from "@components/ui/data-table";
import { Metadata } from "next";
import axios from "axios";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/* 
export const metadata: Metadata = {
  title: "Transactions | Ozura Pay",
  description: "Transactions | Ozura Pay",
};
 */
export default function DemoPage() {
  // const data = await getData();
  const [transactionsData, setTransactionsData] = useState<any>([]);
  const [withdrawalData, setWithdrawalData] = useState<any>([]);
  const [activeTab, setActiveTab] = useState("Deposits");
  const handleTabChange = (tab: any) => {
    setActiveTab(tab);
  };

  const getTransactions = async () => {
    try {
      const path = `${process.env.NEXT_PUBLIC_API_URL}/payments`;
      const userData = localStorage.getItem("user") || "";
      const user = JSON.parse(userData);
      const res = await axios.get(path, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      });
      console.log("API response:", res);
      if (res.status === 200) {
        const payments = res.data
          .filter((item: any) => item.merchantId === user?.id)
          .filter((item: any) => item.status === "COMPLETED")
          .map((item: any, index: any) => {
            return {
              id: index + 1,
              merchantId: item.merchantId,
              transactionHash: item.transactionHash,
              buyer: `${item.userRefId.slice(0, 4)}....${item.userRefId.slice(
                -4,
              )}`,
              productName: item.productName,
              quantity: item.quantity,
              amount:
                item.paymentMethod == "ETH"
                  ? (item.amountInETH / 10 ** 18)?.toFixed(4) + " ETH"
                  : (item.amountInUSD / 10 ** 6)?.toFixed(2) + " USDT",
              transactionFees: item.merchantProcessingFees + "%",
              paymentMode:
                item.paymentMethod != null
                  ? "CRYPTO" + " (" + item.paymentMethod + ")"
                  : "",
              status: item.status,
              completedAt: new Date(item.completedAt).toUTCString(),
              email: item.email,
              name: item.name,
            };
          });

        const withdrawalData = res.data
          .filter((item: any) => item.merchantId === user?.id)
          .filter((item: any) => item.status === "WITHDRAWN")
          .map((item: any, index: any) => {
            return {
              id: index + 1,
              transactionHash: item.transactionHash,
              withdrawalWallet: `${item.depositAddress.slice(
                0,
                4,
              )}....${item.depositAddress.slice()}`,
              amount:
                item.paymentMethod == "ETH"
                  ? (item.amountInETH / 10 ** 18)?.toFixed(2) + " ETH"
                  : "$ " + (item.amountInUSD / 10 ** 6)?.toFixed(2),
              paymentMode:
                item.paymentMethod != null
                  ? "CRYPTO" + " (" + item.paymentMethod + ")"
                  : "",
              status: "COMPLETED",
              completedAt: new Date(item.completedAt).toUTCString(),
            };
          });
        setWithdrawalData(withdrawalData);

        console.log(payments);
        setTransactionsData(payments);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          Transactions
        </h2>
      </div>
      <Tabs defaultValue="deposit" className="w-full">
        <TabsList className="translate-y-[23px] md:translate-y-[56px]">
          <TabsTrigger value="deposit">Deposit</TabsTrigger>
          <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
        </TabsList>
        <TabsContent value="deposit">
          <DataTable columns={columns} data={transactionsData.reverse()} />
        </TabsContent>
        <TabsContent value="withdrawals">
          <DataTable
            columns={withdrawalTableColumn}
            data={withdrawalData.reverse()}
          />
        </TabsContent>
      </Tabs>
    </>
  );
}
