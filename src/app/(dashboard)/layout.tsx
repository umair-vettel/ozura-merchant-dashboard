"use client";
import { Toaster } from "@/components/ui/toaster";
import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { UserNav } from "@/components/dashboard/user-nav";
import { Search } from "@/components/dashboard/search";
import { MainNav } from "@/components/dashboard/main-nav";
import TeamSwitcher from "@/components/dashboard/team-switcher";
import AuthProvider from "@/context/AuthProvider";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/ozura-logo.svg";
import logo2 from "@images/ozlogowhite2.png";
import {
  AppWindow,
  ArrowLeftRight,
  LayoutDashboard,
  LogOutIcon,
  Settings,
  UserCog2,
  Users,
} from "lucide-react";
import CheckAuth from "@/hooks/checkAuth";
const inter = Inter({ subsets: ["latin"] });

const metatitle = "Ozura";
const metadescription = `Ozura`;
const websiteURL = "https://ozura-merchant-dashboard.vercel.app";
const socialImg = `${websiteURL}/social.jpeg`;

export const metadata: Metadata = {
  title: metatitle,
  description: metadescription,
  openGraph: {
    type: "website",
    url: websiteURL,
    title: metatitle,
    description: metadescription,
    siteName: metatitle,
    images: [
      {
        url: socialImg,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: metatitle,
    creator: metatitle,
    title: metatitle,
    description: metadescription,
    images: socialImg,
  },
  // manifest: "/manifest.json",
  // icons: {
  //   apple: "/icon.png",
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CheckAuth>
      <html lang="en" className="dark">
        <body className={inter.className}>
          <main>
            <ThemeProvider attribute="class" defaultTheme="dark">
              <AuthProvider>
                <div className=" flex-col flex">
                  {/* <div className="border-b">
                    <div className="container flex h-16 items-center px-4 md:px-8">
                      <TeamSwitcher />
                      <ThemeSwitch />
                      <Link href="/">
                        <Image src={logo} alt="logo" />
                      </Link>
                      <MainNav className="lg:mx-6 fixed w-[250px] h-screen left-[-100%] top-0 bg-[#000] flex-col m-0 z-20 h-auto" />
                      <div className="ml-auto flex items-center space-x-4">
                        <Search />
                        <UserNav />
                      </div>
                    </div> */}
                  {/* </div> */}
                  <div className=" flex-1 space-y-4 px-4 md:px-8  !pl-0 flex gap-6">
                    <div className="nav min-w-[60px] md:min-w-[100px] pt-[2rem] bg-card  h-screen fixed top-0 left-0 ">
                      <Image
                        src={logo2}
                        alt="ozura"
                        width={40}
                        className="m-auto"
                      />

                      <div className="links flex flex-col space-y-9 mt-[5rem] pt-6 pb-6 gap-[2rem] items-center">
                        <Link href="/">
                          <LayoutDashboard size={24} />
                        </Link>

                        <Link href="/transactions">
                          <ArrowLeftRight size={24} />
                        </Link>

                        <Link href="/widgets">
                          <AppWindow size={24} />
                        </Link>

                        <Link href="/account">
                          <Settings size={24} />
                        </Link>

                        <Link href="/merchants">
                          <Users size={24} />
                        </Link>

                        <div
                          className="cursor-pointer"
                          onClick={() => {
                            localStorage.removeItem("user");
                            window.open("/login", "_self");
                          }}
                        >
                          <LogOutIcon />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 w-full pl-[75px] md:pl-[130px] pb-6 pt-3 md:pt-7">
                      {children}
                    </div>
                  </div>
                </div>
              </AuthProvider>
            </ThemeProvider>
          </main>
          <Toaster />
        </body>
      </html>
    </CheckAuth>
  );
}
