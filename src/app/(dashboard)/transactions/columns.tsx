"use client";

import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/components/ui/DataTableColumnHeader";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: number;
  merchantId: string;
  quoteId: string;
  transactionFees?: string;
  paymentMode: string;
  status: "ACCEPTED" | "REJECTED" | "COMPLETED" | "PROCESSING";
  createdAt: any;
  amount: string;
  name: string;
  email: string;
  buyer: string;
};

export type Withdrawal = {
  id: number;
  withdrawalWallet: string;
  transactionHash: string;
  paymentMode: string;
  status: "ACCEPTED" | "REJECTED" | "COMPLETED" | "PROCESSING";
  createdAt: any;
  amount: string;
};
export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "transactionHash",
    header: "Transaction Hash",
    cell: ({ row }) => {
      const trxHash: any = row.getValue("transactionHash") || "";
      return (
        <div className="flex items-center space-x-2">
          <div className="flex flex-col">
            <a
              className="font-medium cursor-pointer"
              target="_blank"
              href={`https://mumbai.polygonscan.com/tx/${trxHash}`}
            >
              {trxHash.slice(0, 6)}......{trxHash.slice(-6)}
            </a>
          </div>
        </div>
      );
    },
  },
  /*   {
    accessorKey: "merchantId",
    header: "Merchant ID",
  }, */
  {
    accessorKey: "email",
    header: "Paid By",
    cell: ({ row }) => {
      const email: any = row.original.email;
      const name: any = row.original.name;
      const buyer: any = row.original.buyer;
      return (
        <div className="flex items-center space-x-2">
          <div className="flex flex-col">
            <div className="font-medium">{name}</div>
            <div className="text-gray-500">{email}</div>
            <div className="text-gray-500">{buyer}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "productName",
    header: "Product Name",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "transactionFees",
    header: "Transaction Fees",
  },

  {
    accessorKey: "paymentMode",
    header: "Payment Mode",
  },

  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
  },

  {
    accessorKey: "completedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Completed At" />
    ),
  },

  // {
  //   accessorKey: "email",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Email" />
  //   ),
  // },
  // {
  //   accessorKey: "amount",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Amount" />
  //   ),
  //   cell: ({ row }) => {
  //     const amount = parseFloat(row.getValue("amount"));
  //     const formatted = new Intl.NumberFormat("en-US", {
  //       style: "currency",
  //       currency: "USD",
  //     }).format(amount);

  //     return <div className="font-medium">{formatted}</div>;
  //   },
  // },
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const payment = row.original;

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button
  //             variant="ghost"
  //             className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
  //           >
  //             <DotsHorizontalIcon className="h-4 w-4" />
  //             <span className="sr-only">Open menu</span>
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end" className="w-[160px]">
  //           <DropdownMenuItem>Edit</DropdownMenuItem>
  //           <DropdownMenuItem>Make a copy</DropdownMenuItem>
  //           <DropdownMenuItem>Favorite</DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>
  //             Delete
  //             <DropdownMenuShortcut>⌫</DropdownMenuShortcut>
  //           </DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];

export const withdrawalTableColumn: ColumnDef<Withdrawal>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "transactionHash",
    header: "Transaction Hash",
    cell: ({ row }) => {
      const trxHash: any = row.getValue("transactionHash") || "";
      return (
        <div className="flex items-center space-x-2">
          <div className="flex flex-col">
            <a
              className="font-medium cursor-pointer"
              target="_blank"
              href={`https://mumbai.polygonscan.com/tx/${trxHash}`}
            >
              {trxHash.slice(0, 6)}......{trxHash.slice(-6)}
            </a>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "amount",
    header: "Amount",
  },

  {
    accessorKey: "paymentMode",
    header: "Payment Mode",
  },

  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
  },

  {
    accessorKey: "completedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Completed At" />
    ),
  },
];
