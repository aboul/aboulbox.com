import React, { useState } from "react";
import { CopyIcon, CheckIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCopyToClipboard } from "usehooks-ts";

const MotionCopyIcon = motion.create(CopyIcon);
const MotionCheckIcon = motion.create(CheckIcon);

interface Props {
  textToCopy: string;
  className?: string;
  iconClassName?: string;
}

const CopyButton: React.FC<Props> = ({
  textToCopy,
  className,
  iconClassName,
}) => {
  const [copiedText, copy] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    copy(textToCopy)
      .then(() => {
        setIsCopied(true);
      })
      .catch((error) => {
        console.error("Failed to copy!", error);
      });

    return copiedText;
  };

  const handleMouseLeave = () => {
    setTimeout(() => setIsCopied(false), 500);
  };

  const copyVariants = {
    visible: { y: 0, opacity: 1, transition: { duration: 0.2 } },
    hidden: { y: 25, opacity: 0.5, transition: { duration: 0.2 } },
  };

  const copiedVariants = {
    visible: { y: 0, opacity: 1, transition: { duration: 0.2 } },
    bounce: {
      scale: 1.3,
      color: "#9bbb59",
      transition: { duration: 0.2, delay: 0.2 },
    },
    hidden: {
      y: -25,
      opacity: 0.5,
      color: "#fff",
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className={className} onMouseLeave={handleMouseLeave}>
      <AnimatePresence mode="wait" initial={false}>
        {!isCopied ? (
          <MotionCopyIcon
            key="copy"
            onClick={handleCopy}
            className={iconClassName}
            variants={copyVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          />
        ) : (
          <MotionCheckIcon
            key="copied"
            onClick={handleCopy}
            className={iconClassName}
            variants={copiedVariants}
            initial="hidden"
            animate={["visible", "bounce"]}
            exit="hidden"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CopyButton;
