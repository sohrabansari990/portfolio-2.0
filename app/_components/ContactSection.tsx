'use client';

import React, { useEffect, useRef, useState } from 'react';
import { GENERAL_INFO } from '@/lib/data';
import { Mail, Star, GitFork } from 'lucide-react';
import SectionTitle from '@/components/SectionTitle';

// Simple easing functions to replace easing-utils
const easing = {
  inExpo: (t: number) => (t === 0 ? 0 : Math.pow(2, 10 * t - 10)),
  outCubic: (t: number) => 1 - Math.pow(1 - t, 3),
  linear: (t: number) => t,
};

interface RepoStats {
  stargazers_count: number;
  forks_count: number;
}

const ContactSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const [stats, setStats] = useState<RepoStats>({ stargazers_count: 0, forks_count: 0 });

  useEffect(() => {
    // Fetch repo stats
    fetch('https://api.github.com/repos/sohrabansari990/portfolio-2.0')
      .then(res => res.json())
      .then(data => {
        setStats({
          stargazers_count: data.stargazers_count ?? 0,
          forks_count: data.forks_count ?? 0
        });
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !badgeRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let discs: any[] = [];
    let lines: any[] = [];
    let particles: any[] = [];
    const render = { width: 0, height: 0, dpi: 1 };
    let startDisc = { x: 0, y: 0, w: 0, h: 0 };
    let endDisc = { x: 0, y: 0, w: 0, h: 0 };

    const setSize = () => {
      const rect = containerRef.current!.getBoundingClientRect();
      render.width = rect.width;
      render.height = rect.height;
      render.dpi = window.devicePixelRatio || 1;
      canvas.width = render.width * render.dpi;
      canvas.height = render.height * render.dpi;
    };

    const tweenValue = (start: number, end: number, p: number, easeName: keyof typeof easing = 'linear') => {
      const delta = end - start;
      const easeFn = easing[easeName] || easing.linear;
      return start + delta * easeFn(p);
    };

    const tweenDisc = (disc: any) => {
      disc.x = tweenValue(startDisc.x, endDisc.x, disc.p);
      disc.y = tweenValue(startDisc.y, endDisc.y, disc.p, 'inExpo');
      disc.w = tweenValue(startDisc.w, endDisc.w, disc.p, 'outCubic');
      disc.h = tweenValue(startDisc.h, endDisc.h, disc.p, 'outCubic');
      return disc;
    };

    const setDiscs = () => {
      const rect = containerRef.current!.getBoundingClientRect();
      const badgeRect = badgeRef.current!.getBoundingClientRect();
      const { width, height } = rect;
      const diag = Math.hypot(width, height);

      startDisc = { x: width * 0.5, y: height * 0.5, w: diag * 0.5, h: diag * 0.5 };
      endDisc = { x: width * 0.5, y: height * 0.5, w: badgeRect.width * 0.5, h: badgeRect.height * 0.5 };

      discs = [];
      for (let i = 0; i < 20; i++) {
        discs.push(tweenDisc({ p: i / 20 }));
      }
    };

    const setLines = () => {
      const { width, height } = containerRef.current!.getBoundingClientRect();
      lines = [];
      const totalLines = 100;
      const linesAngle = (Math.PI * 2) / totalLines;
      for (let i = 0; i < totalLines; i++) {
        const angle = (i * linesAngle + performance.now() * 0.0001) % (Math.PI * 2);
        const p0 = { x: width * 0.5 + Math.cos(angle) * startDisc.w, y: height * 0.5 + Math.sin(angle) * startDisc.h };
        const p1 = { x: width * 0.5 + Math.cos(angle) * endDisc.w, y: height * 0.5 + Math.sin(angle) * endDisc.h };
        lines.push({ p0, p1, l: { x: p1.x - p0.x, y: p1.y - p0.y } });
      }
    };

    const setParticles = () => {
      particles = [];
      for (let i = 0; i < 500; i++) {
        particles.push({
          lineIndex: Math.floor(Math.random() * 100),
          p: Math.random(),
          v: 0.005 + Math.random() * 0.005,
          l: 0.01 + Math.random() * 0.1,
          a: 0.05 + Math.random() * 0.15,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(render.dpi, render.dpi);

      ctx.strokeStyle = 'rgba(128, 128, 128, 0.1)';
      ctx.lineWidth = 1;
      discs.forEach((disc) => {
        disc.p = (disc.p + 0.001) % 1;
        tweenDisc(disc);
        ctx.beginPath();
        ctx.ellipse(disc.x, disc.y, disc.w, disc.h, 0, 0, Math.PI * 2);
        ctx.stroke();
      });

      setLines();
      particles.forEach((particle) => {
        if (particle.p < 1) particle.p += particle.v;
        else particle.p = 0;
        const line = lines[particle.lineIndex];
        if (!line) return;
        const start = { x: line.p0.x + line.l.x * particle.p, y: line.p0.y + line.l.y * particle.p };
        const p1 = { x: start.x + line.l.x * particle.l, y: start.y + line.l.y * particle.l };
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.strokeStyle = `rgba(0, 119, 255, ${particle.a})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      ctx.restore();
      requestAnimationFrame(draw);
    };

    setSize();
    setDiscs();
    setLines();
    setParticles();
    draw();

    const handleResize = () => {
      setSize();
      setDiscs();
      setLines();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="contact" className="relative w-full overflow-hidden bg-transparent pt-section">
      <div className="container relative z-30 mb-10">
        <SectionTitle title="Contact Me" />
      </div>

      <div className="relative h-screen w-full flex items-center justify-center">
        <div ref={containerRef} className="absolute inset-0 flex items-center justify-center">
          {/* Background Gradients */}
          <div className="absolute inset-0 z-[2] w-full h-full pointer-events-none" 
            style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 20%, var(--site-bg) 70%)' }} 
          />
          <div className="absolute inset-0 z-[5] w-full h-full pointer-events-none mix-blend-overlay opacity-40"
            style={{ background: 'radial-gradient(ellipse at 50% 50%, var(--primary) 0%, transparent 70%)' }}
          />

          <div className="aura absolute top-1/2 left-1/2 z-[3] -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] blur-[60px] opacity-40 pointer-events-none animate-aura-glow" 
            style={{
              background: `linear-gradient(20deg, #0077ff, rgba(0, 119, 255, 0.1) 16.5%, #00f8f1 33%, rgba(0, 248, 241, 0.1) 49.5%, #0077ff 66%, rgba(0, 119, 255, 0.1) 85.5%, #00f8f1 100%) 0 100% / 100% 200%`,
              mixBlendMode: 'plus-lighter'
            }}
          />

          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

          {/* The Badge/Button */}
          <div ref={badgeRef} className="contact-badge group relative z-10 w-64 h-64 rounded-full bg-black/80 border border-white/10 overflow-hidden cursor-pointer backdrop-blur-sm shadow-2xl transition-all duration-500 hover:scale-105 hover:border-primary/50">
            <a href={`mailto:${GENERAL_INFO.email}`} className="absolute inset-0 flex items-center justify-center text-center no-underline">
              <div className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ease-out group-hover:-translate-y-full group-hover:rotate-12 group-hover:opacity-0">
                 <div className="w-24 h-24 mb-4 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                    <Mail className="w-12 h-12 text-primary" />
                 </div>
                 <span className="text-sm uppercase tracking-widest text-muted-foreground font-anton">Get in Touch</span>
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center translate-y-full rotate-[-12deg] opacity-0 transition-all duration-700 ease-out group-hover:translate-y-0 group-hover:rotate-0 group-hover:opacity-100">
                 <span className="text-3xl font-anton uppercase text-primary mb-2">Email Me</span>
                 <span className="text-[10px] text-white/40 tracking-[0.3em] uppercase">{GENERAL_INFO.email}</span>
                 <div className="mt-4 px-6 py-2 bg-primary/10 border border-primary/30 rounded-full text-xs font-bold text-primary hover:bg-primary/20 transition-colors">
                   SEND MESSAGE
                 </div>
              </div>
            </a>
          </div>

          {/* Embedded Footer Info */}
          <div className="absolute bottom-10 left-0 w-full z-20 text-center px-4">
            <a
              href="https://github.com/sohrabansari990/portfolio-2.0"
              target="_blank"
              className="group inline-block leading-none text-muted-foreground/60 hover:text-primary transition-all duration-300"
            >
              <span className="text-sm font-medium">Designed & Built by Sohrab Alefi</span>
              <div className="flex items-center justify-center gap-6 pt-3 opacity-60 group-hover:opacity-100 transition-opacity">
                <span className="flex items-center gap-2 text-xs">
                  <Star size={14} className="text-primary" /> {stats.stargazers_count}
                </span>
                <span className="flex items-center gap-2 text-xs">
                  <GitFork size={14} className="text-primary" /> {stats.forks_count}
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
