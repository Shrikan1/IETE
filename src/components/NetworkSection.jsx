import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 6 roles cycling on each node — like Bugcrowd's "Code → Build → Test → Release"
const ROLE_SEQUENCE = [
  'President',
  'Co-President',
  'Technical Lead',
  'Co-Tech Lead',
  'Creative Head',
  'Secretary',
];

// Fixed 6 node positions in a hexagon (viewBox 580 580, hub at center 290 290)
const CX = 290, CY = 290;
const HUB_R = 62;
const NODE_R = 44;
const ORBIT_R = 188;

function hexNodes() {
  return Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 2;
    return {
      id: i + 1,
      x: CX + ORBIT_R * Math.cos(angle),
      y: CY + ORBIT_R * Math.sin(angle),
    };
  });
}

const NODES = hexNodes();

const NODE_COLORS = [
  '#FF6900',
  '#f59e0b',
  '#00c4ff',
  '#22d3ee',
  '#a855f7',
  '#22c55e',
];

const DOT_DUR   = ['3.2s','4s','3.6s','4.4s','3.8s','4.2s'];
const DOT_BEGIN = ['0s','0.6s','1.2s','1.8s','2.4s','3s'];

export default function NetworkSection() {
  const navigate = useNavigate();
  const [roleOffset, setRoleOffset] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setRoleOffset(prev => (prev + 1) % ROLE_SEQUENCE.length);
        setFadeIn(true);
      }, 350);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <style>{`
        .bc-outer {
          width: 100%;
          background: #000000;
          padding: 60px 5vw;
          box-sizing: border-box;
        }
        .bc-wrap {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          background: #F5E6D3;
          border-radius: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 70px 5vw;
          gap: 5vw;
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
          box-shadow:
            0 0 0 1px rgba(255,105,0,0.15),
            0 4px 20px rgba(255,105,0,0.12),
            0 12px 60px rgba(0,0,0,0.5);
        }
        .bc-wrap::before {
          content:'';
          position:absolute;inset:0;
          border-radius: 28px;
          background-image:
            linear-gradient(rgba(0,0,0,0.04) 1px,transparent 1px),
            linear-gradient(90deg,rgba(0,0,0,0.04) 1px,transparent 1px);
          background-size:56px 56px;
          pointer-events:none;
        }
        .bc-wrap::after {
          content:'';
          position:absolute;
          right:0; top:10%; bottom:10%; width:50%;
          border-radius: 28px;
          background: radial-gradient(ellipse 65% 65% at 60% 50%, rgba(255,105,0,0.14) 0%, transparent 70%);
          pointer-events:none;
        }
        .bc-left {
          flex: 0 0 44%;
          max-width: 480px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          position: relative;
          z-index: 2;
        }
        .bc-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,105,0,0.1);
          border: 1px solid rgba(255,105,0,0.35);
          color: #cc5500;
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 100px;
          font-family: 'Inter',sans-serif;
          margin-bottom: 24px;
        }
        .bc-heading {
          font-family: 'Funnel Display','Inter',sans-serif;
          font-size: clamp(2.1rem, 3.5vw, 3.2rem);
          font-weight: 800;
          color: #1a1a1a;
          line-height: 1.12;
          letter-spacing: -0.025em;
          margin-bottom: 20px;
        }
        .bc-heading em {
          font-style: normal;
          background: linear-gradient(135deg, #FF6900 0%, #ff8533 40%, #ffb347 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 2px 16px rgba(255,105,0,0.35));
        }
        .bc-sub {
          font-family: 'Inter',sans-serif;
          font-size: 1rem;
          color: rgba(40,30,20,0.6);
          line-height: 1.75;
          margin-bottom: 40px;
          max-width: 400px;
        }
        .bc-btns { display:flex; gap:14px; flex-wrap:wrap; }
        .bc-btn-primary {
          display:inline-flex; align-items:center;
          background:#FF6900; color:#fff;
          font-family:'Inter',sans-serif; font-size:14px; font-weight:700;
          padding:14px 30px; border-radius:8px; border:none;
          cursor:pointer; text-decoration:none;
          position:relative; overflow:hidden;
          transition:box-shadow 0.3s ease;
        }
        .bc-btn-primary:hover {
          box-shadow:0 6px 24px rgba(255,105,0,0.35);
        }
        .bc-btn-primary .btn-text-wrap {
          display:inline-flex;
          flex-direction:column;
          height:1.2em;
          overflow:hidden;
          line-height:1.2em;
        }
        .bc-btn-primary .btn-t {
          display:block;
          transition:transform 0.35s cubic-bezier(0.4,0,0.2,1);
        }
        .bc-btn-primary:hover .btn-t {
          transform:translateY(-100%);
        }
        .bc-btn-ghost {
          display:inline-flex; align-items:center; justify-content:center;
          background:transparent; color:#3d2b1a;
          font-family:'Inter',sans-serif; font-size:14px; font-weight:600;
          padding:14px 28px; border-radius:8px;
          border:1.5px solid rgba(40,30,20,0.25);
          cursor:pointer; text-decoration:none;
          position:relative; overflow:hidden; z-index:1;
          transition:color 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
        }
        .bc-btn-ghost::before {
          content:'';
          position:absolute; top:0; left:0;
          width:100%; height:100%;
          background:#3d2b1a;
          transform:translateX(-100%);
          transition:transform 0.4s cubic-bezier(0.4,0,0.2,1);
          z-index:-1;
          border-radius:6px;
        }
        .bc-btn-ghost:hover::before {
          transform:translateX(0);
        }
        .bc-btn-ghost:hover {
          color:#F5E6D3;
          border-color:#3d2b1a;
          box-shadow:0 4px 18px rgba(40,30,20,0.18);
        }
        .bc-right {
          flex:1; min-width:0;
          display:flex; align-items:center; justify-content:center;
          position:relative; z-index:2;
        }
        .bc-right svg {
          width:100%; max-width:540px;
          height:auto; overflow:visible; display:block;
        }
        .bc-role-label { transition:opacity 0.35s ease; }
        .bc-role-label.hidden { opacity:0; }
        @keyframes bcf0 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes bcf1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
        @keyframes bcf2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes bcf3 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes bcf4 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        @keyframes bcf5 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        .bcn-0{animation:bcf0 3.1s ease-in-out infinite;transform-box:fill-box;transform-origin:center;}
        .bcn-1{animation:bcf1 4.2s ease-in-out infinite;transform-box:fill-box;transform-origin:center;}
        .bcn-2{animation:bcf2 3.7s ease-in-out infinite;transform-box:fill-box;transform-origin:center;}
        .bcn-3{animation:bcf3 4.6s ease-in-out infinite;transform-box:fill-box;transform-origin:center;}
        .bcn-4{animation:bcf4 3.4s ease-in-out infinite;transform-box:fill-box;transform-origin:center;}
        .bcn-5{animation:bcf5 4.8s ease-in-out infinite;transform-box:fill-box;transform-origin:center;}
        @keyframes bc-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        .bc-hub-dash{animation:bc-spin 20s linear infinite;transform-box:fill-box;transform-origin:center;}
        @media(max-width:860px){
          .bc-outer{padding:40px 4vw;}
          .bc-wrap{flex-direction:column;padding:50px 6vw 60px;gap:40px;border-radius:20px;}
          .bc-left{max-width:100%;align-items:center;text-align:center;}
          .bc-btns{justify-content:center;}
          .bc-right svg{max-width:400px;}
        }
        @media(max-width:480px){
          .bc-outer{padding:24px 3vw;}
          .bc-wrap{padding:40px 5vw 48px;gap:28px;border-radius:16px;}
          .bc-heading{font-size:1.8rem;}
          .bc-sub{font-size:0.9rem;}
          .bc-right svg{max-width:280px;}
          .bc-btn-primary,.bc-btn-ghost{padding:12px 22px;font-size:13px;}
        }
      `}</style>

      <section className="bc-outer">
      <div className="bc-wrap">
        <div className="bc-left">
          <h2 className="bc-heading">
            Meet the People<br />Behind <em>IETE</em>
          </h2>
          <p className="bc-sub">
            Our leadership network — Presidents, Technical Leads, Creative Heads and more — united to drive innovation, learning, and community across India.
          </p>
          <div className="bc-btns">
            <a onClick={() => navigate('/team')} className="bc-btn-primary" style={{ cursor: 'pointer' }}>
              <span className="btn-text-wrap">
                <span className="btn-t">Meet the Team →</span>
                <span className="btn-t">Meet the Team →</span>
              </span>
            </a>
          </div>
        </div>

        <div className="bc-right">
          <svg viewBox="0 0 580 580" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="bc-glow-hub" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="12" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <filter id="bc-glow-node" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="6" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <filter id="bc-glow-dot" x="-150%" y="-150%" width="400%" height="400%">
                <feGaussianBlur stdDeviation="3" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>

            {NODES.map((n, i) => (
              <line key={"line"+i}
                x1={CX} y1={CY}
                x2={Math.round(n.x)} y2={Math.round(n.y)}
                stroke={NODE_COLORS[i]}
                strokeWidth="1.4" strokeOpacity="0.45" strokeDasharray="6 9"
              />
            ))}

            {NODES.map((n, i) => (
              <circle key={"dot"+i} r="5" fill={NODE_COLORS[i]} filter="url(#bc-glow-dot)">
                <animateMotion
                  path={"M"+CX+","+CY+" L"+Math.round(n.x)+","+Math.round(n.y)}
                  dur={DOT_DUR[i]} begin={DOT_BEGIN[i]} repeatCount="indefinite"/>
              </circle>
            ))}
            {NODES.map((n, i) => (
              <circle key={"rdot"+i} r="2.5" fill={NODE_COLORS[i]} opacity="0.4">
                <animateMotion
                  path={"M"+Math.round(n.x)+","+Math.round(n.y)+" L"+CX+","+CY}
                  dur={DOT_DUR[i]} begin={DOT_BEGIN[i]} repeatCount="indefinite"/>
              </circle>
            ))}

            {[0,1].map(i => (
              <circle key={"pulse"+i} cx={CX} cy={CY} fill="none"
                stroke="#FF6900" strokeWidth="1" strokeOpacity="0">
                <animate attributeName="r"
                  from={HUB_R+2} to={HUB_R+60} dur="2.8s"
                  begin={i*1.4+"s"} repeatCount="indefinite"/>
                <animate attributeName="stroke-opacity"
                  from="0.6" to="0" dur="2.8s"
                  begin={i*1.4+"s"} repeatCount="indefinite"/>
              </circle>
            ))}

            <circle cx={CX} cy={CY} r={HUB_R+18} fill="#FF6900" fillOpacity="0.25" filter="url(#bc-glow-hub)"/>
            <circle cx={CX} cy={CY} r={HUB_R} fill="#FF6900"/>
            <circle cx={CX} cy={CY} r={HUB_R-10} fill="none"
              stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" strokeDasharray="5 6"
              className="bc-hub-dash"/>
            <text x={CX} y={CY-7} textAnchor="middle"
              fill="#fff" fontSize="17" fontWeight="900"
              fontFamily="'Funnel Display','Inter',Arial,sans-serif" letterSpacing="2.5">IETE</text>
            <rect x={CX-22} y={CY-1} width="44" height="1.5" fill="rgba(255,255,255,0.6)" rx="1"/>
            <text x={CX} y={CY+15} textAnchor="middle"
              fill="rgba(255,255,255,0.7)" fontSize="7"
              fontFamily="'Inter',Arial,sans-serif" letterSpacing="1.5">EST. 1953</text>

            {NODES.map((n, i) => {
              const nx = Math.round(n.x);
              const ny = Math.round(n.y);
              const color = NODE_COLORS[i];
              const role = ROLE_SEQUENCE[(i + roleOffset) % ROLE_SEQUENCE.length];
              const chipW = role.length * 7.2 + 16;
              return (
                <g key={"node"+i} className={"bcn-"+i}>
                  <circle cx={nx} cy={ny} r={NODE_R+14} fill={color} fillOpacity="0.14" filter="url(#bc-glow-node)"/>
                  <circle cx={nx} cy={ny} r={NODE_R} fill="#F0DCC8" stroke={color} strokeWidth="2.5"/>
                  <circle cx={nx} cy={ny} r={NODE_R-6} fill={color} fillOpacity="0.1"/>
                  <circle cx={nx} cy={ny-10} r="12" fill={color} fillOpacity="0.8"/>
                  <path d={"M"+(nx-18)+","+(ny+30)+" Q"+(nx-18)+","+(ny+8)+" "+nx+","+(ny+8)+" Q"+(nx+18)+","+(ny+8)+" "+(nx+18)+","+(ny+30)}
                    fill={color} fillOpacity="0.55"/>
                  <rect
                    x={nx - chipW/2} y={ny+NODE_R+8}
                    width={chipW} height="20" rx="10"
                    fill={color} fillOpacity="0.15"
                    stroke={color} strokeWidth="0.9" strokeOpacity="0.55"
                    className={"bc-role-label"+(fadeIn?"":" hidden")}
                  />
                  <text x={nx} y={ny+NODE_R+22} textAnchor="middle"
                    fill={color} fontSize="8.5" fontWeight="700"
                    fontFamily="'Inter',Arial,sans-serif"
                    className={"bc-role-label"+(fadeIn?"":" hidden")}>
                    {role}
                  </text>
                  <rect x={nx-18} y={ny-NODE_R-16} width="36" height="14" rx="7"
                    fill="#e8d4be" stroke="rgba(0,0,0,0.1)" strokeWidth="0.8"/>
                  <text x={nx} y={ny-NODE_R-5} textAnchor="middle"
                    fill="rgba(60,40,20,0.45)" fontSize="6.5"
                    fontFamily="'Inter',Arial,sans-serif" letterSpacing="0.5">DEMO</text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
      </section>
    </>
  );
}
