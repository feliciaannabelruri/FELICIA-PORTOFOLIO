import { useState, useEffect, useRef } from "react";
import { supabase } from "./supabase.js";

// ─── SUPABASE DATA HOOK ───────────────────────────────────────────────────────
function useSupabaseData(fallbackData) {
  const [data, setData] = useState(fallbackData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      try {
        // Fetch settings
        const { data: settingsRows } = await supabase.from("settings").select("*");
        const settings = {};
        (settingsRows || []).forEach(r => { settings[r.key] = r.value; });

        // Fetch featured projects
        const { data: projects } = await supabase
          .from("projects").select("*").eq("is_visible", true).order("sort_order");

        // Fetch skills
        const { data: skills } = await supabase
          .from("skills").select("*").order("sort_order");

        // Fetch project categories
        const { data: categories } = await supabase
          .from("project_categories").select("*").order("sort_order");

        // Fetch experiences
        const { data: experiences } = await supabase
          .from("experiences").select("*").order("sort_order");

        // Fetch org activities
        const { data: orgActivities } = await supabase
          .from("org_activities").select("*").eq("is_visible", true).order("sort_order");

        // Only update if we actually got data back
        setData(prev => ({
          ...prev,
          settings: settingsRows?.length ? settings : prev.settings,
          featuredProjects: projects?.length ? projects.map(p => ({
            id: p.id,
            img: p.image_url || "",
            title: p.title,
            description: p.description,
            link: p.link || "#",
            category: p.category,
          })) : prev.featuredProjects,
          skills: skills?.length ? skills.map(s => ({
            label: s.label,
            value: s.value,
            color: s.color,
          })) : prev.skills,
          projectCategories: categories?.length ? categories.map(c => ({
            id: c.id,
            title: c.title,
            description: c.description,
            color: c.color,
            iconKey: c.icon_key,
            tags: c.tags || [],
            modalContent: c.modal_content || "",
          })) : prev.projectCategories,
          experiences: experiences?.length ? experiences : prev.experiences,
          orgActivities: orgActivities?.length ? orgActivities : prev.orgActivities,
        }));
      } catch (e) {
        console.log("Supabase not configured, using local data:", e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  return { data, loading };
}

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
  bg: "#F8F9FA",
  surface: "#FFFFFF",
  surfaceHover: "#FAFAFA",
  border: "#EBEBEB",
  borderHover: "#ff3cbe",
  accent: "#E8197A",
  purple: "#7C3AED",
  blue: "#2563EB",
  green: "#059669",
  orange: "#D97706",
  red: "#DC2626",
  text: "#111111",
  textSub: "#404040",
  textMuted: "#888888",
  textDim: "#C8C8C8",
};

const globalCSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
  html, body { overflow-x: hidden; max-width: 100%; }
  body { background: #F8F9FA; color: #111111; font-family: 'Poppins', sans-serif; font-weight: 400; line-height: 1.6; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #F0F0F0; }
  ::-webkit-scrollbar-thumb { background: #E8197A; border-radius: 2px; }
  @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(232,25,122,.4)} 70%{box-shadow:0 0 0 8px rgba(232,25,122,0)} }
  @keyframes floatBadge { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
  @keyframes fadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
  @keyframes modalIn { from{opacity:0;transform:scale(0.95) translateY(20px)} to{opacity:1;transform:scale(1) translateY(0)} }
  @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
  @keyframes carouselFade { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }

  /* ── LAYOUT BASE ── */
  .hud-nav { padding: 10px 40px; display: flex; align-items: center; justify-content: space-between; gap: 20px; }
  .hud-nav-links { display: flex; gap: 24px; }
  .hud-xpbar { flex: 1; max-width: 300px; }
  .main-content { max-width: 680px; margin: 0 auto; padding: 80px 24px 80px; }
  .section-mb { margin-bottom: 60px; scroll-margin-top: 72px; }
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; }
  .experience-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .org-grid { display: grid; grid-template-columns: 1fr 1fr; column-gap: 16px; }
  .skills-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
  .category-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
  .achievements-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
  .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
  .footer-bar { display: flex; justify-content: space-between; align-items: center; gap: 20px; flex-wrap: wrap; }
  .carousel-img { height: 240px; }

  /* Overflow guard */
  * { box-sizing: border-box; }
  img { max-width: 100%; height: auto; display: block; }
  section, div { max-width: 100%; }

  /* ── TABLET 1024px ── */
  @media (max-width: 1024px) {
    .hud-nav { padding: 10px 20px; }
    .main-content { max-width: 100%; padding: 80px 20px 60px; }
    .category-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .skills-grid { grid-template-columns: repeat(2, 1fr) !important; }
  }

  /* ── MOBILE 768px ── */
  @media (max-width: 768px) {
    /* Nav */
    .hud-nav { padding: 10px 16px; }
    .hud-nav-links { display: none !important; }
    .hud-xpbar { max-width: 160px; }
    .hamburger-btn { display: flex !important; }

    /* Layout */
    .main-content { padding: 64px 0 160px !important; }
    .section-mb { margin-bottom: 48px !important; }
    .hero-section { padding-top: 0 !important; }

    /* Non-hero sections get side padding */
    #about, #experience, #organizations, #skills, #projects, #achievements, #contact { padding-left: 16px !important; padding-right: 16px !important; }

    /* Hero Instagram card — no side padding so cover bleeds edge to edge */
    .ig-cover { border-radius: 0 !important; height: 130px !important; margin-left: -0px; margin-right: -0px; }
    .ig-profile-card { border-radius: 0 !important; padding: 0 16px 24px !important; box-shadow: none !important; border-bottom: 1px solid #EBEBEB; }
    .ig-avatar-wrapper { width: 72px !important; height: 72px !important; margin-top: -38px !important; }
    .ig-avatar-inner { font-size: 24px !important; }
    .ig-profile-row { flex-direction: row !important; align-items: flex-end !important; justify-content: space-between !important; gap: 8px !important; }

    /* Action buttons — icon-only on small screens */
    .ig-action-btn-text { display: none !important; }
    .ig-action-btn { padding: 8px 12px !important; font-size: 12px !important; }

    /* Stats 2x2 grid */
    .ig-stats-row { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 0 !important; border-top: 1px solid #F0F0F0 !important; border-bottom: 1px solid #F0F0F0 !important; padding: 12px 0 !important; }
    .ig-stat-item { text-align: center; padding: 8px 0; }
    .ig-stat-divider { display: none !important; }

    /* Bio */
    .ig-bio-row { align-items: flex-start !important; }

    /* Stories row — reduce gap */
    .stories-row { gap: 12px !important; padding-bottom: 8px !important; }
    .story-circle-wrap { flex-shrink: 0; }

    /* Sections padding */
    .section-inner { padding: 0 16px !important; }

    /* Grids */
    .about-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
    .experience-grid { grid-template-columns: 1fr !important; }
    .org-grid { grid-template-columns: 1fr !important; column-gap: 0 !important; }
    .skills-grid { grid-template-columns: 1fr 1fr !important; gap: 10px !important; }
    .category-grid { grid-template-columns: 1fr 1fr !important; gap: 10px !important; }
    .achievements-grid { grid-template-columns: 1fr !important; }
    .contact-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
    .footer-bar { flex-direction: column !important; align-items: center !important; gap: 6px !important; text-align: center !important; }

    /* Carousel */
    .carousel-info { flex-direction: column !important; align-items: flex-start !important; }
    .carousel-info a { width: 100% !important; justify-content: center !important; text-align: center !important; }
    .featured-card { padding: 14px !important; }
    .carousel-img { height: 180px !important; }

    /* IG post grid */
    .ig-posts-grid { gap: 2px !important; }
  }

  /* ── SMALL MOBILE 480px ── */
  @media (max-width: 480px) {
    .skills-grid { grid-template-columns: 1fr !important; }
    .category-grid { grid-template-columns: 1fr !important; }
    .carousel-img { height: 160px !important; }
    .hud-xpbar { display: none !important; }
  }

  /* Modal inner HTML grids responsive */
  @media (max-width: 600px) {
    [style*='grid-template-columns: 1fr 1fr'], [style*='grid-template-columns:1fr 1fr'] { grid-template-columns: 1fr !important; }
    [style*='grid-template-columns: 1fr 1fr 1fr'], [style*='grid-template-columns:repeat(3'] { grid-template-columns: 1fr !important; }
  }

  /* ── PARALLAX & INSTAGRAM STYLES ── */
  @keyframes rotateGradient { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  @keyframes slideInUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes orbFloat { 0%,100%{ transform: translateY(0px) scale(1); } 50%{ transform: translateY(-18px) scale(1.04); } }
  @keyframes igPostReveal { from{ opacity:0; transform:scale(0.94); } to{ opacity:1; transform:scale(1); } }
  @keyframes bannerFloat { 0%,100%{ transform: translateY(0) scale(1.2); } 50%{ transform: translateY(-12px) scale(1.2); } }

  .parallax-orb { will-change: transform; pointer-events: none; position: absolute; border-radius: 50%; }
  .hero-content-layer { position: relative; z-index: 2; }

  /* Cover photo parallax container */
  .ig-cover { position: relative; overflow: hidden; border-radius: 20px 20px 0 0; height: 200px; }
  .ig-cover-bg { position: absolute; inset: -30px; background-size: cover; will-change: transform; }

  /* Profile card */
  .ig-profile-card { background: #fff; border-radius: 0 0 24px 24px; padding: 0 28px 28px; box-shadow: 0 4px 24px rgba(0,0,0,0.07); }

  /* Stories row scrollbar hide */
  .stories-row { overflow-x: auto; -ms-overflow-style: none; scrollbar-width: none; }
  .stories-row::-webkit-scrollbar { display: none; }

  /* Story circle */
  .story-circle { transition: transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s; cursor: pointer; }
  .story-circle:hover { transform: translateY(-4px) scale(1.08); }

  /* Instagram grid */
  .ig-posts-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 3px; border-radius: 12px; overflow: hidden; }
  .ig-post-item { position: relative; aspect-ratio: 1; overflow: hidden; cursor: pointer; background: #F0F0F0; }
  .ig-post-item img { width:100%; height:100%; object-fit:cover; transition: transform 0.45s cubic-bezier(0.4,0,0.2,1); display:block; }
  .ig-post-item:hover img { transform: scale(1.08); }
  .ig-post-overlay { position:absolute; inset:0; background:rgba(0,0,0,0.65); display:flex; flex-direction:column; align-items:center; justify-content:center; opacity:0; transition: opacity 0.3s ease; padding:14px; text-align:center; backdrop-filter: blur(2px); }
  .ig-post-item:hover .ig-post-overlay { opacity:1; }

  /* Premium card */
  .premium-card { background: #fff; border-radius: 18px; border: 1px solid #EBEBEB; box-shadow: 0 2px 12px rgba(0,0,0,0.05); transition: transform 0.28s cubic-bezier(0.4,0,0.2,1), box-shadow 0.28s ease !important; }
  .premium-card:hover { transform: translateY(-5px) !important; box-shadow: 0 12px 40px rgba(0,0,0,0.10) !important; }

  /* Story ring rotation */
  .story-ring-spin { animation: rotateGradient 5s linear infinite; border-radius: 50%; }

  /* Section reveal */
  .section-reveal { animation: slideInUp 0.55s cubic-bezier(0.4,0,0.2,1) both; }

  /* IG stat divider */
  .ig-stat-divider { width: 1px; height: 36px; background: #EBEBEB; }

  /* XP bar track for light mode */
  .xp-track { background: #F0F0F0 !important; }

  /* Featured card carousel light */
  .featured-card-light { background: #fff !important; border: 1px solid #EBEBEB !important; box-shadow: 0 2px 16px rgba(0,0,0,0.06) !important; }

  /* Touch targets */
  @media (hover: none) and (pointer: coarse) {
    .story-circle { -webkit-tap-highlight-color: transparent; }
    .premium-card { -webkit-tap-highlight-color: transparent; }
    a, button { -webkit-tap-highlight-color: transparent; cursor: default; }
  }
`
const mono = { fontFamily: "'Poppins', sans-serif" };
const syne = { fontFamily: "'Poppins', sans-serif" };
const dmSans = { fontFamily: "'Poppins', sans-serif" };

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
      <h4 style="color:#b03cff;margin:20px 0 10px 0;font-family:'Syne',sans-serif;">Current Projects (2026 - Present):</h4>
      <div style="margin-bottom:16px;padding:14px 16px;border-left:2px solid #b03cff;background:rgba(176,60,255,0.05);border-radius:8px;">
        <strong style="color:#fff;">SMPLHR</strong> – Vibe Coding Instructor (Freelance)
        <ul style="margin-left:20px;margin-top:8px;color:rgba(255,255,255,0.7);font-size:13px;">
          <li>Facilitated hands-on workshops for non-technical participants (HR, Marketing, Business, SMEs)</li>
          <li>Guided participants in prompt engineering using <strong style="color:#b03cff;">Claude, Cursor, v0, and Replit</strong></li>
          <li>Designed project-based learning: landing pages, dashboards, mini apps</li>
          <li>Simplified complex technical concepts for non-IT audiences</li>
          <li>Created engaging environments that drive strong "aha moments"</li>
        </ul>
      </div>
      <h4 style="color:#b03cff;margin:20px 0 10px 0;font-family:'Syne',sans-serif;">2025 – Early 2026:</h4>
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
        <strong style="color:#fff;">INDO AQUATIC TRADE</strong> – PA Internship — Boosted engagement by <strong style="color:#b03cff;">72%</strong>, increased organic traffic by <strong style="color:#b03cbe;">58%</strong>, contributed to <strong style="color:#b03cff;">2.5× follower growth</strong> for CEO's personal brand
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
      <h4 style="color:#3c9eff;margin:20px 0 10px 0;font-family:'Syne',sans-serif;">Current (2026 - Present):</h4>
      <div style="margin-bottom:16px;padding:14px 16px;border-left:2px solid #3c9eff;background:rgba(60,158,255,0.05);border-radius:8px;">
        <strong style="color:#fff;">CANYON ENTERTAINMENT GROUP</strong> – Website Management (Internship)
        <ul style="margin-left:20px;margin-top:8px;color:rgba(255,255,255,0.7);font-size:13px;">
          <li>Managed and updated website content for accuracy, relevance, and brand consistency</li>
          <li>Implemented design and functionality improvements to enhance UX</li>
          <li>Optimized website performance including page load speed and usability</li>
          <li>Collaborated with cross-functional teams to troubleshoot website issues</li>
          <li>Maintained operations using CMS platforms and HTML/CSS</li>
        </ul>
      </div>
      <div style="margin-bottom:16px;padding:14px 16px;border-left:2px solid #3c9eff;background:rgba(60,158,255,0.05);border-radius:8px;">
        <strong style="color:#fff;">WINOSA MITRA</strong> – Backend Developer (Internship)
        <ul style="margin-left:20px;margin-top:8px;color:rgba(255,255,255,0.7);font-size:13px;">
          <li>Set up backend architecture: framework init, DB config, env variables, CORS handling</li>
          <li>Designed multi-language-ready DB schemas (ID/EN/NL) for services, portfolio, blog modules</li>
          <li>Developed scalable RESTful APIs with filtering and slug-based access</li>
          <li>Applied ML-based text classification for content categorization</li>
          <li>Built multilingual text processing pipelines for automated tagging</li>
          <li>Integrated email services for contact forms and newsletter subscriptions</li>
        </ul>
      </div>
      <h4 style="color:#3c9eff;margin:20px 0 10px 0;font-family:'Syne',sans-serif;">Website Projects:</h4>
      <div style="margin-bottom:16px;padding:14px 16px;border-left:2px solid #3c9eff;background:rgba(60,158,255,0.05);border-radius:8px;">
        <strong style="color:#fff;">simakpajak.com</strong> – PT Nakahama Handal Konsultama
        <ul style="margin-left:20px;margin-top:8px;color:rgba(255,255,255,0.7);font-size:13px;">
          <li>Built complete website for tax consultation services</li>
          <li>Integrated SEO optimization and responsive design</li>
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

// ─── DEFAULT FEATURED PROJECTS (fallback) ─────────────────────────────────────
const defaultFeaturedProjects = [
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

// ─── FEATURED PROJECT CAROUSEL ────────────────────────────────────────────────
function FeaturedProjectCarousel({ projects = defaultFeaturedProjects }) {
  const [currentProject, setCurrentProject] = useState(0);
  const [imageErrors, setImageErrors] = useState({});

  const project = projects[currentProject];
  const nextProject = () => setCurrentProject((prev) => (prev + 1) % projects.length);
  const prevProject = () => setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  const handleImageError = (projectId) => setImageErrors(prev => ({ ...prev, [projectId]: true }));

  const arrowStyle = {
    width: '44px', height: '44px', borderRadius: '50%',
    background: `rgba(255,60,190,0.1)`, border: `1px solid rgba(255,60,190,0.25)`,
    color: C.accent, fontSize: '1.125rem', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0, transition: 'all 0.25s',
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', minWidth: 0 }}>
        <button onClick={prevProject} style={arrowStyle}
          onMouseEnter={e => { e.currentTarget.style.background = C.accent; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'scale(1.1)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,60,190,0.1)'; e.currentTarget.style.color = C.accent; e.currentTarget.style.transform = 'scale(1)'; }}>
          ←
        </button>

        <div key={currentProject} style={{ flex: 1, minWidth: 0, background: C.surface, borderRadius: '14px', overflow: 'hidden', border: `1px solid ${C.border}`, animation: 'carouselFade 0.3s ease' }}>
          <div className='carousel-img' style={{ width: '100%', overflow: 'hidden', background: '#1a1a1a', position: 'relative' }}>
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
          <div className='carousel-info' style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
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
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(12px)', zIndex: 9000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: '#fff', border: `1px solid ${project.color}25`, borderRadius: '20px', width: '100%', maxWidth: '720px', maxHeight: '85vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', animation: 'modalIn 0.3s ease', boxShadow: `0 24px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.04)` }}>
        {/* Header */}
        <div style={{ padding: '24px 28px', borderBottom: `1px solid #F0F0F0`, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexShrink: 0, background: `linear-gradient(135deg, ${project.color}08, transparent)`, position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: project.color, borderRadius: "20px 20px 0 0" }} />
          <div>
            <div style={{ ...mono, fontSize: '10px', color: project.color, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '8px', fontWeight: 600 }}>Project Details</div>
            <h3 style={{ ...syne, fontSize: '1.375rem', fontWeight: 800, color: C.text, marginBottom: '4px' }}>{project.title}</h3>
            <p style={{ ...dmSans, fontSize: '0.875rem', color: C.textMuted }}>{project.subtitle}</p>
          </div>
          <button onClick={onClose} style={{ background: '#F5F5F5', border: `1px solid #E8E8E8`, borderRadius: '10px', padding: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#FFE8F0'; e.currentTarget.style.borderColor = C.accent + '40'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#F5F5F5'; e.currentTarget.style.borderColor = '#E8E8E8'; }}>
            <Icon d={Icons.x} size={16} color={C.textMuted} />
          </button>
        </div>
        {/* Body */}
        <div style={{ padding: '24px 28px', overflowY: 'auto', overflowX: 'hidden', flex: 1 }} dangerouslySetInnerHTML={{ __html: project.content }} />
      </div>
    </div>
  );
}

// ─── SUBCOMPONENTS ────────────────────────────────────────────────────────────
function XPBar({ label, value, max = 100, color = "#E8197A", delay = 0 }) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setAnimated(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const pct = Math.round((value / max) * 100);
  return (
    <div ref={ref} style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
        <span style={{ ...dmSans, fontSize: 13, color: C.textSub, fontWeight: 500 }}>{label}</span>
        <span style={{ ...mono, fontSize: 11, color, fontWeight: 600 }}>{pct}%</span>
      </div>
      <div style={{ height: 6, background: "#F0F0F0", borderRadius: 6, overflow: "hidden" }}>
        <div style={{ height: "100%", width: animated ? `${pct}%` : "0%", background: `linear-gradient(90deg, ${color}, ${color}90)`, borderRadius: 6, transition: `width 1.2s cubic-bezier(0.4,0,0.2,1) ${delay}ms` }} />
      </div>
    </div>
  );
}

function StatBadge({ iconKey, value, label, color = C.accent }) {
  return (
    <div className="premium-card" style={{ padding: "20px 22px", display: "flex", flexDirection: "column", gap: 8, position: "relative", overflow: "hidden", cursor: "default" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${color}, ${color}60)`, borderRadius: "18px 18px 0 0" }} />
      <div style={{ width: 36, height: 36, borderRadius: 10, background: `${color}12`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon d={Icons[iconKey]} size={18} color={color} />
      </div>
      <span style={{ ...syne, fontSize: 28, fontWeight: 800, color: C.text, lineHeight: 1 }}>{value}</span>
      <span style={{ ...mono, fontSize: 10, color: C.textMuted, textTransform: "uppercase", letterSpacing: 2 }}>{label}</span>
    </div>
  );
}

function SectionTag({ label, color = C.accent }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 16, background: `${color}10`, border: `1px solid ${color}25`, padding: "5px 14px", borderRadius: 20 }}>
      <div style={{ width: 6, height: 6, borderRadius: "50%", background: color, animation: "pulse 2s infinite" }} />
      <span style={{ ...mono, fontSize: 10, color, textTransform: "uppercase", letterSpacing: 2, fontWeight: 600 }}>{label}</span>
    </div>
  );
}

function QuestCard({ title, company, period, status = "completed", tags = [] }) {
  const cfg = { active: { color: C.green, label: "ACTIVE", icon: "play" }, completed: { color: C.blue, label: "DONE", icon: "check" } };
  const s = cfg[status] || cfg.completed;
  return (
    <div style={{ background: "#fff", border: `1px solid #EBEBEB`, borderRadius: 14, padding: "16px 20px", marginBottom: 10, transition: "all 0.22s", cursor: "default", borderLeft: `3px solid ${s.color}`, boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 6px 24px rgba(0,0,0,0.08)`; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 1px 6px rgba(0,0,0,0.04)"; e.currentTarget.style.transform = "none"; }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
        <div style={{ flex: 1 }}>
          <div style={{ ...syne, fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 3 }}>{title}</div>
          <div style={{ ...mono, fontSize: 10, color: C.textMuted, marginBottom: tags.length ? 8 : 0, wordBreak: "break-word" }}>{company}</div>
          {tags.length > 0 && <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>{tags.map(t => <span key={t} style={{ ...mono, fontSize: 9, color: s.color, background: `${s.color}14`, padding: "2px 8px", borderRadius: 20, textTransform: "uppercase", letterSpacing: 0.8 }}>{t}</span>)}</div>}
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
          <span style={{ ...mono, fontSize: 9, color: s.color, background: `${s.color}12`, padding: "3px 9px", borderRadius: 20, display: "flex", alignItems: "center", gap: 4, fontWeight: 600 }}>
            <Icon d={Icons[s.icon]} size={9} color={s.color} strokeWidth={2.5} /> {s.label}
          </span>
          <span style={{ ...mono, fontSize: 9, color: C.textDim, whiteSpace: "normal", textAlign: "right" }}>{period}</span>
        </div>
      </div>
    </div>
  );
}

function OrgCard({ title, period, items }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: "#fff", border: "1px solid #EBEBEB", borderRadius: 14, overflow: "hidden", marginBottom: 10, transition: "box-shadow 0.22s, transform 0.22s", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.08)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 1px 6px rgba(0,0,0,0.04)"; e.currentTarget.style.transform = "none"; }}>
      <div style={{ padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", gap: 12 }} onClick={() => setOpen(!open)}>
        <div style={{ flex: 1 }}>
          <div style={{ ...syne, fontSize: 13, fontWeight: 700, color: C.text, wordBreak: "break-word" }}>{title}</div>
          <div style={{ ...mono, fontSize: 10, color: C.textMuted, marginTop: 3, wordBreak: "break-word" }}>{period}</div>
        </div>
        <div style={{ width: 28, height: 28, borderRadius: "50%", background: `${C.accent}10`, display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 0.2s, background 0.2s", transform: open ? "rotate(45deg)" : "none", flexShrink: 0 }}>
          <Icon d={Icons.plus} size={14} color={C.accent} />
        </div>
      </div>
      {open && (
        <div style={{ borderTop: "1px solid #F5F5F5", padding: "14px 20px 16px", animation: "fadeIn 0.2s ease", background: "#FAFAFA" }}>
          {items.map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.accent, flexShrink: 0, marginTop: 5 }} />
              <span style={{ ...dmSans, fontSize: 13, color: C.textSub, fontWeight: 400 }}>{item}</span>
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
    <div style={{ background: unlocked ? "#fff" : "#FAFAFA", border: `1px solid ${unlocked ? col + "30" : "#EBEBEB"}`, borderRadius: 14, padding: "16px 20px", display: "flex", alignItems: "center", gap: 14, opacity: unlocked ? 1 : 0.4, transition: "all 0.22s", cursor: "default", boxShadow: unlocked ? "0 2px 10px rgba(0,0,0,0.05)" : "none" }}
      onMouseEnter={e => { if (unlocked) { e.currentTarget.style.boxShadow = `0 8px 28px ${col}20`; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.borderColor = col + "60"; }}}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = unlocked ? "0 2px 10px rgba(0,0,0,0.05)" : "none"; e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = unlocked ? col + "30" : "#EBEBEB"; }}>
      <div style={{ width: 46, height: 46, borderRadius: 12, background: unlocked ? `${col}14` : "#F0F0F0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon d={unlocked ? Icons[iconKey] : Icons.lock} size={20} color={unlocked ? col : C.textDim} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <span style={{ ...syne, fontSize: 13, fontWeight: 700, color: unlocked ? C.text : C.textMuted }}>{title}</span>
          <span style={{ ...mono, fontSize: 9, color: col, textTransform: "uppercase", letterSpacing: 1.5, padding: "2px 7px", background: `${col}14`, borderRadius: 20 }}>{rarity}</span>
        </div>
        <span style={{ ...dmSans, fontSize: 12, color: C.textMuted, fontWeight: 400 }}>{desc}</span>
      </div>
    </div>
  );
}

// ─── DEFAULT SKILLS (fallback) ────────────────────────────────────────────────
const defaultSkills = [
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
  { label: "AI / LLM Prompt Engineering", value: 90, color: C.purple },
  { label: "Machine Learning (Basics)", value: 70, color: C.blue },
  { label: "AI Tools & Automation", value: 92, color: C.green },
];

// ─── DEFAULT PROJECT CATEGORIES (fallback) ───────────────────────────────────
const defaultProjectCategories = [
  { id: 'digital-marketing', title: "Digital Marketing", description: "Social media management, paid ads, growth campaigns, and performance analytics across 10+ brands.", color: C.accent, iconKey: "trending", tags: ["Meta Ads", "Google Ads", "Analytics", "Growth Hacking"] },
  { id: 'content-creation', title: "Content Creation", description: "Video production, photography, copywriting, AI tool training, and creative strategy for brands and personal channels.", color: C.purple, iconKey: "video", tags: ["CapCut", "Vibe Coding", "Copywriting", "Script Writing"] },
  { id: 'live-streaming', title: "Live Streaming", description: "Live shopping host and streaming operator with 5K+ concurrent peak viewers across TikTok & Shopee.", color: C.orange, iconKey: "radio", tags: ["TikTok Live", "Shopee Live", "Live Host", "Operations"] },
  { id: 'kol-management', title: "KOL Management", description: "Influencer relations, campaign management, and brand-talent coordination across niches.", color: C.green, iconKey: "users", tags: ["Influencer", "KOL", "Campaign", "Negotiation"] },
  { id: 'web-development', title: "Web Development", description: "PHP, Laravel, React, and CMS projects — backend APIs, website management, edtech platforms, and dashboards.", color: C.blue, iconKey: "code", tags: ["PHP", "Laravel", "React", "JavaScript", "Python"] },
  { id: 'event-organization', title: "Event Organization", description: "Campus events coordinator — PR, bazaar, creative, and fresh money divisions across 11+ UMN events.", color: C.red, iconKey: "flag", tags: ["Event", "PR", "Coordinator", "Campus", "UMN"] },
];

// ─── DEFAULT SETTINGS (fallback) ─────────────────────────────────────────────
const defaultSettings = {
  // ✅ UPDATED: hero subtitle mencerminkan role terbaru dari CV 2026
  hero_subtitle: "Informatics Engineering student at UMN. Corporate Strategy intern @DANA Indonesia × Website intern @Canyon Entertainment × Vibe Coding instructor @SMPLHR × backend dev × AI/ML × UI/UX × digital marketer × content creator × live host. 20+ roles across 5 years. Still leveling up.",
  hero_tags: JSON.stringify(["AI/ML Engineer", "Vibe Coding Instructor", "App Developer", "UI/UX Designer", "Web Dev", "Prompt Engineer", "Digital Marketing", "Content Creator", "Live Host"]),
  about_paragraph_1: "Informatics Engineering student at UMN with a multi-class build: Corporate Strategy Social Tech Intern at DANA Indonesia, Website Management Intern at Canyon Entertainment Group, Vibe Coding Instructor at SMPLHR, backend developer, digital marketer, and content creator. I've worked across 20+ companies — from FinTech giants to AI startups and creative agencies.",
  about_paragraph_2: "Currently running multiple active roles simultaneously while finishing my degree. I thrive in fast-paced, multi-role environments and love building things that are both functional and engaging — from AI-powered web apps to social media growth campaigns.",
  status: "Not Available",
  // ✅ UPDATED: active roles sekarang ada 4 berdasarkan CV (SMPLHR, Canyon, DANA, Winosa Backend)
  active_roles: "4",
  total_companies: "20+",
  peak_viewers: "5K+",
  experience_years: "5yr",
  contact_description: "Currently not available for new roles — heads down finishing my degree and ongoing projects. Feel free to reach out for future collabs though, always down to connect!",
};

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [activeTab, setActiveTab] = useState("current");
  const [selectedProject, setSelectedProject] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);
  const heroRef = useRef(null);

  // Supabase live data (with fallbacks)
  const { data: sbData } = useSupabaseData({
    settings: defaultSettings,
    featuredProjects: defaultFeaturedProjects,
    skills: defaultSkills,
    projectCategories: defaultProjectCategories,
    experiences: [],
    orgActivities: [],
  });

  // Parse settings helpers
  const settings = sbData.settings || defaultSettings;
  const heroSubtitle = settings.hero_subtitle || defaultSettings.hero_subtitle;
  const heroTags = (() => { try { return JSON.parse(settings.hero_tags || defaultSettings.hero_tags); } catch { return ["AI/ML Engineer", "Vibe Coding Instructor", "Digital Marketing", "Web Dev", "Content Creator"]; } })();
  const aboutP1 = settings.about_paragraph_1 || defaultSettings.about_paragraph_1;
  const aboutP2 = settings.about_paragraph_2 || defaultSettings.about_paragraph_2;
  const status = settings.status || "Not Available";
  const activeRoles = settings.active_roles || "4";
  const totalCompanies = settings.total_companies || "20+";
  const peakViewers = settings.peak_viewers || "5K+";
  const expYears = settings.experience_years || "5yr";
  const contactDesc = settings.contact_description || defaultSettings.contact_description;

  // Determine status color
  const isAvailable = status.toLowerCase().includes("available") && !status.toLowerCase().includes("not");
  const statusColor = isAvailable ? C.green : C.red;

  const featuredProjects = sbData.featuredProjects || defaultFeaturedProjects;
  const skills = sbData.skills || defaultSkills;

  // Build projectCategories + projectDetails from Supabase or fallback
  const projectCategories = (sbData.projectCategories || defaultProjectCategories).map(c => ({
    ...c,
    _modalContent: c.modalContent || null,
  }));

  // Build modal data: prefer Supabase modal_content, else fall back to hardcoded projectDetails
  const buildModalData = (cat) => {
    if (cat._modalContent) {
      return {
        title: cat.title,
        subtitle: cat.title + " Portfolio",
        color: cat.color,
        content: cat._modalContent,
      };
    }
    return projectDetails[cat.id] || { title: cat.title, subtitle: cat.title, color: cat.color, content: "<p>No details yet.</p>" };
  };

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const pct = scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      const newXp = Math.round(pct * 4200);
      setXp(newXp);
      setLevel(Math.floor(newXp / 700) + 1);
      setParallaxY(scrollY);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" }, { id: "about", label: "About" },
    { id: "experience", label: "Experience" }, { id: "organizations", label: "Orgs" },
    { id: "skills", label: "Skills" }, { id: "projects", label: "Projects" },
    { id: "achievements", label: "Achievements" }, { id: "contact", label: "Contact" },
  ];

  // ── HARDCODED FALLBACK DATA ──────────────────────────────────────────────────
  // ✅ UPDATED: Sesuai CV 2026 - urutan dari paling baru
  const fallbackCurrentJobs = [
    // ✅ BARU dari CV 2026
    { title: "Vibe Coding Instructor", company: "SMPLHR — Freelance", period: "March 2026 – Present", status: "active", tags: ["AI Tools", "Prompt Engineering", "Teaching", "Claude", "Cursor"] },
    // ✅ BARU dari CV 2026
    { title: "Website Management", company: "CANYON ENTERTAINMENT GROUP — Internship", period: "March 2026 – Present", status: "active", tags: ["CMS", "UX", "HTML/CSS", "Web Ops"] },
    // Sudah ada sebelumnya
    { title: "Corporate Strategy Social Technology", company: "DANA INDONESIA — Internship", period: "Jan 2026 – Present", status: "active", tags: ["Corporate Strategy", "AI/ML", "Automation", "FinTech"] },
    // ✅ Updated: berakhir June 2026 sesuai CV
    { title: "Back End Developer", company: "WINOSA MITRA — Internship", period: "Jan 2026 – June 2026", status: "active", tags: ["Backend", "API", "ML", "Laravel"] },
    // ✅ Updated: sudah selesai April 2026
    { title: "Social Media Marketing Specialist", company: "WINOSA MITRA — Part-Time", period: "June 2025 – April 2026", status: "completed", tags: ["Social Media", "Marketing", "B2B"] },
    { title: "Marketing Manager", company: "XDEMIA — Internship", period: "Nov 2024 – Present", status: "active", tags: ["EdTech", "Marketing", "Management"] },
    { title: "Digital Marketing Executive", company: "MOVEABROAD.CO — Part-Time", period: "Jan 2025 – April 2026", status: "completed", tags: ["Digital Marketing", "Instagram", "TikTok"] },
    { title: "Content Creator", company: "JOKI PROYEK — Freelance", period: "Jan 2025 – Jan 2026", status: "completed", tags: ["Content", "SEO", "Copywriting"] },
  ];

  const fallbackRecentJobs = [
    { title: "Content Creator", company: "CHAMELYONE INTERIORS — Part-Time", period: "Sept 2025 – Feb 2026", status: "completed", tags: ["Content", "Interior", "Video"] },
    { title: "Marketing Director – Head of Sales & Marketing", company: "GENIUS GROWTH AI", period: "Jul 2025 – Nov 2025", status: "completed", tags: ["Leadership", "AI", "Sales", "B2B"] },
    { title: "Human Resources Assistant", company: "PT OAKM TECH INDONESIA — Freelance", period: "Nov 2024 – Jun 2025", status: "completed", tags: ["HR", "Recruitment"] },
    { title: "Content Creator", company: "LEARNRITHM.AI — Internship", period: "Nov 2024 – Jun 2025", status: "completed", tags: ["AI", "EdTech", "Content"] },
    { title: "Content Researcher", company: "MONTIER DESIGN — Contract", period: "Feb 2025 – May 2025", status: "completed", tags: ["Research", "Design"] },
    { title: "Personal Assistant", company: "INDO AQUATIC TRADE — Internship", period: "Nov 2024 – Feb 2025", status: "completed", tags: ["Operations", "SEO", "Blog"] },
    { title: "Social Media Officer", company: "BOTANI BAR — Freelance", period: "Nov 2024 – Jan 2025", status: "completed", tags: ["Social Media", "F&B"] },
    { title: "Content Creator", company: "PERSONAL BRANDING — Part-Time", period: "Oct 2024 – Jan 2025", status: "completed", tags: ["Branding", "Content"] },
  ];

  const fallbackJobs2024 = [
    { title: "Live Streaming Operator", company: "PEGASUS NET TECHNOLOGIES — Full-Time", period: "Sep 2024 – Des 2024", tags: ["Live", "Streaming", "Tech"] },
    { title: "Content Creator", company: "TILIEK CREATIVE AGENCY — Internship", period: "Aug 2024 – Oct 2024", tags: ["Creative", "Agency", "Short-form"] },
    { title: "Social Media Specialist", company: "PT. NAKAHAMA HANDAL KONSULTAMA — Freelance", period: "Jul 2024 – Oct 2024", tags: ["Social Media", "TikTok", "Instagram"] },
    { title: "Live Shopping", company: "PT. SOSIAL BERKAT KREATIF INDONESIA — Internship", period: "Jun 2024 – Sep 2024", tags: ["Live Shopping", "TikTok"] },
    { title: "Social Media Specialist", company: "PT. ACR BERSATU SEJAHTERA — Freelance", period: "Feb 2024 – Jun 2024", tags: ["Social Media"] },
  ];

  const fallbackJobs2023 = [
    { title: "Host Live", company: "CLOUT INDONESIA GROUP — Freelance", period: "Nov 2023 – Jan 2024", tags: ["Live Host", "TikTok", "Shopee"] },
    { title: "KOL Specialist", company: "PT. LANTIH ADHIP GRUP — Freelance", period: "Sep 2023 – Jan 2024", tags: ["KOL", "Influencer"] },
    { title: "Marketing & KOL Specialist", company: "PT. ACR BERSATU SEJAHTERA — Freelance", period: "Apr 2023 – Jun 2023", tags: ["Marketing", "KOL"] },
    { title: "Marketing Specialist", company: "CICISGENK.ID — Freelance", period: "Apr 2023 – Jun 2023", tags: ["Marketing"] },
    { title: "Social Media Specialist", company: "NUGASITUDUIT — Freelance", period: "Oct 2021 – Jul 2023", tags: ["Social Media", "Long-Term"] },
    { title: "Content Marketing", company: "CRAFTBBARO — Freelance", period: "May 2020 – Feb 2023", tags: ["Content", "Marketing", "3yr"] },
  ];

  const fallbackOrganizations = [
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

  // ── BUILD EXPERIENCE DATA: Supabase first, fallback to hardcoded ──
  const sbExperiences = sbData.experiences || [];
  const useSbExperiences = sbExperiences.length > 0;

  const mapSbJob = (e) => ({ title: e.title, company: e.company, period: e.period, status: e.is_active ? "active" : "completed", tags: e.tags || [] });

  const currentJobs = useSbExperiences
    ? sbExperiences.filter(e => e.era === "current").map(mapSbJob)
    : fallbackCurrentJobs;
  const recentJobs = useSbExperiences
    ? sbExperiences.filter(e => e.era === "recent").map(mapSbJob)
    : fallbackRecentJobs;
  const jobs2024 = useSbExperiences
    ? sbExperiences.filter(e => e.era === "2024").map(mapSbJob)
    : fallbackJobs2024;
  const jobs2023 = useSbExperiences
    ? sbExperiences.filter(e => e.era === "2023").map(mapSbJob)
    : fallbackJobs2023;

  const tabData = { current: currentJobs, recent: recentJobs, "2024": jobs2024, "2023": jobs2023 };

  // ── BUILD ORG DATA: Supabase first, fallback to hardcoded ──
  const sbOrgs = sbData.orgActivities || [];
  const organizations = sbOrgs.length > 0 ? sbOrgs : fallbackOrganizations;

  const achievements = [
    { iconKey: "award", title: "Platinum Marketer", desc: "3-year content marketing streak at Craftbbaro", rarity: "legendary", unlocked: true },
    { iconKey: "star", title: "Marketing Director", desc: "Head of Sales & Marketing at Genius Growth AI", rarity: "legendary", unlocked: true },
    { iconKey: "sparkles", title: "Vibe Coding Instructor", desc: "Teaching AI tools & prompt engineering to non-tech professionals at SMPLHR", rarity: "legendary", unlocked: true },
    { iconKey: "trending", title: "Triple-Digit Growth", desc: "Boosted Instagram reach by 93% at MoveAbroad.co", rarity: "epic", unlocked: true },
    { iconKey: "zap", title: "Multi-Tasker", desc: "4+ simultaneous active roles across different companies in 2026", rarity: "epic", unlocked: true },
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
      <div style={{ position: "fixed", inset: 0, zIndex: -1, background: "#F8F9FA" }}>
        <div style={{ position: "absolute", top: "8%", right: "-5%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,25,122,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "-8%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />
      </div>

      {/* ── NAV ─── */}
      <div className="hud-nav" style={{ position: "fixed", top: 0, left: 0, right: 0, background: "rgba(255,255,255,0.90)", backdropFilter: "blur(20px)", borderBottom: "1px solid #EBEBEB", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, padding: "10px 40px", boxShadow: "0 1px 12px rgba(0,0,0,0.06)" }}>
        <div style={{ ...syne, fontWeight: 800, fontSize: 18, color: C.text, letterSpacing: -1 }}>felicia<span style={{ color: C.accent }}>.</span></div>
        <div className="hud-xpbar" style={{ flex: 1, maxWidth: 300 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
            <span style={{ ...mono, fontSize: 9, color: C.textMuted }}>LVL <span style={{ color: C.accent, fontWeight: 600 }}>{level}</span></span>
            <span style={{ ...mono, fontSize: 9, color: C.textMuted }}><span style={{ color: C.accent }}>{currentXp}</span>/{xpToNextLevel} xp</span>
          </div>
          <div style={{ height: 3, background: "#F0F0F0", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${levelProgress}%`, background: `linear-gradient(90deg, ${C.accent}, ${C.purple})`, borderRadius: 2, transition: "width 0.1s" }} />
          </div>
        </div>

        <nav className="hud-nav-links" style={{ display: "flex", gap: 24 }}>
          {navItems.map(n => (
            <a key={n.id} href={`#${n.id}`} style={{ ...mono, fontSize: 10, color: C.textMuted, textDecoration: "none", textTransform: "uppercase", letterSpacing: 1.5, transition: "color 0.2s", fontWeight: 500 }}
              onMouseEnter={e => e.currentTarget.style.color = C.accent}
              onMouseLeave={e => e.currentTarget.style.color = C.textMuted}>{n.label}</a>
          ))}
        </nav>

        <button className="hamburger-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ display: "none", flexDirection: "column", gap: "5px", background: "transparent", border: "none", cursor: "pointer", padding: "4px", flexShrink: 0 }}>
          <span style={{ display: "block", width: 22, height: 2, background: mobileMenuOpen ? C.accent : C.text, borderRadius: 2, transition: "all 0.3s", transform: mobileMenuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
          <span style={{ display: "block", width: 22, height: 2, background: mobileMenuOpen ? "transparent" : C.text, borderRadius: 2, transition: "all 0.3s", opacity: mobileMenuOpen ? 0 : 1 }} />
          <span style={{ display: "block", width: 22, height: 2, background: mobileMenuOpen ? C.accent : C.text, borderRadius: 2, transition: "all 0.3s", transform: mobileMenuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu" style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(255,255,255,0.97)", backdropFilter: "blur(20px)", zIndex: 999, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, animation: "fadeIn 0.2s ease" }}>
          {navItems.map((n, i) => (
            <a key={n.id} href={`#${n.id}`} onClick={() => setMobileMenuOpen(false)}
              style={{ ...syne, fontSize: "clamp(22px, 7vw, 32px)", fontWeight: 700, color: C.textMuted, textDecoration: "none", textTransform: "uppercase", letterSpacing: 2, transition: "all 0.2s", padding: "10px 0" }}
              onMouseEnter={e => { e.currentTarget.style.color = C.accent; e.currentTarget.style.letterSpacing = "4px"; }}
              onMouseLeave={e => { e.currentTarget.style.color = C.textMuted; e.currentTarget.style.letterSpacing = "2px"; }}
            >{n.label}</a>
          ))}
          <div style={{ ...mono, fontSize: 10, color: C.textDim, marginTop: 24, textTransform: "uppercase", letterSpacing: 3 }}>LVL {level} — {currentXp} XP</div>
        </div>
      )}

      {/* ── CONTENT ─── */}
      <div className="main-content" style={{}}>

        {/* HERO — Instagram Profile */}
        <section id="home" ref={heroRef} className="section-mb hero-section" style={{ paddingTop: "72px" }}>

          {/* ── Cover photo with parallax ── */}
          <div className="ig-cover" style={{ marginBottom: 0 }}>
            <div className="ig-cover-bg" style={{
              background: `linear-gradient(135deg, ${C.accent}22 0%, ${C.purple}18 40%, ${C.blue}12 80%)`,
              transform: `translateY(${parallaxY * 0.28}px) scale(1.2)`,
              transition: "transform 0.05s linear",
            }}>
              {/* Floating shapes in banner */}
              <div style={{ position: "absolute", top: "20%", left: "8%", width: 90, height: 90, borderRadius: "50%", background: `${C.accent}22`, transform: `translateY(${parallaxY * -0.12}px)`, transition: "transform 0.05s linear" }} />
              <div style={{ position: "absolute", top: "40%", left: "25%", width: 50, height: 50, borderRadius: "50%", background: `${C.purple}18`, transform: `translateY(${parallaxY * 0.09}px)`, transition: "transform 0.05s linear" }} />
              <div style={{ position: "absolute", top: "15%", right: "12%", width: 70, height: 70, borderRadius: "50%", background: `${C.blue}18`, transform: `translateY(${parallaxY * 0.15}px)`, transition: "transform 0.05s linear" }} />
              <div style={{ position: "absolute", top: "55%", right: "28%", width: 40, height: 40, borderRadius: "50%", background: `${C.orange}20`, transform: `translateY(${parallaxY * -0.08}px)`, transition: "transform 0.05s linear" }} />
              <div style={{ position: "absolute", top: "30%", right: "40%", width: 24, height: 24, borderRadius: "50%", background: `${C.green}20`, animation: "orbFloat 4s ease-in-out infinite" }} />
              {/* Decorative horizontal lines */}
              <div style={{ position: "absolute", bottom: 24, left: 28, right: 28, height: 1, background: `linear-gradient(90deg, transparent, ${C.accent}30, ${C.purple}30, transparent)` }} />
            </div>
          </div>

          {/* ── Profile card ── */}
          <div className="ig-profile-card">

            {/* Avatar + action buttons row */}
            <div className="ig-profile-row" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, marginBottom: 16, paddingTop: 0 }}>

              {/* Avatar (overlaps cover) */}
              <div className="ig-avatar-wrapper" style={{ position: "relative", width: 100, height: 100, marginTop: -50, flexShrink: 0 }}>
                <div className="story-ring-spin" style={{ position: "absolute", inset: -3, background: `conic-gradient(${C.accent}, ${C.purple}, ${C.blue}, ${C.orange}, ${C.accent})`, borderRadius: "50%", zIndex: 0 }} />
                <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#FFFFFF", border: "3px solid #FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>
                  <span className="ig-avatar-inner" style={{ ...syne, fontSize: 32, fontWeight: 800, background: `linear-gradient(135deg, ${C.accent}, ${C.purple})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>FA</span>
                </div>
              </div>

              {/* Action buttons */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 4, flexShrink: 0 }}>
                <a href="https://linkedin.com/in/felicia-annabel-ruriyanto-227a9125b" target="_blank" rel="noopener noreferrer"
                  className="ig-action-btn"
                  style={{ ...syne, fontSize: 13, fontWeight: 600, color: "#fff", background: C.accent, padding: "9px 18px", borderRadius: 10, textDecoration: "none", display: "flex", alignItems: "center", gap: 6, transition: "opacity 0.2s", boxShadow: `0 4px 14px ${C.accent}35`, whiteSpace: "nowrap" }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                  <Icon d={Icons.linkedin} size={13} color="#fff" />
                  <span className="ig-action-btn-text">Connect</span>
                </a>
                <a href="mailto:ffeliciaannabelruriyanto@gmail.com"
                  className="ig-action-btn"
                  style={{ ...syne, fontSize: 13, fontWeight: 600, color: C.text, background: "#EDEDED", padding: "9px 18px", borderRadius: 10, textDecoration: "none", display: "flex", alignItems: "center", gap: 6, transition: "background 0.2s", whiteSpace: "nowrap" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#E0E0E0"}
                  onMouseLeave={e => e.currentTarget.style.background = "#EDEDED"}>
                  <Icon d={Icons.mail} size={13} color={C.textMuted} />
                  <span className="ig-action-btn-text">Message</span>
                </a>
              </div>
            </div>

            {/* Name + stats */}
            <div style={{ transform: `translateY(${parallaxY * -0.02}px)`, transition: "transform 0.05s linear" }}>
              <h1 style={{ ...syne, fontWeight: 800, fontSize: "clamp(22px, 4vw, 36px)", color: C.text, marginBottom: 2, letterSpacing: -0.5, lineHeight: 1.15 }}>
                Felicia Annabel Ruriyanto
              </h1>
              <div style={{ ...mono, fontSize: 12, color: C.textMuted, marginBottom: 16 }}>@felicia.annabel · Tangerang, Indonesia</div>
            </div>

            {/* Instagram-style stats row */}
            <div className="ig-stats-row" style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 18, borderTop: "1px solid #F0F0F0", borderBottom: "1px solid #F0F0F0", padding: "14px 0" }}>
              {[
                { value: totalCompanies, label: "Companies" },
                { value: expYears, label: "Experience" },
                { value: activeRoles, label: "Roles" },
                { value: peakViewers, label: "Peak Views" },
              ].map(({ value, label }, i) => (
                <div key={label} className="ig-stat-item" style={{ display: "flex", alignItems: "center", flex: 1 }}>
                  {i > 0 && <div className="ig-stat-divider" />}
                  <div style={{ flex: 1, textAlign: "center" }}>
                    <div style={{ ...syne, fontSize: "clamp(18px, 3vw, 26px)", fontWeight: 700, color: C.text, lineHeight: 1, letterSpacing: -0.5 }}>{value}</div>
                    <div style={{ ...dmSans, fontSize: 11, color: C.textMuted, marginTop: 4, letterSpacing: 0 }}>{label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bio */}
            <div className="ig-bio-row" style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 20 }}>
              <p style={{ ...dmSans, fontSize: 14, color: C.textSub, lineHeight: 1.75, fontWeight: 400, maxWidth: 580 }}>{heroSubtitle}</p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
                {heroTags.map(tag => (
                  <span key={tag} style={{ ...mono, fontSize: 10, color: C.accent, border: `1px solid ${C.accent}30`, padding: "4px 11px", borderRadius: 20, textTransform: "uppercase", letterSpacing: 0.8, background: `${C.accent}08`, transition: "all 0.2s", cursor: "default" }}
                    onMouseEnter={e => { e.currentTarget.style.background = C.accent; e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = `${C.accent}08`; e.currentTarget.style.color = C.accent; }}
                  >{tag}</span>
                ))}
              </div>

              {/* Status indicator */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: statusColor, animation: "pulse 2s infinite" }} />
                <span style={{ ...mono, fontSize: 10, color: statusColor, textTransform: "uppercase", letterSpacing: 2 }}>{status}</span>
              </div>
            </div>

            {/* Story Highlights */}
            <div style={{ borderTop: "1px solid #F0F0F0", paddingTop: 20 }}>
              <div style={{ ...mono, fontSize: 10, color: C.textMuted, textTransform: "uppercase", letterSpacing: 2, marginBottom: 16 }}>Highlights</div>
              <div className="stories-row" style={{ display: "flex", gap: 20, paddingBottom: 4 }}>
                {projectCategories.map((cat) => (
                  <a key={cat.id} href="#projects" className="story-circle"
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flexShrink: 0, textDecoration: "none" }}>
                    <div style={{ width: 66, height: 66, borderRadius: "50%", background: `linear-gradient(135deg, ${cat.color}, ${cat.color}70)`, padding: 2.5 }}>
                      <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "#FFFFFF", border: "2px solid #FFFFFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Icon d={Icons[cat.iconKey]} size={22} color={cat.color} />
                      </div>
                    </div>
                    <span style={{ ...mono, fontSize: 9, color: C.textMuted, textTransform: "uppercase", letterSpacing: 0.5, textAlign: "center", maxWidth: 66, lineHeight: 1.3 }}>{cat.title.split(' ')[0]}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="section-mb" style={{ position: "relative", overflow: "hidden" }}>
          {/* Parallax accent blob */}
          <div className="parallax-orb" style={{ top: -60, right: -80, width: 360, height: 360, background: `radial-gradient(circle, ${C.accent}08 0%, transparent 70%)`, transform: `translateY(${Math.max(0, parallaxY - 400) * 0.12}px)` }} />
          <SectionTag label="About" color={C.accent} />
          <div className="about-grid" style={{}}>
            <div>
              <h2 style={{ ...syne, fontSize: "clamp(26px, 5vw, 38px)", fontWeight: 800, color: C.text, marginBottom: 24, letterSpacing: -1.5 }}>Who am I</h2>
              <p style={{ ...dmSans, fontSize: 15, color: C.textSub, lineHeight: 1.95, fontWeight: 300, marginBottom: 20 }}>
                {aboutP1}
              </p>
              <p style={{ ...dmSans, fontSize: 15, color: C.textSub, lineHeight: 1.95, fontWeight: 300 }}>
                {aboutP2}
              </p>
              <div style={{ marginTop: 36, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                {[
                  { label: "University", value: "Multimedia Nusantara University" },
                  { label: "Major", value: "Informatics Engineering" },
                  { label: "Location", value: "Tangerang, Banten" },
                  { label: "Status", value: status },
                ].map(({ label, value }) => (
                  <div key={label} style={{ background: "#fff", border: "1px solid #EBEBEB", borderRadius: 12, padding: "14px 18px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                    <div style={{ ...mono, fontSize: 9, color: C.textMuted, textTransform: "uppercase", letterSpacing: 2, marginBottom: 6 }}>{label}</div>
                    <div style={{ ...syne, fontSize: 13, fontWeight: 700, color: C.text }}>{value}</div>
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
        <section id="experience" className="section-mb" style={{}}>
          <SectionTag label="Experience" color={C.green} />
          <h2 style={{ ...syne, fontSize: "clamp(26px, 5vw, 38px)", fontWeight: 800, color: C.text, marginBottom: 8, letterSpacing: -1.5 }}>Experience Timeline</h2>
          <p style={{ ...dmSans, fontSize: 14, color: C.textSub, marginBottom: 32, fontWeight: 300 }}>20+ roles across 5 years. Filter by era.</p>
          <div style={{ display: "flex", gap: 8, marginBottom: 32, flexWrap: "wrap" }}>
            {tabConfig.map(({ key, label, color }) => (
              <button key={key} onClick={() => setActiveTab(key)} style={{ ...mono, fontSize: 10, padding: "7px 16px", borderRadius: 8, border: `1px solid ${activeTab === key ? color : "rgba(255,255,255,0.12)"}`, background: activeTab === key ? color + "22" : "transparent", color: activeTab === key ? color : C.textMuted, cursor: "pointer", textTransform: "uppercase", letterSpacing: 1.5, transition: "all 0.2s" }}>{label}</button>
            ))}
          </div>
          <div className="experience-grid" style={{}}>  
            {(tabData[activeTab] || []).map((j, i) => (
              <QuestCard key={i} {...j} status={j.status || (activeTab === "current" ? "active" : "completed")} />
            ))}
          </div>
        </section>

        {/* ORGANIZATIONS */}
        <section id="organizations" className="section-mb" style={{}}>
          <SectionTag label="Organizations" color={C.purple} />
          <h2 style={{ ...syne, fontSize: "clamp(26px, 5vw, 38px)", fontWeight: 800, color: C.text, marginBottom: 8, letterSpacing: -1.5 }}>Organizational Activity</h2>
          <p style={{ ...dmSans, fontSize: 14, color: C.textSub, marginBottom: 40, fontWeight: 300 }}>Campus events, volunteer work, and committee roles — click to expand.</p>
          <div className="org-grid" style={{}}>  
            {organizations.map((org, i) => <OrgCard key={i} {...org} />)}
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="section-mb" style={{ position: "relative", overflow: "hidden" }}>
          <div className="parallax-orb" style={{ top: -40, right: -80, width: 340, height: 340, background: `radial-gradient(circle, ${C.blue}08 0%, transparent 70%)`, transform: `translateY(${Math.max(0, parallaxY - 1600) * 0.09}px)` }} />
          <SectionTag label="Skills" color={C.blue} />
          <h2 style={{ ...syne, fontSize: "clamp(26px, 5vw, 38px)", fontWeight: 800, color: C.text, marginBottom: 8, letterSpacing: -1.5 }}>Tools & Tech Stack</h2>
          <p style={{ ...dmSans, fontSize: 14, color: C.textSub, marginBottom: 40, fontWeight: 300 }}>Software, platforms, and skills in active daily use.</p>
          <div className="skills-grid" style={{}}>  
            {[
              { cat: "Marketing", items: ["Meta Ads Manager", "Google Analytics", "TikTok Ads", "Social Blade", "TikTok Studio", "Instagram Insights", "Canva"], color: C.accent, iconKey: "trending" },
              { cat: "Content & Creative", items: ["CapCut", "Video Editing", "Copywriting", "Content Strategy", "Live Production", "SEO Writing", "Script Writing"], color: C.purple, iconKey: "video" },
              { cat: "Development", items: ["PHP", "Laravel", "JavaScript", "HTML/CSS", "React", "Python", "Kotlin", "Git", "VS Code"], color: C.blue, iconKey: "code" },
              // ✅ UPDATED: tambah Vibe Coding tools dari CV
              { cat: "AI & Vibe Coding", items: ["ChatGPT", "Claude (Anthropic)", "Gemini", "Cursor", "v0", "Replit", "Prompt Engineering", "LLM Workflows", "AI Content Generation"], color: C.purple, iconKey: "sparkles" },
              { cat: "Design & Prototyping", items: ["Figma", "UI/UX Design", "Wireframing", "Prototyping", "Design Systems", "Responsive Layouts", "Adobe Express"], color: C.accent, iconKey: "monitor" },
              { cat: "Machine Learning", items: ["Python (Scikit-learn)", "Data Preprocessing", "Model Basics", "Jupyter Notebook", "Pandas / NumPy", "AI Automation Tools", "Text Classification"], color: C.green, iconKey: "cpu" },
            ].map(({ cat, items, color, iconKey }) => (
              <div key={cat} className="premium-card" style={{ padding: 24, position: "relative", overflow: "hidden" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = color + "40"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#EBEBEB"; }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: color }} />
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                  <Icon d={Icons[iconKey]} size={14} color={color} />
                  <span style={{ ...mono, fontSize: 10, color, textTransform: "uppercase", letterSpacing: 2 }}>{cat}</span>
                </div>
                {items.map(item => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: color, flexShrink: 0, opacity: 0.7 }} />
                    <span style={{ ...dmSans, fontSize: 13, color: C.textSub, fontWeight: 400 }}>{item}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS / INVENTORY */}
        <section id="projects" className="section-mb" style={{ position: "relative", overflow: "hidden" }}>
          <div className="parallax-orb" style={{ top: -80, left: -100, width: 400, height: 400, background: `radial-gradient(circle, ${C.orange}08 0%, transparent 70%)`, transform: `translateY(${Math.max(0, parallaxY - 2000) * 0.1}px)` }} />
          <SectionTag label="Projects" color={C.orange} />
          <h2 style={{ ...syne, fontSize: "clamp(26px, 5vw, 38px)", fontWeight: 800, color: C.text, marginBottom: 8, letterSpacing: -1.5 }}>Project Categories</h2>
          <p style={{ ...dmSans, fontSize: 14, color: C.textMuted, marginBottom: 40, fontWeight: 400 }}>6 domains across 5 years of work experience.</p>

          {/* ── FEATURED CAROUSEL ── */}
          <div className='featured-card' style={{ background: "#fff", border: "1px solid #EBEBEB", borderRadius: 20, padding: '28px', marginBottom: 40, boxShadow: "0 2px 20px rgba(0,0,0,0.06)", position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${C.accent}, ${C.purple}, ${C.blue})`, borderRadius: "20px 20px 0 0" }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: C.accent, animation: 'pulse 2s infinite' }} />
              <span style={{ ...mono, fontSize: '11px', color: C.accent, textTransform: 'uppercase', letterSpacing: '3px', fontWeight: 600 }}>Featured Projects</span>
            </div>
            <FeaturedProjectCarousel projects={featuredProjects} />
          </div>

          {/* ── CATEGORY CARDS ── */}
          <div className="category-grid" style={{}}>
            {projectCategories.map((p) => (
              <div key={p.id}
                className="premium-card"
                onClick={() => setSelectedProject(buildModalData(p))}
                style={{ padding: '24px', cursor: "pointer", position: 'relative', overflow: 'hidden' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = p.color + "50"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#EBEBEB"; }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: p.color }} />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: p.color + "20", display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 16px ${p.color}20` }}>
                    <Icon d={Icons[p.iconKey]} size={18} color={p.color} />
                  </div>
                  <div style={{ ...mono, fontSize: '9px', color: p.color, background: p.color + "18", padding: "3px 9px", borderRadius: 4, textTransform: 'uppercase', letterSpacing: 1.5, border: `1px solid ${p.color}30` }}>View Details</div>
                </div>
                <div style={{ ...syne, fontSize: 15, fontWeight: 700, color: C.text, marginBottom: '8px', wordBreak: 'break-word' }}>{p.title}</div>
                <div style={{ ...dmSans, fontSize: 12, color: C.textSub, fontWeight: 300, lineHeight: 1.7, marginBottom: '14px' }}>{p.description}</div>
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                  {p.tags.map(t => <span key={t} style={{ ...mono, fontSize: 9, color: C.textMuted, padding: "3px 8px", border: "1px solid #EBEBEB", borderRadius: 20, background: "#F8F8F8" }}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>

          {/* ── INSTAGRAM POST GRID ── */}
          <div style={{ marginTop: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
              </svg>
              <span style={{ ...mono, fontSize: 10, color: C.textMuted, textTransform: "uppercase", letterSpacing: 2 }}>Posts · {featuredProjects.length}</span>
              <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, rgba(255,255,255,0.08), transparent)` }} />
            </div>
            <div className="ig-posts-grid">
              {featuredProjects.map((p, i) => (
                <div key={p.id || i} className="ig-post-item" style={{ animationDelay: `${i * 0.04}s`, animation: "igPostReveal 0.5s ease both" }}>
                  {p.img ? (
                    <img src={p.img} alt={p.title} onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                  ) : null}
                  <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg, ${C.accent}18, ${C.purple}18)`, display: p.img ? "none" : "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>
                    {["📊","🎬","🖥️","💼","🌐","📱","🤖","🎯","💡","🛒","🎨","📅"][i % 12]}
                  </div>
                  <div className="ig-post-overlay">
                    <div style={{ ...syne, fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 5 }}>{p.title}</div>
                    <div style={{ ...mono, fontSize: 9, color: C.accent, textTransform: "uppercase", letterSpacing: 1 }}>{p.category}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ACHIEVEMENTS */}
        <section id="achievements" className="section-mb" style={{ position: "relative", overflow: "hidden" }}>
          <div className="parallax-orb" style={{ top: -60, left: -60, width: 320, height: 320, background: `radial-gradient(circle, ${C.purple}08 0%, transparent 70%)`, transform: `translateY(${Math.max(0, parallaxY - 2800) * 0.1}px)` }} />
          <SectionTag label="Achievements" color={C.accent} />
          <h2 style={{ ...syne, fontSize: "clamp(26px, 5vw, 38px)", fontWeight: 800, color: C.text, marginBottom: 8, letterSpacing: -1.5 }}>Badges Earned</h2>
          <p style={{ ...dmSans, fontSize: 14, color: C.textSub, marginBottom: 40, fontWeight: 300 }}>Milestones unlocked from real-world missions.</p>
          <div className="achievements-grid" style={{}}>  
            {achievements.map((a, i) => <AchievementBadge key={i} {...a} />)}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section-mb" style={{}}>
          <SectionTag label="Contact" color={C.green} />
          <h2 style={{ ...syne, fontSize: "clamp(26px, 5vw, 38px)", fontWeight: 800, color: C.text, marginBottom: 40, letterSpacing: -1.5 }}>Get in Touch</h2>
          <div className="contact-grid" style={{}}>  
            <div>
              <p style={{ ...dmSans, fontSize: 15, color: C.textSub, lineHeight: 1.9, fontWeight: 300, marginBottom: 32 }}>
                {contactDesc}
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {[status, "Currently Studying", "Focused Mode", "DM for Future Collabs"].map(label => (
                  <span key={label} style={{ ...mono, fontSize: 10, display: "flex", alignItems: "center", gap: 6, color: statusColor, background: statusColor + "15", padding: "6px 12px", borderRadius: 6, textTransform: "uppercase", letterSpacing: 1, border: `1px solid ${statusColor}30` }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: statusColor }} />{label}
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
                  <div style={{ background: "#fff", border: "1px solid #EBEBEB", borderRadius: 14, padding: "15px 20px", display: "flex", alignItems: "center", gap: 14, transition: "all 0.22s", cursor: href ? "pointer" : "default", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}
                    onMouseEnter={e => { if (href) { e.currentTarget.style.borderColor = C.accent + "40"; e.currentTarget.style.boxShadow = `0 6px 24px ${C.accent}14`; e.currentTarget.style.transform = "translateY(-2px)"; }}}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "#EBEBEB"; e.currentTarget.style.boxShadow = "0 1px 6px rgba(0,0,0,0.04)"; e.currentTarget.style.transform = "none"; }}>
                    <Icon d={Icons[iconKey]} size={16} color={C.accent} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ ...mono, fontSize: 9, color: C.textMuted, textTransform: "uppercase", letterSpacing: 2, marginBottom: 3 }}>{label}</div>
                      <div style={{ ...dmSans, fontSize: 13, color: C.text, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{value}</div>
                    </div>
                    {href && <Icon d={Icons.arrowUpRight} size={14} color={C.textDim} />}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <div className="footer-bar" style={{ borderTop: "1px solid #EBEBEB", paddingTop: 40, marginTop: 20 }}>
          <span style={{ ...mono, fontSize: 11, color: C.textDim }}>Felicia Annabel Ruriyanto — 2026</span>
          <span style={{ ...mono, fontSize: 11, color: C.textDim }}>LVL <span style={{ color: C.accent }}>{level}</span> · {xp} XP</span>
          <span style={{ ...mono, fontSize: 11, color: C.textDim }}>Digital Marketer × Developer × AI Instructor</span>
        </div>
      </div>

      {/* PROJECT DETAIL MODAL */}
      {selectedProject && (
        <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </>
  );
}