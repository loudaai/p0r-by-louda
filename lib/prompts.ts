import type { LandingPageFormInput } from "./types";

export function buildSystemPrompt(): string {
  return `You are a senior landing page copywriter. Return ONLY a JSON object that matches this exact shape. No markdown, no code fences, no HTML, no React, no explanations.

{
  "brandName": string,
  "tagline": string,
  "heroHeadline": string,
  "heroSubheadline": string,
  "primaryCTA": string,
  "secondaryCTA": string,
  "problemTitle": string,
  "problemDescription": string,
  "solutionTitle": string,
  "solutionDescription": string,
  "benefits": string[],
  "features": { "title": string, "description": string }[],
  "faqs": { "question": string, "answer": string }[],
  "pricingOrOffer": string,
  "contactText": string,
  "footerText": string,
  "imageSuggestions": string[],
  "photoKeywords": string[]
}

How to write:
- The user may give a short natural-language prompt. Infer the business, audience, problem, benefit, tone, and call-to-action from it when not explicitly provided.
- Be clear, specific, practical, and directly relevant. Write copy that fits the actual business described.
- Keep copy simple and useful. Do not invent fake testimonials, awards, statistics, case studies, or guarantees.
- Avoid hype words: innovative, revolutionary, game-changing, next-level, seamless, cutting-edge, world-class, powerful solution, transform your business, unlock your potential.
- imageSuggestions and photoKeywords are optional and only for inspiration. Do NOT use them to fetch or generate images.
- Write copy only. Respond with a single JSON object and nothing else.`;
}

export function buildUserPrompt(input: LandingPageFormInput): string {
  const prompt = input.prompt.trim();
  const details: string[] = [];

  if (input.brandName.trim()) details.push(`Business or product name: ${input.brandName}`);
  if (input.whatItDoes.trim()) details.push(`What it does: ${input.whatItDoes}`);
  if (input.targetAudience.trim())
    details.push(`Target audience: ${input.targetAudience}`);
  if (input.mainProblem.trim()) details.push(`Main problem it solves: ${input.mainProblem}`);
  if (input.mainBenefit.trim()) details.push(`Main benefit: ${input.mainBenefit}`);
  if (input.tone.trim()) details.push(`Tone: ${input.tone}`);
  if (input.primaryCTA.trim()) details.push(`Primary call-to-action: ${input.primaryCTA}`);
  if (input.offerOrPricing.trim())
    details.push(`Offer or pricing: ${input.offerOrPricing}`);
  if (input.contactInfo.trim()) details.push(`Contact info: ${input.contactInfo}`);

  const detailBlock = details.length
    ? `\n\nAdditional details the user provided (use when present, otherwise infer):\n${details.join("\n")}`
    : "";

  return `Create landing page copy${prompt ? ` from this request:\n"${prompt}"` : ""}${detailBlock}`;
}
