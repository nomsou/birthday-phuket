import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ExportRsvpsButton } from "@/components/admin/ExportRsvpsButton";

export const metadata: Metadata = {
  title: "RSVPs | Admin",
};

export default async function AdminRsvps() {
  const guests = await prisma.guest.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen p-6 md:p-10 bg-[#F5F0E6]">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p
              className="text-xs tracking-[0.3em] uppercase mb-1"
              style={{ color: "#5A5A5A" }}
            >
              Guest List
            </p>
            <h1
              className="text-3xl font-medium"
              style={{
                color: "#2C5F2D",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              All RSVPs ({guests.length})
            </h1>
          </div>
          <ExportRsvpsButton />
        </div>

        {/* Table */}
        <div
          className="border overflow-x-auto bg-white/50 backdrop-blur-sm"
          style={{ borderColor: "#E0DCD0" }}
        >
          {guests.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-sm" style={{ color: "#5A5A5A" }}>
                No RSVPs recorded yet.
              </p>
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b" style={{ borderColor: "#E0DCD0" }}>
                  <th
                    className="px-6 py-4 text-xs tracking-[0.15em] uppercase font-medium"
                    style={{ color: "#5A5A5A" }}
                  >
                    Name
                  </th>
                  <th
                    className="px-6 py-4 text-xs tracking-[0.15em] uppercase font-medium"
                    style={{ color: "#5A5A5A" }}
                  >
                    Contact
                  </th>
                  <th
                    className="px-6 py-4 text-xs tracking-[0.15em] uppercase font-medium"
                    style={{ color: "#5A5A5A" }}
                  >
                    Hotel
                  </th>
                  <th
                    className="px-6 py-4 text-xs tracking-[0.15em] uppercase font-medium"
                    style={{ color: "#5A5A5A" }}
                  >
                    Dietary
                  </th>
                  <th
                    className="px-6 py-4 text-xs tracking-[0.15em] uppercase font-medium"
                    style={{ color: "#5A5A5A" }}
                  >
                    Plus One
                  </th>
                  <th
                    className="px-6 py-4 text-xs tracking-[0.15em] uppercase font-medium"
                    style={{ color: "#5A5A5A" }}
                  >
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: "#E0DCD0" }}>
                {guests.map((guest) => (
                  <tr key={guest.id}>
                    <td className="px-6 py-4">
                      <p className="font-medium" style={{ color: "#1A1A1A" }}>
                        {guest.name}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p style={{ color: "#5A5A5A" }}>{guest.email}</p>
                      <p
                        className="text-xs mt-0.5"
                        style={{ color: "#5A5A5A" }}
                      >
                        {guest.phone}
                      </p>
                    </td>
                    <td className="px-6 py-4" style={{ color: "#5A5A5A" }}>
                      {guest.hotel || "—"}
                    </td>
                    <td className="px-6 py-4" style={{ color: "#5A5A5A" }}>
                      {guest.dietary || "None"}
                    </td>
                    <td className="px-6 py-4">
                      {guest.plusOne ? (
                        <div>
                          <span
                            className="inline-block text-[10px] tracking-[0.1em] uppercase px-2 py-0.5 rounded-full mb-1"
                            style={{
                              background: "#7BAFD420",
                              color: "#7BAFD4",
                            }}
                          >
                            Yes
                          </span>
                          {guest.plusOneDetails && (
                            <p className="text-xs" style={{ color: "#5A5A5A" }}>
                              {guest.plusOneDetails}
                            </p>
                          )}
                        </div>
                      ) : (
                        <span style={{ color: "#5A5A5A" }}>No</span>
                      )}
                    </td>
                    <td
                      className="px-6 py-4 text-xs"
                      style={{ color: "#5A5A5A" }}
                    >
                      {new Date(guest.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
}
