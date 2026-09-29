import Link from "next/link";
import { activities } from "@/data/content";

export default function Activity() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/" className="text-sm text-red-700">Back to home</Link>
      <h1 className="mt-4 text-3xl font-bold">Program of Activities</h1>
      <ul className="mt-6 divide-y border-y">
        {activities.map((a) => (
          <li key={a.title} className="py-4">
            <p className="text-sm text-slate-500">{a.date}</p>
            <p className="font-semibold">{a.title}</p>
            <p className="text-sm text-slate-600">{a.note}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
