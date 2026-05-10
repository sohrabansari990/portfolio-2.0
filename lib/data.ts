import { IProject } from '@/types';

export const GENERAL_INFO = {
    email: 'sohrabalefi99@gmail.com',

    emailSubject: "Let's collaborate on a project",
    emailBody: 'Hi Sohrab, I am reaching out to you because...',

    oldPortfolio: 'https://sohrabalefi.me',
    upworkProfile: 'https://github.com/sohrabansari990',
    github: 'https://github.com/sohrabansari990',
    linkedin: 'https://www.linkedin.com/in/sohrabalefi',
};

export const SOCIAL_LINKS = [
    { name: 'github', url: GENERAL_INFO.github },
    { name: 'linkedin', url: GENERAL_INFO.linkedin },
    { name: 'email', url: `mailto:${GENERAL_INFO.email}` },
];

export const CERTIFICATES = [
    {
        title: 'Full Stack Development',
        issuer: 'Professional Certificate',
        image: '/certificates/sohrab alefi cert full stack.png',
    },
    {
        title: 'Microsoft Azure',
        issuer: 'Cloud Certificate',
        image: '/certificates/sohrab azure cert.png',
    },
    {
        title: 'SQL',
        issuer: 'Database Certificate',
        image: '/certificates/sql sohrab alefi.png',
    },
];

export const MY_STACK = {
    frontend: [
        {
            name: 'JavaScript',
            icon: '/logo/js.png',
        },
        {
            name: 'TypeScript',
            icon: '/logo/ts.png',
        },
        {
            name: 'React',
            icon: '/logo/react.png',
        },
        {
            name: 'Next.js',
            icon: '/logo/next.png',
        },
        {
            name: 'Redux',
            icon: '/logo/redux.png',
        },
        {
            name: 'Tailwind CSS',
            icon: '/logo/tailwind.png',
        },
        {
            name: 'GSAP',
            icon: '/logo/gsap.png',
        },
        {
            name: 'Framer Motion',
            icon: '/logo/framer-motion.png',
        },
        {
            name: 'Sass',
            icon: '/logo/sass.png',
        },
        {
            name: 'Bootstrap',
            icon: '/logo/bootstrap.svg',
        },
    ],
    backend: [
        {
            name: 'Node.js',
            icon: '/logo/node.png',
        },
        {
            name: 'NestJS',
            icon: '/logo/nest.svg',
        },
        {
            name: 'Express.js',
            icon: '/logo/express.png',
        },
    ],
    database: [
        {
            name: 'MySQL',
            icon: '/logo/mysql.svg',
        },
        {
            name: 'PostgreSQL',
            icon: '/logo/postgreSQL.png',
        },
        {
            name: 'MongoDB',
            icon: '/logo/mongodb.svg',
        },
        {
            name: 'Prisma',
            icon: '/logo/prisma.png',
        },
    ],
    tools: [
        {
            name: 'Git',
            icon: '/logo/git.png',
        },
        {
            name: 'Docker',
            icon: '/logo/docker.svg',
        },
        {
            name: 'AWS',
            icon: '/logo/aws.png',
        },
    ],
};

export const PROJECTS: IProject[] = [
    {
        title: 'Saqib.watch',
        slug: 'saqib-watch',
        liveUrl: 'https://saqib.watch/',
        sourceCode: GENERAL_INFO.github,
        year: 2026,
        description: `Saqib.watch turns a focused product idea into a polished web platform people can actually use. It helps move the product from concept to market with a clear experience, fast flows, and practical launch readiness.`,
        role: `Co-founder and builder<br/>
        - Shaped the product direction and user experience.<br/>
        - Built the interface and connected the core workflows.<br/>
        - Kept the build practical, maintainable, and ready for real users.`,
        techStack: ['Next.js', 'React', 'Tailwind CSS'],
        thumbnail: '/projects/thumbnail/saqib-long.png',
        longThumbnail: '/projects/long/saqib-long.png',
        images: [
            '/projects/images/saqib.watch-1.png',
            '/projects/images/saqib.watch-2.png',
            '/projects/images/saqib.watch-3.png',
        ],
    },
    {
        title: 'LMS',
        slug: 'lms',
        liveUrl: 'https://learning-management-system12.netlify.app/',
        sourceCode: 'https://github.com/sohrabansari990/LMS',
        year: 2025,
        description: `A learning platform that separates admin, instructor, and student workflows so courses are easier to publish, approve, and consume. It reduces the operational friction around managing learners, roles, and course material in one place.`,
        role: `Full-stack developer<br/>
        - Built role-based flows for admins, instructors, and students.<br/>
        - Connected authentication, course management, and backend data handling.<br/>
        - Focused on making the platform usable for both learning and administration.`,
        techStack: ['React', 'Express', 'MongoDB', 'Firebase'],
        thumbnail: '/projects/thumbnail/LMS.png',
        longThumbnail: '/projects/long/LMS.png',
        images: [
            '/projects/images/lms-1.png',
            '/projects/images/lms-2.png',
        ],
    },
    {
        title: 'Gemini Clone',
        slug: 'gemini-clone',
        liveUrl: 'https://gemini-clone-2025.netlify.app/',
        sourceCode: 'https://github.com/sohrabansari990/Gemini_clone',
        year: 2025,
        description: `A Gemini-style AI assistant UI that gives users a clean way to ask questions, read formatted answers, and stay focused on the conversation. It solves the interface problem around AI tools: fast input, readable output, and a familiar chat experience.`,
        role: `Frontend developer<br/>
        - Built the chat experience and response presentation.<br/>
        - Integrated Google's generative AI SDK.<br/>
        - Added markdown rendering so answers are easier to scan and use.`,
        techStack: ['React', 'Google GenAI', 'Markdown', 'Tailwind CSS'],
        thumbnail: '/projects/thumbnail/gemini-clone.png',
        longThumbnail: '/projects/long/gemini-clone.png',
        images: ['/projects/images/gemini-clone.png'],
    },
    {
        title: 'K72 Clone',
        slug: 'k72-clone',
        liveUrl: 'https://k72-clone1.netlify.app/',
        sourceCode: 'https://github.com/sohrabansari990/k72_clone',
        year: 2025,
        description: `A motion-heavy agency site rebuild focused on translating a high-end visual brand into a smooth, responsive web experience. It helps show that complex animation and strong layout can stay usable without feeling overloaded.`,
        role: `Frontend developer<br/>
        - Recreated the visual system with responsive layouts and page transitions.<br/>
        - Used animation deliberately to guide attention, not distract from content.<br/>
        - Tuned interactions for a polished portfolio-grade experience.`,
        techStack: ['React', 'GSAP', 'Motion', 'Tailwind CSS'],
        thumbnail: '/projects/thumbnail/k72-clone.png',
        longThumbnail: '/projects/long/k72-clone.png',
        images: [
            '/projects/images/k72-clone-1.png',
            '/projects/images/k72-clone-2.png',
            '/projects/images/k72-clone-3.png',
            '/projects/images/k72-clone-4.png',
        ],
    },
    {
        title: 'Dog Studio Clone',
        slug: 'dog-studio-clone',
        liveUrl: 'https://3rd-dog.netlify.app/',
        sourceCode: 'https://github.com/sohrabansari990/dogStudio-clone',
        year: 2025,
        description: `A 3D studio landing experience that turns brand presentation into something interactive and memorable. It helps visitors understand the studio's personality quickly through motion, depth, and visual exploration.`,
        role: `Frontend developer<br/>
        - Built an immersive 3D-first web experience.<br/>
        - Combined scroll, motion, and responsive layout into one smooth presentation.<br/>
        - Kept performance and interaction quality in view while using WebGL elements.`,
        techStack: ['React', 'Three.js', 'React Three Fiber', 'Tailwind CSS'],
        thumbnail: '/projects/thumbnail/dogStudio-clone.png',
        longThumbnail: '/projects/long/dogStudio-clone.png',
        images: [
            '/projects/images/dogStudio-clone-1.png',
            '/projects/images/dogStudio-clone-2.png',
            '/projects/images/dogStudio-clone-3.png',
        ],
    },
];

export const MY_EXPERIENCE = [
    {
        title: 'IT Instructor',
        company: 'Teaching Networking, Programming (Python), Office 365, and Video Editing',
        duration: '2.5+ years',
    },
    {
        title: 'AI Automation Freelancer',
        company: 'Automation systems for clients and business workflows',
        duration: 'Freelance',
    },
    {
        title: 'Startup Co-Founder',
        company: 'Saqib.watch',
        duration: 'Built and launched product experience',
    },
    {
        title: 'Full-Stack Developer',
        company: 'Web applications, dashboards, and product builds',
        duration: 'Project based',
    },
];
