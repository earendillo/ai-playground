import { AlertVariantGrid, alertKinds } from '@/components/ui/alert';

export default function AlertPage() {
  return (
    // Pinned to light: these galleries reproduce the Figma frames, which document the light
    // mode, and `color/background/surface` has no dark value in the design file. The components
    // themselves follow the surrounding mode.
    <main className="flex min-h-screen flex-col gap-10 bg-background-surface p-10" data-theme="light">
      <h1 className="text-[20px] font-medium text-text-default">Alert — Figma 1515:6165</h1>
      {alertKinds.map((kind) => (
        <AlertVariantGrid key={kind} kind={kind} />
      ))}
    </main>
  );
}
