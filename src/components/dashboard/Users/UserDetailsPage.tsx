"use client";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { DataTable } from "@components/ui/data-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AuthGet } from "@/services/apiService";
import { columns } from "@/app/(dashboard)/transactions/columns";
import logo2 from "@images/ozlogowhite2.png";
export default function UserDetailsPage({ id }: any) {
  const [userDetails, setUserDetails] = useState<any[]>([]);
  const [userData, setUserData] = useState<any>([]);

  const getUserDetails = async () => {
    const path = `${
      process.env.NEXT_PUBLIC_API_URL
    }/payments/userPayments/${id.replace("%40", "@")}`;
    const response = await AuthGet(path);
    if (response.status === 200) {
      const data = response.data;
      const sortedData = data.sort((a: any, b: any) => {
        const dateA = new Date(a.completedAt).getTime();
        const dateB = new Date(b.completedAt).getTime();

        // Handle cases where "completedAt" may not be valid dates
        if (isNaN(dateA) && isNaN(dateB)) {
          return 0;
        } else if (isNaN(dateA)) {
          return 1;
        } else if (isNaN(dateB)) {
          return -1;
        }

        return dateB - dateA;
      });

      const latestEntry = data[0];

      if (latestEntry) {
        // Extract the desired properties
        const { name, email, userRefId } = latestEntry;
        setUserData({ name, email, userRefId });
      }
      setUserDetails(
        sortedData
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
          }),
      );
    }
  };
  useEffect(() => {
    getUserDetails();
  }, []);
  const firstName = userData.name?.split(" ")[0];
  const lastName = userData.name?.split(" ")[1];

  const firstInitial = firstName ? firstName[0].toUpperCase() : "";
  const secondInitial = lastName ? lastName[1].toUpperCase() : "";

  const finalAvatar = firstInitial + secondInitial;
  return (
    <>
      <h2 className="text-2xl font-bold tracking-tight mb-3">
        Customer Information
      </h2>
      <Card>
        <CardHeader>
          {/* <CardTitle>User Information</CardTitle> */}
          {/* <CardDescription>
            <h2 className="text-3xl font-bold tracking-tight">All Users</h2>
            <p className="text-sm text-muted-foreground">{`Manage Users`}</p>
          </CardDescription> */}
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-1">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/055.png" alt="@shadcn" />
              {
                <AvatarFallback className="border border-color-[#fff] rounded-full text-[15px]">
                  {finalAvatar}
                </AvatarFallback>
              }
            </Avatar>
            {userData?.name?.toUpperCase()}
          </h2>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{userData?.email}</p>
          <p className="text-sm text-muted-foreground">{userData?.userRefId}</p>
        </CardContent>
      </Card>

      <DataTable columns={columns as any} data={userDetails} />
    </>
  );
}
