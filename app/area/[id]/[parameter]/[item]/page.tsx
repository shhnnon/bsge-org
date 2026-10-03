import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { notFound, redirect } from "next/navigation";
import { areas } from "@/data/content";

type ParameterItem = string | { label: string; href?: string; hrefs?: string[]; text?: string; texts?: string[]; children?: { label: string; href?: string; hrefs?: string[]; text?: string; texts?: string[]; }[] };
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
    if (!parameters) return [];

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
  if (!parameters) notFound();

  const parameter = parameters.find((entry) => entry.letter.toLowerCase() === parameterLetter.toLowerCase());
  const index = Number(itemIndex) - 1;
  const item = parameter?.items[index];
  if (!parameter || !item) notFound();

  const label = typeof item === "string" ? item : item.label;
  const directChild = typeof item !== "string" && item.children?.length === 1 ? item.children[0] : undefined;

  // Parent items with multiple distinct subtopics remain dropdown containers.
  // A single document child (including a child with multiple Drive links) opens directly.
  if (typeof item !== "string" && item.children?.length && !directChild) {
    redirect(`/area/${area.id}`);
  }

  const href = typeof item === "string" ? undefined : (item.href ?? directChild?.href);
  const hrefs = typeof item === "string" ? undefined : (item.hrefs ?? directChild?.hrefs);
  const text = typeof item === "string" ? undefined : (item.text ?? directChild?.text);
  const texts = typeof item === "string" ? undefined : (item.texts ?? directChild?.texts);
  const next = areas.find((a) => a.id === area.id + 1);
  const previews = (hrefs?.length ? hrefs : href ? [href] : []).map(previewUrl);

  return (
    <main className="area-page area-resource-page">
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
        {previews.length ? (
          <div className="resource-detail-preview-stack">
            {previews.map((preview, index) => (
              <div className="resource-detail-preview" key={preview}>
                {(texts?.[index] || (index === 0 && text)) ? (
                  <div className="resource-preview-text">
                    <p>{texts?.[index] ?? text}</p>
                  </div>
                ) : null}
                <iframe
                  src={preview}
                  title={label + " " + (index + 1)}
                  loading={index === 0 ? "eager" : "lazy"}
                  allow="autoplay"
                />
                <a
                  href={hrefs?.[index] ?? href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resource-detail-open"
                >
                  Open document in Google Drive
                </a>
              </div>
            ))}
          </div>
        ) : text ? (
          <div className="resource-text-label"><p>{text}</p></div>
        ) : (
          <div className="resource-detail-empty">
            <strong>No document link is attached to this item yet.</strong>
            <p>The item is listed on the BSGE area page, but no Google Drive or document hyperlink was provided for it.</p>
          </div>
        )}

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
