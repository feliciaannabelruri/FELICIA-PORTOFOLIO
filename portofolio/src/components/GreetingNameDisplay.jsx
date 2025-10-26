export default function GreetingNameDisplay({ name }) {
  if (!name) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '80px',
      right: '20px',
      background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
      backdropFilter: 'blur(10px)',
      padding: '12px 25px',
      borderRadius: '50px',
      boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
      zIndex: 1999,
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      transition: 'all 0.3s ease',
      border: '1px solid rgba(102,126,234,0.2)',
      animation: 'slideInRight 0.5s ease-out'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateX(-5px)';
      e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateX(0)';
      e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
    }}
    >
      <div style={{
        width: '35px',
        height: '35px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '18px'
      }}>
        👤
      </div>
      
      <div>
        <div style={{
          fontSize: '0.75em',
          color: '#718096',
          fontWeight: 500,
          marginBottom: '2px'
        }}>
          Welcome back,
        </div>
        <div style={{
          fontSize: '1em',
          fontWeight: 700,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          {name}
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @media (max-width: 768px) {
          div[style*="position: fixed"][style*="top: 80px"][style*="right: 20px"] {
            top: 70px !important;
            right: 10px !important;
            padding: 8px 15px !important;
            z-index: 1999 !important;
          }

          div[style*="width: 35px"][style*="height: 35px"] {
            width: 28px !important;
            height: 28px !important;
            font-size: 14px !important;
          }

          div > div[style*="font-size: 0.75em"] {
            font-size: 0.65em !important;
          }

          div > div[style*="font-size: 1em"]:last-child {
            font-size: 0.85em !important;
          }
        }

        @media (max-width: 480px) {
          div[style*="position: fixed"][style*="top: 80px"][style*="right: 20px"] {
            top: 65px !important;
            right: 8px !important;
            padding: 6px 12px !important;
          }

          div[style*="width: 35px"][style*="height: 35px"] {
            width: 24px !important;
            height: 24px !important;
            font-size: 12px !important;
          }

          div > div[style*="font-size: 0.75em"] {
            font-size: 0.6em !important;
          }

          div > div[style*="font-size: 1em"]:last-child {
            font-size: 0.8em !important;
          }
        }
      `}</style>
    </div>
  );
}