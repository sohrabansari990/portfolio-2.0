'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { CSSProperties, useRef } from 'react';

gsap.registerPlugin(useGSAP);

const ParticleBackground = () => {
    const backgroundRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const background = backgroundRef.current;

        if (!background) return;

        const handleMouseMove = (event: MouseEvent) => {
            gsap.to(background, {
                '--mouse-x': `${event.clientX}px`,
                '--mouse-y': `${event.clientY}px`,
                '--spot-opacity': 1,
                duration: 0.45,
                ease: 'power3.out',
            });
        };

        const handleMouseLeave = () => {
            gsap.to(background, {
                '--spot-opacity': 0,
                duration: 0.6,
                ease: 'power2.out',
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div
            ref={backgroundRef}
            className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[var(--site-bg)] transition-colors duration-300"
            style={
                {
                    '--mouse-x': '50vw',
                    '--mouse-y': '50vh',
                    '--spot-opacity': 0,
                } as CSSProperties
            }
        >
            <div
                className="absolute inset-0 opacity-50 transition-opacity duration-300"
                style={{
                    backgroundImage:
                        'radial-gradient(circle, var(--dot-color) 1px, transparent 1.6px)',
                    backgroundSize: '32px 32px',
                }}
            />
            {/* Masked highlight dots */}
            <div
                className="absolute inset-0 transition-opacity duration-300"
                style={{
                    backgroundImage:
                        'radial-gradient(circle, var(--dot-bright-color) 1.2px, transparent 1.8px)',
                    backgroundSize: '32px 32px',
                    WebkitMaskImage: 'radial-gradient(180px circle at var(--mouse-x) var(--mouse-y), black 10%, transparent 70%)',
                    maskImage: 'radial-gradient(180px circle at var(--mouse-x) var(--mouse-y), black 10%, transparent 70%)',
                    opacity: 'var(--spot-opacity)',
                }}
            />
            {/* Subtle glow */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        'radial-gradient(300px circle at var(--mouse-x) var(--mouse-y), var(--spot-color-1), var(--spot-color-2) 40%, transparent 80%)',
                    opacity: 'var(--spot-opacity)',
                }}
            />
            <div
                className="absolute inset-0 transition-opacity duration-300"
                style={{
                    background:
                        'linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.2))',
                    opacity: 'var(--high-contrast-overlay-opacity, 1)',
                }}
            />
        </div>
    );
};

export default ParticleBackground;
