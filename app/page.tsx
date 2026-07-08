import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GeneratorForm } from "@/components/generator-form";
import { LandingPreview } from "@/components/landing-preview";
import { SAMPLE_LANDING_PAGE } from "@/lib/sample-content";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-border/60">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold tracking-tight">
              AI Landing Page Generator
            </span>
            <Badge variant="outline">Beta</Badge>
          </div>
          <span className="text-xs text-muted-foreground">
            Powered by OpenRouter
          </span>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 gap-8 px-6 py-10 lg:grid-cols-2">
        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-semibold tracking-tight">
              Generate your landing page
            </h1>
            <p className="text-sm text-muted-foreground">
              Describe your business or idea, then preview the generated page.
            </p>
          </div>
          <GeneratorForm />
        </section>

        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold tracking-tight">Preview</h2>
            <p className="text-sm text-muted-foreground">
              Sample preview rendered from structured content.
            </p>
          </div>
          <Card className="p-0">
            <CardContent className="p-3">
              <LandingPreview content={SAMPLE_LANDING_PAGE} />
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t border-border/60">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-6 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>AI Landing Page Generator</span>
          <span>Free MVP · No account required</span>
        </div>
      </footer>
    </div>
  );
}
