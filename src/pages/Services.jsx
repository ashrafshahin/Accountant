// pages/ServicesPage.jsx
// Full Services Page — Hero, Service Cards (expandable), Process, Industries, Testimonial, CTA
// Design system: Cormorant Garamond + Outfit | Navy #0a1830 | Gold #b8924a
// Requires Tailwind CSS + Google Fonts in index.html:
// <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Outfit:wght@300;400;500&display=swap" rel="stylesheet" />

import { useState, useEffect, useRef } from "react";

// ─── DATA ──────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    id: "audit",
    number: "01",
    title: "Audit & Assurance",
    tagline: "Independent. Credible. Thorough.",
    desc: "We conduct statutory, internal, and compliance audits across industries with rigorous methodology and full regulatory alignment. Our independent reports give shareholders, lenders, and regulators the confidence they need.",
    features: [
      "Statutory & external audit",
      "Internal audit & controls review",
      "Compliance & regulatory audit",
      "Due diligence engagements",
      "Special purpose audits",
      "Agreed-upon procedures",
    ],
    gradient: "from-[#0f2044] to-[#1a3460]",
    lightBg: "bg-[#eef2f8]",
  },
  {
    id: "tax",
    number: "02",
    title: "Tax Advisory",
    tagline: "Strategic. Compliant. Efficient.",
    desc: "We navigate Bangladesh's complex tax landscape on your behalf — from corporate income tax and VAT to cross-border structures and transfer pricing. We don't just file; we plan ahead to minimise your liability legally.",
    features: [
      "Corporate income tax filing",
      "VAT registration & compliance",
      "Transfer pricing advisory",
      "Cross-border tax structuring",
      "NBR dispute representation",
      "Withholding tax management",
    ],
    gradient: "from-[#14352a] to-[#1e4a3a]",
    lightBg: "bg-[#eef5f1]",
  },
  {
    id: "reporting",
    number: "03",
    title: "Financial Reporting",
    tagline: "Clarity in every number.",
    desc: "Accurate, timely, and IFRS-aligned financial statements that satisfy regulators, investors, and lenders. We handle preparation, review, and the full disclosure framework so nothing is missed.",
    features: [
      "IFRS-compliant financial statements",
      "Management accounts & MIS",
      "Consolidation & group reporting",
      "Cash flow forecasting",
      "Board-level financial packs",
      "Restatement & prior-period reviews",
    ],
    gradient: "from-[#2d1e4a] to-[#3d2a60]",
    lightBg: "bg-[#f0eef8]",
  },
  {
    id: "advisory",
    number: "04",
    title: "M&A Advisory",
    tagline: "Confident decisions at every stage.",
    desc: "From pre-deal due diligence to post-merger integration, our advisory team provides the financial insight and modelling expertise to help you execute transactions with precision and confidence.",
    features: [
      "Financial due diligence",
      "Valuation & modelling",
      "Deal structuring & negotiation support",
      "Post-merger integration",
      "Exit readiness preparation",
      "Fairness opinions",
    ],
    gradient: "from-[#3a1f14] to-[#4a2d1e]",
    lightBg: "bg-[#f8f0ee]",
  },
  {
    id: "consulting",
    number: "05",
    title: "Business Consulting",
    tagline: "From strategy to execution.",
    desc: "We help founders and leadership teams build robust financial systems, performance frameworks, and governance structures that scale. Whether you need a part-time CFO or a full controls overhaul, we deliver.",
    features: [
      "Business plan & feasibility studies",
      "CFO-as-a-service",
      "Internal control design",
      "KPI & performance frameworks",
      "Regulatory & compliance setup",
      "Board advisory support",
    ],
    gradient: "from-[#1a2a0a] to-[#2a3f10]",
    lightBg: "bg-[#eef4e8]",
  },
  {
    id: "payroll",
    number: "06",
    title: "Payroll & Bookkeeping",
    tagline: "Precise. On time. Every month.",
    desc: "Let our team handle day-to-day financial operations while you focus on growth. We manage everything from payroll processing to monthly reconciliations, AP/AR, and statutory filings.",
    features: [
      "Monthly payroll processing",
      "Provident fund & gratuity management",
      "Bank reconciliation",
      "Accounts payable & receivable",
      "Monthly close & reporting",
      "Statutory deduction filings",
    ],
    gradient: "from-[#1a1040] to-[#251850]",
    lightBg: "bg-[#eeeaf8]",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Initial Consultation",
    desc: "A complimentary session with a senior partner to understand your business, challenges, and goals — no obligation.",
  },
  {
    step: "02",
    title: "Scope & Proposal",
    desc: "We define the engagement scope, timeline, and fee structure — clearly and transparently, with no hidden costs.",
  },
  {
    step: "03",
    title: "Execution",
    desc: "Our specialist team gets to work, keeping you informed at every milestone with regular progress updates.",
  },
  {
    step: "04",
    title: "Delivery & Review",
    desc: "Final deliverables are reviewed together. We walk you through findings, recommendations, and next steps.",
  },
  {
    step: "05",
    title: "Ongoing Support",
    desc: "We remain available post-engagement. Most clients transition into long-term retainer relationships.",
  },
];

const INDUSTRIES = [
  "Readymade Garments (RMG)",
  "Financial Services & Banking",
  "Fast-Moving Consumer Goods",
  "Real Estate & Construction",
  "Pharmaceuticals & Healthcare",
  "NGOs & Development Sector",
  "Manufacturing & Engineering",
  "Technology & Startups",
  "Hospitality & F&B",
  "Import, Export & Trading",
];

const TESTIMONIALS = [
  {
    quote: "Their tax advisory saved us significant costs on our restructuring. Deeply knowledgeable about local law and always one step ahead.",
    name: "Roksana Islam",
    role: "CEO, Pioneer Pharma Group",
    initials: "RI",
    bg: "bg-[#14352a]",
  },
  {
    quote: "The M&A due diligence was thorough and delivered on time. We closed with complete confidence in the numbers Hargrove & Partners provided.",
    name: "James Thornton",
    role: "Managing Director, Delta Ventures",
    initials: "JT",
    bg: "bg-[#2d1e4a]",
  },
  {
    quote: "Their audit team is meticulous and responsive. We've worked with them for eight years and the quality has never wavered.",
    name: "Farhan Kabir",
    role: "CFO, Apex Garments Ltd.",
    initials: "FK",
    bg: "bg-[#0f2044]",
  },
];

// ─── HOOKS ─────────────────────────────────────────────────────────────────

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
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
    <p className={`text-[11px] uppercase tracking-[0.2em] font-['Outfit'] font-medium mb-3 ${light ? "text-[#d4aa6e]" : "text-[#b8924a]"
      }`}>
      {children}
    </p>
  );
}

// ─── HERO ──────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative bg-[#0a1830] overflow-hidden pt-16">
      {/* Diagonal grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg,#b8924a 0,#b8924a 1px,transparent 0,transparent 50%)",
          backgroundSize: "30px 30px",
        }}
      />
      {/* Glow orb */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[#b8924a]/04 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-8 pt-20 pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">

          {/* Left */}
          <div className="pb-20">
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-10 bg-[#b8924a]" />
              <span className="font-['Outfit'] text-[11px] uppercase tracking-[0.2em] text-[#b8924a] font-medium">
                What We Do
              </span>
            </div>
            <h1 className="font-['Cormorant_Garamond'] text-6xl font-semibold text-white leading-[1.05] mb-6">
              Services Built<br />
              for <em className="text-[#b8924a] not-italic">Business</em><br />
              Reality
            </h1>
            <p className="font-['Outfit'] font-light text-white/50 text-base leading-[1.9] max-w-md">
              Six practice areas, one seamless team. Every engagement is partner-led,
              every deliverable is held to the same uncompromising standard.
            </p>
          </div>

          {/* Right — service quick-nav tabs */}
          <div className="pb-0 self-end">
            <div className="border-t border-l border-r border-white/10">
              {SERVICES.map(({ number, title, id }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="flex items-center justify-between px-6 py-4 border-b border-white/08 group hover:bg-white/[0.04] transition-colors duration-200 no-underline"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-['Cormorant_Garamond'] text-lg font-bold text-[#b8924a]/35 group-hover:text-[#b8924a]/70 transition-colors duration-200 w-8">
                      {number}
                    </span>
                    <span className="font-['Cormorant_Garamond'] text-[17px] font-semibold text-white/60 group-hover:text-white transition-colors duration-200">
                      {title}
                    </span>
                  </div>
                  <svg className="w-3 h-3 text-white/20 group-hover:text-[#b8924a] transition-colors duration-200" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 6h8M7 3l3 3-3 3" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Gold bottom line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#b8924a]/50 to-transparent mt-0" />
    </section>
  );
}

// ─── INTRO STATS ───────────────────────────────────────────────────────────

function IntroStats() {
  return (
    <section className="bg-[#060f1e] py-10 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/06">
        {[
          { val: "6", lbl: "Practice Areas" },
          { val: "850+", lbl: "Engagements Completed" },
          { val: "10", lbl: "Industries Served" },
          { val: "27+", lbl: "Years of Experience" },
        ].map(({ val, lbl }) => (
          <div key={lbl} className="bg-[#060f1e] px-8 py-7 text-center">
            <span className="font-['Cormorant_Garamond'] text-4xl font-bold text-[#b8924a] block mb-1">{val}</span>
            <span className="font-['Outfit'] text-[10px] uppercase tracking-[0.16em] text-white/28 block">{lbl}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── SERVICE DETAIL CARDS ──────────────────────────────────────────────────

function ServiceCard({ service, index }) {
  const [open, setOpen] = useState(false);
  const isEven = index % 2 === 0;
  const [ref, inView] = useInView(0.1);

  return (
    <div
      ref={ref}
      id={service.id}
      className={`transition-all duration-700 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <div
        className={`grid grid-cols-1 lg:grid-cols-12 border border-[#0a1830]/10 overflow-hidden group hover:border-[#b8924a]/30 hover:shadow-xl hover:shadow-[#0a1830]/06 transition-all duration-400 ${isEven ? "" : ""
          }`}
      >
        {/* Number + icon column */}
        <div className={`lg:col-span-2 bg-gradient-to-br ${service.gradient} flex flex-col items-center justify-center p-8 min-h-[180px]`}>
          <span className="font-['Cormorant_Garamond'] text-5xl font-bold text-white/20 block mb-2">
            {service.number}
          </span>
          <div className="w-px h-8 bg-white/20" />
        </div>

        {/* Content column */}
        <div className="lg:col-span-7 p-8 lg:p-10 bg-white">
          <p className="font-['Outfit'] text-[11px] uppercase tracking-[0.16em] text-[#b8924a] font-medium mb-2">
            {service.tagline}
          </p>
          <h3 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-[#0a1830] mb-4">
            {service.title}
          </h3>
          <p className="font-['Outfit'] font-light text-[14px] text-[#5a6072] leading-[1.85] mb-6">
            {service.desc}
          </p>

          {/* Toggle features */}
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 font-['Outfit'] text-[11px] uppercase tracking-[0.14em] text-[#0a1830]/50 hover:text-[#b8924a] transition-colors duration-200"
          >
            <span className={`w-5 h-5 border border-current flex items-center justify-center text-sm transition-transform duration-300 ${open ? "rotate-45" : ""}`}>
              +
            </span>
            {open ? "Hide details" : "What's included"}
          </button>

          {/* Features list */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-out ${open ? "max-h-64 mt-6" : "max-h-0"
              }`}
          >
            <div className={`${service.lightBg} p-6 border-l-2 border-[#b8924a]`}>
              <div className="grid grid-cols-2 gap-3">
                {service.features.map((f) => (
                  <div key={f} className="flex items-center gap-2.5">
                    <span className="w-1 h-1 rounded-full bg-[#b8924a] shrink-0" />
                    <span className="font-['Outfit'] font-light text-[13px] text-[#0a1830]/70">
                      {f}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA column */}
        <div className="lg:col-span-3 bg-[#f8f5ef] flex flex-col items-start justify-between p-8 border-l border-[#0a1830]/06">
          <div>
            <p className="font-['Outfit'] text-[10px] uppercase tracking-[0.16em] text-[#0a1830]/35 mb-4">
              Ready to get started?
            </p>
            <p className="font-['Outfit'] font-light text-[13px] text-[#5a6072] leading-relaxed">
              Book a free 30-minute consultation with one of our senior partners.
            </p>
          </div>
          <button className="mt-8 flex items-center gap-2 bg-[#0a1830] text-white font-['Outfit'] text-[11px] uppercase tracking-[0.12em] font-medium px-5 py-3 group-hover:bg-[#b8924a] group-hover:text-[#0a1830] transition-all duration-300">
            Enquire
            <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 6h8M7 3l3 3-3 3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function ServiceCards() {
  return (
    <section className="bg-[#f8f5ef] py-28 px-8">
      <div className="max-w-7xl mx-auto">
        <FadeUp className="mb-14">
          <SectionLabel>Our Practice Areas</SectionLabel>
          <h2 className="font-['Cormorant_Garamond'] text-5xl font-semibold text-[#0a1830]">
            Six Ways We Serve You
          </h2>
          <p className="font-['Outfit'] font-light text-[#5a6072] text-[15px] mt-3 max-w-xl leading-relaxed">
            Click any service to expand and see exactly what's included. Every engagement is partner-led from day one.
          </p>
        </FadeUp>

        <div className="flex flex-col gap-4">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PROCESS ───────────────────────────────────────────────────────────────

function Process() {
  return (
    <section className="bg-[#0a1830] py-28 px-8 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg,#b8924a 0,#b8924a 1px,transparent 0,transparent 50%)",
          backgroundSize: "30px 30px",
        }}
      />
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">

        {/* Left header — sticky on desktop */}
        <div className="lg:col-span-4">
          <FadeUp>
            <SectionLabel light>How We Work</SectionLabel>
            <h2 className="font-['Cormorant_Garamond'] text-5xl font-semibold text-white leading-snug mb-6">
              Our Engagement Process
            </h2>
            <p className="font-['Outfit'] font-light text-white/40 text-[14px] leading-[1.9]">
              Every engagement follows a proven five-step process — transparent,
              structured, and designed around your timeline and objectives.
            </p>
            <div className="mt-10 flex items-center gap-4">
              <span className="h-px flex-1 bg-[#b8924a]/25" />
              <span className="font-['Cormorant_Garamond'] text-[#b8924a] text-xl">H&P</span>
              <span className="h-px flex-1 bg-[#b8924a]/25" />
            </div>
          </FadeUp>
        </div>

        {/* Right — steps */}
        <div className="lg:col-span-8">
          <div className="relative pl-12">
            {/* Vertical line */}
            <div className="absolute left-5 top-2 bottom-2 w-px bg-[#b8924a]/15" />

            <div className="flex flex-col gap-0">
              {PROCESS.map(({ step, title, desc }, i) => (
                <FadeUp key={step} delay={i * 100}>
                  <div className="relative flex gap-8 pb-10 last:pb-0 group">
                    {/* Dot on line */}
                    <div className="absolute -left-12 top-3 w-4 h-4 rounded-full border-2 border-[#b8924a]/40 bg-[#0a1830] group-hover:border-[#b8924a] group-hover:bg-[#b8924a]/10 transition-all duration-300 z-10" />

                    {/* Content */}
                    <div className="flex-1 border-b border-white/06 pb-10 last:border-0 group-hover:border-[#b8924a]/15 transition-colors duration-300">
                      <div className="flex items-start gap-6 mb-3">
                        <span className="font-['Cormorant_Garamond'] text-4xl font-bold text-[#b8924a]/20 group-hover:text-[#b8924a]/50 transition-colors duration-300 leading-none shrink-0">
                          {step}
                        </span>
                        <h4 className="font-['Cormorant_Garamond'] text-2xl font-semibold text-white pt-1">
                          {title}
                        </h4>
                      </div>
                      <p className="font-['Outfit'] font-light text-[13px] text-white/40 leading-relaxed max-w-lg pl-16">
                        {desc}
                      </p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── INDUSTRIES ────────────────────────────────────────────────────────────

function Industries() {
  const [ref, inView] = useInView();
  return (
    <section ref={ref} className="bg-white py-28 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

        {/* Left */}
        <div className={`transition-all duration-700 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
          <SectionLabel>Sector Experience</SectionLabel>
          <h2 className="font-['Cormorant_Garamond'] text-5xl font-semibold text-[#0a1830] leading-snug mb-6">
            Deep Roots Across<br />Bangladesh's Economy
          </h2>
          <p className="font-['Outfit'] font-light text-[#5a6072] text-[15px] leading-[1.9] mb-8">
            Our team has served clients across every major sector of the Bangladesh
            economy. Industry-specific knowledge means we understand the regulatory
            nuances, reporting requirements, and pressures unique to your business.
          </p>
          <button className="flex items-center gap-3 bg-[#0a1830] text-white font-['Outfit'] text-[11px] uppercase tracking-[0.14em] font-medium px-8 py-4 hover:bg-[#1a3460] transition-colors duration-200">
            Talk to a Sector Specialist
            <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 6h8M7 3l3 3-3 3" />
            </svg>
          </button>
        </div>

        {/* Right — tags */}
        <div
          className={`transition-all duration-700 delay-150 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
        >
          <div className="flex flex-wrap gap-3">
            {INDUSTRIES.map((industry, i) => (
              <div
                key={industry}
                className="flex items-center gap-2.5 border border-[#0a1830]/10 px-4 py-2.5 cursor-default hover:border-[#b8924a]/50 hover:bg-[#f8f5ef] transition-all duration-300 group"
                style={{ transitionDelay: `${i * 35}ms` }}
              >
                <span className="w-1 h-1 rounded-full bg-[#b8924a] group-hover:scale-150 transition-transform duration-200" />
                <span className="font-['Outfit'] text-[13px] text-[#0a1830] font-light">
                  {industry}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ──────────────────────────────────────────────────────────

function Testimonials() {
  return (
    <section className="bg-[#f8f5ef] py-28 px-8 border-t border-[#0a1830]/06">
      <div className="max-w-7xl mx-auto">
        <FadeUp className="text-center mb-14">
          <SectionLabel>Client Voices</SectionLabel>
          <h2 className="font-['Cormorant_Garamond'] text-5xl font-semibold text-[#0a1830]">
            What Our Clients Say
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map(({ quote, name, role, initials, bg }, i) => (
            <FadeUp key={name} delay={i * 100}>
              <div className="bg-white border border-[#0a1830]/07 p-8 flex flex-col gap-5 hover:border-[#b8924a]/30 hover:shadow-lg hover:shadow-[#0a1830]/05 transition-all duration-300">
                <span className="font-['Cormorant_Garamond'] text-5xl text-[#b8924a]/35 leading-none">
                  "
                </span>
                <p className="font-['Outfit'] font-light text-[14px] text-[#5a6072] leading-[1.85] flex-1">
                  {quote}
                </p>
                <div className="pt-5 border-t border-[#0a1830]/06 flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full ${bg} flex items-center justify-center shrink-0`}>
                    <span className="font-['Cormorant_Garamond'] text-[13px] font-bold text-white">
                      {initials}
                    </span>
                  </div>
                  <div>
                    <p className="font-['Cormorant_Garamond'] text-[15px] font-semibold text-[#0a1830]">
                      {name}
                    </p>
                    <p className="font-['Outfit'] text-[10px] uppercase tracking-widest text-[#b8924a] mt-0.5">
                      {role}
                    </p>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ───────────────────────────────────────────────────────────────────

function CTA() {
  return (
    <section className="relative bg-[#b8924a] py-24 px-8 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg,#0a1830 0,#0a1830 1px,transparent 0,transparent 50%)",
          backgroundSize: "22px 22px",
        }}
      />
      {/* Corner accents */}
      <div className="absolute top-5 left-5 w-14 h-14 border-l-2 border-t-2 border-[#0a1830]/14" />
      <div className="absolute bottom-5 right-5 w-14 h-14 border-r-2 border-b-2 border-[#0a1830]/14" />

      <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
        <div>
          <p className="font-['Outfit'] text-[11px] uppercase tracking-[0.2em] text-[#0a1830]/45 mb-4">
            Not Sure Where to Start?
          </p>
          <h2 className="font-['Cormorant_Garamond'] text-5xl font-semibold text-[#0a1830] mb-3 leading-tight">
            Let's Find the Right<br />Service for You
          </h2>
          <p className="font-['Outfit'] font-light text-[#0a1830]/58 text-base max-w-lg leading-relaxed">
            Book a free 30-minute consultation with a senior partner. We'll listen,
            advise, and recommend the right engagement — no commitment required.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 shrink-0">
          <button className="group flex items-center gap-3 bg-[#0a1830] text-white font-['Outfit'] text-[11px] uppercase tracking-[0.14em] font-medium px-9 py-4 hover:bg-[#1a3460] transition-colors duration-200">
            Book Free Consultation
            <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 6h8M7 3l3 3-3 3" />
            </svg>
          </button>
          <button className="border-2 border-[#0a1830]/28 text-[#0a1830] font-['Outfit'] text-[11px] uppercase tracking-[0.14em] font-light px-9 py-4 hover:border-[#0a1830] transition-colors duration-200">
            Download Brochure
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── PAGE EXPORT ───────────────────────────────────────────────────────────
const Services = () => {
  return (
    <div className="font-['Outfit'] antialiased overflow-x-hidden">
      <Hero />
      <IntroStats />
      <ServiceCards />
      <Process />
      <Industries />
      <Testimonials />
      <CTA />
    </div>
  );
}

export default Services