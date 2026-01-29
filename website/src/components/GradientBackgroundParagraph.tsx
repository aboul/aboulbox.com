import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  text: string;
  className?: string;
}

const GradientBackgroundParagraph: React.FC<Props> = ({ text, className }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({
    clientX,
    clientY,
    currentTarget,
  }: React.MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const spotlightBackground = useMotionTemplate`radial-gradient(circle at ${mouseX}px ${mouseY}px, #9bbb59, transparent 10%)`;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      style={{
        backgroundImage: spotlightBackground,
        backgroundClip: "text",
      }}
      className={cn("bg-clip-text text-gray-950/50 cursor-default", className)}
    >
      <pre className="tab-2">
        <code>{text}</code>
      </pre>
    </motion.div>
  );
};

export default GradientBackgroundParagraph;
