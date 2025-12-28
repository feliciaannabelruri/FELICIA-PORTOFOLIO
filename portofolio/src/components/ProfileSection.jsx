export default function ProfileSection() {
  return (
    <div style={{ marginBottom: '60px' }}>
      {/* Profile Card + About Text Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gap: '30px',
        marginBottom: '30px',
        alignItems: 'stretch'
      }} className="profile-about-grid">
        
        {/* LEFT: Profile Card - WHITE BACKGROUND */}
        <div style={{
          background: 'white',
          borderRadius: '30px',
          padding: '40px 30px',
          border: '1px solid #F0F0F0',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center',
          minWidth: '280px',
          maxWidth: '320px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }} className="profile-card">
          
          {/* Coral Gradient Top Line */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, #FCEDD8 0%, #FFD464 25%, #FF5E5E 60%, #E23C64 85%, #B0183D 100%)'
          }} />

          {/* Profile Photo */}
          <div style={{
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '4px solid #F0F0F0',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
            marginBottom: '20px',
            background: 'linear-gradient(135deg, #E5E7EB, #F3F4F6)'
          }} className="profile-photo">
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

          {/* Name - DARK TEXT */}
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 800,
            color: '#1A1A1A',
            marginBottom: '6px',
            fontFamily: 'Outfit, sans-serif',
            letterSpacing: '-0.02em'
          }} className="profile-name">
            Felicia Annabel
          </h2>
          
          {/* Subtitle - DARK TEXT */}
          <p style={{
            fontSize: '0.9375rem',
            color: '#6B7280',
            fontWeight: 500,
            fontFamily: 'Space Grotesk, sans-serif',
            marginBottom: '20px'
          }} className="profile-subtitle">
            Backend Developer & IT Enthusiast
          </p>

          {/* Social Links */}
          <div style={{
            display: 'flex',
            gap: '10px'
          }} className="social-links">
            <a href="https://linkedin.com/in/felicia-annabel-ruriyanto-227a9125b" target="_blank" rel="noopener noreferrer" style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: '#FAFAFA',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FF5E5E',
              fontSize: '1.125rem',
              textDecoration: 'none',
              border: '1px solid #F0F0F0',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.background = '#FF5E5E';
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(255, 94, 94, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.background = '#FAFAFA';
              e.currentTarget.style.color = '#FF5E5E';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              💼
            </a>
            <a href="mailto:ffeliciaannabelruriyanto@gmail.com" style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: '#FAFAFA',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FF5E5E',
              fontSize: '1.125rem',
              textDecoration: 'none',
              border: '1px solid #F0F0F0',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.background = '#FF5E5E';
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(255, 94, 94, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.background = '#FAFAFA';
              e.currentTarget.style.color = '#FF5E5E';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              📧
            </a>
            <a href="tel:+6287736786969" style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: '#FAFAFA',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FF5E5E',
              fontSize: '1.125rem',
              textDecoration: 'none',
              border: '1px solid #F0F0F0',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.background = '#FF5E5E';
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(255, 94, 94, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.background = '#FAFAFA';
              e.currentTarget.style.color = '#FF5E5E';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              📱
            </a>
          </div>
        </div>

        {/* RIGHT: About Me Text - WHITE BACKGROUND WITH DARK TEXT */}
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
        }} className="about-card">
          
          {/* Coral Gradient Top Line */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, #FCEDD8 0%, #FFD464 25%, #FF5E5E 60%, #E23C64 85%, #B0183D 100%)'
          }} />

          {/* Title - DARK TEXT */}
          <h2 style={{
            fontSize: '2.25rem',
            fontWeight: 800,
            marginBottom: '20px',
            color: '#1A1A1A',
            fontFamily: 'Outfit, sans-serif',
            letterSpacing: '-0.02em'
          }} className="about-title">
            Hi, I'm <span style={{
              background: 'linear-gradient(135deg, #FF5E5E, #E23C64)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Felicia</span>
          </h2>

          {/* About Text - DARK COLOR FOR VISIBILITY */}
          <p style={{
            fontSize: '1rem',
            lineHeight: '1.8',
            color: '#1A1A1A',
            fontFamily: 'Space Grotesk, sans-serif',
            margin: 0
          }} className="about-text">
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

      {/* Responsive Styles */}
      <style>{`
        /* Tablet & Below - Stack Vertically */
        @media (max-width: 1024px) {
          .profile-about-grid {
            grid-template-columns: 1fr !important;
          }
          
          .profile-card {
            max-width: 100% !important;
            min-width: 100% !important;
          }
        }

        /* Tablet */
        @media (max-width: 768px) {
          .profile-card {
            padding: 30px 20px !important;
          }

          .profile-photo {
            width: 150px !important;
            height: 150px !important;
          }

          .profile-name {
            font-size: 1.375rem !important;
          }

          .profile-subtitle {
            font-size: 0.875rem !important;
          }

          .social-links a {
            width: 36px !important;
            height: 36px !important;
            font-size: 1rem !important;
          }

          .about-card {
            padding: 28px !important;
          }

          .about-title {
            font-size: 1.875rem !important;
          }
          
          .about-text {
            font-size: 0.9375rem !important;
            line-height: 1.7 !important;
          }
        }

        /* Mobile */
        @media (max-width: 480px) {
          .profile-card {
            padding: 24px 20px !important;
          }

          .profile-photo {
            width: 130px !important;
            height: 130px !important;
          }

          .profile-name {
            font-size: 1.25rem !important;
          }

          .profile-subtitle {
            font-size: 0.8125rem !important;
            margin-bottom: 16px !important;
          }

          .social-links {
            gap: 8px !important;
          }

          .social-links a {
            width: 34px !important;
            height: 34px !important;
            font-size: 0.9375rem !important;
          }

          .about-card {
            padding: 24px !important;
          }

          .about-title {
            font-size: 1.625rem !important;
            margin-bottom: 16px !important;
          }
          
          .about-text {
            font-size: 0.875rem !important;
            line-height: 1.65 !important;
          }
        }

        /* Small Mobile */
        @media (max-width: 360px) {
          .profile-card {
            padding: 20px 16px !important;
          }

          .profile-photo {
            width: 110px !important;
            height: 110px !important;
            margin-bottom: 16px !important;
          }

          .profile-name {
            font-size: 1.125rem !important;
            margin-bottom: 4px !important;
          }

          .profile-subtitle {
            font-size: 0.75rem !important;
          }

          .social-links a {
            width: 32px !important;
            height: 32px !important;
            font-size: 0.875rem !important;
          }

          .about-card {
            padding: 20px !important;
          }

          .about-title {
            font-size: 1.5rem !important;
            margin-bottom: 14px !important;
          }
          
          .about-text {
            font-size: 0.8125rem !important;
            line-height: 1.6 !important;
          }
        }
      `}</style>
    </div>
  );
}