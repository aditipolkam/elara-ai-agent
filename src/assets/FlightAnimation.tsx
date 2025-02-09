import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function FlightPathAnimation() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  // Define Bezier Curve Points
  const x = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.7, 1],
    [-window.innerWidth / 2, 100, 400, 700, window.innerWidth] // Moves from top-left to bottom-right
  );

  const y = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.7, 1],
    [-100, -50, 50, 100, 200] // Moves downward
  );

  const scale = useTransform(scrollYProgress, [0, 1], [1, 2]);
  const rotate = -45;
  // useTransform(scrollYProgress, [0, 1], [0, 360]); // AutoRotate Effect

  return (
    <div className="relative">
      {/* Targeted Scroll Animation Section */}
      <div
        ref={targetRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Sticky Background Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-6xl font-bold text-primary">Ask Away</h1>
        </div>

        {/* Animated Plane */}
        <motion.img
          src="/plane.png"
          alt="Plane"
          style={{ x, y, rotate, scale }}
          className="relative"
        />
      </div>

      {/* Spacer for scrolling */}
      {/* <div className="h-[50vh]"></div> */}
    </div>
  );
}
