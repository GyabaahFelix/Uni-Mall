"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    title: "Honoring the Visionaries 🏆",
    description:
      "Behind every great project, there are great minds. This is our tribute to the innovative thinkers who made this possible.",
    img: "/bg1.jpg",
    bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
  },
  {
    id: 2,
    title: "Driven by Passion 🚀",
    description:
      "A project built with dedication, teamwork, and an unyielding passion for excellence.",
    img: "/bg2.jpg",
    bg: "bg-gradient-to-r from-pink-50 to-blue-50",
  },
  {
    id: 3,
    title: "Mega Minds Behind the Scenes 💡",
    description:
      "From concept to reality, we extend our deepest gratitude to the masterminds who made this dream a reality.",
    img: "/bg3.jpg",
    bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
  },
  {
    id: 3,
    title: "Mega Minds Behind the Scenes 💡",
    description:
      "From concept to reality, we extend our deepest gratitude to the masterminds who made this dream a reality.",
    img: "/bg4.jpg",
    bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
  },
];

const About = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mt-24 mb-48 h-[calc(100vh-80px)] overflow-hidden">
      <div
        className="w-max h-full flex transition-all ease-in-out duration-1000"
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {slides.map((slide) => (
          <div
            className={`${slide.bg} w-screen h-full flex flex-col xl:flex-row relative items-center justify-center`}
            key={slide.id}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full">
                <Image
                  src={slide.img}
                  alt="Great Minds"
                  fill
                  sizes="100%"
                  className="object-fill brightness-100"
                />
                <div className="absolute inset-0 bg-black/60"></div>
              </div>
            </div>

            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white px-6 py-3 rounded-md">
              <h1 className="text-3xl lg:text-4xl 2xl:text-6xl font-semibold">
                {slide.title}
              </h1>
              <h2 className="text-lg lg:text-xl 2xl:text-2xl max-w-2xl">
                {slide.description}
              </h2>
              <p className="text-sm">- With appreciation from the UNIMALL team</p>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute left-1/2 bottom-8 flex gap-4 transform -translate-x-1/2">
        {slides.map((_, index) => (
          <div
            className={`w-3 h-3 rounded-full ring-1 ring-gray-200 cursor-pointer flex items-center justify-center ${
              current === index ? "scale-150" : ""
            }`}
            key={index}
            onClick={() => setCurrent(index)}
          >
            {current === index && (
              <div className="w-[6px] h-[6px] bg-gray-200 rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
