export default function ContactCard() {
  const contactInfo = [
    {
      icon: "📧",
      label: "Email",
      value: "ffeliciaannabelruriyanto@gmail.com",
      link: "mailto:ffeliciaannabelruriyanto@gmail.com",
      color: "#FF5E5E"
    },
    {
      icon: "📱",
      label: "Phone",
      value: "+62 877-3678-6969",
      link: "tel:+6287736786969",
      color: "#FFD464"
    },
    {
      icon: "💼",
      label: "LinkedIn",
      value: "linkedin.com/in/felicia-annabel-ruriyanto",
      link: "https://linkedin.com/in/felicia-annabel-ruriyanto-227a9125b",
      color: "#E23C64"
    },
    {
      icon: "📍",
      label: "Location",
      value: "Kab. Tangerang, Pagedangan, Banten",
      link: null,
      color: "#B0183D"
    }
  ];

  const availability = [
    { label: "Open to work", available: true },
    { label: "Freelance", available: true },
    { label: "Full-time", available: true },
    { label: "Remote", available: true }
  ];

  return (
    <div style={{
      background: 'white',
      borderRadius: '20px',
      padding: '32px',
      border: '1px solid #F0F0F0',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
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

      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '24px'
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
          📬
        </span>
        <h3 style={{
          fontSize: '1.125rem',
          fontWeight: 700,
          color: '#1A1A1A',
          fontFamily: 'Outfit, sans-serif',
          letterSpacing: '-0.01em',
          margin: 0
        }}>
          Contact
        </h3>
      </div>

      {/* Contact Items */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        marginBottom: '24px'
      }}>
        {contactInfo.map((item, index) => (
          <div
            key={index}
            style={{
              background: '#FAFAFA',
              borderRadius: '12px',
              padding: '14px 16px',
              border: '1px solid #F0F0F0',
              transition: 'all 0.3s ease',
              cursor: item.link ? 'pointer' : 'default'
            }}
            onClick={() => item.link && window.open(item.link, '_blank')}
            onMouseEnter={(e) => {
              if (item.link) {
                e.currentTarget.style.transform = 'translateX(4px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 94, 94, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(255, 94, 94, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (item.link) {
                e.currentTarget.style.transform = 'translateX(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = '#F0F0F0';
              }
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              {/* Icon */}
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: `linear-gradient(135deg, ${item.color}15, ${item.color}25)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.125rem',
                flexShrink: 0
              }}>
                {item.icon}
              </div>

              {/* Content */}
              <div style={{
                flex: 1,
                minWidth: 0
              }}>
                {/* Label */}
                <div style={{
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  color: '#9E9E9E',
                  marginBottom: '2px',
                  fontFamily: 'Outfit, sans-serif',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {item.label}
                </div>

                {/* Value */}
                <div style={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: '#1A1A1A',
                  fontFamily: 'Space Grotesk, sans-serif',
                  lineHeight: '1.3',
                  wordBreak: 'break-word'
                }}>
                  {item.value}
                </div>
              </div>

              {/* Arrow */}
              {item.link && (
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '6px',
                  background: item.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '0.75rem',
                  flexShrink: 0,
                  fontWeight: 'bold'
                }}>
                  →
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Availability Status */}
      <div style={{
        padding: '16px',
        background: 'linear-gradient(135deg, rgba(255, 94, 94, 0.05), rgba(226, 60, 100, 0.05))',
        borderRadius: '12px',
        border: '1px solid rgba(255, 94, 94, 0.1)',
        marginBottom: '20px'
      }}>
        <h4 style={{
          fontSize: '0.8125rem',
          fontWeight: 700,
          color: '#1A1A1A',
          marginBottom: '12px',
          fontFamily: 'Outfit, sans-serif',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          Availability
        </h4>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '8px'
        }}>
          {availability.map((item, idx) => (
            <div key={idx} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.8125rem',
              fontFamily: 'Space Grotesk, sans-serif'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: item.available ? '#10B981' : '#9E9E9E'
              }} />
              <span style={{
                color: '#4A5568',
                fontWeight: 500
              }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Response Time */}
      <div style={{
        padding: '12px 16px',
        background: '#FAFAFA',
        borderRadius: '10px',
        border: '1px solid #F0F0F0',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <span style={{ fontSize: '1.25rem' }}>⚡</span>
        <div>
          <div style={{
            fontSize: '0.75rem',
            color: '#9E9E9E',
            fontWeight: 600,
            fontFamily: 'Outfit, sans-serif',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: '2px'
          }}>
            Response Time
          </div>
          <div style={{
            fontSize: '0.875rem',
            color: '#1A1A1A',
            fontWeight: 600,
            fontFamily: 'Space Grotesk, sans-serif'
          }}>
            Usually within 24 hours
          </div>
        </div>
      </div>

      {/* CTA Button - Now at bottom with flex-grow spacer */}
      <div style={{
        marginTop: 'auto',
        paddingTop: '16px'
      }}>
        <p style={{
          fontSize: '0.8125rem',
          color: '#6B7280',
          marginBottom: '12px',
          fontFamily: 'Space Grotesk, sans-serif',
          lineHeight: '1.5',
          textAlign: 'center'
        }}>
          Let's work together! Feel free to reach out 👋
        </p>

        <button
          style={{
            width: '100%',
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #FF5E5E, #E23C64)',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontSize: '0.875rem',
            fontWeight: 600,
            fontFamily: 'Outfit, sans-serif',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 8px rgba(255, 94, 94, 0.2)'
          }}
          onClick={() => window.open('mailto:ffeliciaannabelruriyanto@gmail.com', '_blank')}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(255, 94, 94, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(255, 94, 94, 0.2)';
          }}
        >
          Send Email →
        </button>
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 1024px) {
          div[style*="height: 100%"] {
            height: auto !important;
          }
        }

        @media (max-width: 768px) {
          div[style*="padding: 32px"] {
            padding: 24px !important;
          }

          div[style*="fontSize: 0.875rem"] {
            font-size: 0.8125rem !important;
          }

          div[style*="padding: 14px 16px"] {
            padding: 12px 14px !important;
          }

          div[style*="width: 36px"] {
            width: 32px !important;
            height: 32px !important;
          }
        }

        @media (max-width: 480px) {
          div[style*="padding: 32px"],
          div[style*="padding: 24px"] {
            padding: 20px !important;
          }

          div[style*="gridTemplateColumns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }

          button[style*="padding: 12px 24px"] {
            padding: 10px 20px !important;
            font-size: 0.8125rem !important;
          }
        }
      `}</style>
    </div>
  );
}