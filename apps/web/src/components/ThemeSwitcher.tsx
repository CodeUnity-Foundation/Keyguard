"use client";

import { ThemeSwitch } from "@keyguard/ui";
import { useTheme } from "next-themes";
import { useCallback, useMemo } from "react";

export const ThemeSwitcher = () => {
  const { systemTheme, theme, setTheme } = useTheme();

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

  return <ThemeSwitch mode={currentTheme || "dark"} setMode={changeMode} />;
};
