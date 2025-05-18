import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { BookOpen, Heart, Pencil } from "lucide-react";

const FloatingBackground: React.FC = () => {
  const floatingElements = useMemo(
    () =>
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
        size: Math.random() * 0.5 + 0.5,
      })),
    [] // Empty dependency array means this will only be calculated once
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {floatingElements.map((element) => (
        <motion.div
          key={element.id}
          initial={{ y: -100, opacity: 0 }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            delay: element.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: `${element.x}%`,
            top: `${element.y}%`,
            transform: `scale(${element.size})`,
          }}
        >
          {element.id % 3 === 0 ? (
            <Heart className="w-4 h-4 text-pink-300" />
          ) : element.id % 3 === 1 ? (
            <BookOpen className="w-4 h-4 text-blue-300" />
          ) : (
            <Pencil className="w-4 h-4 text-purple-300" />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingBackground;
