import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const text =
    "<NotFound>\n\tDon't panic!\n\tI'll bring back you\n\tto the right path!\n</NotFound>".trim();

  return (
    <div className="w-full h-auto rounded-2xl flex shrink shadow-md sm:flex-row flex-col bg-slate-700/50 @container overflow-hidden">
      <div className="flex flex-1 flex-col self-start justify-evenly p-3.5 min-w-0 text-[5cqw] sm:text-[3.7cqw] bg-clip-text text-white/50 cursor-default">
        <pre className="tab-2">
          <code>{text}</code>
        </pre>
      </div>
      <Link
        to="/"
        className="flex flex-1 self-end transition-all sm:self-auto h-full rotate-90 -translate-x-[5%] sm:rotate-0 sm:translate-0"
      >
        <img
          className="cursor-pointer object-cover overflow-hidden rounded-tr-2xl rounded-br-2xl transition-all hover:scale-107"
          src="/oiseau.webp"
        />
      </Link>
    </div>
  );
};

export default NotFoundPage;
