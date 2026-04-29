import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function BrowseTasksPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const query = (await searchParams).q || "";

  const tasks = await prisma.task.findMany({
    where: { 
      status: 'OPEN',
      OR: query ? [
        { title: { contains: query } },
        { description: { contains: query } },
        { taskSkills: { some: { skill: { skillName: { contains: query } } } } }
      ] : undefined
    },
    include: {
      client: true,
      taskSkills: {
        include: { skill: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="container" style={{ marginTop: "3rem", marginBottom: "5rem" }}>
      <section className="animate-fade-scale mb-8">
        <div className="flex justify-between align-center mb-6">
          <h1 style={{ fontSize: "2.5rem", margin: 0 }}>Available Tasks</h1>
          <Link href="/client/dashboard" className="btn btn-primary">Post a Task</Link>
        </div>
        <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", marginBottom: "2rem" }}>
          Browse open projects and apply to those that match your skill set.
        </p>

        {/* Search Bar */}
        <form method="GET" action="/tasks" className="flex gap-4" style={{ maxWidth: "600px" }}>
          <input 
            type="text" 
            name="q" 
            defaultValue={query} 
            placeholder="Search by title, description, or required skill..." 
            className="form-control" 
            style={{ flex: 1 }}
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
          {query && (
            <Link href="/tasks" className="btn btn-outline">
              Clear
            </Link>
          )}
        </form>
      </section>

      <div className="flex flex-col gap-6 animate-fade-up delay-1">
        {tasks.map((task) => (
          <div key={task.id} className="glass-card flex flex-col gap-4">
            <div className="flex justify-between">
              <h2 style={{ fontSize: "1.5rem", margin: 0 }}>{task.title}</h2>
              <span className="badge badge-success">Open</span>
            </div>
            
            <p style={{ color: "var(--text-main)", fontSize: "1.05rem" }}>{task.description}</p>
            
            <div className="flex gap-4 mb-2">
              <span style={{ fontSize: "0.9rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <strong>Client:</strong> {task.client.name}
              </span>
              <span style={{ fontSize: "0.9rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <strong>Budget:</strong> ${task.budgetMin} - ${task.budgetMax}
              </span>
              {task.deadline && (
                <span style={{ fontSize: "0.9rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <strong>Deadline:</strong> {new Date(task.deadline).toLocaleDateString()}
                </span>
              )}
            </div>

            <div>
              <h4 style={{ fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.5rem", color: "var(--accent)" }}>Required Skills</h4>
              <div className="flex gap-2 flex-wrap">
                {task.taskSkills.map(ts => (
                  <span key={ts.id} className="badge" style={{ background: "var(--glass-bg)", border: "1px solid var(--border)", color: "var(--text-muted)" }}>
                    {ts.skill.skillName} (Level {ts.requiredLevel})
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 border-t pt-4" style={{ borderTop: "1px solid var(--border)", display: "flex", justifyContent: "flex-end" }}>
              <form action={async () => {
                "use server";
                const { applyForTask } = await import('@/app/actions');
                await applyForTask(task.id);
              }}>
                <button type="submit" className="btn btn-outline" style={{ padding: "0.5rem 1.5rem" }}>
                  1-Click Apply
                </button>
              </form>
            </div>
          </div>
        ))}
        
        {tasks.length === 0 && (
          <div className="glass-card text-center" style={{ padding: "4rem" }}>
            <h3 style={{ color: "var(--text-muted)" }}>
              {query ? `No open tasks found matching "${query}".` : "No open tasks available at the moment."}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}
