"use client";

import { Suspense } from "react";
import ProductList from "@/components/ProductList";
import Skeleton from "@/components/Skeleton";

const DealsPage = () => {
  return (
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
        DEALS
      </h1>

      {/* Product List with Suspense */}
      <div className="mt-8">
        <Suspense fallback={<Skeleton />}>
          <ProductList categoryId={process.env.DEALS_CATEGORY_ID!} limit={4} />
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

          .animate-color-shift {
            animation: colorShift 2s infinite linear;
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        `}
      </style>
    </div>
  );
};

export default DealsPage;
