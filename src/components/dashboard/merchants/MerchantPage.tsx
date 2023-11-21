"use client";
import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { AuthGet } from "@/services/apiService";
import { useEffect, useState } from "react";
import { columns } from "@/app/(dashboard)/merchants/columns";
export default function MerchantPage() {
  const [merchants, setMerchants] = useState([]);
  const [loading, setLoading] = useState(false);
  async function getMerchantsData(): Promise<any> {
    try {
      setLoading(true);
      const path = `${process.env.NEXT_PUBLIC_API_URL}/users/merchants`;
      const response = await AuthGet(path);
      if (response.status === 200) {
        console.log(response.data.data.merchants);
        setMerchants(
          response.data.data.merchants.map((item: any, index: any) => {
            return {
              ...item,
              refresh: getMerchantsData,
            };
          }),
        );
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  useEffect(() => {
    getMerchantsData();
  }, []);

  return (
    <>
      <div className="flex flex-col  space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">All Merchants</h2>
        <p className="text-sm text-muted-foreground">
          {`Manage Merchant's Processing fee`}
        </p>
      </div>
      <div className=" mx-auto ">
        <DataTable columns={columns} data={merchants} loading={loading} />
      </div>
    </>
  );
}
