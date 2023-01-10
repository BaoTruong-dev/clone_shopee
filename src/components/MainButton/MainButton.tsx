export default function MainButton({
  children,
  className
}: {
  children: JSX.Element | string
  className?: string | undefined
}) {
  return (
    <div
      className={`w-full cursor-pointer rounded-[2px] bg-primary py-[10px] px-[15px] text-center text-white
      hover:bg-opacity-[0.8] ${className}`}
    >
      {children}
    </div>
  )
}
