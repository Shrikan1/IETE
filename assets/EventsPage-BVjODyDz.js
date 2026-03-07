import{j as e}from"./vendor-three-CGICjMIm.js";import{b as l}from"./vendor-react-CuNqf3F1.js";const h=[{id:1,title:"CircuitCraft Championship",dept:"Electronics Wing",date:"Mar 22, 2026",location:"Lab Block 3, IETE Campus",type:"Competition",status:"upcoming",color:"#08CB00",bg:"#0d3b30",img:"https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",desc:"A hands-on circuit design competition where teams build, test, and compete using embedded systems and custom PCBs. Push your hardware skills to the limit.",speakers:["Prof. R. Sharma","Eng. Kavitha M."],seats:120,registered:94},{id:2,title:"HackSphere 3.0",dept:"Software Wing",date:"Apr 05, 2026",location:"Innovation Hub, Block A",type:"Hackathon",status:"upcoming",color:"#FF6900",bg:"#1a0a00",img:"https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",desc:"36-hour non-stop hackathon. Build innovative solutions across fintech, health-tech, and smart city domains. ₹1,00,000 prize pool awaits.",speakers:["Arjun Nair (CTO, StartX)","Priya Rao (Google DevExpert)"],seats:200,registered:178},{id:3,title:"AI/ML Workshop Series",dept:"Research & Dev",date:"Apr 18, 2026",location:"Seminar Hall, Main Block",type:"Workshop",status:"upcoming",color:"#a855f7",bg:"#150d2e",img:"https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",desc:"A 3-day immersive workshop covering neural networks, computer vision, and large language models. Hands-on sessions with real datasets and projects.",speakers:["Dr. Ananya Singh","Rohan Verma (MLOps Lead)"],seats:80,registered:80},{id:4,title:"IoT for Smart Cities",dept:"Embedded Systems",date:"May 10, 2026",location:"Maker Space, Lab Block 1",type:"Workshop",status:"upcoming",color:"#38bdf8",bg:"#03111e",img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",desc:"Learn to build IoT prototypes for smart city applications using Raspberry Pi, MQTT, and cloud dashboards. Take home a working prototype.",speakers:["Vikram C.","Neha Joshi (Bosch IoT)"],seats:60,registered:41}],y=[{id:5,title:"TechTalk: Quantum Computing",date:"Jan 15, 2026",img:"https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",highlight:"320 Attendees"},{id:6,title:"Code Sprint 2025",date:"Dec 10, 2025",img:"https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",highlight:"🏆 48hrs · 50 Teams"},{id:7,title:"PCB Design Bootcamp",date:"Nov 28, 2025",img:"https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80",highlight:"4 Day Intensive"},{id:8,title:"Industry Connect Day",date:"Oct 5, 2025",img:"https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",highlight:"12 Companies · 500+ Students"},{id:9,title:"Robo Wars 2025",date:"Sep 12, 2025",img:"https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",highlight:"30 Robots · National Level"},{id:10,title:"Paper Presentation Summit",date:"Aug 20, 2025",img:"https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80",highlight:"80 Papers · 6 Tracks"}],w=[{val:500,suffix:"+",label:"Active Members"},{val:30,suffix:"+",label:"Events Per Year"},{val:10,suffix:"+",label:"Workshops Held"},{val:5,suffix:"+",label:"Hackathons"}];function v(t,s){const[o,n]=l.useState(0);return l.useEffect(()=>{if(!s)return;let r=0;const p=Math.ceil(t/60),i=setInterval(()=>{r+=p,r>=t?(n(t),clearInterval(i)):n(r)},20);return()=>clearInterval(i)},[s,t]),o}function c(t,s=.15){const[o,n]=l.useState(!1);return l.useEffect(()=>{const r=new IntersectionObserver(([p])=>{p.isIntersecting&&(n(!0),r.disconnect())},{threshold:s});return t.current&&r.observe(t.current),()=>r.disconnect()},[t,s]),o}function j({val:t,suffix:s,label:o,delay:n,active:r}){const p=v(t,r);return e.jsxs("div",{className:"ep-stat-card",style:{transitionDelay:n},children:[e.jsxs("span",{className:"ep-stat-num",children:[p,s]}),e.jsx("span",{className:"ep-stat-label",children:o})]})}function k({ev:t,index:s,visible:o}){const[n,r]=l.useState(!1),p=Math.round(t.registered/t.seats*100),i=t.registered>=t.seats;return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"ep-ev-card",style:{transitionDelay:`${s*.12}s`,opacity:o?1:0,transform:o?"translateY(0)":"translateY(32px)",borderTop:`3px solid ${t.color}`,boxShadow:"0 8px 32px 0 rgba(31, 38, 135, 0.15)",background:"rgba(17, 17, 20, 0.7)",backdropFilter:"blur(12px)"},onClick:()=>r(!0),children:[e.jsxs("div",{style:{position:"relative",height:200,overflow:"hidden",borderTopLeftRadius:20,borderTopRightRadius:20},children:[e.jsx("img",{src:t.img,alt:t.title,style:{width:"100%",height:"100%",objectFit:"cover",transition:"transform 0.5s",display:"block"}}),e.jsx("div",{style:{position:"absolute",inset:0,background:"linear-gradient(to top, rgba(7,7,8,0.7) 0%, transparent 60%)"}}),e.jsx("span",{style:{position:"absolute",top:14,right:14,fontSize:10,fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"5px 12px",borderRadius:100,background:t.color,color:"#fff",boxShadow:"0 2px 8px rgba(0,0,0,0.12)"},children:t.type})]}),e.jsxs("div",{style:{padding:"22px 22px 26px",display:"flex",flexDirection:"column",gap:10},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:8},children:[e.jsx("span",{style:{color:t.color,fontWeight:700,fontSize:11,textTransform:"uppercase",letterSpacing:"0.15em"},children:t.dept}),e.jsx("span",{style:{fontSize:12,color:"#fff",background:t.color,borderRadius:8,padding:"2px 8px",fontWeight:600},children:t.type})]}),e.jsx("h3",{style:{fontFamily:"Funnel Display, Inter, sans-serif",fontSize:"1.35rem",fontWeight:800,color:"#fff",lineHeight:1.2,marginBottom:8},children:t.title}),e.jsx("p",{style:{fontSize:13.5,color:"rgba(255,255,255,0.7)",lineHeight:1.65,marginBottom:12},children:t.desc}),e.jsxs("div",{style:{display:"flex",gap:16,fontSize:13,color:"rgba(255,255,255,0.5)",marginBottom:10},children:[e.jsxs("span",{children:["📅 ",t.date]}),e.jsxs("span",{children:["📍 ",t.location]})]}),e.jsxs("div",{style:{marginBottom:14},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:11,color:"rgba(255,255,255,0.35)",marginBottom:4},children:[e.jsxs("span",{children:[t.registered," registered"]}),e.jsxs("span",{children:[t.seats," seats"]})]}),e.jsx("div",{style:{background:"rgba(255,255,255,0.12)",borderRadius:4,height:6,overflow:"hidden"},children:e.jsx("div",{style:{height:"100%",borderRadius:4,width:o?`${p}%`:"0%",background:t.color,transition:"width 1s cubic-bezier(0.22,1,0.36,1) 0.3s"}})})]}),e.jsx("button",{style:{background:i?"rgba(255,255,255,0.08)":t.color,color:i?"rgba(255,255,255,0.4)":"#fff",cursor:i?"not-allowed":"pointer",fontWeight:700,fontSize:14,padding:"13px 0",borderRadius:100,border:"none",width:"100%",letterSpacing:"0.04em",textTransform:"uppercase",boxShadow:i?"none":`0 2px 12px ${t.color}55`,transition:"opacity 0.25s, transform 0.25s",marginTop:8},disabled:i,onClick:d=>{d.stopPropagation()},children:i?"🔒 Seats Full":"→ Register Now"})]})]}),n&&e.jsx("div",{className:"ep-modal-backdrop",onClick:()=>r(!1),children:e.jsxs("div",{className:"ep-modal",onClick:d=>d.stopPropagation(),children:[e.jsx("button",{className:"ep-modal-close",onClick:()=>r(!1),children:"✕"}),e.jsxs("div",{className:"ep-modal-img-wrap",children:[e.jsx("img",{src:t.img,alt:t.title}),e.jsx("div",{className:"ep-modal-img-grad"}),e.jsx("span",{className:"ep-ev-type-badge",style:{background:t.color,color:"#fff",position:"absolute",top:20,left:20},children:t.type})]}),e.jsxs("div",{className:"ep-modal-body",children:[e.jsx("p",{className:"ep-ev-dept",style:{color:t.color,marginBottom:8},children:t.dept}),e.jsx("h2",{className:"ep-modal-title",children:t.title}),e.jsx("p",{className:"ep-modal-desc",children:t.desc}),e.jsxs("div",{className:"ep-modal-meta",children:[e.jsxs("div",{className:"ep-modal-meta-item",children:[e.jsx("span",{className:"ep-modal-meta-icon",children:"📅"}),e.jsxs("div",{children:[e.jsx("b",{children:"Date"}),e.jsx("span",{children:t.date})]})]}),e.jsxs("div",{className:"ep-modal-meta-item",children:[e.jsx("span",{className:"ep-modal-meta-icon",children:"📍"}),e.jsxs("div",{children:[e.jsx("b",{children:"Location"}),e.jsx("span",{children:t.location})]})]}),e.jsxs("div",{className:"ep-modal-meta-item",children:[e.jsx("span",{className:"ep-modal-meta-icon",children:"🎤"}),e.jsxs("div",{children:[e.jsx("b",{children:"Speakers"}),e.jsx("span",{children:t.speakers.join(", ")})]})]}),e.jsxs("div",{className:"ep-modal-meta-item",children:[e.jsx("span",{className:"ep-modal-meta-icon",children:"🎟️"}),e.jsxs("div",{children:[e.jsx("b",{children:"Seats"}),e.jsxs("span",{children:[t.registered,"/",t.seats," (",p,"% filled)"]})]})]})]}),e.jsx("div",{className:"ep-reg-bar-bg",style:{marginTop:16},children:e.jsx("div",{className:"ep-reg-bar-fill",style:{width:`${p}%`,background:t.color}})}),e.jsx("button",{className:"ep-ev-btn",style:{marginTop:28,width:"100%",background:i?"rgba(255,255,255,0.08)":t.color,color:i?"rgba(255,255,255,0.4)":"#fff",cursor:i?"not-allowed":"pointer",fontSize:15,padding:"16px 0"},disabled:i,children:i?"🔒 Registration Full":"→ Register for this Event"})]})]})})]})}function S(){const t=l.useRef(null),s=l.useRef(null),o=l.useRef(null),n=l.useRef(null),r=l.useRef(null),p=c(t,.1),i=c(s,.1),d=c(o,.2),x=c(n,.1);c(r,.2);const[m,f]=l.useState("All"),b=["All","Competition","Hackathon","Workshop"],u=m==="All"?h:h.filter(a=>a.type===m);return e.jsxs("div",{className:"ep-page",children:[e.jsx("style",{children:`
        /* ════ Page base ════ */
        .ep-page {
          background: #070708;
          min-height: 100vh;
          padding-top: 64px;
          font-family: 'Inter', sans-serif;
          color: #fff;
          overflow-x: hidden;
        }

        /* ════ Hero ════ */
        .ep-hero {
          position: relative;
          padding: 100px 8vw 80px;
          overflow: hidden;
          background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,105,0,0.12) 0%, transparent 70%);
        }
        .ep-hero-bg-ring {
          position: absolute;
          top: -120px; left: 50%;
          transform: translateX(-50%);
          width: 700px; height: 700px;
          border-radius: 50%;
          border: 1px solid rgba(255,105,0,0.08);
          pointer-events: none;
          animation: ep-ring-pulse 6s ease-in-out infinite alternate;
        }
        .ep-hero-bg-ring:nth-child(2) {
          width: 500px; height: 500px;
          border-color: rgba(255,105,0,0.12);
          animation-delay: -3s;
        }
        @keyframes ep-ring-pulse {
          from { opacity: 0.4; transform: translateX(-50%) scale(1); }
          to   { opacity: 1;   transform: translateX(-50%) scale(1.06); }
        }
        .ep-hero-inner {
          position: relative;
          z-index: 2;
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
          transition: opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1);
        }
        .ep-hero-inner.ep-visible {
          opacity: 1 !important; transform: translateY(0) !important;
        }
        .ep-hero-eyebrow {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #FF6900;
          margin-bottom: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        .ep-hero-eyebrow::before, .ep-hero-eyebrow::after {
          content: '';
          width: 40px; height: 1px;
          background: linear-gradient(90deg, transparent, #FF6900);
        }
        .ep-hero-eyebrow::after { background: linear-gradient(90deg, #FF6900, transparent); }
        .ep-hero-title {
          font-family: 'Funnel Display', 'Inter', sans-serif;
          font-size: clamp(3rem, 7vw, 6rem);
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: #fff;
          margin-bottom: 24px;
        }
        .ep-hero-title em {
          font-style: normal;
          background: linear-gradient(135deg, #FF6900 0%, #ffb347 60%, #FFD700 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .ep-hero-sub {
          font-size: 17px;
          color: rgba(255,255,255,0.5);
          line-height: 1.7;
          max-width: 540px;
          margin: 0 auto 36px;
        }
        .ep-hero-actions {
          display: flex;
          gap: 14px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .ep-btn-primary {
          background: #FF6900;
          color: #fff;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 700;
          padding: 16px 32px;
          border-radius: 100px;
          border: none;
          cursor: pointer;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          box-shadow: 0 4px 24px rgba(255,105,0,0.35);
        }
        .ep-btn-primary:hover {
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 8px 36px rgba(255,105,0,0.5);
        }
        .ep-btn-outline {
          background: transparent;
          color: rgba(255,255,255,0.75);
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 600;
          padding: 16px 32px;
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.15);
          cursor: pointer;
          transition: border-color 0.25s, color 0.25s, transform 0.25s;
        }
        .ep-btn-outline:hover {
          border-color: rgba(255,255,255,0.4);
          color: #fff;
          transform: translateY(-2px);
        }

        /* Scroll indicator */
        .ep-scroll-hint {
          margin-top: 60px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: rgba(255,255,255,0.25);
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          animation: ep-bounce 2s ease-in-out infinite;
        }
        .ep-scroll-hint-line {
          width: 1px; height: 48px;
          background: linear-gradient(to bottom, #FF6900, transparent);
        }
        @keyframes ep-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }

        /* ════ Section wrapper ════ */
        .ep-section {
          padding: 90px 8vw;
          max-width: 1300px;
          margin: 0 auto;
        }
        .ep-section-header {
          margin-bottom: 48px;
        }
        .ep-section-label {
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #FF6900;
          margin-bottom: 12px;
        }
        .ep-section-title {
          font-family: 'Funnel Display', 'Inter', sans-serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 900;
          color: #fff;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin-bottom: 14px;
        }
        .ep-section-sub {
          font-size: 15px;
          color: rgba(255,255,255,0.45);
          line-height: 1.7;
          max-width: 500px;
        }

        /* ════ Filters ════ */
        .ep-filters {
          display: flex;
          gap: 10px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }
        .ep-filter-btn {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 600;
          padding: 10px 22px;
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.12);
          background: transparent;
          color: rgba(255,255,255,0.5);
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .ep-filter-btn:hover {
          border-color: rgba(255,105,0,0.4);
          color: rgba(255,165,0,0.9);
        }
        .ep-filter-btn.ep-filter-active {
          background: #FF6900;
          border-color: #FF6900;
          color: #fff;
          box-shadow: 0 4px 14px rgba(255,105,0,0.3);
        }

        /* ════ Event cards grid ════ */
        .ep-ev-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
        }
        .ep-ev-card {
          background: #111114;
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          transition:
            opacity 0.65s cubic-bezier(0.22,1,0.36,1),
            transform 0.65s cubic-bezier(0.22,1,0.36,1),
            box-shadow 0.3s ease;
        }
        .ep-ev-card:hover {
          box-shadow: 0 16px 48px rgba(0,0,0,0.5);
          transform: translateY(-6px) !important;
        }
        .ep-ev-img-wrap {
          position: relative;
          height: 200px;
          overflow: hidden;
        }
        .ep-ev-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.22,1,0.36,1);
          display: block;
        }
        .ep-ev-card:hover .ep-ev-img {
          transform: scale(1.07);
        }
        .ep-ev-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(7,7,8,0.7) 0%, transparent 60%);
        }
        .ep-ev-type-badge {
          position: absolute;
          top: 14px; right: 14px;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 5px 12px;
          border-radius: 100px;
        }
        .ep-ev-body {
          padding: 22px 22px 26px;
        }
        .ep-ev-dept {
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .ep-ev-title {
          font-family: 'Funnel Display', 'Inter', sans-serif;
          font-size: 1.35rem;
          font-weight: 800;
          color: #fff;
          line-height: 1.2;
          margin-bottom: 12px;
        }
        .ep-ev-desc {
          font-size: 13.5px;
          color: rgba(255,255,255,0.5);
          line-height: 1.65;
          margin-bottom: 16px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;  
          overflow: hidden;
        }
        .ep-ev-meta {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 12.5px;
          color: rgba(255,255,255,0.38);
          margin-bottom: 16px;
        }
        .ep-reg-bar-wrap { margin-bottom: 18px; }
        .ep-reg-bar-labels {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          color: rgba(255,255,255,0.35);
          margin-bottom: 6px;
        }
        .ep-reg-bar-bg {
          background: rgba(255,255,255,0.07);
          border-radius: 4px;
          height: 5px;
          overflow: hidden;
        }
        .ep-reg-bar-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 1s cubic-bezier(0.22,1,0.36,1) 0.3s;
        }
        .ep-ev-btn {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 700;
          padding: 13px 24px;
          border-radius: 100px;
          border: none;
          width: 100%;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          transition: opacity 0.25s ease, transform 0.25s ease;
        }
        .ep-ev-btn:not(:disabled):hover {
          opacity: 0.88;
          transform: scale(1.02);
        }

        /* ════ Modal ════ */
        .ep-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.82);
          backdrop-filter: blur(8px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: ep-fade-in 0.25s ease;
        }
        @keyframes ep-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .ep-modal {
          background: #111114;
          border-radius: 24px;
          max-width: 640px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          animation: ep-slide-up 0.3s cubic-bezier(0.22,1,0.36,1);
          border: 1px solid rgba(255,255,255,0.07);
        }
        @keyframes ep-slide-up {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .ep-modal-close {
          position: absolute;
          top: 16px; right: 16px;
          background: rgba(255,255,255,0.1);
          border: none;
          border-radius: 50%;
          color: #fff;
          width: 36px; height: 36px;
          font-size: 14px;
          cursor: pointer;
          z-index: 2;
          transition: background 0.2s;
        }
        .ep-modal-close:hover { background: rgba(255,255,255,0.2); }
        .ep-modal-img-wrap {
          position: relative;
          height: 240px;
          border-radius: 24px 24px 0 0;
          overflow: hidden;
        }
        .ep-modal-img-wrap img {
          width: 100%; height: 100%; object-fit: cover; display: block;
        }
        .ep-modal-img-grad {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, #111114 0%, transparent 55%);
        }
        .ep-modal-body { padding: 28px 32px 36px; }
        .ep-modal-title {
          font-family: 'Funnel Display', 'Inter', sans-serif;
          font-size: 1.9rem;
          font-weight: 900;
          color: #fff;
          line-height: 1.15;
          margin-bottom: 16px;
        }
        .ep-modal-desc {
          font-size: 15px;
          color: rgba(255,255,255,0.55);
          line-height: 1.7;
          margin-bottom: 28px;
        }
        .ep-modal-meta {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .ep-modal-meta-item {
          background: rgba(255,255,255,0.04);
          border-radius: 14px;
          padding: 14px 16px;
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }
        .ep-modal-meta-icon { font-size: 18px; flex-shrink: 0; margin-top: 2px; }
        .ep-modal-meta-item > div {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .ep-modal-meta-item b {
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
        }
        .ep-modal-meta-item span {
          font-size: 13px;
          color: rgba(255,255,255,0.75);
          line-height: 1.5;
        }

        /* ════ Stats ════ */
        .ep-stats-strip {
          background: #0d0d10;
          border-top: 1px solid rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          padding: 70px 8vw;
        }
        .ep-stats-inner {
          max-width: 1000px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          text-align: center;
        }
        .ep-stat-card {
          padding: 32px 20px;
          border-radius: 20px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          display: flex;
          flex-direction: column;
          gap: 10px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .ep-stat-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.3);
        }
        .ep-stat-num {
          font-family: 'Funnel Display', 'Inter', sans-serif;
          font-size: clamp(2.2rem, 4vw, 3.5rem);
          font-weight: 900;
          background: linear-gradient(135deg, #FF6900, #ffb347);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
        }
        .ep-stat-label {
          font-size: 13px;
          color: rgba(255,255,255,0.4);
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        /* ════ Past events gallery ════ */
        .ep-past-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }
        .ep-past-card {
          border-radius: 18px;
          overflow: hidden;
          position: relative;
          height: 220px;
          cursor: pointer;
          opacity: 0;
          transform: translateY(24px);
          transition:
            opacity 0.6s cubic-bezier(0.22,1,0.36,1),
            transform 0.6s cubic-bezier(0.22,1,0.36,1);
        }
        .ep-past-card.ep-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        .ep-past-card:nth-child(1) { transition-delay: 0.05s; }
        .ep-past-card:nth-child(2) { transition-delay: 0.12s; }
        .ep-past-card:nth-child(3) { transition-delay: 0.19s; }
        .ep-past-card:nth-child(4) { transition-delay: 0.26s; }
        .ep-past-card:nth-child(5) { transition-delay: 0.33s; }
        .ep-past-card:nth-child(6) { transition-delay: 0.40s; }
        .ep-past-card img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s cubic-bezier(0.22,1,0.36,1), filter 0.4s ease;
          filter: grayscale(40%);
        }
        .ep-past-card:hover img {
          transform: scale(1.08);
          filter: grayscale(0%);
        }
        .ep-past-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(255,105,0,0.82) 0%, rgba(0,0,0,0.3) 50%, transparent 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 20px 18px;
        }
        .ep-past-card:hover .ep-past-overlay { opacity: 1; }
        .ep-past-overlay h4 {
          font-family: 'Funnel Display', 'Inter', sans-serif;
          font-size: 1.1rem;
          font-weight: 800;
          color: #fff;
          margin-bottom: 5px;
          line-height: 1.2;
        }
        .ep-past-overlay p {
          font-size: 12px;
          color: rgba(255,255,255,0.8);
          font-weight: 600;
        }
        /* Always-visible bottom bar */
        .ep-past-bar {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 14px 16px 12px;
          background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%);
        }
        .ep-past-bar span {
          font-size: 12px;
          font-weight: 700;
          color: rgba(255,255,255,0.7);
          letter-spacing: 0.05em;
        }

        /* ════ CTA ════ */
        .ep-cta {
          margin: 0 8vw 90px;
          border-radius: 28px;
          background: linear-gradient(135deg, #1a0800 0%, #2a1200 50%, #1a0800 100%);
          border: 1px solid rgba(255,105,0,0.18);
          padding: 72px 64px;
          text-align: center;
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1);
        }
        .ep-cta.ep-in { opacity: 1; transform: translateY(0); }
        .ep-cta-glow {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 500px; height: 200px;
          background: radial-gradient(ellipse, rgba(255,105,0,0.18) 0%, transparent 70%);
          pointer-events: none;
        }
        .ep-cta-eyebrow {
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #FF6900;
          margin-bottom: 16px;
        }
        .ep-cta-title {
          font-family: 'Funnel Display', 'Inter', sans-serif;
          font-size: clamp(1.8rem, 4vw, 3rem);
          font-weight: 900;
          color: #fff;
          line-height: 1.1;
          margin-bottom: 16px;
        }
        .ep-cta-sub {
          font-size: 15px;
          color: rgba(255,255,255,0.45);
          max-width: 480px;
          margin: 0 auto 36px;
          line-height: 1.7;
        }

        /* ════ Responsive ════ */
        @media (max-width: 860px) {
          .ep-stats-inner { grid-template-columns: repeat(2, 1fr); }
          .ep-past-grid { grid-template-columns: repeat(2, 1fr); }
          .ep-modal-meta { grid-template-columns: 1fr; }
          .ep-cta { padding: 48px 32px; }
        }
        @media (max-width: 560px) {
          .ep-past-grid { grid-template-columns: 1fr; }
          .ep-stats-inner { grid-template-columns: repeat(2, 1fr); }
          .ep-hero { padding: 70px 6vw 60px; }
          .ep-section { padding: 60px 6vw; }
          .ep-modal-body { padding: 24px 20px 30px; }
        }
      `}),e.jsxs("section",{className:"ep-hero",ref:t,children:[e.jsx("div",{className:"ep-hero-bg-ring"}),e.jsx("div",{className:"ep-hero-bg-ring"}),e.jsxs("div",{className:`ep-hero-inner${p?" ep-visible":""}`,style:{opacity:0,transform:"translateY(40px)"},children:[e.jsx("div",{className:"ep-hero-eyebrow",children:"IETE Student Forum"}),e.jsxs("h1",{className:"ep-hero-title",children:["Where Ideas ",e.jsx("br",{}),"Become ",e.jsx("em",{children:"Events"})]}),e.jsx("p",{className:"ep-hero-sub",children:"Competitions, workshops, hackathons, and more — crafted by students, for students. Find your next breakthrough moment here."}),e.jsxs("div",{className:"ep-hero-actions",children:[e.jsx("button",{className:"ep-btn-primary",children:"Explore Events ↓"}),e.jsx("button",{className:"ep-btn-outline",children:"Host an Event →"})]})]})]}),e.jsxs("div",{className:"ep-section",ref:s,children:[e.jsxs("div",{className:"ep-section-header",children:[e.jsx("p",{className:"ep-section-label",children:"What's Coming Up"}),e.jsx("h2",{className:"ep-section-title",children:"Upcoming Events"}),e.jsx("p",{className:"ep-section-sub",children:"Register early — seats fill fast. Click any card to see the full event details."})]}),e.jsx("div",{className:"ep-filters",children:b.map(a=>e.jsx("button",{className:`ep-filter-btn${m===a?" ep-filter-active":""}`,onClick:()=>f(a),children:a},a))}),e.jsx("div",{className:"ep-ev-grid",children:u.map((a,g)=>e.jsx(k,{ev:a,index:g,visible:i},a.id))})]}),e.jsx("div",{className:"ep-stats-strip",ref:o,children:e.jsx("div",{className:"ep-stats-inner",children:w.map((a,g)=>e.jsx(j,{val:a.val,suffix:a.suffix,label:a.label,delay:`${g*.1}s`,active:d},a.label))})}),e.jsxs("div",{className:"ep-section",ref:n,children:[e.jsxs("div",{className:"ep-section-header",children:[e.jsx("p",{className:"ep-section-label",children:"Look Back"}),e.jsx("h2",{className:"ep-section-title",children:"Past Events Gallery"}),e.jsx("p",{className:"ep-section-sub",children:"Memories we made together. Hover each photo to relive the moment."})]}),e.jsx("div",{className:"ep-past-grid",children:y.map(a=>e.jsxs("div",{className:`ep-past-card${x?" ep-in":""}`,children:[e.jsx("img",{src:a.img,alt:a.title,loading:"lazy"}),e.jsxs("div",{className:"ep-past-overlay",children:[e.jsx("h4",{children:a.title}),e.jsx("p",{children:a.highlight})]}),e.jsx("div",{className:"ep-past-bar",children:e.jsx("span",{children:a.date})})]},a.id))})]})]})}export{S as default};
