import type { Metadata } from 'next';
import { Anton, Roboto_Flex } from 'next/font/google';
import { ReactLenis } from 'lenis/react';

import 'lenis/dist/lenis.css';
import './globals.css';
import ScrollProgressIndicator from '@/components/ScrollProgressIndicator';
import ParticleBackground from '@/components/ParticleBackground';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import Preloader from '../components/Preloader';
import StickyEmail from './_components/StickyEmail';
import JsonLd from '@/components/JsonLd';

const antonFont = Anton({
    weight: '400',
    style: 'normal',
    subsets: ['latin'],
    variable: '--font-anton',
});

const robotoFlex = Roboto_Flex({
    weight: ['100', '400', '500', '600', '700', '800'],
    style: 'normal',
    subsets: ['latin'],
    variable: '--font-roboto-flex',
});

export const metadata: Metadata = {
    metadataBase: new URL('https://sohrabalefi.me'),
    title: 'Sohrab Alefi | Full-Stack Developer & IT Instructor',
    description:
        'Official portfolio of Sohrab Alefi (also known as Sohrab Ansari). Full-stack developer, IT instructor with 2.5+ years of experience, AI automation expert, and startup co-founder.',
    keywords: [
        'Sohrab Alefi',
        'Sohrab Ansari',
        'Sohrab',
        'Full Stack Developer',
        'IT Instructor',
        'AI Automation',
        'Saqib.watch',
        'Web Development',
        'Next.js Developer',
        'Software Engineer',
    ],
    authors: [{ name: 'Sohrab Alefi' }],
    creator: 'Sohrab Alefi',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://sohrabalefi.me',
        title: 'Sohrab Alefi | Full-Stack Developer & IT Instructor',
        description: 'Portfolio of Sohrab Alefi - Building systems people can actually use.',
        siteName: 'Sohrab Alefi Portfolio',
        images: [
            {
                url: '/sohrab alefi.png',
                width: 1200,
                height: 630,
                alt: 'Sohrab Alefi Portfolio',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Sohrab Alefi | Full-Stack Developer & IT Instructor',
        description: 'Portfolio of Sohrab Alefi - Building systems people can actually use.',
        images: ['/sohrab alefi.png'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    manifest: '/manifest.json',
    icons: {
        icon: '/sohrab alefi logo.png',
        apple: '/sohrab alefi logo.png',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${antonFont.variable} ${robotoFlex.variable} antialiased`}
            >
                <ReactLenis
                    root
                    options={{
                        lerp: 0.1,
                        duration: 1.4,
                    }}
                >
                    {/* <a
                        href="https://forms.gle/t73XYJgWD5cJNr6e8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 block bg-black text-center z-[1] text-sm py-2 hover:text-primary transition-all"
                    >
                        Frontend dev? I&apos;ll help you polish your resume —
                        completely free.
                    </a> */}
                    <Navbar />
                    <main className="relative z-[1]">{children}</main>

                    <CustomCursor />
                    <Preloader />
                    <ScrollProgressIndicator />
                    <ParticleBackground />
                    <StickyEmail />
                    <JsonLd />
                </ReactLenis>
            </body>
        </html>
    );
}
