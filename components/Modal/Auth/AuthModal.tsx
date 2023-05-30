"use client";

import Modal from "@/components/ui/Modal/Modal";
import ModalBody from "@/components/ui/Modal/ModalBody";
import ModalHeader from "@/components/ui/Modal/ModalHeader";

import useAuthModal from "@/hooks/useAuthModal";
import AuthInputs from "./AuthInputs";
import OAuthButtons from "./OAuthButtons";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import { useEffect } from "react";
import ResetPassword from "./ResetPassword";

export default function AuthModal() {
  const { isOpen, onClose, view } = useAuthModal();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (user) onClose();
    console.log("USER: ", user);
  }, [user, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>
        {view === "login" && "Login"}
        {view === "signup" && "Sign Up"}
        {view === "resetPassword" && "Reset Password"}
      </ModalHeader>
      <ModalBody>
        <div
          className="
            flex
            flex-col
            items-center
            w-[70%]
          "
        >
          {view === "resetPassword" ? (
            <ResetPassword />
          ) : (
            <>
              <OAuthButtons />
              <p className="text-neutral-400 text-sm">OR</p>
              <AuthInputs />
            </>
          )}
        </div>
      </ModalBody>
    </Modal>
  );
}
