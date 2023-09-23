"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { DataTable } from "@components/ui/data-table";
import { Payment, columns } from "./columns";

export default function TransactionsPage() {
  const [cryptoTransactions, setCryptoTransactions] = useState<any>([]);
  async function getCryptoTransactions(): Promise<void> {
    try {
      const path = `${process.env.NEXT_PUBLIC_API_URL}/contracts/events`;
      const response = await axios.get(path);
      console.log(response?.data?.data);
      setCryptoTransactions(
        response?.data?.data.map((item: any) => ({
          merchantId: item.merchantId,
          quoteId: "NaN",
          paymentMode: "Crypto",
          status: "COMPLETED",
          createdAt: new Date(item.createdAt),
          tokenId: item.tokenId,
          buyer: item.buyer,
        })),
      );
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getCryptoTransactions();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
      </div>
      <div className=" mx-auto ">
        <DataTable columns={columns} data={cryptoTransactions} />
      </div>
    </>
  );
}
