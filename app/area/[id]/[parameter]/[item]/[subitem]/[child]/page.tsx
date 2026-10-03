import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { areas } from "@/data/content";

type Child = {
  label: string;
  href?: string;
  hrefs?: string[];
  text?: string;
  note?: string; texts?: string[];
  text?: string;
  texts?: string[];
  children?: Child[];
};
type ParameterItem = string | { label: string; href?: string; text?: string; note?: string; children?: Child[] };
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
      parameter.items.flatMap((item, itemIndex) => {
        if (typeof item === "string" || !item.children) return [];

        return item.children.flatMap((child, childIndex) => {
          if (!child.children) return [];
          return child.children.map((_, grandchildIndex) => ({
            id: String(area.id),
            parameter: parameter.letter,
            item: String(itemIndex + 1),
            subitem: String(childIndex + 1),
            child: String(grandchildIndex + 1),
          }));
        });
      })
    );
  });
}

export default async function DeepNestedAreaResource({
  params,
}: {
  params: Promise<{ id: string; parameter: string; item: string; subitem: string; child: string }>;
}) {
  const { id, parameter: parameterLetter, item: itemIndex, subitem: subitemIndex, child: childIndex } = await params;
  const area = areas.find((a) => a.id === Number(id));
  if (!area) notFound();

  const parameters = getParameters(area);
  if (!parameters) notFound();

  const parameter = parameters.find((entry) => entry.letter.toLowerCase() === parameterLetter.toLowerCase());
  const parent = parameter?.items[Number(itemIndex) - 1];
  const children = typeof parent === "string" ? undefined : parent?.children;
  const nestedParent = children?.[Number(subitemIndex) - 1];
  const grandchild = nestedParent?.children?.[Number(childIndex) - 1];

  if (!parameter || !nestedParent || !grandchild) notFound();

  const previews = (grandchild.hrefs?.length ? grandchild.hrefs : grandchild.href ? [grandchild.href] : []).map(previewUrl);

  return (
    <main className="area-page area-resource-page">
      <header className="area-page-header">
        <Link href="/" className="area-brand">
          <img src="/batstateu.svg" alt="Batangas State University logo" className="area-brand-logo" />
          <span><strong>Geodetic Engineering</strong><small>COE - Alangilan Campus</small></span>
        </Link>
      </header>

      <nav className="area-breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link><span>/</span>
        <Link href="/#areas">Areas</Link><span>/</span>
        <Link href={`/area/${area.id}`}>Area {area.id}</Link><span>/</span>
        <Link href={`/area/${area.id}`}>{parent && typeof parent !== "string" ? parent.label : parameter.title}</Link><span>/</span>
        <strong>{grandchild.label}</strong>
      </nav>

      <section className="area-resource-detail">
        <div className="resource-detail-heading">
          <h2>{grandchild.label}</h2>
        </div>

        {previews.length ? (
          <div className="resource-detail-preview-stack">
            {previews.map((preview, index) => (
              <div className="resource-detail-preview" key={preview}>
                {grandchild.texts?.[index] ? <div className="resource-preview-text">{grandchild.texts[index]}</div> : null}
                {grandchild.text ? <div className="resource-preview-text"><p>{grandchild.text}</p></div> : null}
                <iframe src={preview} title={grandchild.label + " " + (index + 1)} loading={index === 0 ? "eager" : "lazy"} allow="autoplay" />
                <a href={grandchild.hrefs?.[index] ?? grandchild.href} target="_blank" rel="noopener noreferrer" className="resource-detail-open">Open document in Google Drive</a>
              </div>
            ))}
            {grandchild.note ? <p className="resource-detail-note">{grandchild.note}</p> : null}
          </div>
        ) : (
          <div className="resource-detail-empty">
            <strong>No document link is attached to this item yet.</strong>
            <p>The item is listed on the BSGE area page, but no document hyperlink was provided for it.</p>
          </div>
        )}
      </section>

      <nav className="area-pagination" aria-label="Area navigation">
        <Link href={`/area/${area.id}/${parameter.letter}/${itemIndex}`} className="area-back">
          <ArrowLeft size={17} />Back to {nestedParent.label}
        </Link>
      </nav>

      <footer className="site-footer">
        <div className="footer-mark"><span>Bachelor of Science in</span><strong>Geodetic Engineering</strong></div>
        <div className="footer-contact"><span>FOR QUERIES AND/OR ASSISTANCE:</span><a href="mailto:gepsc.alangilan@g.batstate-u.edu.ph">gepsc.alangilan@g.batstate-u.edu.ph</a></div>
      </footer>
    </main>
  );
}
