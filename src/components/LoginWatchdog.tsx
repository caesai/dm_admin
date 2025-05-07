import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export const LoginWatchdog = () => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const access_token = localStorage.getItem('access_token')
    const expires_in = localStorage.getItem('expires_in')

    if (!access_token || !expires_in) {
      if (location.pathname !== '/login') {
        navigate('/login')
      }
    }
  }, [location])
  useEffect(() => {
    const intervalId = setInterval(() => {
      const access_token = localStorage.getItem('access_token')
      const expires_in = localStorage.getItem('expires_in')
      const now = Date.now().valueOf()
      if (!access_token || !expires_in || now >= parseInt(expires_in)) {
        if (location.pathname !== '/login') {
          navigate('/login')
        }
      }
    }, 5000)
    return () => clearInterval(intervalId)
  }, [])
  return <></>
}
