"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const TONES = [
  "Clear and practical",
  "Friendly and casual",
  "Professional and direct",
  "Premium but not hypey",
  "Student project style",
  "Local business style",
];

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      {children}
    </div>
  );
}

export function GeneratorForm() {
  const [tone, setTone] = React.useState<string>(TONES[0]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Describe your landing page</CardTitle>
        <CardDescription>
          Fill in the details below. Generation is not connected yet.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <Field label="Business or product name">
          <Input placeholder="e.g. North End Coffee" />
        </Field>

        <Field label="What it does">
          <Textarea placeholder="e.g. A neighborhood coffee shop serving fresh roasts and pastries." />
        </Field>

        <Field label="Target audience">
          <Input placeholder="e.g. Local professionals and students" />
        </Field>

        <Field label="Tone">
          <Select
            value={tone}
            onValueChange={(value) => setTone(value ?? TONES[0])}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TONES.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Primary call-to-action">
          <Input placeholder="e.g. Order online" />
        </Field>

        <Button size="lg" className="w-full" disabled>
          Generate landing page
        </Button>
      </CardContent>
    </Card>
  );
}
