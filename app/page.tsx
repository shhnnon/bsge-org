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
          <img
            src="/bsge-logo.png"
            alt="BSGE Geodetic Engineering organization logo"
            className="site-header-logo"
          />
          <div className="site-header-copy">
            <p className="site-header-title">BSGE</p>
            <p className="site-header-subtitle">Geodetic Engineering • Alangilan</p>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="hero-content">
          <div className="hero-university">
            <img
              src="/bsge-logo.png"
              alt="BSGE logo"
              className="hero-logo"
            />
            <p className="hero-kicker">BATANGAS STATE UNIVERSITY</p>
            <p className="hero-institution">The National Engineering University</p>
            <p className="hero-campus">Alangilan Campus</p>
            <span className="hero-line" />
            <h1>Bachelor of Science in Geodetic Engineering</h1>
          </div>
        </div>
      </section>

      <section className="program-section">
        <div className="section-heading">
          <p className="eyebrow">{site.programLine}</p>
          <h2>{site.program}</h2>
        </div>

        <div className="quick-grid">
          {quickLinks.map((item) => {
            const Icon = icons[item.icon as keyof typeof icons];
            const content = (
              <>
                <span className="quick-icon">
                  <Icon size={24} strokeWidth={1.8} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.subtitle}</p>
                {item.dropdown ? (
                  <span className="quick-chevron">
                    <ChevronDown size={14} />
                  </span>
                ) : null}
              </>
            );

            return item.href ? (
              <Link key={item.title} href={item.href} className="quick-card">
                {content}
              </Link>
            ) : (
              <div key={item.title} className="quick-card quick-card-static">
                {content}
                <div className="quick-dropdown">
                  {referenceFiles.map((file) => (
                    <a
                      key={file.label}
                      href={file.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {file.label}
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="green-divider">
        <span>BSGE • ALANGILAN • PRECISION &amp; INNOVATION</span>
      </div>

      <section className="areas-section">
        <div className="section-heading areas-heading">
          <p className="eyebrow">BSGE ORGANIZATION</p>
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
              <p>{area.summary}</p>
              <span className="read-more">
                Read more <ArrowUpRight size={13} />
              </span>
            </Link>
          ))}
        </div>

        <div className="university-card">
          <div className="university-card-copy">
            <img
              src="/bsge-logo.png"
              alt=""
              className="university-card-logo"
            />
            <div>
              <h3>{site.university}</h3>
              <strong>{site.tagline}</strong>
              <p>
                Welcome to the BSGE community at {site.campus}. Explore program
                information, activities, resources, and organizational updates.
              </p>
            </div>
          </div>

          <div className="university-card-accent">
            <span>GEO</span>
            <small>Measure • Map • Understand</small>
          </div>
        </div>

        {embedPdf ? (
          <div className="embedded-document">
            <iframe
              src={embedPdf}
              title="BSGE reference document"
              className="h-[600px] w-full rounded-xl border-0"
            />
          </div>
        ) : null}
      </section>

      <footer className="site-footer">
        <div className="footer-mark">
          <span>Bachelor of Science<br />in Geodetic Engineering</span>
        </div>
        <div className="footer-contact">
          <span>FOR QUERIES AND/OR ASSISTANCE:</span>
          <a href="mailto:gepsc.alangilan@g.batstate-u.edu.ph">
            gepsc.alangilan@g.batstate-u.edu.ph
          </a>
        </div>
      </footer>
    </main>
  );
}
