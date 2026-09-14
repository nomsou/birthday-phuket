import { prisma } from "@/lib/prisma";
import AdminContentClient from "@/components/admin/AdminContentClient";

export default async function AdminContentPage() {
  const dbSettings = await prisma.setting.findMany({
    where: { key: { in: ["travel_visa", "pickup_schedule"] } },
  });

  const settingsMap = dbSettings.reduce(
    (acc, curr) => ({ ...acc, [curr.key]: curr.value }),
    {} as Record<string, string>,
  );

  return <AdminContentClient initialSettings={settingsMap} />;
}
