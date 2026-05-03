'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React from 'react';
import Image from 'next/image';
import Button from '@/components/Button';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const AboutMe = () => {
    const container = React.useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    id: 'about-me-in',
                    trigger: container.current,
                    start: 'top 70%',
                    end: 'bottom bottom',
                    scrub: 0.5,
                },
            });

            tl.from('.slide-up-and-fade', {
                y: 100,
                opacity: 0,
                stagger: 0.1,
            });
        },
        { scope: container },
    );

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    id: 'about-me-out',
                    trigger: container.current,
                    start: 'bottom 50%',
                    end: 'bottom 10%',
                    scrub: 0.5,
                },
            });

            tl.to('.slide-up-and-fade', {
                y: -100,
                opacity: 0,
                stagger: 0.05,
            });
        },
        { scope: container },
    );

    return (
        <section className="pb-section pt-10" id="about-me">
            <div className="container" ref={container}>
                <h2 className="text-4xl md:text-6xl font-thin mb-20 slide-up-and-fade leading-tight">
                    I care about software that feels direct, useful, and
                    grounded in real work, whether I am teaching, automating a
                    workflow, or building a startup product.
                </h2>

                <p className="pb-3 border-b border-primary/20 text-muted-foreground slide-up-and-fade flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    This is me.
                </p>

                <div className="grid md:grid-cols-12 mt-16 gap-12 lg:gap-20 items-start">
                    {/* Left Side: Image */}
                    <div className="md:col-span-5 slide-up-and-fade">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative aspect-square overflow-hidden rounded-3xl bg-card border border-white/5">
                                <Image 
                                    src="/sohrab alefi.png" 
                                    alt="Sohrab Alefi" 
                                    fill
                                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                                    sizes="(max-width: 768px) 100vw, 40vw"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Text Content */}
                    <div className="md:col-span-7 flex flex-col justify-center h-full">
                        <div className="max-w-[550px]">
                            <h3 className="text-4xl md:text-6xl font-anton uppercase text-foreground mb-8 slide-up-and-fade tracking-tight">
                                Hi, I&apos;m <span className="text-primary">Sohrab Alefi.</span>
                            </h3>
                            
                            <div className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
                                <p className="slide-up-and-fade">
                                    I&apos;m a full-stack developer and IT
                                    instructor with more than 2.5 years of
                                    teaching experience, plus hands-on freelance
                                    work in AI automation.
                                </p>
                                <p className="slide-up-and-fade">
                                    I co-founded and built Saqib.watch, and I like
                                    working where product thinking, technical
                                    execution, and practical problem solving meet.
                                    The goal is simple: build systems people can
                                    actually use.
                                </p>
                            </div>
                            <div className="mt-8 slide-up-and-fade">
                                <Button as="link" href="/Sohrab_Alefi_Resume.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-black">
                                    Download Resume
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;
