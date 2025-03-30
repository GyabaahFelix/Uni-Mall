"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSwipeable } from "react-swipeable";
import gsap from "gsap";

const ITEMS_PER_PAGE = 4;

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data.categories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex + ITEMS_PER_PAGE < categories.length;

  const animateSlide = (direction) => {
    const tl = gsap.timeline();
    tl.to(containerRef.current, {
      x: direction > 0 ? "-100%" : "100%",
      duration: 0.5,
      ease: "power2.inOut",
    })
      .set(containerRef.current, { x: direction > 0 ? "100%" : "-100%" })
      .to(containerRef.current, { x: "0%", duration: 0.5, ease: "power2.inOut" });
  };

  const handleNext = () => {
    if (canGoNext) {
      animateSlide(1);
      setCurrentIndex((prevIndex) => prevIndex + ITEMS_PER_PAGE);
    }
  };

  const handlePrev = () => {
    if (canGoPrev) {
      animateSlide(-1);
      setCurrentIndex((prevIndex) => prevIndex - ITEMS_PER_PAGE);
    }
  };

  // Swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  // Ensure categories always render in multiples of 4
  const displayedCategories = [...categories.slice(currentIndex, currentIndex + ITEMS_PER_PAGE)];
  while (displayedCategories.length < ITEMS_PER_PAGE) {
    displayedCategories.push(null);
  }

  return (
    <div {...handlers} className="relative w-full px-4 overflow-hidden">
      {/* Category Grid */}
      <div className="overflow-hidden relative">
        <div
          ref={containerRef}
          className="grid grid-cols-2 grid-rows-2 gap-4 sm:flex sm:gap-6 sm:scrollbar-hide transition-transform"
        >
          {displayedCategories.map((item, index) => (
            <div key={index} className="w-full min-h-[160px] sm:min-h-[200px]">
              {item ? (
                <Link href={`/list?cat=${item.slug}`} className="block">
                  <div className="relative bg-slate-100 w-full h-40 sm:h-64 rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src={item.media?.mainMedia?.image?.url || "/cart.png"}
                      alt={item.name || "Category Image"}
                      fill
                      sizes="20vw"
                      className="object-cover"
                      priority
                      unoptimized
                    />
                  </div>
                  <h1 className="mt-2 sm:mt-4 font-light text-sm sm:text-lg tracking-wide text-center">
                    {item.name}
                  </h1>
                </Link>
              ) : (
                <div className="bg-gray-100 w-full h-40 sm:h-64 rounded-lg opacity-50"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Buttons */}
      <div className="flex justify-center gap-6 mt-4 sm:flex">
        {canGoPrev && (
          <button className="bg-gray-200 p-3 rounded-full shadow-md" onClick={handlePrev}>
            <ChevronLeft size={24} />
          </button>
        )}
        {canGoNext && (
          <button className="bg-gray-200 p-3 rounded-full shadow-md" onClick={handleNext}>
            <ChevronRight size={24} />
          </button>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
