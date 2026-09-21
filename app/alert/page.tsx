import { AlertVariantGrid, alertKinds } from '@/components/ui/alert';

export default function AlertPage() {
  return (
    <main className="flex min-h-screen flex-col gap-10 bg-[#ffffff] p-10">
      <h1 className="text-[20px] font-medium text-[#030712]">Alert — Figma 1515:6165</h1>
      {alertKinds.map((kind) => (
        <AlertVariantGrid key={kind} kind={kind} />
      ))}
    </main>
  );
}
