"use client";
import { Payment, columns, withdrawalTableColumn } from "./columns";
import { DataTable } from "@components/ui/data-table";
import { Metadata } from "next";
import axios from "axios";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: 1,
      merchantId: "821544776-7",
      quoteId: "876776635-8",
      paymentMode: "crypto",
      transactionFees: "0.3%",
      status: "COMPLETED",
      createdAt: "15/03/2023",
    },
    {
      id: 2,
      merchantId: "460613192-6",
      quoteId: "811488162-3",
      paymentMode: "crypto",
      transactionFees: "0.3%",
      status: "PROCESSING",
      createdAt: "12/12/2022",
    },
    {
      id: 3,
      merchantId: "521820602-4",
      quoteId: "377298984-5",
      paymentMode: "crypto",
      transactionFees: "0.3%",
      status: "COMPLETED",
      createdAt: "30/11/2022",
    },
    {
      id: 4,
      merchantId: "969594195-8",
      quoteId: "046621554-1",
      paymentMode: "crypto",
      transactionFees: "0.3%",
      status: "PROCESSING",
      createdAt: "05/06/2023",
    },
    {
      id: 5,
      merchantId: "121298347-5",
      quoteId: "314059142-X",
      paymentMode: "crypto",
      transactionFees: "0.3%",
      status: "PROCESSING",
      createdAt: "01/04/2023",
    },
    {
      id: 6,
      merchantId: "242594355-2",
      quoteId: "983449362-2",
      paymentMode: "crypto",
      transactionFees: "0.3%",
      status: "COMPLETED",
      createdAt: "05/08/2023",
    },
    {
      id: 7,
      merchantId: "960250570-2",
      quoteId: "443820145-4",
      paymentMode: "crypto",
      transactionFees: "0.3%",
      status: "REJECTED",
      createdAt: "06/01/2023",
    },
    {
      id: 8,
      merchantId: "859565982-6",
      quoteId: "203268709-7",
      paymentMode: "crypto",
      transactionFees: "0.3%",
      status: "COMPLETED",
      createdAt: "05/08/2023",
    },
    {
      id: 9,
      merchantId: "930392710-9",
      quoteId: "708954679-9",
      paymentMode: "crypto",
      transactionFees: "0.3%",
      status: "COMPLETED",
      createdAt: "01/08/2023",
    },
    {
      id: 10,
      merchantId: "112636787-7",
      quoteId: "042925992-1",
      paymentMode: "crypto",
      transactionFees: "0.3%",
      status: "COMPLETED",
      createdAt: "27/10/2022",
    },
    {
      id: 11,
      merchantId: "290583172-3",
      quoteId: "225955556-X",
      paymentMode: "crypto",
      transactionFees: "0.3%",
      status: "COMPLETED",
      createdAt: "14/08/2023",
    },
    {
      id: 12,
      merchantId: "308133775-5",
      quoteId: "455555027-7",
      paymentMode: "crypto",
      transactionFees: "0.3%",
      status: "REJECTED",
      createdAt: "13/01/2023",
    },
    {
      id: 13,
      merchantId: "708842851-2",
      quoteId: "124659015-8",
      paymentMode: "crypto",
      transactionFees: "0.3%",
      status: "ACCEPTED",
      createdAt: "13/07/2023",
    },
    {
      id: 14,
      merchantId: "482039950-0",
      quoteId: "866859195-9",
      paymentMode: "crypto",
      transactionFees: "0.3%",
      status: "ACCEPTED",
      createdAt: "20/01/2023",
    },
    {
      id: 15,
      merchantId: "239279827-3",
      quoteId: "087484751-6",
      paymentMode: "crypto",
      transactionFees: "0.3%",
      status: "COMPLETED",
      createdAt: "20/09/2022",
    },
    {
      id: 16,
      merchantId: "804218985-0",
      quoteId: "427529225-1",
      paymentMode: "crypto",
      transactionFees: "0.3%",
      status: "REJECTED",
      createdAt: "10/02/2023",
    },
    {
      id: 17,
      merchantId: "680220448-7",
      quoteId: "162644702-0",
      paymentMode: "crypto",
      transactionFees: "0.3%",
      status: "ACCEPTED",
      createdAt: "20/08/2023",
    },
    {
      id: 18,
      merchantId: "070607273-1",
      quoteId: "723885918-1",
      paymentMode: "crypto",
      transactionFees: "0.3%",
      status: "COMPLETED",
      createdAt: "20/10/2022",
    },
    {
      id: 19,
      merchantId: "932386334-3",
      quoteId: "102650497-X",
      paymentMode: "crypto",
      transactionFees: "0.3%",
      status: "PROCESSING",
      createdAt: "14/10/2022",
    },
    {
      id: 20,
      merchantId: "975796292-9",
      quoteId: "669397688-3",
      paymentMode: "crypto",
      transactionFees: "0.3%",
      status: "PROCESSING",
      createdAt: "11/06/2023",
    },
    {
      id: 21,
      merchantId: "952875256-X",
      quoteId: "425467319-1",
      paymentMode: "crypto",
      transactionFees: "0.3%",
      status: "ACCEPTED",
      createdAt: "27/11/2022",
    },
    {
      id: 22,
      merchantId: "356525141-7",
      quoteId: "107190818-9",
      paymentMode: "crypto",
      transactionFees: "0.3%",
      status: "COMPLETED",
      createdAt: "26/05/2023",
    },
    {
      id: 23,
      merchantId: "646376469-8",
      quoteId: "206735997-5",
      paymentMode: "crypto",
      transactionFees: "0.3%",
      status: "REJECTED",
      createdAt: "23/11/2022",
    },
    {
      id: 24,
      merchantId: "090284895-X",
      quoteId: "184488615-8",
      paymentMode: "crypto",
      transactionFees: "0.3%",
      status: "ACCEPTED",
      createdAt: "08/10/2022",
    },
    {
      id: 25,
      merchantId: "794309127-2",
      quoteId: "945602109-2",
      paymentMode: "crypto",
      transactionFees: "0.3%",
      status: "ACCEPTED",
      createdAt: "21/09/2022",
    },
    {
      id: 26,
      merchantId: "395282123-3",
      quoteId: "052172889-4",
      paymentMode: "crypto",
      transactionFees: "0.3%",
      status: "ACCEPTED",
      createdAt: "30/06/2023",
    },
    {
      id: 27,
      merchantId: "330423742-9",
      quoteId: "122460135-1",
      paymentMode: "crypto",
      transactionFees: "0.3%",
      status: "COMPLETED",
      createdAt: "30/03/2023",
    },
    {
      id: 28,
      merchantId: "432722515-0",
      quoteId: "741539476-3",
      paymentMode: "crypto",
      transactionFees: "0.3%",
      status: "COMPLETED",
      createdAt: "10/02/2023",
    },
    {
      id: 29,
      merchantId: "096728597-6",
      quoteId: "934149886-4",
      paymentMode: "crypto",
      transactionFees: "0.3%",
      status: "REJECTED",
      createdAt: "12/12/2022",
    },
    {
      id: 30,
      merchantId: "302125842-5",
      quoteId: "391753566-1",
      paymentMode: "crypto",
      transactionFees: "0.3%",
      status: "ACCEPTED",
      createdAt: "26/01/2023",
    },
    {
      id: 31,
      merchantId: "312251582-2",
      quoteId: "694153361-7",
      paymentMode: "crypto",
      transactionFees: "0.3%",
      status: "ACCEPTED",
      createdAt: "15/04/2023",
    },
    {
      id: 32,
      merchantId: "700190048-6",
      quoteId: "938023193-8",
      paymentMode: "crypto",
      transactionFees: "0.3%",
      status: "ACCEPTED",
      createdAt: "01/04/2023",
    },
    {
      id: 33,
      merchantId: "467544346-X",
      quoteId: "218883977-3",
      paymentMode: "crypto",
      transactionFees: "0.3%",
      status: "COMPLETED",
      createdAt: "01/01/2023",
    },
    {
      id: 34,
      merchantId: "089053264-8",
      quoteId: "665565967-1",
      paymentMode: "crypto",
      transactionFees: "0.3%",
      status: "PROCESSING",
      createdAt: "16/10/2022",
    },
    {
      id: 35,
      merchantId: "226798048-7",
      quoteId: "872526774-4",
      paymentMode: "crypto",
      transactionFees: "0.3%",
      status: "REJECTED",
      createdAt: "20/06/2023",
    },
    {
      id: 36,
      merchantId: "649926377-X",
      quoteId: "145392329-2",
      paymentMode: "crypto",
      transactionFees: "0.3%",
      status: "ACCEPTED",
      createdAt: "02/05/2023",
    },
    {
      id: 37,
      merchantId: "094266423-X",
      quoteId: "252507210-3",
      paymentMode: "crypto",
      transactionFees: "0.3%",
      status: "PROCESSING",
      createdAt: "08/04/2023",
    },
    {
      id: 38,
      merchantId: "899339658-2",
      quoteId: "484492358-7",
      paymentMode: "crypto",
      transactionFees: "0.3%",
      status: "COMPLETED",
      createdAt: "11/08/2023",
    },
    {
      id: 39,
      merchantId: "694087752-5",
      quoteId: "413449006-5",
      paymentMode: "crypto",
      transactionFees: "0.3%",
      status: "COMPLETED",
      createdAt: "03/01/2023",
    },
    {
      id: 40,
      merchantId: "013231120-8",
      quoteId: "085263628-8",
      paymentMode: "crypto",
      transactionFees: "0.3%",
      status: "COMPLETED",
      createdAt: "12/07/2023",
    },
    {
      id: 41,
      merchantId: "684981287-4",
      quoteId: "337248375-8",
      paymentMode: "crypto",
      transactionFees: "0.3%",
      status: "COMPLETED",
      createdAt: "28/11/2022",
    },
    {
      id: 42,
      merchantId: "882882285-6",
      quoteId: "203844839-6",
      paymentMode: "crypto",
      transactionFees: "0.3%",
      status: "ACCEPTED",
      createdAt: "30/04/2023",
    },
    {
      id: 43,
      merchantId: "574626418-0",
      quoteId: "292163320-5",
      paymentMode: "crypto",
      transactionFees: "0.3%",
      status: "PROCESSING",
      createdAt: "17/01/2023",
    },
    {
      id: 44,
      merchantId: "093038249-8",
      quoteId: "054045540-7",
      paymentMode: "crypto",
      transactionFees: "0.3%",
      status: "ACCEPTED",
      createdAt: "17/12/2022",
    },
    {
      id: 45,
      merchantId: "004501206-7",
      quoteId: "752699113-1",
      paymentMode: "crypto",
      transactionFees: "0.3%",
      status: "REJECTED",
      createdAt: "16/06/2023",
    },
    {
      id: 46,
      merchantId: "020052230-2",
      quoteId: "297624370-0",
      paymentMode: "crypto",
      transactionFees: "0.3%",
      status: "COMPLETED",
      createdAt: "03/06/2023",
    },
    {
      id: 47,
      merchantId: "616666161-4",
      quoteId: "549891467-9",
      paymentMode: "crypto",
      transactionFees: "0.3%",
      status: "REJECTED",
      createdAt: "10/12/2022",
    },
    {
      id: 48,
      merchantId: "993809210-1",
      quoteId: "308558675-X",
      paymentMode: "crypto",
      transactionFees: "0.3%",
      status: "REJECTED",
      createdAt: "10/05/2023",
    },
    {
      id: 49,
      merchantId: "390669070-9",
      quoteId: "670112463-1",
      paymentMode: "crypto",
      transactionFees: "0.3%",
      status: "ACCEPTED",
      createdAt: "13/02/2023",
    },
    {
      id: 50,
      merchantId: "675087309-X",
      quoteId: "078419452-1",
      paymentMode: "crypto",
      transactionFees: "0.3%",
      status: "PROCESSING",
      createdAt: "01/03/2023",
    },
  ];
}

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
          <DataTable columns={columns} data={transactionsData} />
        </TabsContent>
        <TabsContent value="withdrawals">
          <DataTable columns={withdrawalTableColumn} data={withdrawalData} />
        </TabsContent>
      </Tabs>
    </>
  );
}
