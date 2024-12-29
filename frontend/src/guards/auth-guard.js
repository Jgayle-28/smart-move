import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { useAuth } from 'src/hooks/use-auth'
import { useRouter } from 'src/hooks/use-router'
import { paths } from 'src/paths'

export const AuthGuard = (props) => {
  const { children } = props
  const router = useRouter()
  const { isAuthenticated, checkingStatus } = useAuth()

  const { user } = useSelector((state) => state.auth)

  // TODO -> Need to check for expired token and add `returnTo:` in search params and update login to redirect if necessary

  useEffect(() => {
    if (!checkingStatus && !isAuthenticated) {
      // const searchParams = new URLSearchParams({ returnTo: window.location.href }).toString();
      // const href = loginPaths[issuer] + `?${searchParams}`;
      router.replace(paths.auth.login)
    }
  }, [isAuthenticated, checkingStatus])

  if (!isAuthenticated) {
    return null
  }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // authenticated / authorized.

  return <>{children}</>
}

AuthGuard.propTypes = {
  children: PropTypes.node,
}
