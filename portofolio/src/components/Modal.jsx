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
        zIndex: 2001,
        padding: '20px',
        overflowY: 'auto',
        animation: 'fadeIn 0.3s ease-out',
        WebkitOverflowScrolling: 'touch'
      }}
      onClick={onClose}
    >
      {/* Close Button - Outside content box */}
      <button
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          fontSize: '2em',
          cursor: 'pointer',
          color: 'white',
          background: 'rgba(0,0,0,0.5)',
          border: '2px solid rgba(255,255,255,0.3)',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          transition: 'all 0.3s ease',
          flexShrink: 0,
          zIndex: 2002
        }}
        onClick={onClose}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.8)';
          e.currentTarget.style.transform = 'rotate(90deg) scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(0,0,0,0.5)';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
          e.currentTarget.style.transform = 'rotate(0deg) scale(1)';
        }}
      >
        ×
      </button>

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
        <h2 style={{ 
          color: '#2d3748', 
          marginBottom: '10px', 
          fontWeight: 700,
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
          hyphens: 'auto'
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
          className="modal-content"
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
        .modal-content h4 {
          word-wrap: break-word;
          overflow-wrap: break-word;
          hyphens: auto;
        }

        .modal-content ul {
          word-wrap: break-word;
          overflow-wrap: break-word;
          padding-left: 20px;
          margin-left: 0;
        }

        .modal-content li {
          word-wrap: break-word;
          overflow-wrap: break-word;
          hyphens: auto;
          margin-bottom: 8px;
        }

        .modal-content strong {
          word-wrap: break-word;
          overflow-wrap: break-word;
        }

        .modal-content > div {
          overflow-x: hidden;
        }

        /* Force grid to single column on mobile */
        .modal-content div[style*="display: grid"] {
          display: block !important;
        }

        .modal-content div[style*="display: grid"] > div {
          margin-bottom: 15px;
          width: 100%;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          /* Close button mobile */
          button[style*="position: fixed"][style*="top: 20px"] {
            top: 15px !important;
            right: 15px !important;
            width: 45px !important;
            height: 45px !important;
            font-size: 1.8em !important;
            background: rgba(255,255,255,0.95) !important;
            color: #2d3748 !important;
            border: 2px solid rgba(102,126,234,0.3) !important;
          }

          /* Outer padding */
          div[style*="padding: 20px"][style*="overflowY"] {
            padding: 15px !important;
          }

          /* Content box */
          div[style*="padding: 50px"] {
            padding: 30px 20px !important;
            border-radius: 20px !important;
            max-width: 100% !important;
          }

          h2 {
            font-size: 1.3em !important;
            margin-bottom: 8px !important;
          }

          h3 {
            font-size: 1em !important;
            margin-bottom: 15px !important;
          }

          .modal-content h4 {
            font-size: 0.95em !important;
            margin-bottom: 8px !important;
          }

          .modal-content ul {
            padding-left: 15px !important;
          }

          .modal-content li {
            font-size: 0.85em !important;
            line-height: 1.5 !important;
            margin-bottom: 6px !important;
          }

          .modal-content strong {
            font-size: 0.9em !important;
          }

          /* Force all grids to stack */
          .modal-content div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }

          .modal-content div[style*="padding: 15px"] {
            padding: 12px !important;
          }
        }

        @media (max-width: 480px) {
          /* Close button small mobile */
          button[style*="position: fixed"][style*="top: 20px"] {
            top: 10px !important;
            right: 10px !important;
            width: 40px !important;
            height: 40px !important;
            font-size: 1.6em !important;
          }

          /* Outer padding */
          div[style*="padding: 20px"][style*="overflowY"] {
            padding: 10px !important;
          }

          /* Content box */
          div[style*="padding: 50px"] {
            padding: 25px 15px !important;
            border-radius: 15px !important;
          }

          h2 {
            font-size: 1.1em !important;
          }

          h3 {
            font-size: 0.9em !important;
            margin-bottom: 12px !important;
          }

          .modal-content h4 {
            font-size: 0.9em !important;
          }

          .modal-content ul {
            padding-left: 12px !important;
          }

          .modal-content li {
            font-size: 0.8em !important;
            line-height: 1.4 !important;
          }

          .modal-content strong {
            font-size: 0.85em !important;
          }

          .modal-content div[style*="padding: 15px"] {
            padding: 10px !important;
          }
        }

        @media (max-width: 360px) {
          button[style*="position: fixed"][style*="top: 20px"] {
            top: 8px !important;
            right: 8px !important;
            width: 35px !important;
            height: 35px !important;
            font-size: 1.4em !important;
          }

          div[style*="padding: 50px"] {
            padding: 20px 12px !important;
          }

          h2 {
            font-size: 1em !important;
          }

          h3 {
            font-size: 0.85em !important;
          }

          .modal-content li {
            font-size: 0.75em !important;
          }
        }
      `}</style>
    </div>
  );
}