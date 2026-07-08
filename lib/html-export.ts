import type { LandingPageContent } from "./types";

export function escapeHtml(value: string): string {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const STYLES = `
:root {
  color-scheme: dark;
}
* { box-sizing: border-box; }
html { -webkit-text-size-adjust: 100%; }
body {
  margin: 0;
  background: #0a0a0a;
  color: #e4e4e4;
  font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  line-height: 1.6;
}
.page {
  max-width: 768px;
  margin: 0 auto;
  padding: 0 20px 48px;
}
section { border-bottom: 1px solid #27272a; padding: 40px 0; }
.hero { text-align: center; padding-top: 56px; }
.brand {
  display: block;
  font-size: 12px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #a1a1aa;
}
.tagline { display: block; margin-top: 8px; color: #a1a1aa; font-size: 14px; }
.hero h1 {
  margin: 16px auto 0;
  max-width: 640px;
  font-size: 34px;
  line-height: 1.2;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: #fafafa;
}
.hero .sub {
  margin: 16px auto 0;
  max-width: 560px;
  color: #a1a1aa;
  font-size: 16px;
}
.cta { margin-top: 24px; display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; }
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 0 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
}
.btn-primary { background: #fafafa; color: #0a0a0a; }
.btn-secondary { border: 1px solid #3f3f46; color: #e4e4e4; }
h2 { margin: 0 0 12px; font-size: 20px; font-weight: 600; color: #fafafa; }
h3 { margin: 0; font-size: 15px; font-weight: 500; color: #fafafa; }
p { margin: 0; color: #a1a1aa; font-size: 15px; }
ul.benefits { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
ul.benefits li { display: flex; align-items: flex-start; gap: 12px; color: #d4d4d4; font-size: 15px; }
.dot { margin-top: 8px; width: 6px; height: 6px; border-radius: 9999px; background: #a1a1aa; flex: none; }
.features { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
.feature { border: 1px solid #27272a; background: rgba(39,39,42,0.25); border-radius: 8px; padding: 16px; display: flex; flex-direction: column; gap: 8px; }
.feature p { font-size: 14px; }
.faqs { display: flex; flex-direction: column; }
.faq { padding: 12px 0; border-top: 1px solid #27272a; display: flex; flex-direction: column; gap: 4px; }
.faq:first-child { border-top: none; }
.offer { border: 1px solid #27272a; background: rgba(39,39,42,0.25); border-radius: 8px; padding: 20px; display: flex; flex-direction: column; gap: 8px; }
.offer .label { font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: #a1a1aa; }
.contact { display: flex; flex-direction: column; gap: 4px; }
.contact .label { font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: #a1a1aa; }
footer { text-align: center; padding: 24px 0; color: #71717a; font-size: 12px; }
@media (max-width: 560px) {
  .features { grid-template-columns: 1fr; }
  .hero h1 { font-size: 28px; }
}
`;

export function generateStandaloneHtml(content: LandingPageContent): string {
  const esc = escapeHtml;

  const benefits = content.benefits
    .map(
      (benefit) =>
        `<li><span class="dot"></span><span>${esc(benefit)}</span></li>`
    )
    .join("");

  const features = content.features
    .map(
      (feature) => `
        <div class="feature">
          <h3>${esc(feature.title)}</h3>
          <p>${esc(feature.description)}</p>
        </div>`
    )
    .join("");

  const faqs = content.faqs
    .map(
      (faq) => `
        <div class="faq">
          <h3>${esc(faq.question)}</h3>
          <p>${esc(faq.answer)}</p>
        </div>`
    )
    .join("");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(content.brandName)}</title>
<style>${STYLES}</style>
</head>
<body>
<main class="page">
  <section class="hero">
    <span class="brand">${esc(content.brandName)}</span>
    ${content.tagline ? `<span class="tagline">${esc(content.tagline)}</span>` : ""}
    <h1>${esc(content.heroHeadline)}</h1>
    ${
      content.heroSubheadline
        ? `<p class="sub">${esc(content.heroSubheadline)}</p>`
        : ""
    }
    <div class="cta">
      ${
        content.primaryCTA
          ? `<span class="btn btn-primary">${esc(content.primaryCTA)}</span>`
          : ""
      }
      ${
        content.secondaryCTA
          ? `<span class="btn btn-secondary">${esc(content.secondaryCTA)}</span>`
          : ""
      }
    </div>
  </section>

  <section>
    <h2>${esc(content.problemTitle)}</h2>
    <p>${esc(content.problemDescription)}</p>
  </section>

  <section>
    <h2>${esc(content.solutionTitle)}</h2>
    <p>${esc(content.solutionDescription)}</p>
  </section>

  ${
    benefits
      ? `<section>
    <h2>Why it helps</h2>
    <ul class="benefits">${benefits}</ul>
  </section>`
      : ""
  }

  ${
    features
      ? `<section>
    <h2>What you get</h2>
    <div class="features">${features}</div>
  </section>`
      : ""
  }

  ${
    faqs
      ? `<section>
    <h2>FAQ</h2>
    <div class="faqs">${faqs}</div>
  </section>`
      : ""
  }

  ${
    content.pricingOrOffer
      ? `<section>
    <div class="offer">
      <span class="label">Offer</span>
      <p>${esc(content.pricingOrOffer)}</p>
    </div>
  </section>`
      : ""
  }

  ${
    content.contactText
      ? `<section>
    <div class="contact">
      <span class="label">Contact</span>
      <p>${esc(content.contactText)}</p>
    </div>
  </section>`
      : ""
  }

  <footer>${esc(content.footerText)}</footer>
</main>
</body>
</html>`;
}
