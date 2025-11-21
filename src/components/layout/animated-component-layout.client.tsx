"use client"

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/react-label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Control, ExampleConfig } from "@/components/layout/animated-component-types";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { srcUrl } from "@/lib/data";
import OpenInV0 from "./open-in-v0";

const buildInitialValues = (controls?: Control[]) => {
  const values: Record<string, unknown> = {};
  controls?.forEach((c) => {
    if (c.type === "toggle") values[c.id] = c.defaultValue ?? false;
    if (c.type === "slider") values[c.id] = c.defaultValue ?? c.min ?? 0;
    if (c.type === "select") values[c.id] = c.defaultValue ?? c.options?.[0]?.value ?? "";
  });
  return values;
};

const ControlRenderer = ({
  control,
  value,
  onChange,
}: {
  control: Control;
  value: unknown;
  onChange: (v: unknown) => void;
}) => {
  if (control.type === "toggle") {
    return (
      <div className="flex items-center justify-between py-2">
        <div className="space-y-1">
          <Label htmlFor={control.id}>{control.label}</Label>
          {control.description && (
            <p className="text-xs text-muted-foreground">{control.description}</p>
          )}
        </div>
        <Switch id={control.id} checked={Boolean(value)} onCheckedChange={onChange as (v: boolean) => void} />
      </div>
    );
  }

  if (control.type === "select") {
    return (
      <div className="grid gap-2 py-2">
        <Label htmlFor={control.id}>{control.label}</Label>
        <Select value={String(value)} onValueChange={(v) => onChange(v)}>
          <SelectTrigger id={control.id} className="w-[220px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {control.options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {control.description && (
          <p className="text-xs text-muted-foreground">{control.description}</p>
        )}
      </div>
    );
  }

  const { min = 0, max = 100, step = 1, unit } = control;
  return (
    <div className="grid gap-2 py-2">
      <div className="flex items-center justify-between">
        <Label htmlFor={control.id}>{control.label}</Label>
        <span className="text-xs text-muted-foreground">
          {String(value)}{unit ? ` ${unit}` : ""}
        </span>
      </div>
      <input
        id={control.id}
        type="range"
        min={min as number}
        max={max as number}
        step={step as number}
        value={Number(value)}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-primary"
      />
      {control.description && (
        <p className="text-xs text-muted-foreground">{control.description}</p>
      )}
    </div>
  );
};

const PreviewWithRefresh = ({
  children,
  onRefresh,
  toolbarExtras,
}: {
  children: React.ReactNode;
  onRefresh: () => void;
  toolbarExtras?: React.ReactNode;
}) => {
  return (
    <div className="relative group/preview rounded-lg border border-border/50 p-4">
      <div className="absolute top-2 right-2 z-10 md:top-3">
        <div className="flex flex-col md:flex-row items-end md:items-center gap-2 md:gap-3 opacity-100 md:opacity-0 md:transition-opacity md:group-hover/preview:opacity-100">
          <Button variant="outline" size="sm" onClick={onRefresh} className="gap-1">
            <RotateCw className="h-4 w-4" />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
          <div className="flex flex-col md:flex-row gap-2 md:gap-3">
            {toolbarExtras}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default function AnimatedPreviewCustomize({
  example,
  controls,
}: {
  example: ExampleConfig;
  controls?: Control[];
}) {
  const [values, setValues] = useState<Record<string, unknown>>(
    () => buildInitialValues(controls)
  );
  const [previewKey, setPreviewKey] = useState(0);

  const onChange = (id: string, v: unknown) =>
    setValues((prev) => ({ ...prev, [id]: v }));

  const hasControls = (controls?.length ?? 0) > 0;

  const renderedPreview = useMemo(() => {
    const elem = example.component;
    if (!elem) return null;
    // Only inject values into React components, never into DOM tags (e.g. 'div')
    const isDomTag = typeof (elem as unknown as { type: unknown }).type === "string";
    if (isDomTag) return elem;
    return (import("react").then(({ cloneElement }) => cloneElement(elem as unknown as React.ReactElement, values))) as unknown as React.ReactNode;
  }, [example, values]);

  return (
    <div className="space-y-6">
      <PreviewWithRefresh
        onRefresh={() => setPreviewKey((k) => k + 1)}
        toolbarExtras={(() => {
          const match = example.filePath.match(/\/components\/([^\/]+)\//);
          const componentSlug = match ? match[1] : null;
          const registeryURL = componentSlug ? `${srcUrl}/e/${componentSlug}.json` : "";
          
          return (
            <>
              {componentSlug && (
                <Link href={`/playground?component=${componentSlug}`} target="_blank">
                  <Button variant="outline" size="sm" className="gap-2">
                    <ExternalLink className="h-4 w-4" />
                    <span className="hidden sm:inline">Open in Playground</span>
                    <span className="sm:hidden">Playground</span>
                  </Button>
                </Link>
              )}
              {componentSlug && <OpenInV0 url={registeryURL} />}
            </>
          );
        })()}
      >
        <div key={previewKey}>{renderedPreview}</div>
      </PreviewWithRefresh>

      {hasControls && (
        <div>
          <h3 className="text-xl font-semibold mb-3">Customize</h3>
          <div className="grid gap-4">
            {controls?.map((c) => (
              <ControlRenderer
                key={c.id}
                control={c}
                value={values[c.id]}
                onChange={(v) => onChange(c.id, v)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


