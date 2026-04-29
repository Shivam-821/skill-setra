import { registerUser } from "@/app/actions";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="container flex justify-center align-center" style={{ minHeight: "calc(100vh - 100px)", padding: "4rem 0" }}>
      <div className="glass-card animate-fade-scale" style={{ width: "100%", maxWidth: "600px", padding: "3rem" }}>
        
        <div className="text-center mb-8">
          <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>Create an Account</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "1.05rem" }}>
            Join the SkillSetra database by inserting a new record into the USER table.
          </p>
        </div>

        <form action={registerUser}>
          <div className="flex gap-4 mb-4">
            <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
              <label className="form-label" htmlFor="name">Full Name *</label>
              <input type="text" id="name" name="name" className="form-control" required placeholder="John Doe" />
            </div>
            <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
              <label className="form-label" htmlFor="email">Email Address *</label>
              <input type="email" id="email" name="email" className="form-control" required placeholder="john@example.com" />
            </div>
          </div>

          <div className="form-group mb-6">
            <label className="form-label" htmlFor="password">Password *</label>
            <input type="password" id="password" name="password" className="form-control" required placeholder="••••••••" />
          </div>

          <div className="form-group mb-6">
            <label className="form-label" htmlFor="role" style={{ fontSize: "1.1rem", color: "var(--primary)" }}>Select Your Role *</label>
            <select id="role" name="role" className="form-control" required style={{ border: "2px solid var(--primary)", backgroundColor: "var(--bg-secondary)" }}>
              <option value="CLIENT">Client (I want to hire freelancers and post tasks)</option>
              <option value="FREELANCER">Freelancer (I want to find projects and apply)</option>
            </select>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
              This defines the ENUM constraint mapping in the database architecture.
            </p>
          </div>

          <div className="form-group mb-4">
            <label className="form-label" htmlFor="location">Location (Optional)</label>
            <input type="text" id="location" name="location" className="form-control" placeholder="New York, USA" />
          </div>

          <div className="form-group mb-8">
            <label className="form-label" htmlFor="bio">Professional Bio (Optional)</label>
            <textarea id="bio" name="bio" className="form-control" rows={3} placeholder="Tell us about your company or your skills..."></textarea>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "1rem", fontSize: "1.1rem" }}>
            Execute INSERT Statement (Sign Up)
          </button>
        </form>

        <div className="text-center mt-6 pt-6" style={{ borderTop: "1px solid var(--border)" }}>
          <span style={{ color: "var(--text-muted)" }}>Already have a record? </span>
          <Link href="/demonstration" style={{ color: "var(--primary)", fontWeight: 600 }}>
            Login here
          </Link>
        </div>

      </div>
    </div>
  );
}
