import { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Button,
  Chip,
  Container,
  IconButton,
  Stack,
  SvgIcon,
  useMediaQuery,
} from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import LoginIcon from '@mui/icons-material/Login'
import { alpha } from '@mui/material/styles'
import { Logo } from 'src/components/logo'
import { RouterLink } from 'src/components/router-link'
import { usePathname } from 'src/hooks/use-pathname'
import { useWindowScroll } from 'src/hooks/use-window-scroll'
import { paths } from 'src/paths'
import { PagesPopover } from './pages-popover'
import { TopNavItem } from './top-nav-item'
import { useSelector } from 'react-redux'

const items = [
  {
    title: 'Features',
    path: paths.components.index,
    pageId: 'features',
  },
  {
    title: 'Pricing',
    path: paths.components.index,
    pageId: 'pricing',
  },

  // {
  //   title: 'Components',
  //   path: paths.components.index,
  // },
  // {
  //   title: 'Pages',
  //   popover: <PagesPopover />,
  // },
  {
    title: 'Road Map',
    path: paths.components.index,
  },
]

const TOP_NAV_HEIGHT = 64

export const TopNav = (props) => {
  const { onMobileNavOpen } = props
  const pathname = usePathname()
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'))
  const [elevate, setElevate] = useState(false)
  const offset = 64
  const delay = 100
  const { user } = useSelector((state) => state.auth)

  const handleWindowScroll = useCallback(() => {
    if (window.scrollY > offset) {
      setElevate(true)
    } else {
      setElevate(false)
    }
  }, [])

  useWindowScroll({
    handler: handleWindowScroll,
    delay,
  })

  const handleClick = (pageId) => {
    if (pageId) {
      const targetElement = document.getElementById(pageId)
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth', // Smooth scroll
          block: 'start', // Scroll to the top of the element
        })
      }
    }
  }

  return (
    <Box
      component='header'
      sx={{
        left: 0,
        position: 'fixed',
        right: 0,
        top: 0,
        pt: 2,
        zIndex: (theme) => theme.zIndex.appBar,
      }}
    >
      <Container
        maxWidth='lg'
        sx={{
          backdropFilter: 'blur(6px)',
          backgroundColor: 'transparent',
          borderRadius: 2.5,
          boxShadow: 'none',
          transition: (theme) =>
            theme.transitions.create('box-shadow, background-color', {
              easing: theme.transitions.easing.easeInOut,
              duration: 200,
            }),
          ...(elevate && {
            backgroundColor: (theme) =>
              alpha(theme.palette.background.paper, 0.9),
            boxShadow: 8,
          }),
        }}
      >
        <Stack direction='row' spacing={2} sx={{ height: TOP_NAV_HEIGHT }}>
          <Stack
            alignItems='center'
            direction='row'
            spacing={1}
            sx={{ flexGrow: 1 }}
          >
            <Stack
              alignItems='center'
              component={RouterLink}
              direction='row'
              display='inline-flex'
              href={paths.index}
              spacing={1}
              sx={{ textDecoration: 'none' }}
            >
              <Box
                sx={{
                  display: 'inline-flex',
                  height: 24,
                  width: 24,
                }}
              >
                <Logo />
              </Box>
              {mdUp && (
                <Box
                  sx={{
                    color: 'text.primary',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 14,
                    fontWeight: 800,
                    letterSpacing: '0.3px',
                    lineHeight: 2.5,
                    '& span': {
                      color: 'primary.main',
                    },
                  }}
                >
                  Deliverly <span>PRO</span>
                </Box>
              )}
            </Stack>
            <Chip label='v1.1.0' size='small' />
          </Stack>
          {mdUp && (
            <Stack alignItems='center' direction='row' spacing={2}>
              <Box component='nav' sx={{ height: '100%' }}>
                <Stack
                  component='ul'
                  alignItems='center'
                  justifyContent='center'
                  direction='row'
                  spacing={1}
                  sx={{
                    height: '100%',
                    listStyle: 'none',
                    m: 0,
                    p: 0,
                  }}
                >
                  <>
                    {items.map((item) => {
                      const checkPath = !!(item.path && pathname)
                      const partialMatch = checkPath
                        ? pathname.includes(item.path)
                        : false
                      const exactMatch = checkPath
                        ? pathname === item.path
                        : false
                      const active = item.popover ? partialMatch : exactMatch

                      return (
                        <TopNavItem
                          pageId={item.pageId}
                          active={active}
                          external={item.external}
                          key={item.title}
                          path={item.path}
                          popover={item.popover}
                          title={item.title}
                        />
                      )
                    })}
                  </>
                </Stack>
              </Box>
            </Stack>
          )}
          <Stack
            alignItems='center'
            direction='row'
            justifyContent='flex-end'
            spacing={2}
            sx={{ flexGrow: 1 }}
          >
            <Button
              // component='a'
              size={mdUp ? 'medium' : 'small'}
              // href='#pricing'
              // target='_blank'
              variant='contained'
              onClick={() => handleClick('pricing')}
            >
              Start Free Trial
            </Button>
            {user ? (
              <Button
                component={RouterLink}
                size={mdUp ? 'medium' : 'small'}
                href='/dashboard'
                variant='outlined'
                startIcon={
                  <SvgIcon>
                    <DashboardIcon />
                  </SvgIcon>
                }
              >
                Dashboard
              </Button>
            ) : (
              <Button
                component={RouterLink}
                size={mdUp ? 'medium' : 'small'}
                href='/login'
                variant='outlined'
                startIcon={
                  <SvgIcon>
                    <LoginIcon />
                  </SvgIcon>
                }
              >
                Login
              </Button>
            )}
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}

TopNav.propTypes = {
  onMobileNavOpen: PropTypes.func,
}
