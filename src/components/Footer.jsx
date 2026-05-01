import React from 'react'

// const Footer = () => {
//   return (
//     <div>
//           <div className='flex justify-center items-center bg-gray-600 p-3 text-2xl text-white/80'>
//               <p className=''></p>
//       </div>
//     </div>
//   )
// }

// components/Footer.jsx
// Full footer with links, contact info, social icons, and copyright
// Requires Tailwind CSS + Google Fonts (Cormorant Garamond + Outfit)

const FOOTER_LINKS = {
    Services: [
        { label: "Audit & Assurance", href: "/services/audit" },
        { label: "Tax Advisory", href: "/services/tax" },
        { label: "Financial Reporting", href: "/services/reporting" },
        { label: "M&A Advisory", href: "/services/advisory" },
        { label: "Business Consulting", href: "/services/consulting" },
    ],
    Company: [
        { label: "About Us", href: "/about" },
        { label: "Our Team", href: "/about#team" },
        { label: "Careers", href: "/careers" },
        { label: "Insights", href: "/insights" },
        { label: "Contact", href: "/contact" },
    ],
    Legal: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Cookie Policy", href: "/cookies" },
        { label: "Disclaimer", href: "/disclaimer" },
    ],
};

const CONTACT = [
    {
        icon: (
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        ),
        text: "64 Broadway, Stratford, London, England, E15 1NT",
    },
    {
        icon: (
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
        ),
        text: "+44 202 454566",
    },
    {
        icon: (
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        ),
        text: "info@hargroveandpartners.com",
    },
];

const SOCIALS = [
    {
        label: "LinkedIn",
        href: "#",
        icon: (
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        ),
    },
    {
        label: "Twitter",
        href: "#",
        icon: (
            <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
        ),
    },
    {
        label: "Facebook",
        href: "#",
        icon: (
            <path d="M17 2h-3a5 5 0 0 0-5 5v3H6v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        ),
    },
];

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#060f1e] text-white">

            {/* ── Top Section ── */}
            <div className="max-w-7xl mx-auto px-8 pt-16 pb-12 grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-white/08">

                {/* Brand column */}
                <div className="lg:col-span-4">
                    <a
                        href="/"
                        className="inline-block font-['Cormorant_Garamond'] text-[22px] font-semibold text-white no-underline mb-4"
                    >
                        Hargrove{" "}
                        <span className="text-[#b8924a]">&</span>{" "}
                        Partners
                    </a>
                    <p className="font-['Outfit'] font-light text-[13px] text-white/40 leading-[1.85] mb-8 max-w-xs">
                        Chartered accountants and financial advisors serving businesses
                        across Bangladesh and South Asia since 1997.
                    </p>

                    {/* Contact items */}
                    <div className="flex flex-col gap-4">
                        {CONTACT.map(({ icon, text }) => (
                            <div key={text} className="flex items-start gap-3">
                                <svg
                                    viewBox="0 0 24 24"
                                    className="w-4 h-4 fill-[#b8924a] shrink-0 mt-0.5"
                                >
                                    {icon}
                                </svg>
                                <span className="font-['Outfit'] font-light text-[12px] text-white/40 leading-relaxed">
                                    {text}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Links columns */}
                <div className="lg:col-span-5 grid grid-cols-3 gap-8">
                    {Object.entries(FOOTER_LINKS).map(([group, links]) => (
                        <div key={group}>
                            <h4 className="font-['Outfit'] text-[10px] uppercase tracking-[0.2em] text-white/30 font-medium mb-5">
                                {group}
                            </h4>
                            <ul className="flex flex-col gap-3 list-none">
                                {links.map(({ label, href }) => (
                                    <li key={label}>
                                        <a
                                            href={href}
                                            className="font-['Outfit'] font-light text-[13px] text-white/45 no-underline hover:text-[#b8924a] transition-colors duration-200"
                                        >
                                            {label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Newsletter column */}
                <div className="lg:col-span-3">
                    <h4 className="font-['Outfit'] text-[10px] uppercase tracking-[0.2em] text-white/30 font-medium mb-5">
                        Stay Informed
                    </h4>
                    <p className="font-['Outfit'] font-light text-[13px] text-white/40 leading-relaxed mb-5">
                        Subscribe for regulatory updates, tax insights, and firm news.
                    </p>
                    <div className="flex flex-col gap-2">
                        <input
                            type="email"
                            placeholder="your@email.com"
                            className="bg-white/05 border border-white/10 text-white text-[12px] font-['Outfit'] font-light px-4 py-2.5 placeholder:text-white/25 focus:outline-none focus:border-[#b8924a]/60 transition-colors duration-200"
                        />
                        <button className="bg-[#b8924a] text-[#0a1830] font-['Outfit'] text-[10px] uppercase tracking-[0.16em] font-medium py-2.5 hover:bg-[#d4aa6e] transition-colors duration-200">
                            Subscribe
                        </button>
                    </div>

                    {/* Socials */}
                    <div className="flex gap-4 mt-8">
                        {SOCIALS.map(({ label, href, icon }) => (
                            <a
                                key={label}
                                href={href}
                                aria-label={label}
                                className="w-9 h-9 border border-white/10 flex items-center justify-center hover:border-[#b8924a]/50 hover:bg-[#b8924a]/10 transition-all duration-200 group"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    className="w-4 h-4 fill-white/35 group-hover:fill-[#b8924a] transition-colors duration-200"
                                >
                                    {icon}
                                </svg>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Bottom Bar ── */}
            <div className="max-w-7xl mx-auto px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="font-['Outfit'] text-[11px] text-white/20">
                    © {currentYear} Hargrove & Partners. All rights reserved.
                    {" · "}Chartered Accountants & Advisors · Dhaka, Bangladesh
                </p>
                <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#b8924a]/60" />
                    <span className="font-['Outfit'] text-[10px] uppercase tracking-[0.14em] text-white/20">
                        ICAB Registered · ACCA Approved Employer
                    </span>
                </div>
            </div>
        </footer>
    );
}

export default Footer
