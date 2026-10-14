import type { Metadata } from "next";
import { Suspense } from "react";
import EnterForm from "@/components/auth/EnterForm";
import { CONFIG } from "@/lib/config";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Private Access - ${CONFIG.SITE_NAME}`,
};

export default function EnterPage() {
  return (
    <Suspense fallback={null}>
      <EnterForm />
    </Suspense>
  );
}
