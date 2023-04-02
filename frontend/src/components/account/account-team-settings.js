import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Card,
  CardContent,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Box,
  Unstable_Grid2 as Grid,
} from '@mui/material'
import { Scrollbar } from 'src/components/scrollbar'
import { useDialog } from 'src/hooks/use-dialog'
import { AddMemberModal } from 'src/components/account/AddMemberModal'
import { clearCreatedUser } from 'src/store/auth/authSlice'
import { clearTeam, getCompanyTeam } from 'src/store/company/companySlice'
import Spinner from 'src/components/shared/Spinner'
import TeamMemberRow from './TeamMemberRow'

export const AccountTeamSettings = (props) => {
  const [editMember, setEditMember] = useState(null)

  const { open, handleClose, handleOpen } = useDialog()

  const { company, team, isLoading } = useSelector((state) => state.company)
  const dispatch = useDispatch()

  useEffect(() => {
    getTeam()
    // clear team and created team members from redux
    return () => {
      dispatch(clearTeam())
      dispatch(clearCreatedUser())
    }
  }, [])

  const getTeam = () => {
    dispatch(getCompanyTeam(company._id))
  }

  const handleEditModalClose = () => {
    if (editMember) setEditMember(null)
    handleClose()
  }

  if (isLoading) return <Spinner />
  return (
    <>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid xs={12} md={4}>
              <Stack spacing={1}>
                <Typography variant='h6'>Your Team</Typography>
                <Typography color='text.secondary' variant='body2'>
                  Add, edit or delete members.
                </Typography>
              </Stack>
            </Grid>
            <Grid xs={12} md={8}>
              <Stack alignItems='center' direction='row' spacing={3}>
                <Button
                  onClick={() => handleOpen()}
                  variant='contained'
                  sx={{ marginLeft: 'auto' }}
                >
                  Add Member
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
        <Scrollbar>
          <Table sx={{ minWidth: 400 }}>
            <TableHead>
              <TableRow>
                <TableCell>Member</TableCell>
                <TableCell>Role</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {team && team.length > 0 ? (
                team.map((member, index) => {
                  if (member.isAdmin) return <></>
                  return (
                    <TeamMemberRow
                      member={member}
                      key={index}
                      editMember={editMember}
                      setEditMember={setEditMember}
                      handleClose={handleEditModalClose}
                      handleOpen={handleOpen}
                    />
                  )
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align='center'>
                    You Have not added any team members yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Scrollbar>
      </Card>
      <AddMemberModal
        editMember={editMember}
        setEditMember={setEditMember}
        open={open}
        handleClose={handleEditModalClose}
      />
    </>
  )
}
