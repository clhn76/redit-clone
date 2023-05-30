const MenuItem = ({
  children,
  onClick,
  gray
}: {
  children: React.ReactNode;
  onClick?: () => void;
  gray?: boolean
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        flex 
        items-center 
        gap-2 
        cursor-pointer 
        text-neutral-600
        transition
        py-2
        px-4
        min-w-[200px]
        ${gray ? 'hover:bg-neutral-200 hover:text-neutral-600' : 'hover:bg-blue-500 hover:text-white'}
      `}
    >
      {children}
    </div>
  );
};

export default MenuItem;
