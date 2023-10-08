import { Payment, columns } from "./columns";
import { DataTable } from "@components/ui/data-table";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Plus, PlusCircle, PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import CreateWidget from "@/components/dashboard/widget/CreateWidget";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: 1,
      payment_id: "5414218099809730",
      item_name: "Luctus.png",
      item_cost: 1138,
      payment_link:
        "https://ozura-widget.vercel.app/?iframe=651f2f8c422abfb173630b55",
    },
    {
      id: 2,
      payment_id: "30064151383031",
      item_name: "PrimisIn.tiff",
      item_cost: 767,
      payment_link:
        "https://ozura-widget.vercel.app/?iframe=651f2f8c422abfb173630b55",
    },
    {
      id: 3,
      payment_id: "6767742803051694790",
      item_name: "EratId.avi",
      item_cost: 80,
      payment_link:
        "https://ozura-widget.vercel.app/?iframe=651f2f8c422abfb173630b55",
    },
    {
      id: 4,
      payment_id: "6331109794191920",
      item_name: "Curae.mp3",
      item_cost: 1678,
      payment_link:
        "https://ozura-widget.vercel.app/?iframe=651f2f8c422abfb173630b55",
    },
    {
      id: 5,
      payment_id: "5100142546399278",
      item_name: "UltricesPosuere.ppt",
      item_cost: 616,
      payment_link:
        "https://ozura-widget.vercel.app/?iframe=651f2f8c422abfb173630b55",
    },
    {
      id: 6,
      payment_id: "3564666286035589",
      item_name: "MattisNibh.mpeg",
      item_cost: 1021,
      payment_link:
        "https://ozura-widget.vercel.app/?iframe=651f2f8c422abfb173630b55",
    },
    {
      id: 7,
      payment_id: "4508439083051986",
      item_name: "In.xls",
      item_cost: 1976,
      payment_link:
        "https://ozura-widget.vercel.app/?iframe=651f2f8c422abfb173630b55",
    },
    {
      id: 8,
      payment_id: "6334390259204674490",
      item_name: "PraesentIdMassa.mp3",
      item_cost: 1070,
      payment_link:
        "https://ozura-widget.vercel.app/?iframe=651f2f8c422abfb173630b55",
    },
    {
      id: 9,
      payment_id: "4905564368157979340",
      item_name: "MorbiQuisTortor.mov",
      item_cost: 1664,
      payment_link:
        "https://ozura-widget.vercel.app/?iframe=651f2f8c422abfb173630b55",
    },
    {
      id: 10,
      payment_id: "373854440619855",
      item_name: "QuamSollicitudin.mp3",
      item_cost: 831,
      payment_link:
        "https://ozura-widget.vercel.app/?iframe=651f2f8c422abfb173630b55",
    },
    {
      id: 11,
      payment_id: "4026837917340892",
      item_name: "TristiqueFusceCongue.tiff",
      item_cost: 1660,
      payment_link:
        "https://ozura-widget.vercel.app/?iframe=651f2f8c422abfb173630b55",
    },
    {
      id: 12,
      payment_id: "374288718305922",
      item_name: "AliquetMaecenas.pdf",
      item_cost: 451,
      payment_link:
        "https://ozura-widget.vercel.app/?iframe=651f2f8c422abfb173630b55",
    },
    {
      id: 13,
      payment_id: "5007663086817910",
      item_name: "In.xls",
      item_cost: 1605,
      payment_link:
        "https://ozura-widget.vercel.app/?iframe=651f2f8c422abfb173630b55",
    },
    {
      id: 14,
      payment_id: "6333815196047720",
      item_name: "In.jpeg",
      item_cost: 752,
      payment_link:
        "https://ozura-widget.vercel.app/?iframe=651f2f8c422abfb173630b55",
    },
    {
      id: 15,
      payment_id: "4017954440897",
      item_name: "VehiculaCondimentum.png",
      item_cost: 1909,
      payment_link:
        "https://ozura-widget.vercel.app/?iframe=651f2f8c422abfb173630b55",
    },
    {
      id: 16,
      payment_id: "5610801413063829",
      item_name: "OdioInHac.tiff",
      item_cost: 1449,
      payment_link:
        "https://ozura-widget.vercel.app/?iframe=651f2f8c422abfb173630b55",
    },
    {
      id: 17,
      payment_id: "67062784093445446",
      item_name: "AcNibhFusce.mp3",
      item_cost: 1845,
      payment_link:
        "https://ozura-widget.vercel.app/?iframe=651f2f8c422abfb173630b55",
    },
    {
      id: 18,
      payment_id: "4911814542610054",
      item_name: "Ligula.avi",
      item_cost: 1364,
      payment_link:
        "https://ozura-widget.vercel.app/?iframe=651f2f8c422abfb173630b55",
    },
    {
      id: 19,
      payment_id: "5100139222070983",
      item_name: "MagnisDis.tiff",
      item_cost: 871,
      payment_link:
        "https://ozura-widget.vercel.app/?iframe=651f2f8c422abfb173630b55",
    },
    {
      id: 20,
      payment_id: "6392807771412583",
      item_name: "Orci.mov",
      item_cost: 580,
      payment_link:
        "https://ozura-widget.vercel.app/?iframe=651f2f8c422abfb173630b55",
    },
    {
      id: 21,
      payment_id: "3535009570687839",
      item_name: "OdioJustoSollicitudin.tiff",
      item_cost: 63,
      payment_link:
        "https://ozura-widget.vercel.app/?iframe=651f2f8c422abfb173630b55",
    },
    {
      id: 22,
      payment_id: "5602243530295150",
      item_name: "Lobortis.jpeg",
      item_cost: 1829,
      payment_link:
        "https://ozura-widget.vercel.app/?iframe=651f2f8c422abfb173630b55",
    },
    {
      id: 23,
      payment_id: "5002359957457291",
      item_name: "LuctusEtUltrices.png",
      item_cost: 1359,
      payment_link:
        "https://ozura-widget.vercel.app/?iframe=651f2f8c422abfb173630b55",
    },
    {
      id: 24,
      payment_id: "3548048394321709",
      item_name: "Neque.gif",
      item_cost: 1237,
      payment_link:
        "https://ozura-widget.vercel.app/?iframe=651f2f8c422abfb173630b55",
    },
    {
      id: 25,
      payment_id: "3558810364263782",
      item_name: "VulputateJusto.avi",
      item_cost: 1015,
      payment_link:
        "https://ozura-widget.vercel.app/?iframe=651f2f8c422abfb173630b55",
    },
    {
      id: 26,
      payment_id: "201912294495422",
      item_name: "CurabiturInLibero.jpeg",
      item_cost: 1224,
      payment_link:
        "https://ozura-widget.vercel.app/?iframe=651f2f8c422abfb173630b55",
    },
    {
      id: 27,
      payment_id: "3548987871943420",
      item_name: "PrimisInFaucibus.avi",
      item_cost: 482,
      payment_link:
        "https://ozura-widget.vercel.app/?iframe=651f2f8c422abfb173630b55",
    },
    {
      id: 28,
      payment_id: "6304435607275547088",
      item_name: "QuamFringillaRhoncus.mp3",
      item_cost: 239,
      payment_link:
        "https://ozura-widget.vercel.app/?iframe=651f2f8c422abfb173630b55",
    },
    {
      id: 29,
      payment_id: "3544189302986755",
      item_name: "MaurisUllamcorperPurus.mp3",
      item_cost: 544,
      payment_link:
        "https://ozura-widget.vercel.app/?iframe=651f2f8c422abfb173630b55",
    },
    {
      id: 30,
      payment_id: "3549953686473598",
      item_name: "QuisqueErat.mpeg",
      item_cost: 346,
      payment_link:
        "https://ozura-widget.vercel.app/?iframe=651f2f8c422abfb173630b55",
    },
    {
      id: 31,
      payment_id: "5570212011940400",
      item_name: "UltricesPosuere.mp3",
      item_cost: 1432,
      payment_link:
        "https://ozura-widget.vercel.app/?iframe=651f2f8c422abfb173630b55",
    },
    {
      id: 32,
      payment_id: "3581466971711928",
      item_name: "ParturientMontes.ppt",
      item_cost: 827,
      payment_link:
        "https://ozura-widget.vercel.app/?iframe=651f2f8c422abfb173630b55",
    },
    {
      id: 33,
      payment_id: "4175005243420759",
      item_name: "AmetErat.mp3",
      item_cost: 1162,
      payment_link:
        "https://ozura-widget.vercel.app/?iframe=651f2f8c422abfb173630b55",
    },
    {
      id: 34,
      payment_id: "3544160678289140",
      item_name: "SitAmetConsectetuer.mp3",
      item_cost: 1486,
      payment_link:
        "https://ozura-widget.vercel.app/?iframe=651f2f8c422abfb173630b55",
    },
    {
      id: 35,
      payment_id: "5160740093234041",
      item_name: "Nunc.ppt",
      item_cost: 155,
      payment_link:
        "https://ozura-widget.vercel.app/?iframe=651f2f8c422abfb173630b55",
    },
    {
      id: 36,
      payment_id: "5306929679903013",
      item_name: "IdPretium.xls",
      item_cost: 269,
      payment_link:
        "https://ozura-widget.vercel.app/?iframe=651f2f8c422abfb173630b55",
    },
    {
      id: 37,
      payment_id: "5007663881601147",
      item_name: "Duis.avi",
      item_cost: 1554,
      payment_link:
        "https://ozura-widget.vercel.app/?iframe=651f2f8c422abfb173630b55",
    },
    {
      id: 38,
      payment_id: "4936796149298303",
      item_name: "LoremVitae.mov",
      item_cost: 1742,
      payment_link:
        "https://ozura-widget.vercel.app/?iframe=651f2f8c422abfb173630b55",
    },
    {
      id: 39,
      payment_id: "3589689058983936",
      item_name: "AmetNunc.mp3",
      item_cost: 189,
      payment_link:
        "https://ozura-widget.vercel.app/?iframe=651f2f8c422abfb173630b55",
    },
    {
      id: 40,
      payment_id: "4936085470909256277",
      item_name: "FaucibusCursusUrna.xls",
      item_cost: 1749,
      payment_link:
        "https://ozura-widget.vercel.app/?iframe=651f2f8c422abfb173630b55",
    },
    {
      id: 41,
      payment_id: "3573934855184512",
      item_name: "PortaVolutpatErat.avi",
      item_cost: 1064,
      payment_link:
        "https://ozura-widget.vercel.app/?iframe=651f2f8c422abfb173630b55",
    },
    {
      id: 42,
      payment_id: "3546469105267597",
      item_name: "Quam.ppt",
      item_cost: 213,
      payment_link:
        "https://ozura-widget.vercel.app/?iframe=651f2f8c422abfb173630b55",
    },
    {
      id: 43,
      payment_id: "3549593230779411",
      item_name: "DapibusAugue.ppt",
      item_cost: 1392,
      payment_link:
        "https://ozura-widget.vercel.app/?iframe=651f2f8c422abfb173630b55",
    },
    {
      id: 44,
      payment_id: "3565471956105955",
      item_name: "Sit.mpeg",
      item_cost: 1847,
      payment_link:
        "https://ozura-widget.vercel.app/?iframe=651f2f8c422abfb173630b55",
    },
    {
      id: 45,
      payment_id: "3545746751880281",
      item_name: "FelisEu.ppt",
      item_cost: 687,
      payment_link:
        "https://ozura-widget.vercel.app/?iframe=651f2f8c422abfb173630b55",
    },
    {
      id: 46,
      payment_id: "3573694122881502",
      item_name: "MetusAenean.mp3",
      item_cost: 1018,
      payment_link:
        "https://ozura-widget.vercel.app/?iframe=651f2f8c422abfb173630b55",
    },
    {
      id: 47,
      payment_id: "3586681648988858",
      item_name: "Amet.ppt",
      item_cost: 1791,
      payment_link:
        "https://ozura-widget.vercel.app/?iframe=651f2f8c422abfb173630b55",
    },
    {
      id: 48,
      payment_id: "5602221001685919",
      item_name: "Duis.ppt",
      item_cost: 1988,
      payment_link:
        "https://ozura-widget.vercel.app/?iframe=651f2f8c422abfb173630b55",
    },
    {
      id: 49,
      payment_id: "201750875308949",
      item_name: "Dolor.doc",
      item_cost: 1415,
      payment_link:
        "https://ozura-widget.vercel.app/?iframe=651f2f8c422abfb173630b55",
    },
    {
      id: 50,
      payment_id: "30473985311748",
      item_name: "TinciduntNullaMollis.mp3",
      item_cost: 1080,
      payment_link:
        "https://ozura-widget.vercel.app/?iframe=651f2f8c422abfb173630b55",
    },
  ];
}

export const metadata: Metadata = {
  title: "Payment Links | Ozura Pay",
  description: "Payment Links | Ozura Pay",
};

export default async function DemoPage() {
  const data = await getData();

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Payment Links</h2>

        <CreateWidget />
      </div>
      <div className=" mx-auto ">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}