import SplitText from './SplitText';

export default function Header() {
  return (
    <div style={{
      textAlign: 'center',
      marginBottom: '60px',
      background: 'white',
      padding: '60px 40px',
      borderRadius: '20px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.4s ease',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
    }}
    >
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '5px',
        background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
        animation: 'slideRight 3s infinite'
      }} />
      
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '40px',
        fontSize: '2.5em',
        color: '#d2a574',
        fontWeight: 400,
        transition: 'all 0.3s ease'
      }}>
        '25
      </div>
      
      <SplitText
        text="PORTFOLIO"
        tag="h1"
        delay={100}
        duration={0.8}
        ease="power4.out"
        from={{ opacity: 0, y: -50, scale: 0.8 }}
        to={{ opacity: 1, y: 0, scale: 1 }}
        textAlign="center"
      />
      
      <div style={{
        fontSize: '0.9em',
        color: '#d2a574',
        letterSpacing: '1px',
        marginTop: '10px',
        fontWeight: 400
      }}>
        FELICIA ANNABEL RURIYANTO
      </div>

      <style>{`
        @keyframes slideRight {
          0% { left: -100%; }
          50% { left: 100%; }
          100% { left: 100%; }
        }
        
        h1 {
          font-size: 4.5em;
          font-weight: 900;
          color: #000000;
          margin: 10px 0;
          letter-spacing: -2px;
          line-height: 0.9;
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 2.5em;
          }
        }
      `}</style>
    </div>
  );
}