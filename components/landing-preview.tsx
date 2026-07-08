import type { LandingPageContent } from "@/lib/types";

function Section({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`border-b border-zinc-800 px-6 py-10 sm:px-8 ${className ?? ""}`}
    >
      {children}
    </section>
  );
}

export function LandingPreview({ content }: { content: LandingPageContent }) {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-100">
      {/* Hero */}
      <section className="flex flex-col items-center gap-5 px-6 py-12 text-center sm:px-8">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
          {content.brandName}
        </span>
        {content.tagline ? (
          <span className="text-sm text-zinc-400">{content.tagline}</span>
        ) : null}
        <h1 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
          {content.heroHeadline}
        </h1>
        {content.heroSubheadline ? (
          <p className="max-w-xl text-base leading-relaxed text-zinc-400">
            {content.heroSubheadline}
          </p>
        ) : null}
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          {content.primaryCTA ? (
            <span className="inline-flex h-10 items-center justify-center rounded-lg bg-white px-5 text-sm font-medium text-zinc-950">
              {content.primaryCTA}
            </span>
          ) : null}
          {content.secondaryCTA ? (
            <span className="inline-flex h-10 items-center justify-center rounded-lg border border-zinc-700 px-5 text-sm font-medium text-zinc-200">
              {content.secondaryCTA}
            </span>
          ) : null}
        </div>
      </section>

      {/* Problem */}
      <Section>
        <div className="mx-auto flex max-w-2xl flex-col gap-3">
          <h2 className="text-xl font-semibold text-white">
            {content.problemTitle}
          </h2>
          {content.problemDescription ? (
            <p className="text-sm leading-relaxed text-zinc-400">
              {content.problemDescription}
            </p>
          ) : null}
        </div>
      </Section>

      {/* Solution */}
      <Section>
        <div className="mx-auto flex max-w-2xl flex-col gap-3">
          <h2 className="text-xl font-semibold text-white">
            {content.solutionTitle}
          </h2>
          {content.solutionDescription ? (
            <p className="text-sm leading-relaxed text-zinc-400">
              {content.solutionDescription}
            </p>
          ) : null}
        </div>
      </Section>

      {/* Benefits */}
      {content.benefits.length > 0 ? (
        <Section>
          <div className="mx-auto flex max-w-2xl flex-col gap-4">
            <h2 className="text-xl font-semibold text-white">Why it helps</h2>
            <ul className="flex flex-col gap-2">
              {content.benefits.map((benefit, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-zinc-300"
                >
                  <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      ) : null}

      {/* Features */}
      {content.features.length > 0 ? (
        <Section>
          <div className="mx-auto flex max-w-3xl flex-col gap-5">
            <h2 className="text-xl font-semibold text-white">What you get</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {content.features.map((feature, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-2 rounded-lg border border-zinc-800 bg-zinc-900/40 p-4"
                >
                  <h3 className="text-sm font-medium text-white">
                    {feature.title}
                  </h3>
                  {feature.description ? (
                    <p className="text-sm leading-relaxed text-zinc-400">
                      {feature.description}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </Section>
      ) : null}

      {/* FAQ */}
      {content.faqs.length > 0 ? (
        <Section>
          <div className="mx-auto flex max-w-2xl flex-col gap-4">
            <h2 className="text-xl font-semibold text-white">FAQ</h2>
            <div className="flex flex-col divide-y divide-zinc-800">
              {content.faqs.map((faq, i) => (
                <div key={i} className="flex flex-col gap-1 py-3">
                  <h3 className="text-sm font-medium text-zinc-100">
                    {faq.question}
                  </h3>
                  {faq.answer ? (
                    <p className="text-sm leading-relaxed text-zinc-400">
                      {faq.answer}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </Section>
      ) : null}

      {/* Pricing / offer */}
      {content.pricingOrOffer ? (
        <Section>
          <div className="mx-auto flex max-w-2xl flex-col gap-2 rounded-lg border border-zinc-800 bg-zinc-900/40 p-5">
            <h2 className="text-sm font-medium uppercase tracking-wide text-zinc-400">
              Offer
            </h2>
            <p className="text-sm leading-relaxed text-zinc-200">
              {content.pricingOrOffer}
            </p>
          </div>
        </Section>
      ) : null}

      {/* Contact */}
      {content.contactText ? (
        <Section>
          <div className="mx-auto flex max-w-2xl flex-col gap-1">
            <h2 className="text-sm font-medium uppercase tracking-wide text-zinc-400">
              Contact
            </h2>
            <p className="text-sm text-zinc-300">{content.contactText}</p>
          </div>
        </Section>
      ) : null}

      {/* Footer */}
      <footer className="px-6 py-6 text-center text-xs text-zinc-500 sm:px-8">
        {content.footerText}
      </footer>
    </div>
  );
}
