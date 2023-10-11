"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";

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
import { Plus } from "lucide-react";
import axios from "axios";
import { useSignMessage } from "wagmi";

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { ConnectWallet } from "./ConnectWallet";
import { Web3Modal } from "@web3modal/react";

const chains = [polygonMumbai];
const projectId = "9bd8e96770735215658e458c36342a9b";

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

const formSchema = z.object({
  email: z
    .string()
    .email({
      message: "Enter a valid email.",
    })
    .min(2, {
      message: "Username must be at least 2 characters.",
    }),
  password: z.string(),
});

export function RegisterUser() {
  // 1. Define your form.
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>, e: any) => {
    e.preventDefault();

    console.log("Success:", values);
    const { email, password } = values;
    try {
      const path = `${process.env.NEXT_PUBLIC_API_URL}/users/register-merchant`;
      const body = {
        email: email,
        password: password,
      };
      const res = await axios.post(path, body);

      console.log("API response:", res);
      if (res.status === 200) {
        toast({
          title: "New User Registered Sucessfully",
        });
        setTimeout(() => {
          window.open("/login", "_self");
        }, 2000);
        //
      }

      if (res.status === 500) {
        toast({
          title: res.statusText,
          variant: "destructive",
        });
      }

      // res.status === 201 &&
      // 	router.push('/dashboard/login?success=Account has been created');
    } catch (err) {
      // setError(err);
      console.log(err);
      toast({
        title: "Error",
        variant: "destructive",
      });
    }
    console.log(values);
  };
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="user@missglobal.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button variant="default" size={"full"} type="submit">
              Register
            </Button>
          </form>
          <ConnectWallet />
        </Form>
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}
