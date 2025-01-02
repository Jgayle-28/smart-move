import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Chip, SvgIcon } from '@mui/material'
import BarChartSquare02Icon from 'src/icons/untitled-ui/duocolor/bar-chart-square-02'
import CalendarIcon from 'src/icons/untitled-ui/duocolor/calendar'
import LayoutAlt02Icon from 'src/icons/untitled-ui/duocolor/layout-alt-02'
import Mail04Icon from 'src/icons/untitled-ui/duocolor/mail-04'
import Share07Icon from 'src/icons/untitled-ui/duocolor/share-07'
import Truck01Icon from 'src/icons/untitled-ui/duocolor/truck-01'
import Users03Icon from 'src/icons/untitled-ui/duocolor/users-03'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import { tokens } from 'src/locales/tokens'
import { paths } from 'src/paths'
import { useSelector } from 'react-redux'

/**
 * Updates the side nav routes
 */

export const useBusinessRoutes = () => {
  const { t } = useTranslation()

  return useMemo(() => {
    return [
      {
        items: [
          {
            title: t(tokens.nav.dashboard),
            path: paths.dashboard.index,
            icon: (
              <SvgIcon fontSize='small'>
                <Share07Icon />
              </SvgIcon>
            ),
          },
          {
            title: t(tokens.nav.customers),
            path: paths.dashboard.customers.index,
            icon: (
              <SvgIcon fontSize='small'>
                <Users03Icon />
              </SvgIcon>
            ),
          },
          {
            title: t(tokens.nav.jobs),
            path: paths.dashboard.jobs.index,
            icon: (
              <SvgIcon fontSize='small'>
                <Truck01Icon />
              </SvgIcon>
            ),
          },
          {
            title: t(tokens.nav.estimates),
            path: paths.dashboard.estimates.index,
            icon: (
              <SvgIcon fontSize='small'>
                <LayoutAlt02Icon />
              </SvgIcon>
            ),
          },
          {
            title: t(tokens.nav.calendar),
            path: paths.dashboard.calendar,
            icon: (
              <SvgIcon fontSize='small'>
                <CalendarIcon />
              </SvgIcon>
            ),
          },
          {
            title: t(tokens.nav.analytics),
            path: paths.dashboard.analytics,
            icon: (
              <SvgIcon fontSize='small'>
                <BarChartSquare02Icon />
              </SvgIcon>
            ),
          },

          {
            title: t(tokens.nav.account),
            path: paths.dashboard.account,
            icon: (
              <SvgIcon fontSize='small'>
                <AddOutlinedIcon />
              </SvgIcon>
            ),
          },
          {
            title: t(tokens.nav.contact),
            path: paths.contact,
            icon: (
              <SvgIcon fontSize='small'>
                <Mail04Icon />
              </SvgIcon>
            ),
          },
        ],
      },
    ]
  }, [t])
}
