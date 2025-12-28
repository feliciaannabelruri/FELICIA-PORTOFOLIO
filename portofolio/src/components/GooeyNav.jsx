import { useRef, useEffect, useState } from 'react';
import './GooeyNav.css';

const GooeyNav = ({
  items,
  initialActiveIndex = 0
}) => {
  const containerRef = useRef(null);
  const navRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e, index) => {
    e.preventDefault();
    setActiveIndex(index);

    const sectionId = items[index].href.replace('#', '');
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div 
      className={`clean-nav-container ${isScrolled ? 'scrolled' : ''}`} 
      ref={containerRef}
    >
      <nav className="clean-nav">
        <ul ref={navRef}>
          {items.map((item, index) => (
            <li 
              key={index} 
              className={activeIndex === index ? 'active' : ''}
            >
              <a 
                href={item.href} 
                onClick={e => handleClick(e, index)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default GooeyNav;