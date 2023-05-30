import { create } from "zustand";

interface userCommunityModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useCommunityModal = create<userCommunityModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useCommunityModal;
