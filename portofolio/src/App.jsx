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
      company: "JOKI PROYEK - Freelance",
      period: "Jan 2025 - Present",
      responsibilities: [
        "Melakukan riset audiens dan mengembangkan konsep konten",
        "Menulis artikel, skrip video yang dioptimalkan untuk SEO",
        "Berkolaborasi dengan tim desain untuk konsistensi brand"
      ]
    },
    {
      title: "Digital Marketing Executive",
      company: "MOVEABROAD.CO - Part-time",
      period: "Jan 2025 - Present",
      responsibilities: [
        "Mengelola konten Instagram & TikTok",
        "Riset tren dan optimasi hashtag",
        "Koordinasi kolaborasi influencer",
        "7-10 posts Instagram & 5-7 video TikTok per minggu"
      ]
    },
    {
      title: "Digital Marketing",
      company: "XDEMIA - Internship",
      period: "Nov 2024 - Present",
      responsibilities: [
        "Membuat konten harian untuk berbagai platform",
        "Mengorganisir strategi marketing",
        "Menulis minimal 2 artikel per minggu"
      ]
    }
  ];

  const recentExperiences = [
    {
      title: "Human Resources Assistant",
      company: "PT OAKM TECH INDONESIA - Freelance",
      period: "Nov 2024 - Jun 2025",
      responsibilities: [
        "Identifikasi kandidat untuk live stream hosting",
        "Membantu screening dan interview kandidat"
      ]
    },
    {
      title: "Content Creator",
      company: "LEARNRITHM.AI - Internship",
      period: "Nov 2024 - Jun 2025",
      responsibilities: [
        "Membuat video content yang engaging",
        "Editing dan optimasi video untuk SEO"
      ]
    },
    {
      title: "Content Researcher",
      company: "MONTIER DESIGN - Contract",
      period: "Feb 2025 - May 2025",
      responsibilities: [
        "Riset untuk ide konten yang relevan",
        "Kolaborasi dengan tim marketing"
      ]
    }
  ];

  const contacts = [
    { icon: "📧", text: "ffeliciaannabelruriyanto@gmail.com", copyable: true },
    { icon: "📱", text: "+62 895-0111-6888", copyable: true },
    { icon: "💼", text: "linkedin.com/in/felicia-annabel-ruriyanto", link: "https://linkedin.com/in/felicia-annabel-ruriyanto" },
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
    { name: "C", color: "#A8B9CC", textColor: "#000" }
  ];

  const skills = [
    "Social Media Management", "Content Creation", "Copywriting",
    "Video Editing", "Data Analysis", "SEO Optimization",
    "Public Speaking", "Marketing Campaigns",
    "Customer Relationship Management", "Design",
    "Networking", "Problem Solving"
  ];

  const organizations = [
    {
      title: "Infinite UMN 2024",
      period: "Oct 2024 - Social Media Team",
      items: ["Copywriting untuk social media", "Membuat konten untuk social media"]
    },
    {
      title: "Hansan Festival UMN 2024",
      period: "Oct 2024 - Tenant Coordinator",
      items: ["Menghubungi tenant untuk join event", "Negosiasi dengan tenant"]
    },
    {
      title: "UMN Tech Festival 2024",
      period: "March 2024 - Social Media",
      items: ["Membuat konten interaktif", "Menghubungi media partners"]
    },
    {
      title: "Voluntrip Kampung Pemulung",
      period: "Aug 2023 - Volunteer by KitaBisa",
      items: ["Mengelola program untuk 20 orang", "Kerjasama dengan pihak eksternal"]
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
          <ExperienceCard title="CURRENT WORK EXPERIENCE" experiences={currentExperiences} />
          <ExperienceCard title="RECENT EXPERIENCE" experiences={recentExperiences} />
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
              ORGANIZATIONAL EXPERIENCE
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
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