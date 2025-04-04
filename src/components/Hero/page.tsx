"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const slides = [
  { src: "/hero1.svg", alt: "Laptops" },
  { src: "/hero2.png", alt: "TVs" },
  { src: "/hero3.png", alt: "Speakers" },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-4 lg:px-16 mt-6">
      {/* Slider Section */}
      <div className="relative w-full h-[500px] overflow-hidden rounded-xl">
        {/* Image Slider Section with Transition */}
        <Image
          src={slides[current].src}
          alt={slides[current].alt}
          fill
          className="rounded-xl object-fit transition-all duration-700 ease-in-out" // Transition for image change
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white p-6">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            {slides[current].alt}
          </h2>
          <Link
            href="/shop"
            className="bg-white text-black px-6 py-2 text-sm rounded-full hover:bg-gray-200 transition"
          >
            Shop Now
          </Link>
        </div>

        {/* Dots for Carousel with Transitions */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrent(index)} // Change slide when clicking the dot
              className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ease-in-out ${
                current === index
                  ? "bg-white scale-110"
                  : "bg-gray-400 scale-90"
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* Right Side Images with same overlay & styles */}
      <div className="flex flex-col gap-4 h-[500px]">
        {/* Top Image */}
        <div className="relative flex-1 overflow-hidden rounded-xl">
          <Image
            src="/hero3.png"
            alt="Promo 1"
            fill
            className="rounded-xl object-fit"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white p-6">
            <h3 className="text-2xl font-semibold mb-2">Promo 1</h3>
          </div>
        </div>

        {/* Bottom Image */}
        <div className="relative flex-1 overflow-hidden rounded-xl">
          <Image
            src="/msi.jpg"
            alt="Promo 2"
            fill
            className="rounded-xl object-fit"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white p-6">
            <h3 className="text-2xl font-semibold mb-2">Promo 2</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
