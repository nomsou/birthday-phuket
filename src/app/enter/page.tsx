import type { Metadata } from "next";
import { Suspense } from "react";
import EnterForm from "@/components/auth/EnterForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Private Access - Forty in Phuket",
};

export default function EnterPage() {
  return (
    <Suspense fallback={null}>
      <EnterForm />
    </Suspense>
  );
}
