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
import { Plus } from "lucide-react";
import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";

const formSchema = z.object({
  email: z
    .string()
    .email({
      message: "Enter a valid email.",
    })
    .min(2, {
      message: "Email must be at least 2 characters.",
    }),
  password: z.string(),
});

export function LoginUser() {
  const { toast } = useToast();
  const session = useSession();
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  console.log("Status:", session);

  useEffect(() => {
    session.status === "authenticated" ? router.push("/") : null;
  }, []);

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>, e: any) => {
    e.preventDefault();

    console.log("Success:", values);
    const { email, password } = values;
    try {
      const path = `${process.env.NEXT_PUBLIC_API_URL}/users/login`;
      const body = {
        email: email,
        password: password,
      };
      const res = await axios.post(path, body);
      if (res.status == 200) {
        toast({
          title: "Login Successful",
        });
        localStorage.setItem("user", JSON.stringify(res.data.data));
        router.push("/");
      } else {
        toast({
          title: "Invalid Credentials",
          variant: "destructive",
        });
      }
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Email</FormLabel>
              <FormControl>
                <Input placeholder="user@xyz.com" {...field} />
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
          Log In
        </Button>
      </form>
    </Form>
  );
}
