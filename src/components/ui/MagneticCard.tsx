'use client';

import React, { useRef, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface MagneticCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function MagneticCard({ children, className = '' }: MagneticCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Framer Motion shared values for mouse position
  const x = useSpring(0, { stiffness: 400, damping: 30 });
  const y = useSpring(0, { stiffness: 400, damping: 30 });

  // Map mouse position to rotation values (-10 to 10 degrees)
  const rotateX = useTransform(y, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-7, 7]);

  // Map mouse position to glare effect position
  const glareX = useTransform(x, [-0.5, 0.5], [100, 0]);
  const glareY = useTransform(y, [-0.5, 0.5], [100, 0]);
  const glareOpacity = useTransform(x, [-0.5, 0, 0.5], [0.15, 0, 0.15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5; // -0.5 to 0.5
    const yPct = mouseY / height - 0.5; // -0.5 to 0.5
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      animate={{
        // Continuous slow breathing animation if NOT hovered
        scale: isHovered ? 1.02 : [1, 1.01, 1],
      }}
      transition={{
        scale: {
          duration: isHovered ? 0.3 : 4,
          repeat: isHovered ? 0 : Infinity,
          ease: 'easeInOut',
        },
      }}
      className={`relative rounded-2xl focus-item ${className}`}
    >
      {/* Glare effect matching mouse position */}
      {isHovered && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-50 rounded-2xl"
          style={{
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.4) 0%, transparent 50%)`,
            opacity: glareOpacity,
            mixBlendMode: 'overlay',
          }}
        />
      )}
      {children}
    </motion.div>
  );
}
