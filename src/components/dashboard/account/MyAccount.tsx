"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import ethIcon from "@images/ethicon.png";
import usdc from "@images/usdc.png";
import usdt from "@images/usdt.png";
import usd from "@images/usd.png";
import BankAccountForm from "../BankAccountForm";
import { Copy } from "lucide-react";
import { toast } from "../../ui/use-toast";
import axios from "axios";
import WithdrawFunds from "../WithdrawFunds";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OzuraWidgetAPI from "./OzuraWidgetAPI";
import WalletsTable from "./WalletsTable";

type Props = {};

const MyAccount = (props: Props) => {
  const [userData, setUserData] = useState<string | any>(null);
  const [walletBalance, setWalletBalance] = useState<any>({
    ethBalance: "0",
    usdtBalance: "0",
  });
  const [USDValueForETH, setUSDValueForETH] = useState<number>(0);
  useEffect(() => {
    // Retrieve user data from localStorage
    const storedUserData = localStorage.getItem("user");

    if (storedUserData) {
      // Check if the stored data is valid JSON
      try {
        const parsedUserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }
  }, []);
  const getMerchantBalance = async () => {
    try {
      console.log("FETCHING MERCHANT BALANCE");
      const token = userData.token;
      const path = `${process.env.NEXT_PUBLIC_API_URL}/payments/getMerchantBalance`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const res = await axios.get(path, { headers });
      if (res.status == 200) {
        setWalletBalance(res.data);
        const ethBalance = res.data.ethBalance;
        const usdValueForETH = await convertEthToUSD(
          Number(ethBalance) / 10 ** 18
        );
        setUSDValueForETH(Number(usdValueForETH));
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (userData) {
      getMerchantBalance();
    }
  }, [userData]);

  // convert eth to usd using coingecko api
  const convertEthToUSD = async (ethBalance: number) => {
    try {
      const path = `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`;
      const res = await axios.get(path);
      const data = res.data;
      const ethPrice = data.ethereum.usd;
      const usdBalance = ethBalance * ethPrice;
      return usdBalance;
    } catch (err) {
      console.log(err);
    }
  };
  const user = userData;
  const demoMerchantAddr = user?.depositAddress;
  const copyToClipboard = (link: string) => {
    navigator.clipboard.writeText(link);
    toast({
      variant: "success",
      title: `Wallet Address Copied Sucessfully`,
    });
  };
  console.log(user);
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="mb-3">
        <TabsTrigger value="account">My Account</TabsTrigger>
        <TabsTrigger value="api">API</TabsTrigger>
        <TabsTrigger value="wallets">Wallets</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="flex flex-col  lg:flex-row gap-5">
          <Card className="flex-1 pt-6 md:max-w-[33%]">
            {/* <CardHeader className="flex  flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Volume</CardTitle>
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
        </CardHeader> */}
            <CardContent className="flex flex-col justify-between h-full ">
              <div>
                <Avatar className="h-[80px] w-[80px] m-auto">
                  <AvatarImage src="/avatars/04.png" alt="@shadcn" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div className="merchantName text-2xl font-bold tracking-tight text-center mt-2">
                  {user?.name ? user?.name : `Merchant`}
                </div>
                <div className="text-md text-center text-sm opacity-[0.6] break-words">
                  {user?.email ? user?.email : user?.walletAddress}
                </div>
                <Button variant="default" size={"full"}>
                  Connect Wallet
                </Button>

                <Separator className="my-6" />

                <div className="label font-medium text-lg text-center">
                  Wallet Address:
                </div>

                <div
                  onClick={() => copyToClipboard(demoMerchantAddr)}
                  className="flex justify-center items-center text-sm gap-2 cursor-pointer flex-wrap "
                >
                  <div className="break-words block ellipsis1">
                    {/* {user?.depositAddress} */}
                    {user?.depositAddress.slice(0, 15)}.....
                    {user?.depositAddress.slice(30, 42)}
                  </div>
                  <Copy size={15} />
                </div>
              </div>

              {/* <div className="space-y-8">
            <Button
              variant="default"
              size={"full"}
              className="mt-6"
              
            >
              Connect Wallet
            </Button>
          </div> */}

              <Button
                variant="default"
                size={"full"}
                className="mt-6"
                onClick={() => {
                  localStorage.removeItem("user");
                  window.open("/login", "_self");
                }}
              >
                Log Out
              </Button>
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardContent className="py-3 space-y-5 pb-6">
              <div className="merchantName text-2xl font-bold tracking-tight mt-2">
                My Account
              </div>

              <div className="subCard flex gap-5 items-center rounded-lg border bg-background text-card-foreground shadow-sm px-3 py-5">
                <Image src={ethIcon} alt="icon" className="max-w-[40px]" />
                <div>
                  <div className="font-bold text-lg">
                    {(walletBalance.ethBalance / 10 ** 18)?.toFixed(6)} ETH
                  </div>
                  <div className="text-md  opacity-[0.6]">
                    {USDValueForETH.toLocaleString()} USD
                  </div>
                </div>
              </div>

              <div className="subCard flex gap-5 items-center rounded-lg border bg-background text-card-foreground shadow-sm px-3 py-5">
                <Image src={usdt} alt="icon" className="max-w-[40px]" />

                <div>
                  <div className="font-bold text-lg">
                    {(walletBalance.usdtBalance / 10 ** 6)?.toFixed(6)} USDT
                  </div>
                  <div className="text-md  opacity-[0.6]">
                    {(walletBalance.usdtBalance / 10 ** 6).toLocaleString()} USD
                  </div>
                </div>
              </div>

              <div className="subCard flex gap-5 items-center rounded-lg border bg-background text-card-foreground shadow-sm px-3 py-5">
                <Image src={usdc} alt="icon" className="max-w-[40px]" />
                <div>
                  <div className="font-bold text-lg">0 USDC</div>
                  <div className="text-md opacity-[0.6]">0 USD</div>
                </div>
              </div>

              <div className="subCard flex gap-5 items-center rounded-lg border bg-background text-card-foreground shadow-sm px-3 py-5">
                <Image src={usd} alt="icon" className="max-w-[40px]" />
                <div>
                  <div className="font-bold text-lg">$5244</div>
                </div>
              </div>
              <WithdrawFunds getData={getMerchantBalance} />
            </CardContent>
          </Card>

          <Card className="flex-1">
            <CardContent className="py-3 space-y-5 pb-6">
              <div className="merchantName text-2xl font-bold tracking-tight mt-2">
                Banking Details
              </div>
              <BankAccountForm />
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="api">
        <OzuraWidgetAPI />
      </TabsContent>
      <TabsContent value="wallets">
        <WalletsTable />
      </TabsContent>
    </Tabs>
  );
};

export default MyAccount;
