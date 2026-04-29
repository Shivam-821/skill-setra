"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef} style={{ position: "relative" }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="btn-icon"
        style={{ borderRadius: "50%", padding: "0.6rem" }}
        aria-label="User menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </button>

      {isOpen && (
        <div 
          className="glass-card animate-fade-scale" 
          style={{ 
            position: "absolute", 
            right: 0, 
            top: "calc(100% + 10px)", 
            width: "220px", 
            padding: "1rem", 
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            gap: "1rem"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--border)", paddingBottom: "0.75rem" }}>
            <span style={{ fontWeight: 600, fontSize: "0.95rem" }}>Appearance</span>
            <ThemeToggle />
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <Link 
              href="/register" 
              onClick={() => setIsOpen(false)}
              className="btn btn-primary" 
              style={{ width: "100%", padding: "0.5rem", fontSize: "0.9rem" }}
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
