import { AddTripToCalendarButton } from "../itinerary/AddTripToCalendarButton";

export function StaySection() {
  return (
    <section id="stay" className="px-6 py-20 bg-white">
      <div className="max-w-2xl mx-auto space-y-16">
        <div className="text-center space-y-3">
          <p
            className="text-xs tracking-[0.3em] uppercase"
            style={{ color: "#5A5A5A" }}
          >
            Logistics
          </p>
          <h2
            className="text-4xl md:text-5xl font-medium"
            style={{
              color: "#2C5F2D",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Everything You Need
          </h2>
        </div>

        {/* Secure your stay */}
        <div>
          <h3 className="text-lg font-medium mb-4" style={{ color: "#1A1A1A" }}>
            Secure Your Stay
          </h3>
          <div
            className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            style={{ background: "#F5F0E6" }}
          >
            <div>
              <p className="font-medium" style={{ color: "#1A1A1A" }}>
                Resort TBD, Phuket · [Main Celebration]
              </p>
              <p className="text-xs mt-1" style={{ color: "#5A5A5A" }}>
                December 14th – 19th
              </p>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-60"
              style={{ color: "#2C5F2D" }}
            >
              Reserve Your Room →
            </a>
          </div>
        </div>

        <hr style={{ borderColor: "#E0DCD0" }} />

        {/* Dress guide */}
        <div>
          <h3 className="text-lg font-medium mb-2" style={{ color: "#1A1A1A" }}>
            Official Dress Guide
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: "#5A5A5A" }}>
            Celebrate in style. Each evening has its own dress code — check each
            day's card above for the details.
          </p>
        </div>

        <hr style={{ borderColor: "#E0DCD0" }} />

        {/* Travel recommendations */}
        <div>
          <h3 className="text-lg font-medium mb-2" style={{ color: "#1A1A1A" }}>
            Travel Recommendations
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: "#5A5A5A" }}>
            Fly into Phuket International Airport (HKT). Airport transfers to
            the resort can be arranged by the planning team — share your flight
            details ahead of arrival so pickup is seamless.
          </p>
        </div>

        <hr style={{ borderColor: "#E0DCD0" }} />

        {/* Reserve dates */}
        <div>
          <h3 className="text-lg font-medium mb-2" style={{ color: "#1A1A1A" }}>
            Reserve These Dates
          </h3>
          <p
            className="text-sm leading-relaxed mb-3"
            style={{ color: "#5A5A5A" }}
          >
            Add the dates to your calendar and let the anticipation begin.
          </p>
          <AddTripToCalendarButton />
        </div>
      </div>
    </section>
  );
}
