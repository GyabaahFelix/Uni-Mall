"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ProductList from "../../components/ProductList"; // Import ProductList component

const slides = [
  {
    id: 1,
    title: "Premium Laptops 💻",
    description:
      "Upgrade to high-performance laptops for work, gaming, and creativity. Find the perfect device for your needs.",
    img: "/laptop.jpg",
    bg: "bg-gradient-to-r from-gray-800 to-gray-600",
  },
  {
    id: 2,
    title: "Latest Smartphones 📱",
    description:
      "Explore cutting-edge smartphones with AI-powered cameras, fast processors, and long battery life.",
    img: "/smartphone.jpg",
    bg: "bg-gradient-to-r from-gray-700 to-gray-500",
  },
  {
    id: 3,
    title: "Smart Home Devices 🏠",
    description:
      "Make life easier with smart assistants, security cameras, and automated home gadgets.",
    img: "/smart-home.jpg",
    bg: "bg-gradient-to-r from-gray-600 to-gray-400",
  },
  {
    id: 4,
    title: "Accessories & More 🎧",
    description:
      "From wireless earbuds to gaming keyboards, explore accessories that enhance your experience.",
    img: "/accessories.jpg",
    bg: "bg-gradient-to-r from-gray-500 to-gray-300",
  },
  {
    id: 5,
    title: "Tablets & E-Readers 📚",
    description:
      "Browse tablets and e-readers for work, study, or leisure. Lightweight and perfect for on-the-go.",
    img: "/tablet.jpg",
    bg: "bg-gradient-to-r from-gray-600 to-gray-500",
  },
  {
    id: 6,
    title: "Wearables & Fitness 💪",
    description:
      "Stay connected and track your fitness journey with smartwatches, fitness bands, and more.",
    img: "/wearables.jpg",
    bg: "bg-gradient-to-r from-gray-400 to-gray-200",
  },
];

const Products = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 8000);

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
                  alt={slide.title}
                  fill
                  sizes="100%"
                  className="object-cover brightness-90"
                />
                <div className="absolute inset-0 bg-black/40"></div>
              </div>
            </div>

            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white text-center px-6 py-3 rounded-md">
              <h1 className="text-3xl lg:text-4xl 2xl:text-6xl font-semibold">
                {slide.title}
              </h1>
              <h2 className="text-lg lg:text-xl 2xl:text-2xl max-w-2xl">
                {slide.description}
              </h2>
              <button className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">
                Shop Now
              </button>
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

export default Products;
