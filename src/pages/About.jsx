// components/AboutSection.jsx
// Full About page body — Hero, Mission, Team, Timeline, WhyUs, Awards, CTA
// Requires Tailwind CSS + Google Fonts (Cormorant Garamond + Outfit)

import { useState, useEffect, useRef } from "react";

// ─── DATA ──────────────────────────────────────────────────────────────────

const STATS = [
  { value: "27+", label: "Years of Excellence" },
  { value: "850+", label: "Clients Served" },
  { value: "40+", label: "Expert Professionals" },
  { value: "98%", label: "Client Retention Rate" },
];

const VALUES = [
  {
    icon: "⚖",
    title: "Integrity Above All",
    desc: "Every engagement is governed by the highest ethical standards. Our objectivity and independence are non-negotiable.",
  },
  {
    icon: "◎",
    title: "Client-First Mindset",
    desc: "We listen before we advise. Understanding your goals allows us to deliver solutions that truly fit your business.",
  },
  {
    icon: "◈",
    title: "Relentless Excellence",
    desc: "Continuous investment in people, processes, and technology keeps us ahead of a changing regulatory landscape.",
  },
  {
    icon: "◇",
    title: "Lasting Partnerships",
    desc: "98% of our clients have been with us for five years or more. That speaks for itself.",
  },
];

const TEAM = [
  {
    initials: "RH",
    name: "Richard Hargrove",
    role: "Managing Partner",
    credentials: "FCA · ICAB Fellow",
    bio: "30+ years guiding enterprises through complex audits, financial restructuring, and regulatory compliance across South Asia.",
    avatarBg: "from-[#0f2044] to-[#1a3460]",
  },
  {
    initials: "SA",
    name: "Sadia Ahmed",
    role: "Tax Partner",
    credentials: "ACCA · CTA",
    bio: "Specialist in corporate tax structuring, VAT compliance, and cross-border advisory for multinational enterprises.",
    avatarBg: "from-[#14352a] to-[#1e4a3a]",
  },
  {
    initials: "MR",
    name: "Marcus Reid",
    role: "Audit Director",
    credentials: "ACA · CIA",
    bio: "Leads the statutory audit practice with deep expertise in RMG, FMCG, and financial services sectors.",
    avatarBg: "from-[#3a1f14] to-[#4a2d1e]",
  },
  {
    initials: "NC",
    name: "Nadia Chowdhury",
    role: "Advisory Lead",
    credentials: "MBA · CFA",
    bio: "Guides clients through business transformation, due diligence, and financial modelling for M&A transactions.",
    avatarBg: "from-[#1e1440] to-[#2d1e4a]",
  },
];

const TIMELINE = [
  {
    year: "1997",
    title: "Founded",
    desc: "Established in Dhaka with five chartered accountants and a clear mission: financial clarity for every client.",
  },
  {
    year: "2005",
    title: "Expansion",
    desc: "Opened the Chittagong office and joined the ICAB quality review programme, setting a new bar for audit standards.",
  },
  {
    year: "2014",
    title: "Advisory Launch",
    desc: "Launched a dedicated M&A advisory practice. The team grew beyond 30 professionals for the first time.",
  },
  {
    year: "2019",
    title: "Digital Shift",
    desc: "Rolled out cloud-based client portals and real-time dashboards — transforming client engagement.",
  },
  {
    year: "2024",
    title: "Recognition",
    desc: "Named among Bangladesh's Top 10 Accounting Firms by The Daily Star Business Awards.",
  },
];

const WHY = [
  { title: "Regulatory Mastery", desc: "Deep fluency in NBR, BSEC, and ICAB regulations. Compliance is never guesswork with our team." },
  { title: "Partner-Led Service", desc: "Every client is assigned a senior partner who remains your single point of contact throughout." },
  { title: "Real-Time Reporting", desc: "Cloud portals and live dashboards give you complete visibility into your financials at any moment." },
  { title: "Rapid Turnaround", desc: "Streamlined workflows and dedicated support ensure deliverables arrive on time, every time." },
  { title: "Award-Winning", desc: "Recognised by industry bodies for audit quality, ethical practice, and client satisfaction." },
  { title: "Total Confidentiality", desc: "Your data is protected under strict protocols aligned with international security standards." },
];

const AWARDS = [
  "ICAB Quality Review — Outstanding",
  "Top 10 Accounting Firms 2024 — The Daily Star",
  "Best Tax Advisory Practice — BICF",
  "ISO 27001 Certified",
  "NBR Approved Tax Counsel",
  "ACCA Approved Employer",
];

// ─── SHARED HOOK ───────────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ─── SHARED UI ─────────────────────────────────────────────────────────────

function FadeUp({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ children, light = false }) {
  return (
    <p
      className={`text-[11px] uppercase tracking-[0.2em] font-['Outfit'] font-medium mb-3 ${light ? "text-[#d4aa6e]" : "text-[#b8924a]"
        }`}
    >
      {children}
    </p>
  );
}

// ─── HERO ──────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative min-h-screen bg-[#0a1830] flex items-center overflow-hidden pt-16">
      {/* Diagonal dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg,#b8924a 0,#b8924a 1px,transparent 0,transparent 50%)",
          backgroundSize: "30px 30px",
        }}
      />
      {/* Ambient glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-[#b8924a]/5 blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">

        {/* Left — Text */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <span className="h-px w-10 bg-[#b8924a]" />
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#b8924a] font-['Outfit'] font-medium">
              Est. 1997 · Dhaka, Bangladesh
            </span>
          </div>
          <h1 className="font-['Cormorant_Garamond'] text-5xl lg:text-6xl font-semibold text-white leading-[1.1] mb-6">
            A Legacy of<br />
            <em className="text-[#b8924a] not-italic">Financial</em>
            <br />Precision
          </h1>
          <p className="font-['Outfit'] font-light text-white/55 text-base leading-[1.9] max-w-md mb-10">
            For over two decades, Hargrove & Partners has delivered trusted
            accounting, audit, and advisory services to enterprises across
            Bangladesh and beyond. We don't just file numbers — we build
            lasting partnerships.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-[#b8924a] text-[#0a1830] font-['Outfit'] text-[11px] uppercase tracking-[0.14em] font-medium px-7 py-3.5 hover:bg-[#d4aa6e] transition-colors duration-200">
              Meet Our Team
            </button>
            <button className="border border-white/25 text-white font-['Outfit'] text-[11px] uppercase tracking-[0.14em] font-light px-7 py-3.5 hover:border-white/60 transition-colors duration-200">
              Our Story
            </button>
          </div>
        </div>

        {/* Right — Stats grid */}
        <div className="grid grid-cols-2 gap-px bg-white/10 border border-white/10 shadow-2xl">
          {STATS.map(({ value, label }) => (
            <div
              key={label}
              className="bg-[#0a1830] px-8 py-10 text-center hover:bg-[#0f2040] transition-colors duration-300"
            >
              <span className="font-['Cormorant_Garamond'] text-5xl font-bold text-[#b8924a] block mb-2">
                {value}
              </span>
              <span className="font-['Outfit'] text-[10px] uppercase tracking-[0.16em] text-white/35 block">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Gold bottom fade line */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#b8924a]/60 to-transparent" />
    </section>
  );
}

// ─── MISSION ───────────────────────────────────────────────────────────────

function Mission() {
  const [ref, inView] = useInView();
  return (
    <section ref={ref} className="bg-[#f8f5ef] py-28 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

        {/* Left */}
        <div
          className={`transition-all duration-700 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
        >
          <SectionLabel>Our Philosophy</SectionLabel>
          <h2 className="font-['Cormorant_Garamond'] text-5xl font-semibold text-[#0a1830] leading-snug mb-8">
            Built on Trust,<br />Driven by Integrity
          </h2>
          <p className="font-['Outfit'] font-light text-[#5a6072] text-[15px] leading-[1.9] mb-5">
            We believe sound financial stewardship is the cornerstone of every
            thriving enterprise. Our multidisciplinary team brings deep industry
            knowledge to every engagement — from complex audits to long-term tax
            strategy.
          </p>
          <p className="font-['Outfit'] font-light text-[#5a6072] text-[15px] leading-[1.9]">
            We don't just file numbers. We sit alongside our clients as strategic
            partners, helping them make confident, informed decisions at every
            stage of their business journey.
          </p>
          <div className="flex items-center gap-4 mt-10">
            <span className="h-px flex-1 bg-[#b8924a]/25" />
            <span className="font-['Cormorant_Garamond'] text-[#b8924a] text-xl">H&P</span>
            <span className="h-px flex-1 bg-[#b8924a]/25" />
          </div>
        </div>

        {/* Right — Values cards */}
        <div className="grid grid-cols-2 gap-4">
          {VALUES.map(({ icon, title, desc }, i) => (
            <div
              key={title}
              className={`bg-white border border-[#0a1830]/07 p-6 group hover:border-[#b8924a]/40 hover:shadow-md transition-all duration-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              style={{ transitionDelay: `${150 + i * 80}ms`, transitionDuration: "600ms" }}
            >
              <span className="font-['Cormorant_Garamond'] text-2xl text-[#b8924a] block mb-4">
                {icon}
              </span>
              <h4 className="font-['Cormorant_Garamond'] text-[17px] font-semibold text-[#0a1830] mb-2">
                {title}
              </h4>
              <p className="font-['Outfit'] font-light text-[13px] text-[#5a6072] leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TEAM ──────────────────────────────────────────────────────────────────

function Team() {
  return (
    <section className="bg-white py-28 px-8">
      <div className="max-w-7xl mx-auto">
        <FadeUp className="text-center mb-16">
          <SectionLabel>Leadership</SectionLabel>
          <h2 className="font-['Cormorant_Garamond'] text-5xl font-semibold text-[#0a1830]">
            The People Behind Our Practice
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map(({ initials, name, role, credentials, bio, avatarBg }, i) => (
            <FadeUp key={name} delay={i * 100}>
              <div className="border border-[#0a1830]/10 overflow-hidden group cursor-default hover:shadow-xl hover:shadow-[#0a1830]/08 hover:-translate-y-1 transition-all duration-300">
                {/* Avatar */}
                <div
                  className={`relative aspect-square bg-gradient-to-br ${avatarBg} flex items-center justify-center overflow-hidden`}
                >
                  <span className="font-['Cormorant_Garamond'] text-5xl font-bold text-white/85 relative z-10">
                    {initials}
                  </span>
                  {/* Corner accents */}
                  <span className="absolute bottom-0 right-0 w-10 h-10 border-r-2 border-b-2 border-[#b8924a]/50" />
                  <span className="absolute top-0 left-0 w-7 h-7 border-l-2 border-t-2 border-[#b8924a]/30" />
                </div>

                {/* Info */}
                <div className="p-5 border-t border-[#0a1830]/08 bg-white">
                  <p className="font-['Cormorant_Garamond'] text-[17px] font-semibold text-[#0a1830] mb-0.5">
                    {name}
                  </p>
                  <p className="font-['Outfit'] text-[10px] uppercase tracking-[0.16em] text-[#b8924a] font-medium mb-1">
                    {role}
                  </p>
                  <p className="font-['Outfit'] text-[11px] text-[#5a6072]/65 mb-3">
                    {credentials}
                  </p>
                  <p className="font-['Outfit'] font-light text-[12px] text-[#5a6072] leading-relaxed">
                    {bio}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TIMELINE ──────────────────────────────────────────────────────────────

function Timeline() {
  return (
    <section className="bg-[#0a1830] py-28 px-8 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg,#b8924a 0,#b8924a 1px,transparent 0,transparent 50%)",
          backgroundSize: "30px 30px",
        }}
      />
      <div className="relative max-w-7xl mx-auto">
        <FadeUp className="text-center mb-20">
          <SectionLabel light>Our Journey</SectionLabel>
          <h2 className="font-['Cormorant_Garamond'] text-5xl font-semibold text-white">
            Milestones That Define Us
          </h2>
        </FadeUp>

        <div className="relative grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4">
          {/* Horizontal connecting line (desktop only) */}
          <div className="hidden md:block absolute top-[9px] left-[10%] right-[10%] h-px bg-[#b8924a]/25" />

          {TIMELINE.map(({ year, title, desc }, i) => (
            <FadeUp key={year} delay={i * 100}>
              <div className="text-center relative">
                {/* Dot */}
                <div className="w-[18px] h-[18px] rounded-full bg-[#b8924a] mx-auto mb-5 shadow-[0_0_0_5px_rgba(184,146,74,0.15)] relative z-10" />
                <p className="font-['Cormorant_Garamond'] text-2xl font-bold text-[#b8924a] mb-1">
                  {year}
                </p>
                <p className="font-['Cormorant_Garamond'] text-[15px] font-semibold text-white mb-2">
                  {title}
                </p>
                <p className="font-['Outfit'] font-light text-[12px] text-white/40 leading-relaxed">
                  {desc}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── WHY US ────────────────────────────────────────────────────────────────

function WhyUs() {
  return (
    <section className="bg-[#f8f5ef] py-28 px-8">
      <div className="max-w-7xl mx-auto">
        <FadeUp className="text-center mb-16">
          <SectionLabel>Why Choose Us</SectionLabel>
          <h2 className="font-['Cormorant_Garamond'] text-5xl font-semibold text-[#0a1830]">
            What Sets Us Apart
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {WHY.map(({ title, desc }, i) => (
            <FadeUp key={title} delay={i * 70}>
              <div className="bg-white border border-[#0a1830]/07 p-8 group hover:border-[#b8924a]/40 hover:shadow-lg hover:shadow-[#b8924a]/05 transition-all duration-300 relative overflow-hidden">
                {/* Number */}
                <span className="font-['Cormorant_Garamond'] text-4xl font-bold text-[#b8924a]/18 block mb-4 group-hover:text-[#b8924a]/40 transition-colors duration-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4 className="font-['Cormorant_Garamond'] text-xl font-semibold text-[#0a1830] mb-3">
                  {title}
                </h4>
                <p className="font-['Outfit'] font-light text-[13px] text-[#5a6072] leading-relaxed">
                  {desc}
                </p>
                {/* Animated bottom line */}
                <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full bg-[#b8924a]/40 transition-all duration-500" />
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── AWARDS ────────────────────────────────────────────────────────────────

function Awards() {
  return (
    <section className="bg-[#060f1e] py-10 px-8 border-t border-white/05">
      <div className="max-w-7xl mx-auto">
        <p className="text-center font-['Outfit'] text-[10px] uppercase tracking-[0.2em] text-white/25 mb-6">
          Accreditations & Recognition
        </p>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
          {AWARDS.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[#b8924a] shrink-0" />
              <span className="font-['Outfit'] text-[11px] text-white/30">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ───────────────────────────────────────────────────────────────────

function CTA() {
  return (
    <section className="relative bg-[#b8924a] py-20 px-8 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg,#0a1830 0,#0a1830 1px,transparent 0,transparent 50%)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
        <div>
          <h2 className="font-['Cormorant_Garamond'] text-5xl font-semibold text-[#0a1830] mb-3 leading-tight">
            Ready to Work Together?
          </h2>
          <p className="font-['Outfit'] font-light text-[#0a1830]/60 text-base max-w-lg">
            Schedule a complimentary consultation with one of our senior partners.
            No obligations — just clarity.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 shrink-0">
          <button className="bg-[#0a1830] text-white font-['Outfit'] text-[11px] uppercase tracking-[0.14em] font-medium px-8 py-4 hover:bg-[#1a3460] transition-colors duration-200">
            Book a Consultation
          </button>
          <button className="border-2 border-[#0a1830]/30 text-[#0a1830] font-['Outfit'] text-[11px] uppercase tracking-[0.14em] font-light px-8 py-4 hover:border-[#0a1830] transition-colors duration-200">
            View Our Services
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── MAIN EXPORT ───────────────────────────────────────────────────────────

export default function About() {
  return (
    <>
      <Hero />
      <Mission />
      <Team />
      <Timeline />
      <WhyUs />
      <Awards />
      <CTA />
    </>
  );
}