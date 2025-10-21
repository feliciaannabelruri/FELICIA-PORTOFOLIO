import { useState } from 'react';

export default function ContactCard({ contacts }) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div style={{
      background: 'white',
      padding: '25px',
      borderRadius: '15px',
      boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
      transition: 'all 0.4s ease'
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
        CONTACT
      </h3>

      {contacts.map((contact, idx) => (
        <div
          key={idx}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '15px',
            color: copiedIndex === idx ? 'white' : '#4a5568',
            fontSize: '0.95em',
            fontWeight: 400,
            padding: '10px',
            borderRadius: '8px',
            transition: 'all 0.3s ease',
            cursor: contact.copyable || contact.link ? 'pointer' : 'default',
            background: copiedIndex === idx ? 'linear-gradient(135deg, #8fb569 0%, #7a9e5a 100%)' : 'transparent'
          }}
          onClick={() => {
            if (contact.copyable) {
              handleCopy(contact.text, idx);
            } else if (contact.link) {
              window.open(contact.link, '_blank');
            }
          }}
          onMouseEnter={(e) => {
            if (contact.copyable || contact.link) {
              e.currentTarget.style.background = copiedIndex === idx ? 
                'linear-gradient(135deg, #8fb569 0%, #7a9e5a 100%)' : 
                'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.transform = 'translateX(10px)';
              e.currentTarget.style.paddingLeft = '20px';
            }
          }}
          onMouseLeave={(e) => {
            if (copiedIndex !== idx) {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#4a5568';
            }
            e.currentTarget.style.transform = 'translateX(0)';
            e.currentTarget.style.paddingLeft = '10px';
          }}
        >
          <div style={{
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease'
          }}>
            {copiedIndex === idx ? '✓' : contact.icon}
          </div>
          <span>{copiedIndex === idx ? 'Copied!' : contact.text}</span>
        </div>
      ))}
    </div>
  );
}