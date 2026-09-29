import Link from "next/link";
import { notFound } from "next/navigation";
import { areas } from "@/data/content";

export function generateStaticParams() {
  return areas.map((a) => ({ id: String(a.id) }));
}

export default async function Area({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const area = areas.find((a) => a.id === Number(id));
  if (!area) notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/" className="text-sm text-red-700">Back to home</Link>
      <h1 className="mt-4 text-3xl font-bold">{area.title}</h1>
      <p className="mt-4 whitespace-pre-line leading-7 text-slate-700">{area.body}</p>
    </main>
  );
}
