import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function FreelancerProfilePage() {
  const freelancer = await prisma.user.findUnique({
    where: { email: 'aman@example.com' }, // Hardcoded demo user
    include: {
      skills: {
        include: { skill: true }
      },
      portfolios: true
    }
  });

  if (!freelancer) return <div>Freelancer not found</div>;

  return (
    <div className="container" style={{ marginTop: "2rem" }}>
      <div className="dashboard-grid">
        <aside className="sidebar">
          <div className="sidebar-nav">
            <Link href="/freelancer/dashboard" className="sidebar-link">Dashboard</Link>
            <Link href="/freelancer/profile" className="sidebar-link active">My Profile & Skills</Link>
          </div>
        </aside>

        <section className="dashboard-content animate-fade-in">
          <div className="flex justify-between align-center mb-6 flex-wrap gap-4">
            <h2 style={{ fontSize: "2rem", margin: 0 }}>My Profile</h2>
            <button className="btn btn-primary" style={{ padding: "0.5rem 1rem", width: "auto" }}>Edit Profile</button>
          </div>

          <div className="glass-card mb-8">
            <h3 style={{ borderBottom: "1px solid var(--border)", paddingBottom: "1rem", marginBottom: "1.5rem" }}>Personal Information</h3>
            <div className="flex flex-col gap-4">
              <div>
                <label className="form-label">Full Name</label>
                <div style={{ fontSize: "1.1rem", color: "var(--text-main)" }}>{freelancer.name}</div>
              </div>
              <div>
                <label className="form-label">Email Address</label>
                <div style={{ fontSize: "1.1rem", color: "var(--text-main)" }}>{freelancer.email}</div>
              </div>
              <div>
                <label className="form-label">Location</label>
                <div style={{ fontSize: "1.1rem", color: "var(--text-main)" }}>{freelancer.location || 'Not specified'}</div>
              </div>
              <div>
                <label className="form-label">Bio</label>
                <div style={{ fontSize: "1.05rem", color: "var(--text-muted)" }}>{freelancer.bio || 'No bio provided.'}</div>
              </div>
            </div>
          </div>

          <div className="glass-card mb-8">
            <div className="flex justify-between align-center border-b mb-6 flex-wrap gap-4" style={{ borderBottom: "1px solid var(--border)", paddingBottom: "1rem" }}>
              <h3 style={{ margin: 0 }}>My Skills</h3>
              <button className="btn btn-outline" style={{ padding: "0.3rem 0.8rem", fontSize: "0.8rem", width: "auto" }}>Add Skill</button>
            </div>
            
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Skill Name</th>
                    <th>Category</th>
                    <th>Proficiency (1-5)</th>
                    <th>Experience (Years)</th>
                  </tr>
                </thead>
                <tbody>
                  {freelancer.skills.map((fs) => (
                    <tr key={fs.id}>
                      <td style={{ fontWeight: 600 }}>{fs.skill.skillName}</td>
                      <td>{fs.skill.category}</td>
                      <td>
                        <div className="flex align-center gap-2">
                          <span style={{ color: "var(--accent)", fontWeight: 600 }}>{fs.proficiencyLevel}</span>
                          <div style={{ height: "6px", width: "100%", background: "var(--border)", borderRadius: "3px", overflow: "hidden" }}>
                            <div style={{ height: "100%", width: `${(fs.proficiencyLevel || 0) * 20}%`, background: "var(--accent)" }}></div>
                          </div>
                        </div>
                      </td>
                      <td>{fs.experienceYears} Years</td>
                    </tr>
                  ))}
                  {freelancer.skills.length === 0 && (
                    <tr>
                      <td colSpan={4} className="text-center text-muted">No skills added yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="glass-card">
            <div className="flex justify-between align-center border-b mb-6 flex-wrap gap-4" style={{ borderBottom: "1px solid var(--border)", paddingBottom: "1rem" }}>
              <h3 style={{ margin: 0 }}>Portfolio</h3>
              <button className="btn btn-outline" style={{ padding: "0.3rem 0.8rem", fontSize: "0.8rem", width: "auto" }}>Add Project</button>
            </div>
            
            {freelancer.portfolios.length > 0 ? (
              <div className="flex gap-4 flex-wrap mobile-carousel">
                {freelancer.portfolios.map(portfolio => (
                  <div key={portfolio.id} className="mobile-carousel-item" style={{ padding: "1.5rem", border: "1px solid var(--border)", borderRadius: "4px", background: "rgba(255,255,255,0.02)", flex: "1 1 300px" }}>
                    <h4 style={{ marginBottom: "0.5rem" }}>{portfolio.title}</h4>
                    <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>{portfolio.description}</p>
                    {portfolio.projectLink && (
                      <a href={portfolio.projectLink} target="_blank" rel="noreferrer" style={{ color: "var(--primary)", fontSize: "0.85rem", fontWeight: 600 }}>View Project →</a>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted text-center" style={{ padding: "2rem 0" }}>No portfolio items uploaded yet.</p>
            )}
          </div>

        </section>
      </div>
    </div>
  );
}
