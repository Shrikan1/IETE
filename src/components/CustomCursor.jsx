import { useEffect, useRef } from 'react';
import './CustomCursor.css';

const CustomCursor = ({ color = 'green' }) => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;
    let rafId;
    let isHover = false;

    // Direct dot follows mouse instantly
    const moveCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    };

    // Ring lerps smoothly via RAF — no GSAP overhead
    const loop = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      const scale = isHover ? 1.5 : 1;
      cursor.style.transform = `translate(${ringX}px, ${ringY}px) scale(${scale})`;
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    const handleMouseEnter = () => { isHover = true; };
    const handleMouseLeave = () => { isHover = false; };

    window.addEventListener('mousemove', moveCursor, { passive: true });

    const interactiveElements = document.querySelectorAll('a, button, .interactive');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" data-cursor-color={color}></div>
      <div ref={cursorDotRef} className="custom-cursor-dot" data-cursor-color={color}></div>
    </>
  );
};

export default CustomCursor;
