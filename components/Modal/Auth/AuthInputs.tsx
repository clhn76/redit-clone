'use client'

import useAuthModal from "@/hooks/useAuthModal"
import Login from "./Login"
import SignUp from "./SignUp"

export default function AuthInputs() {
  const {view} = useAuthModal()

  return (
    <div
      className="
        flex
        flex-col
        items-center
        w-full
      "
    >
      {view === 'login' && <Login />}
      {view === 'signup' && <SignUp />}
    </div>
  )
}