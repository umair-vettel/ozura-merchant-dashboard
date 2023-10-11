"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm, SubmitHandler } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Copy, Plus } from "lucide-react";
import { useState } from "react";
import axios from "axios";

const formSchema = z.object({
  item_name: z.string().min(2, {
    message: "Item name must be at least 2 characters.",
  }),
  item_cost: z.string(),
  processing_fee: z.string(),
});

const CreateWidgetForm = ({ getData }: any) => {
  const { toast } = useToast();
  const [successMessage, setsuccessMessage] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [widgetId, setWidgetId] = useState("");
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>, e: any) => {
    e.preventDefault();

    console.log("Success:", values);
    const { item_name, item_cost, processing_fee } = values;
    console.log(values);
    const path = `${process.env.NEXT_PUBLIC_API_URL}/widgets`;
    const body = {
      productName: item_name,
      productPrice: item_cost,
      merchantProcessingFees: processing_fee,
      imageUrl:
        "https://static.vecteezy.com/system/resources/previews/001/189/272/non_2x/ticket-png.png",
    };
    const userData = localStorage.getItem("user") || "";
    const user = JSON.parse(userData);
    const res = await axios.post(path, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
    });

    if (res.status === 201) {
      const widgetId = res.data.data._id;
      setWidgetId(`https://ozura-widget.vercel.app/?widget=${widgetId}`);
      setsuccessMessage(true);
      getData();
    }
    setsuccessMessage(true);
  };

  const copyToClipboard = (link: string) => {
    navigator.clipboard.writeText(link);
    toast({
      variant: "success",
      title: `Link copied Sucessfully`,
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="item_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Item Name</FormLabel>
              <FormControl>
                <Input placeholder="OzuraFest" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="item_cost"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Item Cost(USD)</FormLabel>
              <FormControl>
                <Input type="text" placeholder="255" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="processing_fee"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Processing Fee %</FormLabel>
              <FormControl>
                <Input type="text" placeholder="0.5" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <Label className="text-base">Product Image</Label>

          <Input
            id="picture"
            type="file"
            onChange={(e) => {
              const selectedFile = e.target.files?.[0];
              if (selectedFile) {
                setFile(selectedFile);
              }
            }}
            className="file:bg-[transparent] file:text-grad hover:file:bg-[transparent] border-0 mt-0"
          />
        </div>

        <Button variant="default" size={"full"} type="submit">
          Generate Payment Link
        </Button>

        {successMessage ? (
          <div className="success text-center">
            <div className="text-xxl flex items-center gap-1 justify-center text-green-500 ">
              Link Generated Sucessfully{" "}
              <Check className="text-green-500 mb-1" />
            </div>
            <div
              onClick={() => copyToClipboard(widgetId)}
              className="flex justify-center items-center text-sm gap-2 cursor-pointer"
            >
              <span>
                {widgetId.slice(0, 15)}.....
                {widgetId.slice(30, 42)}
              </span>
              <Copy size={15} />
            </div>
          </div>
        ) : null}
      </form>
    </Form>
  );
};

export default CreateWidgetForm;
