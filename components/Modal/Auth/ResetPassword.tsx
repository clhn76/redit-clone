"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { auth } from "@/firebase/clientApp";
import { filterFirebaseErrors } from "@/firebase/errors";
import useAuthModal from "@/hooks/useAuthModal";
import { useCallback, useState } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { BsReddit, BsDot } from "react-icons/bs";

export default function ResetPassword() {
  const { onOpen } = useAuthModal();

  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      await sendPasswordResetEmail(email);
      setSuccess(true);
    },
    [sendPasswordResetEmail, email]
  );

  return (
    <div className="flex flex-col w-full gap-2 py-6">
      <BsReddit className="text-brand-100 mx-auto" size={50} />
      <p className="text-center text-lg font-semibold text-neutral-600">
        Reset your password
      </p>
      {success ? (
        <p className="text-center text-blue-600 text-lg font-semibold">
          {'Email sent, Check your Email :)'}
        </p>
      ) : (
        <>
          <p className="text-center text-neutral-400">
            Enter the email associated with your account and we will send you a
            reset link
          </p>
          <form onSubmit={handleSubmit} className="py-4 flex flex-col gap-3">
            <Input
              disabled={sending}
              required
              name="email"
              placeholder="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            {error && (
              <p className="text-center text-rose-500 text-sm">
                {filterFirebaseErrors(error.message)}
              </p>
            )}
            <Button isLoading={sending} type="submit" solid large>
              Reset Password
            </Button>
          </form>
        </>
      )}

      <div className="flex items-center justify-center text-blue-400 text-sm">
        <p
          onClick={() => onOpen("login")}
          className="cursor-pointer hover:underline"
        >
          Login
        </p>
        <BsDot />
        <p
          onClick={() => onOpen("signup")}
          className="cursor-pointer hover:underline"
        >
          Sign Up
        </p>
      </div>
    </div>
  );
}
