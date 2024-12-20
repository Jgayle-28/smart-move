import { useEffect, useState } from 'react'
import { formatDistanceStrict } from 'date-fns'
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight'
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon,
  Typography,
  Stack,
} from '@mui/material'
import { customLocale } from 'src/utils/date-locale'
import { RouterLink } from 'src/components/router-link'
import { useSelector } from 'react-redux'
import Spinner from '../shared/Spinner'
import { getInitials } from 'src/utils/get-initials'
import { useRouter } from 'src/hooks/use-router'
import Users03Icon from 'src/icons/untitled-ui/duocolor/users-03'
import { SeverityPill } from '../severity-pill'

export const RecentJobs = () => {
  const [orderedJobs, setOrderedJobs] = useState(null)

  const { jobs } = useSelector((state) => state.jobs)
  const router = useRouter()

  useEffect(() => {
    if (jobs) {
      const tempJobs = [...jobs]

      tempJobs.sort((a, b) => {
        const dateA = new Date(a.createdAt)
        const dateB = new Date(b.createdAt)
        return dateB - dateA // Sort in descending order (most recent first)
      })
      setOrderedJobs(tempJobs)
    }
  }, [jobs])

  if (!jobs || !orderedJobs) return <Spinner />
  return (
    <Card>
      <CardHeader title='Recent Jobs' />
      {orderedJobs && orderedJobs.length > 0 ? (
        <List disablePadding>
          {orderedJobs.slice(0, 4).map((job) => {
            const ago = formatDistanceStrict(
              new Date(job.createdAt),
              new Date(),
              {
                addSuffix: true,
                locale: customLocale,
              }
            )

            return (
              <ListItem
                key={job._id}
                sx={{
                  '&:hover': {
                    backgroundColor: 'action.hover',
                    cursor: 'pointer',
                  },
                }}
                onClick={() => router.push(`/dashboard/jobs/${job._id}`)}
              >
                {/* <ListItemAvatar>
                  <Avatar
                    sx={{
                      height: 42,
                      width: 42,
                    }}
                  >
                    
                    PH
                  </Avatar>
                </ListItemAvatar> */}
                <ListItemText
                  disableTypography
                  primary={
                    <Stack direction='row' spacing={2}>
                      <Typography
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                        variant='subtitle2'
                      >
                        {job?.customer.customerName}
                      </Typography>
                      <SeverityPill color={'info'}>{job.jobType}</SeverityPill>
                    </Stack>
                  }
                  secondary={
                    <Typography
                      color='text.secondary'
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                      variant='caption'
                    >
                      Email: {job?.customer.customerEmail} | Phone:{' '}
                      {job?.customer.customerPhoneNumber}
                    </Typography>
                  }
                  sx={{ pr: 2 }}
                />

                <Typography
                  color='text.secondary'
                  sx={{ whiteSpace: 'nowrap' }}
                  variant='caption'
                >
                  {ago}
                </Typography>
              </ListItem>
            )
          })}
        </List>
      ) : (
        <Stack direction='column' alignItems='center' sx={{ p: 2 }}>
          <SvgIcon fontSize='large' color='primary'>
            <Users03Icon />
          </SvgIcon>
          <Typography variant='body2'>No Jobs found</Typography>
        </Stack>
      )}

      {/* <Divider /> */}
      {/* <CardActions>
        <Button
          component={RouterLink}
          href='/dashboard/customers'
          color='inherit'
          endIcon={
            <SvgIcon>
              <ArrowRightIcon />
            </SvgIcon>
          }
          size='small'
        >
          Go to customers
        </Button>
      </CardActions> */}
    </Card>
  )
}
