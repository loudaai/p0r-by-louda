import type { LandingPageContent } from "./types";

export const SAMPLE_LANDING_PAGE: LandingPageContent = {
  brandName: "North End Coffee",
  tagline: "Fresh roasts, quiet mornings",
  heroHeadline: "Coffee brewed for your neighborhood",
  heroSubheadline:
    "A small-batch coffee shop serving freshly roasted beans, simple pastries, and a calm place to start the day.",
  primaryCTA: "Order ahead",
  secondaryCTA: "See the menu",
  problemTitle: "Your morning routine is rushed",
  problemDescription:
    "Most cafes near you are crowded, slow, or rely on mass-produced pods. Finding a quiet cup you actually like shouldn't be a gamble before work.",
  solutionTitle: "Roasted in-house, ready when you are",
  solutionDescription:
    "We roast weekly in small batches and open early, so you can order ahead and grab a consistent, well-made cup without the wait.",
  benefits: [
    "Small-batch roasts rotated every week",
    "Mobile order ahead so you skip the line",
    "Quiet seating and reliable wifi",
    "Pastries from a local bakery",
  ],
  features: [
    {
      title: "Weekly rotating roasts",
      description:
        "Two single-origin options and one house blend change every week so the menu stays interesting.",
    },
    {
      title: "Order ahead in two taps",
      description:
        "Save your usual and have it waiting at the counter when you arrive.",
    },
    {
      title: "Quiet morning hours",
      description:
        "We open at 6:30am with low music and plenty of seating for focused work.",
    },
    {
      title: "Local pastries",
      description:
        "Baked fresh each morning by a bakery three blocks away.",
    },
  ],
  faqs: [
    {
      question: "Do you have non-dairy milk?",
      answer: "Yes, we offer oat, almond, and soy at no extra charge.",
    },
    {
      question: "Can I work from the shop?",
      answer:
        "Absolutely. We have reliable wifi and quiet seating during morning hours.",
    },
    {
      question: "Do you sell beans to take home?",
      answer:
        "Yes, bags of the current roasts are available in-store and online.",
    },
  ],
  pricingOrOffer:
    "First order gets 10% off when you sign up in the app. Most drinks are $3 to $5.",
  contactText:
    "Visit us at 142 North End Ave, or email hello@northendcoffee.example.",
  footerText: "© North End Coffee. A neighborhood spot, not a franchise.",
};
