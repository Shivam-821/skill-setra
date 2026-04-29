import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function DemonstrationPage() {
  // Fetch real-time database statistics
  const userCount = await prisma.user.count();
  const taskCount = await prisma.task.count();
  const applicationCount = await prisma.application.count();
  const skillCount = await prisma.skill.count();
  const invitationCount = await prisma.invitation.count();
  const matchScoreCount = await prisma.matchScore.count();

  return (
    <div className="container" style={{ marginTop: "3rem", marginBottom: "5rem" }}>
      <section className="animate-fade-scale text-center" style={{ padding: "3rem 0", borderBottom: "1px solid var(--border)", marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>Interactive Demonstration</h1>
        <p style={{ fontSize: "1.2rem", maxWidth: "800px", margin: "0 auto", color: "var(--text-muted)" }}>
          Welcome to the SkillSetra prototype demonstration. Select a user flow below to interact with the normalized relational database structures in real-time.
        </p>
      </section>

      {/* Database Statistics */}
      <div className="animate-fade-up mb-8">
        <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "var(--text-main)", textAlign: "center" }}>Real-time Database Status</h3>
        <div className="flex gap-4 flex-wrap justify-center mb-8 mobile-carousel">
          <div className="glass-card text-center mobile-carousel-item-mini" style={{ padding: "1.5rem", minWidth: "150px" }}>
            <div style={{ fontSize: "2.5rem", fontFamily: "Playfair Display", color: "var(--primary)" }}>{userCount}</div>
            <div style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px", color: "var(--text-muted)" }}>Users</div>
          </div>
          <div className="glass-card text-center mobile-carousel-item-mini" style={{ padding: "1.5rem", minWidth: "150px" }}>
            <div style={{ fontSize: "2.5rem", fontFamily: "Playfair Display", color: "var(--accent)" }}>{taskCount}</div>
            <div style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px", color: "var(--text-muted)" }}>Tasks</div>
          </div>
          <div className="glass-card text-center mobile-carousel-item-mini" style={{ padding: "1.5rem", minWidth: "150px" }}>
            <div style={{ fontSize: "2.5rem", fontFamily: "Playfair Display", color: "var(--secondary)" }}>{applicationCount}</div>
            <div style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px", color: "var(--text-muted)" }}>Applications</div>
          </div>
          <div className="glass-card text-center mobile-carousel-item-mini" style={{ padding: "1.5rem", minWidth: "150px" }}>
            <div style={{ fontSize: "2.5rem", fontFamily: "Playfair Display", color: "#10b981" }}>{invitationCount}</div>
            <div style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px", color: "var(--text-muted)" }}>Invitations</div>
          </div>
          <div className="glass-card text-center mobile-carousel-item-mini" style={{ padding: "1.5rem", minWidth: "150px" }}>
            <div style={{ fontSize: "2.5rem", fontFamily: "Playfair Display", color: "#f59e0b" }}>{matchScoreCount}</div>
            <div style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px", color: "var(--text-muted)" }}>Matches Computed</div>
          </div>
        </div>
      </div>

      {/* Demonstration Flows */}
      <div className="flex gap-8 flex-wrap justify-center animate-fade-up delay-1 mobile-carousel">
        
        {/* Client Flow */}
        <div className="glass-card flex flex-col justify-between mobile-carousel-item" style={{ flex: "1 1 350px", maxWidth: "500px", borderTop: "4px solid var(--primary)" }}>
          <div>
            <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>Simulate Client</h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
              Experience the platform as a Client. You can execute DML INSERT operations to post new tasks to the database, search for freelancers, and generate direct invitations.
            </p>
            <ul style={{ listStyle: "none", color: "var(--text-main)", marginBottom: "2rem" }}>
              <li style={{ padding: "0.5rem 0", borderBottom: "1px solid var(--border)" }}>✓ Insert new records into TASK table</li>
              <li style={{ padding: "0.5rem 0", borderBottom: "1px solid var(--border)" }}>✓ Query Freelancers Directory</li>
              <li style={{ padding: "0.5rem 0", borderBottom: "1px solid var(--border)" }}>✓ Generate Relational Invitations</li>
            </ul>
          </div>
          <Link href="/client/dashboard" className="btn btn-primary" style={{ width: "100%", textAlign: "center" }}>
            Launch Client Dashboard
          </Link>
        </div>

        {/* Freelancer Flow */}
        <div className="glass-card flex flex-col justify-between mobile-carousel-item" style={{ flex: "1 1 350px", maxWidth: "500px", borderTop: "4px solid var(--accent)" }}>
          <div>
            <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>Simulate Freelancer</h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
              Experience the platform as a Freelancer. View the results of the Matching Engine logic, search for open projects using complex relational queries, and submit applications.
            </p>
            <ul style={{ listStyle: "none", color: "var(--text-main)", marginBottom: "2rem" }}>
              <li style={{ padding: "0.5rem 0", borderBottom: "1px solid var(--border)" }}>✓ View Computed Match Scores</li>
              <li style={{ padding: "0.5rem 0", borderBottom: "1px solid var(--border)" }}>✓ Execute complex SELECT searches</li>
              <li style={{ padding: "0.5rem 0", borderBottom: "1px solid var(--border)" }}>✓ Insert records into APPLICATION table</li>
            </ul>
          </div>
          <Link href="/freelancer/dashboard" className="btn btn-outline" style={{ width: "100%", textAlign: "center" }}>
            Launch Freelancer Dashboard
          </Link>
        </div>

      </div>
    </div>
  );
}
