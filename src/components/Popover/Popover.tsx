import { FloatingPortal } from '@floating-ui/react'
import { useFloating, shift } from '@floating-ui/react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'

export default function Popover({
  children,
  contentElement,
  origin = '50%',
  left = 0
}: {
  children: React.ReactNode
  contentElement: React.ReactNode
  origin?: string
  left?: number
}) {
  const [isShowPopover, setIsShowPopover] = useState(false)
  const { x, y, reference, floating, strategy } = useFloating({
    middleware: [shift()]
  })
  const handleShowPopover = () => {
    setIsShowPopover(true)
  }
  const handleHidePopover = () => {
    setIsShowPopover(false)
  }
  return (
    <div ref={reference} onMouseEnter={handleShowPopover} onMouseLeave={handleHidePopover}>
      <div className='relative before:absolute before:bottom-[-10px] before:h-[20px] before:w-full before:bg-transparent'>
        {children}
      </div>
      <FloatingPortal>
        <AnimatePresence>
          {isShowPopover && (
            <motion.div
              initial={{ opacity: 0, transform: 'scale(0)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0)' }}
              transition={{ duration: 0.2 }}
              ref={floating}
              style={{
                position: strategy,
                top: y ? y : 0,
                left: x ? x - left : 0,
                width: 'max-content',
                transformOrigin: `${origin} top`
              }}
              className='mt-[10px] rounded-sm border border-gray-200 bg-white text-[14px] text-black shadow-2xl'
            >
              <>
                {contentElement}
                <span className='border-b-900 pointer-events-none absolute left-[50%] top-[-24%] z-10  block translate-x-[-50%] border-[12px] border-white border-x-transparent border-t-transparent'></span>
              </>
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </div>
  )
}
