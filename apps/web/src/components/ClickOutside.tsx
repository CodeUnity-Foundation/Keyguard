"use client";

import { useEffect, useRef } from "react";

interface ClickOutSideProps {
  children: React.ReactNode;
  exceptionRef?: React.RefObject<HTMLElement>;
  onClick: () => void;
  className?: string;
}

export default function ClickOutside({ children, exceptionRef, onClick, className }: ClickOutSideProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickListener = (event: MouseEvent) => {
      let clickedInside: null | boolean = false;
      if (exceptionRef) {
        clickedInside =
          (wrapperRef.current && wrapperRef.current.contains(event.target as Node)) ||
          (exceptionRef.current && exceptionRef.current === event.target) ||
          (exceptionRef.current && exceptionRef.current.contains(event.target as Node));
      } else {
        clickedInside = wrapperRef.current && wrapperRef.current.contains(event.target as Node);
      }

      if (!clickedInside) onClick();
    };

    document.addEventListener("mousedown", handleClickListener);

    return () => {
      document.removeEventListener("mousedown", handleClickListener);
    };
  }, [exceptionRef, onClick]);

  return (
    <div ref={wrapperRef} className={`${className || ""}`}>
      {children}
    </div>
  );
}
