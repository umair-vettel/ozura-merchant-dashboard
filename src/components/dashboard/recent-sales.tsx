import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function RecentSales({ data }: any) {
  return (
    <div className="space-y-8 ">
      {data?.map((item: any) => (
        <>
          <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/avatars/01.png" alt="Avatar" />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {item?.userRefId}
              </p>
              <div className="text-sm text-muted-foreground hidden md:flex">
                Product: {item?.productName} | Quantity: {item?.quantity}{" "}
              </div>
            </div>
            <div className="ml-auto font-medium">
              +${(item?.amountInUSD / 10 ** 6).toFixed(2)}
            </div>
          </div>
        </>
      ))}
    </div>
  );
}
