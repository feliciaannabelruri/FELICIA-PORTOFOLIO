import { useState } from 'react';

export default function FeaturedProjectCarousel() {
  const [currentProject, setCurrentProject] = useState(0);
  const [imageErrors, setImageErrors] = useState({});

  // All 12 projects - 1 project per slide
  const projects = [
    {
      id: 1,
      img: "/assets/lanyard/seblak.png",
      title: "Seblak Business",
      description: "Website programming for Business",
      link: "https://github.com/feliciaannabelruri/seb-lakweb",
      category: "Web Development"
    },
    {
      id: 2,
      img: "/assets/lanyard/thelazzyjannah.png",
      title: "The Lazzy Jannah",
      description: "Game Development",
      link: "https://github.com/JazeL2304/TheLazyJannah",
      category: "Game Development"
    },
    {
      id: 3,
      img: "/assets/lanyard/eventmanagement.png",
      title: "GatherHub",
      description: "Campus & Community Figma Project",
      link: "https://www.figma.com/proto/CN8cAiYv9ANEHwhvz1yF5z/Event-management-mobile-app?node-id=1327-503&p=f&t=TkAQyYwFSxzPCOEV-0&scaling=min-zoom&content-scaling=fixed&page-id=1327%3A454&starting-point-node-id=1327%3A503",
      category: "UI/UX Design"
    },
    {
      id: 4,
      img: "/assets/lanyard/SimakPajak.png",
      title: "SimakPajak",
      description: "Tax Consultation Website",
      link: "https://simakpajak.com",
      category: "Web Development"
    },
    {
      id: 5,
      img: "/assets/lanyard/MelaliInBali.png",
      title: "Melali In Bali",
      description: "Bali Tourism Platform",
      link: "https://melali-in-bali.vercel.app",
      category: "Web Development"
    },
    {
      id: 6,
      img: "/assets/lanyard/Rewear.png",
      title: "Rewear",
      description: "Sustainable Fashion Platform",
      link: "https://rewear-chi.vercel.app",
      category: "Web Development"
    },
    {
      id: 7,
      img: "/assets/lanyard/ggaisales.png",
      title: "Genius Growth AI Sales",
      description: "AI Sales Platform",
      link: "https://genius-growth-ai-sales.vercel.app",
      category: "AI Platform"
    },
    {
      id: 8,
      img: "/assets/lanyard/tsitp.png",
      title: "The Summer I Turned Pretty",
      description: "Unboxing Marketing Campaign TSITP Series",
      link: "https://the-summer-i-turned-pretty-marketin.vercel.app",
      category: "Marketing Campaign"
    },
    {
      id: 9,
      img: "/assets/lanyard/michelle.png",
      title: "Michelle Portfolio",
      description: "Making Michelle Personal Portfolio Website",
      link: "https://michelle-seven.vercel.app",
      category: "Web Development"
    },
    {
      id: 10,
      img: "/assets/lanyard/socialbread.png",
      title: "Social Bread Inventory",
      description: "Inventory Management System",
      link: "https://social-bread-inventory.vercel.app",
      category: "Web Development"
    },
    {
      id: 11,
      img: "/assets/lanyard/xdemia.png",
      title: "Xdemia Revamp",
      description: "Educational Platform Design",
      link: "https://www.figma.com/proto/dXb8mw5SgRNWv0s6o8c9cl/XDEMIA-REVAMP?m=draw&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&node-id=36-118&starting-point-node-id=392%3A4059&show-proto-sidebar=1",
      category: "UI/UX Design"
    },
    {
      id: 12,
      img: "/assets/lanyard/eventweb.png",
      title: "Web Project",
      description: "Event Management Mobile Website",
      link: "https://github.com/feliciaannabelruri/eventreg",
      category: "Web Development"
    }
  ];

  const project = projects[currentProject];

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToProject = (index) => {
    setCurrentProject(index);
  };

  const handleImageError = (projectId) => {
    setImageErrors(prev => ({ ...prev, [projectId]: true }));
  };

  return (
    <div 
      className="featured-carousel-container"
      style={{ 
        position: 'relative', 
        width: '100%',
        minHeight: '500px'
      }}
    >
      {/* Main Content */}
      <div 
        className="carousel-content"
        style={{
          display: 'flex',
          gap: '32px',
          alignItems: 'center',
          padding: '0 60px'
        }}
      >
        {/* Left Arrow */}
        <button
          onClick={prevProject}
          className="carousel-arrow carousel-arrow-left"
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(255, 94, 94, 0.1), rgba(226, 60, 100, 0.1))',
            border: '2px solid rgba(255, 94, 94, 0.2)',
            color: '#FF5E5E',
            fontSize: '1.75rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'all 0.3s ease',
            fontWeight: 'bold'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #FF5E5E, #E23C64)';
            e.currentTarget.style.color = 'white';
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(255, 94, 94, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 94, 94, 0.1), rgba(226, 60, 100, 0.1))';
            e.currentTarget.style.color = '#FF5E5E';
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          ←
        </button>

        {/* Project Card - Single Large Display */}
        <div 
          className="project-card"
          style={{
            flex: 1,
            background: '#FAFAFA',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid #F0F0F0',
            transition: 'all 0.4s ease',
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)'
          }}
        >
          {/* Project Image - Full Width & Large */}
          <div 
            className="project-image-container"
            style={{
              width: '100%',
              height: '320px',
              overflow: 'hidden',
              background: '#E5E7EB',
              position: 'relative'
            }}
          >
            {!imageErrors[project.id] ? (
              <img 
                key={`project-${project.id}`}
                src={project.img}
                alt={project.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.4s ease',
                  display: 'block'
                }}
                onError={() => handleImageError(project.id)}
              />
            ) : (
              <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#9E9E9E',
                fontSize: '3rem'
              }}>
                🎨
                <div style={{
                  fontSize: '1rem',
                  marginTop: '12px',
                  fontFamily: 'Space Grotesk, sans-serif'
                }}>
                  {project.title}
                </div>
              </div>
            )}

            {/* Category Badge on Image */}
            <div 
              className="category-badge"
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#FF5E5E',
                fontFamily: 'Outfit, sans-serif',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
              }}
            >
              {project.category}
            </div>
          </div>

          {/* Project Info */}
          <div 
            className="project-info"
            style={{
              padding: '28px 32px'
            }}
          >
            <h4 
              className="project-title"
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#1A1A1A',
                marginBottom: '10px',
                fontFamily: 'Outfit, sans-serif',
                letterSpacing: '-0.01em',
                lineHeight: 1.3
              }}
            >
              {project.title}
            </h4>
            
            <p 
              className="project-description"
              style={{
                fontSize: '1rem',
                color: '#6B7280',
                lineHeight: '1.6',
                fontFamily: 'Space Grotesk, sans-serif',
                marginBottom: '18px'
              }}
            >
              {project.description}
            </p>

            {/* View Project Button */}
            <a 
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="view-project-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #FF5E5E, #E23C64)',
                color: 'white',
                borderRadius: '10px',
                fontSize: '0.9375rem',
                fontWeight: 600,
                fontFamily: 'Outfit, sans-serif',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 8px rgba(255, 94, 94, 0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(255, 94, 94, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(255, 94, 94, 0.2)';
              }}
            >
              View Project →
            </a>
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextProject}
          className="carousel-arrow carousel-arrow-right"
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(255, 94, 94, 0.1), rgba(226, 60, 100, 0.1))',
            border: '2px solid rgba(255, 94, 94, 0.2)',
            color: '#FF5E5E',
            fontSize: '1.75rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'all 0.3s ease',
            fontWeight: 'bold'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #FF5E5E, #E23C64)';
            e.currentTarget.style.color = 'white';
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(255, 94, 94, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 94, 94, 0.1), rgba(226, 60, 100, 0.1))';
            e.currentTarget.style.color = '#FF5E5E';
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          →
        </button>
      </div>

      {/* Dots Indicator + Counter */}
      <div 
        className="carousel-indicators"
        style={{
          marginTop: '32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '14px'
        }}
      >
        {/* Counter */}
        <div 
          className="carousel-counter"
          style={{
            fontSize: '0.9375rem',
            color: '#9E9E9E',
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 500
          }}
        >
          {currentProject + 1} / {projects.length}
        </div>

        {/* Dots */}
        <div 
          className="carousel-dots"
          style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            maxWidth: '500px'
          }}
        >
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => goToProject(index)}
              className="carousel-dot"
              style={{
                width: index === currentProject ? '32px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: index === currentProject 
                  ? 'linear-gradient(90deg, #FF5E5E, #E23C64)' 
                  : '#E5E7EB',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (index !== currentProject) {
                  e.currentTarget.style.background = '#D1D5DB';
                }
              }}
              onMouseLeave={(e) => {
                if (index !== currentProject) {
                  e.currentTarget.style.background = '#E5E7EB';
                }
              }}
            />
          ))}
        </div>
      </div>

      {/* Responsive Styles */}
      <style>{`
        /* Desktop - Default */
        .featured-carousel-container {
          min-height: 550px;
        }

        .project-image-container {
          height: 320px;
        }

        .project-info {
          padding: 28px 32px;
        }

        .project-title {
          font-size: 1.5rem;
        }

        .project-description {
          font-size: 1rem;
        }

        .view-project-btn {
          padding: 12px 24px;
          font-size: 0.9375rem;
        }

        /* TABLET - 1024px */
        @media (max-width: 1024px) {
          .carousel-content {
            padding: 0 40px !important;
          }

          .project-image-container {
            height: 280px !important;
          }

          .carousel-arrow {
            width: 50px !important;
            height: 50px !important;
            font-size: 1.5rem !important;
          }
        }

        /* LARGE MOBILE - 768px */
        @media (max-width: 768px) {
          .featured-carousel-container {
            min-height: 600px !important;
          }

          .carousel-content {
            padding: 0 !important;
            gap: 0 !important;
          }

          .carousel-arrow {
            position: absolute !important;
            top: 140px !important;
            z-index: 10 !important;
            width: 44px !important;
            height: 44px !important;
            font-size: 1.25rem !important;
          }

          .carousel-arrow-left {
            left: 12px !important;
          }

          .carousel-arrow-right {
            right: 12px !important;
          }

          .project-card {
            margin: 0 12px !important;
          }

          .project-image-container {
            height: 280px !important;
          }

          .project-info {
            padding: 24px !important;
          }

          .project-title {
            font-size: 1.375rem !important;
          }

          .project-description {
            font-size: 0.9375rem !important;
          }

          .view-project-btn {
            padding: 11px 22px !important;
            font-size: 0.875rem !important;
          }

          .category-badge {
            padding: 5px 12px !important;
            font-size: 0.7rem !important;
          }

          .carousel-indicators {
            margin-top: 28px !important;
          }
        }

        /* MOBILE - 480px */
        @media (max-width: 480px) {
          .featured-carousel-container {
            min-height: 580px !important;
          }

          .carousel-arrow {
            top: 130px !important;
            width: 40px !important;
            height: 40px !important;
            font-size: 1.125rem !important;
          }

          .carousel-arrow-left {
            left: 10px !important;
          }

          .carousel-arrow-right {
            right: 10px !important;
          }

          .project-card {
            margin: 0 10px !important;
          }

          .project-image-container {
            height: 240px !important;
          }

          .project-info {
            padding: 20px !important;
          }

          .project-title {
            font-size: 1.25rem !important;
            margin-bottom: 8px !important;
          }

          .project-description {
            font-size: 0.875rem !important;
            margin-bottom: 16px !important;
          }

          .view-project-btn {
            padding: 10px 20px !important;
            font-size: 0.8125rem !important;
            width: 100% !important;
            justify-content: center !important;
          }

          .category-badge {
            top: 12px !important;
            right: 12px !important;
            padding: 4px 10px !important;
            font-size: 0.65rem !important;
          }

          .carousel-counter {
            font-size: 0.875rem !important;
          }

          .carousel-indicators {
            margin-top: 24px !important;
            gap: 12px !important;
          }
        }

        /* SMALL MOBILE - 360px */
        @media (max-width: 360px) {
          .featured-carousel-container {
            min-height: 540px !important;
          }

          .carousel-arrow {
            top: 120px !important;
            width: 36px !important;
            height: 36px !important;
            font-size: 1rem !important;
          }

          .carousel-arrow-left {
            left: 8px !important;
          }

          .carousel-arrow-right {
            right: 8px !important;
          }

          .project-card {
            margin: 0 8px !important;
          }

          .project-image-container {
            height: 200px !important;
          }

          .project-info {
            padding: 16px !important;
          }

          .project-title {
            font-size: 1.125rem !important;
          }

          .project-description {
            font-size: 0.8125rem !important;
            margin-bottom: 14px !important;
          }

          .view-project-btn {
            padding: 9px 18px !important;
            font-size: 0.75rem !important;
          }

          .category-badge {
            top: 10px !important;
            right: 10px !important;
            padding: 3px 8px !important;
            font-size: 0.6rem !important;
          }

          .carousel-counter {
            font-size: 0.8125rem !important;
          }
        }
      `}</style>
    </div>
  );
}