// "use client";

import CategoryList from "@/components/CategoryList";
import ProductList from "@/components/ProductList";
import Skeleton from "@/components/Skeleton";
import Hero from "@/components/Hero/page"; // ✅ Import your Hero section here
import { Suspense } from "react";
import Banner from "@/components/Banner";
import { Link } from "lucide-react";

const HomePage = async () => {
  return (
    <div className="">
      {/* ✅ HERO SECTION */}
      <Hero />

      {/* ✅ EXPLORATION SECTION */}
      <div className="relative text-center py-16 px-6 sm:px-10 md:px-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden shadow-inner rounded-xl">
        {/* Decorative Circle Background */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-100 rounded-full opacity-20 animate-ping"></div>
        <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-purple-100 rounded-full opacity-20 animate-pulse"></div>

        {/* Content */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 animate-fade-in">
          Explore Various Brands
        </h1>

        <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6 animate-slide-in" />

        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-6 animate-fade-in-slow">
          Discover top-tier brands in technology and electronics that offer cutting-edge products.
          From laptops and smartphones to gaming systems and home entertainment,
          find the best deals from the biggest names in the industry.
        </p>

        <a href="/list?cat=all-products" className="mt-4 px-6 py-3 bg-blue-600 text-white font-medium rounded-full shadow hover:bg-blue-700 transition duration-300 hover:scale-105">
          Browse Brands
        </a>
      </div>

      {/* ✅ BANNER SECTION */}
      <Banner />

      {/* FEATURED PRODUCTS */}
      <div className="mt-24 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        {/* Animated Title */}
        <h1
          className="w-full text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-transparent bg-clip-text drop-shadow-[6px_6px_15px_rgba(0,0,0,1)] tracking-wider uppercase text-center animate-color-shift"
          style={{
            fontFamily:
              "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
            letterSpacing: "0.15em",
            whiteSpace: "normal", // Allows wrapping on smaller screens
          }}
        >
          DEALS OF THE WEEK!!!
        </h1>

        {/* Product List with Suspense */}
        <div className="mt-8">
          <Suspense fallback={<Skeleton />}>
            <ProductList
              categoryId={process.env.FEATURED_PRODUCTS_CATEGORY_ID!}
              limit={4}
            />
          </Suspense>
        </div>

        {/* CSS for Color Animation */}
        <style>
          {`
            @keyframes colorShift {
              0% { background-image: linear-gradient(to right, red, orange, yellow); }
              25% { background-image: linear-gradient(to right, green, cyan, blue); }
              50% { background-image: linear-gradient(to right, blue, purple, pink); }
              75% { background-image: linear-gradient(to right, pink, red, orange); }
              100% { background-image: linear-gradient(to right, red, orange, yellow); }
            }

            @keyframes fade-in {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }

            @keyframes fade-in-slow {
              from { opacity: 0; transform: translateY(40px); }
              to { opacity: 1; transform: translateY(0); }
            }

            @keyframes slide-in {
              from { transform: scaleX(0); }
              to { transform: scaleX(1); }
            }

            .animate-fade-in {
              animation: fade-in 0.6s ease-out both;
            }

            .animate-fade-in-slow {
              animation: fade-in-slow 1s ease-out both;
            }

            .animate-slide-in {
              animation: slide-in 0.6s ease-out both;
            }

            .animate-color-shift {
              animation: colorShift 2s infinite linear;
              background-clip: text;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
          `}
        </style>
      </div>

      {/* ✅ CATEGORIES SECTION */}
      <div className="mt-24">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 text-center uppercase tracking-wider px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mb-12 relative">
          Categories
          <span className="block w-24 md:w-32 h-1 bg-gradient-to-r from-blue-500 to-red-500 mx-auto mt-2"></span>
        </h1>

        <Suspense fallback={<Skeleton />}>
          <CategoryList />
        </Suspense>
      </div>

      {/* ✅ NEW PRODUCTS SECTION */}
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl">New Products</h1>
        <Suspense fallback={<Skeleton />}>
          <ProductList
            categoryId={process.env.FEATURED_PRODUCTS_NEW_CATEGORY_ID!}
            limit={4}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default HomePage;
