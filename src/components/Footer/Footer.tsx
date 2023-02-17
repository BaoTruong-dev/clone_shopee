import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation('home')
  return (
    <div className='flex flex-auto py-[20px] text-sm'>
      <div className='container'>
        <div className='mt-[20px] flex flex-col justify-between border-t-[1px] border-slate-200 pt-[40px] lg:flex-row'>
          <div>© 2023 Shopee. {t('footer.rights')}</div>
          <div className='flex flex-wrap items-center'>
            <p className='mr-[5px]'>{t('footer.location')}:</p>
            <p className='mr-[5px] border-r-[1px] border-slate-200 pr-[5px]'>Singapore</p>
            <p className='mr-[5px] border-r-[1px] border-slate-200 pr-[5px]'>Indonesia</p>
            <p className='mr-[5px] border-r-[1px] border-slate-200 pr-[5px]'>Đài Loan</p>
            <p className='mr-[5px] border-r-[1px] border-slate-200 pr-[5px]'>Thái Lan</p>
            <p className='mr-[5px] border-r-[1px] border-slate-200 pr-[5px]'>Malaysia</p>
            <p className='mr-[5px] border-r-[1px] '>Việt Nam</p>
          </div>
        </div>
        <div className='mt-[50px] text-center text-[12px]'>
          <div className='font-semibold text-primary '>{t('footer.company')} Shopee</div>
          <div className='mt-[20px] leading-[22px]'>{t('footer.address')}</div>
        </div>
      </div>
    </div>
  )
}
