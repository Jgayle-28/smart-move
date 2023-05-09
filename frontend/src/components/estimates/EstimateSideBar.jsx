import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd'
import XIcon from '@untitled-ui/icons-react/build/esm/X'
import {
  Box,
  Card,
  Checkbox,
  Divider,
  Drawer,
  FormControlLabel,
  FormGroup,
  FormLabel,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  OutlinedInput,
  Stack,
  SvgIcon,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Scrollbar } from 'src/components/scrollbar'
import { roomList } from './inventory/constants'

export const EstimateSideBar = (props) => {
  const {
    handleClick,
    currentSelection,
    currentTab,
    container,
    filters = {},
    group,
    onClose,
    onFiltersChange,
    onGroupChange,
    open,
    ...other
  } = props
  const [dense, setDense] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const queryRef = useRef(null)
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'))

  const containerRef = useRef()

  useLayoutEffect(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      })
    }
  }, [])

  const getHeaderTitle = () => {
    switch (currentTab) {
      case 'inventory':
        return 'Room List'
      case 'services':
        return 'Service List'
      case 'review':
        return 'Actions'
      default:
        return 'Room List'
    }
  }

  const content = (
    <div>
      <Box sx={{ padding: 2 }}>
        <Typography variant='h6'>{getHeaderTitle()}</Typography>
      </Box>
      <Divider />

      <div>
        <Scrollbar
          sx={{
            height: 400,
            // height: dimensions.height - 100,
          }}
        >
          {currentTab === 'inventory' && (
            <List dense={dense}>
              {roomList.map((room) => (
                <ListItemButton
                  selected={currentSelection === room.value}
                  key={room.value}
                  sx={{
                    borderBottomWidth: 1,
                    borderBottomStyle: 'solid',
                    borderBottomColor: 'divider',
                    '&:last-child': { border: 0 },
                  }}
                  onClick={() => handleClick(room.value)}
                >
                  <ListItemText
                    sx={{ textAlign: 'center' }}
                    primary={room.label}
                  />
                </ListItemButton>
              ))}
            </List>
          )}
        </Scrollbar>
      </div>
      {/*    <Typography variant='h5'>Filters</Typography>
        {!lgUp && (
          <IconButton onClick={onClose}>
            <SvgIcon>
              <XIcon />
            </SvgIcon>
          </IconButton>
        )}
      </Stack>
      <Stack spacing={3} sx={{ p: 3 }}>
        <form onSubmit={handleQueryChange}>
          <OutlinedInput
            defaultValue=''
            fullWidth
            inputProps={{ ref: queryRef }}
            placeholder='Invoice number'
            startAdornment={
              <InputAdornment position='start'>
                <SvgIcon>
                  <SearchMdIcon />
                </SvgIcon>
              </InputAdornment>
            }
          />
        </form>
        <div>
          <FormLabel
            sx={{
              display: 'block',
              mb: 2,
            }}
          >
            Issue date
          </FormLabel>
          <Stack spacing={2}>
            <DatePicker
              inputFormat='dd/MM/yyyy'
              label='From'
              onChange={handleStartDateChange}
              renderInput={(inputProps) => <TextField {...inputProps} />}
              value={filters.startDate || null}
            />
            <DatePicker
              inputFormat='dd/MM/yyyy'
              label='To'
              onChange={handleEndDateChange}
              renderInput={(inputProps) => <TextField {...inputProps} />}
              value={filters.endDate || null}
            />
          </Stack>
        </div>
        <div>
          <FormLabel
            sx={{
              display: 'block',
              mb: 2,
            }}
          >
            From customer
          </FormLabel>
          <Box
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? 'neutral.800' : 'neutral.50',
              borderColor: 'divider',
              borderRadius: 1,
              borderStyle: 'solid',
              borderWidth: 1,
            }}
          >
            <Scrollbar sx={{ maxHeight: 200 }}>
              <FormGroup
                sx={{
                  py: 1,
                  px: 1.5,
                }}
              >
                {customers.map((customer) => {
                  const isChecked = filters.customers?.includes(customer)

                  return (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isChecked}
                          onChange={handleCustomerToggle}
                        />
                      }
                      key={customer}
                      label={customer}
                      value={customer}
                    />
                  )
                })}
              </FormGroup>
            </Scrollbar>
          </Box>
        </div>
        <FormControlLabel
          control={
            <Switch
              checked={filters.status === 'paid'}
              onChange={handleStatusChange}
            />
          }
          label='Paid only'
        />
        <FormControlLabel
          control={<Switch checked={group} onChange={onGroupChange} />}
          label='Group by status'
        />*/}
      {/* </Stack> */}
    </div>
  )

  return <Card ref={containerRef}>{content}</Card>

  // if (lgUp) {
  //   return (
  //     <Drawer
  //       ref={containerRef}
  //       anchor='left'
  //       open={open}
  //       PaperProps={{
  //         elevation: 16,
  //         sx: {
  //           border: 'none',
  //           borderRadius: 2.5,
  //           overflow: 'hidden',
  //           position: 'relative',
  //           width: 380,
  //         },
  //       }}
  //       SlideProps={{ container }}
  //       variant='persistent'
  //       sx={{ p: 3 }}
  //       {...other}
  //     >
  //       {content}
  //     </Drawer>
  //   )
  // }

  // return (
  //   <Drawer
  //     ref={containerRef}
  //     anchor='left'
  //     hideBackdrop
  //     ModalProps={{
  //       container,
  //       sx: {
  //         pointerEvents: 'none',
  //         position: 'absolute',
  //       },
  //     }}
  //     onClose={onClose}
  //     open={open}
  //     PaperProps={{
  //       sx: {
  //         maxWidth: '100%',
  //         width: 380,
  //         pointerEvents: 'auto',
  //         position: 'absolute',
  //       },
  //     }}
  //     SlideProps={{ container }}
  //     variant='temporary'
  //     {...other}
  //   >
  //     {content}
  //   </Drawer>
  // )
}

EstimateSideBar.propTypes = {
  container: PropTypes.any,
  filters: PropTypes.object,
  onClose: PropTypes.func,
  onFiltersChange: PropTypes.func,
  open: PropTypes.bool,
}
