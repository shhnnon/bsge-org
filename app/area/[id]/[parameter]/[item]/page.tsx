import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { areas } from "@/data/content";

type ParameterItem = string | { label: string; href?: string; children?: { label: string; href?: string }[] };
type Parameter = { letter: string; title: string; items: ParameterItem[] };

function getParameters(area: (typeof areas)[number]): Parameter[] | null {
  if (!("parameters" in area) || !area.parameters) return null;
  return area.parameters as Parameter[];
}

function previewUrl(href?: string) {
  if (!href) return "";
  return href.replace(/\/view(?=\?|$)/, "/preview").replace(/\/edit(?=\?|$)/, "/preview");
}

export function generateStaticParams() {
  return areas.flatMap((area) => {
    const parameters = getParameters(area);
    if (!parameters || area.id === 7) return [];

    return parameters.flatMap((parameter) =>
      parameter.items.map((_, index) => ({
        id: String(area.id),
        parameter: parameter.letter,
        item: String(index + 1),
      }))
    );
  });
}

export default async function AreaResource({
  params,
}: {
  params: Promise<{ id: string; parameter: string; item: string }>;
}) {
  const { id, parameter: parameterLetter, item: itemIndex } = await params;
  const area = areas.find((a) => a.id === Number(id));
  if (!area) notFound();

  const parameters = getParameters(area);
  if (!parameters || area.id === 7) notFound();

  const parameter = parameters.find((entry) => entry.letter.toLowerCase() === parameterLetter.toLowerCase());
  const index = Number(itemIndex) - 1;
  const item = parameter?.items[index];
  if (!parameter || !item) notFound();

  const label = typeof item === "string" ? item : item.label;
  const href = typeof item === "string" ? undefined : item.href;
  const next = areas.find((a) => a.id === area.id + 1);
  const preview = previewUrl(href);

  return (
    <main className="area-page area-resource-page">
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
        <Link href={`/area/${area.id}`}>Area {area.id}</Link>
        <span>/</span>
        <strong>{label}</strong>
      </nav>

      <section className="area-hero area-resource-hero">
        <div className="area-hero-inner">
          <div className="area-hero-number">
            <span>{parameter.letter}</span>
          </div>
          <div className="area-hero-copy">
            <h1>{label}</h1>
          </div>
        </div>
      </section>

      <section className="area-resource-detail">


        {preview ? (
          <div className="resource-detail-preview">
            <iframe
              src={preview}
              title={label}
              loading="eager"
              allow="autoplay"
            />
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="resource-detail-open"
            >
              Open document in Google Drive
            </a>
          </div>
        ) : (
          <div className="resource-detail-empty">
            <strong>No document link is attached to this item yet.</strong>
            <p>The item is listed on the BSGE area page, but no Google Drive or document hyperlink was provided for it.</p>
          </div>
        )}
      </section>

      <nav className="area-pagination" aria-label="Area navigation">
        <Link href={`/area/${area.id}`} className="area-back">
          <ArrowLeft size={17} />
          Back to Area {area.id}
        </Link>

        <div className="area-page-number">
          <span>{label}</span>
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
