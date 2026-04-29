import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function ClientInvitationsPage() {
  const client = await prisma.user.findUnique({
    where: { email: 'contact@acme.com' } // Hardcoded for demo
  });

  if (!client) return <div>Client not found</div>;

  const invitations = await prisma.invitation.findMany({
    where: { clientId: client.id },
    include: {
      freelancer: true,
      task: true
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="container" style={{ marginTop: "2rem" }}>
      <div className="dashboard-grid">
        <aside className="sidebar">
          <div className="sidebar-nav">
            <Link href="/client/dashboard" className="sidebar-link">Dashboard</Link>
            <Link href="/client/tasks/new" className="sidebar-link">Post New Task</Link>
            <Link href="/client/invitations" className="sidebar-link active">Invitations Sent</Link>
          </div>
        </aside>

        <section className="dashboard-content animate-fade-in">
          <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>Sent Invitations</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>
            A dynamic view of all records in the INVITATION table joining FREELANCER and TASK entities.
          </p>

          <div className="glass-card" style={{ padding: "0" }}>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Freelancer</th>
                    <th>Invited For Project</th>
                    <th>Message Sent</th>
                    <th>Date Sent</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {invitations.map((inv) => (
                    <tr key={inv.id}>
                      <td style={{ fontWeight: 600 }}>{inv.freelancer.name}</td>
                      <td>{inv.task.title}</td>
                      <td style={{ maxWidth: "250px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", color: "var(--text-muted)" }}>
                        {inv.message}
                      </td>
                      <td style={{ color: "var(--text-muted)" }}>
                        {new Date(inv.createdAt).toLocaleDateString()}
                      </td>
                      <td>
                        <span className={`badge ${inv.status === 'PENDING' ? 'badge-warning' : 'badge-success'}`}>
                          {inv.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {invitations.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center" style={{ padding: "3rem", color: "var(--text-muted)" }}>
                        No invitations sent yet. Go to the Freelancers directory to send an invite!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
