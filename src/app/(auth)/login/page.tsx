import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { LoginUser } from "@/components/auth/LoginUser";
import logo from "@/public/ozura-logo.svg";
import CheckAuth from "@/hooks/checkAuth";
export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function AuthenticationPage() {
  return (
    <CheckAuth>
      <div className="container relative flex h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/register"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Register
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex bg lg:max-h-[100vh] lg:overflow-hidden">
          <div className="absolute top-[30px] left-[50px] z-20 flex items-center text-lg font-medium">
            <Link href="/">
              <Image src={logo} alt="logo" />
            </Link>
          </div>
          {/* <div className="absolute bottom-[30px] left-[50px] mr-[50px] z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                The all-in-one solution for merchants looking to expand their
                payment capability.
              </p>
            </blockquote>
          </div> */}

          <div className="w-50% overflow-hidden h-screen overflow-x-hidden flex bg-color-3 flex-wrap relative">
            <div className="w-1/2 h-1/2 flex rounded-[10%_90%_80%_20%/20%_20%_80%_60%] animate-flip bg-color-1"></div>

            <div className="w-1/2 h-1/2 flex rounded-[10%_90%_80%_20%/20%_20%_80%_60%] animate-backflip bg-color-4"></div>

            <div className="w-1/2 h-1/2 flex rounded-[10%_90%_80%_20%/20%_20%_80%_60%] animate-flip bg-color-2"></div>

            <div className="w-1/2 h-1/2 flex rounded-[10%_90%_80%_20%/20%_20%_80%_60%] animate-backflip bg-color-5"></div>

            <div
              className=" backdrop-blur-200"
              style={{
                position: "fixed",
                width: "50vw",
                height: "100%",
                top: 0,
                left: "0px",
                right: "0px",
              }}
            ></div>
          </div>
        </div>
        <div className="lg:p-8 w-full">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex justify-center text-lg font-medium lg:hidden ">
              <Image src={logo} alt="logo" />
            </div>
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
              {/* <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p> */}
            </div>
            <LoginUser />
            {/* <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p> */}
          </div>
        </div>
      </div>
    </CheckAuth>
  );
}
