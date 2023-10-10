"use client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "./useAuth";

interface Props {
  [key: string]: any;
}

export default function withAuth<P extends Props>(
  Component: React.ComponentType<P>,
) {
  return function ProtectedRoute(props: P) {
    const router = useRouter();
    const { user, loading, verified } = useAuth();
    console.log("user", user, "path", router.pathname);
    useEffect(() => {
      const currentPath = router.asPath;
      /*   if (user) {
        if (!verified) {
          router.replace('/unverified');
          return;
        } else {
          if (currentPath == '/unverified') {
            if (verified) {
              router.replace('/');
            }
            return;
          }
        }
      } */

      if (
        currentPath == "/login" ||
        currentPath == "/register" ||
        currentPath == "/forgot-password" ||
        currentPath == "/verify-email/[verificationToken]" ||
        currentPath == "/reset-password/[verificationToken]"
      ) {
        if (user) {
          router.replace("/");
        }
        return;
      }
      if (!loading && !user) {
        if (currentPath == "/amlr" || currentPath == "/terms-and-conditions") {
          return;
        }
        router.replace("/login");
      }
    }, [loading, user]);

    if (loading) {
      return <div>Loading...</div>;
    }
  };
}
