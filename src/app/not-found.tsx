import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container flex flex-col align-center justify-center" style={{ minHeight: "calc(100vh - 200px)", textAlign: "center" }}>
      <div className="animate-fade-scale">
        <h1 style={{ fontSize: "6rem", marginBottom: "0", color: "var(--primary)", letterSpacing: "-2px" }}>404</h1>
        <h2 style={{ fontSize: "2.5rem", marginBottom: "1.5rem" }}>Query Returned Null</h2>
        
        <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", maxWidth: "500px", margin: "0 auto 2.5rem auto" }}>
          We executed a SELECT query for this route, but no records were found in the SkillSetra database. The page you are looking for does not exist or is under construction.
        </p>

        <div className="flex justify-center gap-4">
          <Link href="/" className="btn btn-primary">
            Return Home
          </Link>
          <Link href="/tasks" className="btn btn-outline">
            Browse Tasks
          </Link>
        </div>
        
        <div style={{ marginTop: "4rem" }}>
          <span style={{ fontFamily: "Playfair Display, serif", fontSize: "1.5rem", opacity: 0.5 }}>
            SkillSetra<span style={{ color: "var(--primary)" }}>.</span>
          </span>
        </div>
      </div>
    </div>
  );
}
