import { useState, useEffect } from 'react';
import BubbleMenu from './components/BubbleMenu.jsx';
import Header from './components/Header.jsx';
import ProfileSection from './components/ProfileSection.jsx';
import ExperienceCard from './components/ExperienceCard.jsx';
import ContactCard from './components/ContactCard.jsx';
import SkillsCard from './components/SkillsCard.jsx';
import ProjectFolder from './components/ProjectFolder.jsx';
import SplitText from './components/SplitText.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import Modal from './components/Modal.jsx';
import WelcomeScreen from './components/WelcomeScreen.jsx';
import GreetingNameDisplay from './components/GreetingNameDisplay.jsx';
import FeaturedProjectCarousel from './components/FeaturedProjectCarousel.jsx';
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
      label: 'experience',
      href: '#experience',
      ariaLabel: 'Experience',
      rotation: -8,
      hoverStyles: { bgColor: '#E23C64', textColor: '#ffffff' }
    },
    {
      label: 'skills',
      href: '#skills',
      ariaLabel: 'Skills',
      rotation: 8,
      hoverStyles: { bgColor: '#FCEDD8', textColor: '#1A1A1A' }
    },
    {
      label: 'projects',
      href: '#projects',
      ariaLabel: 'Projects',
      rotation: -8,
      hoverStyles: { bgColor: '#B0183D', textColor: '#ffffff' }
    },
    {
      label: 'contact',
      href: '#contact',
      ariaLabel: 'Contact',
      rotation: 8,
      hoverStyles: { bgColor: '#FF5E5E', textColor: '#ffffff' }
    }
  ];

  const currentExperiences = [
    {
      title: "Content Creator",
      company: "CHAMELYONE INTERIORS - Part-Time",
      period: "Sept 2025 - Present"
    },
    {
      title: "Social Media Marketing Specialist",
      company: "WINOSA MITRA - Part-Time",
      period: "June 2025 - Present"
    },
    {
      title: "Content Creator",
      company: "JOKI PROYEK - Freelance",
      period: "Jan 2025 - Present"
    },
    {
      title: "Digital Marketing Executive",
      company: "MOVEABROAD.CO - Part-time",
      period: "Jan 2025 - Present"
    },
    {
      title: "Digital Marketing",
      company: "XDEMIA - Internship",
      period: "Nov 2024 - Present"
    },
    {
      title: "Marketing Director – Head of Sales & Marketing",
      company: "GENIUS GROWTH AI",
      period: "Jul 2025 - Nov 2025"
    }
  ];

  const recentExperiences = [
    {
      title: "Human Resources Assistant",
      company: "PT OAKM TECH INDONESIA - Freelance",
      period: "Nov 2024 - Jun 2025"
    },
    {
      title: "Content Creator",
      company: "LEARNRITHM.AI - Internship",
      period: "Nov 2024 - Jun 2025"
    },
    {
      title: "Content Researcher",
      company: "MONTIER DESIGN - Contract",
      period: "Feb 2025 - May 2025"
    },
    {
      title: "Personal Assistant",
      company: "INDO AQUATIC TRADE - Internship",
      period: "Nov 2024 - Feb 2025"
    },
    {
      title: "Social Media Officer",
      company: "BOTANI BAR - Freelance",
      period: "Nov 2024 - Jan 2025"
    },
    {
      title: "Content Creator",
      company: "PERSONAL BRANDING - Part-Time",
      period: "Oct 2024 - Jan 2025"
    }
  ];

  const year2024Experiences = [
    {
      title: "Live Streaming Operator",
      company: "PEGASUS NET TECHNOLOGIES - Full-Time",
      period: "Sep 2024 - Des 2024"
    },
    {
      title: "Content Creator",
      company: "TILIEK CREATIVE AGENCY - Internship",
      period: "Aug 2024 - Oct 2024"
    },
    {
      title: "Social Media Specialist",
      company: "PT.NAKAHAMA HANDAL KONSULTAMA - Freelance",
      period: "Jul 2024 - Oct 2024"
    },
    {
      title: "Live Shopping",
      company: "PT. SOSIAL BERKAT KREATIF INDONESIA - Internship",
      period: "Jun 2024 - Sep 2024"
    },
    {
      title: "Social Media Specialist",
      company: "PT. ACR BERSATU SEJAHTERA - Freelance",
      period: "Feb 2024 - Jun 2024"
    }
  ];

  const year2023Experiences = [
    {
      title: "Host Live",
      company: "CLOUT INDONESIA GROUP - Freelance",
      period: "Nov 2023 - Jan 2024"
    },
    {
      title: "KOL Specialist",
      company: "PT. LANTIH ADHIP GRUP - Freelance",
      period: "Sep 2023 - Jan 2024"
    },
    {
      title: "Marketing Specialist & KOL Specialist",
      company: "PT. ACR BERSATU SEJAHTERA - Freelance",
      period: "Apr 2023 - Jun 2023"
    },
    {
      title: "Marketing Specialist",
      company: "CICISGENK.ID - Freelance",
      period: "Apr 2023 - Jun 2023"
    }
  ];

  const longTermExperiences = [
    {
      title: "Social Media Specialist",
      company: "NUGASITUDUIT - Freelance",
      period: "Oct 2021 - Jul 2023"
    },
    {
      title: "Content Marketing",
      company: "CRAFTBBARO - Freelance",
      period: "May 2020 - Feb 2023"
    }
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
    { id: 'digital-marketing', title: 'DIGITAL MARKETING', description: 'Social Media Management & Content Strategy', color: '#FF5E5E', number: '1' },
    { id: 'content-creation', title: 'CONTENT CREATION', description: 'Video Production, Photography & Creative Writing', color: '#FFD464', number: '2' },
    { id: 'live-streaming', title: 'LIVE STREAMING', description: 'Live Shopping Host & Streaming Operations', color: '#E23C64', number: '3' },
    { id: 'kol-management', title: 'KOL MANAGEMENT', description: 'Influencer Relations & Campaign Management', color: '#FCEDD8', number: '4' },
    { id: 'web-development', title: 'WEB DEVELOPMENT', description: 'Website Projects & Technical Skills', color: '#B0183D', number: '5' },
    { id: 'event-organization', title: 'EVENT ORGANIZATION', description: 'Campus Events & Volunteer Activities', color: '#FF5E5E', number: '6' }
  ];

  return (
    <>
      <WelcomeScreen onComplete={handleWelcomeComplete} />
      
      {visitorName && <GreetingNameDisplay name={visitorName} />}
      
      {showContent && (
        <>
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
      }} className="main-container">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* HOME - HEADER */}
          <div id="home" style={{ marginBottom: '48px' }}>
            <Header />
          </div>
          
          {/* ABOUT - PROFILE SECTION */}
          <div id="about" style={{ marginBottom: '60px' }}>
            <ProfileSection />
          </div>
          
          {/* FEATURED PROJECTS WITH CAROUSEL */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            border: '1px solid #F0F0F0',
            padding: '40px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
            position: 'relative',
            overflow: 'visible',
            marginBottom: '60px'
          }} className="featured-section">
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: 'linear-gradient(90deg, #FCEDD8 0%, #FFD464 25%, #FF5E5E 60%, #E23C64 85%, #B0183D 100%)'
            }} />

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '32px'
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
                ⭐
              </span>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: 700,
                color: '#1A1A1A',
                fontFamily: 'Outfit, sans-serif',
                letterSpacing: '-0.01em',
                margin: 0
              }}>
                Featured Projects
              </h3>
            </div>

            <FeaturedProjectCarousel />
          </div>

          {/* SKILLS & CONTACT SECTION */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '30px', 
            marginBottom: '60px' 
          }} className="skills-contact-grid">
            <div id="skills">
              <SkillsCard />
            </div>
            
            <div id="contact">
              <ContactCard />
            </div>
          </div>

          {/* PROJECTS TITLE */}
          <div id="projects" style={{ textAlign: 'center', margin: '80px 0 60px' }} className="projects-header">
            <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }} className="project-numbers">
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

          {/* PROJECT FOLDERS */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '40px', 
            marginBottom: '60px' 
          }} className="projects-grid">
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
          /* MOBILE RESPONSIVE STYLES */
          
          /* Main Container */
          @media (max-width: 768px) {
            .main-container {
              padding: 100px 15px 40px 15px !important;
            }

            /* Experience Grid */
            .experience-grid {
              grid-template-columns: 1fr !important;
              gap: 20px !important;
            }

            /* Skills & Contact Grid */
            .skills-contact-grid {
              grid-template-columns: 1fr !important;
              gap: 20px !important;
            }

            /* Organizational Section */
            .org-section {
              padding: 24px !important;
            }

            .org-section h3 {
              font-size: 1rem !important;
              margin-bottom: 20px !important;
              padding-bottom: 16px !important;
            }

            .org-grid {
              grid-template-columns: 1fr !important;
              gap: 16px !important;
            }

            /* Featured Projects Section */
            .featured-section {
              padding: 28px !important;
            }

            .featured-section h3 {
              font-size: 1rem !important;
            }

            /* Projects Header */
            .projects-header {
              margin: 60px 0 40px !important;
            }

            .project-numbers {
              justify-content: center !important;
            }

            .project-number {
              font-size: 1.5em !important;
            }

            .projects-title {
              font-size: 4em !important;
            }

            /* Projects Grid */
            .projects-grid {
              grid-template-columns: 1fr !important;
              gap: 20px !important;
            }
          }

          @media (max-width: 480px) {
            .main-container {
              padding: 90px 12px 30px 12px !important;
            }

            .experience-grid,
            .skills-contact-grid {
              gap: 16px !important;
            }

            .org-section {
              padding: 20px !important;
            }

            .org-section h3 {
              font-size: 0.9375rem !important;
              gap: 8px !important;
            }

            .org-grid {
              gap: 12px !important;
            }

            .org-grid > div {
              padding: 14px 16px !important;
            }

            .featured-section {
              padding: 20px !important;
            }

            .projects-header {
              margin: 50px 0 30px !important;
            }

            .project-number {
              font-size: 1.2em !important;
            }

            .projects-title {
              font-size: 3em !important;
            }

            .projects-grid {
              gap: 16px !important;
            }
          }

          @media (max-width: 360px) {
            .main-container {
              padding: 80px 10px 25px 10px !important;
            }

            .org-section {
              padding: 16px !important;
            }

            .org-section h3 {
              font-size: 0.875rem !important;
            }

            .org-section h3 span {
              width: 28px !important;
              height: 28px !important;
              font-size: 0.9375rem !important;
            }

            .org-grid > div {
              padding: 12px 14px !important;
            }

            .featured-section {
              padding: 16px !important;
            }

            .project-number {
              font-size: 1em !important;
            }

            .projects-title {
              font-size: 2.5em !important;
            }
          }

          /* Project Number & Title Styles */
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
        `}</style>
      </div>
    </>
  );
}