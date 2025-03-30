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
    id: 4,
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
    <div className="mt-24 mb-48">
      {/* SLIDESHOW SECTION (UNCHANGED) */}
      <div className="relative h-[calc(100vh-80px)] overflow-hidden">
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

              <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white px-6 py-3 rounded-md text-center">
                <h1 className="text-3xl lg:text-4xl 2xl:text-6xl font-semibold">
                  {slide.title}
                </h1>
                <h2 className="text-lg lg:text-xl 2xl:text-2xl max-w-2xl">
                  {slide.description}
                </h2>
                <p className="text-sm">
                  - With appreciation from the UNIMALL team
                </p>
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

      {/* ABOUT US SECTION */}
      <section className="py-16 px-6 lg:px-20 text-center bg-gray-50">
        <h2 className="text-4xl font-bold text-gray-800">About Uni Mall</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-4xl mx-auto">
          Uni Mall is more than just an online store. We are a passionate team
          dedicated to bringing you the best shopping experience, blending
          convenience with innovation. Our platform is built on trust, quality,
          and customer satisfaction.
        </p>
      </section>

      {/* MISSION, VISION, VALUES */}
      <section className="py-16 px-6 lg:px-20 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        <div className="bg-white shadow-lg rounded-xl p-8">
          <h3 className="text-2xl font-bold text-gray-800">🌍 Our Mission</h3>
          <p className="mt-4 text-gray-600">
            To revolutionize online shopping by offering quality products at the
            best prices, while making shopping simple, fast, and enjoyable.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-8">
          <h3 className="text-2xl font-bold text-gray-800">🚀 Our Vision</h3>
          <p className="mt-4 text-gray-600">
            To become the leading online shopping platform that connects people
            with their desired products seamlessly.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-8">
          <h3 className="text-2xl font-bold text-gray-800">💡 Core Values</h3>
          <ul className="mt-4 text-gray-600 space-y-2">
            <li>✅ Customer Satisfaction</li>
            <li>✅ Integrity & Transparency</li>
            <li>✅ Innovation & Excellence</li>
            <li>✅ Community & Sustainability</li>
          </ul>
        </div>
      </section>

      {/* MEET THE TEAM */}
      <section className="py-16 px-6 lg:px-20 text-center bg-gray-100">
        <h2 className="text-4xl font-bold text-gray-800">Meet Our Team</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          Our team consists of passionate individuals who work tirelessly to
          provide you with the best shopping experience. Their dedication,
          creativity, and expertise make Uni Mall a success.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-8">
          <div className="relative bg-white shadow-lg rounded-xl overflow-hidden w-64 h-80">
            {/* Background Image */}
            <Image
              src="/felix.jpg"
              alt="Team Member"
              layout="fill" // Ensures image covers entire div
              objectFit="cover" // Makes the image fill the box
              className="absolute inset-0"
            />

            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Text Content in Front */}
            <div className="absolute inset-0 flex flex-col items-center justify-end p-4 text-white text-center">
              <h4 className="text-lg font-semibold">Felix Best</h4>
              <p className="text-sm">Lead Developer</p>
            </div>
          </div>
          <div className="relative bg-white shadow-lg rounded-xl overflow-hidden w-64 h-80">
            {/* Background Image */}
            <Image
              src="/dennis.jpg"
              alt="Team Member"
              layout="fill" // Ensures image covers entire div
              objectFit="cover" // Makes the image fill the box
              className="absolute inset-0"
            />

            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Text Content in Front */}
            <div className="absolute inset-0 flex flex-col items-center justify-end p-4 text-white text-center">
              <h4 className="text-lg font-semibold">Dennis Anim</h4>
              <p className="text-sm">Lead Developer</p>
            </div>
          </div>
          <div className="relative bg-white shadow-lg rounded-xl overflow-hidden w-64 h-80">
            {/* Background Image */}
            <Image
              src="/daniel.jpg"
              alt="Team Member"
              layout="fill" // Ensures image covers entire div
              objectFit="cover" // Makes the image fill the box
              className="absolute inset-0"
            />

            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Text Content in Front */}
            <div className="absolute inset-0 flex flex-col items-center justify-end p-4 text-white text-center">
              <h4 className="text-lg font-semibold">Daniel Nti Awuku</h4>
              <p className="text-sm">Lead Developer</p>
            </div>
          </div>
          <div className="relative bg-white shadow-lg rounded-xl overflow-hidden w-64 h-80">
            {/* Background Image */}
            <Image
              src="/eunice.jpg"
              alt="Team Member"
              layout="fill" // Ensures image covers entire div
              objectFit="cover" // Makes the image fill the box
              className="absolute inset-0"
            />

            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Text Content in Front */}
            <div className="absolute inset-0 flex flex-col items-center justify-end p-4 text-white text-center">
              <h4 className="text-lg font-semibold">Eunice Yaa Akligo</h4>
              <p className="text-sm">Lead Developer</p>
            </div>
          </div>

         
        </div>
      </section>
    </div>
  );
};

export default About;
