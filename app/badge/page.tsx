import { BadgeVariantGrid, badgeKinds, badgeShapesFor } from '@/components/ui/badge';

export default function BadgePage() {
  return (
    <main className="flex min-h-screen flex-col gap-10 bg-[#ffffff] p-10">
      <h1 className="text-[20px] font-medium text-[#030712]">Badge — Figma 2321:8706</h1>
      {badgeKinds.flatMap((kind) =>
        badgeShapesFor(kind).map((shape) => <BadgeVariantGrid key={`${kind}-${shape}`} kind={kind} shape={shape} />),
      )}
    </main>
  );
}
