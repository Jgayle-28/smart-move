import { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined'
import {
  Box,
  ButtonBase,
  Paper,
  Portal,
  SvgIcon,
  Typography,
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import { RouterLink } from 'src/components/router-link'

const TOP_NAV_HEIGHT = 64
const TOP_NAV_SPACE = 16
const OFFSET = 16

export const TopNavItem = (props) => {
  const { active, external, path, popover, title, pageId } = props
  const [open, setOpen] = useState(false)

  const handleMouseEnter = useCallback(() => {
    setOpen(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setOpen(false)
  }, [])

  // Scroll to the section with pageId
  const handleClick = (e) => {
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

  // With mega-menu
  if (popover) {
    return (
      <>
        <Box
          component='li'
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: '100%',
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <ButtonBase
            disableRipple
            sx={{
              alignItems: 'center',
              borderRadius: 1,
              display: 'flex',
              justifyContent: 'flex-start',
              px: '16px',
              py: '8px',
              textAlign: 'left',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
              ...(active && {
                color: 'primary.main',
              }),
            }}
            onClick={handleClick}
          >
            <Typography component='span' variant='subtitle2'>
              {title}
            </Typography>
            <SvgIcon
              sx={{
                fontSize: 16,
                ml: 1,
              }}
              fontSize='small'
            >
              <ExpandMoreOutlinedIcon />
            </SvgIcon>
          </ButtonBase>
        </Box>
        {open && (
          <Portal>
            <Box
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              sx={{
                left: 0,
                position: 'fixed',
                pt: OFFSET + 'px',
                right: 0,
                top: TOP_NAV_HEIGHT + TOP_NAV_SPACE,
                zIndex: (theme) => theme.zIndex.appBar + 100,
              }}
            >
              <Paper
                elevation={16}
                sx={{
                  backgroundColor: (theme) =>
                    alpha(theme.palette.background.paper, 0.9),
                  backdropFilter: 'blur(6px)',
                  mx: 'auto',
                  width: (theme) => theme.breakpoints.values.md,
                }}
              >
                {popover}
              </Paper>
            </Box>
          </Portal>
        )}
      </>
    )
  }

  // Simple
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
    <Box
      component='li'
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <ButtonBase
        disableRipple
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          display: 'flex',
          justifyContent: 'flex-start',
          px: '16px',
          py: '8px',
          textAlign: 'left',
          '&:hover': {
            backgroundColor: 'action.hover',
          },
          ...(active && {
            color: 'primary.main',
          }),
        }}
        // {...linkProps}
        onClick={handleClick}
      >
        <Typography component='span' variant='subtitle2'>
          {title}
        </Typography>
      </ButtonBase>
    </Box>
  )
}

TopNavItem.propTypes = {
  active: PropTypes.bool,
  external: PropTypes.bool,
  path: PropTypes.string,
  popover: PropTypes.any,
  title: PropTypes.string.isRequired,
  pageId: PropTypes.string, // Ensure pageId is a string representing the target element's id
}

// import { useCallback, useState } from 'react'
// import PropTypes from 'prop-types'
// import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined'
// import {
//   Box,
//   ButtonBase,
//   Paper,
//   Portal,
//   SvgIcon,
//   Typography,
// } from '@mui/material'
// import { alpha } from '@mui/material/styles'
// import { RouterLink } from 'src/components/router-link'

// const TOP_NAV_HEIGHT = 64
// const TOP_NAV_SPACE = 16
// const OFFSET = 16

// export const TopNavItem = (props) => {
//   const { active, external, path, popover, title,pageId } = props
//   const [open, setOpen] = useState(false)

//   const handleMouseEnter = useCallback(() => {
//     setOpen(true)
//   }, [])

//   const handleMouseLeave = useCallback(() => {
//     setOpen(false)
//   }, [])

//   // With mega-menu

//   if (popover) {
//     return (
//       <>
//         <Box
//           component='li'
//           sx={{
//             display: 'flex',
//             alignItems: 'center',
//             height: '100%',
//           }}
//           onMouseEnter={handleMouseEnter}
//           onMouseLeave={handleMouseLeave}
//         >
//           <ButtonBase
//             disableRipple
//             sx={{
//               alignItems: 'center',
//               borderRadius: 1,
//               display: 'flex',
//               justifyContent: 'flex-start',
//               px: '16px',
//               py: '8px',
//               textAlign: 'left',
//               '&:hover': {
//                 backgroundColor: 'action.hover',
//               },
//               ...(active && {
//                 color: 'primary.main',
//               }),
//             }}
//           >
//             <Typography component='span' variant='subtitle2'>
//               {title}
//             </Typography>
//             <SvgIcon
//               sx={{
//                 fontSize: 16,
//                 ml: 1,
//               }}
//               fontSize='small'
//             >
//               <ExpandMoreOutlinedIcon />
//             </SvgIcon>
//           </ButtonBase>
//         </Box>
//         {open && (
//           <Portal>
//             <Box
//               onMouseEnter={handleMouseEnter}
//               onMouseLeave={handleMouseLeave}
//               sx={{
//                 left: 0,
//                 position: 'fixed',
//                 pt: OFFSET + 'px',
//                 right: 0,
//                 top: TOP_NAV_HEIGHT + TOP_NAV_SPACE,
//                 zIndex: (theme) => theme.zIndex.appBar + 100,
//               }}
//             >
//               <Paper
//                 elevation={16}
//                 sx={{
//                   backgroundColor: (theme) =>
//                     alpha(theme.palette.background.paper, 0.9),
//                   backdropFilter: 'blur(6px)',
//                   mx: 'auto',
//                   width: (theme) => theme.breakpoints.values.md,
//                 }}
//               >
//                 {popover}
//               </Paper>
//             </Box>
//           </Portal>
//         )}
//       </>
//     )
//   }

//   // Simple

//   const linkProps = path
//     ? external
//       ? {
//           component: 'a',
//           href: path,
//           target: '_blank',
//         }
//       : {
//           component: RouterLink,
//           href: path,
//         }
//     : {}

//   return (
//     <Box
//       component='li'
//       sx={{
//         display: 'flex',
//         alignItems: 'center',
//         height: '100%',
//       }}
//     >
//       <ButtonBase
//         disableRipple
//         sx={{
//           alignItems: 'center',
//           borderRadius: 1,
//           display: 'flex',
//           justifyContent: 'flex-start',
//           px: '16px',
//           py: '8px',
//           textAlign: 'left',
//           '&:hover': {
//             backgroundColor: 'action.hover',
//           },
//           ...(active && {
//             color: 'primary.main',
//           }),
//         }}
//         {...linkProps}
//       >
//         <Typography component='span' variant='subtitle2'>
//           {title}
//         </Typography>
//       </ButtonBase>
//     </Box>
//   )
// }

// TopNavItem.propTypes = {
//   active: PropTypes.bool,
//   external: PropTypes.bool,
//   path: PropTypes.string,
//   popover: PropTypes.any,
//   title: PropTypes.string.isRequired,
// }
