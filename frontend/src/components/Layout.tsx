import React, { useState, useEffect } from "react";
import Header from "./Header";
import About from "./About";
import Contact from "./Contact";
import Footer from "./Footer";
import Experience from "./Experience";

const Layout: React.FC = () => {
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "experience", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Set initial active section

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="lg:flex lg:justify-between lg:gap-4">
      <Header activeSection={activeSection} onNavigate={handleNavigate} />
      <main id="content" className="pt-16 lg:w-[52%] lg:py-24">
        <About />
        <Experience />
        <Contact />
        <Footer />
      </main>
    </div>
  );
};

export default Layout;
