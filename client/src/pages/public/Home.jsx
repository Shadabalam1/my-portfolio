import PageWrapper from '../../components/public/PageWrapper';
import HeroSection from '../../sections/HeroSection';
import AboutSection from '../../sections/AboutSection';
import SkillsSection from '../../sections/SkillsSection';
import ProjectsSection from '../../sections/ProjectsSection';
import ExperienceSection from '../../sections/ExperienceSection';
import EducationSection from '../../sections/EducationSection';
import ContactSection from '../../sections/ContactSection';

const Home = () => {
  return (
    <PageWrapper 
      title="Shadab Alam | Software Engineer & Web Developer"
      description="Professional portfolio of Shadab Alam, a Software Engineer & MERN Stack Developer."
    >
      <div className="w-full">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <ContactSection />
      </div>
    </PageWrapper>
  );
};

export default Home;

