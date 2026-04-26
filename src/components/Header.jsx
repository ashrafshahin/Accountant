// components/Navbar.jsx
// Sticky scroll-aware navbar — Cormorant Garamond + Outfit
// Add to index.html:
// <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Outfit:wght@300;400;500&display=swap" rel="stylesheet" />

import { useState, useEffect } from "react";

const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contacts", href: "/contacts" },
];

export default function Navbar({ activePage = "Home" }) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 inset-x-0 z-50 transition-all duration-400 ${scrolled
                    ? "bg-[#0a1830]/95 backdrop-blur-md shadow-[0_2px_32px_rgba(0,0,0,0.3)]"
                    : "bg-[#0a1830]"
                }`}
        >
            <div className="max-w-7xl mx-auto px-8">
                <div className="flex items-center justify-between h-16">

                    {/* ── Logo ── */}
                    <a
                        href="/"
                        className="font-['Cormorant_Garamond'] text-[20px] font-semibold text-white tracking-wide no-underline shrink-0"
                    >
                        Hargrove{" "}
                        <span className="text-[#b8924a]">&</span>{" "}
                        Partners
                    </a>

                    {/* ── Desktop Nav ── */}
                    <nav className="hidden md:flex items-center gap-8">
                        {NAV_LINKS.map(({ label, href }) => (
                            <a
                                key={label}
                                href={href}
                                className={`text-[11px] uppercase tracking-[0.14em] font-['Outfit'] no-underline transition-colors duration-200 relative group ${label === activePage
                                        ? "text-[#b8924a]"
                                        : "text-white/55 hover:text-white"
                                    }`}
                            >
                                {label}
                                {/* Active underline */}
                                {label === activePage && (
                                    <span className="absolute -bottom-1 left-0 right-0 h-px bg-[#b8924a]" />
                                )}
                            </a>
                        ))}

                        {/* Divider */}
                        <span className="w-px h-4 bg-white/15" />

                        {/* CTA */}
                        <a
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-[#b8924a] text-[#0a1830] text-[11px] uppercase tracking-[0.14em] font-medium font-['Outfit'] px-5 py-2.5 no-underline transition-colors duration-200 hover:bg-[#d4aa6e]"
                        >
                            Contact Us
                            <svg
                                className="w-3 h-3"
                                viewBox="0 0 12 12"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            >
                                <path d="M2 6h8M7 3l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                    </nav>

                    {/* ── Mobile Menu Toggle ── */}
                    <button
                        className="md:hidden flex flex-col gap-1.5 p-2"
                        onClick={() => setMenuOpen((v) => !v)}
                        aria-label="Toggle menu"
                    >
                        <span
                            className={`block w-5 h-px bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""
                                }`}
                        />
                        <span
                            className={`block w-5 h-px bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""
                                }`}
                        />
                        <span
                            className={`block w-5 h-px bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""
                                }`}
                        />
                    </button>
                </div>

                {/* ── Mobile Menu ── */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-64 pb-6" : "max-h-0"
                        }`}
                >
                    <div className="border-t border-white/10 pt-4 flex flex-col gap-4">
                        {NAV_LINKS.map(({ label, href }) => (
                            <a
                                key={label}
                                href={href}
                                className={`text-[12px] uppercase tracking-widest font-['Outfit'] no-underline transition-colors duration-200 ${label === activePage ? "text-[#b8924a]" : "text-white/55 hover:text-white"
                                    }`}
                            >
                                {label}
                            </a>
                        ))}
                        <a
                            href="/contact"
                            className="self-start bg-[#b8924a] text-[#0a1830] text-[11px] uppercase tracking-widest font-medium font-['Outfit'] px-5 py-2.5 no-underline hover:bg-[#d4aa6e] transition-colors duration-200"
                        >
                            Contact Us
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
}