import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
          <img src="/gep-batstateu-sc.svg" alt="Geodetic Engineers of the Philippines BatStateU Student Chapter logo" className="area-brand-logo" />
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
            <h1>{area.title}</h1>
          </div>
        </div>
      </section>

      <section className="area-content">
        {area.id === 7 && "parameters" in area && area.parameters ? (
          <section className="library-blocks" aria-label="Library documents">
            <div className="library-block-grid">
              {area.parameters.map((parameter) => (
                <details key={parameter.letter} className="library-block">
                  <summary>
                    <span className="library-block-letter">{parameter.letter}</span>
                    <span className="library-block-title">{parameter.title}</span>
                    <span className="library-block-chevron" aria-hidden="true">⌄</span>
                  </summary>

                  <div className="library-subitems">
                    {parameter.items.map((item, index) => {
                      const resource = typeof item === "string" ? null : item;
                      const label = typeof item === "string" ? item : item.label;

                      return resource ? (
                        <details key={label} className="library-subitem">
                          <summary>
                            <span className="library-subitem-number">{index + 1}.</span>
                            <span>{label}</span>
                            <span className="library-subitem-chevron" aria-hidden="true">⌄</span>
                          </summary>

                          <div className="library-pdf-preview">
                            <iframe
                              src={resource.href ?? ""}
                              title={label}
                              loading="lazy"
                              allow="autoplay"
                            />
                            <a
                              href={(resource.href ?? "").replace("/preview", "/view")}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Open document in Google Drive
                            </a>
                          </div>
                        </details>
                      ) : (
                        <div key={label} className="library-subitem library-subitem-static">
                          <span className="library-subitem-number">{index + 1}.</span>
                          <span>{label}</span>
                        </div>
                      );
                    })}
                  </div>
                </details>
              ))}
            </div>
          </section>
        ) : "parameters" in area && area.parameters ? (
          <section className="library-blocks" aria-label="Area documents">
            <div className="library-block-grid">
              {area.parameters.map((parameter) => (
                <details key={parameter.letter} className="library-block">
                  <summary>
                    <span className="library-block-letter">{parameter.letter}</span>
                    <span className="library-block-title">{parameter.title}</span>
                    <span className="library-block-chevron" aria-hidden="true">⌄</span>
                  </summary>
                  <div className="library-subitems">
                    {parameter.items.map((item, index) => {
                      const label = typeof item === "string" ? item : item.label;
                      return (
                        <Link
                          key={label}
                          href={`/area/${area.id}/${parameter.letter}/${index + 1}`}
                          className="library-subitem-link"
                        >
                          <span className="library-subitem-number">{index + 1}.</span>
                          <span>{label}</span>
                          <span className="library-subitem-chevron" aria-hidden="true">›</span>
                        </Link>
                      );
                    })}
                  </div>
                </details>
              ))}
            </div>
          </section>
        ) : null}
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
