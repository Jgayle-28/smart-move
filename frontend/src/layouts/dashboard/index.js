import PropTypes from 'prop-types'
import { withAuthGuard } from 'src/hocs/with-auth-guard'
import { useSettings } from 'src/hooks/use-settings'
import { HorizontalLayout } from './horizontal-layout'
import { VerticalLayout } from './vertical-layout'
import { useSelector } from 'react-redux'
import { useSections } from './config'
import { useStandardRoutes } from 'src/routes/standard-routes'
import { useBusinessRoutes } from 'src/routes/business-routes'
import { useEffect } from 'react'
import { useRouter } from 'src/hooks/use-router'
import { isTokenExpired } from '../../utils/auth'

export const Layout = withAuthGuard((props) => {
  const { company } = useSelector((state) => state.company)

  const settings = useSettings()
  const router = useRouter()
  const subscriptionLevel = company?.subscription?.toLowerCase()

  useEffect(() => {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('sm-user'))
    if (!user) {
      router.push('/login')
    }
    if (user) {
      // Check if token is expired
      if (isTokenExpired(user.token)) {
        // Logout user
        localStorage.removeItem('sm-user')
        // Redirect to login page
        router.push('/login')
      }
    }
  }, [])

  const routes =
    subscriptionLevel === 'standard'
      ? useStandardRoutes()
      : subscriptionLevel === 'business'
      ? useBusinessRoutes()
      : useSections()

  if (settings.layout === 'horizontal') {
    return (
      <HorizontalLayout
        sections={routes}
        navColor={settings.navColor}
        {...props}
      />
    )
  }

  return (
    <VerticalLayout sections={routes} navColor={settings.navColor} {...props} />
  )
})

Layout.propTypes = {
  children: PropTypes.node,
}
