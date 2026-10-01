export default function Loading() {
  return (
    <main className="loading-screen" aria-label="Loading BSGE">
      <div className="loading-logo-wrap">
        <span className="loading-spinner" aria-hidden="true" />
        <img
          src="/batstateu.svg"
          alt="BSGE"
          className="loading-logo"
        />
      </div>
    </main>
  );
}
