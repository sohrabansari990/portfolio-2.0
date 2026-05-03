'use client';

import { cn } from '@/lib/utils';
import { useEffect, useRef, useState, useMemo } from 'react';
import { GENERAL_INFO, SOCIAL_LINKS } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { MoveUpRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Github from '@/components/icons/Github';
import Linkedin from '@/components/icons/Linkedin';

const COLORS = [
    'bg-yellow-500 text-black',
    'bg-blue-500 text-white',
    'bg-teal-500 text-black',
    'bg-indigo-500 text-white',
];

const MENU_LINKS = [
    { name: 'Home', url: '/' },
    { name: 'About Me', url: '/#about-me' },
    { name: 'Experience', url: '/#my-experience' },
    { name: 'Projects', url: '/#selected-projects' },
];

// ─── Console lines ────────────────────────────────────────────────────────────
const CONSOLE_LINES = [
    'LOADING…',
    'BUT WHY RUSH?',
    'CONFIGURING THE NEXT BIG THING',
    'ANIMATING PIXELS…',
    'BUILDING FROM PAKISTAN',
    'FOR GLOBAL TEAMS.',
    'SOMEWHAT PRECISELY',
    'AI AUTOMATION IN LOOP.',
];

const MAX_VISIBLE = 4; // how many lines are shown at once

// ─── Console hook: stacking lines that scroll up ─────────────────────────────
function useScrollingConsole(lines: string[]) {
    // committed lines (fully typed, staying visible)
    const [stack, setStack] = useState<string[]>([]);
    // currently-being-typed line
    const [current, setCurrent] = useState('');

    const lineIdx = useRef(0);
    const charIdx = useRef(0);
    const deleting = useRef(false);
    const pauseRef = useRef(0);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;

        const tick = () => {
            if (pauseRef.current > 0) {
                pauseRef.current--;
                timer = setTimeout(tick, 80);
                return;
            }

            const line = lines[lineIdx.current];

            if (!deleting.current) {
                // typing forward
                charIdx.current++;
                setCurrent(line.slice(0, charIdx.current));

                if (charIdx.current >= line.length) {
                    // finished typing — wait, then start deleting
                    pauseRef.current = 22;
                    deleting.current = true;
                }
                timer = setTimeout(tick, 55);
            } else {
                // deleting backward
                charIdx.current--;
                setCurrent(line.slice(0, charIdx.current));

                if (charIdx.current <= 0) {
                    // push finished line to stack BEFORE moving on
                    setStack((prev) => {
                        const next = [...prev, line];
                        return next.length > MAX_VISIBLE - 1
                            ? next.slice(next.length - (MAX_VISIBLE - 1))
                            : next;
                    });
                    lineIdx.current = (lineIdx.current + 1) % lines.length;
                    deleting.current = false;
                    pauseRef.current = 5;
                    charIdx.current = 0;
                    setCurrent('');
                }
                timer = setTimeout(tick, 25);
            }
        };

        timer = setTimeout(tick, 600);
        return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { stack, current };
}

// ─── Nav link — blink-in arrow ::before via CSS ───────────────────────────────
function NavLink({ href, label }: { href: string; label: string }) {
    return (
        <li className="nv-item">
            <a href={href} className="nv-link">
                <span className="nv-text">{label}</span>
            </a>
        </li>
    );
}

// ─── Social / contrast cell — scale-from-left overlay ────────────────────────
function IconCell({
    href,
    label,
    onClick,
    children,
}: {
    href?: string;
    label: string;
    onClick?: () => void;
    children: React.ReactNode;
}) {
    const inner = (
        <span className="icon-cell-inner" aria-label={label}>
            {/* overlay that slides in from left */}
            <span className="icon-slide-overlay" aria-hidden="true" />
            <span className="icon-content">{children}</span>
        </span>
    );

    if (href) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="icon-cell"
                aria-label={label}
            >
                {inner}
            </a>
        );
    }
    return (
        <button
            type="button"
            className="icon-cell"
            onClick={onClick}
            aria-label={label}
        >
            {inner}
        </button>
    );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────
const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHighContrast, setIsHighContrast] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const qrRef = useRef<HTMLAnchorElement>(null);
    const router = useRouter();

    const emailHref = useMemo(() => {
        const subject = encodeURIComponent(GENERAL_INFO.emailSubject);
        const body = encodeURIComponent(GENERAL_INFO.emailBody);
        return `mailto:${GENERAL_INFO.email}?subject=${subject}&body=${body}`;
    }, []);

    const { stack, current } = useScrollingConsole(CONSOLE_LINES);

    // Scroll hide
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 80);
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // QR striped-fill hover — direct DOM, no React state
    /*
    const handleQrEnter = useCallback(() => {
        if (!qrRef.current) return;
        let p = 100;
        const run = () => {
            p = p - (p - 0) * 0.14;
            if (qrRef.current) qrRef.current.style.setProperty('--bg-p', `${p}%`);
            if (p > 0.5) requestAnimationFrame(run);
            else if (qrRef.current) qrRef.current.style.setProperty('--bg-p', '0%');
        };
        requestAnimationFrame(run);
    }, []);

    const handleQrLeave = useCallback(() => {
        if (!qrRef.current) return;
        let p = 0;
        const run = () => {
            p = p + (100 - p) * 0.14;
            if (qrRef.current) qrRef.current.style.setProperty('--bg-p', `${p}%`);
            if (p < 99.5) requestAnimationFrame(run);
            else if (qrRef.current) qrRef.current.style.setProperty('--bg-p', '100%');
        };
        requestAnimationFrame(run);
    }, []);
    */

    return (
        <>
            <style>{`
                :root {
                    --nav-bg: #006dff;
                    --nav-fg: #000;
                    --nav-border: #001f4f;
                    --nav-overlay: #001a3d;
                    --nav-hover-fg: #006dff;
                }
                :root.high-contrast {
                    --nav-bg: #000;
                    --nav-fg: #fff;
                    --nav-border: #333;
                    --nav-overlay: #111;
                    --nav-hover-fg: #fff;
                }

                /* ═══════════════════════════════════════════════════
                   Navbar bar
                ═══════════════════════════════════════════════════ */
                .navbar-bar {
                    position: fixed;
                    top: 0; left: 0; right: 0;
                    z-index: 50;
                    border-bottom: 1px solid var(--nav-border);
                    background: var(--nav-bg);
                    color: var(--nav-fg);
                    transition: transform 0.5s ease, opacity 0.5s ease, background 0.3s ease, color 0.3s ease, border-color 0.3s ease;
                }
                .navbar-bar.is-hidden {
                    transform: translateY(-100%);
                    opacity: 0;
                    pointer-events: none;
                }

                /* ═══════════════════════════════════════════════════
                   Grid
                ═══════════════════════════════════════════════════ */
                .navbar-grid {
                    display: grid;
                    grid-template-columns:
                        minmax(300px, 1.4fr)
                        minmax(260px, 1fr)
                        48px 48px 48px
                        minmax(240px, 0.9fr)
                        96px;
                    height: 96px;
                    align-items: stretch;
                }

                /* ═══════════════════════════════════════════════════
                   Logo + Console cell
                ═══════════════════════════════════════════════════ */
                .logo-cell {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    border-right: 1px solid var(--nav-border);
                    padding: 0 1.25rem;
                    text-decoration: none;
                    color: inherit;
                    overflow: hidden;
                    transition: border-color 0.3s ease;
                }
                :root.high-contrast .logo-cell img {
                    filter: invert(1);
                }

                /* Console scroll container */
                .console-outer {
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    height: calc(${MAX_VISIBLE} * 1.35em);
                    overflow: hidden;
                    font-family: 'Courier New', monospace;
                    font-size: 7.5px;
                    text-transform: uppercase;
                    letter-spacing: 0.04em;
                    line-height: 1.35;
                    white-space: nowrap;
                }
                @media (max-width: 1279px) {
                    .console-outer { font-size: 6.5px; }
                }
                .console-line {
                    display: block;
                    animation: slide-up 0.25s ease forwards;
                }
                @keyframes slide-up {
                    from { transform: translateY(1.35em); opacity: 0; }
                    to   { transform: translateY(0);      opacity: 1; }
                }
                .console-current {
                    display: block;
                }
                .console-caret {
                    display: inline-block;
                    animation: caret 0.75s steps(1) infinite;
                    font-style: normal;
                }
                @keyframes caret {
                    0%, 100% { opacity: 1; }
                    50%       { opacity: 0; }
                }

                /* ═══════════════════════════════════════════════════
                   Nav links
                ═══════════════════════════════════════════════════ */
                .nv-menu {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    border-right: 1px solid var(--nav-border);
                    list-style: none;
                    margin: 0; padding: 0;
                    align-items: stretch;
                    transition: border-color 0.3s ease;
                }
                .nv-item {
                    display: flex;
                    align-items: stretch;
                    border-right: 1px solid var(--nav-border);
                    transition: border-color 0.3s ease;
                }
                .nv-item:last-child { border-right: none; }
                .nv-link {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    padding: 2rem 1rem;
                    font-family: 'Courier New', monospace;
                    font-size: 11px;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    text-decoration: none;
                    color: inherit;
                }
                /* blink-in left arrow */
                .nv-text {
                    position: relative;
                    display: inline-block;
                }
                .nv-text::before {
                    position: absolute;
                    top: calc(50% - 3px);
                    left: -13px;
                    border-top: 3px solid transparent;
                    border-left: 6px solid currentColor;
                    border-bottom: 3px solid transparent;
                    opacity: 0;
                    content: '';
                }
                .nv-link:hover .nv-text::before {
                    animation: blink-in 0.3s cubic-bezier(1,0,0,1) forwards;
                }
                @keyframes blink-in {
                    0%, 30%, 60% { opacity: 0; }
                    15%, 45%, 75%, 100% { opacity: 1; }
                }

                /* ═══════════════════════════════════════════════════
                   Icon cells (social + contrast toggle)
                ═══════════════════════════════════════════════════ */
                .icon-cell {
                    display: flex;
                    align-items: stretch;
                    width: 48px;
                    border: none;
                    border-right: 1px solid var(--nav-border);
                    background: transparent;
                    padding: 0;
                    cursor: pointer;
                    color: inherit;
                    text-decoration: none;
                    transition: border-color 0.3s ease;
                }
                /* Removed .icon-cell:last-of-type { border-right: none; } to ensure toggle button has a right border */
                .icon-cell-inner {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    overflow: hidden; /* clips the overlay inside the cell */
                }
                /* Full-cell overlay that scales from left on hover */
                .icon-slide-overlay {
                    position: absolute;
                    inset: 0;
                    background: var(--nav-overlay);
                    scale: 0 1;
                    transform-origin: 0 50%;
                    transition: scale 0.3s cubic-bezier(1,0,0,1), background 0.3s ease;
                    pointer-events: none;
                    z-index: 0;
                }
                .icon-cell:hover .icon-slide-overlay {
                    scale: 1 1;
                }
                .icon-content {
                    position: relative;
                    z-index: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--nav-fg);
                    transition: color 0.3s cubic-bezier(1,0,0,1);
                }
                .icon-cell:hover .icon-content {
                    color: var(--nav-hover-fg);
                }

                /* ═══════════════════════════════════════════════════
                   Social Stack for Medium Screens
                ═══════════════════════════════════════════════════ */
                @media (min-width: 1280px) {
                    .social-stack {
                        display: contents;
                    }
                }
                @media (max-width: 1279px) {
                    .social-stack {
                        display: grid;
                        grid-template-rows: 1fr 1fr;
                        border-right: 1px solid var(--nav-border);
                        width: 48px;
                        transition: border-color 0.3s ease;
                    }
                    .social-stack .icon-cell {
                        border-right: none;
                        width: 100%;
                    }
                    .social-stack .icon-cell:first-child {
                        border-bottom: 1px solid var(--nav-border);
                    }
                }

                /* ═══════════════════════════════════════════════════
                   Availability section
                ═══════════════════════════════════════════════════ */
                .availability-cell {
                    display: grid;
                    grid-template-rows: 1fr 1fr;
                    border-right: 1px solid var(--nav-border);
                    /* single-pixel horizontal rule in the middle */
                    background: linear-gradient(
                        0deg,
                        transparent calc(50% - 0.5px),
                        var(--nav-border) calc(50% - 0.5px),
                        var(--nav-border) 50%,
                        transparent 50%
                    );
                    transition: border-color 0.3s ease, background 0.3s ease;
                }
                .avail-row {
                    display: flex;
                    align-items: center;
                    padding: 0 1rem;
                    gap: 0.35rem;
                    /* match original: 200 weight, 1.25rem, serif-ish */
                    font-size: 1rem;
                    font-weight: 200;
                    line-height: 1;
                    white-space: nowrap;
                }
                @media (max-width: 1279px) {
                    .avail-row { font-size: 0.85rem; padding: 0 0.75rem; }
                }
                /* "Hire me" underline slide-in from right, slide-out to right */
                .hire-link {
                    position: relative;
                    display: inline-block;
                    color: inherit;
                    font-weight: 400;
                    text-decoration: none;
                    font-size: inherit;
                }
                .hire-link::before {
                    position: absolute;
                    bottom: -1px;
                    left: 0;
                    width: 100%;
                    height: 1px;
                    background: currentColor;
                    scale: 0 1;
                    transform-origin: 100% 50%;
                    transition: scale 0.3s cubic-bezier(1,0,0,1);
                    content: '';
                }
                .hire-link:hover::before {
                    scale: 1 1;
                    transform-origin: 0 50%;
                }

                /* ═══════════════════════════════════════════════════
                   QR code cell
                ═══════════════════════════════════════════════════ */
                .qr-cell {
                    --bg-p: 100%;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0.75rem;
                    text-decoration: none;
                    color: inherit;
                    overflow: hidden;
                }
                /* striped dark fill driven by --bg-p (100% = empty, 0% = full) */
                .qr-cell::before {
                    position: absolute;
                    inset: 0.75rem;
                    background: linear-gradient(
                        180deg,
                        transparent,
                        transparent var(--bg-p),
                        var(--nav-overlay) var(--bg-p),
                        var(--nav-overlay)
                    ) top / 100% 12.5% repeat;
                    content: '';
                    pointer-events: none;
                    transition: background 0.3s ease;
                }
                .qr-image {
                    position: relative;
                    z-index: 1;
                }
                :root.high-contrast .qr-cell img {
                    filter: invert(1);
                }

                @media (max-width: 1279px) { 
                    .qr-cell { display: none; } 
                    .navbar-grid {
                        grid-template-columns:
                            minmax(260px, 1.5fr)
                            minmax(220px, 1fr)
                            48px 48px
                            minmax(200px, 1fr);
                    }
                    /* On <1279px, we removed the QR code (96px column). We stacked 2 social icons into a 48px column.
                       So the columns are: Logo (1.5fr), Nav (1fr), Social Stack (48px), Toggle (48px), Avail (1fr). */
                }
                @media (max-width: 1023px) { 
                    .navbar-bar { display: none; } 
                }
            `}</style>

            <header className={cn('navbar-bar', { 'is-hidden': isScrolled })}>
                <div className="navbar-grid">

                    {/* ── Logo + scrolling console ──────────────────── */}
                    <Link href="/#banner" className="logo-cell" aria-label="Home">
                        <Image
                            src="/sohrab-alefi-logo-new.png"
                            alt="Logo"
                            width={64}
                            height={64}
                            priority
                            style={{ width: 64, height: 64, objectFit: 'contain', flexShrink: 0 }}
                        />
                        <div className="console-outer" aria-live="polite">
                            {/* Previously-typed lines (static, scroll upward on new entry) */}
                            {stack.map((line, i) => (
                                <span key={`${line}-${i}`} className="console-line">
                                    {line}
                                </span>
                            ))}
                            {/* Currently-typing line with blinking caret */}
                            <span className="console-current">
                                {current}
                                <i className="console-caret">▌</i>
                            </span>
                        </div>
                    </Link>

                    {/* ── Nav links ─────────────────────────────────── */}
                    <ul className="nv-menu">
                        <NavLink href="/#about-me" label="ABOUT" />
                        <NavLink href="/#selected-projects" label="WORK" />
                        <NavLink href="/#contact" label="CONTACT" />
                    </ul>

                    {/* ── Social Icons (Stacked on medium screens) ── */}
                    <div className="social-stack">
                        <IconCell href={SOCIAL_LINKS[0].url} label="GitHub">
                            <Github size={18} />
                        </IconCell>
                        <IconCell href={SOCIAL_LINKS[1].url} label="LinkedIn">
                            <Linkedin size={18} />
                        </IconCell>
                    </div>

                    {/* ── Contrast toggle ───────────────────────────── */}
                    <IconCell
                        label="Toggle contrast"
                        onClick={() => {
                            const next = !isHighContrast;
                            setIsHighContrast(next);
                            document.documentElement.classList.toggle('high-contrast', next);
                        }}
                    >
                        {/* Half-circle icon */}
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                            style={{ 
                                transition: 'transform 0.4s ease', 
                                transform: isHighContrast ? 'rotate(180deg)' : 'rotate(0deg)' 
                            }}
                        >
                            <path d="M10.1 20C8.72 20 7.42 19.74 6.2 19.21 4.98 18.69 3.92 17.97 3.02 17.08 2.12 16.18 1.41 15.12.89 13.9.36 12.68.1 11.38.1 10c0-1.38.26-2.68.79-3.9C1.41 4.88 2.13 3.82 3.02 2.93 3.92 2.03 4.98 1.31 6.2.79 7.42.26 8.72 0 10.1 0c1.38 0 2.68.26 3.9.79 1.22.52 2.28 1.24 3.17 2.14.89.9 1.61 1.96 2.13 3.17C19.83 7.32 20.1 8.62 20.1 10c-.02 1.38-.29 2.68-.81 3.9-.52 1.22-1.23 2.28-2.12 3.18-.9.9-1.96 1.61-3.17 2.13C12.78 19.74 11.48 20 10.1 20zm1-17.93v15.86c1.98-.25 3.65-1.12 5-2.62C17.43 13.82 18.1 12.05 18.1 10s-.67-3.82-2-5.31c-1.34-1.5-3.01-2.37-5-2.62z" />
                        </svg>
                    </IconCell>

                    {/* ── Availability ──────────────────────────────── */}
                    <div className="availability-cell">
                        <div className="avail-row">
                            {/* <span>🌙</span> */}
                            <span>Coding globally from Pakistan.</span>
                        </div>
                        <div className="avail-row">
                            <span>Available for freelance work →</span>
                            <a href={emailHref} className="hire-link">
                                Hire me
                            </a>
                        </div>
                    </div>

                    {/* ── QR Code ───────────────────────────────────── */}
                    <a
                        ref={qrRef}
                        href={emailHref}
                        className="qr-cell"
                        aria-label="Email me"
                    // onMouseEnter={handleQrEnter}
                    // onMouseLeave={handleQrLeave}
                    >
                        <Image
                            src="/Email QR Code (1).png"
                            alt="Email QR Code"
                            width={80}
                            height={80}
                            className="qr-image"
                            style={{ width: 80, height: 80, objectFit: 'contain' }}
                        />
                    </a>

                </div>
            </header>

            {/* ── Mobile / Sticky Scrolled Header ─────────────────────── */}
            <div 
                className={cn(
                    "fixed top-0 left-0 right-0 z-[50] flex justify-between items-center px-5 md:px-10 py-5 transition-transform duration-500 pointer-events-none",
                    isScrolled ? "translate-y-0" : "max-lg:translate-y-0 lg:-translate-y-full"
                )}
            >
                {/* Logo left */}
                <Link href="/#banner" className="block relative z-[51] pointer-events-auto" aria-label="Home" onClick={() => setIsMenuOpen(false)}>
                    <Image
                        src="/sohrab-alefi-logo-new.png"
                        alt="Logo"
                        width={48}
                        height={48}
                        style={{ objectFit: 'contain' }}
                        className="invert"
                    />
                </Link>

                {/* Hamburger Right */}
                <button
                    className="group size-12 relative z-[51] pointer-events-auto"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle Menu"
                >
                    <span
                        className={cn(
                            'inline-block w-3/5 h-0.5 bg-foreground rounded-full absolute left-1/2 -translate-x-1/2 top-1/2 duration-300 -translate-y-[5px] ',
                            {
                                'rotate-45 -translate-y-1/2': isMenuOpen,
                                'md:group-hover:rotate-12': !isMenuOpen,
                            },
                        )}
                    ></span>
                    <span
                        className={cn(
                            'inline-block w-3/5 h-0.5 bg-foreground rounded-full absolute left-1/2 -translate-x-1/2 top-1/2 duration-300 translate-y-[5px] ',
                            {
                                '-rotate-45 -translate-y-1/2': isMenuOpen,
                                'md:group-hover:-rotate-12': !isMenuOpen,
                            },
                        )}
                    ></span>
                </button>
            </div>

            {/* ── Drawer Menu Overlay ─────────────────────────────────────── */}
            <div
                className={cn(
                    'overlay fixed inset-0 z-[40] bg-black/70 transition-all duration-300',
                    {
                        'opacity-0 invisible pointer-events-none': !isMenuOpen,
                    },
                )}
                onClick={() => setIsMenuOpen(false)}
            ></div>

            {/* ── Drawer Menu Panel ───────────────────────────────────────── */}
            <div
                className={cn(
                    'fixed top-0 right-0 h-[100dvh] w-[500px] max-w-[calc(100vw-3rem)] transform transition-transform duration-700 z-[45] overflow-hidden gap-y-14 flex flex-col lg:justify-center py-10',
                    isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                )}
            >
                {/* Circular background expansion */}
                <div
                    className={cn(
                        'fixed inset-0 scale-150 rounded-[50%] bg-[var(--site-bg)] duration-700 delay-150 z-[-1] transition-colors',
                        isMenuOpen ? 'translate-x-0' : 'translate-x-1/2'
                    )}
                ></div>

                <div className="grow flex md:items-center w-full max-w-[300px] mx-8 sm:mx-auto text-foreground">
                    <div className="flex gap-10 lg:justify-between max-lg:flex-col w-full">
                        <div className="max-lg:order-2">
                            <p className="text-muted-foreground mb-5 md:mb-8 text-sm tracking-widest">
                                SOCIAL
                            </p>
                            <ul className="space-y-4">
                                {SOCIAL_LINKS.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-lg capitalize hover:text-[#006dff] transition-colors"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="">
                            <p className="text-white/60 mb-5 md:mb-8 text-sm tracking-widest">
                                MENU
                            </p>
                            <ul className="space-y-4">
                                {MENU_LINKS.map((link, idx) => (
                                    <li key={link.name}>
                                        <button
                                            onClick={() => {
                                                router.push(link.url);
                                                setIsMenuOpen(false);
                                            }}
                                            className="group text-xl md:text-2xl flex items-center gap-4 hover:text-[#006dff] transition-colors font-medium"
                                        >
                                            <span
                                                className={cn(
                                                    'size-4 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-[200%] transition-all duration-300',
                                                    COLORS[idx]
                                                )}
                                            >
                                                <MoveUpRight
                                                    size={10}
                                                    className="scale-0 group-hover:scale-100 transition-all duration-300 text-white"
                                                />
                                            </span>
                                            {link.name}
                                        </button>
                                    </li>
                                ))}
                                <li>
                                    <a
                                        href="/Sohrab_Alefi_Resume.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group text-xl md:text-2xl flex items-center gap-4 hover:text-[#006dff] transition-colors font-medium"
                                    >
                                        <span className={cn('size-4 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-[200%] transition-all duration-300', 'bg-pink-500 text-white')}>
                                            <MoveUpRight
                                                size={10}
                                                className="scale-0 group-hover:scale-100 transition-all duration-300 text-white"
                                            />
                                        </span>
                                        Resume
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="w-full max-w-[300px] mx-8 sm:mx-auto text-white">
                    <p className="text-white/60 mb-4 text-sm tracking-widest">GET IN TOUCH</p>
                    <a href={emailHref} className="text-lg hover:text-[#006dff] hover:underline underline-offset-4 transition-colors">
                        {GENERAL_INFO.email}
                    </a>
                </div>
            </div>
        </>
    );
};

export default Navbar;
