"use client";

import { useState } from "react";
import { Save } from "lucide-react";

type Setting = {
  key: string;
  label: string;
  description: string;
  value: string;
  type: "textarea" | "json";
};

const DEFAULTS: Record<string, string> = {
  travel_visa:
    "Most nationalities require a visa for Thailand. Please check your local embassy requirements at least 3 weeks prior.",
  pickup_schedule:
    '[{"time":"Dec 14, 2:00 PM","loc":"HKT Airport (Arrivals Hall)","note":"Welcome shuttle to resort"},{"time":"Dec 19, 10:00 AM","loc":"Resort Lobby","note":"Airport transfer departures"}]',
};

export default function AdminContentClient({
  initialSettings,
}: {
  initialSettings: Record<string, string>;
}) {
  const [settings, setSettings] = useState<Setting[]>([
    {
      key: "travel_visa",
      label: "Visa & Entry Info",
      description:
        "Text displayed on the Travel page regarding entry requirements.",
      value: initialSettings.travel_visa || DEFAULTS.travel_visa,
      type: "textarea",
    },
    {
      key: "pickup_schedule",
      label: "Pickup Schedule (JSON)",
      description:
        "Array of objects: [{ time, loc, note }]. Used for airport transfers.",
      value: initialSettings.pickup_schedule || DEFAULTS.pickup_schedule,
      type: "textarea",
    },
  ]);

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (key: string, val: string) => {
    setSettings((prev) =>
      prev.map((s) => (s.key === key ? { ...s, value: val } : s)),
    );
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await Promise.all(
        settings.map((s) =>
          fetch("/api/admin/content", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ key: s.key, value: s.value }),
          }),
        ),
      );
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      alert("Failed to save. Check console.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p
            className="text-xs tracking-[0.3em] uppercase mb-1"
            style={{ color: "#5A5A5A" }}
          >
            Site Content
          </p>
          <h1
            className="text-3xl font-medium"
            style={{
              color: "#2C5F2D",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Manage Dynamic Text
          </h1>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 text-xs tracking-[0.15em] uppercase transition-all disabled:opacity-50"
          style={{ background: "#2C5F2D", color: "#F5F0E6" }}
        >
          <Save size={14} />
          {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      <div className="space-y-6">
        {settings.map((setting) => (
          <div
            key={setting.key}
            className="p-6 border bg-white/50 backdrop-blur-sm"
            style={{ borderColor: "#E0DCD0" }}
          >
            <label
              className="block text-xs tracking-[0.15em] uppercase mb-2"
              style={{ color: "#2C5F2D" }}
            >
              {setting.label}
            </label>
            <p className="text-xs mb-4" style={{ color: "#5A5A5A" }}>
              {setting.description}
            </p>

            {setting.type === "textarea" ? (
              <textarea
                rows={setting.key.includes("schedule") ? 8 : 4}
                value={setting.value}
                onChange={(e) => handleChange(setting.key, e.target.value)}
                className="w-full px-4 py-3 text-sm outline-none border bg-transparent font-mono text-xs"
                style={{ borderColor: "#E0DCD0", color: "#1A1A1A" }}
              />
            ) : (
              <input
                type="text"
                value={setting.value}
                onChange={(e) => handleChange(setting.key, e.target.value)}
                className="w-full px-4 py-3 text-sm outline-none border bg-transparent"
                style={{ borderColor: "#E0DCD0", color: "#1A1A1A" }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
