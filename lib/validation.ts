import type { LandingPageFormInput } from "./types";

export type FormErrors = Partial<Record<keyof LandingPageFormInput, string>>;

const REQUIRED_FIELDS: (keyof LandingPageFormInput)[] = [
  "brandName",
  "whatItDoes",
  "targetAudience",
  "mainProblem",
  "mainBenefit",
  "primaryCTA",
];

export function validateLandingPageForm(
  input: LandingPageFormInput
): FormErrors {
  const errors: FormErrors = {};

  for (const field of REQUIRED_FIELDS) {
    if (!input[field].trim()) {
      errors[field] = "This field is required.";
    }
  }

  if (!input.tone) {
    errors.tone = "Please choose a tone.";
  }

  return errors;
}

export function hasErrors(errors: FormErrors): boolean {
  return Object.keys(errors).length > 0;
}
