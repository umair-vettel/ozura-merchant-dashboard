import { Metadata } from "next";
import Dashboard from "@/components/dashboard/Dashboard";
import CheckAuth from "@/hooks/checkAuth";
export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
};

export default function DashboardPage() {
  return (
    <CheckAuth>
      <Dashboard />
    </CheckAuth>
  );
}
