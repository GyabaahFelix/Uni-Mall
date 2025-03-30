"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa"; // FontAwesome close icon
import Image from "next/image";

const Menu = () => {
  const [open, setOpen] = useState(false);

  // Prevent scrolling when the menu is open
  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Cleanup on unmount
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  return (
    <div className="relative">
      {/* Menu Button with Transition */}
      <Image
        src="/menu.png"
        alt="Menu"
        width={28}
        height={28}
        className={`cursor-pointer transition-transform duration-300 ${
          open ? "scale-0" : "scale-100"
        }`}
        onClick={() => setOpen(true)}
      />

      {/* Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black text-white flex flex-col items-center justify-center gap-8 text-xl z-50 
        transition-all duration-500 ease-in-out transform 
        ${open ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"}`}
      >
        {/* Close Button with Animation */}
        <FaTimes
          className="absolute top-6 right-6 text-white text-2xl cursor-pointer transition-transform duration-300 transform hover:rotate-90"
          onClick={() => setOpen(false)}
        />

        <Link href="/" onClick={() => setOpen(false)}>Homepage</Link>
        <Link href="/shop" onClick={() => setOpen(false)}>Shop</Link>
        {/* <Link href="/deals" onClick={() => setOpen(false)}>Deals</Link> */}
        <Link href="/about" onClick={() => setOpen(false)}>About</Link>
        <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
        <Link href="/cart" onClick={() => setOpen(false)}>Cart</Link>
        <Link href="/profile" onClick={() => setOpen(false)}>Profile</Link>
        <Link href="/logout" onClick={() => setOpen(false)}>Logout</Link>
      </div>
    </div>
  );
};

export default Menu;
