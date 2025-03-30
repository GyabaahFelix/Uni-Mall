"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data.categories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollByAmount = (amount: number) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full px-6 py-10 bg-gray-50">
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-bold text-gray-800">Shop by Category</h2>
        <p className="mt-3 text-gray-600 text-lg">
          Find the perfect items across different categories, handpicked just
          for you.
        </p>
      </motion.div>

      {!isMobile && (
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-md z-10 hidden md:flex hover:scale-110 transition-transform"
          onClick={() => scrollByAmount(-700)}
        >
          {/* <ChevronLeft size={28} className="text-gray-700" /> */}
        </button>
      )}

      <motion.div
        ref={carouselRef}
        className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 px-4 md:px-6 lg:px-8"
      >
        {categories.map((item) => (
          <motion.div
            key={item._id}
            className="w-full px-3"
            whileHover={{ scale: 1.05 }}
          >
            <Link href={`/list?cat=${item.slug}`} className="block">
              <motion.div
                className="relative bg-white w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.15, delay: 0.1 }}
              >
                <Image
                  src={item.media?.mainMedia?.image?.url || "/cart.png"}
                  alt={item.name || "Category Image"}
                  fill
                  sizes="(max-width: 768px) 100vw, 30vw"
                  className="object-cover"
                  priority
                  unoptimized
                />
              </motion.div>
              <h1 className="mt-4 font-medium text-lg tracking-wide text-center text-gray-700">
                {item.name}
              </h1>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {!isMobile && (
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-md z-10 hidden md:flex hover:scale-110 transition-transform"
          onClick={() => scrollByAmount(700)}
        >
          {/* <ChevronRight size={28} className="text-gray-700" /> */}
        </button>
      )}

      <div className="mt-12 text-center">
        <h3 className="text-2xl font-semibold text-gray-800">
          Why Shop With Us?
        </h3>
        <p className="mt-3 text-gray-600 text-lg">
          We curate high-quality products to meet your needs. Enjoy exclusive
          deals, fast delivery, and outstanding customer support.
        </p>
      </div>
    </div>
  );
};

export default Shop;
