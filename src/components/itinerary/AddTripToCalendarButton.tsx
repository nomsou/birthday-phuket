"use client";

export function AddTripToCalendarButton() {
  const handleAdd = () => {
    const start = "20261214";
    const end = "20261220"; // Google Calendar end date is exclusive

    const details = "Forty in Phuket. Nonso & Tijani's 40th celebration.";

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      "Forty in Phuket",
    )}&dates=${start}/${end}&details=${encodeURIComponent(details)}&location=${encodeURIComponent("Phuket, Thailand")}`;

    window.open(url, "_blank");
  };

  return (
    <button
      onClick={handleAdd}
      className="px-6 py-3 text-xs tracking-[0.15em] uppercase font-medium transition-all duration-200 ease-out rounded-full"
      style={{ background: "#2C5F2D", color: "#F5F0E6" }}
    >
      Add to Calendar
    </button>
  );
}
