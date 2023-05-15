import { Fragment, useState } from 'react'
import ChevronDownIcon from '@untitled-ui/icons-react/build/esm/ChevronDown'
import ChevronRightIcon from '@untitled-ui/icons-react/build/esm/ChevronRight'
import DotsHorizontalIcon from '@untitled-ui/icons-react/build/esm/DotsHorizontal'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import XIcon from '@untitled-ui/icons-react/build/esm/X'
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Stack,
  SvgIcon,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material'
import { SeverityPill } from 'src/components/severity-pill'
import { RouterLink } from 'src/components/router-link'
import { useDispatch } from 'react-redux'
import { deleteJob, getJobs } from 'src/store/jobs/jobSlice'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'

import TableItemDetails from './TableItemDetails'

function JobListTableItem({ job, currentProduct, handleProductToggle }) {
  console.log('job :>> ', job)
  const [anchorEl, setAnchorEl] = useState(null)
  const [showComments, setShowComments] = useState(false)

  const { user } = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  const menuOpen = Boolean(anchorEl)
  const isCurrent = job._id === currentProduct

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenuClose = () => {
    setAnchorEl(null)
  }
  const toggleShowComments = () => {
    setShowComments((prevState) => !prevState)
  }
  const handleJobDeleteClick = () => {
    dispatch(deleteJob(job._id))
      .unwrap()
      .then(() => {
        toast.success('Job successfully deleted')
        dispatch(getJobs(user.company))
      })
  }

  return (
    <Fragment key={job._id}>
      <TableRow hover key={job._id}>
        <TableCell
          padding='checkbox'
          sx={{
            ...(isCurrent && {
              position: 'relative',
              '&:after': {
                position: 'absolute',
                content: '" "',
                top: 0,
                left: 0,
                backgroundColor: 'primary.main',
                width: 3,
                height: 'calc(100% + 1px)',
              },
            }),
          }}
          width='25%'
        >
          <IconButton onClick={() => handleProductToggle(job._id)}>
            <SvgIcon>
              {isCurrent ? <ChevronDownIcon /> : <ChevronRightIcon />}
            </SvgIcon>
          </IconButton>
        </TableCell>
        <TableCell width='25%'>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <Box
              sx={{
                cursor: 'pointer',
              }}
            >
              <Typography variant='subtitle2'>
                {job?.customer?.customerName}
              </Typography>
              <Typography color='text.secondary' variant='body2'>
                {job?.customer?.customerEmail}
              </Typography>
            </Box>
          </Box>
        </TableCell>
        <TableCell width='25%'>
          <Typography color='text.secondary' variant='body2'>
            {job?.customer?.customerPhoneNumber}
          </Typography>
        </TableCell>
        <TableCell>
          {job.estimate ? (
            <Button
              component={RouterLink}
              href={`/dashboard/estimates/${job._id}/edit/${job.estimate._id}`}
              color='primary'
              size='small'
            >
              View Estimate
            </Button>
          ) : (
            <Button
              component={RouterLink}
              href={`/dashboard/estimates/${job._id}/create`}
              color='primary'
              size='small'
            >
              Create Estimate
            </Button>
          )}
        </TableCell>
        <TableCell>
          <SeverityPill color={'info'}>{job.jobType}</SeverityPill>
        </TableCell>
        <TableCell>
          <SeverityPill color={job.isPaid ? 'success' : 'warning'}>
            {job.isPaid ? 'Paid' : 'Unpaid'}
          </SeverityPill>
        </TableCell>
        <TableCell align='right'>
          <IconButton
            aria-controls={menuOpen ? 'basic-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={menuOpen ? 'true' : undefined}
            onClick={handleMenuClick}
          >
            <SvgIcon>
              <DotsHorizontalIcon />
            </SvgIcon>
          </IconButton>
          {/* Action Menu*/}
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
              <ListItem
                component={RouterLink}
                href={`/dashboard/jobs/${job._id}`}
                sx={{
                  borderRadius: 1,
                  px: 1,
                  py: 0.5,
                  color: 'text.primary',
                }}
              >
                <ListItemIcon>
                  <SvgIcon fontSize='small'>
                    <OpenInNewIcon />
                  </SvgIcon>
                </ListItemIcon>
                <ListItemText
                  primary={<Typography variant='body1'>Details</Typography>}
                />
              </ListItem>
              <ListItem
                component={RouterLink}
                href={`/dashboard/jobs/${job._id}/edit`}
                sx={{
                  borderRadius: 1,
                  px: 1,
                  py: 0.5,
                  color: 'text.primary',
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
              </ListItem>
              <ListItemButton
                onClick={handleJobDeleteClick}
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
      {isCurrent && (
        <TableRow>
          <TableCell
            colSpan={7}
            sx={{
              p: 0,
              position: 'relative',
              '&:after': {
                position: 'absolute',
                content: '" "',
                top: 0,
                left: 0,
                backgroundColor: 'primary.main',
                width: 3,
                height: 'calc(100% + 1px)',
              },
            }}
          >
            <TableItemDetails
              job={job}
              toggleShowComments={toggleShowComments}
            />
          </TableCell>
        </TableRow>
      )}
      <Dialog
        fullWidth
        maxWidth='sm'
        onClose={toggleShowComments}
        open={showComments}
      >
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
          <Typography variant='h6'>Job Comments</Typography>
          <IconButton color='inherit' onClick={toggleShowComments}>
            <SvgIcon>
              <XIcon />
            </SvgIcon>
          </IconButton>
        </Stack>
        <Divider />
        <DialogContent sx={{ paddingTop: 0 }}>
          <div
            dangerouslySetInnerHTML={{
              __html: job.jobComments,
            }}
          />
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default JobListTableItem
