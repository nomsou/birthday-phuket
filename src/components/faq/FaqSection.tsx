import { FaqItem } from "./FaqItem";

const FAQS = [
  {
    question: "Do I need a visa to enter Thailand?",
    answer: (
      <>
        Yes. Nigerian passport holders require a visa to enter Thailand. Our
        travel partner, Kharigoo Voyage Ltd, can handle the entire process for
        you, including document preparation, embassy liaison, and interview
        preparation. Reach them on{" "}
        <a
          href="tel:+2348159009813"
          className="underline transition-colors hover:text-[#2C5F2D]"
        >
          +234 815 900 9813
        </a>{" "}
        or visit{" "}
        <a
          href="https://www.kharigoo.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline transition-colors hover:text-[#2C5F2D]"
        >
          kharigoo.com
        </a>
        . We recommend starting the process early to avoid any delays.
      </>
    ),
  },
  {
    question: "How do I get to Phuket?",
    answer: (
      <>
        There are no direct flights from Nigeria to Phuket, so you&apos;ll
        connect through a major hub. The most common routes are Emirates via
        Dubai, Qatar Airways via Doha, and Turkish Airlines via Istanbul. We
        recommend booking early, as fares rise considerably closer to the date.
      </>
    ),
  },
  {
    question: "What do I need to enter Thailand?",
    answer:
      "You'll need a valid passport with at least six months' validity, proof of onward travel, and a Thai visa. Kharigoo Voyage Ltd can assist with all visa documentation and requirements. A Thailand Digital Arrival Card (TDAC) may also be required. Check current requirements closer to your travel date.",
  },
  {
    question: "Are there vaccinations I need before travelling?",
    answer:
      "No vaccinations are mandatory for entry, but we recommend being up to date on routine vaccinations and speaking with your healthcare provider about any additional precautions before travel.",
  },
  {
    question: "What currency is used, and how should I handle money?",
    answer:
      "Thailand's currency is the Thai Baht (THB). Major hotels and restaurants accept credit and debit cards. Notify your bank before you travel to avoid interruptions. ATMs and currency exchange are widely available.",
  },
  {
    question: "Will I have Wi-Fi and phone signal?",
    answer:
      "Wi-Fi is available at the resort. For mobile connectivity, check with your network provider about international roaming in Thailand before you depart. Thailand is GMT+7.",
  },
  {
    question: "What should I pack?",
    answer:
      "December in Phuket is warm and coastal. Pack light, breathable fabrics and dress for heat and humidity. Thailand uses Type A/C/O sockets at 220V/50Hz. Bring an adapter if needed.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="px-6 py-20 bg-[#F5F0E6]">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12 space-y-3">
          <h2
            className="text-4xl md:text-5xl font-medium"
            style={{
              color: "#2C5F2D",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Frequently Asked Questions
          </h2>
          <p className="text-sm" style={{ color: "#5A5A5A" }}>
            A few helpful details for guests joining us to celebrate Nonso &amp;
            Tijani at forty.
          </p>
        </div>

        <div>
          {FAQS.map((faq) => (
            <FaqItem key={faq.question} {...faq} />
          ))}
        </div>
      </div>
    </section>
  );
}
