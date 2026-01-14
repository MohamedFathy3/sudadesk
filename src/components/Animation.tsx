"use client";
import { motion } from "framer-motion";

export const Animation = ({
  children,
  type = "fadeInUp",
  delay = 0.3,
  duration = 1,
}: {
  children: React.ReactNode;
  type: string;
  delay: number;
  duration: number;
}) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const variants: { [key: string]: any } = {
    fadeInUp: {
      hidden: { opacity: 0, y: 60 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: duration, delay: delay },
      },
    },
  };
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={variants[type]}
    >
      {children}
    </motion.div>
  );
};
