import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import { areas } from "@/data/content";

const defaultParameters = [
  { letter: "A", title: "Program Inputs and Processes" },
  { letter: "B", title: "Implementation" },
  { letter: "C", title: "Outcomes" },
  { letter: "D", title: "Quality Assurance and Improvement" },
  { letter: "E", title: "Monitoring and Evaluation" },
];

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
  const parameters = "parameters" in area && area.parameters
    ? area.parameters
    : defaultParameters.map((parameter) => ({
        ...parameter,
        items: [
          "System. Inputs and Processes",
          "Implementation",
          "Outcomes",
        ],
      }));

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
          <div className="area-hero-number">
            <span>{String(area.id).padStart(2, "0")}</span>
          </div>

          <div className="area-hero-copy">
            <p className="area-kicker">BSGE PROGRAM AREA</p>
            <h1>{area.title}</h1>
            <p>{area.summary}</p>
          </div>

          <aside className="area-hero-action">
            <span className="area-action-label">AREA {area.id} OF {areas.length}</span>
            <h2>Area Files</h2>
            <p>Access the documents and resources for this program area.</p>
            <a
              href={area.driveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="area-drive-button"
            >
              Open Google Drive
              <ExternalLink size={16} />
            </a>
          </aside>
        </div>
      </section>

      <section className="area-content">
        <div className="area-section-label">AREA OVERVIEW</div>

        <div className="area-main-grid">
          <article className="area-intro-card">
            <span className="area-accent" />
            <h2>{area.title}</h2>
            <p>{area.body}</p>
          </article>

          <aside className="area-drive-card">
            <div className="area-drive-icon" aria-hidden="true">
              <ExternalLink size={21} />
            </div>
            <span className="area-drive-label">DOCUMENTS & RESOURCES</span>
            <h2>Google Drive Folder</h2>
            <p>All files for Area {area.id} are organized in the linked Drive folder.</p>
            <a
              href={area.driveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="area-drive-link"
            >
              View Area {area.id} files
              <ArrowRight size={15} />
            </a>
          </aside>
        </div>

        <section className="aaccup-parameters" aria-labelledby="aaccup-parameters-title">
          <div className="aaccup-parameters-heading">
            <div>
              <span className="aaccup-eyebrow">AACCUP-ALIGNED STRUCTURE</span>
              <h2 id="aaccup-parameters-title">Parameters</h2>
            </div>
            <p>Each program area follows the same parameter-card presentation for easier accreditation document navigation.</p>
          </div>

          <div className="parameter-grid">
            {parameters.map((parameter) => (
              <article key={parameter.letter} className="parameter-card">
                <div className="parameter-title">
                  <span className="parameter-letter">PARAMETER {parameter.letter}</span>
                  <h3>{parameter.title}</h3>
                </div>

                <ol className="parameter-items">
                  {parameter.items.map((item, index) => {
                    const [label, description] = item.split(". ", 2);
                    return (
                      <li key={item}>
                        <span>{index + 1}.</span>
                        <strong>{label}</strong>
                        <em>{description}</em>
                      </li>
                    );
                  })}
                </ol>
              </article>
            ))}
          </div>
        </section>

        <div className="area-highlight">
          <div>
            <span className="area-highlight-number">{String(area.id).padStart(2, "0")}</span>
            <div>
              <span className="area-highlight-label">BSGE • ALANGILAN CAMPUS</span>
              <h2>Program Area {area.id}</h2>
              <p>{area.summary}</p>
            </div>
          </div>
          <a
            href={area.driveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="area-highlight-button"
          >
            Access files
            <ExternalLink size={15} />
          </a>
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

      <footer className="site-footer">
        <div className="footer-mark">
          <span>Bachelor of Science in</span>
          <strong>Geodetic Engineering</strong>
        </div>
        <div className="footer-contact">
          <span>FOR QUERIES AND/OR ASSISTANCE:</span>
          <a href="mailto:gepsc.alangilan@g.batstate-u.edu.ph">gepsc.alangilan@g.batstate-u.edu.ph</a>
        </div>
      </footer>
    </main>
  );
}
