import { Fragment, useState } from 'react'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined'
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import PostAddIcon from '@mui/icons-material/PostAdd'
import DescriptionIcon from '@mui/icons-material/Description'
import FileOpenIcon from '@mui/icons-material/FileOpen'
import FileCopyIcon from '@mui/icons-material/FileCopy'
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
  Tooltip,
  Typography,
} from '@mui/material'
import { SeverityPill } from 'src/components/severity-pill'
import { RouterLink } from 'src/components/router-link'
import { useDispatch } from 'react-redux'
import { addJob, deleteJob, getJobs } from 'src/store/jobs/jobSlice'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { PDFDownloadLink } from '@react-pdf/renderer'
import TableItemDetails from './TableItemDetails'
import { BlankEstimatePdf } from 'src/components/estimates/blank-estimate-pdf/BlankEstimatePdf'
import { format } from 'date-fns'

function JobListTableItem({ job, currentProduct, handleProductToggle }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [showComments, setShowComments] = useState(false)

  const { user } = useSelector((state) => state.auth)
  const { company } = useSelector((state) => state.company)

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

  const handleJobCloneClick = () => {
    const newJob = {
      ...job,
      createdBy: user._id,
      jobDate: null,
      jobTime: null,
      estimateDate: null,
      estimateTime: null,
      isPaid: false,
      jobTitle: `${job.jobTitle} (Clone)`,
    }
    delete newJob._id
    delete newJob.createdAt
    delete newJob.updatedAt

    dispatch(addJob(newJob))
      .unwrap()
      .then((res) => {
        toast.success('Job successfully cloned')
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
            <SvgIcon fontSize='small'>
              {isCurrent ? (
                <ExpandMoreOutlinedIcon />
              ) : (
                <ChevronRightOutlinedIcon />
              )}
            </SvgIcon>
          </IconButton>
        </TableCell>
        <TableCell>
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
              <Typography color='text.secondary' variant='body2'>
                {job?.jobTitle}
              </Typography>
              <Typography variant='subtitle2'>
                {job?.customer?.customerName} | {job?.customer?.customerEmail}
              </Typography>
            </Box>
          </Box>
        </TableCell>
        <TableCell>
          <Typography color='text.secondary' variant='body2'>
            {job?.customer?.customerPhoneNumber}
          </Typography>
        </TableCell>
        <TableCell>
          <Stack
            divider={<Divider orientation='vertical' flexItem />}
            direction='row'
            spacing={1}
            alignItems='center'
          >
            <PDFDownloadLink
              document={<BlankEstimatePdf focusJob={job} company={company} />}
              fileName={`${job?.customer?.customerName}-blank-estimate-sheet.pdf`}
              style={{ textDecoration: 'none' }}
            >
              <Tooltip title='Print Blank Estimate Sheet'>
                <IconButton color='primary'>
                  <SvgIcon>
                    <FileOpenIcon fontSize='small' />
                  </SvgIcon>
                </IconButton>
              </Tooltip>
            </PDFDownloadLink>

            {job.estimate ? (
              <Tooltip title='View Created Estimate'>
                <IconButton
                  component={RouterLink}
                  href={`/dashboard/estimates/${job._id}/edit/${job.estimate._id}`}
                  color='primary'
                >
                  <SvgIcon>
                    <DescriptionIcon fontSize='small' />
                  </SvgIcon>
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title='Created New Estimate'>
                <IconButton
                  component={RouterLink}
                  href={`/dashboard/estimates/${job._id}/create`}
                  color='primary'
                >
                  <SvgIcon>
                    <PostAddIcon fontSize='small' />
                  </SvgIcon>
                </IconButton>
              </Tooltip>
            )}
          </Stack>
        </TableCell>
        <TableCell>
          <SeverityPill color={'info'}>{job.jobType}</SeverityPill>
        </TableCell>
        <TableCell>
          <SeverityPill color={job.isPaid ? 'success' : 'warning'}>
            {job.isPaid ? 'Paid' : 'Unpaid'}
          </SeverityPill>
        </TableCell>
        <TableCell>
          <Typography color='text.secondary' variant='body2'>
            {format(new Date(job.createdAt), 'MM/dd/yyyy')}
          </Typography>
        </TableCell>
        <TableCell>
          <IconButton
            aria-controls={menuOpen ? 'basic-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={menuOpen ? 'true' : undefined}
            onClick={handleMenuClick}
          >
            <SvgIcon fontSize='small'>
              <MoreHorizOutlinedIcon />
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
                onClick={handleJobCloneClick}
                sx={{
                  borderRadius: 1,
                  px: 1,
                  py: 0.5,
                }}
              >
                <ListItemIcon>
                  <SvgIcon fontSize='small'>
                    <FileCopyIcon />
                  </SvgIcon>
                </ListItemIcon>
                <ListItemText
                  primary={<Typography variant='body1'>Clone</Typography>}
                />
              </ListItemButton>
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
            <SvgIcon fontSize='small'>
              <CloseOutlinedIcon />
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
