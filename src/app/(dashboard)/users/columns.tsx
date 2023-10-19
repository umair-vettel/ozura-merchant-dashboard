"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/ui/DataTableColumnHeader";
import Link from "next/link";

import EditTransactionFeeModal from "@/app/(dashboard)/merchants/EditTransactionFeeModal";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      const email = row.getValue("email");

      return (
        <Link href={`/users/${email}`} className="font-medium">
          {email as string}
        </Link>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
];

export const userColumns: ColumnDef<any>[] = [
  {
    accessorKey: "index",
    header: "ID",
    cell: ({ row }) => {
      const index = row.getValue("index");
      const email = row.getValue("email");
      return (
        <Link href={`/users/${email}`} className="font-medium">
          {index as string}
        </Link>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const email = row.getValue("email");
      return (
        <Link href={`/users/${email}`} className="font-medium">
          {email as string}
        </Link>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const name = row.getValue("name");
      const email = row.getValue("email");
      return (
        <Link href={`/users/${email}`} className="font-medium">
          {name as string}
        </Link>
      );
    },
  },
  {
    accessorKey: "amountInUSD",
    header: "Amount in USD",
    cell: ({ row }) => {
      const amountInUSD = row.getValue("amountInUSD");
      const email = row.getValue("email");
      return (
        <Link href={`/users/${email}`} className="font-medium">
          {amountInUSD as string}
        </Link>
      );
    },
  },

  {
    accessorKey: "amountInETH",
    header: "Amount in ETH",
    cell: ({ row }) => {
      const amountInETH = row.getValue("amountInETH");
      const email = row.getValue("email");
      return (
        <Link href={`/users/${email}`} className="font-medium">
          {amountInETH as string}
        </Link>
      );
    },
  },
];
