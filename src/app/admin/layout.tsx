import type { Metadata } from "next";
import { AdminNav } from "@/components/admin/AdminNav";

export const metadata: Metadata = {
  title: "Admin | Nonso & Tijani",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#F5F0E6]">
      <AdminNav />
      <main className="flex-1 overflow-y-auto p-6 md:p-10">{children}</main>
    </div>
  );
}
