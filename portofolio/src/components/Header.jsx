import SplitText from './SplitText';

export default function Header() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #FCEDD8 0%, #FFD464 50%, #FF5E5E 100%)',
      padding: '100px 60px 80px',
      borderRadius: '24px',
      position: 'relative',
      overflow: 'hidden',
      marginBottom: '48px',
      boxShadow: '0 8px 32px rgba(255, 94, 94, 0.15)'
    }}>
      {/* Decorative Circles */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        right: '-80px',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite'
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: '-80px',
        left: '-60px',
        width: '250px',
        height: '250px',
        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 10s ease-in-out infinite',
        animationDelay: '2s'
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        {/* Portfolio Badge */}
        <div style={{
          display: 'inline-block',
          padding: '8px 20px',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          marginBottom: '24px',
          border: '1px solid rgba(255, 255, 255, 0.6)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
        }}>
          <span style={{
            fontSize: '0.8125rem',
            fontWeight: 700,
            color: '#E23C64',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            fontFamily: 'Outfit, sans-serif'
          }}>
            Portfolio 2025
          </span>
        </div>

        {/* Main Title */}
        <h1 style={{
          fontSize: 'clamp(3rem, 6vw, 5rem)',
          fontWeight: 900,
          color: 'white',
          margin: '0 0 16px 0',
          letterSpacing: '-0.03em',
          lineHeight: 1,
          fontFamily: 'Outfit, sans-serif',
          textShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
        }}>
          FELICIA ANNABEL RURIYANTO
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: '1.5rem',
          fontWeight: 600,
          color: 'rgba(255, 255, 255, 0.95)',
          marginBottom: '28px',
          fontFamily: 'Space Grotesk, sans-serif',
          letterSpacing: '-0.01em'
        }}>
          Backend Developer & IT Enthusiast
        </p>

        {/* Badges */}
        <div style={{
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginTop: '24px'
        }}>
          <div style={{
            padding: '8px 18px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
            fontSize: '0.875rem',
            color: '#FF5E5E',
            fontWeight: 700,
            border: '1px solid rgba(255, 255, 255, 0.6)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            fontFamily: 'Outfit, sans-serif',
            letterSpacing: '-0.01em'
          }}>
            🎓 UMN Student
          </div>
          <div style={{
            padding: '8px 18px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
            fontSize: '0.875rem',
            color: '#FFD464',
            fontWeight: 700,
            border: '1px solid rgba(255, 255, 255, 0.6)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            fontFamily: 'Outfit, sans-serif',
            letterSpacing: '-0.01em'
          }}>
            📱 Digital Marketing
          </div>
          <div style={{
            padding: '8px 18px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
            fontSize: '0.875rem',
            color: '#E23C64',
            fontWeight: 700,
            border: '1px solid rgba(255, 255, 255, 0.6)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            fontFamily: 'Outfit, sans-serif',
            letterSpacing: '-0.01em'
          }}>
            ✨ Content Creator
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(20px, -20px) scale(1.05);
          }
          66% {
            transform: translate(-20px, 10px) scale(0.95);
          }
        }

        @media (max-width: 768px) {
          div[style*="padding: 100px 60px 80px"] {
            padding: 60px 32px 50px !important;
          }

          h1 {
            font-size: 2.5rem !important;
            margin-bottom: 12px !important;
          }

          p[style*="font-size: 1.5rem"] {
            font-size: 1.125rem !important;
            margin-bottom: 20px !important;
          }

          div[style*="gap: 12px"] {
            gap: 8px !important;
          }

          div[style*="padding: 8px 18px"] {
            padding: 6px 14px !important;
            font-size: 0.8125rem !important;
          }
        }

        @media (max-width: 480px) {
          div[style*="padding: 100px 60px 80px"] {
            padding: 50px 24px 40px !important;
          }

          h1 {
            font-size: 2rem !important;
          }

          p[style*="font-size: 1.5rem"] {
            font-size: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
}