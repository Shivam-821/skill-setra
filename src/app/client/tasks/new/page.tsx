import prisma from "@/lib/prisma";
import Link from "next/link";
import { createNewTask } from "@/app/actions";

export default async function CreateTaskPage() {
  const skills = await prisma.skill.findMany();

  return (
    <div className="container" style={{ marginTop: "2rem" }}>
      <div className="dashboard-grid">
        <aside className="sidebar">
          <div className="sidebar-nav">
            <Link href="/client/dashboard" className="sidebar-link">Dashboard</Link>
            <Link href="/client/tasks/new" className="sidebar-link active">Post New Task</Link>
          </div>
        </aside>

        <section className="dashboard-content animate-fade-in">
          <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>Post a New Project</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>
            This form directly inserts a new Task and TaskSkill relational records into the SQLite database.
          </p>

          <div className="glass-card" style={{ maxWidth: "600px" }}>
            <form action={createNewTask}>
              <div className="form-group">
                <label className="form-label" htmlFor="title">Project Title</label>
                <input type="text" id="title" name="title" className="form-control" required placeholder="e.g. Build a E-commerce Website" />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="description">Project Description</label>
                <textarea id="description" name="description" className="form-control" rows={4} required placeholder="Describe the requirements..."></textarea>
              </div>

              <div className="flex gap-4 mb-4">
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label" htmlFor="budgetMin">Min Budget ($)</label>
                  <input type="number" id="budgetMin" name="budgetMin" className="form-control" required placeholder="1000" />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label" htmlFor="budgetMax">Max Budget ($)</label>
                  <input type="number" id="budgetMax" name="budgetMax" className="form-control" required placeholder="5000" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="skillId">Primary Required Skill</label>
                <select id="skillId" name="skillId" className="form-control" required style={{ backgroundColor: "var(--bg-secondary)" }}>
                  {skills.map((skill) => (
                    <option key={skill.id} value={skill.id}>
                      {skill.skillName} ({skill.category})
                    </option>
                  ))}
                </select>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
                  Fetched dynamically from the SKILL table.
                </p>
              </div>

              <div className="mt-8">
                <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
                  Insert Task Record
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
