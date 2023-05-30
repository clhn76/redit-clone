"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { auth } from "@/firebase/clientApp";
import { filterFirebaseErrors } from "@/firebase/errors";
import useAuthModal from "@/hooks/useAuthModal";
import { useCallback, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

export default function Login() {
  const { onOpen } = useAuthModal();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      signInWithEmailAndPassword(email, password);
    },
    [email, password, signInWithEmailAndPassword]
  );

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 py-6">
      <Input
        disabled={loading}
        required
        value={email}
        name="eamil"
        placeholder="email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        disabled={loading}
        required
        value={password}
        name="password"
        placeholder="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      {/* ERROR */}
      {(error) && (
        <p className="text-rose-500 text-center text-sm">
          {filterFirebaseErrors(error.message)}
        </p>
      )}
      {/* Submit Button */}
      <Button isLoading={loading} type="submit" solid large>
        Log In
      </Button>
      {/* Reset Password */}
      <div className="flex items-center justify-center gap-2 text-sm text-neutral-500">
        <p>Forgot your password</p>
        <p
          onClick={() => onOpen("resetPassword")}
          className="text-blue-400 hover:underline cursor-pointer"
        >
          Reset Password
        </p>
      </div>
      {/* Switch to Sign Up */}
      <div className="flex items-center justify-center gap-2 text-sm text-neutral-500">
        <p>New here?</p>
        <p
          onClick={() => onOpen("signup")}
          className="font-medium text-blue-400 hover:underline cursor-pointer"
        >
          Sign Up
        </p>
      </div>
    </form>
  );
}
