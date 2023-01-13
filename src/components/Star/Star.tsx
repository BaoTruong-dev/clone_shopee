export default function Star({ rating }: { rating: number }) {
  return (
    <div className='flex items-center'>
      {rating > 0 ? (
        Array(5)
          .fill(0)
          .map((_, index) => {
            let percent = ''
            if (index + 1 < rating) {
              percent = '100%'
            } else if (index + 1 > rating) {
              if (index + 1 - rating < 1) {
                percent = Math.round((rating - index) * 100) + '%'
              } else {
                percent = '0%'
              }
            }
            return (
              <div className='relative h-3 w-3' key={index}>
                <div className={`absolute left-0 top-0 h-10 w-[${percent}] overflow-hidden`}>
                  <svg
                    enableBackground='new 0 0 15 15'
                    viewBox='0 0 15 15'
                    x={0}
                    y={0}
                    className='h-3 w-3 fill-yellow-300 '
                  >
                    <polygon
                      points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeMiterlimit={10}
                    />
                  </svg>
                </div>
                <svg
                  enableBackground='new 0 0 15 15'
                  viewBox='0 0 15 15'
                  x={0}
                  y={0}
                  className='h-full w-full fill-slate-200 '
                >
                  <polygon
                    points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit={10}
                  />
                </svg>
              </div>
            )
          })
      ) : (
        <p className='text-xs text-primary'>Chưa đánh giá</p>
      )}
    </div>
  )
}
