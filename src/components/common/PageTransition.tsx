import React, { useEffect, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface PageTransitionProps {
  isTransitioning: boolean;
  onTransitionComplete?: () => void;
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  isTransitioning,
  onTransitionComplete,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      if (isTransitioning && onTransitionComplete) {
        onTransitionComplete();
      }
      return;
    }

    if (isTransitioning) {
      setActive(true);
      const timer = setTimeout(() => {
        setActive(false);
        if (onTransitionComplete) onTransitionComplete();
      }, 550);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning, prefersReducedMotion, onTransitionComplete]);

  if (prefersReducedMotion || !active) return null;

  return (
    <div className="page-transition-curtain" aria-hidden="true">
      <div className={`curtain-block ${active ? 'active' : ''}`} />
    </div>
  );
};
