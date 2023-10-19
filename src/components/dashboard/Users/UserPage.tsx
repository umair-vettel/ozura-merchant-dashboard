"use client";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { AuthGet } from "@/services/apiService";
import { DataTable } from "@/components/ui/data-table";
import { userColumns } from "@/app/(dashboard)/users/columns";
export default function UserPage() {
  const [userData, setUserData] = useState([]);

  const getAllUsers = async () => {
    const path = `${process.env.NEXT_PUBLIC_API_URL}/payments/userPayments`;
    const res = await AuthGet(path);
    console.log(res.data);
    const mappedData = res.data.map((user: any, index: any) => {
      return {
        index: index + 1,
        ...user,
        amountInUSD: (Number(user.amountInUSD) / 10 ** 6).toFixed(2),
        amountInETH: (Number(user.amountInETH) / 10 ** 18).toFixed(5),
      };
    });
    setUserData(mappedData);
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <>
      <div className="flex flex-col  space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">All Users</h2>
        <p className="text-sm text-muted-foreground">{`Manage Users`}</p>
      </div>
      <div className=" mx-auto ">
        <DataTable columns={userColumns} data={userData} />
      </div>
    </>
  );
}
