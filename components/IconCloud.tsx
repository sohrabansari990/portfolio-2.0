'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Cloud, ICloud } from 'react-icon-cloud';
import { MY_STACK } from '@/lib/data';
import gsap from 'gsap';

const cloudProps: Omit<ICloud, 'children'> = {
  containerProps: {
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },
  },
  options: {
    reverse: false,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: 'default',
    tooltip: 'native',
    initial: [-0.03, 0], // Slower default rotation
    maxSpeed: 0.02,
    minSpeed: 0.01,
    dragControl: true,
    clickToFront: 500,
    outlineColour: '#0000',
    radiusX: 1,
    radiusY: 1,
    radiusZ: 1,
    stretchX: 1,
    stretchY: 1,
  },
};

const IconCloud = () => {
  const [icons, setIcons] = useState<React.ReactNode[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const allIcons = Object.values(MY_STACK).flat();
    
    const iconElements = allIcons.map((item, index) => (
      <a 
        key={index} 
        href="#" 
        onClick={(e) => e.preventDefault()}
      >
        <img
          src={item.icon}
          alt={item.name}
          width={45}
          height={45}
          style={{ 
            objectFit: 'contain',
            filter: 'drop-shadow(0 0 5px rgba(0,119,255,0.3))' 
          }}
        />
      </a>
    ));

    setIcons(iconElements);
  }, []);

  // Sync background rotation with mouse movement for "group mode" feel
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !svgRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(svgRef.current, {
        rotateY: x * 30,
        rotateX: -y * 30,
        duration: 0.5,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="relative flex h-[600px] w-full items-center justify-center overflow-hidden">
      {/* High-Density Geodesic Wireframe Sphere */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <svg 
          ref={svgRef}
          viewBox="0 0 100 100" 
          className="w-[500px] h-[500px] fill-none stroke-[0.05px] animate-[spin_180s_linear_infinite]"
          style={{ 
            stroke: 'currentColor',
            color: 'var(--foreground)', // Theme aware color (black in light mode)
            perspective: '1000px'
          }}
        >
          {/* Detailed Latitude/Longitude Mesh */}
          {[...Array(15)].map((_, i) => (
            <React.Fragment key={i}>
              <ellipse 
                cx="50" cy="50" 
                rx="49" ry={49 * Math.sin((i * Math.PI) / 15)} 
                className="opacity-40"
              />
              <ellipse 
                cx="50" cy="50" 
                rx={49 * Math.sin((i * Math.PI) / 15)} ry="49" 
                className="opacity-40"
              />
            </React.Fragment>
          ))}
          
          {/* Triangular facet lines for the "Geodesic" look */}
          <path d="M50 1 L85 25 L99 50 L85 75 L50 99 L15 75 L1 50 L15 25 Z" className="opacity-60" />
          <path d="M50 1 L15 25 L1 50 L15 75 L50 99 L85 75 L99 50 L85 25 Z" className="opacity-60" />
          
          {/* Cross triangulation */}
          <path d="M1 50 L99 50 M50 1 L50 99" className="opacity-30" />
          <path d="M15 25 L85 75 M15 75 L85 25" className="opacity-30" />
        </svg>
      </div>
      
      {/* Inner atmospheric glow */}
      <div 
        className="absolute w-[450px] h-[450px] rounded-full pointer-events-none blur-[100px] opacity-20"
        style={{ background: 'radial-gradient(circle, var(--dot-bright-color, #0077ff) 0%, transparent 70%)' }}
      />
      
      {/* The interactive Cloud */}
      <div className="z-10 w-full h-full flex items-center justify-center">
        <Cloud {...cloudProps}>
          {icons}
        </Cloud>
      </div>
    </div>
  );
};

export default IconCloud;
