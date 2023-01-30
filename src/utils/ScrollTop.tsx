import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollTop() {
  const param = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [param.pathname])
  return <></>
}
