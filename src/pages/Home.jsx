
import { useState, useEffect, useRef } from "react";

// ─── DATA ──────────────────────────────────────────────────────────────────

const TRUST_ITEMS = [
  "ICAB Registered Firm",
  "ACCA Approved Employer",
  "ISO 27001 Certified",
  "NBR Approved Tax Counsel",
  "27 Years of Practice",
  "850+ Clients Served",
];

const SERVICE_PREVIEWS = [
  {
    number: "01",
    title: "Audit & Assurance",
    desc: "Statutory, internal, and compliance audits conducted with rigorous methodology and full regulatory alignment.",
    href: "/services/audit",
    gradient: "from-[#0f2044] to-[#1a3460]",
  },
  {
    number: "02",
    title: "Tax Advisory",
    desc: "Corporate tax, VAT, and cross-border structuring designed to keep you compliant and minimise liability.",
    href: "/services/tax",
    gradient: "from-[#14352a] to-[#1e4a3a]",
  },
  {
    number: "03",
    title: "M&A Advisory",
    desc: "Financial due diligence, valuation, and deal structuring for confident transactions at every stage.",
    href: "/services/advisory",
    gradient: "from-[#2d1e4a] to-[#3d2a60]",
  },
  {
    number: "04",
    title: "Financial Reporting",
    desc: "IFRS-compliant statements, consolidation, and board-level financial packs delivered on your timeline.",
    href: "/services/reporting",
    gradient: "from-[#3a1f14] to-[#4a2d1e]",
  },
];

const STATS = [
  { value: "27+", label: "Years of Excellence", suffix: "" },
  { value: "850", label: "Clients Served", suffix: "+" },
  { value: "40", label: "Expert Professionals", suffix: "+" },
  { value: "98", label: "Client Retention Rate", suffix: "%" },
];

const WHY_POINTS = [
  {
    icon: "shield",
    title: "Regulatory Mastery",
    desc: "Deep fluency in NBR, BSEC, and ICAB regulations — compliance is never guesswork with our team.",
  },
  {
    icon: "users",
    title: "Partner-Led Engagements",
    desc: "Every client is assigned a senior partner who remains your single point of contact throughout.",
  },
  {
    icon: "chart",
    title: "Real-Time Reporting",
    desc: "Cloud portals and live dashboards give you complete visibility into your financials at any moment.",
  },
  {
    icon: "lock",
    title: "Total Confidentiality",
    desc: "Your data is protected under strict protocols aligned with international security standards.",
  },
  {
    icon: "star",
    title: "Award-Winning Practice",
    desc: "Named Bangladesh's Top 10 Accounting Firm — recognised for quality, ethics, and client satisfaction.",
  },
  {
    icon: "clock",
    title: "Rapid Turnaround",
    desc: "Streamlined workflows and dedicated support ensure every deliverable arrives on time.",
  },
];

const TESTIMONIALS = [
  {
    quote: "Hargrove & Partners transformed how we think about financial reporting. Their audit team is meticulous, responsive, and genuinely invested in our success.",
    name: "Farhan Kabir",
    role: "CFO, Apex Garments Ltd.",
    initials: "FK",
    bg: "bg-[#0f2044]",
  },
  {
    quote: "Their tax advisory unlocked significant savings during our corporate restructuring. Deeply knowledgeable, incredibly professional, and always ahead of deadline.",
    name: "Roksana Islam",
    role: "CEO, Pioneer Pharma Group",
    initials: "RI",
    bg: "bg-[#14352a]",
  },
  {
    quote: "The due diligence work was thorough and delivered with precision. We closed a complex M&A transaction with full confidence in the numbers.",
    name: "James Thornton",
    role: "Managing Director, Delta Ventures",
    initials: "JT",
    bg: "bg-[#2d1e4a]",
  },
];

const ICON_PATHS = {
  shield: "M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2zm-1 13l-3-3 1.41-1.41L11 12.17l4.59-4.58L17 9l-6 6z",
  users: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z",
  chart: "M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99l1.5 1.5z",
  lock: "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z",
  star: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z",
  clock: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 12 2zm.01 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z",
};

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

function useCountUp(target, inView, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return count;
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
    <p className={`text-[11px] uppercase tracking-[0.2em] font-['Outfit'] font-medium mb-3 ${light ? "text-[#d4aa6e]" : "text-[#b8924a]"}`}>
      {children}
    </p>
  );
}

function GoldDivider() {
  return <div className="h-px `bg-gradient-to-r` from-transparent via-[#b8924a]/50 to-transparent" />;
}

// ─── HERO ──────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative min-h-screen bg-[#0a1830] flex flex-col justify-center overflow-hidden pt-16">
      {/* Background diagonal pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg,#b8924a 0,#b8924a 1px,transparent 0,transparent 50%)",
          backgroundSize: "30px 30px",
        }}
      />
      {/* Ambient orb left */}
      <div className="absolute -left-32 top-1/4 w-[500px] h-[500px] rounded-full bg-[#b8924a]/04 blur-[100px] pointer-events-none" />
      {/* Ambient orb right */}
      <div className="absolute right-0 bottom-1/4 w-[400px] h-[400px] rounded-full bg-[#1a3460]/60 blur-[80px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-8 w-full py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* ── Left column ── */}
          <div className="lg:col-span-7">
            {/* Eyebrow */}
            <div
              className="inline-flex items-center gap-3 mb-10 opacity-0 animate-[fadeIn_0.6s_0.1s_ease_forwards]"
              style={{ animation: "fadeUp 0.7s 0.1s ease forwards" }}
            >
              <span className="h-px w-10 bg-[#b8924a]" />
              <span className="font-['Outfit'] text-[11px] uppercase tracking-[0.2em] text-[#b8924a] font-medium">
                Est. 1997 · Dhaka, Bangladesh
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-['Cormorant_Garamond'] text-6xl lg:text-7xl font-semibold text-white leading-[1.05] mb-8"
              style={{ animation: "fadeUp 0.7s 0.2s ease forwards", opacity: 0 }}
            >
              Financial
              <br />
              <span className="text-[#b8924a]">Clarity</span>
              <br />
              You Can Build On.
            </h1>

            {/* Sub */}
            <p
              className="font-['Outfit'] font-light text-white/50 text-lg leading-[1.85] max-w-lg mb-12"
              style={{ animation: "fadeUp 0.7s 0.35s ease forwards", opacity: 0 }}
            >
              Hargrove & Partners is Bangladesh's trusted chartered accounting
              and advisory firm. From audit and tax to M&A — we deliver the
              financial precision your business deserves.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-wrap gap-4 mb-16"
              style={{ animation: "fadeUp 0.7s 0.45s ease forwards", opacity: 0 }}
            >
              <button className="group flex items-center gap-3 bg-[#b8924a] text-[#0a1830] font-['Outfit'] text-[11px] uppercase tracking-[0.14em] font-medium px-8 py-4 hover:bg-[#d4aa6e] transition-colors duration-200">
                Book a Consultation
                <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 7h10M8 3l4 4-4 4" />
                </svg>
              </button>
              <button className="flex items-center gap-3 border border-white/20 text-white font-['Outfit'] text-[11px] uppercase tracking-[0.14em] font-light px-8 py-4 hover:border-white/50 transition-colors duration-200">
                Explore Our Services
              </button>
            </div>

            {/* Trust micro-badges */}
            <div
              className="flex flex-wrap gap-3"
              style={{ animation: "fadeUp 0.7s 0.55s ease forwards", opacity: 0 }}
            >
              {["ICAB Registered", "ISO 27001", "ACCA Approved", "NBR Counsel"].map((badge) => (
                <span
                  key={badge}
                  className="font-['Outfit'] text-[10px] uppercase tracking-[0.14em] border border-white/12 text-white/35 px-3 py-1.5"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* ── Right column — floating card stack ── */}
          <div
            className="lg:col-span-5 hidden lg:flex flex-col gap-3"
            style={{ animation: "fadeUp 0.8s 0.4s ease forwards", opacity: 0 }}
          >
            {/* Main feature card */}
            <div className="border border-white/10 bg-white/3 p-8 backdrop-blur-sm">
              <p className="font-['Outfit'] text-[10px] uppercase tracking-[0.18em] text-[#b8924a] mb-6">
                Why Businesses Choose Us
              </p>
              <div className="flex flex-col gap-5">
                {[
                  { num: "27+", txt: "Years serving Bangladesh's leading enterprises" },
                  { num: "850+", txt: "Active clients across 10 industries" },
                  { num: "98%", txt: "Client retention over a five-year period" },
                ].map(({ num, txt }) => (
                  <div key={num} className="flex items-center gap-5 pb-5 border-b border-white/07 last:border-0 last:pb-0">
                    <span className="font-['Cormorant_Garamond'] text-3xl font-bold text-[#b8924a] shrink-0 w-16">
                      {num}
                    </span>
                    <p className="font-['Outfit'] font-light text-[13px] text-white/45 leading-relaxed">
                      {txt}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mini cards row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="border border-white/10 bg-white/[0.03] p-5 flex flex-col gap-2">
                <span className="font-['Outfit'] text-[10px] uppercase tracking-widest text-[#b8924a]">Practice Areas</span>
                <span className="font-['Cormorant_Garamond'] text-3xl font-bold text-white">6</span>
                <span className="font-['Outfit'] font-light text-[11px] text-white/35">Audit · Tax · Advisory · Reporting · Consulting · Payroll</span>
              </div>
              <div className="border border-white/10 bg-white/[0.03] p-5 flex flex-col gap-2">
                <span className="font-['Outfit'] text-[10px] uppercase tracking-widest text-[#b8924a]">Recognition</span>
                <span className="font-['Cormorant_Garamond'] text-2xl font-bold text-white leading-tight">Top 10</span>
                <span className="font-['Outfit'] font-light text-[11px] text-white/35">Accounting Firm — The Daily Star 2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <GoldDivider />

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

// ─── TRUST BAR ─────────────────────────────────────────────────────────────

function TrustBar() {
  return (
    <section className="bg-[#060f1e] py-5 px-8 border-b border-white/05">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
        {TRUST_ITEMS.map((item) => (
          <div key={item} className="flex items-center gap-2.5">
            <span className="w-1 h-1 rounded-full bg-[#b8924a]" />
            <span className="font-['Outfit'] text-[11px] uppercase tracking-[0.14em] text-white/28">
              {item}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── SERVICES PREVIEW ──────────────────────────────────────────────────────

function ServicesPreview() {
  const [hovered, setHovered] = useState(null);
  return (
    <section className="bg-[#f8f5ef] py-28 px-8">
      <div className="max-w-7xl mx-auto">

        <FadeUp className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <SectionLabel>Our Practice Areas</SectionLabel>
            <h2 className="font-['Cormorant_Garamond'] text-5xl font-semibold text-[#0a1830] leading-snug">
              Six Ways We Serve<br />Your Business
            </h2>
          </div>
          <a
            href="/services"
            className="inline-flex items-center gap-2 font-['Outfit'] text-[11px] uppercase tracking-[0.14em] text-[#b8924a] no-underline hover:gap-4 transition-all duration-200 shrink-0 mb-1"
          >
            View all services
            <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 6h8M7 3l3 3-3 3" />
            </svg>
          </a>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICE_PREVIEWS.map(({ number, title, desc, href, gradient }, i) => (
            <FadeUp key={title} delay={i * 80}>
              <a
                href={href}
                className="block no-underline group"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div
                  className={`relative border overflow-hidden transition-all duration-300 h-full ${hovered === i
                      ? "border-[#b8924a]/50 shadow-xl shadow-[#0a1830]/10 -translate-y-1"
                      : "border-[#0a1830]/10 bg-white"
                    }`}
                >
                  {/* Top gradient bar */}
                  <div className={`h-1 bg-gradient-to-r ${gradient}`} />

                  <div className="p-7">
                    {/* Number */}
                    <span className="font-['Cormorant_Garamond'] text-4xl font-bold text-[#b8924a]/15 block mb-5 group-hover:text-[#b8924a]/35 transition-colors duration-300">
                      {number}
                    </span>
                    <h3 className="font-['Cormorant_Garamond'] text-xl font-semibold text-[#0a1830] mb-3">
                      {title}
                    </h3>
                    <p className="font-['Outfit'] font-light text-[13px] text-[#5a6072] leading-relaxed mb-6">
                      {desc}
                    </p>
                    {/* Arrow link */}
                    <div className="flex items-center gap-2 font-['Outfit'] text-[11px] uppercase tracking-[0.12em] text-[#b8924a]">
                      Learn more
                      <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 6h8M7 3l3 3-3 3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            </FadeUp>
          ))}
        </div>

        {/* Bottom card — Payroll & Consulting */}
        <FadeUp delay={400}>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { number: "05", title: "Business Consulting", desc: "Strategy, CFO-as-a-service, internal controls, and KPI frameworks to scale your operations." },
              { number: "06", title: "Payroll & Bookkeeping", desc: "End-to-end payroll, reconciliations, AP/AR, and monthly close — precise and on time, every time." },
            ].map(({ number, title, desc }, i) => (
              <a
                key={title}
                href="/services"
                className="block no-underline group border border-[#0a1830]/10 bg-white p-6 flex items-start gap-5 hover:border-[#b8924a]/40 hover:shadow-md transition-all duration-300"
              >
                <span className="font-['Cormorant_Garamond'] text-3xl font-bold text-[#b8924a]/18 shrink-0 group-hover:text-[#b8924a]/40 transition-colors duration-300">
                  {number}
                </span>
                <div>
                  <h3 className="font-['Cormorant_Garamond'] text-lg font-semibold text-[#0a1830] mb-1.5">
                    {title}
                  </h3>
                  <p className="font-['Outfit'] font-light text-[13px] text-[#5a6072] leading-relaxed">
                    {desc}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── STATS COUNTER ─────────────────────────────────────────────────────────

function StatItem({ value, label, suffix }) {
  const [ref, inView] = useInView(0.3);
  const numericVal = parseInt(value.replace(/\D/g, ""), 10);
  const count = useCountUp(numericVal, inView);
  return (
    <div ref={ref} className="text-center px-6 py-10 border-r border-white/07 last:border-0">
      <span className="font-['Cormorant_Garamond'] text-6xl font-bold text-[#b8924a] block mb-2">
        {count}{suffix}
      </span>
      <span className="font-['Outfit'] text-[11px] uppercase tracking-[0.16em] text-white/35 block">
        {label}
      </span>
    </div>
  );
}

function StatsSection() {
  return (
    <section className="bg-[#0a1830] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg,#b8924a 0,#b8924a 1px,transparent 0,transparent 50%)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-8 grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 divide-white/07">
        {STATS.map(({ value, label, suffix }) => (
          <StatItem key={label} value={value} label={label} suffix={suffix} />
        ))}
      </div>
    </section>
  );
}

// ─── WHY US ────────────────────────────────────────────────────────────────

function WhyUs() {
  return (
    <section className="bg-white py-28 px-8">
      <div className="max-w-7xl mx-auto">
        <FadeUp className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end mb-16">
          <div>
            <SectionLabel>Why Hargrove & Partners</SectionLabel>
            <h2 className="font-['Cormorant_Garamond'] text-5xl font-semibold text-[#0a1830] leading-snug">
              The Standard Others<br />Are Measured Against
            </h2>
          </div>
          <p className="font-['Outfit'] font-light text-[#5a6072] text-[15px] leading-[1.9]">
            In a market full of generalists, we are specialists — every partner, every engagement,
            every deliverable held to the same uncompromising standard that has kept 98% of our
            clients with us for five years or more.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {WHY_POINTS.map(({ icon, title, desc }, i) => (
            <FadeUp key={title} delay={i * 70}>
              <div className="group p-7 border border-[#0a1830]/08 hover:border-[#b8924a]/40 hover:shadow-lg hover:shadow-[#b8924a]/04 transition-all duration-300 relative overflow-hidden">
                {/* Icon */}
                <div className="w-10 h-10 bg-[#0a1830] flex items-center justify-center mb-5 group-hover:bg-[#b8924a] transition-colors duration-300">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#b8924a] group-hover:fill-[#0a1830] transition-colors duration-300">
                    <path d={ICON_PATHS[icon]} />
                  </svg>
                </div>
                <h4 className="font-['Cormorant_Garamond'] text-xl font-semibold text-[#0a1830] mb-2">
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

// ─── ABOUT STRIP ───────────────────────────────────────────────────────────

function AboutStrip() {
  const [ref, inView] = useInView();
  return (
    <section ref={ref} className="bg-[#f8f5ef] py-28 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

        {/* Left */}
        <div className={`transition-all duration-700 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
          <SectionLabel>About the Firm</SectionLabel>
          <h2 className="font-['Cormorant_Garamond'] text-5xl font-semibold text-[#0a1830] leading-snug mb-7">
            Two Decades of Trust,<br />One Standard of Excellence
          </h2>
          <p className="font-['Outfit'] font-light text-[#5a6072] text-[15px] leading-[1.9] mb-5">
            Founded in Dhaka in 1997, Hargrove & Partners has grown from a boutique
            accounting practice into one of Bangladesh's most respected financial
            advisory firms — without ever compromising on the values that built us.
          </p>
          <p className="font-['Outfit'] font-light text-[#5a6072] text-[15px] leading-[1.9] mb-10">
            Today our team of 40+ chartered accountants, tax specialists, and
            financial advisors serve enterprises across ten industries, from the
            largest RMG manufacturers to emerging technology startups.
          </p>
          <a
            href="/about"
            className="inline-flex items-center gap-3 bg-[#0a1830] text-white font-['Outfit'] text-[11px] uppercase tracking-[0.14em] font-medium px-8 py-4 no-underline hover:bg-[#1a3460] transition-colors duration-200"
          >
            Meet the Team
            <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 6h8M7 3l3 3-3 3" />
            </svg>
          </a>
        </div>

        {/* Right — partner cards */}
        <div
          className={`grid grid-cols-2 gap-4 transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
        >
          {[
            { initials: "RH", name: "Richard Hargrove", role: "Managing Partner", creds: "FCA · ICAB Fellow", bg: "from-[#0f2044] to-[#1a3460]" },
            { initials: "SA", name: "Sadia Ahmed", role: "Tax Partner", creds: "ACCA · CTA", bg: "from-[#14352a] to-[#1e4a3a]" },
            { initials: "MR", name: "Marcus Reid", role: "Audit Director", creds: "ACA · CIA", bg: "from-[#3a1f14] to-[#4a2d1e]" },
            { initials: "NC", name: "Nadia Chowdhury", role: "Advisory Lead", creds: "MBA · CFA", bg: "from-[#1e1440] to-[#2d1e4a]" },
          ].map(({ initials, name, role, creds, bg }) => (
            <div key={name} className="border border-[#0a1830]/10 overflow-hidden group hover:shadow-lg hover:shadow-[#0a1830]/08 hover:-translate-y-1 transition-all duration-300">
              <div className={`bg-gradient-to-br ${bg} aspect-square flex items-center justify-center relative`}>
                <span className="font-['Cormorant_Garamond'] text-3xl font-bold text-white/85">
                  {initials}
                </span>
                <span className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-[#b8924a]/40" />
              </div>
              <div className="p-4 bg-white">
                <p className="font-['Cormorant_Garamond'] text-[15px] font-semibold text-[#0a1830]">{name}</p>
                <p className="font-['Outfit'] text-[10px] uppercase tracking-widest text-[#b8924a] mt-0.5">{role}</p>
                <p className="font-['Outfit'] text-[10px] text-[#5a6072]/60 mt-1">{creds}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ──────────────────────────────────────────────────────────

function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-[#0a1830] py-28 px-8 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg,#b8924a 0,#b8924a 1px,transparent 0,transparent 50%)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative max-w-7xl mx-auto">
        <FadeUp className="text-center mb-16">
          <SectionLabel light>Client Voices</SectionLabel>
          <h2 className="font-['Cormorant_Garamond'] text-5xl font-semibold text-white">
            Trusted by Bangladesh's Leading Enterprises
          </h2>
        </FadeUp>

        {/* Testimonial display */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <span className="font-['Cormorant_Garamond'] text-7xl text-[#b8924a]/30 block leading-none mb-4">"</span>
          <p className="font-['Cormorant_Garamond'] text-2xl font-medium text-white/80 leading-[1.7] mb-8 italic">
            {TESTIMONIALS[active].quote}
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className={`w-10 h-10 rounded-full ${TESTIMONIALS[active].bg} flex items-center justify-center`}>
              <span className="font-['Cormorant_Garamond'] text-sm font-bold text-white">
                {TESTIMONIALS[active].initials}
              </span>
            </div>
            <div className="text-left">
              <p className="font-['Cormorant_Garamond'] text-[16px] font-semibold text-white">
                {TESTIMONIALS[active].name}
              </p>
              <p className="font-['Outfit'] text-[11px] uppercase tracking-widest text-[#b8924a]">
                {TESTIMONIALS[active].role}
              </p>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-3">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`transition-all duration-300 ${i === active
                  ? "w-8 h-1.5 bg-[#b8924a]"
                  : "w-1.5 h-1.5 rounded-full bg-white/20 hover:bg-white/40"
                }`}
            />
          ))}
        </div>

        {/* Client strip */}
        <div className="mt-16 pt-10 border-t border-white/08 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {["Apex Garments Ltd.", "Pioneer Pharma Group", "Delta Ventures", "Summit Industries", "Galaxy FMCG", "NordBank BD"].map((client) => (
            <span key={client} className="font-['Outfit'] text-[11px] uppercase tracking-[0.14em] text-white/22 hover:text-white/50 transition-colors duration-200 cursor-default">
              {client}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA BANNER ────────────────────────────────────────────────────────────

function CTABanner() {
  return (
    <section className="relative bg-[#b8924a] py-24 px-8 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg,#0a1830 0,#0a1830 1px,transparent 0,transparent 50%)",
          backgroundSize: "22px 22px",
        }}
      />
      {/* Decorative corner lines */}
      <div className="absolute top-6 left-6 w-16 h-16 border-l-2 border-t-2 border-[#0a1830]/15" />
      <div className="absolute bottom-6 right-6 w-16 h-16 border-r-2 border-b-2 border-[#0a1830]/15" />

      <div className="relative max-w-7xl mx-auto text-center">
        <FadeUp>
          <p className="font-['Outfit'] text-[11px] uppercase tracking-[0.2em] text-[#0a1830]/50 mb-5">
            Get Started Today
          </p>
          <h2 className="font-['Cormorant_Garamond'] text-6xl font-semibold text-[#0a1830] mb-5 leading-tight">
            Let's Build Your Financial Future
          </h2>
          <p className="font-['Outfit'] font-light text-[#0a1830]/60 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Book a complimentary 30-minute consultation with one of our senior partners.
            No commitment — just clarity on how we can help your business thrive.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button className="group flex items-center gap-3 bg-[#0a1830] text-white font-['Outfit'] text-[11px] uppercase tracking-[0.14em] font-medium px-10 py-4 hover:bg-[#1a3460] transition-colors duration-200">
              Book a Free Consultation
              <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 7h10M8 3l4 4-4 4" />
              </svg>
            </button>
            <button className="font-['Outfit'] text-[11px] uppercase tracking-[0.14em] text-[#0a1830] border-2 border-[#0a1830]/28 px-10 py-4 hover:border-[#0a1830] transition-colors duration-200">
              View Our Services
            </button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── PAGE EXPORT ───────────────────────────────────────────────────────────

const Home = () => {
  return (
    <div className="font-['Outfit'] antialiased overflow-x-hidden">
      <Hero />
      <TrustBar />
      <ServicesPreview />
      <StatsSection />
      <WhyUs />
      <AboutStrip />
      <Testimonials />
      <CTABanner />
    </div>
  );
}

export default Home