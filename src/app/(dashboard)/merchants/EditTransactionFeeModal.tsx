"use client";
import React from "react";

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit3Icon } from "lucide-react";
import { useState } from "react";
import { AuthPost } from "@/services/apiService";

type Props = {
  merchantID: string;
};

const formSchema = z.object({
  processing_fee: z.string(),
});

const EditTransactionFeeModal = (props: Props) => {
  const { toast } = useToast();
  const [successMessage, setsuccessMessage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>, e: any) => {
    e.preventDefault();
    console.log(props, "props");
    console.log("Success:", values);
    const fee = values.processing_fee;
    const merchantId = props.merchantID;
    await updateProcessingFee(fee, merchantId);
  };

  const updateProcessingFee = async (fee: any, merchantID: any) => {
    setLoading(true);
    const path = `${process.env.NEXT_PUBLIC_API_URL}/users/setProcessingFee`;
    const data = {
      processingFee: fee,
      merchantId: merchantID,
    };
    const response = await AuthPost(path, data);
    if (response.status === 200) {
      setsuccessMessage(true);
      toast({
        variant: "success",
        title: `Fee Updates Sucessfully`,
      });
      setShowModal(false);
    } else {
      toast({
        variant: "destructive",
        title: `Error While Updating Fee`,
      });
      setShowModal(false);
      setLoading(false);
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger
          onClick={() => {
            setShowModal(true);
          }}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-[#2a213f] h-10 px-4 py-2"
        >
          <Edit3Icon size={18} />
        </DialogTrigger>
        {showModal && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mb-3">Edit Processing Fee</DialogTitle>
              <DialogDescription>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="processing_fee"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">
                            Processing Fee %
                          </FormLabel>
                          <FormControl>
                            <Input type="text" placeholder="0.5" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      variant="default"
                      size={"full"}
                      type="submit"
                      disabled={loading}
                    >
                      Change Processing Fee
                    </Button>
                  </form>
                </Form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default EditTransactionFeeModal;
