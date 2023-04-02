import PropTypes from 'prop-types'
import {
  Box,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  SvgIcon,
  Typography,
} from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { useDispatch } from 'react-redux'
import { setEditMember } from 'src/store/company/companySlice'

export const MemberActionMenu = (props) => {
  const {
    anchorEl,
    onClose,
    open,
    handleMemberDelete,
    member,
    handleEditOpen,
    setEditMember,
  } = props

  const dispatch = useDispatch()

  const handleDelete = () => {
    handleMemberDelete(member._id)
    onClose()
  }

  const handleEdit = () => {
    // dispatch(setEditMember(member))
    setEditMember(member)
    handleEditOpen()
    onClose()
  }

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      onClose={onClose}
      open={!!open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Divider />
      <Box sx={{ p: 1 }}>
        <ListItemButton
          onClick={handleEdit}
          sx={{
            borderRadius: 1,
            px: 1,
            py: 0.5,
          }}
        >
          <ListItemIcon>
            <SvgIcon fontSize='small'>
              <EditOutlinedIcon />
            </SvgIcon>
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant='body1'>Edit</Typography>}
          />
        </ListItemButton>
        <ListItemButton
          onClick={handleDelete}
          sx={{
            borderRadius: 1,
            px: 1,
            py: 0.5,
          }}
        >
          <ListItemIcon>
            <SvgIcon fontSize='small'>
              <DeleteOutlineIcon />
            </SvgIcon>
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant='body1'>Delete</Typography>}
          />
        </ListItemButton>
      </Box>
    </Popover>
  )
}

MemberActionMenu.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
}
