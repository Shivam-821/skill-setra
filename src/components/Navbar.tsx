"use client";

import Link from "next/link";
import { useState } from "react";
import UserMenu from "./UserMenu";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <div className="navbar-header flex justify-between align-center" style={{ width: "100%" }}>
          <Link href="/" className="logo">
            SkillSetra<span style={{ color: "var(--primary)" }}>.</span>
          </Link>
          
          <div className="mobile-only">
            <UserMenu />
            <button 
              className="btn-icon" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              style={{ marginLeft: "0.5rem" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {isMobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </>
                ) : (
                  <>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        <div className={`nav-links ${isMobileMenuOpen ? "mobile-open" : "mobile-closed"}`}>
          <Link href="/about" className="sidebar-link" onClick={() => setIsMobileMenuOpen(false)} style={{ fontWeight: 500 }}>About Project</Link>
          <Link href="/tasks" className="sidebar-link" onClick={() => setIsMobileMenuOpen(false)} style={{ fontWeight: 500 }}>Browse Tasks</Link>
          <Link href="/freelancers" className="sidebar-link" onClick={() => setIsMobileMenuOpen(false)} style={{ fontWeight: 500 }}>Find Freelancers</Link>
          <div className="flex gap-2 nav-buttons-container">
            <Link href="/client/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="btn btn-outline" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem", width: "auto" }}>Client Dashboard</Link>
            <Link href="/freelancer/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="btn btn-primary" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem", width: "auto" }}>Freelancer Dashboard</Link>
          </div>
          <div className="desktop-only">
            <UserMenu />
          </div>
        </div>
      </div>
    </nav>
  );
}
