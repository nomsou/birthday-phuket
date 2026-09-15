import { DayCard, type ItineraryDay } from "./Daycard";

export const ITINERARY_DAYS: ItineraryDay[] = [
  {
    day: "Monday",
    date: "Dec 14",
    title: "TOUCHDOWN, PHUKET",
    subtitle: "Welcome Cocktails",
    body: [
      "Arrive, check in, switch to holiday mode.",
      "That evening, we're getting everyone together for welcome cocktails, good music and the official start of Forty in Phuket.",
    ],
  },
  {
    day: "Tuesday",
    date: "Dec 15",
    title: "GAME ON",
    subtitle: "Tijani's 40th Birthday",
    body: [
      "We're kicking things off with a proper sports day.",
      "Teams, games, competition, plenty of laughs and serious bragging rights on the line.",
      "Then it's time to reset, get dressed and celebrate Tijani at 40.",
    ],
  },
  {
    day: "Wednesday",
    date: "Dec 16",
    title: "SPA DAYS & SIDE QUESTS",
    subtitle: "Bundi's Brunch & Wellness Day · Guys' Day Out",
    body: [
      "Divide and conquer.",
      "The ladies are heading for brunch, spa treatments and a full day of relaxation.",
      "The guys? They have Phuket, a free afternoon and their own agenda.",
      "We'll compare stories later.",
    ],
  },
  {
    day: "Thursday",
    date: "Dec 17",
    title: "DOUBLE TROUBLE",
    subtitle: "Chinua Turns 5 · Nonso Turns 40",
    body: [
      "Same birthday. Very different numbers.",
      "We start with a family fun day for Chinua's 5th birthday, with games, activities and plenty for the kids to get stuck into.",
      "Then the day shifts gears.",
      "Tonight, it's all about Nonso at 40.",
      "Forty years. One big night. And everyone we love in Phuket to celebrate it.",
    ],
  },
  {
    day: "Friday",
    date: "Dec 18",
    title: "GONE YACHTING",
    subtitle: "Phi Phi Yacht Party",
    body: [
      "Swimsuits on. We're taking this party to sea.",
      "Six hours aboard our private yacht exploring the waters around Phi Phi. Swim, kayak, stop at the islands, eat, drink, dance and take in some ridiculous views along the way.",
      "Then we sail into sunset. Because obviously.",
    ],
  },
  {
    day: "Saturday",
    date: "Dec 19",
    title: "ONE FOR THE ROAD",
    subtitle: "Breakfast & Departure",
    body: [
      "One last breakfast. One last round of hugs. One last attempt to work out how the week went by so quickly.",
      "Then it's time to head home with full camera rolls, excellent stories and plans to do it all again someday.",
      "Until next time.",
    ],
  },
];

export function ItinerarySection() {
  return (
    <section id="itinerary" className="px-6 py-20 bg-[#F5F0E6]">
      <div className="max-w-2xl mx-auto">
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
            Six days on the Andaman coast — celebration, sea, and the people you
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
