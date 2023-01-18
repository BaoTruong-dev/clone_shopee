import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'

export default function ScrollTop({ children }: { children: React.ReactNode }) {
  const param = useLocation()

  return <div>{children}</div>
}
