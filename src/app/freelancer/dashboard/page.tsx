import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function FreelancerDashboard() {
  // Hardcode aman@example.com for demonstration purposes
  const freelancer = await prisma.user.findUnique({
    where: { email: 'aman@example.com' },
    include: {
      skills: { include: { skill: true } },
      applications: { include: { task: true } },
      matchScores: {
        include: { task: true },
        orderBy: { score: 'desc' }
      }
    }
  });

  if (!freelancer) return <div>Freelancer not found</div>;

  return (
    <div className="container" style={{ marginTop: "2rem" }}>
      <div className="dashboard-grid">
        <aside className="sidebar">
          <div className="sidebar-nav">
            <Link href="/freelancer/dashboard" className="sidebar-link active">Dashboard</Link>
            <Link href="/freelancer/profile" className="sidebar-link">My Profile & Skills</Link>
            <Link href="/freelancer/applications" className="sidebar-link">My Applications</Link>
          </div>
        </aside>

        <section className="dashboard-content animate-fade-in">
          <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>Welcome back, {freelancer.name}</h2>

          <div className="stats-grid">
            <div className="stat-card">
              <p className="form-label">Total Applications</p>
              <div className="stat-value gradient-text">{freelancer.applications.length}</div>
            </div>
            <div className="stat-card">
              <p className="form-label">Matched Tasks</p>
              <div className="stat-value">{freelancer.matchScores.length}</div>
            </div>
            <div className="stat-card">
              <p className="form-label">Skills Added</p>
              <div className="stat-value">{freelancer.skills.length}</div>
            </div>
          </div>

          <h3 className="mt-8 mb-4">Recommended Tasks For You</h3>
          <div className="flex flex-col gap-4">
            {freelancer.matchScores.map((match) => (
              <div key={match.id} className="glass-card" style={{ padding: "1.5rem" }}>
                <div className="flex justify-between align-center mb-4">
                  <h4 style={{ fontSize: "1.5rem", margin: 0 }}>{match.task.title}</h4>
                  <span style={{ fontWeight: 600, color: match.score && match.score > 80 ? '#10b981' : '#f59e0b', fontSize: "1.2rem" }}>
                    {match.score}% Match
                  </span>
                </div>
                <p>{match.task.description}</p>
                <div className="flex gap-4 mb-4">
                  <span style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
                    Budget: ${match.task.budgetMin} - ${match.task.budgetMax}
                  </span>
                </div>
                
                <div className="mt-4">
                  <button className="btn btn-primary">Apply Now</button>
                </div>
              </div>
            ))}
            {freelancer.matchScores.length === 0 && (
              <p className="text-muted">No task recommendations available yet.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
