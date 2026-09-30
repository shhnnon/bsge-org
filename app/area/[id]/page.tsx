import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import { areas } from "@/data/content";

export function generateStaticParams() {
  return areas.map((a) => ({ id: String(a.id) }));
}

export default async function Area({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const area = areas.find((a) => a.id === Number(id));

  if (!area) notFound();

  const next = areas.find((a) => a.id === area.id + 1);

  return (
    <main className="area-page">
      <header className="area-page-header">
        <Link href="/" className="area-brand">
          <img src="/batstateu.svg" alt="Batangas State University" className="area-brand-logo" />
          <span>
            <strong>Geodetic Engineering</strong>
            <small>COE - Alangilan Campus</small>
          </span>
        </Link>
      </header>

      <nav className="area-breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/#areas">Areas</Link>
        <span>/</span>
        <strong>Area {area.id}</strong>
      </nav>

      <section className="area-hero">
        <div className="area-hero-inner">
          <div>
            <p className="area-kicker">AREA {area.id} <span>|</span> BSGE PROGRAM AREA</p>
            <h1>{area.title}</h1>
            <p>{area.summary}</p>
          </div>
          <div className="area-counter">
            <span>Area</span>
            <strong>{area.id}</strong>
            <small>of {areas.length}</small>
          </div>
        </div>
      </section>

      <section className="area-content">
        <div className="area-main-grid">
          <article className="area-intro-card">
            <span className="area-accent" />
            <p>{area.body}</p>
          </article>

          <aside className="area-drive-card">
            <div className="area-drive-icon" aria-hidden="true">
              <ExternalLink size={22} />
            </div>
            <p className="area-drive-label">ACCESS AREA FILES</p>
            <h2>Google Drive</h2>
            <p>Open the folder containing the documents and resources for this program area.</p>
            <a href={area.driveUrl} target="_blank" rel="noopener noreferrer" className="area-drive-button">
              Open Area {area.id} Files
              <ExternalLink size={16} />
            </a>
          </aside>
        </div>

        <div className="area-resource-card">
          <div>
            <span className="area-resource-label">BSGE • ALANGILAN</span>
            <h2>{area.title}</h2>
            <p>Use the Google Drive folder above to access the complete collection of documents for this area.</p>
          </div>
          <div className="area-resource-number">{String(area.id).padStart(2, "0")}</div>
        </div>
      </section>

      <nav className="area-pagination" aria-label="Area navigation">
        <Link href="/" className="area-back">
          <ArrowLeft size={17} />
          Back to Areas
        </Link>

        <div className="area-page-number">
          <span>Area</span>
          <strong>{area.id} / {areas.length}</strong>
        </div>

        {next ? (
          <Link href={`/area/${next.id}`} className="area-next">
            Area {next.id}
            <ArrowRight size={17} />
          </Link>
        ) : (
          <Link href="/area/1" className="area-next">
            Area 1
            <ArrowRight size={17} />
          </Link>
        )}
      </nav>
    </main>
  );
}
