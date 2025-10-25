import { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import ProfileSection from './components/ProfileSection.jsx';
import ExperienceCard from './components/ExperienceCard.jsx';
import ContactCard from './components/ContactCard.jsx';
import SkillsCard from './components/SkillsCard.jsx';
import ProjectFolder from './components/ProjectFolder.jsx';
import SplitText from './components/SplitText.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import Modal from './components/Modal.jsx';
import { projectDetails } from './data/projectDetails.js';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = (window.scrollY / documentHeight) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentExperiences = [
    {
      title: "Content Creator",
      company: "CHAMELYONE INTERIORS - Part-Time",
      period: "Sept 2025 - Present",
      responsibilities: [
        "Conceptualized and executed on-site photo and video content, increasing audience engagement by 68% within two months",
        "Captured and edited storytelling visuals that enhanced campaign visibility by 74%",
        "Developed creative scripts and narrative videos that strengthened client brand awareness",
        "Managed paid ad campaigns that improved conversion rate by 41% while reducing cost per result by 22%"
      ]
    },
    {
      title: "Marketing Director – Head of Sales & Marketing",
      company: "GENIUS GROWTH AI",
      period: "Jul 2025 - Present",
      responsibilities: [
        "Spearheaded full-cycle marketing and sales operations for the launch of Genius Growth AI, achieving 400+ early sign-ups in the first month",
        "Led ad campaigns and sales initiatives that generated a 3.2× increase in leads and a 56% engagement uplift",
        "Directed creative production including video scripting, editing, and pitching materials that reached 10K+ organic views",
        "Secured five B2B partnerships through client presentations and optimized pitch decks",
        "Managed a cross-functional team of five and improved sales response time by 37% through optimized CRM systems"
      ]
    },
    {
      title: "Social Media Marketing Specialist",
      company: "WINOSA MITRA - Part-Time",
      period: "June 2025 - Present",
      responsibilities: [
        "Designed and implemented content strategies that increased B2B inquiries by 62%",
        "Produced and managed video campaigns viewed by over 15K+ audiences across platforms",
        "Developed paid ad funnels that reduced acquisition cost by 28% and improved click-through rate by 1.7×",
        "Delivered actionable marketing insights that attracted three new long-term clients"
      ]
    },
    {
      title: "Content Creator",
      company: "JOKI PROYEK - Freelance",
      period: "Jan 2025 - Present",
      responsibilities: [
        "Conducted audience research and content testing that increased website traffic by 78%",
        "Produced SEO-optimized copy and scripts that improved organic reach by 2.3×",
        "Created ad copies and taglines that enhanced engagement by 65% within 3 months",
        "Refined editorial strategies using data analysis, sustaining a 30% MoM growth in engagement"
      ]
    },
    {
      title: "Digital Marketing Executive",
      company: "MOVEABROAD.CO - Part-time",
      period: "Jan 2025 - Present",
      responsibilities: [
        "Planned and executed social media strategies that boosted Instagram reach by 93% and TikTok views by 30%",
        "Managed consistent publishing of 7–10 Instagram posts and 5–7 TikTok videos weekly",
        "Conducted competitor analysis and trend mapping, improving hashtag performance by 40%",
        "Coordinated influencer collaborations that expanded campaign reach to 10K+ viewers"
      ]
    },
    {
      title: "Digital Marketing",
      company: "XDEMIA - Internship",
      period: "Nov 2024 - Present",
      responsibilities: [
        "Created daily content across multiple platforms, resulting in a 35% growth in engagement rate",
        "Designed content strategies that increased audience retention by 1.5×",
        "Wrote SEO-driven articles and social posts generating +10% monthly impressions",
        "Streamlined social media workflows and analytics reporting"
      ]
    }
  ];

  const recentExperiences = [
    {
      title: "Human Resources Assistant",
      company: "PT OAKM TECH INDONESIA - Freelance",
      period: "Nov 2024 - Jun 2025",
      responsibilities: [
        "Assisted in screening and evaluating over 10+ candidates for live stream host roles",
        "Coordinated interviews and skill assessments that reduced recruitment time by 35%",
        "Provided clear communication and updates to applicants, maintaining 98% satisfaction rate",
        "Developed candidate tracking sheets that improved data accuracy in hiring reports"
      ]
    },
    {
      title: "Content Creator",
      company: "LEARNRITHM.AI - Internship",
      period: "Nov 2024 - Jun 2025",
      responsibilities: [
        "Produced industry-relevant video content that increased viewer engagement by 82%",
        "Researched and generated new creative formats aligned with AI and education trends",
        "Edited and optimized videos for SEO, resulting in 1.6× higher watch time",
        "Collaborated with marketing teams to maintain a consistent tone and message"
      ]
    },
    {
      title: "Content Researcher",
      company: "MONTIER DESIGN - Contract",
      period: "Feb 2025 - May 2025",
      responsibilities: [
        "Researched creative design trends to develop data-backed content strategies",
        "Created and optimized multimedia content that raised engagement by 64%",
        "Enhanced SEO performance on blog content, leading to a 40% increase in organic reach"
      ]
    },
    {
      title: "Personal Assistant",
      company: "INDO AQUATIC TRADE - Internship",
      period: "Nov 2024 - Feb 2025",
      responsibilities: [
        "Managed website and social media posting schedules that boosted engagement by 72%",
        "Developed SEO-optimized blog content, increasing organic traffic by 58% within two months",
        "Produced multimedia assets that enhanced brand visibility across 5 social platforms",
        "Supported CEO's personal branding strategy, contributing to a 2.5× rise in follower growth"
      ]
    },
    {
      title: "Social Media Officer",
      company: "BOTANI BAR - Freelance",
      period: "Nov 2024 - Jan 2025",
      responsibilities: [
        "Developed and scheduled weekly content that drove a 66% increase in audience reach",
        "Repurposed Instagram assets for TikTok campaigns, generating 45% higher engagement",
        "Monitored analytics and adapted content strategies, improving performance by 1.8×"
      ]
    },
    {
      title: "Content Creator",
      company: "PERSONAL BRANDING - Part-Time",
      period: "Oct 2024 - Jan 2025",
      responsibilities: [
        "Designed monthly content strategies resulting in 30% improvement in audience retention",
        "Created cross-platform content that grew engagement by 2×",
        "Conducted performance analysis and optimized campaigns for consistent growth"
      ]
    }
  ];

  const year2024Experiences = [
    {
      title: "Live Streaming Operator",
      company: "PEGASUS NET TECHNOLOGIES - Full-Time",
      period: "Sep 2024 - Des 2024",
      responsibilities: [
        "Operated and optimized live streaming setups, maintaining 99% uptime across all broadcasts",
        "Assisted hosts in engaging viewers, resulting in a 60% increase in real-time audience participation",
        "Troubleshot technical issues during live sessions, ensuring uninterrupted streaming",
        "Promoted live streams across social media, achieving 5K+ concurrent viewers on key sessions"
      ]
    },
    {
      title: "Content Creator",
      company: "TILIEK CREATIVE AGENCY - Internship",
      period: "Aug 2024 - Oct 2024",
      responsibilities: [
        "Filmed and produced short-form content (Reels/TikTok) that boosted client visibility by 33%",
        "Directed talent during shoots to ensure brand-aligned storytelling and consistent visuals",
        "Edited and optimized video output, resulting in a 20% increase in engagement rates"
      ]
    },
    {
      title: "Social Media Specialist",
      company: "PT.NAKAHAMA HANDAL KONSULTAMA - Freelance",
      period: "Jul 2024 - Oct 2024",
      responsibilities: [
        "Designed and managed TikTok & Instagram campaigns, increasing impressions by 32%",
        "Built and launched company website simakpajak.com, integrating SEO and responsive design",
        "Developed editorial calendars improving scheduling efficiency by 35%",
        "Conducted engagement analytics weekly, optimizing strategies for 1.6× higher CTR"
      ]
    },
    {
      title: "Live Shopping",
      company: "PT. SOSIAL BERKAT KREATIF INDONESIA - Internship",
      period: "Jun 2024 - Sep 2024",
      responsibilities: [
        "Organized live shopping sessions that increased viewer retention by 42%",
        "Developed creative sales concepts that drove a 55% rise in product purchase conversion",
        "Managed inventory during live sessions, ensuring smooth product flow",
        "Implemented real-time engagement strategies that boosted live chat interactions by 3×"
      ]
    },
    {
      title: "Social Media Specialist",
      company: "PT. ACR BERSATU SEJAHTERA - Freelance",
      period: "Feb 2024 - Jun 2024",
      responsibilities: [
        "Executed Instagram and TikTok content strategies that increased reach by 78% and engagement by 65%",
        "Designed monthly editorial calendars (MOD) to ensure consistency and campaign alignment",
        "Developed and optimized copywriting that improved click-through rate by 1.9×",
        "Analyzed weekly insights and refined strategies to drive 40% growth in audience retention"
      ]
    }
  ];

  const year2023Experiences = [
    {
      title: "Host Live",
      company: "CLOUT INDONESIA GROUP - Freelance",
      period: "Nov 2023 - Jan 2024",
      responsibilities: [
        "Hosted daily live sessions on TikTok and Shopee, averaging 5K+ viewers per session",
        "Promoted partner products effectively, increasing live-stream sales by 112%",
        "Enhanced audience engagement through interactive discussions, leading to 3× comment participation",
        "Consistently maintained 8-hour sessions, achieving the brand's highest viewer retention"
      ]
    },
    {
      title: "KOL Specialist",
      company: "PT. LANTIH ADHIP GRUP - Freelance",
      period: "Sep 2023 - Jan 2024",
      responsibilities: [
        "Built and managed influencer relationships that expanded campaign reach",
        "Designed sales and collaboration plans that improved ROI",
        "Analyzed KOL performance metrics to optimize partnership selection",
        "Acted as liaison between KOLs and company teams"
      ]
    },
    {
      title: "Marketing Specialist & KOL Specialist",
      company: "PT. ACR BERSATU SEJAHTERA - Freelance",
      period: "Apr 2023 - Jun 2023",
      responsibilities: [
        "Created and executed social media campaigns that boosted impressions by 91%",
        "Managed influencer collaborations, leading to a 70% increase in engagement rates",
        "Wrote high-converting captions that enhanced audience interaction by 45%",
        "Maintained 100% response rate to audience inquiries"
      ]
    },
    {
      title: "Marketing Specialist",
      company: "CICISGENK.ID - Freelance",
      period: "Apr 2023 - Jun 2023",
      responsibilities: [
        "Developed and scheduled TikTok and Instagram content that increased follower count by 64%",
        "Created data-driven content plans that improved visibility by 1.7×",
        "Wrote captions and marketing copy consistent with brand voice"
      ]
    }
  ];

  const longTermExperiences = [
    {
      title: "Social Media Specialist",
      company: "NUGASITUDUIT - Freelance",
      period: "Oct 2021 - Jul 2023",
      responsibilities: [
        "Managed educational content creation that grew audience reach by 92% across platforms",
        "Designed and executed content calendars ensuring consistent posting",
        "Improved overall engagement by 2.4× through interactive posts and community engagement"
      ]
    },
    {
      title: "Content Marketing",
      company: "CRAFTBBARO - Freelance",
      period: "May 2020 - Feb 2023",
      responsibilities: [
        "Planned and executed content strategies that increased followers by 150% and engagement by 2×",
        "Developed content plans focused on brand storytelling, improving customer retention by 58%",
        "Wrote persuasive copy and engaging captions that enhanced social traction",
        "Delivered creative campaigns that positioned Craftbbaro as a recognized niche brand"
      ]
    }
  ];

  const contacts = [
    { icon: "📧", text: "ffeliciaannabelruriyanto@gmail.com", copyable: true },
    { icon: "📱", text: "+62 877-3678-6969", copyable: true },
    { icon: "💼", text: "linkedin.com/in/felicia-annabel-ruriyanto", link: "https://linkedin.com/in/felicia-annabel-ruriyanto-227a9125b" },
    { icon: "📍", text: "Kab. Tangerang, Pagedangan, Banten" }
  ];

  const softwareTools = [
    { name: "Canva", color: "#00C4CC" },
    { name: "CapCut", color: "#000000" },
    { name: "MS Office", color: "#2B579A" },
    { name: "Notion", color: "#000000" },
    { name: "Trello", color: "#0066FF" },
    { name: "Social Blade", color: "#FF6B6B" }
  ];

  const programmingTools = [
    { name: "VS Code", color: "#007ACC" },
    { name: "PHP", color: "#777BB4" },
    { name: "HTML", color: "#E34F26" },
    { name: "Laravel", color: "#FF2D20" },
    { name: "JS", color: "#F7DF1E", textColor: "#000" },
    { name: "C", color: "#A8B9CC", textColor: "#000" },
    { name: "Kotlin", color: "#7F52FF" },
    { name: "Python", color: "#3776AB" }
  ];

  const skills = [
    "Social Media Management", "Content Creation", "Copywriting",
    "Video Editing", "Data Analysis", "SEO Optimization",
    "Public Speaking", "Marketing Campaigns",
    "Customer Relationship Management", "Design",
    "Networking", "Problem Solving", "Live Streaming",
    "Influencer Relations", "Campaign Strategy"
  ];

  const organizations = [
    {
      title: "Coordinator of Fresh Money Division",
      period: "Serah Tahunan UKM UMN 2025 - Nov 2025",
      items: [
        "Lead the Fresh Money Division team in managing financial transactions",
        "Supervised fundraising activities through paid promotions and bazaars",
        "Developed creative fundraising ideas to generate organizational income"
      ]
    },
    {
      title: "Public Relations Coordinator",
      period: "Perkenalan Prodi Informatika UMN 2025 - Sept 2025",
      items: [
        "Lead the PR Division for Informatics Program Introduction event",
        "Created and supervised content plans, scripts, and video production",
        "Directed team talents and coordinated full production process"
      ]
    },
    {
      title: "Coordinator of Fresh Money Division",
      period: "Ready To Love Qorie UMN 2025 - April 2025",
      items: [
        "Lead Fresh Money Division team to achieve revenue goals",
        "Supervised financial operations and bookkeeping",
        "Organized promotional content for fundraising activities"
      ]
    },
    {
      title: "Staff of Public Relation",
      period: "Infinite UMN 2024 - Oct 2024",
      items: [
        "Copywriting for social media",
        "Creating content ideas and implementing them"
      ]
    },
    {
      title: "Staff of Fresh Money & Bazaar",
      period: "Hansan Festival & Euforia UMN 2024 - Oct 2024",
      items: [
        "Reaching out tenants to join events",
        "Conduct negotiations and discussions with tenants"
      ]
    },
    {
      title: "Staff of Content Creator",
      period: "Teman Ambiss Periode 3 - March 2024",
      items: [
        "Creating content and scripts for social media",
        "Editing videos for scheduled content"
      ]
    },
    {
      title: "Staff of Public Relation",
      period: "UMN Technology Festival 2024 - March 2024",
      items: [
        "Prepare interactive content for social media",
        "Reaching out media partners"
      ]
    },
    {
      title: "Staff of Public Relation",
      period: "Serah Tahunan UMN 2023 - Oct 2023",
      items: [
        "Create interactive content and captions",
        "Create and edit videos for event series"
      ]
    },
    {
      title: "Staff of Fresh Money",
      period: "Manifest UMN 2023 - Oct 2023",
      items: [
        "Looking for tenants and sponsors",
        "Making proposals for sponsorships"
      ]
    },
    {
      title: "Staff of Creative & Design",
      period: "Ultima Toys Custom Championship - Sep 2023",
      items: [
        "Manage design for Instagram feeds",
        "Evaluate each design created"
      ]
    },
    {
      title: "Volunteer",
      period: "Voluntrip Kampung Pemulung By KitaBisa - Aug 2023",
      items: [
        "Prepare and evaluate programs for 20 person capacity",
        "Manage communication with community",
        "Cooperate with external parties for comparative studies"
      ]
    }
  ];

  const projects = [
    { id: 'digital-marketing', title: 'DIGITAL MARKETING', description: 'Social Media Management & Content Strategy untuk berbagai brand', color: '#3498DB', number: '1' },
    { id: 'content-creation', title: 'CONTENT CREATION', description: 'Video Production, Photography & Creative Writing', color: '#EC8DB5', number: '2' },
    { id: 'live-streaming', title: 'LIVE STREAMING', description: 'Live Shopping Host & Streaming Operations', color: '#E85D5D', number: '3' },
    { id: 'kol-management', title: 'KOL MANAGEMENT', description: 'Influencer Relations & Campaign Management', color: '#8FB569', number: '4' },
    { id: 'web-development', title: 'WEB DEVELOPMENT', description: 'Website Projects & Technical Skills', color: '#F6C343', number: '5' },
    { id: 'event-organization', title: 'EVENT ORGANIZATION', description: 'Campus Events & Volunteer Activities', color: '#6EA8DC', number: '6' }
  ];

  return (
    <div style={{ fontFamily: "'Jeko', 'Poppins', sans-serif", background: '#f8f5f2', minHeight: '100vh', padding: '40px 20px' }}>
      {/* Scroll Progress Bar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '4px',
        width: `${scrollProgress}%`,
        background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
        zIndex: 3000,
        transition: 'width 0.1s ease'
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Header />
        <ProfileSection />
        
        {/* Details Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '60px' }}>
          <ExperienceCard title="CURRENT POSITIONS (2025)" experiences={currentExperiences} />
          <ExperienceCard title="RECENT EXPERIENCE (Late 2024 - Early 2025)" experiences={recentExperiences} />
          <ExperienceCard title="2024 EXPERIENCE" experiences={year2024Experiences} />
          <ExperienceCard title="2023 EXPERIENCE" experiences={year2023Experiences} />
          <ExperienceCard title="LONG-TERM PROJECTS (2020-2023)" experiences={longTermExperiences} />
          <ContactCard contacts={contacts} />
          <SkillsCard 
            softwareTools={softwareTools} 
            programmingTools={programmingTools} 
          />
          <SkillsCard 
            title="KEY SKILLS" 
            skills={skills} 
            fullWidth 
          />
          <div style={{
            background: 'white',
            padding: '25px',
            borderRadius: '15px',
            boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
            gridColumn: '1 / -1'
          }}>
            <h3 style={{
              fontSize: '1.3em',
              marginBottom: '15px',
              color: '#2d3748',
              borderBottom: '2px solid #667eea',
              paddingBottom: '10px',
              fontWeight: 700
            }}>
              ORGANIZATIONAL / VOLUNTEERING EXPERIENCE
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px' }}>
              {organizations.map((org, idx) => (
                <div key={idx} style={{ marginBottom: '10px' }}>
                  <h4 style={{ color: '#2d3748', fontSize: '1.05em', marginBottom: '5px' }}>{org.title}</h4>
                  <div style={{ color: '#718096', fontSize: '0.85em', fontStyle: 'italic', marginBottom: '8px' }}>{org.period}</div>
                  <ul style={{ marginLeft: '20px' }}>
                    {org.items.map((item, i) => (
                      <li key={i} style={{ color: '#4a5568', fontSize: '0.9em', lineHeight: '1.6' }}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Title with SplitText */}
        <div style={{ textAlign: 'center', margin: '80px 0 60px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
            {['01', '02', '03', '04', '05'].map((num) => (
              <SplitText
                key={num}
                text={num}
                tag="span"
                className="project-number"
                delay={50}
                duration={0.4}
                from={{ opacity: 0, y: -20 }}
                to={{ opacity: 1, y: 0 }}
                textAlign="center"
              />
            ))}
          </div>
          <SplitText
            text="PROJECTS"
            tag="h2"
            className="projects-title"
            delay={80}
            duration={0.8}
            ease="power4.out"
            from={{ opacity: 0, y: 50, rotateX: -90 }}
            to={{ opacity: 1, y: 0, rotateX: 0 }}
            textAlign="center"
          />
        </div>

        {/* Project Folders */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', marginBottom: '60px' }}>
          {projects.map((project) => (
            <ProjectFolder
              key={project.id}
              {...project}
              onClick={() => setSelectedProject(project.id)}
            />
          ))}
        </div>
      </div>

      <ScrollToTop />
      
      {selectedProject && (
        <Modal
          project={projectDetails[selectedProject]}
          onClose={() => setSelectedProject(null)}
        />
      )}

      <style>{`
        .project-number {
          font-size: 2em;
          color: rgba(210, 165, 116, 0.6);
          font-weight: bold;
        }
        
        .projects-title {
          font-size: 8em;
          font-weight: 900;
          color: rgba(0,0,0,0.05);
          margin: 0;
        }

        @media (max-width: 768px) {
          .projects-title {
            font-size: 4em;
          }
        }
      `}</style>
    </div>
  );
}