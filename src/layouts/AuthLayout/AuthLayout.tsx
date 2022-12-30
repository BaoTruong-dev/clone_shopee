import Footer from 'src/components/Footer/Footer'
import HeaderAuth from 'src/components/HeaderAuth/HeaderAuth'

interface Props {
  children?: React.ReactNode
  name?: string | undefined
}

export default function AuthLayout({ children, name }: Props) {
  return (
    <>
      <HeaderAuth name={name} />
      <div className='h-[600px] bg-[url("/src/assets/045577104208573.5f5e3ccd463bc.png")] bg-cover bg-center bg-no-repeat'>
        <div className='m-auto flex h-full max-w-[1070px] items-center justify-end px-[15px]'>{children}</div>
      </div>
      <Footer />
    </>
  )
}
