import { useState, useEffect, useRef } from 'react';

export default function WelcomeScreen({ onComplete }) {
  const [name, setName] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const audioRef = useRef(null);

  // Check if user already visited
  useEffect(() => {
    const savedName = localStorage.getItem('visitorName');
    if (savedName) {
      setShowWelcome(false);
      onComplete(savedName);
    }
  }, [onComplete]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      setIsAnimating(true);
      
      // Save name to localStorage
      localStorage.setItem('visitorName', name.trim());
      
      // Play audio greeting (ganti dengan path audio kamu)
      if (audioRef.current) {
        audioRef.current.play().catch(err => console.log('Audio play failed:', err));
      }
      
      // Wait for animation and audio
      setTimeout(() => {
        setShowWelcome(false);
        onComplete(name.trim());
      }, 3000);
    }
  };

  if (!showWelcome) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      animation: isAnimating ? 'fadeOut 1s ease-out forwards' : 'none'
    }}>
      <audio 
        ref={audioRef} 
        src="/assets/audio/greeting.mp3"
        preload="auto"
      />

      <div style={{
        background: 'white',
        padding: '60px 80px',
        borderRadius: '30px',
        boxShadow: '0 30px 100px rgba(0,0,0,0.3)',
        textAlign: 'center',
        maxWidth: '500px',
        width: '90%',
        animation: isAnimating ? 'scaleOut 1s ease-out forwards' : 'scaleIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }}>
        {!isAnimating ? (
          <>
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              margin: '0 auto 30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '60px',
              animation: 'wave 1s ease-in-out infinite'
            }}>
              👋
            </div>

            <h1 style={{
              fontSize: '2.5em',
              marginBottom: '15px',
              color: '#2d3748',
              fontWeight: 700
            }}>
              Welcome!
            </h1>

            <p style={{
              color: '#718096',
              marginBottom: '30px',
              fontSize: '1.1em',
              lineHeight: '1.6'
            }}>
              Hi! I'm <span style={{ color: '#667eea', fontWeight: 600 }}>Felicia Annabel</span>.<br />
              Before we start, may I know your name?
            </p>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Type your name here..."
                autoFocus
                style={{
                  width: '100%',
                  padding: '18px 25px',
                  fontSize: '1.1em',
                  border: '2px solid #e2e8f0',
                  borderRadius: '15px',
                  outline: 'none',
                  marginBottom: '20px',
                  transition: 'all 0.3s ease',
                  fontFamily: "'Jeko', 'Poppins', sans-serif"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.boxShadow = '0 0 0 3px rgba(102,126,234,0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.boxShadow = 'none';
                }}
              />

              <button
                type="submit"
                disabled={!name.trim()}
                style={{
                  width: '100%',
                  padding: '18px',
                  fontSize: '1.1em',
                  fontWeight: 600,
                  background: name.trim() 
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                    : '#cbd5e0',
                  color: 'white',
                  border: 'none',
                  borderRadius: '15px',
                  cursor: name.trim() ? 'pointer' : 'not-allowed',
                  transition: 'all 0.3s ease',
                  fontFamily: "'Jeko', 'Poppins', sans-serif"
                }}
                onMouseEnter={(e) => {
                  if (name.trim()) {
                    e.target.style.transform = 'translateY(-3px)';
                    e.target.style.boxShadow = '0 10px 30px rgba(102,126,234,0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Let's Start! ✨
              </button>
            </form>
          </>
        ) : (
          <div style={{
            animation: 'fadeIn 0.5s ease-in'
          }}>
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              margin: '0 auto 30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '60px',
              animation: 'pulse 1s ease-in-out infinite'
            }}>
              🎉
            </div>

            <h1 style={{
              fontSize: '2.5em',
              marginBottom: '15px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700,
              animation: 'slideUp 0.5s ease-out'
            }}>
              Welcome, {name}! 👋
            </h1>

            <p style={{
              color: '#718096',
              fontSize: '1.1em',
              animation: 'slideUp 0.5s ease-out 0.2s backwards'
            }}>
              Let me show you my portfolio...
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeOut {
          to {
            opacity: 0;
            visibility: hidden;
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes scaleOut {
          to {
            transform: scale(0.9);
            opacity: 0;
          }
        }

        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-20deg); }
          75% { transform: rotate(20deg); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          div[style*="padding: 60px 80px"] {
            padding: 40px 30px !important;
          }

          h1 {
            font-size: 2em !important;
          }

          p {
            font-size: 1em !important;
          }
        }
      `}</style>
    </div>
  );
}