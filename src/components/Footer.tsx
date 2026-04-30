"use client";

import { useState, useEffect } from "react";

export default function Footer() {
  const [team, setTeam] = useState([
    { name: "Shivam Raj", color: "var(--primary)" },
    { name: "Abhinav Patra", color: "var(--secondary)" },
    { name: "Divyam Kumar Choubey", color: "var(--accent)" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTeam((prevTeam) => {
        const newTeam = [...prevTeam];
        // Simple rotation: take the first item and move it to the end
        const first = newTeam.shift();
        if (first) newTeam.push(first);
        return newTeam;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="footer-main">
      {/* Decorative background element */}
      <div
        style={{
          position: "absolute",
          bottom: "-50px",
          right: "-100px",
          width: "300px",
          height: "300px",
          background:
            "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
          opacity: 0.05,
          zIndex: 0,
          pointerEvents: "none",
        }}
      ></div>

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div
          className="flex gap-8 mobile-reverse"
          style={{ justifyContent: "space-between" }}
        >
          {/* Left Side: About Application */}
          <div className="footer-item-left">
            <h2
              className="logo"
              style={{
                fontSize: "2rem",
                marginBottom: "1rem",
                display: "block",
              }}
            >
              SkillSetra<span style={{ color: "var(--primary)" }}>.</span>
            </h2>
            <p
              style={{
                fontSize: "1.05rem",
                color: "var(--text-muted)",
                lineHeight: "1.7",
                maxWidth: "480px",
                marginBottom: "2rem"
              }}
            >
              A sophisticated DBMS-powered freelance marketplace designed to
              bridge the gap between talented professionals and complex project
              requirements through an intelligent relational matching engine.
              Built with a focus on normalization, performance, and user
              experience.
            </p>
            <div
              style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}
            >
              <div
                style={{
                  fontSize: "0.85rem",
                  color: "var(--text-muted)",
                  fontWeight: 500,
                }}
              >
                © {new Date().getFullYear()} SkillSetra Platform
              </div>
              <div
                className="desktop-only"
                style={{
                  width: "1px",
                  height: "15px",
                  background: "var(--border)",
                }}
              ></div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                DBMS Project Prototype
              </div>
            </div>
          </div>

          {/* Right Side: Team & College */}
          <div className="footer-item-right">
            <div
              className="glass-card"
              style={{
                padding: "1.5rem",
                background: "rgba(255,255,255,0.01)",
                border: "1px solid var(--border)",
              }}
            >
              <h3
                style={{
                  fontSize: "0.85rem",
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  color: "var(--primary)",
                  marginBottom: "1.2rem",
                  fontWeight: 700,
                }}
              >
                Development Team
              </h3>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.85rem",
                  transition: "all 0.5s ease",
                }}
              >
                {team.map((member) => (
                  <div
                    key={member.name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      animation: "fadeIn 0.5s ease",
                    }}
                  >
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: member.color,
                      }}
                    ></div>
                    <span style={{ fontWeight: 600, fontSize: "1.05rem" }}>
                      {member.name}
                    </span>
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: "1.5rem",
                  paddingTop: "1.2rem",
                  borderTop: "1px solid var(--border)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.4rem",
                }}
              >
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  Institution
                </span>
                <p
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    color: "var(--text-main)",
                    margin: 0,
                    lineHeight: "1.4",
                  }}
                >
                  National Institute of Technology <br /> (NIT) Manipur
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
