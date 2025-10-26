import { useRef } from 'react';
import Folder from './Folder';

export default function ProjectFolder({ id, title, description, color, number, onClick }) {
  const folderRef = useRef(null);

  const handleClick = () => {
    // Trigger onClick untuk buka modal
    onClick();
    
    // Reset folder animation setelah delay
    setTimeout(() => {
      if (folderRef.current) {
        folderRef.current.resetFolder();
      }
    }, 300);
  };

  return (
    <div
      style={{
        background: 'white',
        borderRadius: '15px',
        padding: '30px',
        boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
        transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
      onClick={handleClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-15px) scale(1.02)';
        e.currentTarget.style.boxShadow = '0 25px 60px rgba(0,0,0,0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.08)';
      }}
    >
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 0,
        height: 0,
        borderRadius: '50%',
        background: 'rgba(102,126,234,0.1)',
        transform: 'translate(-50%, -50%)',
        transition: 'all 0.6s ease',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div style={{ 
        height: '200px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        position: 'relative',
        marginBottom: '20px'
      }}>
        <Folder ref={folderRef} size={1.2} color={color} />
        <div style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          fontSize: '5em',
          fontWeight: 900,
          color: color,
          opacity: 0.3,
          transition: 'all 0.4s ease',
          pointerEvents: 'none'
        }}>
          {number}
        </div>
      </div>

      <h3 style={{
        fontSize: '1.3em',
        color: '#2d3748',
        marginBottom: '10px',
        fontWeight: 700,
        position: 'relative',
        zIndex: 1,
        transition: 'all 0.3s ease',
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
        hyphens: 'auto'
      }}>
        {title}
      </h3>
      
      <p style={{
        color: '#718096',
        lineHeight: '1.6',
        fontSize: '0.95em',
        fontWeight: 400,
        position: 'relative',
        zIndex: 1,
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
        hyphens: 'auto',
        flex: 1
      }}>
        {description}
      </p>

      <style>{`
        @media (max-width: 768px) {
          div[style*="padding: 30px"] {
            padding: 20px !important;
          }
          
          div[style*="height: 200px"] {
            height: 150px !important;
            margin-bottom: 15px !important;
          }
          
          h3 {
            font-size: 1.1em !important;
          }
          
          p {
            font-size: 0.9em !important;
          }
          
          div[style*="fontSize: 5em"] {
            font-size: 3.5em !important;
          }
        }

        @media (max-width: 480px) {
          div[style*="padding: 30px"] {
            padding: 15px !important;
          }
          
          div[style*="height: 200px"] {
            height: 120px !important;
            margin-bottom: 12px !important;
          }
          
          h3 {
            font-size: 1em !important;
            margin-bottom: 8px !important;
          }
          
          p {
            font-size: 0.85em !important;
            line-height: 1.5 !important;
          }
          
          div[style*="fontSize: 5em"] {
            font-size: 3em !important;
            bottom: 5px !important;
            right: 5px !important;
          }
        }
      `}</style>
    </div>
  );
}