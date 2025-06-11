import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface BootSequenceProps {
  progress?: number; // Loading progress (0-100)
  loaded?: number; // Number of loaded images
  total?: number; // Total number of images to load
}

const BootSequence: React.FC<BootSequenceProps> = ({ progress = 0 }) => {
  const [showProgress, setShowProgress] = useState(true);

  // Show progress bar after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowProgress(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1, zIndex: 999999 }}
      exit={{ opacity: 0, zIndex: -999999999, transition: { duration: 1.2 } }}
      className="bg-black fixed inset-0 flex flex-col items-center justify-center h-svh text-white"
    >
      {/* Main logo/image */}
      <motion.div
        initial={{ scale: 1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src="/apple-D-logo.png"
          alt="apple-D-logo"
          width={500}
          height={500}
          className="h-[50svh] w-auto"
        />
      </motion.div>

      {/* Loading indicator */}
      {showProgress && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.8 }}
          className="w-[354px] h-[9px] bg-gray-800 rounded-[30px] overflow-hidden"
        >
          <motion.div
            initial={{ width: "5%" }}
            animate={{ width: `${progress}%` }}
            transition={{
              type: "spring",
              stiffness: 20,
              damping: 20,
            }}
            className="h-full bg-white rounded-[30px]"
          />
        </motion.div>
      )}

      {/* Optional loading text */}
      {/* {showProgress && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-4 text-xs text-white/60 font-light"
        >
          Starting up...
        </motion.p>
      )} */}

      {/* Uncomment for debugging */}
      {/* <div className="absolute bottom-8 text-xs text-white/30">
        Loaded {loaded} of {total} images ({progress.toFixed(0)}%)
      </div> */}
    </motion.div>
  );
};

export default BootSequence;
