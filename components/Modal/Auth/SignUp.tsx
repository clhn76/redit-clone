"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { auth } from "@/firebase/clientApp";
import { filterFirebaseErrors } from "@/firebase/errors";
import useAuthModal from "@/hooks/useAuthModal";
import { useCallback, useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

export default function SignUp() {
  const { onOpen } = useAuthModal();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const [createUserWithEmailAndPassword, user, loading, authError] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (error) setError("");

      if (password !== confirmPassword) {
        setError("Password do not match!");
        return;
      }

      createUserWithEmailAndPassword(email, password);
    },
    [email, password, confirmPassword, createUserWithEmailAndPassword, error]
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
      <Input
        disabled={loading}
        required
        value={confirmPassword}
        name="confirm-password"
        placeholder="confirm password"
        type="password"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {/* ERROR */}
      {(error || authError) && (
        <p className="text-rose-500 text-center text-sm">
          {error || filterFirebaseErrors(authError?.message)}
        </p>
      )}
      <Button isLoading={loading} type="submit" solid large>
        Sign Up
      </Button>
      <div className="flex items-center justify-center gap-2 text-sm text-neutral-500">
        <p>Already a redditor?</p>
        <p
          onClick={() => onOpen("login")}
          className="font-medium text-blue-400 hover:underline cursor-pointer"
        >
          Log In
        </p>
      </div>
    </form>
  );
}
