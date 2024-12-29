import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined'
import {
  Avatar,
  Box,
  Stack,
  SvgIcon,
  TableCell,
  TableRow,
  IconButton,
  Typography,
  Unstable_Grid2 as Grid,
  Popover,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { SeverityPill } from 'src/components/severity-pill'
import { stringToColor } from 'src/utils/string-to-color'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { deleteMember } from 'src/store/company/companySlice'
import { useDispatch } from 'react-redux'

function TeamMemberRow({ member, setEditMember, handleOpen, handleClose }) {
  const [anchorEl, setAnchorEl] = useState(null)

  const menuOpen = Boolean(anchorEl)

  const dispatch = useDispatch()

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleMemberDelete = async (id) => {
    await dispatch(deleteMember(id))
    toast.success('Team member successfully removed')
    handleMenuClose()
  }

  const handleEdit = (e, member) => {
    setEditMember(member)
    handleOpen()
    handleMenuClose()
  }
  return (
    <TableRow>
      <TableCell>
        <Stack alignItems='center' direction='row' spacing={1}>
          <Avatar
            // src={member.avatar}
            sx={{
              height: 40,
              width: 40,
              textTransform: 'uppercase',
              bgcolor: stringToColor(member.name),
            }}
          >
            {member.name.charAt(0)}
          </Avatar>
          <div>
            <Typography variant='subtitle2'>{member.name}</Typography>
            <Typography color='text.secondary' variant='body2'>
              {member.email}
            </Typography>
          </div>
        </Stack>
      </TableCell>
      <TableCell>
        <SeverityPill>{member.role}</SeverityPill>
      </TableCell>
      <TableCell align='right'>
        <IconButton
          aria-controls={menuOpen ? 'basic-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={menuOpen ? 'true' : undefined}
          onClick={handleMenuClick}
        >
          <SvgIcon>
            <MoreHorizOutlinedIcon />
          </SvgIcon>
        </IconButton>
        {/* Edit & delete menu */}
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
          onClose={handleMenuClose}
          open={!!menuOpen}
          PaperProps={{ sx: { width: 200 } }}
        >
          <Divider />
          <Box sx={{ p: 1 }}>
            <ListItemButton
              onClick={(e) => handleEdit(e, member)}
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
              onClick={() => handleMemberDelete(member._id)}
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
      </TableCell>
    </TableRow>
  )
}

export default TeamMemberRow
