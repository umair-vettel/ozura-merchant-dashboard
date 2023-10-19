"use client";
import React from "react";
export default function UserDetailsPage({ id }: any) {
  console.log(id.replace("%40", "@"), "ID");
  return (
    <>
      <div className="flex flex-col  space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">All Users</h2>
        <p className="text-sm text-muted-foreground">
          {`Manage Users Transactions`}
        </p>
      </div>
      <div className=" mx-auto "></div>
    </>
  );
}
