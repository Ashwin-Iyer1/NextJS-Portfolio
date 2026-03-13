"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./Bar.css";

export default function Bar() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav className="Bar">
      <Link href="/" className="logo">
        Ashwin Iyer
      </Link>
      <div className="nav-links">
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`nav-link ${pathname === href ? "nav-link-active" : ""}`}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
