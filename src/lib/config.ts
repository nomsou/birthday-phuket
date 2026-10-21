const VARIANT = process.env.NEXT_PUBLIC_VARIANT || "FORTY";

const FORTY_PASS = process.env.BIRTHDAY_ADMIN_PASSWORD;
const DEC_PASS = process.env.DEC_ADMIN_PASSWORD;

export const CONFIG = {
  SITE_NAME: VARIANT === "DEC" ? "December in Phuket" : "Forty in Phuket",
  HERO_TITLE: VARIANT === "DEC" ? "DECEMBER IN PHUKET" : "FORTY IN PHUKET",
  HERO_SUBTITLE:
    VARIANT === "DEC"
      ? "A celebration for Nonso, Tijani, Chinua & Somma"
      : "Nonso and Tijani turn 40, an excellent reason to celebrate",

  CHILD_EVENT: VARIANT === "DEC" ? "Chinua and Somma Turn 5" : "Chinua Turns 5",

  CHILD_NAME: VARIANT === "DEC" ? "Chinua and Somma" : "Chinua",
  CHILD_POSSESSIVE: VARIANT === "DEC" ? "Chinua and Somma's" : "Chinua's",

  ADMIN_PASSWORD: VARIANT === "DEC" ? DEC_PASS : FORTY_PASS,

  NAV_FOOTER_TEXT:
    VARIANT === "DEC"
      ? "December in Phuket • Dec 14-19"
      : "Forty in Phuket • Dec 14-19",

  RSVP_PROMPT:
    VARIANT === "DEC"
      ? "Let us know you're coming to December in Phuket."
      : "Let us know you're coming to Forty in Phuket.",

  GALLERY_TITLE:
    VARIANT === "DEC"
      ? "December in Phuket Gallery"
      : "Forty in Phuket Gallery",

  ENTER_TITLE: VARIANT === "DEC" ? "December in Phuket!" : "Forty in Phuket!",

  ENTER_SUBTITLE:
    VARIANT === "DEC"
      ? "A celebration for Nonso, Tijani, Chinua & Somma"
      : "A celebration for Nonso and Tijani",
};
