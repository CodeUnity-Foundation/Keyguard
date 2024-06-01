"use client";

import { FaSun } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";

interface ModeSwitchProps {
  mode: string;
  setMode: () => void;
}

export const ThemeSwitch = ({ mode, setMode }: ModeSwitchProps) => {
  return (
    <div
      className="bg-muted-300 dark:bg-muted-700 hover:text-primary flex h-10 w-10 items-center justify-center rounded-full hover:cursor-pointer"
      onClick={setMode}>
      {mode === "dark" ? <FaSun /> : <MdDarkMode />}
    </div>
  );
};
