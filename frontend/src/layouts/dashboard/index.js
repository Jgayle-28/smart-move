import PropTypes from 'prop-types'
import { withAuthGuard } from 'src/hocs/with-auth-guard'
import { useSettings } from 'src/hooks/use-settings'
import { HorizontalLayout } from './horizontal-layout'
import { VerticalLayout } from './vertical-layout'
import { useSelector } from 'react-redux'
import { useSections } from './config'
import { useStandardRoutes } from 'src/routes/standard-routes'
import { useBusinessRoutes } from 'src/routes/business-routes'

export const Layout = withAuthGuard((props) => {
  const { company } = useSelector((state) => state.company)
  console.log('company :>> ', company)
  const settings = useSettings()
  const subscriptionLevel = company?.subscription?.toLowerCase()

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
