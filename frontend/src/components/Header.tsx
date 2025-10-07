import React from "react";
import { Github, Linkedin } from "lucide-react";
interface HeaderProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, onNavigate }) => {
  const navItems = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[48%] lg:flex-col lg:justify-between lg:py-24">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
          <a href="/">
            <span className="text-lime-700">Abel</span> Brien
          </a>
        </h1>
        <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl">
          Front End Developer
        </h2>
        <p className="mt-4 max-w-xs leading-normal">
          I'm a front end developer specializing in building Adobe E-Commerce
          (Magento 1 & 2) websites. I'm passionate about creating engaging,
          user-friendly digital experiences 😃.
        </p>

        <nav className="nav hidden lg:block" aria-label="In-page jump links">
          {/* Desktop Navigation */}
          <ul className="mt-16 w-max">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={"#" + item.id}
                  onClick={() => onNavigate(item.id)}
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
                      activeSection === item.id
                        ? "text-lime-700"
                        : "text-slate-500"
                    }`}
                  >
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <ul className="ml-1 mt-8 flex items-center">
        <li className="mr-5 shrink-0 text-xs">
          <a
            href="https://github.com/aboul"
            target="_blank"
            className="block hover:text-slate-200"
            rel="noreferrer noopener"
            aria-label="Github (opens in a new tab)"
            title="Github"
          >
            <span className="sr-only">Github</span>
            <Github className="h-6 w-6" />
          </a>
        </li>
        <li className="mr-5 shrink-0 text-xs">
          <a
            href="https://www.linkedin.com/in/abelbrien/"
            target="_blank"
            className="block hover:text-slate-200"
            rel="noreferrer noopener"
            aria-label="LinkedIn (opens in a new tab)"
            title="LinkedIn"
          >
            <span className="sr-only">LinkedIn</span>
            <Linkedin className="h-6 w-6" />
          </a>
        </li>
      </ul>
    </header>
  );
};

export default Header;
