import { AiOutlineClose } from "react-icons/ai";
import { AnimatePresence, motion as m } from "framer-motion";

export default function Modal({
  children,
  onClose,
  isOpen,
}: {
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className="bg-neutral-800/80 fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50"
        >
          {/* Modal Contents */}
          <m.div
            initial={{
              scale: 0.9,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: 0.9,
              opacity: 0,
            }}
            className="
              rounded-lg
              flex
              flex-col
              relative 
              p-4
              bg-white
              w-full md:w-2/3
              max-w-3xl
              min-h-[100px]
              h-full md:h-auto
              gap-6
            "
          >
            <AiOutlineClose
              onClick={onClose}
              className="absolute top-3 right-3 p-2 cursor-pointer hover:opacity-50 transition"
              size={40}
            />
            {children}
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
