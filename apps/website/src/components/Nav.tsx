import React, { useState, useEffect } from "react";

const Nav: React.FC = () => {
  const navItems = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ];

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
    <nav className="nav hidden lg:block" aria-label="In-page jump links">
      {/* Desktop Navigation */}
      <ul className="mt-16 w-max">
        {navItems.map((item) => (
          <li key={item.id}>
            <a
              href={"#" + item.id}
              onClick={() => handleNavigate(item.id)}
              className="group flex items-center py-3"
            >
              <span
                className={`nav-indicator mr-4 h-px transition-all group-hover:w-16 group-hover:bg-lime-700 group-focus-visible:w-16 group-focus-visible:bg-lime-700 motion-reduce:transition-none ${
                  activeSection === item.id
                    ? "w-16 bg-lime-700"
                    : "w-8 bg-slate-600"
                }`}
              ></span>
              <span
                className={`nav-text text-xs font-bold uppercase tracking-widest group-hover:text-lime-700 group-focus-visible:text-lime-700 ${
                  activeSection === item.id ? "text-lime-700" : "text-slate-500"
                }`}
              >
                {item.label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
