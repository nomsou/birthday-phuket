import { DayCard, type ItineraryDay } from "./Daycard";

export const ITINERARY_DAYS: ItineraryDay[] = [
  {
    day: "Monday",
    date: "Dec 14, 2026",
    title: "TOUCHDOWN, PHUKET",
    subtitle: "Welcome Cocktails",
    description:
      "Your adventure begins the moment you touch down. Phuket is a world of extraordinary contrasts: limestone cliffs rising from turquoise water, longtail boats drifting past palm-fringed shores, and a warmth that meets you before you even leave the airport. Settle in, and when you're ready, we'll gather for welcome cocktails to officially open Forty in Phuket.",
    activities: [
      { label: "Afternoon", detail: "Arrivals and check-in at the resort" },
      { label: "Evening", detail: "Welcome cocktails by the pool" },
    ],
    image: "/itinerary/1.webp",
  },
  {
    day: "Tuesday",
    date: "Dec 15, 2026",
    title: "GAME ON",
    subtitle: "Tijani's 40th Birthday",
    description:
      "We're kicking things off with a proper sports day. Teams, games, competition, plenty of laughs and serious bragging rights on the line. The morning belongs to the playing field; the evening belongs to Tijani. Reset, get dressed, and celebrate Tijani.",
    activities: [
      {
        label: "Morning",
        detail: "Sports day with teams, games and competition",
      },
      { label: "Evening", detail: "Tijani's 40th birthday celebration" },
    ],
    image: "/itinerary/2.webp",
  },
  {
    day: "Wednesday",
    date: "Dec 16, 2026",
    title: "SPA DAYS & SIDE QUESTS",
    subtitle: "Bundi's Birthday Brunch · Wellness Day · Guys' Day Out",
    description:
      "Divide and conquer. The ladies are heading for Bundi's birthday brunch, spa treatments and a full day of relaxation. The guys? They have Phuket, a free afternoon and their own agenda. We'll compare stories later. However you spend the day, come back rested. The week is only getting started.",
    activities: [
      { label: "Morning", detail: "Bundi's birthday brunch and wellness day" },
      { label: "Afternoon", detail: "Guys' day out, Phuket at your leisure" },
    ],
    image: "/itinerary/3.webp",
  },
  {
    day: "Thursday",
    date: "Dec 17, 2026",
    title: "DOUBLE TROUBLE",
    subtitle: "Chinua Turns 5 · Nonso Turns 40",
    description:
      "Father and Son. Same birthday. Very different numbers. We start with a family fun day for Chinua's 5th birthday, with games, activities and plenty for the kids to get stuck into. Then the day shifts gears. Tonight, it's all about Nonso at 40. Forty years, one big night, and everyone we love in Phuket to celebrate it.",
    activities: [
      {
        label: "Morning",
        detail: "Family fun day for Chinua's 5th birthday",
      },
      { label: "Evening", detail: "Nonso's 40th birthday celebration" },
    ],
    image: "/itinerary/4.webp",
  },
  {
    day: "Friday",
    date: "Dec 18, 2026",
    title: "GONE YACHTING",
    subtitle: "Island Yacht Party",
    description:
      "Swimsuits on. We're taking this party to sea. Six hours aboard our private yacht exploring the islands. Swim, kayak, stop at the islands, eat, drink, dance and take in some ridiculous views along the way. Then we sail into sunset. Because obviously.",
    activities: [
      { label: "All day", detail: "Private yacht charter to the islands" },
      { label: "Evening", detail: "Sunset sail back to Phuket" },
    ],
    image: "/itinerary/5.webp",
  },
  {
    day: "Saturday",
    date: "Dec 19, 2026",
    title: "ONE FOR THE ROAD",
    subtitle: "Breakfast & Departure",
    description:
      "One last breakfast. One last round of hugs. One last attempt to work out how the week went by so quickly. Then it's time to head home with full camera rolls, excellent stories and plans to do it all again someday. Until next time.",
    activities: [
      { label: "Morning", detail: "Farewell breakfast at the resort" },
      { label: "Afternoon", detail: "Departures and airport transfers" },
    ],
    image: "/itinerary/6.webp",
  },
];

export function ItinerarySection() {
  return (
    <section id="itinerary" className="px-6 py-20 bg-[#F5F0E6]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 space-y-3">
          <p
            className="text-xs tracking-[0.3em] uppercase"
            style={{ color: "#5A5A5A" }}
          >
            The Plan
          </p>
          <h2
            className="text-4xl md:text-5xl font-medium"
            style={{
              color: "#2C5F2D",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Forty in Phuket Itinerary
          </h2>
          <p className="text-sm" style={{ color: "#5A5A5A" }}>
            Six days on the Andaman coast. Celebration, sea, and the people you
            love most.
          </p>
        </div>

        <div className="space-y-4">
          {ITINERARY_DAYS.map((day, i) => (
            <DayCard key={day.date} day={day} isFirst={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
