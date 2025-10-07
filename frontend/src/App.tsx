import React from "react";
import { Outlet } from "react-router";
const App: React.FC = () => {
  return (
    <div className="mx-auto min-h-screen flex flex-col justify-center max-w-(--breakpoint-xl) px-6 py-12 font-sans md:px-12 md:py-16 lg:py-0 relative z-10">
      <Outlet />
    </div>
  );
};

export default App;
