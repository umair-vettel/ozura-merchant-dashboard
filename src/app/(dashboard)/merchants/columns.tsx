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
  refresh: () => void;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "_id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      const name: any = row.getValue("name");
      const id = row.getValue("_id");
      return (
        <Link href={`/dashboard/merchants/${id}`}>
          <div className="font-medium">{name == null ? "N/A" : name}</div>
        </Link>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "processingFee",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Processing Fee" />
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const merchantID = row.getValue("_id");

      return (
        <EditTransactionFeeModal
          merchantID={merchantID as string}
          refreshData={row?.original?.refresh}
        />
      );
    },
  },
];
