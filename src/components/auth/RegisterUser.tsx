"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
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
import "react-phone-number-input/style.css";

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
  first_name: z.string(),
  last_name: z.string(),
  phone: z.string(),
  business_name: z.string(),
  website: z.string(),

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
  console.log(form);

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>, e: any) => {
    e.preventDefault();

    console.log("Success:", values);
    const {
      email,
      password,
      first_name,
      last_name,
      phone,
      business_name,
      website,
    } = values;

    try {
      const path = `${process.env.NEXT_PUBLIC_API_URL}/users/register-merchant`;
      const body = {
        email: email,
        password: password,
        name: first_name + " " + last_name,
        phoneNo: phone,
        businessName: business_name,
        website: website,
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
            <div className="flex flex-col lg:flex-row gap-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your First Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Last Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Phone Number</FormLabel>
                    <FormControl>
                      <Controller
                        name="phone"
                        control={form.control}
                        rules={{
                          required: false,
                          validate: (value) => isValidPhoneNumber(value),
                        }}
                        render={({ field: { onChange, value } }) => (
                          <PhoneInput
                            value={value}
                            onChange={onChange}
                            defaultCountry="TH"
                            id="phone-input"
                          />
                        )}
                      />
                    </FormControl>
                    {form.formState.errors["phone"] && (
                      <p className="text-sm font-medium text-destructive">
                        Invalid Phone
                      </p>
                    )}
                    {/* <FormMessage /> */}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
              <FormField
                control={form.control}
                name="business_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Business Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Ozura" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Website</FormLabel>
                    <FormControl>
                      <Input placeholder="Ozura.io" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
          {/* <ConnectWallet /> */}
        </Form>
      </WagmiConfig>
      {/* <Web3Modal projectId={projectId} ethereumClient={ethereumClient} /> */}
    </>
  );
}
