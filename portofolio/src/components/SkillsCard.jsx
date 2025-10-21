export default function SkillsCard({ title, softwareTools, programmingTools, skills, fullWidth }) {
  return (
    <div style={{
      background: 'white',
      padding: '25px',
      borderRadius: '15px',
      boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
      transition: 'all 0.4s ease',
      gridColumn: fullWidth ? '1 / -1' : 'auto'
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
      <h3 style={{
        fontSize: '1.3em',
        marginBottom: '15px',
        color: '#2d3748',
        borderBottom: '2px solid #667eea',
        paddingBottom: '10px',
        fontWeight: 700
      }}>
        {title || 'SOFTWARE & TOOLS'}
      </h3>

      {softwareTools && (
        <>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {softwareTools.map((tool, idx) => (
              <div
                key={idx}
                style={{
                  padding: '8px 15px',
                  borderRadius: '8px',
                  background: tool.color,
                  color: tool.textColor || 'white',
                  fontSize: '0.85em',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px) scale(1.1) rotate(3deg)';
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1) rotate(0deg)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {tool.name}
              </div>
            ))}
          </div>

          {programmingTools && (
            <div style={{ marginTop: '15px' }}>
              <h4 style={{ fontSize: '0.95em', color: '#2d3748', marginBottom: '10px', fontWeight: 600 }}>
                Programming:
              </h4>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {programmingTools.map((tool, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '8px 15px',
                      borderRadius: '8px',
                      background: tool.color,
                      color: tool.textColor || 'white',
                      fontSize: '0.85em',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px) scale(1.1) rotate(3deg)';
                      e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1) rotate(0deg)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {tool.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {skills && (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {skills.map((skill, idx) => (
            <div
              key={idx}
              style={{
                padding: '8px 15px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                fontSize: '0.85em',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px) scale(1.1) rotate(3deg)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1) rotate(0deg)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {skill}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}