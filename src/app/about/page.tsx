export default function AboutPage() {
  return (
    <div className="container" style={{ marginTop: "3rem", marginBottom: "5rem" }}>
      <section className="animate-fade-scale text-center" style={{ padding: "4rem 0", borderBottom: "1px solid var(--border)", marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>About The Project</h1>
        <p style={{ fontSize: "1.2rem", maxWidth: "700px", margin: "0 auto", color: "var(--text-muted)" }}>
          Database System Design and Implementation for Freelance Platform (SkillSetra).
        </p>
      </section>

      <div className="flex gap-8 flex-wrap justify-center">
        <div className="glass-card animate-fade-up delay-1" style={{ flex: "1 1 400px", maxWidth: "500px" }}>
          <h2 style={{ borderBottom: "2px solid var(--primary)", paddingBottom: "1rem", marginBottom: "1.5rem" }}>Project Overview</h2>
          <p>
            This application is built as a comprehensive <strong>Database Management System (DBMS)</strong> project. 
            It demonstrates the practical application of relational database design, including entity-relationship modeling, 
            normalization (up to BCNF and 5NF), and complex SQL querying in a modern full-stack web environment.
          </p>
          <p>
            The platform serves as a skill-based freelance marketplace where clients can post requirements and freelancers 
            are dynamically matched based on their skill proficiencies and experience utilizing a structured matching engine.
          </p>
          
          <div className="mt-8">
            <h3 style={{ fontSize: "1.2rem", color: "var(--accent)" }}>Institution</h3>
            <p style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--text-main)" }}>National Institute of Technology (NIT) Manipur</p>
          </div>
        </div>

        <div className="glass-card animate-fade-up delay-2" style={{ flex: "1 1 400px", maxWidth: "500px" }}>
          <h2 style={{ borderBottom: "2px solid var(--secondary)", paddingBottom: "1rem", marginBottom: "1.5rem" }}>Development Team</h2>
          <p className="mb-6">
            This prototype and its underlying relational schema were designed and implemented by:
          </p>
          
          <div className="flex flex-col gap-4">
            <div style={{ padding: "1rem", background: "var(--glass-bg)", borderRadius: "4px", borderLeft: "3px solid var(--primary)" }}>
              <h4 style={{ margin: 0, fontSize: "1.2rem" }}>Shivam Raj</h4>
              <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px" }}>Student</span>
            </div>
            
            <div style={{ padding: "1rem", background: "var(--glass-bg)", borderRadius: "4px", borderLeft: "3px solid var(--accent)" }}>
              <h4 style={{ margin: 0, fontSize: "1.2rem" }}>Divyam Kumar Choubey</h4>
              <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px" }}>Student</span>
            </div>

            <div style={{ padding: "1rem", background: "var(--glass-bg)", borderRadius: "4px", borderLeft: "3px solid var(--secondary)" }}>
              <h4 style={{ margin: 0, fontSize: "1.2rem" }}>Abhinav Patra</h4>
              <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px" }}>Student</span>
            </div>
          </div>
        </div>
      </div>
      
      <section className="animate-fade-up delay-3 mt-8">
         <div className="glass-card" style={{ textAlign: "center", padding: "3rem" }}>
            <h3 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>Technical Stack</h3>
            <div className="flex justify-center gap-4 flex-wrap mt-4">
              <span className="badge">Next.js 15 (App Router)</span>
              <span className="badge">React Server Components</span>
              <span className="badge">Prisma ORM</span>
              <span className="badge">SQLite RDBMS</span>
              <span className="badge">TypeScript</span>
              <span className="badge">Vanilla CSS</span>
            </div>
         </div>
      </section>
    </div>
  );
}
