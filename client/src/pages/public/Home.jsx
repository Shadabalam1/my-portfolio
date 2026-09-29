import HeroSection from '../../sections/HeroSection';
import AboutSection from '../../sections/AboutSection';
import SkillsSection from '../../sections/SkillsSection';
import ProjectsSection from '../../sections/ProjectsSection';
import ExperienceSection from '../../sections/ExperienceSection';
import EducationSection from '../../sections/EducationSection';
import ContactSection from '../../sections/ContactSection';

const Home = () => {
  return (
    <div className="bg-gray-950">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <EducationSection />
      <ContactSection />
    </div>
  );
};

export default Home;

