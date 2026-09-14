export function generateICS(event: {
  title: string;
  start: Date;
  end: Date;
  location?: string;
  description?: string;
}) {
  const formatDate = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Nonso&Tijani//Birthday//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@birthday-phuket`,
    `DTSTAMP:${formatDate(new Date())}`,
    `DTSTART:${formatDate(event.start)}`,
    `DTEND:${formatDate(event.end)}`,
    `SUMMARY:${event.title}`,
    ...(event.location ? [`LOCATION:${event.location}`] : []),
    ...(event.description ? [`DESCRIPTION:${event.description}`] : []),
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return lines.join("\r\n");
}
