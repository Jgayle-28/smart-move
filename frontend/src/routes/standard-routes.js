import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { SvgIcon } from '@mui/material'
import CalendarIcon from 'src/icons/untitled-ui/duocolor/calendar'
import LayoutAlt02Icon from 'src/icons/untitled-ui/duocolor/layout-alt-02'
import LineChartUp04Icon from 'src/icons/untitled-ui/duocolor/line-chart-up-04'
import Share07Icon from 'src/icons/untitled-ui/duocolor/share-07'
import Truck01Icon from 'src/icons/untitled-ui/duocolor/truck-01'
import Users03Icon from 'src/icons/untitled-ui/duocolor/users-03'
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined'

import { tokens } from 'src/locales/tokens'
import { paths } from 'src/paths'

/**
 * Updates the side nav routes
 */

export const useStandardRoutes = () => {
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
            title: t(tokens.nav.inventory),
            path: paths.dashboard.inventory,
            icon: (
              <SvgIcon fontSize='small'>
                <LineChartUp04Icon />
              </SvgIcon>
            ),
          },

          {
            title: 'help',
            path: paths.dashboard.help,
            icon: (
              <SvgIcon fontSize='small'>
                <ContactSupportOutlinedIcon />
              </SvgIcon>
            ),
          },
        ],
      },
    ]
  }, [t])
}
