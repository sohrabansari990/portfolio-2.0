'use client';
import SectionTitle from '@/components/SectionTitle';
import { CERTIFICATES } from '@/lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import Image from 'next/image';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Certificates = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                    end: 'bottom 80%',
                    scrub: 0.5,
                },
            });

            tl.from('.certificate-item', {
                y: 70,
                opacity: 0,
                stagger: 0.18,
                ease: 'none',
            });
        },
        { scope: containerRef },
    );

    return (
        <section className="py-section" id="certificates" ref={containerRef}>
            <div className="container">
                <SectionTitle title="Certificates" />

                <div className="grid md:grid-cols-3">
                    {CERTIFICATES.map((certificate) => (
                        <a
                            href={certificate.image}
                            target="_blank"
                            rel="noreferrer"
                            className="certificate-item group block overflow-hidden border border-border bg-black/25 transition-colors hover:border-primary"
                            key={certificate.title}
                        >
                            <div className="relative aspect-[4/3] overflow-hidden bg-black">
                                <Image
                                    src={certificate.image}
                                    alt={certificate.title}
                                    fill
                                    sizes="(min-width: 768px) 33vw, 100vw"
                                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-5">
                                <p className="text-sm uppercase tracking-[0.25em] text-primary">
                                    {certificate.issuer}
                                </p>
                                <h3 className="mt-2 text-3xl font-anton">
                                    {certificate.title}
                                </h3>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certificates;
