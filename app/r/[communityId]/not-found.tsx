'use client'

import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-4">
      <h1 className="text-xl text-neutral-600">Sorry, that community does not exist or has been banned</h1>
      <Button large solid onClick={() => router.push('/')}>
        Go Home
      </Button>
    </div>
  )
}