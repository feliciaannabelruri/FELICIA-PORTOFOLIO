import { useState, useEffect, useRef } from 'react';

export default function WelcomeScreen({ onComplete }) {
  const [name, setName] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [audioError, setAudioError] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const audioRef = useRef(null);

  // Check if user already visited
  useEffect(() => {
    const savedName = localStorage.getItem('visitorName');
    if (savedName) {
      setShowWelcome(false);
      onComplete(savedName);
    }
  }, [onComplete]);

  // Block scroll while playing audio
  useEffect(() => {
    if (isPlayingAudio) {
      // Disable scroll
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      
      return () => {
        // Re-enable scroll
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      };
    }
  }, [isPlayingAudio]);

  // Countdown timer
  useEffect(() => {
    if (isPlayingAudio && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isPlayingAudio, countdown]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      setIsAnimating(true);
      setIsPlayingAudio(true);
      
      // Save name to localStorage
      localStorage.setItem('visitorName', name.trim());
      
      // Try to play audio
      if (audioRef.current && !audioError) {
        audioRef.current.play()
          .then(() => {
            console.log('Audio playing successfully');
          })
          .catch(err => {
            console.log('Audio play blocked:', err.message);
            setAudioError(true);
            // If audio blocked, continue after 5 seconds anyway
          });
      }
      
      // Wait for audio to finish (5 seconds) OR audio ends
      setTimeout(() => {
        setIsPlayingAudio(false);
        setShowWelcome(false);
        onComplete(name.trim());
      }, 5000);
    }
  };

  const handleAudioEnded = () => {
    console.log('Audio ended');
    // Audio selesai lebih cepat dari 5 detik
    if (isPlayingAudio) {
      setIsPlayingAudio(false);
      setShowWelcome(false);
      onComplete(name.trim());
    }
  };

  const handleAudioError = () => {
    setAudioError(true);
    console.log('Audio file not found');
  };

  if (!showWelcome) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: '#f8f5f2',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      animation: isAnimating && !isPlayingAudio ? 'fadeOut 0.5s ease-out forwards' : 'none'
    }}>
      <audio 
        ref={audioRef} 
        src="/assets/audio/greeting.mp3"
        preload="auto"
        onError={handleAudioError}
        onEnded={handleAudioEnded}
      />

      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(102,126,234,0.1) 0%, rgba(118,75,162,0.1) 100%)',
        top: '10%',
        left: '5%',
        animation: 'float 6s ease-in-out infinite',
        filter: 'blur(40px)'
      }} />
      
      <div style={{
        position: 'absolute',
        width: '250px',
        height: '250px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(118,75,162,0.15) 0%, rgba(102,126,234,0.15) 100%)',
        bottom: '15%',
        right: '10%',
        animation: 'float 8s ease-in-out infinite',
        animationDelay: '2s',
        filter: 'blur(40px)'
      }} />

      <div style={{
        background: 'white',
        padding: '50px 60px',
        borderRadius: '20px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
        textAlign: 'center',
        maxWidth: '500px',
        width: '100%',
        position: 'relative',
        animation: isAnimating && !isPlayingAudio ? 'scaleOut 0.5s ease-out forwards' : 'scaleIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        zIndex: 10
      }}>
        {/* Top Gradient Line */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '5px',
          background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '20px 20px 0 0'
        }} />

        {!isAnimating ? (
          <>
            {/* Welcome Icon */}
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(102,126,234,0.1) 0%, rgba(118,75,162,0.1) 100%)',
              margin: '0 auto 25px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '50px',
              animation: 'bounce 2s ease-in-out infinite'
            }}>
              👋
            </div>

            <h1 style={{
              fontSize: '2.5em',
              marginBottom: '10px',
              color: '#2d3748',
              fontWeight: 700,
              letterSpacing: '-1px'
            }}>
              Welcome!
            </h1>

            <p style={{
              color: '#718096',
              marginBottom: '30px',
              fontSize: '1em',
              lineHeight: '1.6'
            }}>
              Hi! I'm <span style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 700
              }}>Felicia Annabel</span>.<br />
              Before we start, may I know your name?
            </p>

            <div style={{ position: 'relative', width: '100%' }}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Type your name here..."
                autoFocus
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmit(e);
                  }
                }}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  fontSize: '1em',
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  outline: 'none',
                  marginBottom: '15px',
                  transition: 'all 0.3s ease',
                  fontFamily: "'Jeko', 'Poppins', sans-serif",
                  boxSizing: 'border-box'
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

              <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <button
                  onClick={handleSubmit}
                  disabled={!name.trim()}
                  className="start-button"
                  style={{
                    padding: '14px 40px',
                    fontSize: '1em',
                    fontWeight: 600,
                    background: name.trim() 
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                      : '#e2e8f0',
                    color: name.trim() ? 'white' : '#a0aec0',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: name.trim() ? 'pointer' : 'not-allowed',
                    transition: 'all 0.3s ease',
                    fontFamily: "'Jeko', 'Poppins', sans-serif",
                    boxShadow: name.trim() ? '0 5px 20px rgba(102,126,234,0.3)' : 'none',
                    minHeight: '50px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    whiteSpace: 'nowrap',
                    maxWidth: '100%',
                    width: 'auto'
                  }}
                  onMouseEnter={(e) => {
                    if (name.trim()) {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 10px 30px rgba(102,126,234,0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    if (name.trim()) {
                      e.target.style.boxShadow = '0 5px 20px rgba(102,126,234,0.3)';
                    }
                  }}
                >
                  <span className="button-text-full">Let's Start! ✨</span>
                  Start
                </button>
              </div>
            </div>
          </>
        ) : (
          <div style={{
            animation: 'fadeIn 0.5s ease-in'
          }}>
            {/* Playing Audio State */}
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              margin: '0 auto 25px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '50px',
              animation: isPlayingAudio ? 'pulse 1s ease-in-out infinite' : 'none',
              position: 'relative'
            }}>
              {isPlayingAudio ? '🔊' : '🎉'}
              
              {/* Countdown Badge */}
              {isPlayingAudio && countdown > 0 && (
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '-10px',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'white',
                  border: '3px solid #667eea',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#667eea',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
                }}>
                  {countdown}
                </div>
              )}
            </div>

            <h1 style={{
              fontSize: '2.5em',
              marginBottom: '10px',
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
              fontSize: '1em',
              animation: 'slideUp 0.5s ease-out 0.2s backwards'
            }}>
              {isPlayingAudio ? (
                <>
                  🎵 Playing welcome message...<br />
                  <span style={{ fontSize: '0.85em', color: '#a0aec0' }}>
                    Please wait {countdown} second{countdown !== 1 ? 's' : ''}
                  </span>
                </>
              ) : (
                'Let me show you my portfolio...'
              )}
            </p>
          </div>
        )}
      </div>

      <style>{`
        .button-text-full {
          display: inline;
        }
        
        .button-text-short {
          display: none;
        }

        @keyframes fadeOut {
          to {
            opacity: 0;
            visibility: hidden;
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes scaleOut {
          to {
            transform: scale(0.95);
            opacity: 0;
          }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes pulse {
          0%, 100% { 
            transform: scale(1);
            opacity: 1;
          }
          50% { 
            transform: scale(1.1);
            opacity: 0.8;
          }
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

        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(5deg);
          }
        }

        @media (max-width: 768px) {
          .button-text-full {
            display: none;
          }
          
          .button-text-short {
            display: inline;
          }

          div[style*="padding: 50px 60px"] {
            padding: 30px 25px !important;
          }

          h1 {
            font-size: 1.8em !important;
          }

          p {
            font-size: 0.9em !important;
            margin-bottom: 20px !important;
          }

          div[style*="width: 100px"] {
            width: 70px !important;
            height: 70px !important;
            font-size: 35px !important;
            margin-bottom: 20px !important;
          }

          input {
            font-size: 0.9em !important;
            padding: 12px 16px !important;
          }

          button {
            font-size: 0.9em !important;
            padding: 12px 28px !important;
            min-height: 44px !important;
          }

          div[style*="width: 40px"][style*="height: 40px"] {
            width: 35px !important;
            height: 35px !important;
            font-size: 14px !important;
          }
        }

        @media (max-width: 480px) {
          div[style*="padding: 50px 60px"] {
            padding: 25px 20px !important;
          }

          h1 {
            font-size: 1.6em !important;
          }

          p {
            font-size: 0.85em !important;
            line-height: 1.5 !important;
            margin-bottom: 20px !important;
          }

          div[style*="width: 100px"] {
            width: 60px !important;
            height: 60px !important;
            font-size: 30px !important;
            margin-bottom: 18px !important;
          }

          input {
            font-size: 0.85em !important;
            padding: 10px 14px !important;
            margin-bottom: 12px !important;
          }

          button {
            font-size: 0.85em !important;
            padding: 10px 24px !important;
            min-height: 40px !important;
          }

          div[style*="width: 40px"][style*="height: 40px"] {
            width: 32px !important;
            height: 32px !important;
            font-size: 13px !important;
          }
        }

        @media (max-width: 360px) {
          div[style*="padding: 50px 60px"] {
            padding: 20px 15px !important;
          }

          h1 {
            font-size: 1.4em !important;
          }

          p {
            font-size: 0.8em !important;
            margin-bottom: 18px !important;
          }

          div[style*="width: 100px"] {
            width: 50px !important;
            height: 50px !important;
            font-size: 25px !important;
            margin-bottom: 15px !important;
          }

          input {
            font-size: 0.8em !important;
            padding: 10px 12px !important;
            margin-bottom: 10px !important;
          }

          button {
            font-size: 0.8em !important;
            padding: 10px 22px !important;
            min-height: 38px !important;
          }

          div[style*="width: 40px"][style*="height: 40px"] {
            width: 28px !important;
            height: 28px !important;
            font-size: 12px !important;
          }
        }
      `}</style>
    </div>
  );
}