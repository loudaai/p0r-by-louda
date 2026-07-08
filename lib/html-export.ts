import type { LandingPageContent, LandingPageDesignInput } from "./types";
import {
  GENERATED_SITE_CSS,
  featureGlyphSvg,
  heroArtHtml,
  inferVisualStyle,
  showcaseGraphicHtml,
  themeVars,
} from "./generated-site";

export function escapeHtml(value: string): string {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function varsToStyle(design: LandingPageDesignInput): string {
  return Object.entries(themeVars(design))
    .map(([key, value]) => `${key}:${value}`)
    .join(";");
}

export function generateStandaloneHtml(
  content: LandingPageContent,
  design: LandingPageDesignInput
): string {
  const esc = escapeHtml;
  const styleAttr = varsToStyle(design);
  const visualStyle = inferVisualStyle(content);

  const logo = design.logoDataUrl
    ? `<a class="brand" href="#top"><img class="logo" src="${esc(design.logoDataUrl)}" alt="Logo" /></a>`
    : `<a class="brand" href="#top">${esc(content.brandName)}</a>`;

  const heroPhoto = design.photoUrls.find((p) => p.trim() !== "");
  const heroVisual = heroPhoto
    ? `<div class="photo-panel"><img src="${esc(heroPhoto)}" alt="" loading="lazy" /></div>`
    : heroArtHtml(visualStyle, design);

  const trustItems = content.benefits.slice(0, 4);
  const trust = trustItems.length
    ? `<div class="trust">${trustItems
        .map((t) => `<span class="trust-item">${esc(t)}</span>`)
        .join("")}</div>`
    : "";

  const benefitCards = content.benefits
    .map(
      (benefit, i) => `
      <div class="benefit">
        <span class="mark">${i + 1}</span>
        <p>${esc(benefit)}</p>
      </div>`
    )
    .join("");

  const features = content.features
    .map(
      (feature, i) => `
      <div class="feature">
        ${featureGlyphSvg(i, design.accentColor)}
        <h3>${esc(feature.title)}</h3>
        <p>${esc(feature.description)}</p>
        <div class="mini"><span class="chip">${esc(feature.title.split(" ")[0] || "Feature")}</span></div>
      </div>`
    )
    .join("");

  const faqs = content.faqs
    .map(
      (faq, i) => `
      <div class="faq">
        <span class="q-mark">${i + 1}</span>
        <div>
          <h3>${esc(faq.question)}</h3>
          <p>${esc(faq.answer)}</p>
        </div>
      </div>`
    )
    .join("");

  const photos = design.photoUrls.filter((p) => p.trim() !== "");
  const showPhotos = photos.length > 0;

  const gallery = showPhotos
    ? `<div class="gallery">${photos
        .map((url) => `<img src="${esc(url)}" alt="" loading="lazy" />`)
        .join("")}</div>`
    : "";

  const showcaseVisual = showPhotos
    ? `<div class="photo-panel"><img src="${esc(photos[0])}" alt="" loading="lazy" /></div>`
    : showcaseGraphicHtml(visualStyle, design);

  const finalCta = `
    <section class="section">
      <div class="wrap">
        <div class="cta-band">
          ${
            content.tagline
              ? `<div class="eyebrow" style="justify-content:center">${esc(content.tagline)}</div>`
              : ""
          }
          <h2>${esc(content.heroHeadline)}</h2>
          ${
            content.heroSubheadline
              ? `<p class="lead">${esc(content.heroSubheadline)}</p>`
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
          ${
            content.pricingOrOffer
              ? `<p class="muted-text" style="margin-top:18px;font-size:14px">${esc(content.pricingOrOffer)}</p>`
              : ""
          }
          ${
            content.contactText
              ? `<p class="muted-text" style="margin-top:6px;font-size:14px">${esc(content.contactText)}</p>`
              : ""
          }
        </div>
      </div>
    </section>`;

  return `<!doctype html>
<html lang="en" style="${styleAttr}">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(content.brandName)}</title>
<meta name="description" content="${esc(content.heroSubheadline || content.tagline)}" />
<style>${GENERATED_SITE_CSS}</style>
</head>
<body>
<div class="lp" id="top">
  <header class="site">
    ${logo}
    <nav class="nav">
      <a href="#features">Features</a>
      <a href="#faq">FAQ</a>
      <a href="#start">Get started</a>
    </nav>
    <span class="header-cta">
      ${
        content.primaryCTA
          ? `<span class="btn btn-primary">${esc(content.primaryCTA)}</span>`
          : ""
      }
    </span>
  </header>

  <section class="hero">
    <div class="hero-copy">
      ${content.tagline ? `<span class="eyebrow">${esc(content.tagline)}</span>` : ""}
      <h1>${esc(content.heroHeadline)}</h1>
      ${content.heroSubheadline ? `<p class="sub lead">${esc(content.heroSubheadline)}</p>` : ""}
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
      ${trust}
    </div>
    ${heroVisual}
  </section>

  ${
    content.benefits.length
      ? `<section class="section" id="why">
      <div class="wrap">
        <div class="benefits">${benefitCards}</div>
      </div>
    </section>`
      : ""
  }

  <section class="section" id="problem">
    <div class="wrap">
      <div class="split">
        <div class="panel">
          <span class="tag">Problem</span>
          <h3>${esc(content.problemTitle)}</h3>
          <p>${esc(content.problemDescription)}</p>
        </div>
        <div class="panel">
          <span class="tag">Solution</span>
          <h3>${esc(content.solutionTitle)}</h3>
          <p>${esc(content.solutionDescription)}</p>
        </div>
      </div>
    </div>
  </section>

  ${
    content.features.length
      ? `<section class="section" id="features">
      <div class="wrap">
        <div class="section-head">
          <span class="eyebrow">What you get</span>
          <h2>Built to do the work for you</h2>
        </div>
        <div class="bento">${features}</div>
      </div>
    </section>`
      : ""
  }

  <section class="section" id="showcase">
    <div class="wrap">
      <div class="section-head">
        <span class="eyebrow">A closer look</span>
        <h2>Designed with intention</h2>
      </div>
      <div class="showcase">
        ${showcaseVisual}
        ${gallery ? `<div class="gallery">${gallery}</div>` : `<div class="gallery"><div class="photo-panel" style="border-style:dashed;background:var(--surface-2)"></div><div class="photo-panel" style="border-style:dashed;background:var(--surface-2)"></div></div>`}
      </div>
    </div>
  </section>

  ${
    content.faqs.length
      ? `<section class="section" id="faq">
      <div class="wrap">
        <div class="section-head">
          <span class="eyebrow">FAQ</span>
          <h2>Questions, answered</h2>
        </div>
        <div class="faqs">${faqs}</div>
      </div>
    </section>`
      : ""
  }

  <span id="start"></span>
  ${finalCta}

  <footer class="site">
    <span class="brand">${esc(content.brandName)}</span>
    <span>${esc(content.footerText)}</span>
  </footer>
</div>
</body>
</html>`;
}
