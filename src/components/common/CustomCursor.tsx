import React, { useEffect, useState, useRef } from 'react';
import { useCursor } from '../../hooks/useCursorState';

export const CustomCursor: React.FC = () => {
  const { cursorState, cursorLabel } = useCursor();
  const [visible, setVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100, targetX: -100, targetY: -100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      pos.current.targetX = e.clientX;
      pos.current.targetY = e.clientY;
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    let animationFrameId: number;
    const updateCursor = () => {
      // Lerp for fluid kinetic cursor motion
      pos.current.x += (pos.current.targetX - pos.current.x) * 0.22;
      pos.current.y += (pos.current.targetY - pos.current.y) * 0.22;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(updateCursor);
    };

    animationFrameId = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor state-${cursorState}`}
      aria-hidden="true"
    >
      {cursorLabel && <span style={{ pointerEvents: 'none' }}>{cursorLabel}</span>}
    </div>
  );
};
