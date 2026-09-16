import { FaqItem } from "./FaqItem";

const FAQS = [
  {
    question: "Do I need a visa to enter Thailand?",
    answer:
      "Many nationalities can enter Thailand visa-free for stays up to 30-60 days, depending on your passport. Check the Thai e-Visa portal for your specific requirements. There is no need to visit an embassy for most visa-exempt nationalities. Your passport must be valid for at least six months beyond your travel dates.",
  },
  {
    question: "How do I get to Phuket?",
    answer:
      "International guests will fly into Phuket International Airport (HKT). Direct flights are available from several major hubs, and connecting flights are common via Bangkok, Singapore, or Hong Kong. We recommend booking early. Fares rise considerably closer to the date.",
  },
  {
    question: "What do I need to enter Thailand?",
    answer:
      "You'll need a valid passport with at least six months' validity, proof of onward travel, and, depending on your nationality, a visa or visa-exemption confirmation. A Thailand Digital Arrival Card (TDAC) may also be required. Check current requirements before you travel.",
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
  {
    question: "How do I get from the airport to my hotel?",
    answer:
      "We strongly recommend arranging your airport transfer through the planning team rather than booking independently. Share your confirmed flight details and we'll handle the rest.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="px-6 py-20 bg-white">
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
            A few helpful details for guests joining us to celebrate Nonso &
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
