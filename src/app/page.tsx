// "use client";

import CategoryList from "@/components/CategoryList";
import ProductList from "@/components/ProductList";
import Skeleton from "@/components/Skeleton";
import Slider from "@/components/Slider";
import About from "@/components/About";
import { WixClientContext } from "@/context/wixContext";
import { useWixClient } from "@/hooks/useWixClient";
import { wixClientServer } from "@/lib/wixClientServer";
import { Suspense, useContext, useEffect } from "react";

const HomePage = async () => {
  // TEST (FETCHING ON THE CLIENT COMPONENT)

  // const wixClient = useWixClient()

  // useEffect(() => {
  //   const getProducts = async () => {
  //     const res = await wixClient.products.queryProducts().find();

  //     console.log(res)
  //   };

  //   getProducts();
  // }, [wixClient]);

  // TEST (FETCHING ON THE SERVER COMPONENT)

  // const wixClient = await wixClientServer();

  // const res = await wixClient.products.queryProducts().find();

  // console.log(res);

  return (
    <div className="">
      <Slider />
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
          SPOTLIGHTS
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

      .animate-color-shift {
        animation: colorShift 2s infinite linear;
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    `}
        </style>
      </div>

      <div className="mt-24">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 text-center uppercase tracking-wider px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mb-12 relative">
          Categories
          <span className="block w-24 md:w-32 h-1 bg-gradient-to-r from-blue-500 to-red-500 mx-auto mt-2"></span>
        </h1>

        <Suspense fallback={<Skeleton />}>
          <CategoryList />
        </Suspense>
      </div>
      {/* <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl">New Products</h1>
        <Suspense fallback={<Skeleton />}>
          <ProductList
            categoryId={process.env.FEATURED_PRODUCTS_NEW_CATEGORY_ID!}
            limit={4}
          />
        </Suspense>
      </div> */}
      <div>
        <About />
      </div>
    </div>
  );
};

export default HomePage;
