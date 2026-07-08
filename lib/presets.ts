import type { LandingPageFormInput } from "./types";

export type Preset = {
  id: string;
  label: string;
  input: LandingPageFormInput;
};

export const PRESETS: Preset[] = [
  {
    id: "coffee-shop",
    label: "Local coffee shop",
    input: {
      brandName: "North End Coffee",
      whatItDoes:
        "A neighborhood coffee shop serving small-batch roasts, simple pastries, and a calm place to work.",
      targetAudience: "Local professionals and students nearby",
      mainProblem:
        "Nearby cafes are crowded, slow, or use mass-produced pods with inconsistent quality.",
      mainBenefit:
        "Freshly roasted coffee you can order ahead and grab without waiting in line.",
      tone: "Local business style",
      primaryCTA: "Order ahead",
      offerOrPricing: "First order gets 10% off in the app. Drinks $3 to $5.",
      contactInfo: "142 North End Ave · hello@northendcoffee.example",
    },
  },
  {
    id: "web-design",
    label: "Freelance web design",
    input: {
      brandName: "Quiet Desk Studio",
      whatItDoes:
        "Freelance web design for small businesses that need a clear, fast website without agency overhead.",
      targetAudience: "Local small businesses and solo founders",
      mainProblem:
        "Owners need a website but get lost in agency jargon, long timelines, and unclear pricing.",
      mainBenefit:
        "A clean, finished site in two weeks with flat pricing and no upsells.",
      tone: "Professional and direct",
      primaryCTA: "Book a call",
      offerOrPricing: "Sites from $1,200, fixed price, two-week turnaround.",
      contactInfo: "hello@quietdeskstudio.example",
    },
  },
  {
    id: "study-app",
    label: "Student study app",
    input: {
      brandName: "Stack Up",
      whatItDoes:
        "A study app that turns your notes into practice quizzes using spaced repetition.",
      targetAudience: "High school and college students",
      mainProblem:
        "Students reread notes but forget most of it before the exam.",
      mainBenefit:
        "Turns notes into quizzes that adapt to what you keep forgetting.",
      tone: "Student project style",
      primaryCTA: "Try it free",
      offerOrPricing: "Free for one subject, $4/month for unlimited.",
      contactInfo: "hi@stackup.example",
    },
  },
  {
    id: "fitness-tracker",
    label: "Beginner fitness tracker",
    input: {
      brandName: "First Mile",
      whatItDoes:
        "A beginner-friendly fitness tracker that builds short, doable weekly plans.",
      targetAudience: "Adults starting to exercise for the first time",
      mainProblem:
        "Most fitness apps assume you already know what to do and feel overwhelming.",
      mainBenefit:
        "Gives you one small workout a day you can actually finish.",
      tone: "Friendly and casual",
      primaryCTA: "Start free",
      offerOrPricing: "Free for 14 days, then $6/month.",
      contactInfo: "team@firstmile.example",
    },
  },
];
