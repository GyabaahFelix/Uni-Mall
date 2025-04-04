"use client";

import Link from "next/link";
import Menu from "./Menu";
import Image from "next/image";
import SearchBar from "./SearchBar";
import dynamic from "next/dynamic";

// Dynamically import NavIcons to prevent SSR issues
const NavIcons = dynamic(() => import("./NavIcons"), { ssr: false });

const Navbar = () => {
  return (
    <div className="h-20 px-4 md:px-6 lg:px-10 xl:px-16 2xl:px-24 flex items-center justify-between">
      {/* LEFT - UNI MALL LOGO */}
      <div className="flex items-center">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/xivhalogo.png" alt="Uni Mall Logo" width={200} height={200} />

        </Link>
      </div>

      {/* CENTER - NAVIGATION LINKS */}
      <div className="hidden md:flex flex-1 justify-center gap-6 lg:gap-8">
        <Link href="/" className="text-base md:text-lg font-semibold hover:text-blue-600 transition">
          Home
        </Link>
        <Link href="/list?cat=all-products" className="text-base md:text-lg font-semibold hover:text-blue-600 transition">
        Products
        </Link>
        <Link href="/list?cat=featured-products" className="text-base md:text-lg font-semibold hover:text-blue-600 transition">
          Deals
        </Link>
        <Link href="/contact" className="text-base md:text-lg font-semibold hover:text-blue-600 transition">
          Contact
        </Link>
      </div>

      {/* RIGHT - MENU & NAV ICONS */}
      <div className="flex items-center gap-4">
        {/* Menu Button (only for small screens) */}
        <div className="md:hidden">
          <Menu />
        </div>

        {/* SearchBar & Icons (hidden on small screens) */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          <SearchBar />
          <NavIcons />
        </div>
      </div>
    </div>
  );
};

export default Navbar;