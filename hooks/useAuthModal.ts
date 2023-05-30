import { create } from "zustand";

interface useAuthModalState {
  isOpen: boolean;
  view: "login" | "signup" | "resetPassword";
  onOpen: (view: "login" | "signup" | "resetPassword") => void;
  onClose: () => void;
}

const useAuthModal = create<useAuthModalState>((set) => ({
  isOpen: false,
  view: "login",
  onOpen: (view: "login" | "signup" | "resetPassword") =>
    set({ isOpen: true, view }),
  onClose: () => set({ isOpen: false }),
}));

export default useAuthModal;
