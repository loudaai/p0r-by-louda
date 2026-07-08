import type { CSSProperties } from "react";

import { FEATURE_ICONS, GENERATED_SITE_CSS, themeVars } from "@/lib/generated-site";
import type {
  LandingPageContent,
  LandingPageDesignInput,
} from "@/lib/types";

function FeatureGlyph({ index, color }: { index: number; color: string }) {
  const paths = FEATURE_ICONS[index % FEATURE_ICONS.length];
  return (
    <svg className="glyph" viewBox="0 0 24 24" aria-hidden="true">
      {paths.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke={color}
          strokeWidth={1.7}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}

function HeroArt() {
  return (
    <div className="hero-art" aria-hidden="true">
      <div className="art-glow" />
      <div className="art-grid" />
      <div className="art-card art-card--a">
        <span className="art-dot" />
        <div className="art-line" />
        <div className="art-line short" />
      </div>
      <div className="art-card art-card--b">
        <div className="art-bar" />
        <div className="art-line" />
        <div className="art-line short" />
      </div>
      <div className="art-orb" />
      <div className="art-ring" />
    </div>
  );
}

function BrowserMockup() {
  return (
    <div className="browser" aria-hidden="true">
      <div className="browser-bar">
        <span />
        <span />
        <span />
      </div>
      <div className="browser-body">
        <div className="bb-row">
          <div className="bb-thumb" />
          <div className="bb-lines">
            <span />
            <span className="short" />
            <span className="tiny" />
          </div>
        </div>
        <div className="bb-row">
          <div className="bb-thumb alt" />
          <div className="bb-lines">
            <span />
            <span className="short" />
          </div>
        </div>
        <div className="bb-stack">
          <div className="bb-pill" />
          <div className="bb-pill" />
          <div className="bb-pill" />
        </div>
      </div>
    </div>
  );
}

export function LandingPreview({
  content,
  design,
}: {
  content: LandingPageContent;
  design: LandingPageDesignInput;
}) {
  const style = themeVars(design) as CSSProperties;
  const photos = design.photoUrls.filter((p) => p.trim() !== "");
  const heroPhoto = design.photoUrls.find((p) => p.trim() !== "");
  const showPhotos = photos.length > 0;

  return (
    <div className="lp" id="top" style={style}>
      <style>{GENERATED_SITE_CSS}</style>

      <header className="site">
        {design.logoDataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <a className="brand" href="#top">
            <img className="logo" src={design.logoDataUrl} alt="Logo" />
          </a>
        ) : (
          <a className="brand" href="#top">
            {content.brandName}
          </a>
        )}
        <nav className="nav">
          <a href="#features">Features</a>
          <a href="#faq">FAQ</a>
          <a href="#start">Get started</a>
        </nav>
        <span className="header-cta">
          {content.primaryCTA ? (
            <span className="btn btn-primary">{content.primaryCTA}</span>
          ) : null}
        </span>
      </header>

      <section className="hero">
        <div className="hero-copy">
          {content.tagline ? (
            <span className="eyebrow">{content.tagline}</span>
          ) : null}
          <h1>{content.heroHeadline}</h1>
          {content.heroSubheadline ? (
            <p className="sub lead">{content.heroSubheadline}</p>
          ) : null}
          <div className="cta">
            {content.primaryCTA ? (
              <span className="btn btn-primary">{content.primaryCTA}</span>
            ) : null}
            {content.secondaryCTA ? (
              <span className="btn btn-secondary">{content.secondaryCTA}</span>
            ) : null}
          </div>
          {content.benefits.length > 0 ? (
            <div className="trust">
              {content.benefits.slice(0, 4).map((t, i) => (
                <span className="trust-item" key={i}>
                  {t}
                </span>
              ))}
            </div>
          ) : null}
        </div>
        {heroPhoto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <div className="photo-panel">
            <img src={heroPhoto} alt="" loading="lazy" />
          </div>
        ) : (
          <HeroArt />
        )}
      </section>

      {content.benefits.length > 0 ? (
        <section className="section" id="why">
          <div className="wrap">
            <div className="benefits">
              {content.benefits.map((benefit, i) => (
                <div className="benefit" key={i}>
                  <span className="mark">{i + 1}</span>
                  <p>{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section" id="problem">
        <div className="wrap">
          <div className="split">
            <div className="panel">
              <span className="tag">Problem</span>
              <h3>{content.problemTitle}</h3>
              <p>{content.problemDescription}</p>
            </div>
            <div className="panel">
              <span className="tag">Solution</span>
              <h3>{content.solutionTitle}</h3>
              <p>{content.solutionDescription}</p>
            </div>
          </div>
        </div>
      </section>

      {content.features.length > 0 ? (
        <section className="section" id="features">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow">What you get</span>
              <h2>Built to do the work for you</h2>
            </div>
            <div className="bento">
              {content.features.map((feature, i) => (
                <div className="feature" key={i}>
                  <FeatureGlyph index={i} color={design.accentColor} />
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                  <div className="mini">
                    <span className="chip">
                      {feature.title.split(" ")[0] || "Feature"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section" id="showcase">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">A closer look</span>
            <h2>Designed with intention</h2>
          </div>
          <div className="showcase">
            {showPhotos ? (
              // eslint-disable-next-line @next/next/no-img-element
              <div className="photo-panel">
                <img src={photos[0]} alt="" loading="lazy" />
              </div>
            ) : (
              <BrowserMockup />
            )}
            {showPhotos ? (
              <div className="gallery">
                {photos.map((url, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={i} src={url} alt="" loading="lazy" />
                ))}
              </div>
            ) : (
              <div className="gallery">
                <div
                  className="photo-panel"
                  style={{ borderStyle: "dashed", background: "var(--surface-2)" }}
                />
                <div
                  className="photo-panel"
                  style={{ borderStyle: "dashed", background: "var(--surface-2)" }}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {content.faqs.length > 0 ? (
        <section className="section" id="faq">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow">FAQ</span>
              <h2>Questions, answered</h2>
            </div>
            <div className="faqs">
              {content.faqs.map((faq, i) => (
                <div className="faq" key={i}>
                  <span className="q-mark">{i + 1}</span>
                  <div>
                    <h3>{faq.question}</h3>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <span id="start" />
      <section className="section">
        <div className="wrap">
          <div className="cta-band">
            {content.tagline ? (
              <div className="eyebrow" style={{ justifyContent: "center" }}>
                {content.tagline}
              </div>
            ) : null}
            <h2>{content.heroHeadline}</h2>
            {content.heroSubheadline ? (
              <p className="lead">{content.heroSubheadline}</p>
            ) : null}
            <div className="cta">
              {content.primaryCTA ? (
                <span className="btn btn-primary">{content.primaryCTA}</span>
              ) : null}
              {content.secondaryCTA ? (
                <span className="btn btn-secondary">{content.secondaryCTA}</span>
              ) : null}
            </div>
            {content.pricingOrOffer ? (
              <p className="muted-text" style={{ marginTop: 18, fontSize: 14 }}>
                {content.pricingOrOffer}
              </p>
            ) : null}
            {content.contactText ? (
              <p className="muted-text" style={{ marginTop: 6, fontSize: 14 }}>
                {content.contactText}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <footer className="site">
        <span className="brand">{content.brandName}</span>
        <span>{content.footerText}</span>
      </footer>
    </div>
  );
}
