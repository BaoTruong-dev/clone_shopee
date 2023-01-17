export default function MainButton({
  children,
  className,
  ...rest
}: {
  children: JSX.Element | string
  className?: string | undefined
} & React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <div
      {...rest}
      className={`w-full cursor-pointer rounded-[2px] bg-primary py-[10px] px-[15px] text-center text-white
      hover:bg-opacity-[0.8] ${className}`}
    >
      {children}
    </div>
  )
}
