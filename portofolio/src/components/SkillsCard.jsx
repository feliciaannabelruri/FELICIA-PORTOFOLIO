// SkillsCard-WithLogos.jsx - WITH REAL LOGOS

export default function SkillsCard() {
  // Software & Tools with logo URLs
  const softwareTools = [
    { 
      name: "Canva", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Canva_icon_2021.svg",
      color: "#00C4CC" 
    },
    { 
      name: "CapCut", 
      logo: "https://sf16-sg.tiktokcdn.com/obj/eden-sg/uhtyvueh7nulogpoguhm/capcut-icon.png",
      color: "#000000" 
    },
    { 
      name: "MS Office", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Microsoft_Office_logo_%282019%E2%80%93present%29.svg",
      color: "#D83B01" 
    },
    { 
      name: "Notion", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png",
      color: "#000000" 
    },
    { 
      name: "Trello", 
      logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/trello.svg",
      color: "#0079BF" 
    },
    { 
      name: "Social Blade", 
      logo: "https://socialblade.com/apple-touch-icon.png",
      color: "#FF5E5E" 
    }
  ];

  // Programming Languages with logos
  const programmingLanguages = [
    { 
      name: "VS Code", 
      logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/visualstudiocode.svg",
      color: "#007ACC" 
    },
    { 
      name: "PHP", 
      logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/php.svg",
      color: "#777BB4" 
    },
    { 
      name: "HTML", 
      logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/html5.svg",
      color: "#E34F26" 
    },
    { 
      name: "Laravel", 
      logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/laravel.svg",
      color: "#FF2D20" 
    },
    { 
      name: "JavaScript", 
      logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/javascript.svg",
      color: "#F7DF1E" 
    },
    { 
      name: "C", 
      logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/c.svg",
      color: "#A8B9CC" 
    },
    { 
      name: "Kotlin", 
      logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/kotlin.svg",
      color: "#7F52FF" 
    },
    { 
      name: "Python", 
      logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/python.svg",
      color: "#3776AB" 
    }
  ];

  return (
    <div style={{
      background: 'white',
      borderRadius: '20px',
      padding: '32px',
      border: '1px solid #F0F0F0',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Coral Gradient Top Line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, #FCEDD8 0%, #FFD464 25%, #FF5E5E 60%, #E23C64 85%, #B0183D 100%)'
      }} />

      {/* SOFTWARE & TOOLS SECTION */}
      <div style={{ marginBottom: '32px' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '20px'
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
            ⚡
          </span>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: 700,
            color: '#1A1A1A',
            fontFamily: 'Outfit, sans-serif',
            letterSpacing: '-0.01em',
            margin: 0
          }}>
            Software & Tools
          </h3>
        </div>

        {/* Tools Grid with Logos */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '12px'
        }}>
          {softwareTools.map((tool, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 16px',
                background: '#FAFAFA',
                border: '1px solid #F0F0F0',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                cursor: 'default'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 94, 94, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(255, 94, 94, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = '#F0F0F0';
              }}
            >
              {/* Logo */}
              <div style={{
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <img 
                  src={tool.logo}
                  alt={tool.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div style="width:28px;height:28px;background:' + tool.color + ';border-radius:6px"></div>';
                  }}
                />
              </div>

              {/* Tool Name */}
              <span style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#1A1A1A',
                fontFamily: 'Outfit, sans-serif'
              }}>
                {tool.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* PROGRAMMING LANGUAGES SECTION */}
      <div>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '20px'
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
            💻
          </span>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: 700,
            color: '#1A1A1A',
            fontFamily: 'Outfit, sans-serif',
            letterSpacing: '-0.01em',
            margin: 0
          }}>
            Programming
          </h3>
        </div>

        {/* Programming Grid with Logos */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '12px'
        }}>
          {programmingLanguages.map((lang, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 16px',
                background: '#FAFAFA',
                border: '1px solid #F0F0F0',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                cursor: 'default'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 94, 94, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(255, 94, 94, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = '#F0F0F0';
              }}
            >
              {/* Logo */}
              <div style={{
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <img 
                  src={lang.logo}
                  alt={lang.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    filter: lang.name === 'JavaScript' ? 'none' : 'brightness(0.9)'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div style="width:28px;height:28px;background:' + lang.color + ';border-radius:6px"></div>';
                  }}
                />
              </div>

              {/* Language Name */}
              <span style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#1A1A1A',
                fontFamily: 'Outfit, sans-serif'
              }}>
                {lang.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns: repeat(auto-fit, minmax(140px, 1fr))"] {
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)) !important;
          }

          span[style*="fontSize: 0.875rem"] {
            font-size: 0.8125rem !important;
          }

          div[style*="padding: 12px 16px"] {
            padding: 10px 12px !important;
          }
        }

        @media (max-width: 480px) {
          div[style*="gridTemplateColumns: repeat(auto-fit, minmax(140px, 1fr))"],
          div[style*="gridTemplateColumns: repeat(auto-fit, minmax(120px, 1fr))"] {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}