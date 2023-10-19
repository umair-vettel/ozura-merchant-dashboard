"use client";
import AuthProvider from "@/context/AuthProvider";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import React from "react";
import { Toaster } from "../ui/toaster";
import Image from "next/image";
import logo2 from "@images/ozlogowhite2.png";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AppWindow,
  ArrowLeftRight,
  LayoutDashboard,
  LogOutIcon,
  Settings,
  UserCog2,
  Users,
} from "lucide-react";
const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const checkUser = async () => {
    const user = localStorage.getItem("user") || "";
    const parsedUser = JSON.parse(user);
    console.log(parsedUser);
    const role = parsedUser.role;
    if (role === "admin") {
      setIsAdmin(true);
    }
  };
  useEffect(() => {
    checkUser();
  }, []);
  console.log(isAdmin, "IS ADMIN");
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <main>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <AuthProvider>
              <div className=" flex-col flex">
                <div className=" flex-1 space-y-4 px-4 md:px-8  !pl-0 flex gap-6">
                  <div className="nav min-w-[60px] md:min-w-[100px] pt-[2rem] bg-card  h-screen fixed top-0 left-0 ">
                    <Image
                      src={logo2}
                      alt="ozura"
                      width={40}
                      className="m-auto"
                    />

                    {!isAdmin ? (
                      <div className="links flex flex-col space-y-7 mt-[5rem] pt-6 pb-6 gap-[2rem] items-center">
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

                        <Link href="/users">
                          <Users size={24} />
                        </Link>

                        <div className="cursor-pointer">
                          <LogOutIcon
                            onClick={() => {
                              localStorage.removeItem("user");
                              window.location.href = "/login";
                            }}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="links flex flex-col space-y-7 mt-[5rem] pt-6 pb-6 gap-[2rem] items-center">
                        <Link href="/account">
                          <Settings size={24} />
                        </Link>

                        <Link href="/merchants">
                          <UserCog2 size={24} />
                        </Link>

                        <div className="cursor-pointer">
                          <LogOutIcon
                            onClick={() => {
                              localStorage.removeItem("user");
                              window.location.href = "/login";
                            }}
                          />
                        </div>
                      </div>
                    )}
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
  );
}
