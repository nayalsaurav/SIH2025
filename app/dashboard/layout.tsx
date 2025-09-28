import type React from "react";
import { Sidebar } from "@/components/sidebar";
import { getServerSession } from "@/lib/get-session";
import { unauthorized } from "next/navigation";
import RoleSelectionPage from "@/components/select-role";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  const user = session?.user;
  if (!user) return unauthorized();
  return (
    <div className="flex h-screen bg-background">
      <>
        <Sidebar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </>
    </div>
  );
}
