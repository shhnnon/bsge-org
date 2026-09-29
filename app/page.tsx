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
            src="/favicon.ico"
            alt="Batangas State University logo"
            className="site-header-logo"
          />
          <div>
            <p className="site-header-title">BSGE</p>
            <p className="site-header-subtitle">Geodetic Engineering - Alangilan Campus</p>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="hero-shape hero-shape-one" />
        <div className="hero-shape hero-shape-two" />
        <div className="hero-grid-pattern" />

        <div className="hero-content">
          <div className="hero-brand">
            <img
              src="/favicon.ico"
              alt={site.university + " logo"}
              className="hero-logo"
            />
          </div>

          <div className="hero-university">
            <p className="hero-kicker">BACHELOR OF SCIENCE IN GEODETIC ENGINEERING</p>
            <h1>{site.university}</h1>
            <p className="hero-tagline">{site.tagline}</p>
            <p className="hero-campus">{site.campus} Campus</p>
            <span className="hero-line" />
            <p className="hero-intro">
              Building future-ready geodetic engineers through innovation,
              precision, and service.
            </p>
          </div>

          <div className="hero-mottos" aria-label="University mottos">
            {site.mottos.map((motto) => (
              <p key={motto}>{motto}</p>
            ))}
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

      <div className="red-divider" />

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
              <span className="area-number">{index + 1}</span>
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
              src="/favicon.ico"
              alt=""
              className="university-card-logo"
            />
            <h3>{site.university}</h3>
            <strong>{site.tagline}</strong>
            <p>
              Welcome to the BSGE community at {site.campus}. Explore program
              information, activities, resources, and organizational updates.
            </p>
          </div>

          <div className="university-card-accent">
            <span>BSGE</span>
            <small>Alangilan Campus</small>
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
        <div>
          <p className="footer-program">{site.programLine}</p>
          <h2>{site.program}</h2>
        </div>
        <p>
          <em>For queries and/or assistance:</em>
          <br />
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
      </footer>
    </main>
  );
}
