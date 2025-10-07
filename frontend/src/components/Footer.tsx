import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="max-w-md pb-16 text-sm text-slate-500 sm:pb-0">
      <p>
        Coded in{" "}
        <a
          href="https://code.visualstudio.com/"
          className="font-medium text-slate-400 hover:text-teal-300 focus-visible:text-teal-300"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Visual Studio Code (opens in a new tab)"
        >
          Visual Studio Code
        </a>{" "}
        by yours truly. Built with{" "}
        <a
          href="https://vitejs.fr/"
          className="font-medium text-slate-400 hover:text-teal-300 focus-visible:text-teal-300"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Vitejs (opens in a new tab)"
        >
          Vitejs
        </a>
        ,{" "}
        <a
          href="https://www.typescriptlang.org/"
          className="font-medium text-slate-400 hover:text-teal-300 focus-visible:text-teal-300"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Typescript (opens in a new tab)"
        >
          Typescript
        </a>{" "}
        and{" "}
        <a
          href="https://tailwindcss.com/"
          className="font-medium text-slate-400 hover:text-teal-300 focus-visible:text-teal-300"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Tailwind CSS (opens in a new tab)"
        >
          Tailwind CSS
        </a>
        .
      </p>
    </footer>
  );
};

export default Footer;
