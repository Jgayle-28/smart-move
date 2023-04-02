import PropTypes from 'prop-types'
import XIcon from '@untitled-ui/icons-react/build/esm/X'
import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material'
import { Tip } from 'src/components/tip'
import AddMemberForm from '../auth/forms/AddMemberForm'
import { useEffect } from 'react'

export const AddMemberModal = ({
  open,
  handleClose,
  editMember,
  setEditMember,
}) => {
  useEffect(() => {
    return () => {
      setEditMember(null)
    }
  }, [])

  return (
    <Dialog fullWidth maxWidth='sm' onClose={handleClose} open={open}>
      <Stack
        alignItems='center'
        direction='row'
        justifyContent='space-between'
        spacing={3}
        sx={{
          px: 3,
          py: 2,
        }}
      >
        <Typography variant='h6'>
          {editMember ? `Edit ${editMember.name}` : 'Add Members To Your Team'}
        </Typography>
        <IconButton color='inherit' onClick={handleClose}>
          <SvgIcon>
            <XIcon />
          </SvgIcon>
        </IconButton>
      </Stack>
      <DialogContent>
        <Tip message='Use a company email and common password when adding your team members' />
        <Box sx={{ mt: 3 }}>
          <AddMemberForm
            editMember={editMember}
            creationCallback={handleClose}
          />
        </Box>
      </DialogContent>
    </Dialog>
  )
}

AddMemberModal.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
}
