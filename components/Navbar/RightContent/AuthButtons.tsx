'use client'

import Button from "@/components/ui/Button";
import useAuthModal from "@/hooks/useAuthModal";

export default function AuthButtons() {
  const {onOpen} = useAuthModal()

  return (
    <div className="flex items-center gap-2">
      <Button onClick={() => onOpen('login')} className="hidden sm:flex sm:w-[80px] md:w-[110px]" outline>Log In</Button>
      <Button onClick={() => onOpen('signup')} className="hidden sm:flex sm:w-[80px] md:w-[110px]" solid>Sign Up</Button>
    </div>
  )
}   