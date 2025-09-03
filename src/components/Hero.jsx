import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";

const slides = [
  {
    src: image1,
    bg: "#3B82C4",
    name: "Daenerys Targaryen",
    description:
      "The Mother of Dragons, breaker of chains, and claimant to the Iron Throne. Daenerys is a powerful and determined leader.",
  },
  {
    src: image2,
    bg: "#7A9E40",
    name: "Margaery Tyrell",
    description:
      "Known for her beauty, intelligence, and charm, Margaery skillfully navigates court politics.",
  },
  {
    src: image3,
    bg: "#86090A",
    name: "Cersei Lannister",
    description:
      "Ambitious, cunning, and fiercely protective of her children, Cersei will stop at nothing to secure her family's dominance. ",
  },
];

const Hero = () => {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % slides.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  const getPosition = (i) => {
    if (i === index) return "center";
    if (i === (index - 1 + slides.length) % slides.length) return "left";
    if (i === (index + 1) % slides.length) return "right";
    return "hidden";
  };

  return (
    <motion.div
      className=" w-full text-white min-h-screen font-chewy overflow-hidden  "
      animate={{ backgroundColor: slides[index].bg }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <div className=" px-5 flex flex-col items-center overflow-hidden">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 1, delay: 0.7, ease: "easeIn" }}
          className="absolute w-[450px] h-[450px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/3 bg-white  rounded-full blur-3xl"
        ></motion.div>

        <div className="w-full font-semibold py-2 items-start">WEBFORGE</div>

        {/* Title */}
        <motion.h1
          initial={{ y: -200 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-bold text-[150px] text-white scale-y-125 drop-shadow-2xl z-30"
        >
          HOUSE OF 3D
        </motion.h1>

        {/* Carousel */}
        <motion.div
          className="absolute bottom-0 flex items-center z-60 justify-center w-[600px] h-[400px]"
          initial={{ y: 500 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.6, duration: 0.6, ease: "easeInOut" }}
        >
          {slides.map((src, i) => {
            const pos = getPosition(i);

            let style = {};
            if (pos === "center") {
              style = { scale: 1.2, zIndex: 10, x: 0, opacity: 1 };
            } else if (pos === "left") {
              style = { scale: 0.5, zIndex: 5, x: -300, opacity: 0.7 };
            } else if (pos === "right") {
              style = { scale: 0.5, zIndex: 5, x: 300, opacity: 0.7 };
            } else {
              style = { scale: 1, opacity: 0, zIndex: 0 };
            }

            return (
              <motion.img
                key={i}
                src={src.src}
                alt={`carousel-${i}`}
                initial={false}
                animate={style}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 25,
                }}
                className="absolute bottom-0  origin-bottom rounded-xl drop-shadow-2xl  object-cover w-[300px] h-full"
              />
            );
          })}
        </motion.div>

        {/* text info */}

        <div className=" absolute left-5 bottom-4 z-20 flex flex-col items-center w-auto gap-5 ">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              key={index}
              className="flex flex-col gap-4 max-w-[250px]"
            >
              <h1 className="text-5xl">{slides[index].name}</h1>
              <p>{slides[index].description}</p>
            </motion.div>
          </AnimatePresence>

          {/* buttons container */}

          <div className="flex  gap-3">
            {/* Left button */}
            <button
              onClick={prev}
              className="p-3 cursor-pointer bg-transparent border-1 border-white rounded-full"
            >
              <FaChevronLeft />
            </button>

            {/* Right button */}
            <button
              onClick={next}
              className="p-3 cursor-pointer bg-transparent border-1  border-white rounded-full"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Hero;
