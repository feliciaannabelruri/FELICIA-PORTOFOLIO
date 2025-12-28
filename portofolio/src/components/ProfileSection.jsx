import ProfileCard from './ProfileCard.jsx';
import MasonryCarousel from './MasonryCarousel.jsx';

export default function ProfileSection() {
  return (
    <div className="profile-section-container">
      {/* Profile Card */}
      <div className="profile-card-wrapper">
        <ProfileCard
          name="Felicia Annabel"
          title="Backend Developer & IT Enthusiast"
          handle="feliciaannabel"
          status="Available for Work"
          contactText="📧"
          avatarUrl="/assets/lanyard/lanyard.png"
          miniAvatarUrl="/assets/lanyard/lanyard.png"
          showUserInfo={true}
          enableTilt={true}
          enableMobileTilt={false}
          onContactClick={() => {
            window.location.href = 'mailto:ffeliciaannabelruriyanto@gmail.com';
          }}
        />
      </div>

      {/* Profile Info */}
      <div className="profile-info-box">
        <h2 className="profile-title">
          Hi, I'm <span style={{ color: '#b8315aff' }}>Felicia</span>
        </h2>
        <p className="profile-description">
          A detail-oriented and tech-driven Informatics Engineering student at Multimedia Nusantara University with strong interest in IT project management and digital solutions. Skilled in data analysis, software development fundamentals, and problem-solving within cross-functional teams. Experienced in managing social media and digital marketing projects, combining technical and creative approaches to deliver measurable results. Eager to contribute technical expertise and strategic thinking in the IT industry.
        </p>
      </div>
      <style>{`
        .profile-section-container {
          display: grid;
          grid-template-columns: 380px 1fr 380px;
          gap: 40px;
          margin-bottom: 60px;
          align-items: start;
          padding: 20px 0;
        }

        .profile-card-wrapper {
          background: transparent;
          padding: 0;
          height: fit-content;
        }

        .profile-info-box {
          background: white;
          padding: 40px;
          border-radius: 15px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.08);
          transition: all 0.4s ease;
          min-height: 200px;
        }

        .profile-info-box:hover {
          box-shadow: 0 15px 40px rgba(0,0,0,0.15);
        }

        .profile-title {
          font-size: 1.8em;
          margin-bottom: 15px;
          color: #2d3748;
          font-weight: 700;
          line-height: 1.2;
        }

        .profile-description {
          color: #4a5568;
          line-height: 1.8;
          margin-bottom: 0;
          font-weight: 400;
          font-size: 1rem;
        }

        .masonry-wrapper {
          position: relative;
          background: white;
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.08);
        }

        /* LAPTOP - 1200px ke bawah */
        @media (max-width: 1200px) {
          .profile-section-container {
            grid-template-columns: 1fr 1fr;
            gap: 30px;
          }

          .masonry-wrapper {
            grid-column: 1 / -1;
            margin-top: 20px;
          }
        }

        /* TABLET - 1024px ke bawah */
        @media (max-width: 1024px) {
          .profile-section-container {
            grid-template-columns: 1fr;
            gap: 30px;
            padding: 20px;
          }

          .profile-card-wrapper {
            max-width: 400px;
            margin: 0 auto;
          }

          .profile-info-box {
            padding: 30px;
          }

          .profile-title {
            font-size: 1.6em;
          }

          .masonry-wrapper {
            padding: 25px;
          }
        }

        /* MOBILE - 768px ke bawah */
        @media (max-width: 768px) {
          .profile-section-container {
            gap: 20px;
            padding: 15px;
          }

          .profile-card-wrapper {
            max-width: 350px;
          }

          .profile-info-box {
            padding: 25px;
          }

          .profile-title {
            font-size: 1.5em;
            margin-bottom: 12px;
          }

          .profile-description {
            font-size: 0.95rem;
            line-height: 1.7;
          }

          .masonry-wrapper {
            padding: 20px;
          }

          .masonry-wrapper h3 {
            font-size: 1.3em;
          }
        }

        /* SMALL MOBILE - 480px ke bawah */
        @media (max-width: 480px) {
          .profile-section-container {
            padding: 10px;
            gap: 15px;
          }

          .profile-card-wrapper {
            max-width: 100%;
          }

          .profile-info-box {
            padding: 20px;
          }

          .profile-title {
            font-size: 1.3em;
          }

          .profile-description {
            font-size: 0.9rem;
            line-height: 1.6;
          }

          .masonry-wrapper {
            padding: 15px;
          }

          .masonry-wrapper h3 {
            font-size: 1.1em;
            margin-bottom: 15px;
          }
        }
      `}</style>
    </div>
  );
}