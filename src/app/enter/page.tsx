
import { Suspense } from "react";
import EnterForm from "@/components/auth/EnterForm";

export const dynamic = "force-dynamic";

export default function EnterPage() {
  return (
    <Suspense fallback={null}>
      <EnterForm />
    </Suspense>
  );
}
