"use client";

export default function ModalHeader({
  children,
  alignLeft
}: {
  children: React.ReactNode;
  alignLeft?: boolean
}) {
  return (
    <div
      className={`
        flex
        ${alignLeft ? 'justify-start' : 'justify-center'}
        items-center
        w-full
        text-2xl
        font-medium
        `}
    >
      {children}
    </div>
  );
}
