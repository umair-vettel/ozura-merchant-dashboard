"use client";
import { useRouter } from "next/navigation";
export default function CheckAuth({ children }: any) {
  const router = useRouter();
  console.log("check auth");
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    const pathname = window.location.pathname;
    if (user) {
      console.log("USER FOUND");
      if (pathname == "/login" || pathname == "/register") {
        router.push("/");
      }
    }
    if (!user) {
      console.log("NOT USER");
      if (pathname != ("/login" || "/register")) {
        router.push("/login");
      }
    }
  }

  return <>{children}</>;
}
