import React, { useEffect, useState } from 'react';

/**
 * Renders the circular ATS match score with dynamic count up and confetti effects.
 */
export default function ScoreCard({ score }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Reset states
    setAnimatedScore(0);
    setShowConfetti(false);

    // Count-up animation
    let start = 0;
    const duration = 1200; // ms
    const stepTime = Math.abs(Math.floor(duration / (score || 1)));
    
    if (score === 0) {
      setAnimatedScore(0);
      return;
    }

    const timer = setInterval(() => {
      start += 1;
      setAnimatedScore(start);
      if (start >= score) {
        clearInterval(timer);
        // Trigger confetti if score is high
        if (score >= 85) {
          setShowConfetti(true);
        }
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [score]);

  // SVG parameters
  const radius = 60;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  // Determine stroke color based on score tier
  let strokeClass = 'stroke-danger';
  let tierLabel = 'Needs Improvement';
  
  if (score >= 81) {
    strokeClass = 'stroke-success';
    tierLabel = 'Excellent';
  } else if (score >= 61) {
    strokeClass = 'stroke-primary';
    tierLabel = 'Good';
  } else if (score >= 31) {
    strokeClass = 'stroke-warning';
    tierLabel = 'Average';
  }

  // Generate confetti items
  const confettiParticles = Array.from({ length: 35 });

  return (
    <div className="score-card-wrapper card-metric card hover-lift relative-pos" data-aos="fade-up">
      {/* CSS Confetti Overlay */}
      {showConfetti && (
        <div className="confetti-container" aria-hidden="true">
          {confettiParticles.map((_, idx) => {
            const leftOffset = Math.random() * 100; // %
            const animDelay = Math.random() * 2; // s
            const animDuration = 2 + Math.random() * 2; // s
            const colorClass = `confetti-color-${Math.floor(Math.random() * 4)}`;
            
            return (
              <div
                key={`conf-${idx}`}
                className={`confetti-particle ${colorClass}`}
                style={{
                  left: `${leftOffset}%`,
                  animationDelay: `${animDelay}s`,
                  animationDuration: `${animDuration}s`,
                }}
              ></div>
            );
          })}
        </div>
      )}

      <div className="metric-header">
        <h3>ATS Match Score</h3>
      </div>
      
      <div className="circular-progress-container">
        <svg className="circular-progress-svg" width="160" height="160" viewBox="0 0 160 160">
          <circle
            className="circular-progress-bg"
            cx="80"
            cy="80"
            r={radius}
            strokeWidth={strokeWidth}
          />
          <circle
            className={`circular-progress-bar ${strokeClass}`}
            cx="80"
            cy="80"
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 80 80)"
          />
          <text className="circular-progress-text" x="80" y="85" textAnchor="middle">
            {animatedScore}%
          </text>
        </svg>
      </div>

      <div className="score-badge-desc">
        <span className={`match-badge-pill ${strokeClass}`}>{tierLabel}</span>
        <p className="metric-footer-text">Target overlap achieved.</p>
      </div>
    </div>
  );
}
