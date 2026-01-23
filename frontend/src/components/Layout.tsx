import { BackgroundBeams } from "@/components/ui/shadcn-io/background-beams";
import { StrictMode } from "react";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <StrictMode>
      <div className="min-h-screen bg-teal-950">
        <BackgroundBeams className="fixed inset-0" />
        <div className="mx-auto min-h-screen flex flex-col justify-center max-w-(--breakpoint-xl) px-6 py-12 font-sans md:px-12 md:py-16 lg:py-0 relative z-10">
          <Outlet />
        </div>
      </div>
    </StrictMode>
  );
};

export default Layout;
