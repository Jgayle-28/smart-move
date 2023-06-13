import { useCallback, useEffect, useState } from 'react'
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus'
import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material'
import { RouterLink } from 'src/components/router-link'
import { Seo } from 'src/components/seo'
import { usePageView } from 'src/hooks/use-page-view'
import { paths } from 'src/paths'
import { JobListTable } from 'src/components/jobs/list/JobListTable'
import { JobListSearch } from 'src/components/jobs/list/JobListSearch'
import { useDispatch } from 'react-redux'
import { clearJobs, getJobs } from 'src/store/jobs/jobSlice'
import { useSelector } from 'react-redux'
import Spinner from 'src/components/shared/Spinner'
import { filterJobs } from 'src/utils/filter-jobs'
import { applyPagination } from 'src/utils/apply-pagination'
import EmptyState from 'src/components/shared/EmptyState'
import { exportToExcel } from 'src/utils/export-to-excel'
import Download01Icon from '@untitled-ui/icons-react/build/esm/Download01'

const initialFilterState = {
  filters: {
    name: undefined,
    category: [],
    status: [],
    inStock: undefined,
    searchDate: null,
  },
  page: 0,
  rowsPerPage: 5,
}

const Page = () => {
  const [currentJobs, setCurrentJobs] = useState([])
  const [filterState, setFilterState] = useState({
    ...initialFilterState,
  })
  const [searchQuery, setSearchQuery] = useState('')

  const { company } = useSelector((state) => state.company)
  const { user } = useSelector((state) => state.auth)
  const { jobs, isLoading } = useSelector((state) => state.jobs)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getJobs(user.company))
    return () => {
      dispatch(clearJobs())
    }
  }, [])

  useEffect(() => {
    if (jobs !== null && !isLoading) setCurrentJobs(jobs)
  }, [jobs, isLoading])

  useEffect(() => {
    handleFilterJobs()
  }, [filterState, searchQuery])

  const handleFilterJobs = useCallback(() => {
    const filteredJobs = filterJobs(filterState, jobs || [], searchQuery)
    setCurrentJobs(filteredJobs)
  }, [filterState, currentJobs])

  const handleResetFilters = () => {
    setFilterState(initialFilterState)
  }

  const handleFiltersChange = useCallback((filters) => {
    setFilterState((prevState) => ({
      ...prevState,
      filters,
    }))
  }, [])

  const handlePageChange = useCallback((event, page) => {
    setFilterState((prevState) => ({
      ...prevState,
      page,
    }))
  }, [])

  const handleRowsPerPageChange = useCallback((event) => {
    setFilterState((prevState) => ({
      ...prevState,
      rowsPerPage: parseInt(event.target.value, 10),
    }))
  }, [])

  const exportJobs = useCallback(() => {
    console.log('currentJobs -----> ', currentJobs)
    const exportJobs = currentJobs.map((job) => {
      return {
        customer: job.customer?.customerName,
        jobDate: new Date(job.jobDate).toLocaleDateString(),
        jobType: job.jobType,
        pickUpAddress: job.pickUpAddress.description || '',
        dropOffAddress: job.dropOffAddress.description || '',
        isPaid: job.isPaid,
        estimateTotal: job.estimate.totalCharges,
        createdBy: job.createdBy?.name,
      }
    })
    exportToExcel(
      exportJobs,
      `${company.companyName}-Jobs(${new Date().toLocaleDateString()})`
    )
  }, [currentJobs, company])

  usePageView()

  if (isLoading || currentJobs === null) return <Spinner />
  return (
    <>
      <Seo title='Dashboard: Job List' />
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth='xl'>
          <Stack spacing={4}>
            <Stack direction='row' justifyContent='space-between' spacing={4}>
              <Stack spacing={1}>
                <Typography variant='h4'>Jobs</Typography>
                <Stack alignItems='center' direction='row' spacing={1}>
                  <Button
                    color='inherit'
                    size='small'
                    onClick={exportJobs}
                    startIcon={
                      <SvgIcon>
                        <Download01Icon />
                      </SvgIcon>
                    }
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
              <Stack alignItems='center' direction='row' spacing={3}>
                <Button
                  component={RouterLink}
                  href={paths.dashboard.jobs.create}
                  startIcon={
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant='contained'
                >
                  Add New Job
                </Button>
              </Stack>
            </Stack>
            {currentJobs.length > 0 ? (
              <>
                <Card>
                  <JobListSearch
                    handleFilterJobs={handleFilterJobs}
                    onFiltersChange={handleFiltersChange}
                    setSearchQuery={setSearchQuery}
                    handleResetFilters={handleResetFilters}
                    searchDate={filterState.filters.searchDate}
                  />
                  <JobListTable
                    jobs={applyPagination(
                      currentJobs,
                      filterState.page,
                      filterState.rowsPerPage
                    )}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                    page={filterState.page}
                    count={currentJobs.length || 0}
                    rowsPerPage={filterState.rowsPerPage}
                  />
                </Card>
              </>
            ) : (
              <>
                {!isLoading ? (
                  <EmptyState
                    title='Looks no jobs match your filter criteria.'
                    // subtitle='Click the Add New Job button to create your first job'
                  />
                ) : (
                  <EmptyState
                    title='Looks like you have not created any Jobs yet.'
                    subtitle='Click the Add New Job button to create your first job'
                  />
                )}
              </>
            )}
          </Stack>
        </Container>
      </Box>
    </>
  )
}

export default Page
