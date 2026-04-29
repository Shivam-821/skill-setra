import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import UserMenu from "@/components/UserMenu";

export const metadata: Metadata = {
  title: "SkillSetra | Freelance Marketplace Platform",
  description:
    "Database System Design and Implementation for Freelance Platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var savedTheme = localStorage.getItem('theme');
                if (savedTheme) {
                  document.documentElement.setAttribute('data-theme', savedTheme);
                } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body>
        <nav className="navbar">
          <div className="container navbar-container">
            <Link href="/" className="logo">
              SkillSetra<span style={{ color: "var(--primary)" }}>.</span>
            </Link>
            <div className="nav-links">
              <Link href="/about" className="sidebar-link" style={{ fontWeight: 500 }}>About Project</Link>
              <Link href="/tasks" className="sidebar-link" style={{ fontWeight: 500 }}>Browse Tasks</Link>
              <Link href="/freelancers" className="sidebar-link" style={{ fontWeight: 500 }}>Find Freelancers</Link>
              <Link href="/client/dashboard" className="btn btn-outline" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}>Client Dashboard</Link>
              <Link href="/freelancer/dashboard" className="btn btn-primary" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}>Freelancer Dashboard</Link>
              <UserMenu />
            </div>
          </div>
        </nav>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
