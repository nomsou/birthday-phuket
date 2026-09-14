import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Users, CalendarDays, Image as ImageIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin | Nonso & Tijani",
};

export default async function AdminDashboard() {
  const [guestCount, galleryCount] = await Promise.all([
    prisma.guest.count(),
    prisma.galleryImage.count(),
  ]);

  const recentGuests = await prisma.guest.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  });

  const stats = [
    { label: "Total RSVPs", value: guestCount, icon: Users, color: "#2C5F2D" },
    {
      label: "Gallery Photos",
      value: galleryCount,
      icon: ImageIcon,
      color: "#7BAFD4",
    },
  ];

  return (
    <main className="min-h-screen p-6 md:p-10 bg-[#F5F0E6]">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p
              className="text-xs tracking-[0.3em] uppercase mb-1"
              style={{ color: "#5A5A5A" }}
            >
              Admin Panel
            </p>
            <h1
              className="text-3xl font-medium"
              style={{
                color: "#2C5F2D",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Event Dashboard
            </h1>
          </div>
          <Link
            href="/"
            target="_blank"
            className="text-xs tracking-[0.15em] uppercase px-4 py-2 border transition-all hover:bg-[#2C5F2D] hover:text-white hover:border-[#2C5F2D]"
            style={{ borderColor: "#E0DCD0", color: "#2C5F2D" }}
          >
            View Site ↗
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="p-6 border bg-white/50 backdrop-blur-sm flex items-center gap-4"
              style={{ borderColor: "#E0DCD0" }}
            >
              <div
                className="p-3 rounded-full"
                style={{ background: `${stat.color}15` }}
              >
                <stat.icon size={20} style={{ color: stat.color }} />
              </div>
              <div>
                <p
                  className="text-xs tracking-[0.15em] uppercase mb-1"
                  style={{ color: "#5A5A5A" }}
                >
                  {stat.label}
                </p>
                <p
                  className="text-2xl font-medium"
                  style={{ color: "#1A1A1A" }}
                >
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Recent RSVPs Preview */}
        <div
          className="border bg-white/50 backdrop-blur-sm"
          style={{ borderColor: "#E0DCD0" }}
        >
          <div
            className="p-6 border-b flex items-center justify-between"
            style={{ borderColor: "#E0DCD0" }}
          >
            <h2 className="text-lg font-medium" style={{ color: "#1A1A1A" }}>
              Recent RSVPs
            </h2>
            <Link
              href="/admin/rsvps"
              className="text-xs tracking-[0.15em] uppercase transition-opacity hover:opacity-60"
              style={{ color: "#5A5A5A" }}
            >
              View All →
            </Link>
          </div>

          {recentGuests.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-sm" style={{ color: "#5A5A5A" }}>
                No RSVPs yet. Share the invite password to start collecting
                responses.
              </p>
            </div>
          ) : (
            <div className="divide-y" style={{ borderColor: "#E0DCD0" }}>
              {recentGuests.map((guest) => (
                <div
                  key={guest.id}
                  className="px-6 py-4 flex items-center justify-between"
                >
                  <div>
                    <p
                      className="text-sm font-medium"
                      style={{ color: "#1A1A1A" }}
                    >
                      {guest.name}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "#5A5A5A" }}>
                      {guest.email} • {guest.hotel || "No hotel listed"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs" style={{ color: "#5A5A5A" }}>
                      {new Date(guest.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    {guest.plusOne && (
                      <span
                        className="inline-block mt-1 text-[10px] tracking-[0.1em] uppercase px-2 py-0.5 rounded-full"
                        style={{ background: "#7BAFD420", color: "#7BAFD4" }}
                      >
                        +1 Guest
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
