import React from "react";

const About: React.FC = () => {
  return (
    <section
      id="about"
      className="mb-12 scroll-mt-16 md:mb-18 lg:mb-24 lg:scroll-mt-24"
      aria-label="About me"
    >
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur-sm md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
          About
        </h2>
      </div>
      <div>
        <p className="mb-4">
          I've been working in the industry for over 15 years, and I'm always
          looking for new challenges and opportunities to learn and grow.
        </p>
        <p className="mb-4">
          Currently, I'm focused on ReactJS ecosystem and building modern
          websites with web accessibility standards.
        </p>
        <p className="mb-4">
          In the past, I essentially worked with Adobe E-Commerce (Magento 1 &
          2) platform, creating custom experiences for a variery of enterprise -
          like Legrand, Bayard Jeunesse, IGN, Nespresso or Newrest (Le Bar TGV
          which is react app to order your launch in the train).
        </p>
        <p className="mb-4">
          In my spare time, I'm usually doing DIY project based on Arduino,
          playing tennis or bocce. I'm also volonteer in my rural community
          center, helping for festivities and other events.
        </p>
      </div>
    </section>
  );
};

export default About;
