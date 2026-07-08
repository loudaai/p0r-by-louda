# AGENTS.md

## Project Overview

This project is a same-day, no-cost MVP called **AI Landing Page Website Generator**.

The app lets a user describe a business, product, service, personal brand, startup idea, student project, or local business. It then uses AI to generate structured landing page content and turns that content into a polished one-page website preview.

The final output should be a complete standalone `index.html` file that the user can copy or download.

This is not a full website builder.
This is not a SaaS dashboard.
This is not a drag-and-drop editor.
This is a focused AI tool for quickly generating a simple one-page landing page.

## Main Goal

Build a clean, working, deployed MVP that can be shared today.

The final MVP must allow the user to:

1. Fill out a short form about a business or idea.
2. Generate structured landing page content using OpenRouter.
3. Preview the generated landing page.
4. Copy the generated HTML.
5. Download the website as `index.html`.
6. Open the downloaded file directly in a browser.

## Tech Stack

Use:

* Next.js
* TypeScript
* Tailwind CSS
* shadcn/ui
* OpenRouter API
* HY3/free OpenRouter model if available
* Vercel free tier

Use free tools and free tiers only.

Avoid:

* Paid APIs
* Paid databases
* Paid templates
* Paid UI kits
* Paid assets
* Paid hosting

## Hard Scope Rules

Do not build:

* Auth
* Database
* Dashboard
* Payments
* Drag-and-drop editor
* Custom domains
* User hosting
* Saved projects
* User accounts
* Team accounts
* Complex template systems
* Multiple unnecessary pages
* Image generation
* Logo upload
* Section-by-section editor
* Full website builder functionality

The priority is a working deployed product, not a large feature set.

## Product Principle

The AI should generate **structured content only**.

Do not ask the AI to generate:

* React components
* Next.js pages
* Random HTML layouts
* Tailwind code
* Full app code
* External scripts

The app should own:

* Layout
* Styling
* Preview rendering
* HTML export
* Copy behavior
* Download behavior

The correct pipeline is:

```txt
User form input
→ Server-side OpenRouter call
→ Structured JSON content
→ Parse and normalize response
→ Render React preview
→ Generate standalone HTML string
→ Copy or download index.html
```

## Required User Flow

The app should work like this:

1. User opens the app.
2. User sees a clean dark interface.
3. User fills out a short form.
4. User clicks generate.
5. Client sends the form data to a local server endpoint.
6. Server calls OpenRouter using the server-side API key.
7. AI returns structured JSON.
8. Server parses and normalizes the response.
9. Client receives the structured landing page content.
10. App renders a polished landing page preview.
11. App generates a standalone HTML string from the same content.
12. User can copy the HTML.
13. User can download `index.html`.
14. User can edit the form and generate again.

## Required Form Fields

The form should stay short.

Use these fields:

* Business/product name
* What it does
* Target audience
* Main problem it solves
* Main benefit
* Tone
* Primary call-to-action
* Optional offer/pricing
* Optional contact info

Tone options:

* Clear and practical
* Friendly and casual
* Professional and direct
* Premium but not hypey
* Student project style
* Local business style

Do not add more fields unless they clearly improve generation quality and do not slow down the MVP.

## Required AI Output Shape

Use this structured content type:

```ts
export type LandingPageContent = {
  brandName: string
  tagline: string
  heroHeadline: string
  heroSubheadline: string
  primaryCTA: string
  secondaryCTA: string
  problemTitle: string
  problemDescription: string
  solutionTitle: string
  solutionDescription: string
  benefits: string[]
  features: {
    title: string
    description: string
  }[]
  faqs: {
    question: string
    answer: string
  }[]
  pricingOrOffer: string
  contactText: string
  footerText: string
}
```

The AI should return JSON only.

No markdown.
No code fences.
No explanations.
No HTML.
No React.

## AI Copywriting Rules

Generated copy should be:

* Specific
* Practical
* Clear
* Useful
* Simple
* Relevant to the user input
* Non-hypey

Avoid these words and phrases:

* innovative
* revolutionary
* game-changing
* next-level
* seamless
* cutting-edge
* world-class
* powerful solution
* transform your business
* unlock your potential

Do not invent:

* Fake testimonials
* Fake awards
* Fake numbers
* Fake case studies
* Unrealistic guarantees
* Claims not supported by the user input

## OpenRouter Rules

OpenRouter must only be called from server-side code.

Use:

```env
OPENROUTER_API_KEY=
OPENROUTER_MODEL=tencent/hy3:free
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Rules:

* Never expose the OpenRouter API key to the client.
* Do not use `NEXT_PUBLIC_OPENROUTER_API_KEY`.
* Client components must not call OpenRouter directly.
* Client should call a local server endpoint.
* Server endpoint should call OpenRouter.
* Model should be configurable through `OPENROUTER_MODEL`.
* Default model can be `tencent/hy3:free`.
* If HY3 is unavailable or rate-limited, switch the model through the env variable instead of changing the app architecture.

## Prompting Rules for AI Generation

Use a strong system prompt that tells the model:

* Return JSON only.
* Do not use markdown.
* Do not use code fences.
* Do not output HTML.
* Do not output React.
* Generate landing page copy only.
* Be clear and specific.
* Avoid generic startup hype.
* Avoid banned buzzwords.
* Do not invent false claims.

The user prompt should include:

* Business/product name
* What it does
* Target audience
* Main problem
* Main benefit
* Tone
* CTA
* Optional offer/pricing
* Optional contact info

The output must match `LandingPageContent`.

## Parsing and Normalization Rules

Do not trust AI output blindly.

Implement parsing and normalization.

Required behavior:

* Strip markdown code fences if returned.
* Trim whitespace.
* Parse JSON safely.
* Return a readable error if parsing fails.
* Normalize missing fields.
* Ensure `benefits` is an array.
* Ensure `features` is an array of objects with `title` and `description`.
* Ensure `faqs` is an array of objects with `question` and `answer`.
* Prevent the preview from crashing because of malformed AI output.

Useful helpers:

```ts
parseAiJson(raw: string)
normalizeLandingPageContent(value: unknown): LandingPageContent
ensureStringArray(value: unknown, count: number): string[]
ensureFeatureArray(value: unknown, count: number)
ensureFaqArray(value: unknown, count: number)
```

## HTML Export Rules

The exported website must be:

* A complete HTML document
* A single file
* Named `index.html`
* Responsive
* Dark monochrome
* Styled with embedded CSS
* Usable when opened directly in a browser
* Free of external dependencies
* Free of external scripts
* Free of external CSS frameworks
* Free of required images

Implement:

```ts
generateStandaloneHtml(content: LandingPageContent): string
```

Also implement:

```ts
escapeHtml(value: string): string
downloadHtmlFile(content: LandingPageContent): void
copyHtmlToClipboard(content: LandingPageContent): Promise<void>
```

Security rule:

All user and AI-generated content must be escaped before being injected into the standalone HTML string.

Do not render raw AI HTML.

Do not use `dangerouslySetInnerHTML` for the app preview.

## Preview Rules

The app preview should be rendered with React components using the structured content.

The preview should include:

* Hero section
* Tagline
* Hero headline
* Hero subheadline
* Primary CTA
* Secondary CTA
* Problem section
* Solution section
* Benefits
* Features
* FAQ
* Pricing/contact CTA section
* Footer

The preview should look polished but simple.

Do not use an iframe unless necessary. A React preview is enough for the MVP.

## UI Design Rules

Use shadcn/ui where useful.

Use only the required components:

* Button
* Input
* Textarea
* Select
* Card
* Badge
* Separator
* Skeleton

Optional:

* Toast or Sonner, only if already easy to add

Design direction:

* Dark mode first
* Monochrome only
* Black
* Zinc
* Neutral
* White
* Gray borders
* Minimal
* Clean
* Professional
* Screenshot-friendly

Avoid:

* Bright colors
* Complex animations
* Sidebar
* Dashboard layout
* Login screen
* Marketing bloat
* Extra pages

Preferred layout:

* Centered max-width container
* Simple header
* Short product explanation
* Form inside a clean card
* Generated website preview inside another card
* Copy HTML button
* Download `index.html` button
* Example presets
* Small footer

## State Requirements

The app should handle:

* Empty state before generation
* Form validation error
* Loading state while generating
* API error state
* JSON parsing error state
* Generated preview state
* Copied state after copying HTML
* Disabled export buttons before content exists

Keep state simple.

Do not add global state management.

## Example Presets

Add a few presets for demo and testing:

* Local coffee shop
* Freelance web design service
* Student study app
* Beginner fitness tracker

Presets should fill the form instantly and remain editable.

Do not add images or external assets.

## Build Order

Follow this order:

1. Inspect current project state.
2. Confirm installed dependencies.
3. Set up or verify Tailwind CSS.
4. Set up or verify shadcn/ui.
5. Build the dark monochrome UI shell.
6. Add the form and validation.
7. Add example presets.
8. Add `LandingPageContent` and `LandingPageFormInput` types.
9. Add a sample `LandingPageContent` object.
10. Build the `LandingPagePreview` component using sample content.
11. Build `generateStandaloneHtml()`.
12. Add `escapeHtml()`.
13. Add Copy HTML behavior.
14. Add Download `index.html` behavior.
15. Create server-side OpenRouter generation endpoint.
16. Add system prompt and user prompt builder.
17. Parse and normalize the AI response.
18. Connect the Generate button to the endpoint.
19. Add loading and error states.
20. Polish the UI.
21. Run the production build.
22. Fix TypeScript, lint, and build errors.
23. Prepare for Vercel deployment.

Do not start with AI integration. Build the UI, preview, and export flow with sample data first. Then connect OpenRouter.

## Acceptance Criteria

The MVP is complete when:

* App runs locally.
* User can fill out the form.
* User can use example presets.
* User can generate landing page content through OpenRouter.
* OpenRouter is called from server-side code only.
* API key is never exposed to the client.
* Generated content renders in a polished preview.
* User can copy the generated HTML.
* User can download `index.html`.
* Downloaded `index.html` opens directly in a browser.
* Exported HTML is responsive.
* Exported HTML uses embedded CSS.
* UI is dark, monochrome, minimal, and screenshot-friendly.
* App is ready for Vercel deployment.
* No auth, database, dashboard, payments, or drag-and-drop editor exists.

## Manual Test Checklist

Before deployment, verify:

```txt
[ ] App opens locally
[ ] Main page is dark and monochrome
[ ] Form fields work
[ ] Required field validation works
[ ] Presets fill the form
[ ] Generate button shows loading state
[ ] API errors show readable messages
[ ] AI output renders in preview
[ ] Preview does not crash with partial output
[ ] Copy HTML works
[ ] Download index.html works
[ ] Downloaded file opens in browser
[ ] Downloaded file is responsive
[ ] No OpenRouter key appears in client code
[ ] No auth exists
[ ] No database exists
[ ] No dashboard exists
[ ] No payments exist
[ ] Production build passes
```

## Vercel Deployment Notes

Before deploying:

* Push project to GitHub.
* Import project into Vercel.
* Add environment variables:

  * `OPENROUTER_API_KEY`
  * `OPENROUTER_MODEL`
  * `NEXT_PUBLIC_SITE_URL`
* Redeploy after adding environment variables.
* Test generation on the deployed URL.
* Download `index.html` from deployed app.
* Open downloaded file locally.
* Take screenshot for sharing.

## Development Philosophy

Keep the app small.

Prefer boring, reliable code over clever abstractions.

Prioritize:

1. Working generation
2. Working preview
3. Working export
4. Working deployment
5. Clean UI

Do not overbuild.

The goal is to ship a useful AI tool today, not design a full platform.
