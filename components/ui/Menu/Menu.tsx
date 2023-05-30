"use client";

import { AnimatePresence, motion as m } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Menu({
  children,
  menuButtonContent,
  fromLeft,
}: {
  children: React.ReactNode;
  menuButtonContent: React.ReactElement;
  fromLeft?: boolean;
}) {
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuListRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Close on click
    const clickHandler = (e: MouseEvent) => {
      // const isClickOutside =
      //   !menuButtonRef.current?.contains(e.target as Node) &&
      //   !menuListRef.current?.contains(e.target as Node);

      // if (isClickOutside) {
      //   setIsOpen(false);
      // }
      const isMenuButtonClicked = menuButtonRef.current?.contains(
        e.target as Node
      );

      if (!isMenuButtonClicked) {
        setIsOpen(false);
      }
    };
    window.addEventListener("click", clickHandler);

    return () => {
      window.removeEventListener("click", clickHandler);
    };
  }, []);

  return (
    <div className="relative">
      <button
        ref={menuButtonRef}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center"
      >
        {menuButtonContent}
      </button>
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{
              scale: 0.85,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: 0.85,
              opacity: 0,
            }}
            transition={{
              duration: 0.1
            }}
            ref={menuListRef}
            className={`
          absolute
          top-11
          py-2
          bg-white
          rounded-lg
          flex
          flex-col
          gap-1
          ${fromLeft ? "left-0" : "right-0"}
        `}
          >
            {children}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
