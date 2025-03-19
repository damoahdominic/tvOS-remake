import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
const BootSequence = () => {
  return (
    <motion.div
      exit={{ z: -999999999, opacity: 0 }}
      animate={{ z: 999999, opacity: 1 }}
      className="bg-black flex items-center justify-center h-svh text-white"
    >
      {/* Put your animation here */}
      {/* Booting... */}
      <Image src="/apple-D-logo.png" alt="Frame65" width={200} height={200} />
    </motion.div>
  );
};

export default BootSequence;
