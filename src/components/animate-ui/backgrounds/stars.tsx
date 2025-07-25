'use client';

import * as React from 'react';
import {
  type HTMLMotionProps,
  motion,
  type SpringOptions,
  type Transition,
  useMotionValue,
  useSpring,
} from 'motion/react';

import { cn } from '@/lib/utils';

/* ──────────────────────────────  STAR LAYER  ────────────────────────────── */

type StarLayerProps = HTMLMotionProps<'div'> & {
  count: number;
  size: number;
  transition: Transition;
  starColor: string;
};

function generateStars(count: number, starColor: string) {
  const shadows: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 4000) - 2000;
    const y = Math.floor(Math.random() * 4000) - 2000;
    shadows.push(`${x}px ${y}px ${starColor}`);
  }
  return shadows.join(', ');
}

function StarLayer({
  count = 1000,
  size = 1,
  transition = { repeat: Infinity, duration: 50, ease: 'linear' },
  starColor = '#fff',
  className,
  ...props
}: StarLayerProps) {
  const [boxShadow, setBoxShadow] = React.useState<string>('');

  React.useEffect(() => {
    setBoxShadow(generateStars(count, starColor));
  }, [count, starColor]);

  return (
    <motion.div
      data-slot="star-layer"
      animate={{ y: [0, -2000] }}
      transition={transition}
      className={cn('absolute top-0 left-0 w-full h-[2000px]', className)}
      {...props}
    >
      {/* First column of stars */}
      <div
        className="absolute bg-transparent rounded-full"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          boxShadow,
        }}
      />
      {/* Duplicate column so we can scroll seamlessly */}
      <div
        className="absolute bg-transparent rounded-full top-[2000px]"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          boxShadow,
        }}
      />
    </motion.div>
  );
}

/* ─────────────────────────────  STARRY BACKGROUND  ─────────────────────────── */

type StarsBackgroundProps = React.ComponentProps<'div'> & {
  factor?: number;
  speed?: number;
  transition?: SpringOptions;
  starColor?: string;
  pointerEvents?: boolean;
};

function StarsBackground({
  children,
  className,
  factor = 0.05,
  speed = 50,
  transition = { stiffness: 50, damping: 20 },
  starColor = '#fff',
  pointerEvents = false,
  ...props
}: StarsBackgroundProps) {
  const offsetX = useMotionValue(1);
  const offsetY = useMotionValue(1);

  const springX = useSpring(offsetX, transition);
  const springY = useSpring(offsetY, transition);

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const centreX = window.innerWidth / 2;
      const centreY = window.innerHeight / 2;
      const newOffsetX = -(e.clientX - centreX) * factor;
      const newOffsetY = -(e.clientY - centreY) * factor;
      offsetX.set(newOffsetX);
      offsetY.set(newOffsetY);
    },
    [offsetX, offsetY, factor],
  );

  return (
    <div
      data-slot="stars-background"
      className={cn(
        /* Transparent so the hero‑section video shows through */
        'relative size-full overflow-hidden bg-transparent',
        /* If you prefer a subtle glow instead, replace the line above with:
         * bg-[radial-gradient(ellipse_at_bottom,_rgba(255,255,255,0.06)_0%,_rgba(0,0,0,0)_100%)]
         */
        className,
      )}
      onMouseMove={handleMouseMove}
      {...props}
    >
      <motion.div
        style={{ x: springX, y: springY }}
        className={cn({ 'pointer-events-none': !pointerEvents })}
      >
        {/* Smallest, fastest stars */}
        <StarLayer
          count={750}
          size={1}
          transition={{ repeat: Infinity, duration: speed, ease: 'linear' }}
          starColor={starColor}
        />
        {/* Medium stars */}
        <StarLayer
          count={200}
          size={2}
          transition={{ repeat: Infinity, duration: speed * 2, ease: 'linear' }}
          starColor={starColor}
        />
        {/* Largest, slowest stars */}
        <StarLayer
          count={100}
          size={3}
          transition={{ repeat: Infinity, duration: speed * 3, ease: 'linear' }}
          starColor={starColor}
        />
      </motion.div>

      {/* Anything inside <StarsBackground> renders above the stars */}
      {children}
    </div>
  );
}

export {
  StarLayer,
  StarsBackground,
  type StarLayerProps,
  type StarsBackgroundProps,
};
