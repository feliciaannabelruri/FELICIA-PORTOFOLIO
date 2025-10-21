import Folder from './Folder';

export default function ProjectFolder({ id, title, description, color, number, onClick }) {
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
        overflow: 'hidden'
      }}
      onClick={onClick}
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
        <Folder size={1.2} color={color} />
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
        transition: 'all 0.3s ease'
      }}>
        {title}
      </h3>
      
      <p style={{
        color: '#718096',
        lineHeight: '1.6',
        fontSize: '0.95em',
        fontWeight: 400,
        position: 'relative',
        zIndex: 1
      }}>
        {description}
      </p>
    </div>
  );
}