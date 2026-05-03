import React from 'react';

const JsonLd = () => {
  const personData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Sohrab Alefi",
    "alternateName": "Sohrab Ansari",
    "url": "https://sohrabalefi.me",
    "image": "https://sohrabalefi.me/sohrab alefi.png",
    "jobTitle": "Full-Stack Developer & IT Instructor",
    "description": "Full-stack developer, IT instructor with 2.5+ years of experience, AI automation expert, and startup co-founder.",
    "sameAs": [
      "https://github.com/sohrabansari990",
      "https://www.linkedin.com/in/sohrabalefi"
    ],
    "knowsAbout": [
      "Full-Stack Development",
      "AI Automation",
      "Networking",
      "Python Programming",
      "Office 365",
      "Video Editing"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personData) }}
    />
  );
};

export default JsonLd;
