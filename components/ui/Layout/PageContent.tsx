export default function PageContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center py-4">
      <div className="w-[95%] max-w-[860px] flex justify-center">
        {/* LHS */}
        <div className="flex flex-col w-[100%] md:w-[65%] md:mr-6">
          {children && children[0 as keyof typeof children]}
        </div>
        {/* RHS */}
        <div className="hidden md:flex flex-col flex-1 ">
          {children && children[1 as keyof typeof children]}
        </div>
      </div>
    </div>
  );
}
