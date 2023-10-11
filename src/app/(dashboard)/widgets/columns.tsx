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
import Link from "next/link";
import Image from "next/image";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: number;
  payment_id: string;
  item_name: string;
  item_cost: number;
  payment_link: any;
  item_image: string;
  processing_fee: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "payment_id",
    header: "Payment ID",
  },

  {
    accessorKey: "item_name",
    header: "Item Name",
  },
  {
    accessorKey: "item_image",
    // header: "Item Image",
    header: ({ column }) => <div className="text-center">Item Image</div>,
    cell: ({ row }) => {
      const imageLink: string = row.getValue("item_image");

      return (
        <Image
          src="/avatars/02.png"
          width={40}
          height={40}
          alt="product Image"
          className="m-auto"
        />
      );
    },
  },

  {
    accessorKey: "item_cost",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Item Cost" />
    ),
  },

  {
    accessorKey: "processing_fee",
    header: "Processing Fee",
  },

  {
    accessorKey: "payment_link",
    header: "Payment Link",
    cell: ({ row }) => {
      const plink: string = row.getValue("payment_link");

      return (
        <a href={plink} className="font-medium" target="_blank">
          {plink.slice(0, 15)}.....
          {plink.slice(30, 42)}
        </a>
      );
    },
  },

  // {
  //   accessorKey: "createdAt",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Created At" />
  //   ),
  // },

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
