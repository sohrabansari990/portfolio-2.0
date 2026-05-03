import AboutMe from './_components/AboutMe';
import Banner from './_components/Banner';
import Experiences from './_components/Experiences';
import Skills from './_components/Skills';
import ProjectList from './_components/ProjectList';
import Certificates from './_components/Certificates';
import ContactSection from './_components/ContactSection';

export default function Home() {
    return (
        <div className="page-">
            <Banner />
            <AboutMe />
            <Skills />
            <Certificates />
            <Experiences />
            <ProjectList />
            <ContactSection />
        </div>
    );
}
