import { DataTable } from "@components/ui/data-table";

export default async function DemoPage() {
  return (
    <>
      <div className="flex flex-col  space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">All Users</h2>
        <p className="text-sm text-muted-foreground">
          {`Manage Merchant's Processing fee`}
        </p>
      </div>
      <div className=" mx-auto "></div>
    </>
  );
}
