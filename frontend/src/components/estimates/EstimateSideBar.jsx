import { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Card,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material'
import { Scrollbar } from 'src/components/scrollbar'
import { roomList } from './inventory/constants'
import { serviceList } from './services/constants'

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

  const containerRef = useRef()

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
            height: currentTab === 'services' ? 430 : 400,
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
          {currentTab === 'services' && (
            <List dense={dense}>
              {serviceList.map((service) => (
                <ListItemButton
                  selected={currentSelection === service}
                  key={service}
                  sx={{
                    borderBottomWidth: 1,
                    borderBottomStyle: 'solid',
                    borderBottomColor: 'divider',
                  }}
                  onClick={() => handleClick(service)}
                >
                  <ListItemText
                    sx={{ textAlign: 'center' }}
                    primary={service}
                  />
                </ListItemButton>
              ))}
            </List>
          )}
        </Scrollbar>
      </div>
    </div>
  )

  return <Card ref={containerRef}>{content}</Card>
}

EstimateSideBar.propTypes = {
  container: PropTypes.any,
  filters: PropTypes.object,
  onClose: PropTypes.func,
  onFiltersChange: PropTypes.func,
  open: PropTypes.bool,
}
