"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import ethIcon from "@images/ethicon.png";
import usdc from "@images/usdc.png";
import usdt from "@images/usdt.png";
import usd from "@images/usd.png";
import BankAccountForm from "./BankAccountForm";
import { Copy } from "lucide-react";
import { toast } from "../ui/use-toast";

type Props = {};

const MyAccount = (props: Props) => {
  const userData = localStorage.getItem("user") || "";
  const user = JSON.parse(userData);
  const demoMerchantAddr = user?.depositAddress;
  const copyToClipboard = (link: string) => {
    navigator.clipboard.writeText(link);
    toast({
      variant: "success",
      title: `Wallet Address Copied Sucessfully`,
    });
  };
  return (
    <div className="flex flex-col  lg:flex-row gap-5">
      <Card className="flex-1 pt-6">
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
        <CardContent className="flex flex-col justify-between h-full">
          <div>
            <Avatar className="h-[80px] w-[80px] m-auto">
              <AvatarImage src="/avatars/04.png" alt="@shadcn" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <div className="merchantName text-2xl font-bold tracking-tight text-center mt-2">
              {user?.name}
            </div>
            <div className="text-md text-center opacity-[0.6]">
              {user?.email}
            </div>

            <Separator className="my-6" />

            <div className="label font-medium text-lg text-center">
              Wallet Address:
            </div>

            <div
              onClick={() => copyToClipboard(demoMerchantAddr)}
              className="flex justify-center items-center text-sm gap-2 cursor-pointer"
            >
              <span>
                {user?.depositAddress}
                {/*  {demoMerchantAddr.slice(0, 15)}.....
                {demoMerchantAddr.slice(30, 42)} */}
              </span>
              <Copy size={15} />
            </div>
          </div>

          <Button
            variant="default"
            size={"full"}
            // className="absolute bottom-0 w-full left-0 mx-6"
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
              <div className="font-bold text-lg">0.0285334 ETH</div>
              <div className="text-md text-center opacity-[0.6]">
                46.842730931016234 USD
              </div>
            </div>
          </div>

          <div className="subCard flex gap-5 items-center rounded-lg border bg-background text-card-foreground shadow-sm px-3 py-5">
            <Image src={usdc} alt="icon" className="max-w-[40px]" />
            <div>
              <div className="font-bold text-lg">0.0285334 USDC</div>
              <div className="text-md text-center opacity-[0.6]">
                46.842730931016234 USD
              </div>
            </div>
          </div>

          <div className="subCard flex gap-5 items-center rounded-lg border bg-background text-card-foreground shadow-sm px-3 py-5">
            <Image src={usdt} alt="icon" className="max-w-[40px]" />
            <div>
              <div className="font-bold text-lg">0.0285334 USDT</div>
              <div className="text-md text-center opacity-[0.6]">
                46.842730931016234 USD
              </div>
            </div>
          </div>

          <div className="subCard flex gap-5 items-center rounded-lg border bg-background text-card-foreground shadow-sm px-3 py-5">
            <Image src={usd} alt="icon" className="max-w-[40px]" />
            <div>
              <div className="font-bold text-lg">$5244</div>
            </div>
          </div>
          <Button variant="default" size={"full"}>
            Withdraw Payment
          </Button>
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
  );
};

export default MyAccount;
