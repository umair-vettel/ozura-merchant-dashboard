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

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  bank_name: z.string(),
  account_number: z.string(),
  ifsc_code: z.string(),
  swift_code: z.string(),
});

type Props = {};

const BankAccountForm = (props: Props) => {
  const { toast } = useToast();
  const [successMessage, setsuccessMessage] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>, e: any) => {
    e.preventDefault();

    console.log("Success:", values);
    const { name, account_number, ifsc_code, swift_code, bank_name } = values;

    console.log(values);
    setsuccessMessage(true);
  };

  const demoLink =
    "https://ozura-widget.vercel.app/?iframe=651f2f8c422abfb173630b55";

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
          name="bank_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Bank Name</FormLabel>
              <FormControl>
                <Input placeholder="Bank Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Name</FormLabel>
              <FormControl>
                <Input placeholder="OzuraFest" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="account_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Account Number</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Account Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ifsc_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">IFSC Code</FormLabel>
              <FormControl>
                <Input type="text" placeholder="IFSC Code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="swift_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">SWIFT Code</FormLabel>
              <FormControl>
                <Input type="text" placeholder="SWIFT Code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant="default" size={"full"} type="submit">
          Connect Bank Account
        </Button>

        {successMessage ? (
          <div className="success text-center">
            <div className="text-xxl flex items-center gap-1 justify-center text-green-500 ">
              Link Generated Sucessfully{" "}
              <Check className="text-green-500 mb-1" />
            </div>
            <div
              onClick={() => copyToClipboard(demoLink)}
              className="flex justify-center items-center text-sm gap-2 cursor-pointer"
            >
              <span>
                {demoLink.slice(0, 15)}.....
                {demoLink.slice(30, 42)}
              </span>
              <Copy size={15} />
            </div>
          </div>
        ) : null}
      </form>
    </Form>
  );
};

export default BankAccountForm;
