export default function ExperienceCard({ title, experiences }) {
  return (
    <div style={{
      background: 'white',
      padding: '25px',
      borderRadius: '15px',
      boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      position: 'relative',
      overflow: 'hidden'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-10px)';
      e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.08)';
    }}
    >
      <div style={{
        position: 'absolute',
        top: -100,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(180deg, rgba(102,126,234,0.05) 0%, transparent 100%)',
        transition: 'all 0.4s ease',
        pointerEvents: 'none'
      }} />
      
      <h3 style={{
        fontSize: '1.3em',
        marginBottom: '15px',
        color: '#2d3748',
        borderBottom: '2px solid #667eea',
        paddingBottom: '10px',
        fontWeight: 700,
        position: 'relative',
        transition: 'all 0.3s ease'
      }}>
        {title}
      </h3>

      {experiences.map((exp, idx) => (
        <div
          key={idx}
          style={{
            marginBottom: '20px',
            paddingBottom: idx < experiences.length - 1 ? '15px' : '0',
            borderBottom: idx < experiences.length - 1 ? '1px solid #e2e8f0' : 'none',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            position: 'relative',
            paddingLeft: '15px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.paddingLeft = '20px';
            e.currentTarget.style.background = 'rgba(102,126,234,0.02)';
            const border = e.currentTarget.querySelector('.exp-border');
            if (border) border.style.transform = 'scaleY(1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.paddingLeft = '15px';
            e.currentTarget.style.background = 'transparent';
            const border = e.currentTarget.querySelector('.exp-border');
            if (border) border.style.transform = 'scaleY(0)';
          }}
        >
          <div
            className="exp-border"
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '3px',
              background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
              transform: 'scaleY(0)',
              transition: 'all 0.3s ease'
            }}
          />
          
          <h4 style={{ color: '#2d3748', fontSize: '1.05em', marginBottom: '5px', fontWeight: 600, transition: 'all 0.3s ease' }}>
            {exp.title}
          </h4>
          <div style={{ color: '#667eea', fontSize: '0.95em', fontWeight: 600, marginBottom: '3px' }}>
            {exp.company}
          </div>
          <div style={{ color: '#718096', fontSize: '0.85em', marginBottom: '8px', fontStyle: 'italic', fontWeight: 400 }}>
            {exp.period}
          </div>
          <ul style={{ marginLeft: '20px', marginTop: '8px' }}>
            {exp.responsibilities.map((resp, i) => (
              <li key={i} style={{ color: '#4a5568', fontSize: '0.9em', lineHeight: '1.6', marginBottom: '4px', fontWeight: 400 }}>
                {resp}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}