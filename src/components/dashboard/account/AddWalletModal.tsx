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
  refreshData: any;
};

const formSchema = z.object({
  wallet_name: z.string(),
});

const AddWalletModal = (props: Props) => {
  const { toast } = useToast();
  const [successMessage, setsuccessMessage] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>, e: any) => {
    e.preventDefault();

    console.log("Success:", values);
    createNewWallet(values.wallet_name);
  };
  const createNewWallet = async (vaultName: string) => {
    try {
      setLoading(true);
      const path = `${process.env.NEXT_PUBLIC_API_URL}/users/createNewVault`;
      const res = await AuthPost(path, { vaultName: vaultName });
      if (res.status == 200) {
        props?.refreshData();
        toast({
          variant: "success",
          description: "New Wallet Created",
        });
        setIsDialogOpen(false);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger
          onClick={() => setIsDialogOpen(true)}
          className="inline-flex items-center justify-end rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-[#2a213f] h-10 px-4 py-2"
        >
          <div className="flex justify-end">
            <Button>Create Wallet</Button>
          </div>
        </DialogTrigger>
        {isDialogOpen && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mb-3">Create Wallet</DialogTitle>
              <DialogDescription>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="wallet_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">
                            Wallet Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Test Wallet"
                              {...field}
                            />
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
                      Create Wallet
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

export default AddWalletModal;
