import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { areas } from "@/data/content";

type Child = { label: string; href?: string; hrefs?: string[]; text?: string; texts?: string[]; note?: string; images?: string[] };
type ParameterItem = string | { label: string; href?: string; children?: Child[] };
type Parameter = { letter: string; title: string; items: ParameterItem[] };

function getParameters(area: (typeof areas)[number]): Parameter[] | null {
  if (!("parameters" in area) || !area.parameters) return null;
  return area.parameters as Parameter[];
}

function previewUrl(href?: string) {
  if (!href) return "";

  try {
    const url = new URL(href);
    if (url.hostname === "drive.google.com") {
      const fileMatch = url.pathname.match(/^\/file\/d\/([^/]+)/);
      const id = fileMatch?.[1] ?? url.searchParams.get("id");

      if (id) {
        return "https://drive.google.com/file/d/" + id + "/preview";
      }
    }
  } catch {
    // Keep non-URL links unchanged.
  }

  return href.replace(/\/view(?=\?|$)/, "/preview").replace(/\/edit(?=\?|$)/, "/preview");
}

export function generateStaticParams() {
  return areas.flatMap((area) => {
    const parameters = getParameters(area);
    if (!parameters || area.id === 7) return [];
    return parameters.flatMap((parameter) =>
      parameter.items.flatMap((item, itemIndex) => {
        if (typeof item === "string" || !item.children) return [];
        return item.children.map((_, childIndex) => ({
          id: String(area.id),
          parameter: parameter.letter,
          item: String(itemIndex + 1),
          subitem: String(childIndex + 1),
        }));
      })
    );
  });
}

export default async function NestedAreaResource({
  params,
}: {
  params: Promise<{ id: string; parameter: string; item: string; subitem: string }>;
}) {
  const { id, parameter: parameterLetter, item: itemIndex, subitem: subitemIndex } = await params;
  const area = areas.find((a) => a.id === Number(id));
  if (!area) notFound();
  const parameters = getParameters(area);
  if (!parameters || area.id === 7) notFound();
  const parameter = parameters.find((entry) => entry.letter.toLowerCase() === parameterLetter.toLowerCase());
  const parent = parameter?.items[Number(itemIndex) - 1];
  const children = typeof parent === "string" ? undefined : parent?.children;
  const child = children?.[Number(subitemIndex) - 1];
  const images = child?.images ?? [];
  if (!parameter || !child) notFound();

  const previews = (child.hrefs?.length ? child.hrefs : child.href ? [child.href] : []).map(previewUrl);

  return (
    <main className="area-page area-resource-page">
      <header className="area-page-header">
        <Link href="/" className="area-brand">
          <img src="/batstateu.svg" alt="Batangas State University logo" className="area-brand-logo" />
          <span><strong>Geodetic Engineering</strong><small>Department of Civil Engineering - Alangilan Campus</small></span>
        </Link>
      </header>

      <nav className="area-breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link><span>/</span>
        <Link href="/#areas">Areas</Link><span>/</span>
        <Link href={`/area/${area.id}`}>Area {area.id}</Link><span>/</span>
        <Link href={`/area/${area.id}`}>{parent && typeof parent !== "string" ? parent.label : parameter.title}</Link><span>/</span>
        <strong>{child.label}</strong>
      </nav>

      <section className="area-resource-detail">
        <div className="resource-detail-heading">
          <h2>{child.label}</h2>
        </div>
        {images.length ? (
          <div className="resource-detail-gallery" aria-label="Photo Documentation">
            {images.map((src: string, index: number) => (
              <figure key={src} className="resource-detail-gallery-item">
                <img src={src} alt={`Photo Documentation ${index + 1}`} loading={index === 0 ? "eager" : "lazy"} />
              </figure>
            ))}
          </div>
        ) : previews.length ? (
          <div className="resource-detail-preview-stack">
            {previews.map((preview, index) => (
              <div className="resource-detail-preview" key={preview}>
                {child.texts?.[index] ? <div className="resource-preview-text">{child.texts[index]}</div> : null}
                {child.text ? <div className="resource-preview-text"><p>{child.text}</p></div> : null}
                <iframe src={preview} title={child.label + " " + (index + 1)} loading={index === 0 ? "eager" : "lazy"} allow="autoplay" />
                <a href={child.hrefs?.[index] ?? child.href} target="_blank" rel="noopener noreferrer" className="resource-detail-open">Open document in Google Drive</a>
              </div>
            ))}
            {child.note ? <p className="resource-detail-note">{child.note}</p> : null}
          </div>
        ) : (
          <div className="resource-detail-empty">
            <strong>No document link is attached to this item yet.</strong>
            <p>The item is listed on the BSGE area page, but no document hyperlink was provided for it.</p>
          </div>
        )}
      </section>

      <nav className="area-pagination" aria-label="Area navigation">
        <Link href={`/area/${area.id}`} className="area-back"><ArrowLeft size={17} />Back to Area {area.id}</Link>
        <div className="area-page-number"><span>{child.label.match(/^([A-Z]\.\d+[a-z]?)/)?.[1] ?? `${parameter.letter}.${itemIndex}`}</span></div>
      </nav>

      <footer className="site-footer">
        <div className="footer-mark"><span>Bachelor of Science in</span><strong>Geodetic Engineering</strong></div>
        <div className="footer-contact"><span>FOR QUERIES AND/OR ASSISTANCE:</span><a href="mailto:gepsc.alangilan@g.batstate-u.edu.ph">gepsc.alangilan@g.batstate-u.edu.ph</a></div>
      </footer>
    </main>
  );
}
