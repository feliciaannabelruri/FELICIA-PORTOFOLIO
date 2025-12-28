import MasonryCarousel from './MasonryCarousel.jsx';

export default function ProfileSection() {
  return (
    <div style={{ marginBottom: '60px' }}>
      {/* TOP ROW: Profile Card + About Text (Side by Side) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gap: '30px',
        marginBottom: '30px',
        alignItems: 'stretch'
      }}>
        {/* LEFT: Profile Card with Photo */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(252, 237, 216, 0.3), rgba(255, 212, 100, 0.3), rgba(255, 94, 94, 0.2))',
          borderRadius: '30px',
          padding: '40px 30px',
          border: '1px solid rgba(255, 94, 94, 0.1)',
          boxShadow: '0 8px 32px rgba(255, 94, 94, 0.12)',
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center',
          backdropFilter: 'blur(10px)',
          minWidth: '280px',
          maxWidth: '320px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Decorative Circles */}
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: 'rgba(255, 94, 94, 0.15)',
            filter: 'blur(40px)'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '-30px',
            left: '-30px',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'rgba(255, 212, 100, 0.15)',
            filter: 'blur(40px)'
          }} />

          {/* Profile Photo */}
          <div style={{
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '4px solid white',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
            marginBottom: '20px',
            position: 'relative',
            zIndex: 1,
            background: 'linear-gradient(135deg, #E5E7EB, #F3F4F6)'
          }}>
            <img 
              src="/assets/felicia-photo.jpg" 
              alt="Felicia Annabel"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:4rem;color:#FF5E5E;font-weight:800;font-family:Outfit">FA</div>';
              }}
            />
          </div>

          {/* Name & Title */}
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 800,
            color: '#1A1A1A',
            marginBottom: '6px',
            fontFamily: 'Outfit, sans-serif',
            letterSpacing: '-0.02em',
            position: 'relative',
            zIndex: 1
          }}>
            Felicia Annabel
          </h2>
          
          <p style={{
            fontSize: '0.9375rem',
            color: '#6B7280',
            fontWeight: 500,
            fontFamily: 'Space Grotesk, sans-serif',
            position: 'relative',
            zIndex: 1,
            marginBottom: '20px'
          }}>
            Backend Developer & IT Enthusiast
          </p>

          {/* Social Links */}
          <div style={{
            display: 'flex',
            gap: '10px',
            position: 'relative',
            zIndex: 1
          }}>
            <a href="https://linkedin.com/in/felicia-annabel-ruriyanto-227a9125b" target="_blank" rel="noopener noreferrer" style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FF5E5E',
              fontSize: '1.125rem',
              textDecoration: 'none',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(255, 94, 94, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
            }}>
              💼
            </a>
            <a href="mailto:ffeliciaannabelruriyanto@gmail.com" style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FF5E5E',
              fontSize: '1.125rem',
              textDecoration: 'none',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(255, 94, 94, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
            }}>
              📧
            </a>
            <a href="tel:+6287736786969" style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FF5E5E',
              fontSize: '1.125rem',
              textDecoration: 'none',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(255, 94, 94, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
            }}>
              📱
            </a>
          </div>
        </div>

        {/* RIGHT: About Me Text */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          border: '1px solid #F0F0F0',
          padding: '40px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
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

          <h2 style={{
            fontSize: '2.25rem',
            fontWeight: 800,
            marginBottom: '20px',
            color: '#1A1A1A',
            fontFamily: 'Outfit, sans-serif',
            letterSpacing: '-0.02em'
          }}>
            Hi, I'm <span style={{
              background: 'linear-gradient(135deg, #FF5E5E, #E23C64)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Felicia</span>
          </h2>

          <p style={{
            fontSize: '1rem',
            lineHeight: '1.8',
            color: '#4A5568',
            fontFamily: 'Space Grotesk, sans-serif',
            margin: 0
          }}>
            A detail-oriented and tech-driven <strong>Informatics Engineering student</strong> at Multimedia Nusantara University with strong interest in IT project management and digital solutions. 
            <br /><br />
            Skilled in <strong>data analysis</strong>, <strong>software development fundamentals</strong>, and <strong>problem-solving</strong> within cross-functional teams. 
            <br /><br />
            Experienced in managing <strong>social media</strong> and <strong>digital marketing projects</strong>, combining technical and creative approaches to deliver measurable results. 
            <br /><br />
            Eager to contribute technical expertise and strategic thinking in the IT industry.
          </p>
        </div>
      </div>

      {/* BOTTOM ROW: Featured Projects with Horizontal Masonry (Full Width) */}
      <div style={{
        background: 'white',
        borderRadius: '20px',
        border: '1px solid #F0F0F0',
        padding: '40px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
        position: 'relative',
        overflow: 'visible'
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

        {/* Header */}
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

        {/* MasonryCarousel Component - Display Horizontal */}
        <div style={{
          width: '100%',
          position: 'relative'
        }}>
          <MasonryCarousel />
        </div>
      </div>

      {/* Responsive Styles */}
      <style>{`
        /* Tablet & Below - Stack Profile and About */}
        @media (max-width: 1024px) {
          div[style*="gridTemplateColumns: auto 1fr"] {
            grid-template-columns: 1fr !important;
          }
          
          div[style*="minWidth: 280px"] {
            max-width: 100% !important;
            min-width: 100% !important;
          }
        }

        /* Mobile - Smaller text and padding */}
        @media (max-width: 768px) {
          h2[style*="fontSize: 2.25rem"] {
            font-size: 1.875rem !important;
          }
          
          p[style*="fontSize: 1rem"] {
            font-size: 0.9375rem !important;
          }

          div[style*="padding: 40px"] {
            padding: 28px !important;
          }

          div[style*="padding: 0 60px"] {
            padding: 0 32px !important;
          }
        }

        /* Small Mobile - Compact everything */}
        @media (max-width: 480px) {
          div[style*="padding: 40px"],
          div[style*="padding: 28px"] {
            padding: 20px !important;
          }
          
          h2[style*="fontSize: 2.25rem"],
          h2[style*="fontSize: 1.875rem"] {
            font-size: 1.5rem !important;
          }
          
          div[style*="width: 180px"] {
            width: 140px !important;
            height: 140px !important;
          }

          div[style*="padding: 0 60px"],
          div[style*="padding: 0 32px"] {
            padding: 0 16px !important;
          }

          button[style*="width: 56px"] {
            width: 44px !important;
            height: 44px !important;
            font-size: 1.25rem !important;
          }

          div[style*="height: 280px"] {
            height: 200px !important;
          }

          h4[style*="fontSize: 1.375rem"] {
            font-size: 1.125rem !important;
          }

          div[style*="gap: 32px"] {
            gap: 16px !important;
            flex-direction: column !important;
          }

          /* Make arrows stack vertically on very small screens */}
          div[style*="display: flex"][style*="gap: 32px"] {
            flex-direction: row !important;
          }
        }

        /* Extra Small - Arrows above/below */}
        @media (max-width: 380px) {
          button[style*="width: 56px"],
          button[style*="width: 44px"] {
            width: 40px !important;
            height: 40px !important;
            font-size: 1.125rem !important;
          }

          div[style*="height: 280px"],
          div[style*="height: 200px"] {
            height: 180px !important;
          }
        }
      `}</style>
    </div>
  );
}