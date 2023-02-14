import { TFunction } from 'i18next'

export default function MainButton({
  children,
  className,
  ...rest
}: {
  children: JSX.Element | string
  className?: string | undefined
} & React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <button
      {...rest}
      className={`w-max cursor-pointer rounded-[2px] bg-primary py-[10px] px-[15px] text-center text-white
      hover:bg-opacity-[0.8] ${className}`}
    >
      {children}
    </button>
  )
}
