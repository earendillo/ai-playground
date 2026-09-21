import { BadgeVariantGrid, badgeKinds, badgeShapesFor } from '@/components/ui/badge';

export default function BadgePage() {
  return (
    // Pinned to light: these galleries reproduce the Figma frames, which document the light
    // mode, and `color/background/surface` has no dark value in the design file. The components
    // themselves follow the surrounding mode.
    <main className="flex min-h-screen flex-col gap-10 bg-background-surface p-10" data-theme="light">
      <h1 className="text-[20px] font-medium text-text-default">Badge — Figma 2321:8706</h1>
      {badgeKinds.flatMap((kind) =>
        badgeShapesFor(kind).map((shape) => <BadgeVariantGrid key={`${kind}-${shape}`} kind={kind} shape={shape} />),
      )}
    </main>
  );
}
