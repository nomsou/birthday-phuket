"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  MapPin,
  Image as ImageIcon,
  LayoutDashboard,
  Users,
} from "lucide-react";

const links = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/rsvps", label: "RSVPs", icon: Users },
  { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/admin/content", label: "Content", icon: MapPin },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <aside
      className="hidden md:flex w-56 flex-col h-screen shrink-0 sticky top-0 bg-[#F5F0E6] border-r"
      style={{ borderColor: "#E0DCD0" }}
    >
      <div className="px-6 py-8 border-b" style={{ borderColor: "#E0DCD0" }}>
        <p
          className="text-xs tracking-[0.3em] uppercase font-medium"
          style={{ color: "#2C5F2D" }}
        >
          Birthday Admin
        </p>
      </div>
      <nav className="flex-1 py-6 px-3 space-y-1">
        {links.map(({ href, label, icon: Icon }) => {
          const active =
            pathname === href ||
            (href !== "/admin" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm transition-all rounded-md ${
                active
                  ? "bg-[#2C5F2D] text-white"
                  : "text-[#5A5A5A] hover:bg-[#E0DCD0]"
              }`}
            >
              <Icon size={16} strokeWidth={1.5} />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="px-6 py-6 border-t" style={{ borderColor: "#E0DCD0" }}>
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase transition-opacity hover:opacity-60"
          style={{ color: "#5A5A5A" }}
        >
          View Site ↗
        </Link>
      </div>
    </aside>
  );
}
