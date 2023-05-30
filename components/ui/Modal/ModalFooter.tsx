export default function ModalFooter({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-4 justify-end">
      {children}
    </div>
  )
}