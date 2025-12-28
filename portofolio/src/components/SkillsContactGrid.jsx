// SkillsContactGrid.jsx - PROPER LAYOUT: Skills LEFT, Contact RIGHT

import SkillsCard from './SkillsCard.jsx';
import ContactCard from './ContactCard.jsx';

export default function SkillsContactGrid({ softwareTools, programmingTools, contacts }) {
  return (
    <div id="skills" style={{ 
      display: 'grid', 
      gridTemplateColumns: '1fr 1fr',
      gap: '30px', 
      marginBottom: '60px',
      alignItems: 'stretch' // Make both cards same height
    }}>
      {/* LEFT: Skills Card (Software & Programming) */}
      <SkillsCard 
        softwareTools={softwareTools} 
        programmingTools={programmingTools} 
      />
      
      {/* RIGHT: Contact Card */}
      <div id="contact" style={{ display: 'flex' }}>
        <ContactCard contacts={contacts} />
      </div>

      {/* Responsive Styles */}
      <style>{`
        /* Desktop - 2 columns */
        @media (min-width: 769px) {
          div[style*="gridTemplateColumns: 1fr 1fr"] {
            grid-template-columns: 1fr 1fr !important;
          }
        }

        /* Tablet & Mobile - Stack vertically */
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}