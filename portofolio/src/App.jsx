import { useState, useEffect } from 'react';
import BubbleMenu from './components/BubbleMenu.jsx';
import Header from './components/Header.jsx';
import ProfileSection from './components/ProfileSection.jsx';
import ContactCard from './components/ContactCard.jsx';
import SkillsCard from './components/SkillsCard.jsx';
import ProjectFolder from './components/ProjectFolder.jsx';
import SplitText from './components/SplitText.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import Modal from './components/Modal.jsx';
import WelcomeScreen from './components/WelcomeScreen.jsx';
import GreetingNameDisplay from './components/GreetingNameDisplay.jsx';
import { projectDetails } from './data/projectDetails.js';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [visitorName, setVisitorName] = useState('');
  const [showContent, setShowContent] = useState(false);

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

  const handleWelcomeComplete = (name) => {
    setVisitorName(name);
    setShowContent(true);
  };

  // Bubble Menu Items - Coral Wave Colors
  const menuItems = [
    {
      label: 'home',
      href: '#home',
      ariaLabel: 'Home',
      rotation: -8,
      hoverStyles: { bgColor: '#FF5E5E', textColor: '#ffffff' }
    },
    {
      label: 'about',
      href: '#about',
      ariaLabel: 'About',
      rotation: 8,
      hoverStyles: { bgColor: '#FFD464', textColor: '#1A1A1A' }
    },
    {
      label: 'skills',
      href: '#skills',
      ariaLabel: 'Skills',
      rotation: -8,
      hoverStyles: { bgColor: '#FCEDD8', textColor: '#1A1A1A' }
    },
    {
      label: 'projects',
      href: '#projects',
      ariaLabel: 'Projects',
      rotation: 8,
      hoverStyles: { bgColor: '#B0183D', textColor: '#ffffff' }
    },
    {
      label: 'contact',
      href: '#contact',
      ariaLabel: 'Contact',
      rotation: -8,
      hoverStyles: { bgColor: '#FF5E5E', textColor: '#ffffff' }
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
    { 
      id: 'digital-marketing', 
      title: 'DIGITAL MARKETING', 
      description: 'Social Media Management & Content Strategy', 
      color: '#FF5E5E', 
      number: '1' 
    },
    { 
      id: 'content-creation', 
      title: 'CONTENT CREATION', 
      description: 'Video Production, Photography & Creative Writing', 
      color: '#FFD464', 
      number: '2' 
    },
    { 
      id: 'live-streaming', 
      title: 'LIVE STREAMING', 
      description: 'Live Shopping Host & Streaming Operations', 
      color: '#E23C64', 
      number: '3' 
    },
    { 
      id: 'kol-management', 
      title: 'KOL MANAGEMENT', 
      description: 'Influencer Relations & Campaign Management', 
      color: '#FCEDD8', 
      number: '4' 
    },
    { 
      id: 'web-development', 
      title: 'WEB DEVELOPMENT', 
      description: 'Website Projects & Technical Skills', 
      color: '#B0183D', 
      number: '5' 
    },
    { 
      id: 'event-organization', 
      title: 'EVENT ORGANIZATION', 
      description: 'Campus Events & Volunteer Activities', 
      color: '#FF5E5E', 
      number: '6' 
    }
  ];

  return (
    <>
      <WelcomeScreen onComplete={handleWelcomeComplete} />
      
      {visitorName && <GreetingNameDisplay name={visitorName} />}
      
      {showContent && (
        <>
          {/* Bubble Menu Navigation */}
          <BubbleMenu
            logo={
              <span style={{ 
                fontWeight: 800,
                background: 'linear-gradient(135deg, #FF5E5E, #E23C64)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                FA
              </span>
            }
            items={menuItems}
            menuAriaLabel="Toggle navigation menu"
            menuBg="#ffffff"
            menuContentColor="#1A1A1A"
            useFixedPosition={true}
            animationEase="back.out(1.5)"
            animationDuration={0.5}
            staggerDelay={0.12}
          />

          {/* Scroll Progress Bar */}
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            height: '3px',
            width: `${scrollProgress}%`,
            background: 'linear-gradient(90deg, #FCEDD8 0%, #FFD464 25%, #FF5E5E 60%, #E23C64 85%, #B0183D 100%)',
            zIndex: 3000,
            transition: 'width 0.1s ease'
          }} />
        </>
      )}

      <div style={{ 
        fontFamily: "'Outfit', 'Space Grotesk', sans-serif", 
        background: '#FAFAFA', 
        minHeight: '100vh', 
        padding: '120px 20px 40px 20px' 
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Home Section */}
          <div id="home">
            <Header />
          </div>
          
          {/* About Section */}
          <div id="about" style={{ marginBottom: '60px' }}>
            <ProfileSection />
          </div>
          
          {/* Skills & Contact Grid - SWAPPED: Skills LEFT, Contact RIGHT */}
          <div id="skills" style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr',
            gap: '30px', 
            marginBottom: '60px',
            alignItems: 'stretch'
          }}>
            {/* LEFT: Skills Card (Software & Programming) */}
            <SkillsCard 
              softwareTools={softwareTools} 
              programmingTools={programmingTools} 
            />
            
            {/* RIGHT: Contact Card - Full Height */}
            <div id="contact" style={{ display: 'flex' }}>
              <ContactCard contacts={contacts} />
            </div>
            
            {/* Organizational Experience - Full Width Below */}
            <div style={{
              background: 'white',
              padding: '32px',
              borderRadius: '20px',
              border: '1px solid #F0F0F0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              gridColumn: '1 / -1',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Coral Gradient Top Line */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, #FCEDD8 0%, #FFD464 25%, #FF5E5E 60%, #E23C64 85%, #B0183D 100%)'
              }} />

              <h3 style={{
                fontSize: '1.125rem',
                marginBottom: '28px',
                paddingBottom: '20px',
                borderBottom: '1px solid #F5F5F5',
                color: '#1A1A1A',
                fontWeight: 700,
                fontFamily: 'Outfit, sans-serif',
                letterSpacing: '-0.01em',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  background: 'linear-gradient(135deg, rgba(255, 94, 94, 0.1), rgba(226, 60, 100, 0.1))',
                  borderRadius: '10px',
                  fontSize: '1.125rem'
                }}>
                  🎓
                </span>
                ORGANIZATIONAL / VOLUNTEERING EXPERIENCE
              </h3>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                gap: '20px' 
              }}>
                {organizations.map((org, idx) => (
                  <div key={idx} style={{ 
                    padding: '16px 18px',
                    background: '#FAFAFA',
                    borderRadius: '12px',
                    border: '1px solid #F0F0F0'
                  }}>
                    <h4 style={{ 
                      color: '#1A1A1A', 
                      fontSize: '1rem', 
                      marginBottom: '8px',
                      fontWeight: 600,
                      fontFamily: 'Outfit, sans-serif'
                    }}>
                      {org.title}
                    </h4>
                    <div style={{ 
                      color: '#9E9E9E', 
                      fontSize: '0.8125rem', 
                      fontStyle: 'italic', 
                      marginBottom: '12px',
                      fontFamily: 'Space Grotesk, sans-serif'
                    }}>
                      {org.period}
                    </div>
                    <ul style={{ marginLeft: '20px', margin: 0, padding: 0, listStyle: 'none' }}>
                      {org.items.map((item, i) => (
                        <li key={i} style={{ 
                          color: '#4A5568', 
                          fontSize: '0.875rem', 
                          lineHeight: '1.6',
                          marginBottom: '6px',
                          paddingLeft: '20px',
                          position: 'relative',
                          fontFamily: 'Space Grotesk, sans-serif'
                        }}>
                          <span style={{
                            position: 'absolute',
                            left: 0,
                            top: '0.6em',
                            width: '6px',
                            height: '6px',
                            background: '#FF5E5E',
                            borderRadius: '50%'
                          }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Projects Title with SplitText */}
          <div id="projects" style={{ textAlign: 'center', margin: '80px 0 60px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
              {['01', '02', '03', '04', '05', '06'].map((num) => (
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
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '40px', 
            marginBottom: '60px' 
          }}>
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
          @media (max-width: 768px) {
            body {
              padding-top: 80px;
            }
            
            div[style*="display: grid"][style*="gridTemplateColumns: repeat(auto-fit, minmax(280px, 1fr))"] {
              grid-template-columns: 1fr !important;
              gap: 20px !important;
            }

            /* Stack Skills and Contact vertically on mobile */
            div[style*="gridTemplateColumns: 1fr 1fr"] {
              grid-template-columns: 1fr !important;
            }
            
            div[style*="padding: 120px 20px 40px 20px"] {
              padding: 100px 15px 40px 15px !important;
            }
          }

          @media (max-width: 480px) {
            div[style*="padding: 120px 20px 40px 20px"] {
              padding: 90px 10px 30px 10px !important;
            }
            
            div[style*="display: grid"][style*="gap: 40px"] {
              gap: 20px !important;
            }
          }

          .project-number {
            font-size: 2em;
            color: rgba(255, 94, 94, 0.3);
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
            
            .project-number {
              font-size: 1.5em;
            }
          }
          
          @media (max-width: 480px) {
            .projects-title {
              font-size: 3em;
            }
            
            .project-number {
              font-size: 1.2em;
            }
          }
        `}</style>
      </div>
    </>
  );
}