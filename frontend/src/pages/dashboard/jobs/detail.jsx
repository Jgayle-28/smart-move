import { useCallback, useEffect, useState } from 'react'
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material'
import { Seo } from 'src/components/seo'
import { usePageView } from 'src/hooks/use-page-view'
import { JobOverview } from 'src/components/jobs/details/JobOverview'
import { useSelector, useDispatch } from 'react-redux'
import { clearFocusJob, getJob, deleteJob } from 'src/store/jobs/jobSlice'
import { useParams } from 'react-router'
import Spinner from 'src/components/shared/Spinner'
import JobDetailMain from 'src/components/jobs/details/JobDetailMain'
import EditJobForm from 'src/components/jobs/details/edit-form/EditJobForm'
import { toast } from 'react-hot-toast'
import { paths } from 'src/paths'
import { useRouter } from 'src/hooks/use-router'

const Page = () => {
  const [editJob, setEditJob] = useState(false)

  const router = useRouter()
  const dispatch = useDispatch()
  const { jobId, mode } = useParams()

  const { isLoading, focusJob } = useSelector((state) => state.jobs)

  useEffect(() => {
    if (jobId) dispatch(getJob(jobId))
    return () => {
      dispatch(clearFocusJob())
    }
  }, [jobId])

  useEffect(() => {
    if (mode && mode === 'edit') setEditJob(true)
    if (mode && mode === 'details') setEditJob(false)
  }, [mode])

  const handleToggleEdit = useCallback(() => {
    setEditJob((prevState) => !prevState)
  }, [])

  const handleSaveComplete = useCallback(() => {
    handleToggleEdit()
    dispatch(getJob(jobId))
  }, [])

  const handleJobDeleteClick = () => {
    dispatch(deleteJob(focusJob._id))
      .unwrap()
      .then(() => {
        toast.success('Job successfully deleted')
        router.push(paths.dashboard.jobs.index)
      })
  }

  usePageView()

  if (isLoading || !focusJob) return <Spinner />
  return (
    <>
      <Seo title='Dashboard: Job Details' />
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth='lg'>
          <Grid container spacing={4}>
            <Grid xs={12} lg={8}>
              {editJob ? (
                <EditJobForm
                  focusJob={focusJob}
                  isLoading={isLoading}
                  handleToggleEdit={handleToggleEdit}
                  handleSaveComplete={handleSaveComplete}
                  handleJobDeleteClick={handleJobDeleteClick}
                />
              ) : (
                <JobDetailMain
                  focusJob={focusJob}
                  handleToggleEdit={handleToggleEdit}
                  handleJobDeleteClick={handleJobDeleteClick}
                />
              )}
            </Grid>
            {!editJob && (
              <Grid xs={12} lg={4}>
                <JobOverview job={focusJob} />
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export default Page
