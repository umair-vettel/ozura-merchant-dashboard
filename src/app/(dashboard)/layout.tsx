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
import Layout from "@/components/layout/layout";
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
      <Layout children={children} />
    </CheckAuth>
  );
}
