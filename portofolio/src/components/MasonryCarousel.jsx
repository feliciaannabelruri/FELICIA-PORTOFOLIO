import { useState } from 'react';
import Masonry from './Mansory.jsx';

export default function MasonryCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slide 1: 3 project pertama
  const slide1 = [
    {
      id: "1",
      img: "/assets/lanyard/seblak.png",
      title: "Seblak Business",
      description: "Website programming for Business",
      height: 500,
      onClick: () => window.open('https://github.com/feliciaannabelruri/seb-lakweb', '_blank')
    },
    {
      id: "2",
      img: "/assets/lanyard/thelazzyjannah.png",
      title: "The Lazzy Jannah",
      description: "Game Development",
      height: 600,
      onClick: () => window.open('https://github.com/JazeL2304/TheLazyJannah', '_blank')
    },
    {
      id: "3",
      img: "/assets/lanyard/eventmanagement.png",
      title: "Event Management",
      description: "Campus & Community Figma Project",
      height: 450,
      onClick: () => window.open('https://www.figma.com/proto/CN8cAiYv9ANEHwhvz1yF5z/Event-management-mobile-app?node-id=1327-503&p=f&t=TkAQyYwFSxzPCOEV-0&scaling=min-zoom&content-scaling=fixed&page-id=1327%3A454&starting-point-node-id=1327%3A503', '_blank')
    }
  ];

  // Slide 2: SimakPajak, Melali In Bali, Rewear
  const slide2 = [
    {
      id: "4",
      img: "/assets/lanyard/SimakPajak.png",
      title: "SimakPajak",
      description: "Tax Consultation Website",
      height: 500,
      onClick: () => window.open('https://simakpajak.com', '_blank')
    },
    {
      id: "5",
      img: "/assets/lanyard/MelaliInBali.png",
      title: "Melali In Bali",
      description: "Bali Tourism Platform",
      height: 550,
      onClick: () => window.open('https://melali-in-bali.vercel.app', '_blank')
    },
    {
      id: "6",
      img: "/assets/lanyard/Rewear.png",
      title: "Rewear",
      description: "Sustainable Fashion Platform",
      height: 480,
      onClick: () => window.open('https://rewear-chi.vercel.app', '_blank')
    }
  ];

  // Slide 3: GGAI Sales, TSITP, Michelle
  const slide3 = [
    {
      id: "7",
      img: "/assets/lanyard/ggaisales.png",
      title: "Genius Growth AI Sales",
      description: "AI Sales Platform",
      height: 520,
      onClick: () => window.open('https://genius-growth-ai-sales.vercel.app', '_blank')
    },
    {
      id: "8",
      img: "/assets/lanyard/tsitp.png",
      title: "The Summer I Turned Pretty",
      description: "Unboxing Marketing Campaign TSITP Series",
      height: 550,
      onClick: () => window.open('https://the-summer-i-turned-pretty-marketin.vercel.app', '_blank')
    },
    {
      id: "9",
      img: "/assets/lanyard/michelle.png",
      title: "Michelle Portfolio",
      description: "Making Michelle Personal Portfolio Website",
      height: 500,
      onClick: () => window.open('https://michelle-seven.vercel.app', '_blank')
    }
  ];

  // Slide 4: Social Bread, Xdemia, GatherHub
  const slide4 = [
    {
      id: "10",
      img: "/assets/lanyard/socialbread.png",
      title: "Social Bread Inventory",
      description: "Inventory Management System",
      height: 530,
      onClick: () => window.open('https://social-bread-inventory.vercel.app', '_blank')
    },
    {
      id: "11",
      img: "/assets/lanyard/xdemia.png",
      title: "Xdemia Revamp",
      description: "Educational Platform Design",
      height: 500,
      onClick: () => window.open('https://www.figma.com/proto/dXb8mw5SgRNWv0s6o8c9cl/XDEMIA-REVAMP?m=draw&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&node-id=36-118&starting-point-node-id=392%3A4059&show-proto-sidebar=1', '_blank')
    },
    {
      id: "12",
      img: "/assets/lanyard/eventweb.png",
      title: "Web Project",
      description: "Event Management Mobile Website",
      height: 480,
      onClick: () => window.open('https://github.com/feliciaannabelruri/eventreg', '_blank')
    }
  ];

  const slides = [slide1, slide2, slide3, slide4];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Arrow Kiri */}
      <button
        onClick={prevSlide}
        style={{
          position: 'absolute',
          left: '-50px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 100,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          color: 'white',
          fontSize: '24px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 5px 20px rgba(0,0,0,0.3)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
          e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.3)';
        }}
      >
        ←
      </button>

      {/* Masonry Content */}
      <div style={{ overflow: 'hidden' }}>
        <Masonry
          key={currentSlide}
          items={slides[currentSlide]}
          ease="power3.out"
          duration={0.6}
          stagger={0.1}
          animateFrom="bottom"
          scaleOnHover={true}
          hoverScale={1.05}
          blurToFocus={true}
          colorShiftOnHover={false}
        />
      </div>

      {/* Arrow Kanan */}
      <button
        onClick={nextSlide}
        style={{
          position: 'absolute',
          right: '-50px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 100,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          color: 'white',
          fontSize: '24px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 5px 20px rgba(0,0,0,0.3)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
          e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.3)';
        }}
      >
        →
      </button>

      {/* Indicator Dots */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        marginTop: '30px'
      }}>
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentSlide(index)}
            style={{
              width: currentSlide === index ? '30px' : '10px',
              height: '10px',
              borderRadius: '5px',
              background: currentSlide === index 
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                : '#d2d6dc',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </div>

      <style>{`
        @media (max-width: 1200px) {
          button {
            left: 10px !important;
            right: 10px !important;
          }
        }

        @media (max-width: 768px) {
          button {
            width: 40px !important;
            height: 40px !important;
            font-size: 18px !important;
          }
        }
      `}</style>
    </div>
  );
}