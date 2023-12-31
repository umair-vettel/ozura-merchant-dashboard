import { Toaster } from "@/components/ui/toaster";
import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import AuthProvider from "@/context/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ozura",
  description: "Ozura",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <main className="max-w-[1920px] m-auto">
          {/* <ThemeProvider attribute="class"> */}
          <AuthProvider>{children}</AuthProvider>
          {/* </ThemeProvider> */}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
