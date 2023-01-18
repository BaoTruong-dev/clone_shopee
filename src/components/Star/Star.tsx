export default function Star({
  rating,
  size,
  color,
  transparent
}: {
  rating: number
  size?: string
  color?: string
  transparent?: boolean
}) {
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
              <div className={`relative h-3 w-3 ${size}`} key={index}>
                <div className={`absolute left-0 top-0 h-full overflow-hidden`} style={{ width: percent }}>
                  <svg
                    enableBackground='new 0 0 15 15'
                    viewBox='0 0 15 15'
                    x={0}
                    y={0}
                    className={`size h-3 w-3 fill-yellow-300 ${size} `}
                    style={{ fill: color }}
                  >
                    <polygon
                      points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeMiterlimit={10}
                    />
                  </svg>
                </div>
                {transparent ? (
                  <svg viewBox='0 0 30 30' className='h-4 w-4'>
                    <defs>
                      <linearGradient id='star__hollow' x1='50%' x2='50%' y1='0%' y2='99.0177926%'>
                        <stop offset='0%' stopColor='#ee4d2d' />
                        <stop offset='100%' stopColor='#ee4d2d' />
                      </linearGradient>
                    </defs>
                    <path
                      fill='none'
                      fillRule='evenodd'
                      stroke='url(#star__hollow)'
                      strokeWidth={2}
                      d='M23.226809 28.390899l-1.543364-9.5505903 6.600997-6.8291523-9.116272-1.4059447-4.01304-8.63019038-4.013041 8.63019038-9.116271 1.4059447 6.600997 6.8291523-1.543364 9.5505903 8.071679-4.5038874 8.071679 4.5038874z'
                    />
                  </svg>
                ) : (
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
                )}
              </div>
            )
          })
      ) : (
        <p className='text-xs text-primary'>Chưa đánh giá</p>
      )}
    </div>
  )
}
