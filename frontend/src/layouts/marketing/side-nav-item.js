import { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined'
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined'
import { Box, ButtonBase, Collapse, SvgIcon } from '@mui/material'
import { RouterLink } from 'src/components/router-link'

export const SideNavItem = (props) => {
  const {
    active,
    children,
    disabled,
    external,
    open: openProp,
    path,
    title,
  } = props
  const [open, setOpen] = useState(!!openProp)

  const handleToggle = useCallback(() => {
    setOpen((prevOpen) => !prevOpen)
  }, [])

  // Branch

  if (children) {
    return (
      <li>
        <ButtonBase
          disabled={disabled}
          onClick={handleToggle}
          sx={{
            alignItems: 'center',
            borderRadius: 1,
            display: 'flex',
            justifyContent: 'flex-start',
            px: '12px',
            py: '6px',
            textAlign: 'left',
            width: '100%',
            ...(active && {
              backgroundColor: 'action.hover',
            }),
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }}
        >
          <Box
            component='span'
            sx={{
              flexGrow: 1,
              fontFamily: (theme) => theme.typography.fontFamily,
              fontSize: 14,
              fontWeight: 500,
              lineHeight: '24px',
              whiteSpace: 'nowrap',
              ...(active && {
                color: 'primary.main',
              }),
            }}
          >
            {title}
          </Box>
          <SvgIcon
            sx={{
              color: 'action.active',
              fontSize: 16,
              ml: 2,
            }}
            fontSize='small'
          >
            {open ? <ExpandMoreOutlinedIcon /> : <ChevronRightOutlinedIcon />}
          </SvgIcon>
        </ButtonBase>
        <Collapse in={open} sx={{ mt: 0.5 }}>
          {children}
        </Collapse>
      </li>
    )
  }

  // Leaf

  const linkProps = path
    ? external
      ? {
          component: 'a',
          href: path,
          target: '_blank',
        }
      : {
          component: RouterLink,
          href: path,
        }
    : {}

  return (
    <li>
      <ButtonBase
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          display: 'flex',
          justifyContent: 'flex-start',
          px: '12px',
          py: '6px',
          textAlign: 'left',
          width: '100%',
          ...(active && {
            backgroundColor: 'action.hover',
          }),
          '&:hover': {
            backgroundColor: 'action.hover',
          },
        }}
        {...linkProps}
      >
        <Box
          component='span'
          sx={{
            flexGrow: 1,
            fontFamily: (theme) => theme.typography.fontFamily,
            fontSize: 14,
            fontWeight: 500,
            lineHeight: '24px',
            whiteSpace: 'nowrap',
            ...(active && {
              color: 'primary.main',
            }),
          }}
        >
          {title}
        </Box>
      </ButtonBase>
    </li>
  )
}

SideNavItem.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.any,
  depth: PropTypes.number,
  disabled: PropTypes.bool,
  external: PropTypes.bool,
  open: PropTypes.bool,
  path: PropTypes.string,
  title: PropTypes.string.isRequired,
}
