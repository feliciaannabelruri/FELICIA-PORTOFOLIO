import { useState, useEffect, useRef } from "react";

// ─── ICONS ────────────────────────────────────────────────────────────────────
const Icon = ({ d, size = 16, color = "currentColor", strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    {Array.isArray(d) ? d.map((path, i) => <path key={i} d={path} />) : <path d={d} />}
  </svg>
);

const Icons = {
  zap:        "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  building:   ["M3 21h18","M3 7v14","M21 7v14","M3 7l9-4 9 4","M9 21v-6h6v6"],
  monitor:    ["M2 3h20v14H2z","M8 21h8","M12 17v4"],
  calendar:   ["M3 4h18v18H3z","M16 2v4","M8 2v4","M3 10h18"],
  trending:   "M22 7l-8.5 8.5-5-5L2 17",
  play:       "M5 3l14 9-14 9V3z",
  check:      "M20 6L9 17l-5-5",
  star:       "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  award:      ["M12 15a7 7 0 100-14 7 7 0 000 14z","M8.21 13.89L7 23l5-3 5 3-1.21-9.12"],
  target:     ["M22 12A10 10 0 1112 2","M22 12a10 10 0 01-10 10","M15 12a3 3 0 11-6 0 3 3 0 016 0"],
  users:      ["M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2","M23 21v-2a4 4 0 00-3-3.87","M9 7a4 4 0 100 8 4 4 0 000-8z","M16 3.13a4 4 0 010 7.75"],
  megaphone:  ["M3 11l19-9-9 19-2-8-8-2z"],
  video:      ["M23 7l-7 5 7 5V7z","M1 5h15v14H1z"],
  link2:      ["M15 7h3a5 5 0 010 10h-3","M9 17H6A5 5 0 016 7h3","M8 12h8"],
  code:       ["M16 18l6-6-6-6","M8 6l-6 6 6 6"],
  briefcase:  ["M20 7H4a2 2 0 00-2 2v11a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z","M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"],
  mail:       ["M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z","M22 6l-10 7L2 6"],
  phone:      "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.15 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012.07 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.55a16 16 0 006.72 6.72l1.06-.43a2 2 0 012.11.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z",
  linkedin:   ["M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z","M2 9h4v12H2z","M4 6a2 2 0 100-4 2 2 0 000 4z"],
  mappin:     ["M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z","M12 13a3 3 0 100-6 3 3 0 000 6z"],
  plus:       "M12 5v14M5 12h14",
  minus:      "M5 12h14",
  arrowUpRight: "M7 17L17 7M7 7h10v10",
  lock:       ["M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2z","M7 11V7a5 5 0 0110 0v4"],
  radio:      ["M2 12A10 10 0 1022 12","M2 12a10 10 0 0020 0","M12 8v8","M8 12h8"],
  handshake:  ["M20.42 4.58a5.4 5.4 0 00-7.65 0l-.77.78-.77-.78a5.4 5.4 0 00-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"],
  cpu:        ["M9 3H5a2 2 0 00-2 2v4","M15 3h4a2 2 0 012 2v4","M9 21H5a2 2 0 01-2-2v-4","M15 21h4a2 2 0 002-2v-4","M9 9h6v6H9z"],
  sparkles:   ["M12 3v1m0 16v1M4.22 4.22l.7.7m12.16 12.16l.7.7M3 12H2m20 0h-1M4.22 19.78l.7-.7M18.36 5.64l.7-.7"],
  flag:       ["M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z","M4 22v-7"],
  folder:     ["M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"],
  globe:      ["M12 2a10 10 0 100 20A10 10 0 0012 2z","M2 12h20","M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"],
  x:          ["M18 6L6 18","M6 6l12 12"],
  externalLink: ["M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6","M15 3h6v6","M10 14L21 3"],
  chevronLeft:  "M15 18l-6-6 6-6",
  chevronRight: "M9 18l6-6-6-6",
};

const C = {
  bg: "#0f0f0f",
  surface: "rgba(255,255,255,0.06)",
  surfaceHover: "rgba(255,255,255,0.10)",
  border: "rgba(255,255,255,0.12)",
  borderHover: "rgba(255,60,190,0.4)",
  accent: "#ff3cbe",
  purple: "#b03cff",
  blue: "#3c9eff",
  green: "#3cff7a",
  orange: "#ff8c3c",
  red: "#ff3c3c",
  text: "#ffffff",
  textSub: "rgba(255,255,255,0.75)",
  textMuted: "rgba(255,255,255,0.45)",
  textDim: "rgba(255,255,255,0.20)",
};

const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #0f0f0f; color: #ffffff; font-family: 'DM Sans', sans-serif; font-weight: 300; line-height: 1.6; overflow-x: hidden; }
  body::before { content:''; position:fixed; inset:0; background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.025) 2px,rgba(0,0,0,0.025) 4px); pointer-events:none; z-index:9999; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #111; }
  ::-webkit-scrollbar-thumb { background: #ff3cbe; border-radius: 2px; }
  @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(255,60,190,.5)} 70%{box-shadow:0 0 0 8px rgba(255,60,190,0)} }
  @keyframes floatBadge { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
  @keyframes fadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
  @keyframes modalIn { from{opacity:0;transform:scale(0.95) translateY(20px)} to{opacity:1;transform:scale(1) translateY(0)} }
  @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
  @keyframes carouselFade { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }
`;

const mono = { fontFamily: "'DM Mono', monospace" };
const syne = { fontFamily: "'Syne', sans-serif" };
const dmSans = { fontFamily: "'DM Sans', sans-serif" };

// ─── PROJECT DETAILS DATA ─────────────────────────────────────────────────────
const projectDetails = {
  'digital-marketing': {
    title: 'Digital Marketing Portfolio',
    subtitle: 'Social Media Management & Marketing Campaigns',
    color: "#ff3cbe",
    content: `
      <h4 style="color:#ff3cbe;margin:20px 0 10px 0;font-family:'Syne',sans-serif;">Current Positions (2025 - Present):</h4>
      <div style="margin-bottom:16px;padding:14px 16px;border-left:2px solid #ff3cbe;background:rgba(255,60,190,0.05);border-radius:8px;">
        <strong style="color:#fff;">GENIUS GROWTH AI</strong> – Marketing Director (Head of Sales & Marketing)
        <ul style="margin-left:20px;margin-top:8px;color:rgba(255,255,255,0.7);font-size:13px;">
          <li>Spearheaded full-cycle marketing and sales operations — <strong style="color:#ff3cbe;">400+ early sign-ups</strong> in first month</li>
          <li>Led ad campaigns generating <strong style="color:#ff3cbe;">3.2× increase in leads</strong> and <strong style="color:#ff3cbe;">56% engagement uplift</strong></li>
          <li>Directed creative production reaching <strong style="color:#ff3cbe;">10K+ organic views</strong></li>
          <li>Secured <strong style="color:#ff3cbe;">5 B2B partnerships</strong> through presentations and pitch decks</li>
          <li>Managed cross-functional team of 5, improved sales response time by <strong style="color:#ff3cbe;">37%</strong></li>
        </ul>
      </div>
      <div style="margin-bottom:16px;padding:14px 16px;border-left:2px solid #ff3cbe;background:rgba(255,60,190,0.05);border-radius:8px;">
        <strong style="color:#fff;">WINOSA MITRA</strong> – Social Media Marketing Specialist (Part-Time)
        <ul style="margin-left:20px;margin-top:8px;color:rgba(255,255,255,0.7);font-size:13px;">
          <li>Designed content strategies increasing <strong style="color:#ff3cbe;">B2B inquiries by 62%</strong></li>
          <li>Managed video campaigns viewed by <strong style="color:#ff3cbe;">15K+ audiences</strong></li>
          <li>Developed paid ad funnels reducing acquisition cost by <strong style="color:#ff3cbe;">28%</strong>, improved CTR by <strong style="color:#ff3cbe;">1.7×</strong></li>
        </ul>
      </div>
      <div style="margin-bottom:16px;padding:14px 16px;border-left:2px solid #ff3cbe;background:rgba(255,60,190,0.05);border-radius:8px;">
        <strong style="color:#fff;">MOVEABROAD.CO</strong> – Digital Marketing Executive (Part-Time)
        <ul style="margin-left:20px;margin-top:8px;color:rgba(255,255,255,0.7);font-size:13px;">
          <li>Boosted Instagram reach by <strong style="color:#ff3cbe;">93%</strong> and TikTok views by <strong style="color:#ff3cbe;">30%</strong></li>
          <li>Managed 7–10 Instagram posts and 5–7 TikTok videos weekly</li>
          <li>Improved hashtag performance by <strong style="color:#ff3cbe;">40%</strong> through competitor analysis</li>
          <li>Improved post performance by <strong style="color:#ff3cbe;">35%</strong> through weekly insights</li>
        </ul>
      </div>
      <div style="margin-bottom:16px;padding:14px 16px;border-left:2px solid #ff3cbe;background:rgba(255,60,190,0.05);border-radius:8px;">
        <strong style="color:#fff;">XDEMIA</strong> – Digital Marketing Internship
        <ul style="margin-left:20px;margin-top:8px;color:rgba(255,255,255,0.7);font-size:13px;">
          <li>Created daily content resulting in <strong style="color:#ff3cbe;">35% growth in engagement rate</strong></li>
          <li>Increased audience retention by <strong style="color:#ff3cbe;">1.5×</strong></li>
          <li>Wrote SEO-driven articles generating <strong style="color:#ff3cbe;">+10% monthly impressions</strong></li>
        </ul>
      </div>
      <h4 style="color:#ff3cbe;margin:20px 0 10px 0;font-family:'Syne',sans-serif;">2024 Experience:</h4>
      <div style="margin-bottom:16px;padding:14px 16px;border-left:2px solid #ff3cbe;background:rgba(255,60,190,0.05);border-radius:8px;">
        <strong style="color:#fff;">PT. NAKAHAMA HANDAL KONSULTAMA</strong> – Social Media Specialist
        <ul style="margin-left:20px;margin-top:8px;color:rgba(255,255,255,0.7);font-size:13px;">
          <li>Increased impressions by <strong style="color:#ff3cbe;">32%</strong> within first month</li>
          <li>Built and launched website simakpajak.com with SEO integration</li>
          <li>Optimized strategies for <strong style="color:#ff3cbe;">1.6× higher CTR</strong></li>
        </ul>
      </div>
      <div style="margin-bottom:16px;padding:14px 16px;border-left:2px solid #ff3cbe;background:rgba(255,60,190,0.05);border-radius:8px;">
        <strong style="color:#fff;">PT. ACR BERSATU SEJAHTERA</strong> – Social Media Specialist
        <ul style="margin-left:20px;margin-top:8px;color:rgba(255,255,255,0.7);font-size:13px;">
          <li>Increased reach by <strong style="color:#ff3cbe;">78%</strong> and engagement by <strong style="color:#ff3cbe;">65%</strong></li>
          <li>Improved click-through rate by <strong style="color:#ff3cbe;">1.9×</strong></li>
          <li>Drove <strong style="color:#ff3cbe;">40% growth in audience retention</strong></li>
        </ul>
      </div>
      <h4 style="color:#ff3cbe;margin:20px 0 10px 0;font-family:'Syne',sans-serif;">Long-Term (2020–2023):</h4>
      <div style="margin-bottom:16px;padding:14px 16px;border-left:2px solid #ff3cbe;background:rgba(255,60,190,0.05);border-radius:8px;">
        <strong style="color:#fff;">NUGASITUDUIT</strong> – Social Media Specialist — Grew audience reach by <strong style="color:#ff3cbe;">92%</strong>, improved engagement by <strong style="color:#ff3cbe;">2.4×</strong>
      </div>
      <div style="margin-bottom:16px;padding:14px 16px;border-left:2px solid #ff3cbe;background:rgba(255,60,190,0.05);border-radius:8px;">
        <strong style="color:#fff;">CRAFTBBARO</strong> – Content Marketing — Increased followers by <strong style="color:#ff3cbe;">150%</strong>, engagement by <strong style="color:#ff3cbe;">2×</strong>, customer retention by <strong style="color:#ff3cbe;">58%</strong>
      </div>
    `
  },
  'content-creation': {
    title: 'Content Creation Portfolio',
    subtitle: 'Video Production, Writing & Creative Content',
    color: "#b03cff",
    content: `
      <h4 style="color:#b03cff;margin:20px 0 10px 0;font-family:'Syne',sans-serif;">Current Projects (2025 - Present):</h4>
      <div style="margin-bottom:16px;padding:14px 16px;border-left:2px solid #b03cff;background:rgba(176,60,255,0.05);border-radius:8px;">
        <strong style="color:#fff;">CHAMELYONE INTERIORS</strong> – Content Creator (Part-Time)
        <ul style="margin-left:20px;margin-top:8px;color:rgba(255,255,255,0.7);font-size:13px;">
          <li>Increased audience engagement by <strong style="color:#b03cff;">68%</strong> within two months</li>
          <li>Enhanced campaign visibility by <strong style="color:#b03cff;">74%</strong> through storytelling visuals</li>
          <li>Managed paid ads improving conversion by <strong style="color:#b03cff;">41%</strong>, reduced cost per result by <strong style="color:#b03cff;">22%</strong></li>
        </ul>
      </div>
      <div style="margin-bottom:16px;padding:14px 16px;border-left:2px solid #b03cff;background:rgba(176,60,255,0.05);border-radius:8px;">
        <strong style="color:#fff;">JOKI PROYEK</strong> – Content Creator (Freelance)
        <ul style="margin-left:20px;margin-top:8px;color:rgba(255,255,255,0.7);font-size:13px;">
          <li>Increased website traffic by <strong style="color:#b03cff;">78%</strong> through audience research</li>
          <li>Improved organic reach by <strong style="color:#b03cff;">2.3×</strong> with SEO-optimized copy</li>
          <li>Enhanced engagement by <strong style="color:#b03cff;">65%</strong> within 3 months</li>
          <li>Sustained <strong style="color:#b03cff;">30% MoM growth</strong> through data-driven editorial strategies</li>
        </ul>
      </div>
      <h4 style="color:#b03cff;margin:20px 0 10px 0;font-family:'Syne',sans-serif;">Late 2024 – Early 2025:</h4>
      <div style="margin-bottom:16px;padding:14px 16px;border-left:2px solid #b03cff;background:rgba(176,60,255,0.05);border-radius:8px;">
        <strong style="color:#fff;">LEARNRITHM.AI</strong> – Content Creator (Internship) — Increased viewer engagement by <strong style="color:#b03cff;">82%</strong>, improved watch time by <strong style="color:#b03cff;">1.6×</strong>
      </div>
      <div style="margin-bottom:16px;padding:14px 16px;border-left:2px solid #b03cff;background:rgba(176,60,255,0.05);border-radius:8px;">
        <strong style="color:#fff;">MONTIER DESIGN</strong> – Content Researcher — Raised engagement by <strong style="color:#b03cff;">64%</strong>, increased organic reach by <strong style="color:#b03cff;">40%</strong>
      </div>
      <div style="margin-bottom:16px;padding:14px 16px;border-left:2px solid #b03cff;background:rgba(176,60,255,0.05);border-radius:8px;">
        <strong style="color:#fff;">INDO AQUATIC TRADE</strong> – PA Internship — Boosted engagement by <strong style="color:#b03cff;">72%</strong>, increased organic traffic by <strong style="color:#b03cff;">58%</strong>, contributed to <strong style="color:#b03cff;">2.5× follower growth</strong> for CEO's personal brand
      </div>
      <h4 style="color:#b03cff;margin:20px 0 10px 0;font-family:'Syne',sans-serif;">2024:</h4>
      <div style="margin-bottom:16px;padding:14px 16px;border-left:2px solid #b03cff;background:rgba(176,60,255,0.05);border-radius:8px;">
        <strong style="color:#fff;">TILIEK CREATIVE AGENCY</strong> – Internship — Boosted client visibility by <strong style="color:#b03cff;">33%</strong>, increased engagement rates by <strong style="color:#b03cff;">20%</strong> through short-form video optimization
      </div>
    `
  },
  'live-streaming': {
    title: 'Live Streaming Portfolio',
    subtitle: 'Live Shopping Host & Operations',
    color: "#ff8c3c",
    content: `
      <h4 style="color:#ff8c3c;margin:20px 0 10px 0;font-family:'Syne',sans-serif;">Live Streaming Operations:</h4>
      <div style="margin-bottom:16px;padding:14px 16px;border-left:2px solid #ff8c3c;background:rgba(255,140,60,0.05);border-radius:8px;">
        <strong style="color:#fff;">PEGASUS NET TECHNOLOGIES</strong> – Live Streaming Operator (Full-Time)
        <ul style="margin-left:20px;margin-top:8px;color:rgba(255,255,255,0.7);font-size:13px;">
          <li>Maintained <strong style="color:#ff8c3c;">99% uptime</strong> across all broadcasts</li>
          <li>Increased real-time audience participation by <strong style="color:#ff8c3c;">60%</strong></li>
          <li>Reduced broadcast errors by <strong style="color:#ff8c3c;">40%</strong> through data analysis</li>
          <li>Achieved <strong style="color:#ff8c3c;">5K+ concurrent viewers</strong> on key sessions</li>
        </ul>
      </div>
      <h4 style="color:#ff8c3c;margin:20px 0 10px 0;font-family:'Syne',sans-serif;">Live Shopping:</h4>
      <div style="margin-bottom:16px;padding:14px 16px;border-left:2px solid #ff8c3c;background:rgba(255,140,60,0.05);border-radius:8px;">
        <strong style="color:#fff;">PT SOSIAL BERKAT KREATIF INDONESIA</strong> – Live Shopping Intern
        <ul style="margin-left:20px;margin-top:8px;color:rgba(255,255,255,0.7);font-size:13px;">
          <li>Increased viewer retention by <strong style="color:#ff8c3c;">42%</strong></li>
          <li>Drove <strong style="color:#ff8c3c;">55% rise in purchase conversion</strong></li>
          <li>Boosted live chat interactions by <strong style="color:#ff8c3c;">3×</strong></li>
        </ul>
      </div>
      <div style="margin-bottom:16px;padding:14px 16px;border-left:2px solid #ff8c3c;background:rgba(255,140,60,0.05);border-radius:8px;">
        <strong style="color:#fff;">CLOUT INDONESIA GROUP</strong> – Host Live (Freelance)
        <ul style="margin-left:20px;margin-top:8px;color:rgba(255,255,255,0.7);font-size:13px;">
          <li>Hosted daily sessions averaging <strong style="color:#ff8c3c;">5K+ viewers</strong></li>
          <li>Increased live-stream sales by <strong style="color:#ff8c3c;">112%</strong></li>
          <li>Enhanced comment participation by <strong style="color:#ff8c3c;">3×</strong></li>
          <li>Achieved brand's <strong style="color:#ff8c3c;">highest viewer retention</strong> that quarter</li>
        </ul>
      </div>
    `
  },
  'kol-management': {
    title: 'KOL Management Portfolio',
    subtitle: 'Influencer Relations & Campaign Coordination',
    color: "#3cff7a",
    content: `
      <h4 style="color:#3cff7a;margin:20px 0 10px 0;font-family:'Syne',sans-serif;">KOL Management Experience:</h4>
      <div style="margin-bottom:16px;padding:14px 16px;border-left:2px solid #3cff7a;background:rgba(60,255,122,0.05);border-radius:8px;">
        <strong style="color:#fff;">PT LANTIH ADHIP GRUP</strong> – KOL Specialist (Freelance)
        <ul style="margin-left:20px;margin-top:8px;color:rgba(255,255,255,0.7);font-size:13px;">
          <li>Built and managed influencer relationships expanding campaign reach</li>
          <li>Designed sales and collaboration plans improving ROI</li>
          <li>Analyzed KOL performance metrics to optimize partnership selection</li>
          <li>Ensured communication efficiency and consistent deliverables</li>
        </ul>
      </div>
      <div style="margin-bottom:16px;padding:14px 16px;border-left:2px solid #3cff7a;background:rgba(60,255,122,0.05);border-radius:8px;">
        <strong style="color:#fff;">PT ACR BERSATU SEJAHTERA</strong> – Marketing & KOL Specialist
        <ul style="margin-left:20px;margin-top:8px;color:rgba(255,255,255,0.7);font-size:13px;">
          <li>Created campaigns boosting impressions by <strong style="color:#3cff7a;">91%</strong></li>
          <li>Managed influencer collaborations increasing engagement by <strong style="color:#3cff7a;">70%</strong></li>
          <li>Maintained <strong style="color:#3cff7a;">100% response rate</strong> to audience inquiries</li>
        </ul>
      </div>
      <h4 style="color:#3cff7a;margin:20px 0 10px 0;font-family:'Syne',sans-serif;">Campaign Strategy:</h4>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px;">
        <div style="padding:12px 14px;background:rgba(60,255,122,0.05);border-radius:8px;border:1px solid rgba(60,255,122,0.15);">
          <strong style="color:#3cff7a;font-size:12px;">Outreach</strong>
          <ul style="margin-left:16px;margin-top:6px;color:rgba(255,255,255,0.65);font-size:12px;"><li>KOL identification & brand fit</li><li>Initial contact & pitching</li></ul>
        </div>
        <div style="padding:12px 14px;background:rgba(60,255,122,0.05);border-radius:8px;border:1px solid rgba(60,255,122,0.15);">
          <strong style="color:#3cff7a;font-size:12px;">Management</strong>
          <ul style="margin-left:16px;margin-top:6px;color:rgba(255,255,255,0.65);font-size:12px;"><li>Contract negotiation</li><li>Deliverable tracking</li></ul>
        </div>
        <div style="padding:12px 14px;background:rgba(60,255,122,0.05);border-radius:8px;border:1px solid rgba(60,255,122,0.15);">
          <strong style="color:#3cff7a;font-size:12px;">Analysis</strong>
          <ul style="margin-left:16px;margin-top:6px;color:rgba(255,255,255,0.65);font-size:12px;"><li>Engagement & ROI tracking</li><li>Performance reporting</li></ul>
        </div>
        <div style="padding:12px 14px;background:rgba(60,255,122,0.05);border-radius:8px;border:1px solid rgba(60,255,122,0.15);">
          <strong style="color:#3cff7a;font-size:12px;">Relationships</strong>
          <ul style="margin-left:16px;margin-top:6px;color:rgba(255,255,255,0.65);font-size:12px;"><li>Long-term partnerships</li><li>Brand-KOL communication</li></ul>
        </div>
      </div>
    `
  },
  'web-development': {
    title: 'Web Development Portfolio',
    subtitle: 'Website Projects & Technical Skills',
    color: "#3c9eff",
    content: `
      <h4 style="color:#3c9eff;margin:20px 0 10px 0;font-family:'Syne',sans-serif;">Website Projects:</h4>
      <div style="margin-bottom:16px;padding:14px 16px;border-left:2px solid #3c9eff;background:rgba(60,158,255,0.05);border-radius:8px;">
        <strong style="color:#fff;">simakpajak.com</strong> – PT Nakahama Handal Konsultama
        <ul style="margin-left:20px;margin-top:8px;color:rgba(255,255,255,0.7);font-size:13px;">
          <li>Built complete website for tax consultation services</li>
          <li>Integrated SEO optimization and responsive design</li>
          <li>Developed user-friendly interface for client consultations</li>
        </ul>
      </div>
      <div style="margin-bottom:16px;padding:14px 16px;border-left:2px solid #3c9eff;background:rgba(60,158,255,0.05);border-radius:8px;">
        <strong style="color:#fff;">INDO AQUATIC TRADE</strong> – Blog & Website Management
        <ul style="margin-left:20px;margin-top:8px;color:rgba(255,255,255,0.7);font-size:13px;">
          <li>Managed blog schedule (3× per week) with SEO keywords for international markets</li>
          <li>Increased organic traffic by <strong style="color:#3c9eff;">58%</strong> within two months</li>
        </ul>
      </div>
      <h4 style="color:#3c9eff;margin:20px 0 10px 0;font-family:'Syne',sans-serif;">Academic & Personal Projects:</h4>
      <div style="margin-bottom:16px;padding:14px 16px;border-left:2px solid #3c9eff;background:rgba(60,158,255,0.05);border-radius:8px;">
        <ul style="margin-left:20px;color:rgba(255,255,255,0.7);font-size:13px;">
          <li><strong style="color:#fff;">Seblak Business Website</strong> – E-commerce platform for local food business</li>
          <li><strong style="color:#fff;">The Lazzy Jannah</strong> – Game development project</li>
          <li><strong style="color:#fff;">GatherHub</strong> – Campus & community event management (Figma)</li>
          <li><strong style="color:#fff;">Melali In Bali</strong> – Bali tourism platform (Vercel)</li>
          <li><strong style="color:#fff;">Rewear</strong> – Sustainable fashion platform</li>
          <li><strong style="color:#fff;">Social Bread Inventory</strong> – Inventory management system</li>
        </ul>
      </div>
      <h4 style="color:#3c9eff;margin:20px 0 10px 0;font-family:'Syne',sans-serif;">Tech Stack:</h4>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-top:12px;">
        <div style="padding:12px 14px;background:rgba(60,158,255,0.05);border-radius:8px;border:1px solid rgba(60,158,255,0.15);">
          <strong style="color:#3c9eff;font-size:12px;">Frontend</strong>
          <ul style="margin-left:14px;margin-top:6px;color:rgba(255,255,255,0.65);font-size:12px;"><li>HTML5 / CSS3</li><li>JavaScript</li><li>React</li></ul>
        </div>
        <div style="padding:12px 14px;background:rgba(60,158,255,0.05);border-radius:8px;border:1px solid rgba(60,158,255,0.15);">
          <strong style="color:#3c9eff;font-size:12px;">Backend</strong>
          <ul style="margin-left:14px;margin-top:6px;color:rgba(255,255,255,0.65);font-size:12px;"><li>PHP / Laravel</li><li>Python</li><li>Kotlin</li></ul>
        </div>
        <div style="padding:12px 14px;background:rgba(60,158,255,0.05);border-radius:8px;border:1px solid rgba(60,158,255,0.15);">
          <strong style="color:#3c9eff;font-size:12px;">Tools</strong>
          <ul style="margin-left:14px;margin-top:6px;color:rgba(255,255,255,0.65);font-size:12px;"><li>Git / VS Code</li><li>Figma</li><li>C Programming</li></ul>
        </div>
      </div>
    `
  },
  'event-organization': {
    title: 'Event Organization Portfolio',
    subtitle: 'Campus Events & Community Activities',
    color: "#ff3c3c",
    content: `
      <h4 style="color:#ff3c3c;margin:20px 0 10px 0;font-family:'Syne',sans-serif;">Leadership Positions (2025):</h4>
      <div style="margin-bottom:16px;padding:14px 16px;border-left:2px solid #ff3c3c;background:rgba(255,60,60,0.05);border-radius:8px;">
        <strong style="color:#fff;">Coordinator, Fresh Money Division</strong> – Serah Tahunan UKM UMN 2025
        <ul style="margin-left:20px;margin-top:8px;color:rgba(255,255,255,0.7);font-size:13px;">
          <li>Led team in managing financial transactions and fundraising</li>
          <li>Supervised paid promotions, bazaars, and partnerships</li>
          <li>Developed creative fundraising ideas generating organizational income</li>
        </ul>
      </div>
      <div style="margin-bottom:16px;padding:14px 16px;border-left:2px solid #ff3c3c;background:rgba(255,60,60,0.05);border-radius:8px;">
        <strong style="color:#fff;">Public Relations Coordinator</strong> – Perkenalan Prodi Informatika UMN 2025
        <ul style="margin-left:20px;margin-top:8px;color:rgba(255,255,255,0.7);font-size:13px;">
          <li>Led PR Division for Informatics Program Introduction event</li>
          <li>Created and supervised content plans, scripts, and video production</li>
          <li>Directed team talents and coordinated full production process</li>
        </ul>
      </div>
      <div style="margin-bottom:16px;padding:14px 16px;border-left:2px solid #ff3c3c;background:rgba(255,60,60,0.05);border-radius:8px;">
        <strong style="color:#fff;">Coordinator, Fresh Money Division</strong> – Ready To Love Qorie UMN 2025
        <ul style="margin-left:20px;margin-top:8px;color:rgba(255,255,255,0.7);font-size:13px;">
          <li>Led team to achieve targeted revenue goals</li>
          <li>Supervised financial operations and bookkeeping</li>
        </ul>
      </div>
      <h4 style="color:#ff3c3c;margin:20px 0 10px 0;font-family:'Syne',sans-serif;">2024 Events:</h4>
      <div style="margin-bottom:16px;padding:14px 16px;border-left:2px solid #ff3c3c;background:rgba(255,60,60,0.05);border-radius:8px;">
        <ul style="margin-left:20px;color:rgba(255,255,255,0.7);font-size:13px;">
          <li><strong style="color:#fff;">Staff PR</strong> – Infinite UMN 2024: Copywriting and content ideas</li>
          <li><strong style="color:#fff;">Staff Fresh Money</strong> – Hansan Festival & Euforia UMN 2024: Tenant outreach and negotiations</li>
          <li><strong style="color:#fff;">Staff Content Creator</strong> – Teman Ambiss Periode 3: Scripts, video editing</li>
          <li><strong style="color:#fff;">Staff PR</strong> – UMN Technology Festival 2024: Interactive content and media partners</li>
        </ul>
      </div>
      <h4 style="color:#ff3c3c;margin:20px 0 10px 0;font-family:'Syne',sans-serif;">2023 Events & Volunteer:</h4>
      <div style="margin-bottom:16px;padding:14px 16px;border-left:2px solid #ff3c3c;background:rgba(255,60,60,0.05);border-radius:8px;">
        <ul style="margin-left:20px;color:rgba(255,255,255,0.7);font-size:13px;">
          <li><strong style="color:#fff;">Staff PR</strong> – Serah Tahunan UMN 2023: Content creation and video editing</li>
          <li><strong style="color:#fff;">Staff Fresh Money</strong> – Manifest UMN 2023: Tenant & sponsor outreach</li>
          <li><strong style="color:#fff;">Staff Creative & Design</strong> – Ultima Toys Custom Championship</li>
          <li><strong style="color:#fff;">Volunteer</strong> – Voluntrip Kampung Pemulung by KitaBisa: Programs for 20-person community</li>
        </ul>
      </div>
    `
  }
};

// ─── FEATURED PROJECT CAROUSEL ────────────────────────────────────────────────
function FeaturedProjectCarousel() {
  const [currentProject, setCurrentProject] = useState(0);
  const [imageErrors, setImageErrors] = useState({});

  const projects = [
    { id: 1, img: "/assets/lanyard/seblak.png", title: "Seblak Business", description: "Website programming for Business", link: "https://github.com/feliciaannabelruri/seb-lakweb", category: "Web Development" },
    { id: 2, img: "/assets/lanyard/thelazzyjannah.png", title: "The Lazzy Jannah", description: "Game Development", link: "https://github.com/JazeL2304/TheLazyJannah", category: "Game Development" },
    { id: 3, img: "/assets/lanyard/eventmanagement.png", title: "GatherHub", description: "Campus & Community Figma Project", link: "https://www.figma.com/proto/CN8cAiYv9ANEHwhvz1yF5z/Event-management-mobile-app?node-id=1327-503&p=f&t=TkAQyYwFSxzPCOEV-0&scaling=min-zoom&content-scaling=fixed&page-id=1327%3A454&starting-point-node-id=1327%3A503", category: "UI/UX Design" },
    { id: 4, img: "/assets/lanyard/SimakPajak.png", title: "SimakPajak", description: "Tax Consultation Website", link: "https://simakpajak.com", category: "Web Development" },
    { id: 5, img: "/assets/lanyard/MelaliInBali.png", title: "Melali In Bali", description: "Bali Tourism Platform", link: "https://melali-in-bali.vercel.app", category: "Web Development" },
    { id: 6, img: "/assets/lanyard/Rewear.png", title: "Rewear", description: "Sustainable Fashion Platform", link: "https://rewear-chi.vercel.app", category: "Web Development" },
    { id: 7, img: "/assets/lanyard/ggaisales.png", title: "Genius Growth AI Sales", description: "AI Sales Platform", link: "https://genius-growth-ai-sales.vercel.app", category: "AI Platform" },
    { id: 8, img: "/assets/lanyard/tsitp.png", title: "The Summer I Turned Pretty", description: "Unboxing Marketing Campaign TSITP Series", link: "https://the-summer-i-turned-pretty-marketin.vercel.app", category: "Marketing Campaign" },
    { id: 9, img: "/assets/lanyard/michelle.png", title: "Michelle Portfolio", description: "Making Michelle Personal Portfolio Website", link: "https://michelle-seven.vercel.app", category: "Web Development" },
    { id: 10, img: "/assets/lanyard/socialbread.png", title: "Social Bread Inventory", description: "Inventory Management System", link: "https://social-bread-inventory.vercel.app", category: "Web Development" },
    { id: 11, img: "/assets/lanyard/xdemia.png", title: "Xdemia Revamp", description: "Educational Platform Design", link: "https://www.figma.com/proto/dXb8mw5SgRNWv0s6o8c9cl/XDEMIA-REVAMP?m=draw&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&node-id=36-118&starting-point-node-id=392%3A4059&show-proto-sidebar=1", category: "UI/UX Design" },
    { id: 12, img: "/assets/lanyard/eventweb.png", title: "Web Project", description: "Event Management Mobile Website", link: "https://github.com/feliciaannabelruri/eventreg", category: "Web Development" }
  ];

  const project = projects[currentProject];
  const nextProject = () => setCurrentProject((prev) => (prev + 1) % projects.length);
  const prevProject = () => setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  const handleImageError = (projectId) => setImageErrors(prev => ({ ...prev, [projectId]: true }));

  const arrowStyle = {
    width: '48px', height: '48px', borderRadius: '50%',
    background: `rgba(255,60,190,0.1)`, border: `1px solid rgba(255,60,190,0.25)`,
    color: C.accent, fontSize: '1.25rem', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0, transition: 'all 0.25s',
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <button onClick={prevProject} style={arrowStyle}
          onMouseEnter={e => { e.currentTarget.style.background = C.accent; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'scale(1.1)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,60,190,0.1)'; e.currentTarget.style.color = C.accent; e.currentTarget.style.transform = 'scale(1)'; }}>
          ←
        </button>

        <div key={currentProject} style={{ flex: 1, background: C.surface, borderRadius: '14px', overflow: 'hidden', border: `1px solid ${C.border}`, animation: 'carouselFade 0.3s ease' }}>
          <div style={{ width: '100%', height: '260px', overflow: 'hidden', background: '#1a1a1a', position: 'relative' }}>
            {!imageErrors[project.id] ? (
              <img src={project.img} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} onError={() => handleImageError(project.id)} />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: C.textMuted, fontSize: '2.5rem' }}>
                🎨<div style={{ ...mono, fontSize: '0.875rem', marginTop: '10px' }}>{project.title}</div>
              </div>
            )}
            <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(15,15,15,0.85)', backdropFilter: 'blur(10px)', padding: '4px 12px', borderRadius: '20px', ...mono, fontSize: '0.7rem', fontWeight: 600, color: C.accent, border: `1px solid rgba(255,60,190,0.3)` }}>{project.category}</div>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,0,15,0.7) 0%, transparent 50%)' }} />
          </div>
          <div style={{ padding: '22px 26px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
            <div>
              <h4 style={{ ...syne, fontSize: '1.125rem', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>{project.title}</h4>
              <p style={{ ...dmSans, fontSize: '0.875rem', color: C.textSub }}>{project.description}</p>
            </div>
            <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 18px', background: `linear-gradient(135deg, ${C.accent}, ${C.purple})`, color: '#fff', borderRadius: '8px', ...mono, fontSize: '0.75rem', textDecoration: 'none', flexShrink: 0, transition: 'all 0.25s', boxShadow: `0 2px 14px rgba(255,60,190,0.25)` }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 4px 20px rgba(255,60,190,0.4)`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 2px 14px rgba(255,60,190,0.25)`; }}>
              VIEW →
            </a>
          </div>
        </div>

        <button onClick={nextProject} style={arrowStyle}
          onMouseEnter={e => { e.currentTarget.style.background = C.accent; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'scale(1.1)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,60,190,0.1)'; e.currentTarget.style.color = C.accent; e.currentTarget.style.transform = 'scale(1)'; }}>
          →
        </button>
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '20px', flexWrap: 'wrap' }}>
        <span style={{ ...mono, fontSize: '10px', color: C.textMuted, marginRight: '8px' }}>{currentProject + 1} / {projects.length}</span>
        {projects.map((_, i) => (
          <button key={i} onClick={() => setCurrentProject(i)} style={{ width: i === currentProject ? '28px' : '7px', height: '7px', borderRadius: '4px', background: i === currentProject ? `linear-gradient(90deg, ${C.accent}, ${C.purple})` : 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', padding: 0 }} />
        ))}
      </div>
    </div>
  );
}

// ─── PROJECT DETAIL MODAL ─────────────────────────────────────────────────────
function ProjectDetailModal({ project, onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', handleKey); document.body.style.overflow = ''; };
  }, [onClose]);

  if (!project) return null;

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)', zIndex: 9000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: '#111', border: `1px solid ${project.color}40`, borderRadius: '18px', width: '100%', maxWidth: '720px', maxHeight: '85vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', animation: 'modalIn 0.3s ease', boxShadow: `0 0 60px ${project.color}20` }}>
        {/* Header */}
        <div style={{ padding: '24px 28px', borderBottom: `1px solid rgba(255,255,255,0.08)`, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexShrink: 0, background: `linear-gradient(135deg, ${project.color}10, transparent)`, position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: project.color }} />
          <div>
            <div style={{ ...mono, fontSize: '10px', color: project.color, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '8px' }}>Project Details</div>
            <h3 style={{ ...syne, fontSize: '1.375rem', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>{project.title}</h3>
            <p style={{ ...dmSans, fontSize: '0.875rem', color: C.textMuted }}>{project.subtitle}</p>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.08)', border: `1px solid rgba(255,255,255,0.12)`, borderRadius: '8px', padding: '8px', cursor: 'pointer', color: C.textSub, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,60,60,0.2)'; e.currentTarget.style.borderColor = 'rgba(255,60,60,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}>
            <Icon d={Icons.x} size={16} color="#fff" />
          </button>
        </div>
        {/* Body */}
        <div style={{ padding: '24px 28px', overflowY: 'auto', flex: 1 }} dangerouslySetInnerHTML={{ __html: project.content }} />
      </div>
    </div>
  );
}

// ─── SUBCOMPONENTS ────────────────────────────────────────────────────────────
function XPBar({ label, value, max = 100, color = "#ff3cbe", delay = 0 }) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setAnimated(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const pct = Math.round((value / max) * 100);
  return (
    <div ref={ref} style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ ...mono, fontSize: 11, color: C.textSub, textTransform: "uppercase", letterSpacing: 2 }}>{label}</span>
        <span style={{ ...mono, fontSize: 11, color, fontWeight: 500 }}>{pct}%</span>
      </div>
      <div style={{ height: 3, background: "rgba(255,255,255,0.08)", borderRadius: 2, overflow: "hidden" }}>
        <div style={{ height: "100%", width: animated ? `${pct}%` : "0%", background: color, borderRadius: 2, transition: `width 1.2s cubic-bezier(0.4,0,0.2,1) ${delay}ms`, boxShadow: `0 0 10px ${color}90` }} />
      </div>
    </div>
  );
}

function StatBadge({ iconKey, value, label, color = C.accent }) {
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 20px", display: "flex", flexDirection: "column", gap: 8, position: "relative", overflow: "hidden", animation: "floatBadge 4s ease-in-out infinite", cursor: "default", backdropFilter: "blur(10px)" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: color }} />
      <Icon d={Icons[iconKey]} size={20} color={color} />
      <span style={{ ...syne, fontSize: 26, fontWeight: 800, color }}>{value}</span>
      <span style={{ ...mono, fontSize: 10, color: C.textMuted, textTransform: "uppercase", letterSpacing: 2 }}>{label}</span>
    </div>
  );
}

function SectionTag({ label, color = C.accent }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
      <div style={{ width: 6, height: 6, borderRadius: "50%", background: color, boxShadow: `0 0 10px ${color}`, animation: "pulse 2s infinite" }} />
      <span style={{ ...mono, fontSize: 11, color, textTransform: "uppercase", letterSpacing: 3 }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${color}50, transparent)` }} />
    </div>
  );
}

function QuestCard({ title, company, period, status = "completed", tags = [] }) {
  const cfg = { active: { color: C.green, label: "ACTIVE", icon: "play" }, completed: { color: C.blue, label: "DONE", icon: "check" } };
  const s = cfg[status] || cfg.completed;
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "15px 18px", marginBottom: 8, transition: "all 0.2s", cursor: "default", borderLeft: `2px solid ${s.color}`, backdropFilter: "blur(8px)" }}
      onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.09)"; e.currentTarget.style.borderColor = s.color + "50"; e.currentTarget.style.borderLeftColor = s.color; }}
      onMouseLeave={e => { e.currentTarget.style.background = C.surface; e.currentTarget.style.borderColor = C.border; e.currentTarget.style.borderLeftColor = s.color; }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
        <div style={{ flex: 1 }}>
          <div style={{ ...syne, fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 3 }}>{title}</div>
          <div style={{ ...mono, fontSize: 10, color: C.textMuted, marginBottom: tags.length ? 8 : 0 }}>{company}</div>
          {tags.length > 0 && <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>{tags.map(t => <span key={t} style={{ ...mono, fontSize: 9, color: s.color, background: s.color + "18", padding: "2px 7px", borderRadius: 4, textTransform: "uppercase", letterSpacing: 1 }}>{t}</span>)}</div>}
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
          <span style={{ ...mono, fontSize: 9, color: s.color, background: s.color + "18", padding: "2px 8px", borderRadius: 4, display: "flex", alignItems: "center", gap: 4 }}>
            <Icon d={Icons[s.icon]} size={9} color={s.color} strokeWidth={2.5} /> {s.label}
          </span>
          <span style={{ ...mono, fontSize: 9, color: C.textDim }}>{period}</span>
        </div>
      </div>
    </div>
  );
}

function OrgCard({ title, period, items }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden", marginBottom: 8, transition: "border-color 0.2s", backdropFilter: "blur(8px)" }}
      onMouseEnter={e => e.currentTarget.style.borderColor = C.accent + "50"}
      onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
      <div style={{ padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", gap: 12 }} onClick={() => setOpen(!open)}>
        <div style={{ flex: 1 }}>
          <div style={{ ...syne, fontSize: 13, fontWeight: 700, color: C.text }}>{title}</div>
          <div style={{ ...mono, fontSize: 10, color: C.textMuted, marginTop: 2 }}>{period}</div>
        </div>
        <div style={{ color: C.accent, transition: "transform 0.2s", transform: open ? "rotate(45deg)" : "none", flexShrink: 0 }}>
          <Icon d={Icons.plus} size={16} color={C.accent} />
        </div>
      </div>
      {open && (
        <div style={{ borderTop: `1px solid ${C.border}`, padding: "12px 18px 14px", animation: "fadeIn 0.2s ease" }}>
          {items.map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 7, alignItems: "flex-start" }}>
              <div style={{ marginTop: 5, flexShrink: 0 }}><Icon d={Icons.minus} size={10} color={C.accent} /></div>
              <span style={{ ...dmSans, fontSize: 12, color: C.textSub, fontWeight: 300 }}>{item}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AchievementBadge({ iconKey, title, desc, unlocked = true, rarity = "common" }) {
  const rarityColors = { common: C.textMuted, uncommon: C.green, rare: C.blue, epic: C.purple, legendary: C.accent };
  const col = rarityColors[rarity];
  return (
    <div style={{ background: unlocked ? C.surface : "rgba(255,255,255,0.03)", border: `1px solid ${unlocked ? col + "50" : C.border}`, borderRadius: 12, padding: "15px 18px", display: "flex", alignItems: "center", gap: 14, opacity: unlocked ? 1 : 0.35, transition: "all 0.2s", cursor: "default", backdropFilter: "blur(8px)" }}
      onMouseEnter={e => { if (unlocked) { e.currentTarget.style.borderColor = col; e.currentTarget.style.background = col + "12"; }}}
      onMouseLeave={e => { e.currentTarget.style.borderColor = unlocked ? col + "50" : C.border; e.currentTarget.style.background = unlocked ? C.surface : "rgba(255,255,255,0.03)"; }}>
      <div style={{ width: 44, height: 44, borderRadius: 10, background: unlocked ? col + "20" : "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: unlocked ? `0 0 16px ${col}30` : "none" }}>
        <Icon d={unlocked ? Icons[iconKey] : Icons.lock} size={20} color={unlocked ? col : C.textDim} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
          <span style={{ ...syne, fontSize: 13, fontWeight: 700, color: unlocked ? C.text : C.textMuted }}>{title}</span>
          <span style={{ ...mono, fontSize: 9, color: col, textTransform: "uppercase", letterSpacing: 2, padding: "2px 5px", background: col + "20", borderRadius: 4 }}>{rarity}</span>
        </div>
        <span style={{ ...dmSans, fontSize: 12, color: C.textSub, fontWeight: 300 }}>{desc}</span>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [activeTab, setActiveTab] = useState("current");
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const onScroll = () => {
      const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      const newXp = Math.round(pct * 4200);
      setXp(newXp);
      setLevel(Math.floor(newXp / 700) + 1);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" }, { id: "about", label: "About" },
    { id: "experience", label: "Quests" }, { id: "organizations", label: "Guild" },
    { id: "skills", label: "Skills" }, { id: "projects", label: "Inventory" },
    { id: "achievements", label: "Badges" }, { id: "contact", label: "Contact" },
  ];

  const skills = [
    { label: "Digital Marketing", value: 95, color: C.accent },
    { label: "Social Media Management", value: 92, color: C.purple },
    { label: "Content Creation & Strategy", value: 90, color: C.green },
    { label: "Paid Advertising (Meta/Google)", value: 85, color: C.accent },
    { label: "Live Streaming & Hosting", value: 88, color: C.orange },
    { label: "SEO & Copywriting", value: 82, color: C.green },
    { label: "KOL / Influencer Management", value: 80, color: C.blue },
    { label: "Web Development (PHP/Laravel)", value: 75, color: C.blue },
    { label: "Video Editing", value: 78, color: C.purple },
    { label: "Figma / UI-UX Design", value: 80, color: C.accent },
    { label: "AI / LLM Prompt Engineering", value: 85, color: C.purple },
    { label: "Machine Learning (Basics)", value: 65, color: C.blue },
    { label: "AI Tools & Automation", value: 88, color: C.green },
  ];

  const currentJobs = [
    { title: "Content Creator", company: "CHAMELYONE INTERIORS — Part-Time", period: "Sept 2025 – Present", status: "active", tags: ["Content", "Interior"] },
    { title: "Social Media Marketing Specialist", company: "WINOSA MITRA — Part-Time", period: "June 2025 – Present", status: "active", tags: ["Social Media", "Marketing"] },
    { title: "Content Creator", company: "JOKI PROYEK — Freelance", period: "Jan 2025 – Present", status: "active", tags: ["Content", "Freelance"] },
    { title: "Digital Marketing Executive", company: "MOVEABROAD.CO — Part-Time", period: "Jan 2025 – Present", status: "active", tags: ["Digital Marketing", "Ads"] },
    { title: "Digital Marketing Intern", company: "XDEMIA", period: "Nov 2024 – Present", status: "active", tags: ["EdTech", "Marketing"] },
    { title: "Marketing Director – Head of Sales & Marketing", company: "GENIUS GROWTH AI", period: "Jul 2025 – Nov 2025", status: "active", tags: ["Leadership", "AI", "Sales"] },
  ];

  const recentJobs = [
    { title: "Human Resources Assistant", company: "PT OAKM TECH INDONESIA — Freelance", period: "Nov 2024 – Jun 2025", tags: ["HR", "Tech"] },
    { title: "Content Creator", company: "LEARNRITHM.AI — Internship", period: "Nov 2024 – Jun 2025", tags: ["AI", "EdTech", "Content"] },
    { title: "Content Researcher", company: "MONTIER DESIGN — Contract", period: "Feb 2025 – May 2025", tags: ["Research", "Design"] },
    { title: "Personal Assistant", company: "INDO AQUATIC TRADE — Internship", period: "Nov 2024 – Feb 2025", tags: ["Operations"] },
    { title: "Social Media Officer", company: "BOTANI BAR — Freelance", period: "Nov 2024 – Jan 2025", tags: ["Social Media", "F&B"] },
    { title: "Content Creator", company: "PERSONAL BRANDING — Part-Time", period: "Oct 2024 – Jan 2025", tags: ["Branding", "Content"] },
  ];

  const jobs2024 = [
    { title: "Live Streaming Operator", company: "PEGASUS NET TECHNOLOGIES — Full-Time", period: "Sep 2024 – Des 2024", tags: ["Live", "Streaming", "Tech"] },
    { title: "Content Creator", company: "TILIEK CREATIVE AGENCY — Internship", period: "Aug 2024 – Oct 2024", tags: ["Creative", "Agency"] },
    { title: "Social Media Specialist", company: "PT. NAKAHAMA HANDAL KONSULTAMA — Freelance", period: "Jul 2024 – Oct 2024", tags: ["Social Media"] },
    { title: "Live Shopping", company: "PT. SOSIAL BERKAT KREATIF INDONESIA — Internship", period: "Jun 2024 – Sep 2024", tags: ["Live Shopping", "TikTok"] },
    { title: "Social Media Specialist", company: "PT. ACR BERSATU SEJAHTERA — Freelance", period: "Feb 2024 – Jun 2024", tags: ["Social Media"] },
  ];

  const jobs2023 = [
    { title: "Host Live", company: "CLOUT INDONESIA GROUP — Freelance", period: "Nov 2023 – Jan 2024", tags: ["Live Host", "Content"] },
    { title: "KOL Specialist", company: "PT. LANTIH ADHIP GRUP — Freelance", period: "Sep 2023 – Jan 2024", tags: ["KOL", "Influencer"] },
    { title: "Marketing & KOL Specialist", company: "PT. ACR BERSATU SEJAHTERA — Freelance", period: "Apr 2023 – Jun 2023", tags: ["Marketing", "KOL"] },
    { title: "Marketing Specialist", company: "CICISGENK.ID — Freelance", period: "Apr 2023 – Jun 2023", tags: ["Marketing"] },
    { title: "Social Media Specialist", company: "NUGASITUDUIT — Freelance", period: "Oct 2021 – Jul 2023", tags: ["Social Media", "Long-Term"] },
    { title: "Content Marketing", company: "CRAFTBBARO — Freelance", period: "May 2020 – Feb 2023", tags: ["Content", "Marketing", "3yr"] },
  ];

  const tabData = { current: currentJobs, recent: recentJobs, "2024": jobs2024, "2023": jobs2023 };

  const organizations = [
    { title: "Coordinator of Fresh Money Division", period: "Serah Tahunan UKM UMN 2025 – Nov 2025", items: ["Lead the Fresh Money Division team in managing financial transactions", "Supervised fundraising activities through paid promotions and bazaars", "Developed creative fundraising ideas to generate organizational income"] },
    { title: "Public Relations Coordinator", period: "Perkenalan Prodi Informatika UMN 2025 – Sept 2025", items: ["Lead the PR Division for Informatics Program Introduction event", "Created and supervised content plans, scripts, and video production", "Directed team talents and coordinated full production process"] },
    { title: "Coordinator of Fresh Money Division", period: "Ready To Love Qorie UMN 2025 – April 2025", items: ["Lead Fresh Money Division team to achieve revenue goals", "Supervised financial operations and bookkeeping", "Organized promotional content for fundraising activities"] },
    { title: "Staff of Public Relation", period: "Infinite UMN 2024 – Oct 2024", items: ["Copywriting for social media", "Creating content ideas and implementing them"] },
    { title: "Staff of Fresh Money & Bazaar", period: "Hansan Festival & Euforia UMN 2024 – Oct 2024", items: ["Reaching out tenants to join events", "Conduct negotiations and discussions with tenants"] },
    { title: "Staff of Content Creator", period: "Teman Ambiss Periode 3 – March 2024", items: ["Creating content and scripts for social media", "Editing videos for scheduled content"] },
    { title: "Staff of Public Relation", period: "UMN Technology Festival 2024 – March 2024", items: ["Prepare interactive content for social media", "Reaching out media partners"] },
    { title: "Staff of Public Relation", period: "Serah Tahunan UMN 2023 – Oct 2023", items: ["Create interactive content and captions", "Create and edit videos for event series"] },
    { title: "Staff of Fresh Money", period: "Manifest UMN 2023 – Oct 2023", items: ["Looking for tenants and sponsors", "Making proposals for sponsorships"] },
    { title: "Staff of Creative & Design", period: "Ultima Toys Custom Championship – Sep 2023", items: ["Manage design for Instagram feeds", "Evaluate each design created"] },
    { title: "Volunteer", period: "Voluntrip Kampung Pemulung By KitaBisa – Aug 2023", items: ["Prepare and evaluate programs for 20 person capacity", "Manage communication with community", "Cooperate with external parties for comparative studies"] },
  ];

  // Project categories — no images, click to open detail modal
  const projectCategories = [
    { id: 'digital-marketing', title: "Digital Marketing", description: "Social media management, paid ads, growth campaigns, and performance analytics across 10+ brands.", color: C.accent, iconKey: "trending", tags: ["Meta Ads", "Google Ads", "Analytics", "Growth Hacking"] },
    { id: 'content-creation', title: "Content Creation", description: "Video production, photography, copywriting, and creative strategy for brands and personal channels.", color: C.purple, iconKey: "video", tags: ["CapCut", "Video Editing", "Copywriting", "Script Writing"] },
    { id: 'live-streaming', title: "Live Streaming", description: "Live shopping host and streaming operator with 5K+ concurrent peak viewers across TikTok & Shopee.", color: C.orange, iconKey: "radio", tags: ["TikTok Live", "Shopee Live", "Live Host", "Operations"] },
    { id: 'kol-management', title: "KOL Management", description: "Influencer relations, campaign management, and brand-talent coordination across niches.", color: C.green, iconKey: "users", tags: ["Influencer", "KOL", "Campaign", "Negotiation"] },
    { id: 'web-development', title: "Web Development", description: "PHP, Laravel, and React projects — edtech platforms, event registration systems, and dashboards.", color: C.blue, iconKey: "code", tags: ["PHP", "Laravel", "React", "JavaScript", "Python"] },
    { id: 'event-organization', title: "Event Organization", description: "Campus events coordinator — PR, bazaar, creative, and fresh money divisions across 11+ UMN events.", color: C.red, iconKey: "flag", tags: ["Event", "PR", "Coordinator", "Campus", "UMN"] },
  ];

  const achievements = [
    { iconKey: "award", title: "Platinum Marketer", desc: "3-year content marketing streak at Craftbbaro", rarity: "legendary", unlocked: true },
    { iconKey: "star", title: "Marketing Director", desc: "Head of Sales & Marketing at Genius Growth AI", rarity: "legendary", unlocked: true },
    { iconKey: "trending", title: "Triple-Digit Growth", desc: "Boosted Instagram reach by 93% at MoveAbroad.co", rarity: "epic", unlocked: true },
    { iconKey: "zap", title: "Multi-Tasker", desc: "6 simultaneous active roles across different companies", rarity: "epic", unlocked: true },
    { iconKey: "target", title: "Conversion Specialist", desc: "Managed paid campaigns across 10+ brands", rarity: "epic", unlocked: true },
    { iconKey: "monitor", title: "Live Legend", desc: "5K+ concurrent viewers on peak streaming sessions", rarity: "rare", unlocked: true },
    { iconKey: "building", title: "Campus Leader", desc: "Coordinator in 3+ major UMN events", rarity: "rare", unlocked: true },
    { iconKey: "handshake", title: "Deal Maker", desc: "B2B partnerships via pitches, proposals & decks", rarity: "rare", unlocked: true },
    { iconKey: "megaphone", title: "Word Wizard", desc: "SEO articles and copywriting across multiple brands", rarity: "uncommon", unlocked: true },
    { iconKey: "globe", title: "Volunteer Hero", desc: "Voluntrip Kampung Pemulung community program", rarity: "uncommon", unlocked: true },
    { iconKey: "cpu", title: "Dual Class", desc: "Active in tech dev and digital marketing simultaneously", rarity: "uncommon", unlocked: true },
    { iconKey: "sparkles", title: "???", desc: "Keep scrolling to unlock more achievements", rarity: "legendary", unlocked: false },
  ];

  const xpToNextLevel = 700;
  const currentXp = xp % xpToNextLevel;
  const levelProgress = Math.round((currentXp / xpToNextLevel) * 100);
  const tabConfig = [
    { key: "current", label: "▶ Active Now", color: C.green },
    { key: "recent", label: "2024–2025", color: C.accent },
    { key: "2024", label: "2024 (mid)", color: C.blue },
    { key: "2023", label: "2023 & Before", color: C.purple },
  ];

  return (
    <>
      <style>{globalCSS}</style>

      {/* ── BACKGROUND ─── */}
      <div style={{ position: "fixed", inset: 0, zIndex: -1, background: "radial-gradient(ellipse at 20% 20%, rgba(176,60,255,0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(255,60,190,0.08) 0%, transparent 60%), #0f0f0f" }} />

      {/* ── HUD NAV ─── */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, background: "rgba(10,2,18,0.72)", backdropFilter: "blur(24px)", borderBottom: `1px solid rgba(255,255,255,0.08)`, zIndex: 1000, padding: "11px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
        <div style={{ ...syne, fontWeight: 800, fontSize: 18, color: "#fff", letterSpacing: -1 }}>FA<span style={{ color: C.accent }}>_</span></div>
        <div style={{ flex: 1, maxWidth: 380 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
            <span style={{ ...mono, fontSize: 10, color: C.textMuted }}>LVL <span style={{ color: C.accent, fontWeight: 500 }}>{level}</span> — Felicia Annabel</span>
            <span style={{ ...mono, fontSize: 10, color: C.textMuted }}><span style={{ color: C.accent }}>{currentXp}</span> / {xpToNextLevel} XP</span>
          </div>
          <div style={{ height: 3, background: "rgba(255,255,255,0.08)", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${levelProgress}%`, background: `linear-gradient(90deg, ${C.accent}, ${C.purple})`, borderRadius: 2, transition: "width 0.1s", boxShadow: `0 0 8px ${C.accent}70` }} />
          </div>
        </div>
        <nav style={{ display: "flex", gap: 20 }}>
          {navItems.map(n => (
            <a key={n.id} href={`#${n.id}`} style={{ ...mono, fontSize: 10, color: C.textMuted, textDecoration: "none", textTransform: "uppercase", letterSpacing: 1.5, transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = C.accent}
              onMouseLeave={e => e.currentTarget.style.color = C.textMuted}>{n.label}</a>
          ))}
        </nav>
      </div>

      {/* ── CONTENT ─── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "100px 40px 80px" }}>

        {/* HERO */}
        <section id="home" style={{ minHeight: "90vh", display: "flex", flexDirection: "column", justifyContent: "center", marginBottom: 140 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 40 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.red, boxShadow: `0 0 12px ${C.red}` }} />
            <span style={{ ...mono, fontSize: 11, color: C.textSub, textTransform: "uppercase", letterSpacing: 3 }}>Not Available — Tangerang, Indonesia</span>
          </div>
          <h1 style={{ ...syne, fontWeight: 800, lineHeight: 0.95, fontSize: "clamp(48px, 8vw, 110px)", color: "#fff", marginBottom: 8, letterSpacing: -4, textShadow: "0 2px 30px rgba(0,0,0,0.9)" }}>Felicia</h1>
          <h1 style={{ ...syne, fontWeight: 800, lineHeight: 0.95, fontSize: "clamp(48px, 8vw, 110px)", color: C.accent, marginBottom: 4, letterSpacing: -4, textShadow: `0 2px 30px ${C.accent}50` }}>Annabel</h1>
          <h1 style={{ ...syne, fontWeight: 800, lineHeight: 0.95, fontSize: "clamp(48px, 8vw, 110px)", color: "rgba(255,255,255,0.25)", marginBottom: 40, letterSpacing: -4 }}>Ruriyanto</h1>
          <div style={{ display: "flex", gap: 40, alignItems: "flex-end", flexWrap: "wrap" }}>
            <p style={{ ...dmSans, fontSize: 16, color: C.textSub, maxWidth: 420, lineHeight: 1.85, fontWeight: 300 }}>
              Informatics Engineering student at UMN. Digital marketer × content creator × live host × developer. 20+ roles across 5 years. Still leveling up.
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["Digital Marketing", "Content Creator", "Live Host", "KOL Specialist", "Web Dev"].map(tag => (
                <span key={tag} style={{ ...mono, fontSize: 10, color: C.textSub, border: `1px solid rgba(255,255,255,0.18)`, padding: "5px 11px", borderRadius: 6, textTransform: "uppercase", letterSpacing: 1 }}>{tag}</span>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 60 }}>
            <StatBadge iconKey="zap" value="6" label="Active Roles" color={C.accent} />
            <StatBadge iconKey="building" value="20+" label="Total Companies" color={C.purple} />
            <StatBadge iconKey="monitor" value="5K+" label="Peak Viewers" color={C.orange} />
            <StatBadge iconKey="calendar" value="5yr" label="Experience" color={C.blue} />
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" style={{ marginBottom: 140 }}>
          <SectionTag label="Character Sheet" color={C.accent} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }}>
            <div>
              <h2 style={{ ...syne, fontSize: 38, fontWeight: 800, color: "#fff", marginBottom: 24, letterSpacing: -1.5 }}>Who am I</h2>
              <p style={{ ...dmSans, fontSize: 15, color: C.textSub, lineHeight: 1.95, fontWeight: 300, marginBottom: 20 }}>
                Informatics Engineering student at UMN with a dual-class build: digital marketer by day, developer by training. I've worked across 20+ companies — from AI startups to creative agencies — spanning content creation, live streaming, KOL management, social media, and web development.
              </p>
              <p style={{ ...dmSans, fontSize: 15, color: C.textSub, lineHeight: 1.95, fontWeight: 300 }}>
                Currently running 6 active roles simultaneously while finishing my degree. I thrive in fast-paced, multi-role environments and love building things that are both functional and engaging.
              </p>
              <div style={{ marginTop: 36, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                {[
                  { label: "University", value: "Multimedia Nusantara University" },
                  { label: "Major", value: "Informatics Engineering" },
                  { label: "Location", value: "Tangerang, Banten" },
                  { label: "Status", value: "Not Available" },
                ].map(({ label, value }) => (
                  <div key={label} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 16px", backdropFilter: "blur(8px)" }}>
                    <div style={{ ...mono, fontSize: 9, color: C.textMuted, textTransform: "uppercase", letterSpacing: 2, marginBottom: 5 }}>{label}</div>
                    <div style={{ ...syne, fontSize: 13, fontWeight: 700, color: "#fff" }}>{value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ ...mono, fontSize: 10, color: C.textMuted, textTransform: "uppercase", letterSpacing: 2, marginBottom: 24 }}>Skill Tree</div>
              {skills.map((s, i) => <XPBar key={s.label} {...s} delay={i * 70} />)}
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" style={{ marginBottom: 140 }}>
          <SectionTag label="Quest Log" color={C.green} />
          <h2 style={{ ...syne, fontSize: 38, fontWeight: 800, color: "#fff", marginBottom: 8, letterSpacing: -1.5 }}>Experience Timeline</h2>
          <p style={{ ...dmSans, fontSize: 14, color: C.textSub, marginBottom: 32, fontWeight: 300 }}>20+ roles across 5 years. Filter by era.</p>
          <div style={{ display: "flex", gap: 8, marginBottom: 32, flexWrap: "wrap" }}>
            {tabConfig.map(({ key, label, color }) => (
              <button key={key} onClick={() => setActiveTab(key)} style={{ ...mono, fontSize: 10, padding: "7px 16px", borderRadius: 8, border: `1px solid ${activeTab === key ? color : "rgba(255,255,255,0.12)"}`, background: activeTab === key ? color + "22" : "transparent", color: activeTab === key ? color : C.textMuted, cursor: "pointer", textTransform: "uppercase", letterSpacing: 1.5, transition: "all 0.2s" }}>{label}</button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {(tabData[activeTab] || []).map((j, i) => (
              <QuestCard key={i} {...j} status={activeTab === "current" ? "active" : "completed"} />
            ))}
          </div>
        </section>

        {/* ORGANIZATIONS */}
        <section id="organizations" style={{ marginBottom: 140 }}>
          <SectionTag label="Guild Log" color={C.purple} />
          <h2 style={{ ...syne, fontSize: 38, fontWeight: 800, color: "#fff", marginBottom: 8, letterSpacing: -1.5 }}>Organizational Activity</h2>
          <p style={{ ...dmSans, fontSize: 14, color: C.textSub, marginBottom: 40, fontWeight: 300 }}>Campus events, volunteer work, and committee roles — click to expand.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 24 }}>
            {organizations.map((org, i) => <OrgCard key={i} {...org} />)}
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" style={{ marginBottom: 140 }}>
          <SectionTag label="Equipment" color={C.blue} />
          <h2 style={{ ...syne, fontSize: 38, fontWeight: 800, color: "#fff", marginBottom: 8, letterSpacing: -1.5 }}>Tools & Tech Stack</h2>
          <p style={{ ...dmSans, fontSize: 14, color: C.textSub, marginBottom: 40, fontWeight: 300 }}>Software, platforms, and skills in active daily use.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {[
              { cat: "Marketing", items: ["Meta Ads Manager", "Google Analytics", "TikTok Ads", "Social Blade", "TikTok Studio", "Instagram Insights", "Canva"], color: C.accent, iconKey: "trending" },
              { cat: "Content & Creative", items: ["CapCut", "Video Editing", "Copywriting", "Content Strategy", "Live Production", "SEO Writing", "Script Writing"], color: C.purple, iconKey: "video" },
              { cat: "Development", items: ["PHP", "Laravel", "JavaScript", "HTML/CSS", "React", "Python", "Kotlin", "Git", "VS Code"], color: C.blue, iconKey: "code" },
              { cat: "AI & LLM", items: ["ChatGPT", "Claude (Anthropic)", "Gemini", "Prompt Engineering", "LLM Workflows", "AI Content Generation", "Midjourney / Image AI"], color: C.purple, iconKey: "sparkles" },
              { cat: "Design & Prototyping", items: ["Figma", "UI/UX Design", "Wireframing", "Prototyping", "Design Systems", "Responsive Layouts", "Adobe Express"], color: C.accent, iconKey: "monitor" },
              { cat: "Machine Learning", items: ["Python (Scikit-learn)", "Data Preprocessing", "Model Basics", "Jupyter Notebook", "Pandas / NumPy", "AI Automation Tools"], color: C.green, iconKey: "cpu" },
            ].map(({ cat, items, color, iconKey }) => (
              <div key={cat} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 24, position: "relative", overflow: "hidden", backdropFilter: "blur(10px)" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: color }} />
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                  <Icon d={Icons[iconKey]} size={14} color={color} />
                  <span style={{ ...mono, fontSize: 10, color, textTransform: "uppercase", letterSpacing: 2 }}>{cat}</span>
                </div>
                {items.map(item => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 9 }}>
                    <div style={{ width: 3, height: 3, borderRadius: "50%", background: color, flexShrink: 0 }} />
                    <span style={{ ...dmSans, fontSize: 13, color: C.textSub, fontWeight: 300 }}>{item}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS / INVENTORY */}
        <section id="projects" style={{ marginBottom: 140 }}>
          <SectionTag label="Inventory" color={C.orange} />
          <h2 style={{ ...syne, fontSize: 38, fontWeight: 800, color: "#fff", marginBottom: 8, letterSpacing: -1.5 }}>Project Categories</h2>
          <p style={{ ...dmSans, fontSize: 14, color: C.textSub, marginBottom: 40, fontWeight: 300 }}>6 major domains — collected across 5 years of active play.</p>

          {/* ── FEATURED CAROUSEL ── */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: '28px', marginBottom: 40, backdropFilter: "blur(10px)", position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${C.accent}, ${C.purple}, ${C.blue})` }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: C.accent, animation: 'pulse 2s infinite' }} />
              <span style={{ ...mono, fontSize: '11px', color: C.accent, textTransform: 'uppercase', letterSpacing: '3px' }}>Featured Projects</span>
            </div>
            <FeaturedProjectCarousel />
          </div>

          {/* ── CATEGORY CARDS ── */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {projectCategories.map((p) => (
              <div key={p.id}
                onClick={() => setSelectedProject(projectDetails[p.id])}
                style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: '22px', transition: "all 0.25s", cursor: "pointer", backdropFilter: "blur(10px)", position: 'relative', overflow: 'hidden' }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.09)"; e.currentTarget.style.borderColor = p.color + "60"; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 8px 30px ${p.color}18`; }}
                onMouseLeave={e => { e.currentTarget.style.background = C.surface; e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: p.color }} />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: p.color + "20", display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 16px ${p.color}20` }}>
                    <Icon d={Icons[p.iconKey]} size={18} color={p.color} />
                  </div>
                  <div style={{ ...mono, fontSize: '9px', color: p.color, background: p.color + "18", padding: "3px 9px", borderRadius: 4, textTransform: 'uppercase', letterSpacing: 1.5, border: `1px solid ${p.color}30` }}>View Details</div>
                </div>
                <div style={{ ...syne, fontSize: 15, fontWeight: 700, color: C.text, marginBottom: '8px' }}>{p.title}</div>
                <div style={{ ...dmSans, fontSize: 12, color: C.textSub, fontWeight: 300, lineHeight: 1.7, marginBottom: '14px' }}>{p.description}</div>
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                  {p.tags.map(t => <span key={t} style={{ ...mono, fontSize: 9, color: C.textMuted, padding: "2px 6px", border: `1px solid ${C.border}`, borderRadius: 4 }}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ACHIEVEMENTS */}
        <section id="achievements" style={{ marginBottom: 140 }}>
          <SectionTag label="Achievement Log" color={C.accent} />
          <h2 style={{ ...syne, fontSize: 38, fontWeight: 800, color: "#fff", marginBottom: 8, letterSpacing: -1.5 }}>Badges Earned</h2>
          <p style={{ ...dmSans, fontSize: 14, color: C.textSub, marginBottom: 40, fontWeight: 300 }}>Milestones unlocked from real-world missions.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
            {achievements.map((a, i) => <AchievementBadge key={i} {...a} />)}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" style={{ marginBottom: 80 }}>
          <SectionTag label="DM / Collab" color={C.green} />
          <h2 style={{ ...syne, fontSize: 38, fontWeight: 800, color: "#fff", marginBottom: 40, letterSpacing: -1.5 }}>Start a New Quest Together</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60 }}>
            <div>
              <p style={{ ...dmSans, fontSize: 15, color: C.textSub, lineHeight: 1.9, fontWeight: 300, marginBottom: 32 }}>
                Currently not available for new roles — heads down finishing my degree and ongoing projects. Feel free to reach out for future collabs though, always down to connect!
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["Not Available", "Currently Studying", "Focused Mode", "DM for Future Collabs"].map(label => (
                  <span key={label} style={{ ...mono, fontSize: 10, display: "flex", alignItems: "center", gap: 6, color: C.red, background: C.red + "15", padding: "6px 12px", borderRadius: 6, textTransform: "uppercase", letterSpacing: 1, border: `1px solid ${C.red}30` }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.red }} />{label}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { iconKey: "mail", label: "Email", value: "ffeliciaannabelruriyanto@gmail.com", href: "mailto:ffeliciaannabelruriyanto@gmail.com" },
                { iconKey: "phone", label: "Phone", value: "+62 877-3678-6969", href: "tel:+6287736786969" },
                { iconKey: "linkedin", label: "LinkedIn", value: "felicia-annabel-ruriyanto", href: "https://linkedin.com/in/felicia-annabel-ruriyanto-227a9125b" },
                { iconKey: "mappin", label: "Location", value: "Kab. Tangerang, Pagedangan, Banten", href: null },
              ].map(({ iconKey, label, value, href }) => (
                <a key={label} href={href || "#"} target={href ? "_blank" : ""} rel="noopener noreferrer" style={{ textDecoration: "none", display: "block" }}>
                  <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "14px 18px", display: "flex", alignItems: "center", gap: 14, transition: "all 0.2s", cursor: href ? "pointer" : "default", backdropFilter: "blur(8px)" }}
                    onMouseEnter={e => { if (href) { e.currentTarget.style.borderColor = C.accent + "60"; e.currentTarget.style.background = C.accent + "10"; }}}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.surface; }}>
                    <Icon d={Icons[iconKey]} size={16} color={C.accent} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ ...mono, fontSize: 9, color: C.textMuted, textTransform: "uppercase", letterSpacing: 2, marginBottom: 3 }}>{label}</div>
                      <div style={{ ...dmSans, fontSize: 13, color: "#fff", fontWeight: 400, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{value}</div>
                    </div>
                    {href && <Icon d={Icons.arrowUpRight} size={14} color={C.textDim} />}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <div style={{ borderTop: `1px solid rgba(255,255,255,0.08)`, paddingTop: 40, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
          <span style={{ ...mono, fontSize: 11, color: C.textDim }}>Felicia Annabel Ruriyanto — Portfolio 2026</span>
          <span style={{ ...mono, fontSize: 11, color: C.textDim }}>XP this session: <span style={{ color: C.accent }}>{xp} XP</span></span>
          <span style={{ ...mono, fontSize: 11, color: C.textDim }}>LVL {level} — Digital Marketer × Developer</span>
        </div>
      </div>

      {/* PROJECT DETAIL MODAL */}
      {selectedProject && (
        <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </>
  );
}