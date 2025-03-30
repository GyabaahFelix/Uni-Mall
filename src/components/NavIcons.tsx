"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import CartModal from "./CartModal";
import { useWixClient } from "@/hooks/useWixClient";
import Cookies from "js-cookie";
import { useCartStore } from "@/hooks/useCartStore";

const NavIcons = () => {
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const router = useRouter();
  const pathName = usePathname();
  const wixClient = useWixClient();
  const isLoggedIn = wixClient.auth.loggedIn();
  const { cart, counter, getCart } = useCartStore();

  // Refs for popups
  const profileRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getCart(wixClient);
  }, [wixClient, getCart]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch("/api/notifications");
        const data = await response.json();
        setNotifications(data.notifications || []);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const togglePopup = (popup: string) => {
    setActivePopup((prev) => (prev === popup ? null : popup));
  };

  const handleProfile = () => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      togglePopup("profile");
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    Cookies.remove("refreshToken");
    const { logoutUrl } = await wixClient.auth.logout(window.location.href);
    setIsLoading(false);
    setActivePopup(null);
    router.push(logoutUrl);
  };

  // Close popups when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node) &&
        cartRef.current &&
        !cartRef.current.contains(event.target as Node) &&
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setActivePopup(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      {/* Profile Icon */}
      <div ref={profileRef} className="relative">
        <Image
          src="/profile.png"
          alt="Profile"
          width={22}
          height={22}
          className="cursor-pointer"
          onClick={handleProfile}
        />
        {activePopup === "profile" && (
          <div className="absolute p-4 rounded-md top-12 left-0 bg-white text-sm shadow-lg z-20">
            <Link href="/profile">Profile</Link>
            <div className="mt-2 cursor-pointer" onClick={handleLogout}>
              {isLoading ? "Logging out..." : "Logout"}
            </div>
          </div>
        )}
      </div>

      {/* Notifications Icon */}
      <div ref={notificationsRef} className="relative cursor-pointer" onClick={() => togglePopup("notifications")}>
        <Image src="/notification.png" alt="Notifications" width={22} height={22} />
        {notifications.length > 0 && (
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full"></div>
        )}
        {activePopup === "notifications" && (
          <div className="absolute p-4 rounded-md top-12 right-0 bg-white text-sm shadow-lg z-20 w-64">
            <h3 className="text-lg font-semibold mb-2">Notifications</h3>
            {notifications.length === 0 ? (
              <p className="text-gray-500">No new notifications</p>
            ) : (
              <ul>
                {notifications.map((notif, index) => (
                  <li key={index} className="p-2 border-b last:border-none">
                    {notif.message}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Cart Icon */}
      <div ref={cartRef} className="relative cursor-pointer" onClick={() => togglePopup("cart")}>
        <Image src="/cart.png" alt="Cart" width={22} height={22} />
        <div className="absolute -top-4 -right-4 w-6 h-6 bg-lama text-white rounded-full text-sm flex items-center justify-center">
          {counter}
        </div>
        {activePopup === "cart" && <CartModal />}
      </div>
    </div>
  );
};

export default NavIcons;
