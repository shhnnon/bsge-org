import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  ChevronDown,
  FolderCheck,
  FolderOpen,
  UsersRound,
} from "lucide-react";
import {
  site,
  quickLinks,
  referenceFiles,
  areas,
  embedPdf,
} from "@/data/content";

const icons = {
  book: BookOpen,
  users: UsersRound,
  folder: FolderOpen,
  folderCheck: FolderCheck,
};

export default function Home() {
  return (
    <main className="site-shell">
      <header className="site-header">
        <div className="site-header-inner">
          <img src="/batstateu.svg" alt="Batangas State University logo" className="site-header-logo" />
          <div className="site-header-copy">
            <p className="site-header-title">Geodetic Engineering</p>
            <p className="site-header-subtitle">COE - Alangilan Campus</p>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="hero-content">
          <div className="hero-logo-side">
            <img src="/batstateu.svg" alt="Batangas State University logo" className="hero-logo" />
          </div>
          <div className="hero-center">
            <h1>Bachelor of Science in Geodetic Engineering</h1>
            <p className="hero-description">
              The <strong>Bachelor of Science in Geodetic Engineering (BSGE)</strong> at <strong>Batangas State University – The National Engineering University (Alangilan Campus)</strong> is a premier undergraduate program housed under the College of Engineering. Tailored to train future leaders in geospatial science, the curriculum combines rigorous engineering fundamentals with advanced surveying, spatial analysis, and location technology. Students gain hands-on expertise in establishing geodetic control networks, land surveying, Geographic Information Systems (GIS), photogrammetry, remote sensing, and satellite-based positioning systems. Rooted in the engineering hub of BatStateU Alangilan, the BSGE program equips graduates to play a vital role in national development, addressing critical challenges in land administration, infrastructure development, urban planning, hydrographic surveying, and disaster risk management.
            </p>
          </div>
        </div>
      </section>

      <section className="program-section">
        <div className="quick-grid">
          {quickLinks.map((item) => {
            const Icon = icons[item.icon as keyof typeof icons];
            const content = (
              <>
                <span className="quick-icon"><Icon size={24} strokeWidth={1.8} /></span>
                <h3>{item.title}</h3>
                <p>{item.subtitle}</p>
                {item.dropdown ? <span className="quick-chevron"><ChevronDown size={14} /></span> : null}
              </>
            );

            if (item.title === "Reference Files") {
              return (
                <details key={item.title} className="quick-card quick-reference-card">
                  <summary>{content}</summary>
                  <div className="quick-dropdown">
                    {referenceFiles.map((file) =>
                      file.href ? (
                        <a key={file.label} href={file.href} target="_blank" rel="noopener noreferrer">
                          {file.label}
                        </a>
                      ) : (
                        <span key={file.label} className="quick-dropdown-disabled">
                          {file.label}
                        </span>
                      ),
                    )}
                  </div>
                </details>
              );
            }

            return item.href ? (
              <Link key={item.title} href={item.href} className="quick-card">{content}</Link>
            ) : (
              <div key={item.title} className="quick-card quick-card-static">{content}</div>
            );
          })}
        </div>
      </section>

      <div className="green-divider" aria-hidden="true" />

      <section id="areas" className="areas-section">
        <div className="section-heading areas-heading">
          <p className="eyebrow">ACCREDITATION AREAS</p>
          <h2>{site.orgShort} Program Areas</h2>
          <p>
            Explore the key areas of the Bachelor of Science in Geodetic
            Engineering program and organization.
          </p>
        </div>

        <div className="areas-grid">
          {areas.map((area, index) => (
            <Link key={area.id} href={`/area/${area.id}`} className="area-card">
              <span className="area-number">{String(index + 1).padStart(2, "0")}</span>
              <h3>{area.title}</h3>
              <p className="area-description">{area.summary}</p>
              <span className="read-more">Read more <ArrowUpRight size={13} /></span>
            </Link>
          ))}
        </div>

        <div className="university-card">
          <a
            href="https://batstateu.edu.ph/"
            target="_blank"
            rel="noopener noreferrer"
            className="university-card-copy"
            aria-label="Visit Batangas State University website"
          >
            <img src="/batstateu.svg" alt="Batangas State University" className="university-card-logo" />
            <div>
              <h3>{site.university}</h3>
              <strong>{site.tagline}</strong>
              <p>Welcome to Batangas State University Alangilan Campus! Home to the National Engineering University’s pioneers, innovators, and future industry leaders.</p>
            </div>
          </a>
          <div className="university-card-video">
            <iframe
              src="https://www.youtube.com/embed/Pb61NjXrJCg"
              title="Batangas State University video"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>

        {embedPdf ? (
          <div className="embedded-document">
            <iframe src={embedPdf} title="BSGE reference document" className="h-[600px] w-full rounded-xl border-0" />
          </div>
        ) : null}
      </section>

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
