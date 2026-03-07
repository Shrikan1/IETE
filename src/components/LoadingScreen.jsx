import { useState, useEffect, useRef } from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ onComplete }) => {
  const [currentFrame, setCurrentFrame] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const totalFrames = 40;
  const frameRate = 24; // Reduced for smoother playback
  const imagesRef = useRef([]);

  // Preload all frames
  useEffect(() => {
    let loadedCount = 0;
    const images = [];

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const frameNumber = String(i).padStart(3, '0');
      img.src = `/frames/ezgif-frame-${frameNumber}.png`;
      
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalFrames) {
          setIsLoaded(true);
        }
      };
      
      images.push(img);
    }
    
    imagesRef.current = images;
  }, [totalFrames]);

  // Play animation after preload
  useEffect(() => {
    if (!isLoaded) return;

    if (currentFrame > totalFrames) {
      setIsComplete(true);
      setTimeout(() => {
        onComplete();
      }, 300);
      return;
    }

    const timer = setTimeout(() => {
      setCurrentFrame(prev => prev + 1);
    }, 1000 / frameRate);

    return () => clearTimeout(timer);
  }, [currentFrame, isLoaded, onComplete, totalFrames, frameRate]);

  if (!isLoaded) {
    return (
      <div className="loading-screen">
        <div className="loading-text">Loading...</div>
      </div>
    );
  }

  const frameNumber = String(currentFrame).padStart(3, '0');
  const frameSrc = `/frames/ezgif-frame-${frameNumber}.png`;

  return (
    <div className={`loading-screen ${isComplete ? 'fade-out' : ''}`}>
      <img 
        src={frameSrc} 
        alt="Loading animation" 
        className="intro-frame"
      />
      <button className="skip-button interactive" onClick={() => onComplete()}>
        Skip →
      </button>
    </div>
  );
};

export default LoadingScreen;
