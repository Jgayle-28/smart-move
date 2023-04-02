import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export const useAuth = () => {
  const [checkingStatus, setCheckingStatus] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const { user } = useSelector((state) => state.auth)

  useEffect(
    () => {
      if (user) {
        console.log('I am in the user check')
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
      }
      setCheckingStatus(false)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  )

  return { isAuthenticated, checkingStatus, setIsAuthenticated, user }
}
