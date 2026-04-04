'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function MagneticCard({ children, className = '' }: MagneticCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        scale: isHovered ? 1.02 : 1,
      }}
      transition={{
        scale: {
          duration: 0.3,
          ease: 'easeOut',
        },
      }}
      className={`relative rounded-2xl ${className}`}
    >
      {children}
    </motion.div>
  );
}
