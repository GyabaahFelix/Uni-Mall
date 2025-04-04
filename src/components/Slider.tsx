"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    title: "Welcome to TechGear 🛒",
    description: "Your One-Stop Electronics Shop for All the Latest Gadgets!",
    img: "/laptop-slider.png", // Use an image that aligns with the theme (e.g., a laptop or smartphone)
    url: "/",
    bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
  },
  {
    id: 2,
    title: "Explore Cutting-Edge Smartphones 📱",
    description: "Find the latest smartphones with powerful features and amazing cameras.",
    
    img: "/smartphone-slider.png", // Replace with a smartphone image
    url: "/",
    bg: "bg-gradient-to-r from-pink-50 to-blue-50",
  },
  {
    id: 3,
    title: "Unbeatable Deals on Laptops & Accessories 💻",
    description: "Shop laptops, accessories, and more with exclusive deals and discounts.",
    img: "/watch-slider.png", // Image of laptops or related accessories
    url: "/",
    bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
  },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000); // Automatic slide change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[calc(100vh-80px)] overflow-hidden relative">
      <div
        className="w-max h-full flex transition-all ease-in-out duration-1000"
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {slides.map((slide) => (
          <div
            className={`${slide.bg} w-screen h-full flex flex-col gap-10 xl:flex-row`}
            key={slide.id}
          >
            {/* TEXT CONTAINER */}
            <div className="h-1/2 xl:w-1/2 xl:h-full flex flex-col items-center justify-center gap-6 2xl:gap-8 text-center">
              <h1 className="text-3xl lg:text-4xl 2xl:text-6xl font-semibold text-gray-800">
                {slide.title}
              </h1>
              <h2 className="text-lg lg:text-xl 2xl:text-2xl text-gray-700">
                {slide.description}
              </h2>
              <Link href="/list">
                <button className="rounded-md bg-black text-white py-2 px-6 text-sm lg:text-base hover:bg-gray-800 transition">
                  SHOP NOW
                </button>
              </Link>
            </div>
            {/* IMAGE CONTAINER */}
            <div className="h-1/2 xl:w-1/2 xl:h-full relative">
              <Image
                src={slide.img}
                alt={slide.title}
                fill
                sizes="100%"
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute m-auto left-1/2 bottom-8 flex gap-4">
        {slides.map((_, index) => (
          <div
            className={`w-3 h-3 rounded-full ring-1 ring-gray-600 cursor-pointer flex items-center justify-center ${
              current === index ? "scale-150" : ""
            }`}
            key={index}
            onClick={() => setCurrent(index)}
          >
            {current === index && (
              <div className="w-[6px] h-[6px] bg-gray-600 rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
