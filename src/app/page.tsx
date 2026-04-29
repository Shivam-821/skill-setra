import Link from "next/link";

export default function Home() {
  return (
    <div className="container" style={{ marginTop: "2rem" }}>
      {/* Hero Section */}
      <section className="text-center animate-fade-scale" style={{ padding: "6rem 0 5rem 0", borderBottom: "1px solid var(--border)" }}>
        
        <h1 style={{ fontSize: "4.5rem", marginBottom: "1.5rem", letterSpacing: "-1px" }}>
          SkillSetra<span style={{ color: "var(--primary)" }}>.</span>
        </h1>
        <h2 style={{ fontSize: "2rem", fontWeight: 400, color: "var(--text-muted)", marginBottom: "2rem", fontFamily: "Plus Jakarta Sans, sans-serif" }}>
          A Structured Freelance Marketplace Platform.
        </h2>
        
        <p style={{ fontSize: "1.15rem", maxWidth: "800px", margin: "0 auto 3rem auto", color: "var(--text-muted)" }}>
          Developed to automate and optimize the process of project posting, freelancer discovery, and hiring. Our intelligent matching engine evaluates skills, proficiency, and experience to bridge the gap between complex requirements and top-tier talent.
        </p>
        
        <div className="flex justify-center gap-6">
          <Link href="/client/dashboard" className="btn btn-primary" style={{ padding: "1.2rem 2.5rem" }}>
            Explore as Client
          </Link>
          <Link href="/freelancer/dashboard" className="btn btn-outline" style={{ padding: "1.2rem 2.5rem" }}>
            Explore as Freelancer
          </Link>
        </div>
      </section>

      {/* Project Overview Section */}
      <section className="animate-fade-up delay-1" style={{ padding: "5rem 0" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h2 style={{ fontSize: "2.5rem" }}>System Capabilities & Operations</h2>
          <p style={{ maxWidth: "600px", margin: "0 auto" }}>An architectural overview of the core functionalities handled by our normalized relational database structure.</p>
        </div>

        <div className="flex gap-8 justify-between flex-wrap mobile-carousel">
          <div className="glass-card mobile-carousel-item-small" style={{ flex: "1 1 300px" }}>
            <h3 style={{ fontSize: "1.5rem" }}>For Clients</h3>
            <p style={{ minHeight: "80px" }}>
              Organizations or individuals seeking specialized skills. Clients can register, post detailed project specifications, set budget constraints, and directly invite candidates based on algorithmic recommendations.
            </p>
            <div className="feature-box">
              <h4>Deliverables</h4>
              <ul style={{ listStyle: "none", marginTop: "1rem", color: "var(--text-muted)", fontSize: "0.95rem" }}>
                <li style={{ marginBottom: "0.5rem" }}>+ Automated Match Recommendations</li>
                <li style={{ marginBottom: "0.5rem" }}>+ Streamlined Bidding Workflow</li>
                <li style={{ marginBottom: "0.5rem" }}>+ Transparent Review Systems</li>
              </ul>
            </div>
          </div>

          <div className="glass-card mobile-carousel-item-small" style={{ flex: "1 1 300px" }}>
            <h3 style={{ fontSize: "1.5rem" }}>For Freelancers</h3>
            <p style={{ minHeight: "80px" }}>
              Skilled professionals looking for targeted opportunities. Freelancers maintain profiles highlighting their technical proficiencies, work experience, and detailed project portfolios to attract quality clients.
            </p>
            <div className="feature-box">
              <h4>Deliverables</h4>
              <ul style={{ listStyle: "none", marginTop: "1rem", color: "var(--text-muted)", fontSize: "0.95rem" }}>
                <li style={{ marginBottom: "0.5rem" }}>+ Dynamic Skill Matrices</li>
                <li style={{ marginBottom: "0.5rem" }}>+ Direct Client Invitations</li>
                <li style={{ marginBottom: "0.5rem" }}>+ Portfolio Verification</li>
              </ul>
            </div>
          </div>

          <div className="glass-card mobile-carousel-item-small" style={{ flex: "1 1 300px" }}>
            <h3 style={{ fontSize: "1.5rem" }}>Matching Engine</h3>
            <p style={{ minHeight: "80px" }}>
              The core technical differentiator of SkillSetra. Utilizing advanced relational queries to dynamically map client requirements against freelancer proficiency vectors.
            </p>
            <div className="feature-box">
              <h4>Deliverables</h4>
              <ul style={{ listStyle: "none", marginTop: "1rem", color: "var(--text-muted)", fontSize: "0.95rem" }}>
                <li style={{ marginBottom: "0.5rem" }}>+ High-precision Scoring (0-100)</li>
                <li style={{ marginBottom: "0.5rem" }}>+ Reduced Discovery Time</li>
                <li style={{ marginBottom: "0.5rem" }}>+ Normalized Database Integrity</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="animate-fade-up delay-2" style={{ marginBottom: "6rem" }}>
        <div className="glass-card" style={{ 
          background: "var(--glass-bg)", 
          borderLeft: "4px solid var(--primary)",
          textAlign: "center", 
          padding: "5rem 2rem" 
        }}>
          <h2 style={{ fontSize: "2.5rem", marginBottom: "1.5rem", fontFamily: "Playfair Display, serif" }}>Experience the Platform</h2>
          <p style={{ fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto 2.5rem auto", color: "var(--text-muted)" }}>
            Explore the normalized entity structures and relational schemas powering the SkillSetra prototype implementation.
          </p>
          <Link href="/demonstration" className="btn btn-primary" style={{ padding: "1rem 3rem", fontSize: "1.1rem" }}>
            Access Demonstration
          </Link>
        </div>
      </section>
    </div>
  );
}
