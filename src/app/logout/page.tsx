"use client";

import { useWixClient } from "@/hooks/useWixClient";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const LogoutPage = () => {
  const wixClient = useWixClient();
  const router = useRouter();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        await wixClient.auth.logout(window.location.href);
        Cookies.remove("refreshToken");
        router.push("/login");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };

    logoutUser();
  }, [wixClient, router]);

  return (
    <div className="h-[calc(100vh-80px)] flex items-center justify-center">
      <h1 className="text-xl font-semibold">Logging out...</h1>
    </div>
  );
};

export default LogoutPage;
