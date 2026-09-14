import { Suspense } from "react";
import EnterForm from "@/components/auth/EnterForm";

export default function EnterPage() {
  return (
    <Suspense fallback={null}>
      <EnterForm />
    </Suspense>
  );
}
