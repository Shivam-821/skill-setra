import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function ClientDashboard() {
  const tasks = await prisma.task.findMany({
    include: {
      taskSkills: {
        include: { skill: true }
      },
      matchScores: {
        include: { freelancer: true },
        orderBy: { score: 'desc' }
      }
    }
  });

  return (
    <div className="container" style={{ marginTop: "2rem" }}>
      <div className="dashboard-grid">
        <aside className="sidebar">
          <div className="sidebar-nav">
            <Link href="/client/dashboard" className="sidebar-link active">Dashboard</Link>
            <Link href="/client/tasks/new" className="sidebar-link">Post New Task</Link>
            <Link href="/client/invitations" className="sidebar-link">Invitations Sent</Link>
          </div>
        </aside>

        <section className="dashboard-content animate-fade-in">
          <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>Client Dashboard</h2>

          <div className="stats-grid">
            <div className="stat-card">
              <p className="form-label">Total Tasks Posted</p>
              <div className="stat-value gradient-text">{tasks.length}</div>
            </div>
            <div className="stat-card">
              <p className="form-label">Active Tasks</p>
              <div className="stat-value">{tasks.filter(t => t.status === 'OPEN').length}</div>
            </div>
          </div>

          <h3 className="mt-8 mb-4">Your Posted Tasks</h3>
          <div className="flex flex-col gap-4">
            {tasks.map((task) => (
              <div key={task.id} className="glass-card" style={{ padding: "1.5rem" }}>
                <div className="flex justify-between align-center mb-4">
                  <h4 style={{ fontSize: "1.5rem", margin: 0 }}>{task.title}</h4>
                  <span className={`badge ${task.status === 'OPEN' ? 'badge-success' : 'badge-warning'}`}>
                    {task.status}
                  </span>
                </div>
                <p>{task.description}</p>
                <div className="flex gap-4 mb-4">
                  <span style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
                    Budget: ${task.budgetMin} - ${task.budgetMax}
                  </span>
                </div>
                
                <h5 className="mt-4 mb-4">Top Matches</h5>
                <div className="table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Freelancer</th>
                        <th>Match Score</th>
                        <th>Skills Matched</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {task.matchScores.slice(0, 3).map((match) => (
                        <tr key={match.id}>
                          <td>{match.freelancer.name}</td>
                          <td>
                            <span style={{ fontWeight: 600, color: match.score && match.score > 80 ? '#10b981' : '#f59e0b' }}>
                              {match.score}%
                            </span>
                          </td>
                          <td>{match.matchedSkillsCount} / {match.totalRequiredSkills}</td>
                          <td>
                            <button className="btn btn-outline" style={{ padding: "0.25rem 0.75rem", fontSize: "0.8rem" }}>
                              Invite
                            </button>
                          </td>
                        </tr>
                      ))}
                      {task.matchScores.length === 0 && (
                        <tr>
                          <td colSpan={4} className="text-center text-muted">No matches generated yet.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
