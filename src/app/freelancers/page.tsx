import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function FreelancersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const query = (await searchParams).q || "";

  const freelancers = await prisma.user.findMany({
    where: { 
      role: 'FREELANCER',
      OR: query ? [
        { name: { contains: query } },
        { bio: { contains: query } },
        { skills: { some: { skill: { skillName: { contains: query } } } } }
      ] : undefined
    },
    include: {
      skills: {
        include: { skill: true }
      },
      portfolios: true,
      reviewsReceived: true
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="container" style={{ marginTop: "3rem", marginBottom: "5rem" }}>
      <section className="animate-fade-scale mb-8">
        <h1 style={{ fontSize: "2.5rem", margin: 0, marginBottom: "1rem" }}>Freelancer Directory</h1>
        <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", maxWidth: "700px", marginBottom: "2rem" }}>
          Discover and directly invite highly skilled professionals for your next project based on their expertise and portfolio.
        </p>

        {/* Search Bar */}
        <form method="GET" action="/freelancers" className="flex gap-4" style={{ maxWidth: "600px" }}>
          <input 
            type="text" 
            name="q" 
            defaultValue={query} 
            placeholder="Search by name, bio, or skill (e.g., React, Design)..." 
            className="form-control" 
            style={{ flex: 1 }}
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
          {query && (
            <Link href="/freelancers" className="btn btn-outline">
              Clear
            </Link>
          )}
        </form>
      </section>

      <div className="stats-grid animate-fade-up delay-1">
        {freelancers.map((freelancer) => (
          <div key={freelancer.id} className="glass-card flex flex-col justify-between">
            <div>
              <div className="flex justify-between align-center mb-4">
                <h3 style={{ fontSize: "1.5rem", margin: 0 }}>{freelancer.name}</h3>
                <span className="badge badge-warning">Pro</span>
              </div>
              <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", minHeight: "60px" }}>{freelancer.bio}</p>
              
              <div className="mb-4">
                <h4 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.5rem", color: "var(--accent)" }}>Proficiencies</h4>
                <div className="flex gap-2 flex-wrap">
                  {freelancer.skills.map(fs => (
                    <span key={fs.id} className="badge" style={{ background: "var(--glass-bg)", border: "1px solid var(--border)", color: "var(--text-muted)" }}>
                      {fs.skill.skillName}
                    </span>
                  ))}
                  {freelancer.skills.length === 0 && (
                    <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>No skills listed yet.</span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
               <form action={async () => {
                 "use server";
                 const { inviteFreelancer } = await import('@/app/actions');
                 await inviteFreelancer(freelancer.id);
               }}>
                 <button type="submit" className="btn btn-primary" style={{ width: "100%", textAlign: "center" }}>
                   1-Click Invite to Latest Task
                 </button>
               </form>
            </div>
          </div>
        ))}
        
        {freelancers.length === 0 && (
          <div className="glass-card text-center" style={{ gridColumn: "1 / -1", padding: "4rem" }}>
            <h3 style={{ color: "var(--text-muted)" }}>No freelancers found matching "{query}".</h3>
          </div>
        )}
      </div>
    </div>
  );
}
