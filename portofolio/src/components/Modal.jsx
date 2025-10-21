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
        padding: '40px 20px',
        overflowY: 'auto',
        animation: 'fadeIn 0.3s ease-out'
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
          boxShadow: '0 30px 100px rgba(0,0,0,0.5)'
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
            transition: 'all 0.3s ease'
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

        <h2 style={{ color: '#2d3748', marginBottom: '10px', fontWeight: 700 }}>
          {project.title}
        </h2>
        <h3 style={{ color: '#667eea', marginBottom: '20px', fontSize: '1.1em', fontWeight: 600 }}>
          {project.subtitle}
        </h3>
        <div dangerouslySetInnerHTML={{ __html: project.content }} />
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
      `}</style>
    </div>
  );
}