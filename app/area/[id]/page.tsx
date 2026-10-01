import Link from "next/link";
import type { ReactNode } from "react";
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
          <img src="/batstateu.svg" alt="Batangas State University logo" className="area-brand-logo" />
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
        {"parameters" in area && area.parameters ? (
          <section className="library-blocks" aria-label={area.id === 7 ? "Library documents" : "Area documents"}>
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
                      const renderItem = (current: any, path: number[], depth: number): ReactNode => {
                        const label = typeof current === "string" ? current : current.label;
                        const children = typeof current === "string" ? [] : (current.children ?? []);

                        if (!children.length) {
                          const href = `/area/${area.id}/${parameter.letter}/${path.join("/")}`;
                          return (
                            <Link key={href} href={href} className={depth === 0 ? "library-subitem-link" : "library-nested-link"}>
                              {depth === 0 ? <span className="library-subitem-number">{path[0]}.</span> : null}
                              <span>{label}</span>
                              <span aria-hidden="true">›</span>
                            </Link>
                          );
                        }

                        return (
                          <details key={path.join("-")} className={depth === 0 ? "library-subitem library-nested-subitem" : "library-nested-subitem library-nested-subitem-deep"}>
                            <summary className="library-subitem-summary">
                              {depth === 0 ? <span className="library-subitem-number">{path[0]}.</span> : null}
                              <span>{label}</span>
                              <span className="library-subitem-chevron" aria-hidden="true">⌄</span>
                            </summary>
                            <div className={depth === 0 ? "library-nested-items" : "library-nested-items library-nested-items-deep"}>
                              {children.map((child: any, childIndex: number) => renderItem(child, [...path, childIndex + 1], depth + 1))}
                            </div>
                          </details>
                        );
                      };

                      return renderItem(item, [index + 1], 0);
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
