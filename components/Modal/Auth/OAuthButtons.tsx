"use client";

import Button from "@/components/ui/Button";
import { auth } from "@/firebase/clientApp";
import { filterFirebaseErrors } from "@/firebase/errors";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { FcGoogle } from "react-icons/fc";

export default function OAuthButtons() {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  return (
    <div className="flex flex-col mb-4 w-full">
      <Button
        onClick={() => signInWithGoogle()}
        isLoading={loading}
        oauth
        large
      >
        <FcGoogle size={25} />
        Continue With Gooogle
      </Button>
      {error && (
        <p className="text-sm text-rose-500 text-center">
          {filterFirebaseErrors(error.message)}
        </p>
      )}
    </div>
  );
}
