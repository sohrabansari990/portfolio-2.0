'use client';
import ArrowAnimation from '@/components/ArrowAnimation';
import Button from '@/components/Button';
import { GENERAL_INFO } from '@/lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ─── Particle Class for Tear Effect ──────────────────────────────────────────
class Particle {
    x: number;
    y: number;
    size: number;
    p: number;
    offsetX: number;
    offsetY: number;
    kill: () => void;

    constructor(
        x: number,
        y: number,
        size: number,
        mouseA: number,
        smoothDiff: number,
        particles: Particle[]
    ) {
        this.size = size;
        this.x = x;
        this.y = y;
        this.p = 0;

        const perpendicular = mouseA + Math.PI / 2;
        // Dist controls how wide the blob expands
        const dist = Math.max(window.innerWidth * 0.0075, smoothDiff);
        this.offsetX = dist * Math.cos(perpendicular);
        this.offsetY = dist * Math.sin(perpendicular);

        this.kill = () => {
            const idx = particles.indexOf(this);
            if (idx > -1) particles.splice(idx, 1);
        };

        const tl = gsap.timeline();
        tl.to(this, { p: 1, ease: 'power1.inOut', duration: 2 });
        tl.to(this, { p: 0, ease: 'power4.in', duration: 4 }, 1.5);
        tl.call(this.kill);
    }

    position(direction = -1) {
        return {
            x: this.x + this.offsetX * direction * this.p,
            y: this.y + this.offsetY * direction * this.p,
        };
    }
}

// ─── Tear Hook ───────────────────────────────────────────────────────────────
function useTearHover(sceneRef: React.RefObject<HTMLElement | null>) {
    useEffect(() => {
        if (!sceneRef.current) return;
        const scene = sceneRef.current;

        const mouse = {
            x: 0,
            y: 0,
            smoothX: 0,
            smoothY: 0,
            diff: 0,
            smoothDiff: 0,
            a: 0,
        };
        const particles: Particle[] = [];
        let animationFrameId: number;
        let hasMoved = false;

        const onMouseMove = (e: MouseEvent) => {
            const rect = scene.getBoundingClientRect();
            const clientX = e.clientX - rect.left;
            const clientY = e.clientY - rect.top;
            
            if (!hasMoved) {
                mouse.x = clientX;
                mouse.y = clientY;
                mouse.smoothX = clientX;
                mouse.smoothY = clientY;
                hasMoved = true;
            } else {
                mouse.x = clientX;
                mouse.y = clientY;
            }
        };
        window.addEventListener('mousemove', onMouseMove);

        const emitParticle = () => {
            if (!hasMoved) return;
            
            let x = 0;
            let y = 0;
            let size = 0;

            if (mouse.diff > 0.01) {
                x = mouse.smoothX;
                y = mouse.smoothY;
                size = mouse.diff * 0.2;
            }
            if (size > 0) {
                particles.push(
                    new Particle(x, y, size, mouse.a, mouse.smoothDiff, particles)
                );
            }
        };

        const drawPath = () => {
            let d = '';

            if (particles.length === 0) {
                scene.style.clipPath = `circle(0px at 0 0)`;
                return;
            }

            particles.forEach((particle, i) => {
                const cmd = i === 0 ? 'M' : 'L';
                const p1 = particle.position(-1);
                const particle2 = particles[i + 1] || particles[particles.length - 1];
                const p2 = particle2.position(-1);

                if (i > 0) {
                    d += `Q ${p1.x} ${p1.y} ${(p1.x + p2.x) / 2} ${(p1.y + p2.y) / 2} `;
                } else {
                    d += `${cmd} ${p1.x} ${p1.y} `;
                }
            });

            for (let i = particles.length - 1; i >= 0; i--) {
                const particle = particles[i];
                const p1 = particle.position(1);
                const particle2 = particles[i - 1] || particles[0];
                const p2 = particle2.position(1);

                d += `Q ${p1.x} ${p1.y} ${(p1.x + p2.x) / 2} ${(p1.y + p2.y) / 2} `;
            }

            scene.style.clipPath = `path('${d}')`;
        };

        const render = () => {
            mouse.smoothX += (mouse.x - mouse.smoothX) * 0.1;
            mouse.smoothY += (mouse.y - mouse.smoothY) * 0.1;

            const dx = mouse.x - mouse.smoothX;
            const dy = mouse.y - mouse.smoothY;

            mouse.diff = Math.hypot(dx, dy);
            mouse.smoothDiff += (mouse.diff - mouse.smoothDiff) * 0.1;

            if (mouse.diff > 0.1) {
                mouse.a = Math.atan2(dy, dx);
            }

            emitParticle();
            drawPath();

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);
}

// ─── Reusable Content Component ──────────────────────────────────────────────
const BannerContent = ({ isTear }: { isTear?: boolean }) => {
    return (
        <div className="container relative h-full w-full flex justify-between items-center gap-10 max-md:flex-col max-md:justify-center">
            <div className="max-md:grow max-md:flex flex-col justify-center items-start max-w-[760px] md:pt-10">
                <p
                    className={cn(
                        'slide-up-and-fade mb-5 font-mono text-xs uppercase tracking-[0.35em]',
                        isTear ? 'text-primary' : 'text-primary'
                    )}
                >
                    AI Automation / Web Platforms / Startup Systems
                </p>
                <h1 className="banner-title slide-up-and-fade leading-[.82] text-[20vw] sm:text-[150px] lg:text-[190px] font-anton uppercase tracking-normal">
                    <span
                        className={cn(
                            'hero-word block transition-colors duration-500',
                            isTear ? 'text-background' : 'text-foreground'
                        )}
                    >
                        Build
                    </span>
                    <span
                        className={cn(
                            'hero-word ml-[0.08em] block transition-colors duration-500',
                            isTear ? 'text-background' : 'text-primary'
                        )}
                    >
                        Useful
                    </span>
                    <span
                        className={cn(
                            'hero-word block transition-colors duration-500',
                            isTear ? 'text-primary' : 'text-foreground'
                        )}
                    >
                        Systems
                    </span>
                </h1>
                <p
                    className={cn(
                        'banner-description slide-up-and-fade mt-7 max-w-[620px] text-lg',
                        isTear ? 'text-background/80' : 'text-muted-foreground'
                    )}
                >
                    Hi! I&apos;m <span className="font-medium">Sohrab Alefi</span>. I build
                    full-stack products, AI automations, and practical digital systems shaped
                    by teaching, freelancing, and startup work.
                </p>
                <Button
                    as="link"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`mailto:${GENERAL_INFO.email}?subject=${encodeURIComponent(
                        GENERAL_INFO.emailSubject
                    )}&body=${encodeURIComponent(GENERAL_INFO.emailBody)}`}
                    variant="primary"
                    className="mt-9 banner-button slide-up-and-fade hover:text-black"
                    style={isTear ? { pointerEvents: 'none' } : undefined}
                    tabIndex={isTear ? -1 : 0}
                >
                    Let&apos;s Talk
                </Button>

                <div className="flex items-center gap-3 mt-5 slide-up-and-fade">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                    </span>
                    <span
                        className={cn(
                            'text-sm',
                            isTear ? 'text-background/70' : 'text-muted-foreground'
                        )}
                    >
                        Available for AI automation and product builds
                    </span>
                </div>
            </div>

            <div className="md:absolute md:bottom-4 lg:bottom-[5%] right-[4%] flex md:flex-col gap-4 md:gap-8 text-center md:text-right">
                <div className="slide-up-and-fade">
                    <h5 className="text-3xl sm:text-4xl font-anton text-primary mb-1.5">
                        2.5+
                    </h5>
                    <p className={cn(isTear ? 'text-background/70' : 'text-muted-foreground')}>
                        Years IT Instructor
                    </p>
                </div>
                <div className="slide-up-and-fade">
                    <h5 className="text-3xl sm:text-4xl font-anton text-primary mb-1.5">
                        AI
                    </h5>
                    <p className={cn(isTear ? 'text-background/70' : 'text-muted-foreground')}>
                        Automation Freelancer
                    </p>
                </div>
                <div className="slide-up-and-fade">
                    <h5 className="text-3xl sm:text-4xl font-anton text-primary mb-1.5">
                        01
                    </h5>
                    <p className={cn(isTear ? 'text-background/70' : 'text-muted-foreground')}>
                        Startup Co-Founder
                    </p>
                </div>
            </div>
        </div>
    );
};

// ─── Main Banner Component ───────────────────────────────────────────────────
const Banner = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<HTMLDivElement>(null);

    // Apply the tear logic to the overlay scene
    useTearHover(sceneRef);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'bottom 70%',
                    end: 'bottom 10%',
                    scrub: 1,
                },
            });

            tl.fromTo(
                '.slide-up-and-fade',
                { y: 0 },
                { y: -150, opacity: 0, stagger: 0.01 }
            );
        },
        { scope: containerRef }
    );

    return (
        <section
            className="group/hero relative overflow-hidden h-[100svh] min-h-[650px] pt-24 lg:pt-28 pb-10"
            id="banner"
            ref={containerRef}
        >
            <ArrowAnimation />

            {/* Base Layer */}
            <BannerContent isTear={false} />

            {/* Tear Layer (Hover Overlay) */}
            <div
                ref={sceneRef}
                className="absolute inset-0 z-10 pointer-events-none bg-foreground text-background"
                style={{ clipPath: 'circle(0px at 0 0)' }}
                aria-hidden="true"
            >
                {/* Keep padding perfectly aligned with the parent section */}
                <div className="pt-24 lg:pt-28 pb-10 h-full w-full absolute inset-0">
                    <BannerContent isTear={true} />
                </div>
            </div>
        </section>
    );
};

export default Banner;
