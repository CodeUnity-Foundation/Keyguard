"use client";

import { ThemeSwitch } from "@keyguard/ui";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useMemo, useState } from "react";

export const ThemeSwitcher = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const currentTheme = useMemo(() => {
    return theme === "system" ? systemTheme : theme;
  }, [theme, systemTheme]);

  const changeMode = useCallback(() => {
    if (currentTheme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }, [currentTheme]);

  if (!isMounted) {
    return null;
  }

  return <ThemeSwitch mode={currentTheme || "dark"} setMode={changeMode} />;
};
