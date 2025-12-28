export default function ExperienceCard({ title, experiences }) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '20px',
      border: '1px solid #F0F0F0',
      padding: '32px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      overflow: 'hidden',
      height: '100%'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 8px 32px rgba(255, 94, 94, 0.12)';
      e.currentTarget.style.borderColor = '#FCEDD8';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
      e.currentTarget.style.borderColor = '#F0F0F0';
    }}
    >
      {/* Coral Gradient Top Line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, #FCEDD8 0%, #FFD464 25%, #FF5E5E 60%, #E23C64 85%, #B0183D 100%)',
        transform: 'scaleX(0)',
        transformOrigin: 'left',
        transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
      className="exp-gradient"
      />

      {/* Title */}
      <div style={{
        marginBottom: '28px',
        paddingBottom: '20px',
        borderBottom: '1px solid #F5F5F5'
      }}>
        <h3 style={{
          fontSize: '1.125rem',
          fontWeight: 700,
          color: '#1A1A1A',
          fontFamily: 'Outfit, sans-serif',
          letterSpacing: '-0.01em',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          margin: 0
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
            💼
          </span>
          {title}
        </h3>
      </div>

      {/* Experience Items - Clean Version */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '16px' 
      }}>
        {experiences.map((exp, idx) => (
          <div
            key={idx}
            style={{
              padding: '16px 18px',
              background: '#FAFAFA',
              borderRadius: '12px',
              border: '1px solid #F0F0F0',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              position: 'relative'
            }}
            className="exp-item"
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.transform = 'translateX(4px)';
              e.currentTarget.style.borderColor = '#FCEDD8';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 94, 94, 0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#FAFAFA';
              e.currentTarget.style.transform = 'translateX(0)';
              e.currentTarget.style.borderColor = '#F0F0F0';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Left Coral Accent */}
            <div style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '3px',
              background: 'linear-gradient(180deg, #FF5E5E 0%, #E23C64 100%)',
              transform: 'scaleY(0)',
              transformOrigin: 'top',
              transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              borderRadius: '0 3px 3px 0'
            }}
            className="exp-border"
            />

            {/* Title */}
            <h4 style={{ 
              color: '#1A1A1A', 
              fontSize: '1rem', 
              marginBottom: '8px', 
              fontWeight: 600,
              fontFamily: 'Outfit, sans-serif',
              letterSpacing: '-0.01em',
              lineHeight: 1.3
            }}>
              {exp.title}
            </h4>

            {/* Company Badge */}
            <div style={{ 
              display: 'inline-block',
              background: 'linear-gradient(135deg, rgba(255, 94, 94, 0.1), rgba(226, 60, 100, 0.1))',
              color: '#FF5E5E', 
              fontSize: '0.8125rem', 
              fontWeight: 700,
              padding: '4px 12px',
              borderRadius: '8px',
              marginBottom: '8px',
              border: '1px solid rgba(255, 94, 94, 0.15)',
              fontFamily: 'Outfit, sans-serif',
              letterSpacing: '-0.01em'
            }}>
              {exp.company}
            </div>

            {/* Period */}
            <div style={{ 
              color: '#9E9E9E', 
              fontSize: '0.8125rem',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'Space Grotesk, sans-serif'
            }}>
              <span style={{
                display: 'inline-flex',
                width: '5px',
                height: '5px',
                background: '#FF5E5E',
                borderRadius: '50%'
              }} />
              {exp.period}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (hover: hover) {
          div:hover .exp-gradient {
            transform: scaleX(1);
          }

          .exp-item:hover .exp-border {
            transform: scaleY(1);
          }
        }

        @media (max-width: 768px) {
          div[style*="padding: 32px"] {
            padding: 24px !important;
          }

          h3 {
            font-size: 1rem !important;
          }

          .exp-item {
            padding: 14px 16px !important;
          }
        }

        @media (max-width: 480px) {
          div[style*="padding: 32px"] {
            padding: 20px !important;
          }

          h3 {
            font-size: 0.9375rem !important;
          }

          .exp-item {
            padding: 12px 14px !important;
          }

          h4 {
            font-size: 0.9375rem !important;
          }
        }
      `}</style>
    </div>
  );
}