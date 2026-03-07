import { useEffect, useRef } from 'react';

// 6 nodes placed around the center panel (SVG coords: 900x580)
const NODES = [
  { id: 0, label: 'Web Apps',  img: '/frames/ezgif-frame-005.png', x: 108, y: 120, delay: 0.2 },
  { id: 1, label: 'Hardware',  img: '/frames/ezgif-frame-012.png', x: 792, y: 105, delay: 0.5 },
  { id: 2, label: 'Network',   img: '/frames/ezgif-frame-020.png', x: 82,  y: 460, delay: 0.8 },
  { id: 3, label: 'AI',        img: '/frames/ezgif-frame-030.png', x: 818, y: 450, delay: 1.1 },
  { id: 4, label: 'Cloud',     img: '/frames/ezgif-frame-038.png', x: 450, y: 58,  delay: 1.4 },
];

const CX = 450; // center x
const CY = 305; // center y

// Build a curved SVG path from node to center
function curvePath(nx, ny) {
  const mx = (nx + CX) / 2;
  const my = (ny + CY) / 2;
  return `M${nx},${ny} Q${mx},${my} ${CX},${CY}`;
}

const TeamSection = () => {
  const secRef = useRef(null);

  useEffect(() => {
    const el = secRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add('tss-show'); },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <style>{`
        /* ─── SECTION ─────────────────────────────────── */
        .tss {
          min-height: 100vh;
          background: radial-gradient(ellipse at 60% 40%, #1a1f5e 0%, #0d0f2b 55%, #060714 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 5rem 1rem 6rem;
          overflow: hidden;
          position: relative;
        }

        /* subtle ambient glow blobs */
        .tss::before {
          content: '';
          position: absolute;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%);
          top: -100px; left: -100px;
          pointer-events: none;
          animation: blobDrift 12s ease-in-out infinite alternate;
        }
        .tss::after {
          content: '';
          position: absolute;
          width: 400px; height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(8,203,0,0.10) 0%, transparent 70%);
          bottom: -80px; right: -80px;
          pointer-events: none;
          animation: blobDrift 9s ease-in-out infinite alternate-reverse;
        }

        @keyframes blobDrift {
          from { transform: translate(0,0) scale(1); }
          to   { transform: translate(40px, 30px) scale(1.15); }
        }

        /* ─── TITLE ───────────────────────────────────── */
        .tss-title {
          font-size: clamp(1.8rem, 3.5vw, 3rem);
          font-weight: 900;
          background: linear-gradient(120deg, #a5b4fc, #34d399, #a5b4fc);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: titleShine 4s linear infinite;
          text-align: center;
          margin-bottom: 3rem;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity .7s ease, transform .7s ease;
          position: relative; z-index: 2;
        }
        .tss-show .tss-title { opacity: 1; transform: translateY(0); }
        @keyframes titleShine {
          to { background-position: 200% center; }
        }

        /* ─── DIAGRAM WRAPPER ─────────────────────────── */
        .tss-diagram {
          position: relative;
          width: min(900px, 95vw);
          aspect-ratio: 900 / 580;
          z-index: 2;
        }

        /* ─── SVG (lines + dots layer) ───────────────── */
        .tss-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: visible;
          z-index: 1;
        }

        /* dashed line – draws in on .tss-show */
        .tss-line {
          fill: none;
          stroke: url(#lineGrad);
          stroke-width: 1.8;
          stroke-dasharray: 7 5;
          stroke-linecap: round;
          opacity: 0;
          transition: opacity .4s ease;
          animation: dashScroll 2s linear infinite;
        }
        .tss-show .tss-line { opacity: 0.85; }
        @keyframes dashScroll { to { stroke-dashoffset: -48; } }

        /* travelling glow dot */
        .tss-traveller {
          r: 4;
          fill: #34d399;
          filter: drop-shadow(0 0 5px #34d399) drop-shadow(0 0 10px #34d399);
        }

        /* ─── GLASS PANEL (center) ────────────────────── */
        .tss-panel {
          position: absolute;
          left: 50%; top: 50%;
          transform: translate(-50%, -50%) scale(0.5);
          width: 34%;
          aspect-ratio: 4/3.2;
          background: linear-gradient(135deg,
            rgba(255,255,255,0.12) 0%,
            rgba(255,255,255,0.05) 100%
          );
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 22px;
          backdrop-filter: blur(16px);
          box-shadow:
            0 8px 32px rgba(0,0,0,0.45),
            0 0 0 1px rgba(255,255,255,0.06),
            inset 0 1px 0 rgba(255,255,255,0.15);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6%;
          opacity: 0;
          transition:
            opacity .8s cubic-bezier(.4,0,.2,1) .1s,
            transform .9s cubic-bezier(.34,1.56,.64,1) .1s;
          z-index: 4;
          animation: none;
        }
        .tss-show .tss-panel {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
          animation: panelFloat 5s ease-in-out infinite 1s;
        }
        @keyframes panelFloat {
          0%,100% { transform: translate(-50%, -50%) translateY(0) scale(1); }
          50%      { transform: translate(-50%, -50%) translateY(-10px) scale(1.013); }
        }

        /* browser chrome dots */
        .tss-chrome { display: flex; gap: 5px; position: absolute; top: 10%; left: 8%; }
        .tss-chrome span {
          width: 7px; height: 7px; border-radius: 50%;
          background: rgba(255,255,255,0.25);
        }

        /* atom / orbit icon */
        .tss-atom-wrap { width: 52%; aspect-ratio: 1; }

        /* "IETE" label */
        .tss-code-label {
          font-size: clamp(.5rem, 1.4vw, .95rem);
          font-weight: 800;
          letter-spacing: 4px;
          color: rgba(255,255,255,0.85);
          text-transform: uppercase;
        }

        /* orange hexagon badge (top of panel) */
        .tss-badge {
          position: absolute;
          left: 50%; top: -9%;
          transform: translateX(-50%);
          width: 13%;
          aspect-ratio: 1;
          clip-path: polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%);
          background: linear-gradient(135deg, #f97316, #fb923c);
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(.55rem, 1.5vw, 1.1rem);
          font-weight: 900; color: #fff;
          box-shadow: 0 0 20px rgba(249,115,22,.5);
          z-index: 6;
          opacity: 0;
          transition: opacity .5s ease .6s;
          animation: none;
        }
        .tss-show .tss-badge {
          opacity: 1;
          animation: badgeFloat 3.5s ease-in-out infinite 1.2s;
        }
        @keyframes badgeFloat {
          0%,100% { transform: translateX(-50%) translateY(0) rotate(0deg); }
          50%      { transform: translateX(-50%) translateY(-8px) rotate(3deg); }
        }

        /* ─── HEXAGON NODES ───────────────────────────── */
        .tss-node {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 7px;
          opacity: 0;
          transform: scale(0.2);
          z-index: 5;
        }
        .tss-show .tss-node {
          opacity: 1;
          transform: scale(1);
          transition:
            opacity .6s cubic-bezier(.4,0,.2,1),
            transform .7s cubic-bezier(.34,1.56,.64,1);
        }

        /* position helpers — translate so the hex is centered on the SVG coord */
        .tss-n0 { left: calc(108/900*100% - 35px); top: calc(120/580*100% - 35px); transition-delay: .3s; }
        .tss-n1 { left: calc(792/900*100% - 35px); top: calc(105/580*100% - 35px); transition-delay: .5s; }
        .tss-n2 { left: calc(82/900*100%  - 35px); top: calc(460/580*100% - 35px); transition-delay: .8s; }
        .tss-n3 { left: calc(818/900*100% - 35px); top: calc(450/580*100% - 35px); transition-delay:1.1s; }
        .tss-n4 { left: calc(450/900*100% - 35px); top: calc(58/580*100%  - 35px); transition-delay:1.4s; }

        /* slow orbital bob per node */
        .tss-show .tss-n0 { animation: nodeFloat0 6s ease-in-out infinite 1.5s; }
        .tss-show .tss-n1 { animation: nodeFloat1 7s ease-in-out infinite 1.8s; }
        .tss-show .tss-n2 { animation: nodeFloat2 5.5s ease-in-out infinite 2s; }
        .tss-show .tss-n3 { animation: nodeFloat3 6.5s ease-in-out infinite 2.2s; }
        .tss-show .tss-n4 { animation: nodeFloat4 8s ease-in-out infinite 1.6s; }

        @keyframes nodeFloat0 { 0%,100%{transform:scale(1) translate(0,0)} 50%{transform:scale(1) translate(4px,-8px)} }
        @keyframes nodeFloat1 { 0%,100%{transform:scale(1) translate(0,0)} 50%{transform:scale(1) translate(-5px,-6px)} }
        @keyframes nodeFloat2 { 0%,100%{transform:scale(1) translate(0,0)} 50%{transform:scale(1) translate(6px,7px)} }
        @keyframes nodeFloat3 { 0%,100%{transform:scale(1) translate(0,0)} 50%{transform:scale(1) translate(-4px,8px)} }
        @keyframes nodeFloat4 { 0%,100%{transform:scale(1) translate(0,0)} 50%{transform:scale(1) translate(0,-10px)} }

        /* hexagon frame */
        .tss-hex {
          width: clamp(58px, 7.5vw, 72px);
          aspect-ratio: 1;
          clip-path: polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%);
          background: linear-gradient(135deg, #6366f1, #34d399);
          padding: 3px;
          filter: drop-shadow(0 0 8px rgba(99,102,241,0.7));
          animation: hexPulse 2.5s ease-in-out infinite;
        }
        .tss-n1 .tss-hex { animation-delay: .5s; background: linear-gradient(135deg, #8b5cf6, #06b6d4); filter: drop-shadow(0 0 8px rgba(139,92,246,0.7)); }
        .tss-n2 .tss-hex { animation-delay: 1s;  background: linear-gradient(135deg, #3b82f6, #34d399); filter: drop-shadow(0 0 8px rgba(59,130,246,0.7)); }
        .tss-n3 .tss-hex { animation-delay:1.5s; background: linear-gradient(135deg, #06b6d4, #6366f1); filter: drop-shadow(0 0 8px rgba(6,182,212,0.7)); }
        .tss-n4 .tss-hex { animation-delay: .8s; background: linear-gradient(135deg, #a78bfa, #34d399); filter: drop-shadow(0 0 8px rgba(167,139,250,0.7)); }

        @keyframes hexPulse {
          0%,100% { filter: drop-shadow(0 0 8px rgba(99,102,241,0.6)); }
          50%      { filter: drop-shadow(0 0 18px rgba(52,211,153,1)); }
        }

        .tss-hex-inner {
          width: 100%; height: 100%;
          clip-path: polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%);
          background: #0d0f2b;
          overflow: hidden;
          display: flex; align-items: center; justify-content: center;
        }
        .tss-hex-inner img { width:100%; height:100%; object-fit:cover; }

        /* pill label */
        .tss-lbl {
          background: rgba(15,18,50,0.85);
          border: 1px solid rgba(99,102,241,0.4);
          color: rgba(255,255,255,0.9);
          font-size: clamp(.55rem, 1.1vw, .8rem);
          font-weight: 600;
          padding: 3px 11px;
          border-radius: 20px;
          white-space: nowrap;
          backdrop-filter: blur(8px);
          box-shadow: 0 2px 12px rgba(0,0,0,0.4);
        }

        /* ─── ATOM SVG ────────────────────────────────── */
        .tss-atom-svgel { animation: atomSpin 12s linear infinite; transform-origin: 50px 50px; }
        .tss-atom-svgel2 { animation: atomSpin 8s linear infinite reverse; transform-origin: 50px 50px; }
        .tss-atom-svgel3 { animation: atomSpin 16s linear infinite; transform-origin: 50px 50px; }
        @keyframes atomSpin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      `}</style>

      <section ref={secRef} className="tss">
        <h2 className="tss-title">IETE Student Community</h2>

        <div className="tss-diagram">

          {/* ── SVG lines + travelling dots ─────────────── */}
          <svg className="tss-svg" viewBox="0 0 900 580" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#6366f1" stopOpacity="0.9"/>
                <stop offset="50%"  stopColor="#34d399" stopOpacity="1"/>
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.9"/>
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>

            {NODES.map((n) => {
              const d = curvePath(n.x, n.y);
              const colors = ['#6366f1','#8b5cf6','#3b82f6','#06b6d4','#a78bfa'];
              return (
                <g key={n.id}>
                  {/* dashed animated line */}
                  <path
                    className="tss-line"
                    d={d}
                    strokeDashoffset="0"
                    style={{ animationDelay: `${n.delay}s` }}
                  />
                  {/* hidden path for animateMotion */}
                  <path id={`mp${n.id}`} d={d} fill="none" stroke="none"/>
                  {/* travelling dot */}
                  <circle filter="url(#glow)" style={{fill: colors[n.id]}}>
                    <animateMotion
                      dur={`${2.5 + n.id * 0.4}s`}
                      repeatCount="indefinite"
                      rotate="none"
                    >
                      <mpath href={`#mp${n.id}`}/>
                    </animateMotion>
                    <animate attributeName="r" values="4;6;4" dur="1.5s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0;1;1;0" dur={`${2.5 + n.id*0.4}s`} repeatCount="indefinite"/>
                  </circle>
                </g>
              );
            })}
          </svg>

          {/* ── Orange badge ─────────────────────────────── */}
          <div className="tss-badge">b</div>

          {/* ── Glassmorphism center panel ───────────────── */}
          <div className="tss-panel">
            <div className="tss-chrome">
              <span/><span/><span/>
            </div>

            {/* Animated atom icon */}
            <div className="tss-atom-wrap">
              <svg viewBox="0 0 100 100" style={{width:'100%',height:'100%'}}>
                {/* nucleus */}
                <circle cx="50" cy="50" r="7" fill="#f97316"/>
                <circle cx="50" cy="50" r="4" fill="#fb923c" opacity=".8"/>
                {/* orbits */}
                <ellipse cx="50" cy="50" rx="38" ry="14" fill="none" stroke="rgba(165,180,252,0.6)" strokeWidth="2" className="tss-atom-svgel"/>
                <ellipse cx="50" cy="50" rx="38" ry="14" fill="none" stroke="rgba(52,211,153,0.6)"  strokeWidth="2" className="tss-atom-svgel2" style={{transform:'rotate(60deg)',transformOrigin:'50px 50px'}}/>
                <ellipse cx="50" cy="50" rx="38" ry="14" fill="none" stroke="rgba(99,102,241,0.6)"  strokeWidth="2" className="tss-atom-svgel3" style={{transform:'rotate(120deg)',transformOrigin:'50px 50px'}}/>
                {/* electron dots */}
                <circle cx="88" cy="50" r="3" fill="#a5b4fc" opacity=".9">
                  <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="3s" repeatCount="indefinite"/>
                </circle>
                <circle cx="88" cy="50" r="3" fill="#34d399" opacity=".9">
                  <animateTransform attributeName="transform" type="rotate" from="120 50 50" to="480 50 50" dur="2s" repeatCount="indefinite"/>
                </circle>
                <circle cx="88" cy="50" r="3" fill="#818cf8" opacity=".9">
                  <animateTransform attributeName="transform" type="rotate" from="240 50 50" to="600 50 50" dur="4s" repeatCount="indefinite"/>
                </circle>
              </svg>
            </div>

            <span className="tss-code-label">IETE</span>
          </div>

          {/* ── Hexagon nodes ─────────────────────────────── */}
          {NODES.map((n) => (
            <div key={n.id} className={`tss-node tss-n${n.id}`}>
              <div className="tss-hex">
                <div className="tss-hex-inner">
                  <img src={n.img} alt={n.label}/>
                </div>
              </div>
              <div className="tss-lbl">{n.label}</div>
            </div>
          ))}

        </div>
      </section>
    </>
  );
};

export default TeamSection;
