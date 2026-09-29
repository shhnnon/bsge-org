import Link from "next/link";
import Image from "next/image";
import { site, heroLinks, referenceFiles, areas, embedPdf } from "@/data/content";

export default function Home() {
  return (
    <main className="bg-white text-slate-900">
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden text-center text-white">
        <video autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover">
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex flex-col items-center gap-3 px-6">
          <Image src="/logo.png" alt={`${site.orgShort} logo`} width={140} height={140} priority />
          <h1 className="text-3xl font-bold md:text-5xl">{site.university}</h1>
          <p className="text-lg">{site.tagline}</p>
          <p className="text-sm text-white/80">CICS - {site.campus}</p>
          <p className="mt-2 text-sm text-white/80">{site.mottos.join(" · ")}</p>
          <p className="mt-6 text-xl">{site.programLine}</p>
          <h2 className="text-4xl font-bold md:text-6xl">{site.program}</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {heroLinks.map((l) => (
              <Link key={l.label} href={l.href} className="rounded-full bg-red-700 px-6 py-2 font-medium hover:bg-red-800">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="text-2xl font-bold">Reference Files</h2>
        <ul className="mt-4 divide-y border-y">
          {referenceFiles.map((f) => (
            <li key={f.label}>
              <a href={f.href} target="_blank" rel="noreferrer" className="block py-3 hover:text-red-700">
                {f.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-slate-50 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold">Explore {site.orgShort}</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {areas.map((a) => (
              <Link key={a.id} href={`/area/${a.id}`} className="rounded-xl border bg-white p-6 transition hover:border-red-700 hover:shadow">
                <h3 className="text-lg font-semibold">{a.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{a.summary}</p>
                <span className="mt-4 inline-block text-sm font-medium text-red-700">Read more</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {embedPdf && (
        <section className="mx-auto max-w-4xl px-6 py-16">
          <iframe src={embedPdf} className="h-[600px] w-full rounded-lg border" />
        </section>
      )}

      <footer className="bg-slate-900 px-6 py-10 text-center text-sm text-white/80">
        <a href={site.universityUrl} className="font-semibold text-white">{site.university}</a>
        <p className="mt-1">
          For queries and assistance:{" "}
          <a href={`mailto:${site.email}`} className="underline">{site.email}</a>
        </p>
      </footer>
    </main>
  );
}