'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface FloatingCirclesProps {
  clickable?: boolean;
}

const FloatingCircles = ({ clickable }: FloatingCirclesProps) => {
  const pathname = usePathname();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [clickedCircles, setClickedCircles] = useState<Set<number>>(new Set());
  const [catAssignments, setCatAssignments] = useState<Map<number, string>>(new Map());
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Only clickable on the main page (/) or when explicitly set to true
  const isClickable = clickable !== undefined ? clickable : pathname === '/';

  // List of cat pictures - add your cat image filenames here
  const catPictures = [
    '/cats/cat1.jpeg',
    '/cats/cat2.jpeg', 
    '/cats/cat3.jpeg',
    '/cats/cat4.jpeg',
    '/cats/cat5.jpeg',
    '/cats/cat6.jpeg',
    '/cats/cat7.jpeg',
    '/cats/cat8.jpeg',
    '/cats/cat9.jpeg',
    '/cats/cat10.jpeg',
    '/cats/cat11.jpeg',
    '/cats/cat12.jpeg',
    '/cats/cat13.jpeg',
  ];


  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const newPosition = {
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        };
        setMousePosition(newPosition);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Minimum size for circles to ensure cats are visible
  const MIN_CIRCLE_SIZE = 40;
  
  // Generate random circles with constraints
  const generateRandomCircles = () => {
    const sizeCategories = [
      { min: 100, max: 150, count: 3, opacityRange: [0.02, 0.04], speedRange: [0.22, 0.26] }, // Large
      { min: 60, max: 90, count: 4, opacityRange: [0.06, 0.08], speedRange: [0.3, 0.5] }, // Medium
      { min: 40, max: 50, count: 4, opacityRange: [0.09, 0.12], speedRange: [0.55, 0.7] }, // Small
      { min: 20, max: 35, count: 5, opacityRange: [0.13, 0.16], speedRange: [0.75, 0.85] }, // Tiny
    ];
    
    const colors = ['var(--primary-light)', 'var(--primary-dark)'];
    const circles: Array<{size: number, opacity: number, speed: number, color: string, x: number, y: number}> = [];
    const usedPositions = new Set();
    
    sizeCategories.forEach((category, categoryIndex) => {
      for (let i = 0; i < category.count; i++) {
        let x, y, attempts = 0;
        do {
          // Large circles (first category) should be on the left side
          // Other circles can be anywhere in the left 70%
          const isLargeCircle = categoryIndex === 0 && pathname === '/'; // First category is large circles
          const maxX = isLargeCircle ? 50 : 70; // Large circles in left 50%, others in left 70%
          const minX = 10; // 10% margin from left edge
          
          // For large circles, position them more towards the top on mobile
          // On mobile, photo is below text, so keep large circles in top half
          const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024; // lg breakpoint
          const maxY = isLargeCircle && isMobile ? 50 : 80; // Large circles in top 50% on mobile, 80% on desktop
          const minY = 10; // 10% margin from top
          
          x = Math.random() * (maxX - minX) + minX; // Random x within the allowed range
          y = Math.random() * (maxY - minY) + minY; // Random y within the allowed range
          attempts++;
        } while (attempts < 50 && usedPositions.has(`${Math.floor(x/10)}-${Math.floor(y/10)}`));
        
        usedPositions.add(`${Math.floor(x/10)}-${Math.floor(y/10)}`);
        
        const size = Math.max(category.min + Math.random() * (category.max - category.min), MIN_CIRCLE_SIZE);
        const opacity = category.opacityRange[0] + Math.random() * (category.opacityRange[1] - category.opacityRange[0]);
        const speed = category.speedRange[0] + Math.random() * (category.speedRange[1] - category.speedRange[0]);
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        circles.push({ size, opacity, speed, color, x, y });
      }
    });
    
    return circles;
  };
  
  const [circles, setCircles] = useState<Array<{size: number, opacity: number, speed: number, color: string, x: number, y: number}>>([]);

  // Handle client-side rendering to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
    const newCircles = generateRandomCircles();
    setCircles(newCircles);
    
    // Assign cats to the largest circles
    if (isClickable) {
      const assignments = new Map<number, string>();
      const availableCats = [...catPictures];
      
      // Shuffle the available cats array
      for (let i = availableCats.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [availableCats[i], availableCats[j]] = [availableCats[j], availableCats[i]];
      }
      
      // Find the 3 largest circles
      const sortedCircles = newCircles
        .map((circle, index) => ({ ...circle, index }))
        .sort((a, b) => b.size - a.size)
        .slice(0, 3);
      
      const catsToAssign = Math.min(availableCats.length, sortedCircles.length);
      
      for (let i = 0; i < catsToAssign; i++) {
        assignments.set(sortedCircles[i].index, availableCats[i]);
      }
      
      setCatAssignments(assignments);
    }
  }, [isClickable]);

  const handleCircleClick = (index: number) => {
    if (!isClickable) return;
    
    // Check if this circle is one of the 3 largest
    const sortedCircles = circles
      .map((circle, idx) => ({ ...circle, index: idx }))
      .sort((a, b) => b.size - a.size)
      .slice(0, 3);
    
    const isClickableCircle = sortedCircles.some(circle => circle.index === index);
    if (!isClickableCircle) return;
    
    setClickedCircles(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const getCatPicture = (index: number) => {
    // Get the assigned cat picture for this circle
    return catAssignments.get(index) || catPictures[0]; // Fallback to first cat if not assigned
  };

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {isClient && circles.map((circle, index) => {
        const isClicked = clickedCircles.has(index);
        const catPicture = getCatPicture(index);
        
        // Check if this circle is one of the 3 largest
        const sortedCircles = circles
          .map((circle, idx) => ({ ...circle, index: idx }))
          .sort((a, b) => b.size - a.size)
          .slice(0, 3);
        const isClickableCircle = sortedCircles.some(c => c.index === index);
        
        return (
          <motion.div
            key={index}
            className={`absolute rounded-full transition-all duration-500 ${
              isClickable && isClickableCircle ? 'cursor-pointer pointer-events-auto' : 'pointer-events-none'
            } ${
              isClicked ? 'ring-4 ring-primary-light/50 shadow-2xl' : ''
            }`}
            style={{
              width: circle.size,
              height: circle.size,
              left: `${circle.x}%`,
              top: `${circle.y}%`,
              transform: `translate(${(mousePosition.x - 0.5) * circle.speed * 50}px, ${(mousePosition.y - 0.5) * circle.speed * 50}px) scale(${isClicked ? 1.1 : 1})`,
              transition: 'transform 0.1s ease-out',
            }}
            onClick={() => handleCircleClick(index)}
            whileHover={isClickable && isClickableCircle ? { scale: 1.05 } : {}}
            whileTap={isClickable && isClickableCircle ? { scale: 0.95 } : {}}
          >
            {isClickable && isClickableCircle && isClicked ? (
              // Show cat picture when clicked and clickable
              <div className="w-full h-full rounded-full overflow-hidden relative">
                <Image
                  src={catPicture}
                  alt={`Cat ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes={`${circle.size}px`}
                  onError={() => {
                    // Fallback to original circle if image fails to load
                    console.log(`Cat image ${catPicture} not found, using fallback`);
                  }}
                />
                {/* Overlay for better visibility */}
                <div className="absolute inset-0 bg-black/20 rounded-full"></div>
              </div>
            ) : (
              // Show original circle when not clicked or not clickable
              <div
                className="w-full h-full rounded-full"
                style={{
                  backgroundColor: circle.color,
                  opacity: circle.opacity,
                }}
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default FloatingCircles;