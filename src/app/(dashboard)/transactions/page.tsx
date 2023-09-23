import { Payment, columns } from "./columns";
import { DataTable } from "@components/ui/data-table";
import { Metadata } from "next";
import TransactionsPage from "./transactions";
async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      merchantId: "008581379-6",
      quoteId: "940020729-8",
      paymentMode: "crypto",
      status: "PROCESSING",
      createdAt: "08/10/2022",
    },
    {
      merchantId: "585195088-9",
      quoteId: "710158245-1",
      paymentMode: "crypto",
      status: "REJECTED",
      createdAt: "03/01/2023",
    },
    {
      merchantId: "209719319-6",
      quoteId: "189310587-3",
      paymentMode: "crypto",
      status: "COMPLETED",
      createdAt: "07/07/2023",
    },
    {
      merchantId: "039616189-8",
      quoteId: "631683629-5",
      paymentMode: "crypto",
      status: "PROCESSING",
      createdAt: "22/07/2023",
    },
    {
      merchantId: "977201379-7",
      quoteId: "910608783-3",
      paymentMode: "crypto",
      status: "ACCEPTED",
      createdAt: "25/01/2023",
    },
    {
      merchantId: "113266282-6",
      quoteId: "495440566-1",
      paymentMode: "crypto",
      status: "COMPLETED",
      createdAt: "06/06/2023",
    },
    {
      merchantId: "910731252-0",
      quoteId: "259579261-X",
      paymentMode: "crypto",
      status: "COMPLETED",
      createdAt: "05/02/2023",
    },
    {
      merchantId: "004261488-0",
      quoteId: "032376516-5",
      paymentMode: "crypto",
      status: "ACCEPTED",
      createdAt: "31/12/2022",
    },
    {
      merchantId: "882689508-2",
      quoteId: "730883723-8",
      paymentMode: "crypto",
      status: "PROCESSING",
      createdAt: "03/08/2023",
    },
    {
      merchantId: "875310065-4",
      quoteId: "122986984-0",
      paymentMode: "crypto",
      status: "REJECTED",
      createdAt: "22/12/2022",
    },
    {
      merchantId: "311123645-5",
      quoteId: "991665995-8",
      paymentMode: "crypto",
      status: "ACCEPTED",
      createdAt: "02/04/2023",
    },
    {
      merchantId: "060556050-1",
      quoteId: "722948564-9",
      paymentMode: "crypto",
      status: "PROCESSING",
      createdAt: "02/06/2023",
    },
    {
      merchantId: "606972984-6",
      quoteId: "826554041-8",
      paymentMode: "crypto",
      status: "REJECTED",
      createdAt: "10/01/2023",
    },
    {
      merchantId: "688630939-0",
      quoteId: "491378208-8",
      paymentMode: "crypto",
      status: "PROCESSING",
      createdAt: "09/09/2023",
    },
    {
      merchantId: "625822826-7",
      quoteId: "209317041-8",
      paymentMode: "crypto",
      status: "ACCEPTED",
      createdAt: "20/03/2023",
    },
    {
      merchantId: "563334078-7",
      quoteId: "039354693-4",
      paymentMode: "crypto",
      status: "PROCESSING",
      createdAt: "28/10/2022",
    },
    {
      merchantId: "118671184-1",
      quoteId: "803531348-7",
      paymentMode: "crypto",
      status: "ACCEPTED",
      createdAt: "04/12/2022",
    },
    {
      merchantId: "419366728-6",
      quoteId: "487900572-X",
      paymentMode: "crypto",
      status: "ACCEPTED",
      createdAt: "29/09/2022",
    },
    {
      merchantId: "178572220-4",
      quoteId: "734475717-6",
      paymentMode: "crypto",
      status: "COMPLETED",
      createdAt: "26/12/2022",
    },
    {
      merchantId: "407406552-5",
      quoteId: "386040825-9",
      paymentMode: "crypto",
      status: "PROCESSING",
      createdAt: "10/04/2023",
    },
    {
      merchantId: "665943199-3",
      quoteId: "318792894-3",
      paymentMode: "crypto",
      status: "ACCEPTED",
      createdAt: "01/05/2023",
    },
    {
      merchantId: "094410471-1",
      quoteId: "574124896-9",
      paymentMode: "crypto",
      status: "COMPLETED",
      createdAt: "15/04/2023",
    },
    {
      merchantId: "836529839-2",
      quoteId: "444991059-1",
      paymentMode: "crypto",
      status: "COMPLETED",
      createdAt: "28/08/2023",
    },
    {
      merchantId: "499095957-4",
      quoteId: "757963481-3",
      paymentMode: "crypto",
      status: "ACCEPTED",
      createdAt: "08/03/2023",
    },
    {
      merchantId: "339208174-4",
      quoteId: "628074959-2",
      paymentMode: "crypto",
      status: "PROCESSING",
      createdAt: "22/12/2022",
    },
    {
      merchantId: "192466825-4",
      quoteId: "777735474-4",
      paymentMode: "crypto",
      status: "PROCESSING",
      createdAt: "21/10/2022",
    },
    {
      merchantId: "439628351-2",
      quoteId: "733999635-4",
      paymentMode: "crypto",
      status: "PROCESSING",
      createdAt: "08/09/2023",
    },
    {
      merchantId: "299293580-8",
      quoteId: "570119403-5",
      paymentMode: "crypto",
      status: "REJECTED",
      createdAt: "01/10/2022",
    },
    {
      merchantId: "549293695-6",
      quoteId: "513293800-0",
      paymentMode: "crypto",
      status: "PROCESSING",
      createdAt: "05/09/2023",
    },
    {
      merchantId: "217287308-X",
      quoteId: "965913893-8",
      paymentMode: "crypto",
      status: "ACCEPTED",
      createdAt: "19/06/2023",
    },
    {
      merchantId: "288098450-5",
      quoteId: "288980743-6",
      paymentMode: "crypto",
      status: "ACCEPTED",
      createdAt: "05/12/2022",
    },
    {
      merchantId: "802971585-4",
      quoteId: "005079958-4",
      paymentMode: "crypto",
      status: "COMPLETED",
      createdAt: "12/01/2023",
    },
    {
      merchantId: "438577053-0",
      quoteId: "968698089-X",
      paymentMode: "crypto",
      status: "ACCEPTED",
      createdAt: "03/06/2023",
    },
    {
      merchantId: "274228944-5",
      quoteId: "711979862-6",
      paymentMode: "crypto",
      status: "COMPLETED",
      createdAt: "20/04/2023",
    },
    {
      merchantId: "544566360-4",
      quoteId: "026270081-6",
      paymentMode: "crypto",
      status: "PROCESSING",
      createdAt: "11/11/2022",
    },
    {
      merchantId: "286083661-6",
      quoteId: "956756087-0",
      paymentMode: "crypto",
      status: "REJECTED",
      createdAt: "02/08/2023",
    },
    {
      merchantId: "724734446-6",
      quoteId: "852304843-X",
      paymentMode: "crypto",
      status: "REJECTED",
      createdAt: "17/07/2023",
    },
    {
      merchantId: "323897929-9",
      quoteId: "242249668-7",
      paymentMode: "crypto",
      status: "ACCEPTED",
      createdAt: "04/11/2022",
    },
    {
      merchantId: "392104967-9",
      quoteId: "709792515-9",
      paymentMode: "crypto",
      status: "ACCEPTED",
      createdAt: "03/11/2022",
    },
    {
      merchantId: "478424040-3",
      quoteId: "434083067-4",
      paymentMode: "crypto",
      status: "REJECTED",
      createdAt: "21/10/2022",
    },
    {
      merchantId: "572547907-2",
      quoteId: "166754808-5",
      paymentMode: "crypto",
      status: "COMPLETED",
      createdAt: "21/12/2022",
    },
    {
      merchantId: "374882197-2",
      quoteId: "762507866-3",
      paymentMode: "crypto",
      status: "COMPLETED",
      createdAt: "20/08/2023",
    },
    {
      merchantId: "899300185-5",
      quoteId: "988539161-4",
      paymentMode: "crypto",
      status: "ACCEPTED",
      createdAt: "31/12/2022",
    },
    {
      merchantId: "502596021-5",
      quoteId: "064532279-2",
      paymentMode: "crypto",
      status: "PROCESSING",
      createdAt: "05/05/2023",
    },
    {
      merchantId: "150431380-1",
      quoteId: "042494297-6",
      paymentMode: "crypto",
      status: "PROCESSING",
      createdAt: "12/03/2023",
    },
    {
      merchantId: "429477255-7",
      quoteId: "317879212-0",
      paymentMode: "crypto",
      status: "REJECTED",
      createdAt: "22/11/2022",
    },
    {
      merchantId: "758914532-7",
      quoteId: "579332488-7",
      paymentMode: "crypto",
      status: "ACCEPTED",
      createdAt: "08/01/2023",
    },
    {
      merchantId: "419532858-6",
      quoteId: "791534493-5",
      paymentMode: "crypto",
      status: "PROCESSING",
      createdAt: "16/12/2022",
    },
    {
      merchantId: "059621356-5",
      quoteId: "212168318-6",
      paymentMode: "crypto",
      status: "ACCEPTED",
      createdAt: "01/01/2023",
    },
    {
      merchantId: "114105689-5",
      quoteId: "989641082-8",
      paymentMode: "crypto",
      status: "ACCEPTED",
      createdAt: "16/05/2023",
    },
  ];
}

export const metadata: Metadata = {
  title: "Transactions | Ozura Pay",
  description: "Transactions | Ozura Pay",
};

export default async function DemoPage() {
  //const data = await getData();

  return (
    <>
      <TransactionsPage />
    </>
  );
}
