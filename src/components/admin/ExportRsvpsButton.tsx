"use client";

import { useState } from "react";
import { Download } from "lucide-react";

export function ExportRsvpsButton() {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/export-rsvps");
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `birthday-rsvps-${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Export failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={loading}
      className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase px-4 py-2.5 border transition-all hover:bg-[#2C5F2D] hover:text-white hover:border-[#2C5F2D] disabled:opacity-50"
      style={{ borderColor: "#E0DCD0", color: "#2C5F2D" }}
    >
      <Download size={13} strokeWidth={1.5} />
      {loading ? "Exporting..." : "Export CSV"}
    </button>
  );
}
