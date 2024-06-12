"use client";
import { useTheme } from "next-themes";

import React, { useEffect, useState } from "react";

import { DesktopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import Link from "next/link";

function Logo() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // avoid rehydration errors

  return (
   < Link href={"/"}>
    <img 
      src={theme === 'dark' ? "http://data.asset.api.neuralinverse.tech/assets/logo/NI0.png" : "http://data.asset.api.neuralinverse.tech/assets/logo/logo.jpg"} 
      alt="Neural Inverse Logo" 
      className="w-[3rem] h-[3rem]" 
    />
    </Link>
  );
}

export default Logo;
