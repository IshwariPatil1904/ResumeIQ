import React, { useEffect, useState } from 'react';

export default function AnimatedCounter({ value = 0, duration = 1200, suffix = '' }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const target = Number(value) || 0;
    if (target === 0) {
      setDisplay(0);
      return undefined;
    }

    let start = 0;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      start = Math.round(target * eased);
      setDisplay(start);
      if (progress < 1) requestAnimationFrame(tick);
    };

    const frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, duration]);

  return (
    <span aria-live="polite">
      {display}
      {suffix}
    </span>
  );
}
