'use client';
import SectionTitle from '@/components/SectionTitle';
import React, { useRef } from 'react';
import IconCloud from '@/components/IconCloud';

const Skills = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <section id="my-stack" ref={containerRef} className="py-20 overflow-hidden">
            <div className="container relative">
                <SectionTitle title="My Skills" />
                
                <div className="flex justify-center items-center mt-10">
                    <div className="w-full max-w-[800px]">
                        <IconCloud />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
