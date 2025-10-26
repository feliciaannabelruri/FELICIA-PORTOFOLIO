import { useEffect } from 'react';

export default function Modal({ project, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(10px)',
        zIndex: 2000,
        padding: '20px',
        overflowY: 'auto',
        animation: 'fadeIn 0.3s ease-out',
        WebkitOverflowScrolling: 'touch'
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'white',
          maxWidth: '900px',
          margin: '0 auto',
          borderRadius: '30px',
          padding: '50px',
          position: 'relative',
          animation: 'modalSlideIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          boxShadow: '0 30px 100px rgba(0,0,0,0.5)',
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
          hyphens: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            fontSize: '2em',
            cursor: 'pointer',
            color: '#718096',
            background: 'rgba(0,0,0,0.05)',
            border: 'none',
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            transition: 'all 0.3s ease',
            flexShrink: 0
          }}
          onClick={onClose}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            e.currentTarget.style.color = 'white';
            e.currentTarget.style.transform = 'rotate(90deg) scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(0,0,0,0.05)';
            e.currentTarget.style.color = '#718096';
            e.currentTarget.style.transform = 'rotate(0deg) scale(1)';
          }}
        >
          ×
        </button>

        <h2 style={{ 
          color: '#2d3748', 
          marginBottom: '10px', 
          fontWeight: 700,
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
          hyphens: 'auto',
          paddingRight: '60px'
        }}>
          {project.title}
        </h2>
        <h3 style={{ 
          color: '#667eea', 
          marginBottom: '20px', 
          fontSize: '1.1em', 
          fontWeight: 600,
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
          hyphens: 'auto'
        }}>
          {project.subtitle}
        </h3>
        <div 
          dangerouslySetInnerHTML={{ __html: project.content }} 
          style={{
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
            hyphens: 'auto'
          }}
        />
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(-50px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Modal Content Styling */
        div[dangerouslySetInnerHTML] h4 {
          word-wrap: break-word;
          overflow-wrap: break-word;
          hyphens: auto;
        }

        div[dangerouslySetInnerHTML] ul {
          word-wrap: break-word;
          overflow-wrap: break-word;
          padding-left: 20px;
        }

        div[dangerouslySetInnerHTML] li {
          word-wrap: break-word;
          overflow-wrap: break-word;
          hyphens: auto;
          margin-bottom: 8px;
        }

        div[dangerouslySetInnerHTML] strong {
          word-wrap: break-word;
          overflow-wrap: break-word;
        }

        div[dangerouslySetInnerHTML] > div {
          overflow-x: hidden;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          div[style*="padding: 20px"] {
            padding: 15px !important;
          }

          div[style*="padding: 50px"] {
            padding: 30px 20px !important;
            border-radius: 20px !important;
            max-width: 100% !important;
          }

          h2 {
            font-size: 1.3em !important;
            padding-right: 50px !important;
            margin-bottom: 8px !important;
          }

          h3 {
            font-size: 1em !important;
            margin-bottom: 15px !important;
          }

          button[style*="width: 50px"] {
            width: 40px !important;
            height: 40px !important;
            font-size: 1.5em !important;
            top: 15px !important;
            right: 15px !important;
          }

          div[dangerouslySetInnerHTML] h4 {
            font-size: 0.95em !important;
            margin-bottom: 8px !important;
          }

          div[dangerouslySetInnerHTML] ul {
            padding-left: 15px !important;
            margin-left: 0 !important;
          }

          div[dangerouslySetInnerHTML] li {
            font-size: 0.85em !important;
            line-height: 1.5 !important;
            margin-bottom: 6px !important;
          }

          div[dangerouslySetInnerHTML] strong {
            font-size: 0.9em !important;
          }

          div[dangerouslySetInnerHTML] > div[style*="display: grid"] {
            grid-template-columns: 1fr !important;
            gap: 10px !important;
          }

          div[dangerouslySetInnerHTML] > div[style*="padding: 15px"] {
            padding: 12px !important;
          }
        }

        @media (max-width: 480px) {
          div[style*="padding: 20px"] {
            padding: 10px !important;
          }

          div[style*="padding: 50px"] {
            padding: 25px 15px !important;
            border-radius: 15px !important;
          }

          h2 {
            font-size: 1.1em !important;
            padding-right: 45px !important;
          }

          h3 {
            font-size: 0.9em !important;
            margin-bottom: 12px !important;
          }

          button[style*="width: 50px"] {
            width: 35px !important;
            height: 35px !important;
            font-size: 1.3em !important;
            top: 12px !important;
            right: 12px !important;
          }

          div[dangerouslySetInnerHTML] h4 {
            font-size: 0.9em !important;
          }

          div[dangerouslySetInnerHTML] ul {
            padding-left: 12px !important;
          }

          div[dangerouslySetInnerHTML] li {
            font-size: 0.8em !important;
            line-height: 1.4 !important;
          }

          div[dangerouslySetInnerHTML] strong {
            font-size: 0.85em !important;
          }
        }

        @media (max-width: 360px) {
          div[style*="padding: 50px"] {
            padding: 20px 12px !important;
          }

          h2 {
            font-size: 1em !important;
          }

          h3 {
            font-size: 0.85em !important;
          }

          div[dangerouslySetInnerHTML] li {
            font-size: 0.75em !important;
          }
        }
      `}</style>
    </div>
  );
}