import Lottie from 'lottie-react';

export default function HeroAnimation() {
  return (
    <>
      <style>{`
        .ha-section {
          width: 100%;
          background: #F5E6D3;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 80px 60px;
          position: relative;
          overflow: hidden;
          gap: 60px;
        }
        .ha-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 80% at 80% 50%, rgba(255,105,0,0.15) 0%, transparent 70%);
          pointer-events: none;
        }
        .ha-text {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .ha-label {
          font-family: 'Funnel Display', 'Inter', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #FF6900;
          margin-bottom: 16px;
        }
        .ha-title {
          font-family: 'Funnel Display', 'Inter', sans-serif;
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          font-weight: 700;
          color: #1a0a00;
          text-align: left;
          line-height: 1.2;
          margin-bottom: 20px;
        }
        .ha-title span {
          color: #FF6900;
        }
        .ha-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.9rem, 1.5vw, 1rem);
          color: rgba(60,30,10,0.65);
          text-align: left;
          line-height: 1.7;
          margin-bottom: 32px;
          max-width: 440px;
        }
        .ha-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #FF6900;
          color: #fff;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 600;
          padding: 12px 28px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.2s;
        }
        .ha-btn:hover { background: #e55e00; }
        .ha-lottie-wrapper {
          flex: 0 0 480px;
          max-width: 480px;
          position: relative;
        }
        .ha-lottie-wrapper::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 16px;
          background: linear-gradient(135deg, rgba(255,105,0,0.3), rgba(255,105,0,0.05), rgba(255,105,0,0.2));
          padding: 1px;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
        .ha-lottie-inner {
          border-radius: 16px;
          overflow: hidden;
          background: #111111;
          box-shadow: 0 0 60px rgba(255,105,0,0.20), 0 24px 60px rgba(0,0,0,0.25);
        }
        .ha-logo-overlay {
          position: absolute;
          top: 6%;
          right: 7%;
          width: 68px;
          height: 68px;
          border-radius: 50%;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 0 3px #FF6900, 0 4px 20px rgba(0,0,0,0.5);
          z-index: 10;
          overflow: hidden;
        }
        @media (max-width: 860px) {
          .ha-section {
            flex-direction: column;
            padding: 60px 24px;
          }
          .ha-lottie-wrapper {
            flex: unset;
            max-width: 100%;
            width: 100%;
          }
          .ha-title, .ha-subtitle { text-align: center; }
          .ha-text { align-items: center; }
        }
      `}</style>

      <section className="ha-section">
        <div className="ha-text">
          <p className="ha-label">Platform Overview</p>
          <h2 className="ha-title">
            The <span>Security Platform</span><br />Built for IETE Engineers
          </h2>
          <p className="ha-subtitle">
            Connecting researchers, systems, and innovations — powered by intelligent automation and real-time collaboration.
          </p>
          <a className="ha-btn" href="#">
            Explore Platform →
          </a>
        </div>

        <div className="ha-lottie-wrapper">
          <div className="ha-lottie-inner">
            <Lottie
              path="/Hero-Animation.json"
              loop={true}
              autoplay={true}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
          {/* IETE logo overlaid over Bugcrowd "b" position */}
          <div className="ha-logo-overlay">
            <svg viewBox="0 0 60 60" width="54" height="54" xmlns="http://www.w3.org/2000/svg">
              {/* Outer ring */}
              <circle cx="30" cy="30" r="28" fill="none" stroke="#003087" strokeWidth="2"/>
              {/* Inner blue circle */}
              <circle cx="30" cy="30" r="24" fill="#003087"/>
              {/* IETE text */}
              <text x="30" y="26" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="800" fontFamily="Arial,sans-serif" letterSpacing="1">IETE</text>
              {/* Decorative line */}
              <rect x="16" y="29" width="28" height="1.5" fill="#FF6900" rx="1"/>
              {/* Subtitle */}
              <text x="30" y="38" textAnchor="middle" fill="#aac4ff" fontSize="4.5" fontFamily="Arial,sans-serif" letterSpacing="0.5">EST. 1953</text>
              {/* Small decorative dots */}
              <circle cx="13" cy="30" r="2" fill="#FF6900"/>
              <circle cx="47" cy="30" r="2" fill="#FF6900"/>
            </svg>
          </div>
        </div>
      </section>
    </>
  );
}
