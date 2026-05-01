// pages/ContactPage.jsx
// Full Contact Page — Hero, Contact Form, Office Info, Map Placeholder, FAQ
// Design system: Cormorant Garamond + Outfit | Navy #0a1830 | Gold #b8924a
// Requires Tailwind CSS + Google Fonts in index.html:
// <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Outfit:wght@300;400;500&display=swap" rel="stylesheet" />

import { useState, useEffect, useRef } from "react";

// ─── DATA ──────────────────────────────────────────────────────────────────

const OFFICES = [
  {
    city: "Dhaka",
    label: "Head Office",
    address: "Suite 1204, Motijheel C/A\nDhaka 1000, Bangladesh",
    phone: "+880 2 9551234",
    email: "dhaka@hargroveandpartners.com",
    hours: "Sun – Thu: 9:00 AM – 6:00 PM",
    primary: true,
  },
  {
    city: "Chittagong",
    label: "Regional Office",
    address: "3rd Floor, Agrabad C/A\nChittagong 4100, Bangladesh",
    phone: "+880 31 716543",
    email: "ctg@hargroveandpartners.com",
    hours: "Sun – Thu: 9:00 AM – 5:30 PM",
    primary: false,
  },
];

const SERVICES_LIST = [
  "Audit & Assurance",
  "Tax Advisory",
  "Financial Reporting",
  "M&A Advisory",
  "Business Consulting",
  "Payroll & Bookkeeping",
  "Other / Not Sure",
];

const FAQS = [
  {
    q: "How quickly will I hear back after submitting the form?",
    a: "We respond to all enquiries within one business day. For urgent matters, please call our Dhaka office directly.",
  },
  {
    q: "Is the initial consultation truly free?",
    a: "Yes — the 30-minute introductory call with a senior partner carries no fee and no obligation. It's simply a chance for us to understand your needs.",
  },
  {
    q: "Can I meet in person at your offices?",
    a: "Absolutely. Both our Dhaka and Chittagong offices welcome in-person meetings. Please book in advance so we can ensure a senior partner is available.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes. We regularly advise multinational enterprises operating in Bangladesh and Bangladeshi businesses with cross-border structures. Our team has extensive experience with international regulatory frameworks.",
  },
  {
    q: "How are your fees structured?",
    a: "Fees depend on the scope and complexity of each engagement. After the initial consultation we provide a transparent, fixed-fee proposal — no surprises.",
  },
];

const CONTACT_ICONS = {
  location: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
  phone: "M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z",
  email: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
  clock: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm.01 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z",
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

// ─── SHARED UI ─────────────────────────────────────────────────────────────

function FadeUp({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ children, light = false }) {
  return (
    <p className={`text-[11px] uppercase tracking-[0.2em] font-['Outfit'] font-medium mb-3 ${
      light ? "text-[#d4aa6e]" : "text-[#b8924a]"
    }`}>
      {children}
    </p>
  );
}

// ─── HERO ──────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative bg-[#0a1830] pt-16 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg,#b8924a 0,#b8924a 1px,transparent 0,transparent 50%)",
          backgroundSize: "30px 30px",
        }}
      />
      <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[#b8924a]/[0.03] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-8 py-20">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-8">
            <span className="h-px w-10 bg-[#b8924a]" />
            <span className="font-['Outfit'] text-[11px] uppercase tracking-[0.2em] text-[#b8924a] font-medium">
              Get In Touch
            </span>
          </div>
          <h1 className="font-['Cormorant_Garamond'] text-6xl font-semibold text-white leading-[1.05] mb-6">
            Let's Start a<br />
            <em className="text-[#b8924a] not-italic">Conversation</em>
          </h1>
          <p className="font-['Outfit'] font-light text-white/50 text-base leading-[1.9] max-w-lg">
            Whether you have a specific engagement in mind or simply want to
            explore how we can help, we'd love to hear from you. All enquiries
            are responded to within one business day.
          </p>
        </div>

        {/* Quick contact strip */}
        <div className="mt-14 flex flex-wrap gap-8 pb-16">
          {[
            { icon: CONTACT_ICONS.phone, text: "+880 2 9551234" },
            { icon: CONTACT_ICONS.email, text: "info@hargroveandpartners.com" },
            { icon: CONTACT_ICONS.clock, text: "Sun – Thu, 9:00 AM – 6:00 PM" },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-3">
              <div className="w-8 h-8 border border-[#b8924a]/30 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-[#b8924a]">
                  <path d={icon} />
                </svg>
              </div>
              <span className="font-['Outfit'] font-light text-[13px] text-white/45">{text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-[#b8924a]/50 to-transparent" />
    </section>
  );
}

// ─── CONTACT FORM + INFO ────────────────────────────────────────────────────

function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", company: "", email: "",
    phone: "", service: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeOffice, setActiveOffice] = useState(0);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const office = OFFICES[activeOffice];

  return (
    <section className="bg-[#f8f5ef] py-0 px-0">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12">

        {/* ── Left — Form ── */}
        <div className="lg:col-span-7 px-8 lg:px-16 py-20 bg-white border-r border-[#0a1830]/06">
          <FadeUp>
            <SectionLabel>Send Us a Message</SectionLabel>
            <h2 className="font-['Cormorant_Garamond'] text-4xl font-semibold text-[#0a1830] mb-2">
              Book a Consultation
            </h2>
            <p className="font-['Outfit'] font-light text-[#5a6072] text-[14px] mb-10 leading-relaxed">
              Fill in the form and a senior partner will be in touch within one business day.
            </p>
          </FadeUp>

          {submitted ? (
            <FadeUp>
              <div className="border border-[#b8924a]/30 bg-[#f8f5ef] p-10 text-center">
                <div className="w-14 h-14 bg-[#0a1830] flex items-center justify-center mx-auto mb-5">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#b8924a]">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </div>
                <h3 className="font-['Cormorant_Garamond'] text-2xl font-semibold text-[#0a1830] mb-3">
                  Message Received
                </h3>
                <p className="font-['Outfit'] font-light text-[#5a6072] text-[14px] leading-relaxed max-w-sm mx-auto">
                  Thank you for reaching out. A member of our team will contact you within one business day.
                </p>
              </div>
            </FadeUp>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name row */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "firstName", label: "First Name", placeholder: "Richard" },
                  { name: "lastName", label: "Last Name", placeholder: "Hargrove" },
                ].map(({ name, label, placeholder }) => (
                  <div key={name}>
                    <label className="block font-['Outfit'] text-[10px] uppercase tracking-[0.14em] text-[#0a1830]/50 mb-2">
                      {label} <span className="text-[#b8924a]">*</span>
                    </label>
                    <input
                      type="text"
                      name={name}
                      required
                      placeholder={placeholder}
                      value={formData[name]}
                      onChange={handleChange}
                      className="w-full border border-[#0a1830]/12 bg-[#f8f5ef] px-4 py-3 font-['Outfit'] font-light text-[13px] text-[#0a1830] placeholder:text-[#0a1830]/25 focus:outline-none focus:border-[#b8924a]/60 focus:bg-white transition-all duration-200"
                    />
                  </div>
                ))}
              </div>

              {/* Company + Email */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-['Outfit'] text-[10px] uppercase tracking-[0.14em] text-[#0a1830]/50 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    placeholder="Your Company Ltd."
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full border border-[#0a1830]/12 bg-[#f8f5ef] px-4 py-3 font-['Outfit'] font-light text-[13px] text-[#0a1830] placeholder:text-[#0a1830]/25 focus:outline-none focus:border-[#b8924a]/60 focus:bg-white transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block font-['Outfit'] text-[10px] uppercase tracking-[0.14em] text-[#0a1830]/50 mb-2">
                    Email Address <span className="text-[#b8924a]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-[#0a1830]/12 bg-[#f8f5ef] px-4 py-3 font-['Outfit'] font-light text-[13px] text-[#0a1830] placeholder:text-[#0a1830]/25 focus:outline-none focus:border-[#b8924a]/60 focus:bg-white transition-all duration-200"
                  />
                </div>
              </div>

              {/* Phone + Service */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-['Outfit'] text-[10px] uppercase tracking-[0.14em] text-[#0a1830]/50 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+880 17 xxxxxxxx"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-[#0a1830]/12 bg-[#f8f5ef] px-4 py-3 font-['Outfit'] font-light text-[13px] text-[#0a1830] placeholder:text-[#0a1830]/25 focus:outline-none focus:border-[#b8924a]/60 focus:bg-white transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block font-['Outfit'] text-[10px] uppercase tracking-[0.14em] text-[#0a1830]/50 mb-2">
                    Service of Interest <span className="text-[#b8924a]">*</span>
                  </label>
                  <select
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full border border-[#0a1830]/12 bg-[#f8f5ef] px-4 py-3 font-['Outfit'] font-light text-[13px] text-[#0a1830] focus:outline-none focus:border-[#b8924a]/60 focus:bg-white transition-all duration-200 appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select a service…</option>
                    {SERVICES_LIST.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block font-['Outfit'] text-[10px] uppercase tracking-[0.14em] text-[#0a1830]/50 mb-2">
                  Your Message <span className="text-[#b8924a]">*</span>
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell us about your business and what you'd like help with…"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border border-[#0a1830]/12 bg-[#f8f5ef] px-4 py-3 font-['Outfit'] font-light text-[13px] text-[#0a1830] placeholder:text-[#0a1830]/25 focus:outline-none focus:border-[#b8924a]/60 focus:bg-white transition-all duration-200 resize-none"
                />
              </div>

              {/* Submit */}
              <div className="flex items-center justify-between pt-2">
                <p className="font-['Outfit'] font-light text-[12px] text-[#0a1830]/35">
                  <span className="text-[#b8924a]">*</span> Required fields
                </p>
                <button
                  type="submit"
                  className="group flex items-center gap-3 bg-[#0a1830] text-white font-['Outfit'] text-[11px] uppercase tracking-[0.14em] font-medium px-8 py-4 hover:bg-[#b8924a] hover:text-[#0a1830] transition-all duration-300"
                >
                  Send Message
                  <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 6h8M7 3l3 3-3 3" />
                  </svg>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* ── Right — Office Info ── */}
        <div className="lg:col-span-5 bg-[#0a1830] px-8 lg:px-12 py-20 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: "repeating-linear-gradient(45deg,#b8924a 0,#b8924a 1px,transparent 0,transparent 50%)",
              backgroundSize: "28px 28px",
            }}
          />

          <div className="relative">
            <FadeUp>
              <SectionLabel light>Our Offices</SectionLabel>
              <h2 className="font-['Cormorant_Garamond'] text-4xl font-semibold text-white mb-8">
                Find Us
              </h2>
            </FadeUp>

            {/* Office switcher */}
            <div className="flex gap-2 mb-8">
              {OFFICES.map((o, i) => (
                <button
                  key={o.city}
                  onClick={() => setActiveOffice(i)}
                  className={`font-['Outfit'] text-[11px] uppercase tracking-[0.14em] px-4 py-2 border transition-all duration-200 ${
                    activeOffice === i
                      ? "bg-[#b8924a] text-[#0a1830] border-[#b8924a] font-medium"
                      : "bg-transparent text-white/40 border-white/15 hover:border-white/40 hover:text-white/70"
                  }`}
                >
                  {o.city}
                </button>
              ))}
            </div>

            {/* Active office details */}
            <FadeUp key={activeOffice}>
              <div className="mb-8">
                <span className="font-['Outfit'] text-[10px] uppercase tracking-[0.16em] text-[#b8924a] font-medium mb-6 block">
                  {office.label}
                </span>

                <div className="flex flex-col gap-5">
                  {[
                    { icon: CONTACT_ICONS.location, text: office.address },
                    { icon: CONTACT_ICONS.phone, text: office.phone },
                    { icon: CONTACT_ICONS.email, text: office.email },
                    { icon: CONTACT_ICONS.clock, text: office.hours },
                  ].map(({ icon, text }) => (
                    <div key={text} className="flex items-start gap-4 group">
                      <div className="w-9 h-9 border border-[#b8924a]/25 flex items-center justify-center shrink-0 mt-0.5 group-hover:border-[#b8924a]/60 transition-colors duration-200">
                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#b8924a]">
                          <path d={icon} />
                        </svg>
                      </div>
                      <span className="font-['Outfit'] font-light text-[13px] text-white/45 leading-relaxed whitespace-pre-line">
                        {text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="relative border border-white/10 overflow-hidden h-40 mb-8 group cursor-pointer">
                <div
                  className="absolute inset-0 opacity-[0.08]"
                  style={{
                    backgroundImage: "repeating-linear-gradient(0deg,#b8924a 0,#b8924a 1px,transparent 0,transparent 24px),repeating-linear-gradient(90deg,#b8924a 0,#b8924a 1px,transparent 0,transparent 24px)",
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-10 h-10 border-2 border-[#b8924a]/50 rounded-full flex items-center justify-center mb-2">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#b8924a]">
                      <path d={CONTACT_ICONS.location} />
                    </svg>
                  </div>
                  <span className="font-['Outfit'] text-[11px] uppercase tracking-[0.14em] text-white/35">
                    {office.city} Office
                  </span>
                  <span className="font-['Outfit'] text-[10px] text-white/20 mt-1">
                    Click to open in Google Maps
                  </span>
                </div>
                <div className="absolute inset-0 bg-[#b8924a]/0 group-hover:bg-[#b8924a]/05 transition-colors duration-300" />
              </div>
            </FadeUp>

            {/* Direct call CTA */}
            <div className="border-t border-white/08 pt-8">
              <p className="font-['Outfit'] text-[11px] uppercase tracking-[0.14em] text-white/25 mb-3">
                Prefer to call?
              </p>
              <a
                href={`tel:${office.phone}`}
                className="font-['Cormorant_Garamond'] text-2xl font-semibold text-[#b8924a] no-underline hover:text-[#d4aa6e] transition-colors duration-200 block"
              >
                {office.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ───────────────────────────────────────────────────────────────────

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="bg-white py-28 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">

        {/* Left label */}
        <FadeUp className="lg:col-span-4">
          <SectionLabel>Questions & Answers</SectionLabel>
          <h2 className="font-['Cormorant_Garamond'] text-5xl font-semibold text-[#0a1830] leading-snug mb-6">
            Frequently<br />Asked Questions
          </h2>
          <p className="font-['Outfit'] font-light text-[#5a6072] text-[14px] leading-[1.9]">
            Can't find what you're looking for? Call us or send a message
            and we'll get back to you within one business day.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <span className="h-px flex-1 bg-[#b8924a]/25" />
            <span className="font-['Cormorant_Garamond'] text-[#b8924a] text-xl">H&P</span>
            <span className="h-px flex-1 bg-[#b8924a]/25" />
          </div>
        </FadeUp>

        {/* Right — accordion */}
        <div className="lg:col-span-8 flex flex-col">
          {FAQS.map(({ q, a }, i) => (
            <FadeUp key={i} delay={i * 60}>
              <div className={`border-b transition-colors duration-200 ${openIndex === i ? "border-[#b8924a]/30" : "border-[#0a1830]/08"}`}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-start justify-between gap-6 py-6 text-left group"
                >
                  <span className={`font-['Cormorant_Garamond'] text-[19px] font-semibold leading-snug transition-colors duration-200 ${
                    openIndex === i ? "text-[#b8924a]" : "text-[#0a1830] group-hover:text-[#b8924a]"
                  }`}>
                    {q}
                  </span>
                  <span
                    className={`w-7 h-7 border flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300 ${
                      openIndex === i
                        ? "border-[#b8924a] text-[#b8924a] rotate-45"
                        : "border-[#0a1830]/20 text-[#0a1830]/40 group-hover:border-[#b8924a]/50 group-hover:text-[#b8924a]"
                    }`}
                  >
                    <span className="text-lg leading-none">+</span>
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-400 ease-out ${
                    openIndex === i ? "max-h-40 pb-6" : "max-h-0"
                  }`}
                >
                  <p className="font-['Outfit'] font-light text-[14px] text-[#5a6072] leading-[1.85] pr-12">
                    {a}
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

// ─── BOTTOM CTA ────────────────────────────────────────────────────────────

function BottomCTA() {
  return (
    <section className="relative bg-[#b8924a] py-20 px-8 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg,#0a1830 0,#0a1830 1px,transparent 0,transparent 50%)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="absolute top-5 left-5 w-12 h-12 border-l-2 border-t-2 border-[#0a1830]/13" />
      <div className="absolute bottom-5 right-5 w-12 h-12 border-r-2 border-b-2 border-[#0a1830]/13" />

      <FadeUp>
        <div className="relative max-w-7xl mx-auto text-center">
          <p className="font-['Outfit'] text-[11px] uppercase tracking-[0.2em] text-[#0a1830]/45 mb-5">
            We'd Love to Hear From You
          </p>
          <h2 className="font-['Cormorant_Garamond'] text-5xl font-semibold text-[#0a1830] mb-4 leading-tight">
            Your First Step Costs Nothing
          </h2>
          <p className="font-['Outfit'] font-light text-[#0a1830]/58 text-base max-w-xl mx-auto mb-10 leading-relaxed">
            A 30-minute call with one of our senior partners — no commitment,
            no fees, just honest advice on how we can help.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button className="group flex items-center gap-3 bg-[#0a1830] text-white font-['Outfit'] text-[11px] uppercase tracking-[0.14em] font-medium px-10 py-4 hover:bg-[#1a3460] transition-colors duration-200">
              Book a Free Call
              <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 6h8M7 3l3 3-3 3" />
              </svg>
            </button>
            <a
              href="mailto:info@hargroveandpartners.com"
              className="font-['Outfit'] text-[11px] uppercase tracking-[0.14em] text-[#0a1830] border-2 border-[#0a1830]/28 px-10 py-4 no-underline hover:border-[#0a1830] transition-colors duration-200"
            >
              Email Us Directly
            </a>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}

// ─── PAGE EXPORT ───────────────────────────────────────────────────────────
const Contact = () => {
  return (
    <div className="font-['Outfit'] antialiased overflow-x-hidden">
      <Hero />
      <ContactSection />
      <FAQ />
      <BottomCTA />
    </div>
  );
}

export default Contact