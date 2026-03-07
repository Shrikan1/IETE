import { useEffect, useState, useRef, forwardRef } from 'react';

const EventsSection = forwardRef(function EventsSection(props, centerCardRef) {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  // useRef instead of useState: scroll updates mutate DOM directly, no re-renders
  const morphProgressRef = useRef(0);
  const morphTextEls = useRef([]);  // refs to opacity-driven text elements
  const morphCardRef = useRef(null); // local ref for the center card styles

  // Entrance observer
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Scroll-driven morph: directly mutate DOM — no setState, no re-renders
  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.4;
      const end = -vh * 0.15;
      let mp;
      if (rect.top >= start) mp = 0;
      else if (rect.top <= end) mp = 1;
      else mp = Math.max(0, Math.min(1, 1 - (rect.top - end) / (start - end)));

      morphProgressRef.current = mp;
      window.__evMorphProgress = mp;

      // Directly update center card styles
      const card = morphCardRef.current;
      if (card) {
        card.style.borderRadius = `${mp * 50}%`;
        card.style.transform = `translateY(0) scale(${1 - mp * 0.15})`;
        if (mp > 0.8) card.classList.add('morphed');
        else card.classList.remove('morphed');
      }
      // Directly update text element opacities
      const textOp = Math.max(0, 1 - mp * 1.5);
      for (const el of morphTextEls.current) {
        if (el) el.style.opacity = textOp;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <style>{`
        .ev-section {
          width: 100%;
          
          background: #93C572;
          padding: 250px 9vw 250px;
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
          border-radius: 40px;
        }

        /* Soft noise texture */
        .ev-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }

        /* Ambient light orb top-right */
        .ev-section::after {
          content: '';
          position: absolute;
          width: 600px; height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 65%);
          top: -120px; right: -120px;
          pointer-events: none;
          z-index: 0;
          animation: ev-orb-drift 14s ease-in-out infinite alternate;
        }
        @keyframes ev-orb-drift {
          0%   { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-50px, 70px) scale(1.12); }
        }

        .ev-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          /* No z-index here! Canvas (z-index:1) must remain ABOVE the center card
             so the 3D model renders on top of the circle, not behind it. */
        }

        /* ── Section Header ── */
        .ev-header {
          margin-bottom: 52px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 14px;
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1);
        }
        .ev-visible .ev-header { opacity: 1; transform: translateY(0); }

        .ev-header-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(0,0,0,0.14);
          border: 1px solid rgba(0,0,0,0.18);
          color: rgba(0,0,0,0.6);
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 100px;
          font-family: 'Inter', sans-serif;
          backdrop-filter: blur(6px);
        }
        .ev-header-badge::before {
          content: '';
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #0d3b30;
          box-shadow: 0 0 6px rgba(0,0,0,0.35);
          animation: ev-badge-pulse 2.2s ease-in-out infinite;
        }
        @keyframes ev-badge-pulse {
          0%, 100% { opacity:1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.65); }
        }

        .ev-header-title {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 900;
          color: #0d2e0d;
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin: 0;
          text-shadow:
            0 0 16px rgba(8, 203, 0, 0.7),
            0 0 36px rgba(8, 203, 0, 0.45),
            0 0 75px rgba(8, 203, 0, 0.23);
        }
        .ev-header-sub {
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          color: rgba(0,0,0,0.42);
          font-weight: 400;
          margin: 0;
          max-width: 420px;
          line-height: 1.6;
        }


        /* ═══ Bento Grid ═══ */
        .ev-bento {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: 18px;
          min-height: 520px;
          height: 520px;
          align-items: stretch;
        }

        /* ═══ Cards ═══ */
        .ev-card {
          border-radius: 28px;
          padding: 26px 22px;
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          opacity: 0;
          transform: translateY(32px);
          transition:
            opacity 0.7s cubic-bezier(0.22,1,0.36,1),
            transform 0.7s cubic-bezier(0.22,1,0.36,1),
            box-shadow 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        /* Shine sweep on hover */
        .ev-card::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 50%; height: 100%;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%);
          transition: left 0.6s cubic-bezier(0.22,1,0.36,1);
          pointer-events: none;
          z-index: 10;
        }
        .ev-card:hover::after {
          left: 160%;
        }
        .ev-card:not(.ev-img-card):not(.ev-card-center):hover {
          transform: translateY(-6px) !important;
          box-shadow: 0 20px 60px rgba(0,0,0,0.45), 0 8px 20px rgba(0,0,0,0.3);
        }
        .ev-img-card { padding: 0; }
        .ev-visible .ev-card:nth-child(1) { opacity:1; transform:translateY(0); transition-delay:0.08s; }
        .ev-visible .ev-card:nth-child(2) { opacity:1; transform:translateY(0); transition-delay:0.16s; }
        .ev-visible .ev-right-col .ev-card:nth-child(1) { opacity:1; transform:translateY(0); transition-delay:0.24s; }
        .ev-visible .ev-right-col .ev-card:nth-child(2) { opacity:1; transform:translateY(0); transition-delay:0.32s; }

        /* Card 1 — Bento style, tall left (spans 2 rows) */
        .ev-card-1 {
          grid-column: 1;
          grid-row: 1 / 3;
          background: #0d3b30;
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 4px 24px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.05) inset;
          min-height: 420px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 32px 28px 28px;
          overflow: hidden;
        }
        .ev-card-1:hover {
          box-shadow: 0 24px 70px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.08) inset;
        }

        /* Green diagonal accent patch — bottom right */
        .ev-card-1::before {
          content: '';
          position: absolute;
          bottom: 0; right: 0;
          width: 55%;
          height: 45%;
          background: #93C572;
          border-radius: 100% 0 28px 0;
          transform: translate(10%, 10%);
          transition: transform 0.6s cubic-bezier(0.22,1,0.36,1);
          z-index: 0;
        }
        .ev-card-1:hover::before {
          transform: translate(5%, 5%);
        }
       

        /* Floating mockup */
        .ev-c1-mockup {
          position: absolute;
          bottom: 70px;
          left: 50%;
          transform: translateX(-46%) translateY(18px) rotate(-4deg);
          width: 68%;
          max-width: 230px;
          opacity: 0;
          z-index: 3;
          transition:
            transform 0.7s cubic-bezier(0.22,1,0.36,1),
            opacity 0.6s ease;
          filter: drop-shadow(0 20px 40px rgba(0,0,0,0.6));
        }
        .ev-visible .ev-card-1 .ev-c1-mockup {
          opacity: 1;
          transform: translateX(-46%) translateY(0) rotate(-4deg);
          transition-delay: 0.35s;
        }
        .ev-card-1:hover .ev-c1-mockup {
          transform: translateX(-46%) translateY(-16px) rotate(-2deg);
        }

        /* Mockup inner UI */
        .ev-c1-mock-inner {
          background: #fff;
          border-radius: 18px;
          padding: 18px 16px 16px;
          font-family: 'Inter', sans-serif;
          color: #111;
          box-shadow: 0 12px 40px rgba(0,0,0,0.25), 0 2px 8px rgba(0,0,0,0.12);
          backdrop-filter: blur(12px);
        }
        .ev-c1-mock-title {
          font-size: 15px;
          font-weight: 800;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .ev-c1-mock-avatar {
          width: 26px; height: 26px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b1f8e, #93C572);
        }
        .ev-c1-mock-level {
          font-size: 10px;
          color: #888;
          margin-bottom: 10px;
          line-height: 1.3;
        }
        .ev-c1-mock-bar-bg {
          background: #eee;
          border-radius: 4px;
          height: 6px;
          margin-bottom: 10px;
        }
        .ev-c1-mock-bar-fill {
          background: linear-gradient(90deg, #ff6900, #ffb347);
          height: 100%;
          width: 72%;
          border-radius: 4px;
          animation: ev-bar-grow 1.2s cubic-bezier(0.22,1,0.36,1) both 0.8s;
        }
        @keyframes ev-bar-grow {
          from { width: 0; }
          to   { width: 72%; }
        }
        .ev-c1-mock-pts {
          font-size: 18px;
          font-weight: 900;
          margin-bottom: 10px;
        }
        .ev-c1-mock-pts span { color: #ff6900; margin-right: 4px; }
        .ev-c1-mock-tag {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #aaa;
          margin-bottom: 10px;
          text-transform: uppercase;
        }
        .ev-c1-mock-chips {
          display: flex;
          gap: 6px;
        }
        .ev-c1-mock-chip {
          background: #3b1f8e;
          color: #fff;
          border-radius: 10px;
          padding: 7px 9px;
          font-size: 9px;
          font-weight: 700;
          line-height: 1.3;
          flex: 1;
        }

        /* Card 1 text layers */
        .ev-c1-top { position: relative; z-index: 4; }
        .ev-c1-top .ev-card-title {
          font-size: clamp(1.3rem, 2vw, 1.7rem);
          margin-bottom: 0;
          line-height: 1.2;
        }
        .ev-c1-bottom { position: relative; z-index: 4; }
        .ev-c1-sub {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 800;
          color: #fff;
          margin-bottom: 0;
          opacity: 0.75;
          letter-spacing: 0.04em;
        }

        /* Card 2 — Center text card (spans 2 rows) — morphing */
        .ev-card-center {
          grid-column: 2;
          grid-row: 1 / 3;
          background: #0a0a0a;
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow:
            0 0 0 1px rgba(147,197,114,0.06),
            0 8px 32px rgba(0,0,0,0.5),
            inset 0 1px 0 rgba(255,255,255,0.04);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          align-self: center;
          text-align: center;
          padding: 48px 32px;
          aspect-ratio: 1 / 1;
          width: 80%;
          max-width: 420px;
          max-height: 420px;
          margin: 0 auto;
          will-change: border-radius, transform;
          transition:
            border-radius 0.05s linear,
            transform 0.05s linear,
            box-shadow 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .ev-card-center.morphed {
          box-shadow:
            0 0 0 2px rgba(147,197,114,0.25),
            0 0 40px rgba(147,197,114,0.12),
            0 0 80px rgba(147,197,114,0.06),
            0 0 120px rgba(8,203,0,0.04),
            inset 0 0 40px rgba(147,197,114,0.03);
          border-color: rgba(147,197,114,0.2);
        }

        /* ═══ Right column wrapper ═══ */
        .ev-right-col {
          grid-column: 3;
          grid-row: 1 / 3;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* Thunder border wrapper */
        .ev-thunder-wrap {
          flex: 1;
          min-height: 0;
          position: relative;
          border-radius: 28px;
          padding: 2px;
          background: transparent;
          transition: flex-grow 0.5s cubic-bezier(0.22,1,0.36,1);
          isolation: isolate;
        }
        .ev-thunder-wrap::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 30px;
          background: conic-gradient(
            from 0deg,
            #08CB00 0%,
            #93C572 15%,
            transparent 30%,
            transparent 70%,
            #ffb347 85%,
            #ff6900 100%
          );
          opacity: 0.15;
          transition: opacity 0.4s cubic-bezier(0.22,1,0.36,1);
          animation: ev-thunder-spin 3s linear infinite;
          z-index: 0;
        }
        .ev-thunder-wrap:hover::before {
          opacity: 1;
        }
       
        @keyframes ev-thunder-spin {
          to { transform: rotate(360deg); }
        }

        /* Card 3 — top bento card */
        .ev-card-3 {
          height: 100%;
          border-radius: 24px;
          overflow: hidden;
          position: relative;
          background: #111827;
          border: 1px solid rgba(255,255,255,0.07);
          box-shadow: 0 4px 20px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 24px 22px 20px;
          box-sizing: border-box;
          transition: box-shadow 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.6s ease, transform 0.6s ease;
        }
        .ev-card-3:hover {
          box-shadow: 0 16px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07);
        }

        /* Card 4 — bottom bento card */
        .ev-card-4 {
          height: 100%;
          border-radius: 24px;
          overflow: hidden;
          position: relative;
          background: #1a0a2e;
          border: 1px solid rgba(255,255,255,0.07);
          box-shadow: 0 4px 20px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 24px 22px 20px;
          box-sizing: border-box;
          transition: box-shadow 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.6s ease, transform 0.6s ease;
        }
        .ev-card-4:hover {
          box-shadow: 0 16px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07);
        }

        /* Grow/shrink on sibling hover */
        .ev-right-col:has(.ev-thunder-wrap:nth-child(1):hover) .ev-thunder-wrap:nth-child(1) { flex-grow: 2.5; }
        .ev-right-col:has(.ev-thunder-wrap:nth-child(1):hover) .ev-thunder-wrap:nth-child(2) { flex-grow: 0.3; }
        .ev-right-col:has(.ev-thunder-wrap:nth-child(2):hover) .ev-thunder-wrap:nth-child(2) { flex-grow: 2.5; }
        .ev-right-col:has(.ev-thunder-wrap:nth-child(2):hover) .ev-thunder-wrap:nth-child(1) { flex-grow: 0.3; }

        /* ═══ Bento card inner elements ═══ */
        .ev-bc-top { position: relative; z-index: 2; }
        .ev-bc-bottom { position: relative; z-index: 2; }

        /* Floating stats widget */
        .ev-bc-widget {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 18px;
          padding: 14px 14px 12px;
          margin: 12px 0;
          font-family: 'Inter', sans-serif;
          position: relative;
          z-index: 2;
          transform: translateY(10px);
          opacity: 0;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06);
          transition: transform 0.55s cubic-bezier(0.22,1,0.36,1), opacity 0.45s ease;
        }
        .ev-thunder-wrap:hover .ev-bc-widget {
          transform: translateY(0);
          opacity: 1;
        }
        .ev-bc-widget-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 10px;
        }
        .ev-bc-widget-avatar {
          width: 28px; height: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b1f8e, #08CB00);
          flex-shrink: 0;
        }
        .ev-bc-widget-name {
          font-size: 13px;
          font-weight: 800;
          color: #fff;
        }
        .ev-bc-widget-sub {
          font-size: 10px;
          color: rgba(255,255,255,0.45);
          margin-bottom: 8px;
        }
        .ev-bc-bar-bg {
          background: rgba(255,255,255,0.1);
          border-radius: 4px;
          height: 5px;
          margin-bottom: 10px;
          overflow: hidden;
        }
        .ev-bc-bar-fill {
          height: 100%;
          border-radius: 4px;
          width: 0;
          transition: width 0.9s cubic-bezier(0.22,1,0.36,1) 0.2s;
        }
        .ev-thunder-wrap:hover .ev-bc-bar-fill { width: 72%; }
        .ev-bc-pts {
          font-size: 16px;
          font-weight: 900;
          color: #fff;
          margin-bottom: 8px;
        }
        .ev-bc-chips {
          display: flex;
          gap: 6px;
        }
        .ev-bc-chip {
          border-radius: 10px;
          padding: 6px 8px;
          font-size: 9px;
          font-weight: 700;
          color: #fff;
          line-height: 1.4;
          flex: 1;
          backdrop-filter: blur(4px);
          transition: transform 0.2s ease;
        }
        .ev-bc-chip:hover {
          transform: translateY(-1px);
        }

        /* Hover desc fade in */
        .ev-bc-desc {
          font-family: 'Inter', sans-serif;
          font-size: 12.5px;
          color: rgba(255,255,255,0.55);
          line-height: 1.6;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s;
        }
        .ev-thunder-wrap:hover .ev-bc-desc {
          opacity: 1;
          transform: translateY(0);
        }

        /* ═══ Event image card styles ═══ */
        .ev-img-card {
          border-radius: 24px;
          overflow: hidden;
          position: relative;
          cursor: pointer;
        }
        .ev-img-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.45s cubic-bezier(0.22,1,0.36,1);
        }
        .ev-img-card:hover img {
          transform: scale(1.06);
        }

        /* Static top info bar */
        .ev-img-top {
          position: absolute;
          top: 0; left: 0; right: 0;
          padding: 18px 22px 14px;
          background: linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 100%);
          z-index: 3;
        }
        .ev-img-top .ev-card-dept {
          margin-bottom: 4px;
        }
        .ev-img-top .ev-card-title {
          font-size: clamp(1.1rem, 1.8vw, 1.4rem);
          margin-bottom: 0;
        }

        /* Hover overlay — slides up from bottom */
        .ev-img-overlay {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 22px 22px 24px;
          background: linear-gradient(to top, rgba(0,0,0,0.88) 60%, transparent 100%);
          transform: translateY(100%);
          opacity: 0;
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.35s ease;
          z-index: 3;
        }
        .ev-img-card:hover .ev-img-overlay {
          transform: translateY(0);
          opacity: 1;
        }
        .ev-img-overlay .ev-card-desc {
          color: rgba(255,255,255,0.88);
          font-size: 13.5px;
          margin-bottom: 14px;
        }
        .ev-img-overlay .ev-pill {
          margin-top: 0;
          padding: 10px 18px;
          font-size: 12px;
        }



        /* ═══ Card Typography ═══ */
        .ev-card-title {
          font-family: 'Funnel Display', 'Inter', sans-serif;
          font-size: clamp(1.4rem, 2.2vw, 1.8rem);
          font-weight: 800;
          color: #fff;
          line-height: 1.2;
          margin-bottom: 12px;
        }
        .ev-card-dept {
          font-family: 'Inter', sans-serif;
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.65);
          margin-bottom: 14px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .ev-card-dept::before {
          content: '';
          display: inline-block;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: currentColor;
          opacity: 0.8;
        }
        .ev-card-desc {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          color: rgba(255,255,255,0.7);
          line-height: 1.65;
          max-width: 320px;
        }

        /* Pill button */
        .ev-pill {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(255,255,255,0.95);
          color: #1a1a1a;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 700;
          padding: 14px 24px;
          border-radius: 100px;
          border: none;
          cursor: pointer;
          margin-top: 24px;
          transition: background 0.25s ease, transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          box-shadow: 0 4px 14px rgba(0,0,0,0.15);
          position: relative;
          overflow: hidden;
        }
        .ev-pill::after {
          content: '';
          position: absolute;
          top: 0; left: -80%;
          width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          skewX: -15deg;
          transition: left 0.5s ease;
        }
        .ev-pill:hover::after {
          left: 130%;
        }
        .ev-pill:hover {
          background: #fff;
          transform: scale(1.05) translateY(-1px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        }
        .ev-pill-icon {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #3b1f8e;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 14px;
        }

        /* Dots indicator */
        .ev-dots {
          display: flex;
          gap: 6px;
          margin-top: 20px;
        }
        .ev-dot {
          width: 24px;
          height: 4px;
          border-radius: 4px;
          background: rgba(255,255,255,0.25);
        }
        .ev-dot.active { background: #fff; }

        /* ═══ Center card ═══ */
        .ev-center-heading {
          font-family: 'Funnel Display', 'Inter', sans-serif;
          font-size: clamp(2rem, 3.5vw, 2.8rem);
          font-weight: 900;
          color: #fff;
          line-height: 1.1;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          margin-bottom: 20px;
        }
        .ev-center-heading em {
          font-style: normal;
          background: linear-gradient(135deg, #FF6900, #ffb347);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .ev-center-desc {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          color: rgba(255,255,255,0.45);
          line-height: 1.7;
          max-width: 280px;
        }
        .ev-skel {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 20px;
          align-items: center;
        }
        .ev-skel-line {
          height: 8px;
          border-radius: 4px;
          background: linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.04) 100%);
          background-size: 200% 100%;
          animation: ev-skel-shimmer 2s ease-in-out infinite;
        }
        @keyframes ev-skel-shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        /* ═══ Green card bar chart ═══ */
        .ev-graphic {
          margin-top: 20px;
          display: flex;
          gap: 8px;
          align-items: flex-end;
        }
        .ev-graphic-bar {
          width: 28px;
          border-radius: 6px 6px 0 0;
          background: rgba(255,255,255,0.25);
          transition: background 0.3s ease, height 0.5s cubic-bezier(0.22,1,0.36,1), transform 0.3s ease;
        }
        .ev-card:hover .ev-graphic-bar {
          background: rgba(255,255,255,0.55);
          transform: scaleY(1.08);
          transform-origin: bottom;
        }

        /* ═══ Orange card lock badge ═══ */
        .ev-lock-badge {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: rgba(255,255,255,0.9);
          border-radius: 12px;
          padding: 14px 20px;
          margin-top: 18px;
        }
        .ev-lock-icon { font-size: 22px; }
        .ev-lock-line {
          width: 80px;
          height: 2px;
          background: rgba(0,0,0,0.12);
          border-radius: 2px;
        }

        /* ═══ Responsive ═══ */
        @media (max-width: 860px) {
          .ev-section { padding: 120px 6vw 120px; }
          .ev-bento {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto;
            height: auto;
            min-height: unset;
          }
          .ev-card-1 { grid-column: 1; grid-row: auto; min-height: 320px; }
          .ev-card-center {
            grid-column: 2; grid-row: auto;
            width: 100%; max-width: 100%; max-height: 360px;
            aspect-ratio: 1 / 1;
          }
          .ev-right-col { grid-column: 1 / 3; grid-row: auto; min-height: 400px; }
        }
        @media (max-width: 560px) {
          .ev-section { padding: 80px 5vw 80px; }
          .ev-bento { grid-template-columns: 1fr; }
          .ev-card-1 { min-height: 280px; }
          .ev-card-center {
            grid-column: 1; width: 90%; max-width: 340px;
            margin: 0 auto; max-height: 340px;
            /* disable scroll morph on small screens */
            border-radius: 50% !important;
            transform: none !important;
          }
          .ev-right-col { grid-column: 1; min-height: 360px; }
          .ev-right-col { flex-direction: column; }
        }
      `}</style>

      <section
        className={'ev-section  ' + (visible ? ' ev-visible' : '')}
        ref={sectionRef}
      >
        <div className="ev-container">
          {/* Section Header */}
          <div className="ev-header">
            <h2 className="ev-header-title">Events & Experiences</h2>
            <p className="ev-header-sub">Competitions, workshops, and real-world challenges — curated for every stage of your engineering journey.</p>
          </div>

          <div className="ev-bento">

            {/* Card 1 — Bento style, dark teal + floating mockup */}
            <div className="ev-card ev-card-1">
              {/* Top heading */}
              <div className="ev-c1-top">
                <div className="ev-card-title">Get Rewarded<br />for Events<br />&amp; Competitions</div>
              </div>

              {/* Floating UI mockup */}
              <div className="ev-c1-mockup">
                <div className="ev-c1-mock-inner">
                  <div className="ev-c1-mock-title">
                    <div className="ev-c1-mock-avatar" />
                    Rewards
                  </div>
                  <div className="ev-c1-mock-level">Level 2 &nbsp;·&nbsp; Frontier</div>
                  <div className="ev-c1-mock-bar-bg">
                    <div className="ev-c1-mock-bar-fill" />
                  </div>
                  <div className="ev-c1-mock-pts"><span>🏆</span>22,578 pts</div>
                  <div className="ev-c1-mock-tag">Active bonuses &nbsp; 3</div>
                  <div className="ev-c1-mock-chips">
                    <div className="ev-c1-mock-chip">2x pts for<br />Hackathons<br /><span style={{ fontSize: '8px', opacity: 0.7 }}>Season 1</span></div>
                    <div className="ev-c1-mock-chip">50% pts<br />Workshops<br /><span style={{ fontSize: '8px', opacity: 0.7 }}>Season 1</span></div>
                  </div>
                </div>
              </div>

              {/* Bottom subtext */}
              <div className="ev-c1-bottom">
                <div className="ev-c1-sub">Season 2 coming soon</div>
              </div>
            </div>

            {/* Card 2 — Center text → morphs to circle */}
            <div
              ref={(el) => { morphCardRef.current = el; if (centerCardRef) centerCardRef.current = el; }}
              className="ev-card ev-card-center"
              style={{ borderRadius: '0%', transform: 'translateY(0) scale(1)' }}
            >
              <div ref={el => morphTextEls.current[0] = el} className="ev-skel" style={{ opacity: 1 }}>
                <span className="ev-skel-line" style={{ width: '60%' }} />
                <span className="ev-skel-line" style={{ width: '80%' }} />
                <span className="ev-skel-line" style={{ width: '50%' }} />
              </div>
              <div ref={el => morphTextEls.current[1] = el} className="ev-center-heading" style={{ opacity: 1 }}>
                Event <br />Conducted By<br /><em>IETE</em>
              </div>
              <div ref={el => morphTextEls.current[2] = el} className="ev-skel" style={{ opacity: 1 }}>
                <span className="ev-skel-line" style={{ width: '90%' }} />
                <span className="ev-skel-line" style={{ width: '70%' }} />
                <span className="ev-skel-line" style={{ width: '85%' }} />
              </div>
              <div ref={el => morphTextEls.current[3] = el} className="ev-center-desc" style={{ opacity: 1 }}>
                Events, workshops, competitions — your gateway to real-world tech experience.
              </div>
            </div>

            {/* Right column — stacked bento cards with thunder border */}
            <div className="ev-right-col">

              {/* Card 3 — CircuitCraft */}
              <div className="ev-thunder-wrap">
                <div className="ev-card ev-card-3">
                  <div className="ev-bc-top">
                    <div className="ev-card-dept" style={{ color: 'rgba(8,203,0,0.8)' }}>Electronics Wing</div>
                    <div className="ev-card-title" style={{ fontSize: 'clamp(1.1rem,1.6vw,1.4rem)' }}>CircuitCraft<br />Competition</div>
                  </div>
                  <div className="ev-bc-widget">
                    <div className="ev-bc-widget-header">
                      <div className="ev-bc-widget-avatar" />
                      <div className="ev-bc-widget-name">⚡ Event Stats</div>
                    </div>
                    <div className="ev-bc-widget-sub">Season 1 &nbsp;·&nbsp; Electronics</div>
                    <div className="ev-bc-bar-bg">
                      <div className="ev-bc-bar-fill" style={{ background: 'linear-gradient(90deg,#08CB00,#93C572)' }} />
                    </div>
                    <div className="ev-bc-pts">🏆 &nbsp;480 Participants</div>
                    <div className="ev-bc-chips">
                      <div className="ev-bc-chip" style={{ background: '#0d3b30' }}>Circuit<br />Design<br /><span style={{ opacity: 0.6, fontSize: '8px' }}>Hardware</span></div>
                      <div className="ev-bc-chip" style={{ background: '#0d3b30' }}>2x pts<br />for Wins<br /><span style={{ opacity: 0.6, fontSize: '8px' }}>Bonus</span></div>
                    </div>
                  </div>
                  <div className="ev-bc-bottom">
                    <div className="ev-bc-desc">Hands-on circuit design competition pushing embedded systems to the edge. Build, test, and compete.</div>
                    <div className="ev-pill" style={{ marginTop: '12px', padding: '10px 16px', fontSize: '12px', background: 'rgba(8,203,0,0.15)', color: '#08CB00', border: '1px solid rgba(8,203,0,0.3)' }}>
                      <span>⚡</span> Register Now
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 4 — Security / Privacy */}
              <div className="ev-thunder-wrap">
                <div className="ev-card ev-card-4">
                  <div className="ev-bc-top">
                    <div className="ev-card-dept" style={{ color: 'rgba(255,140,90,0.8)' }}>Security Wing</div>
                    <div className="ev-card-title" style={{ fontSize: 'clamp(1.1rem,1.6vw,1.4rem)' }}>Privacy-first:<br />Your Data</div>
                  </div>
                  <div className="ev-bc-widget">
                    <div className="ev-bc-widget-header">
                      <div className="ev-bc-widget-avatar" style={{ background: 'linear-gradient(135deg,#ff6900,#3b1f8e)' }} />
                      <div className="ev-bc-widget-name">🔒 Security Score</div>
                    </div>
                    <div className="ev-bc-widget-sub">Season 1 &nbsp;·&nbsp; CyberSec</div>
                    <div className="ev-bc-bar-bg">
                      <div className="ev-bc-bar-fill" style={{ background: 'linear-gradient(90deg,#ff6900,#ffb347)' }} />
                    </div>
                    <div className="ev-bc-pts">🛡️ &nbsp;256-bit Secure</div>
                    <div className="ev-bc-chips">
                      <div className="ev-bc-chip" style={{ background: '#1a0a2e', border: '1px solid rgba(255,140,90,0.2)' }}>Ethical<br />Hacking<br /><span style={{ opacity: 0.6, fontSize: '8px' }}>Workshop</span></div>
                      <div className="ev-bc-chip" style={{ background: '#1a0a2e', border: '1px solid rgba(255,140,90,0.2)' }}>Data<br />Privacy<br /><span style={{ opacity: 0.6, fontSize: '8px' }}>Certified</span></div>
                    </div>
                  </div>
                  <div className="ev-bc-bottom">
                    <div className="ev-bc-desc">All registrations are secure per IETE data policy. Learn ethical hacking and data protection.</div>
                    <div className="ev-pill" style={{ marginTop: '12px', padding: '10px 16px', fontSize: '12px', background: 'rgba(255,140,90,0.12)', color: '#ff8c5a', border: '1px solid rgba(255,140,90,0.3)' }}>
                      <span>🔒</span> Learn More
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </>
  );
});

export default EventsSection;