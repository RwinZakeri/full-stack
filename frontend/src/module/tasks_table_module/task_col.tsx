"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "title",
    header: "title",
  },
  {
    accessorKey: "description",
    header: "description",
  },
  {
    accessorKey: "status",
    header: "status",
  },
];

export default columns;
