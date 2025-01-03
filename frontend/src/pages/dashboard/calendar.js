import { useCallback, useEffect, useRef, useState } from 'react'
import Calendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Box, Card, Container, Stack, useMediaQuery } from '@mui/material'
import { Seo } from 'src/components/seo'
import { usePageView } from 'src/hooks/use-page-view'
import { CalendarToolbar } from 'src/components/calendar/CalendarToolbar'
import { CalendarContainer } from 'src/components/calendar/CalendarContainer'
import { useDispatch, useSelector } from 'src/store'
import { getJobs } from 'src/store/jobs/jobSlice'
import { getEstimates } from 'src/store/estimates/estimateSlice'
import Spinner from 'src/components/shared/Spinner'
import EventDetailPopper from 'src/components/calendar/EventDetailPopper'
import _ from 'lodash'
// import interactionPlugin from '@fullcalendar/interaction'
// import listPlugin from '@fullcalendar/list'
// import timeGridPlugin from '@fullcalendar/timegrid'
// import timelinePlugin from '@fullcalendar/timeline'

const Page = () => {
  const [events, setEvents] = useState(null)
  const [eventAnchor, setEventAnchor] = useState(null)
  const [currentEvent, setCurrentEvent] = useState(null)

  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'))
  const [date, setDate] = useState(new Date())
  const [view, setView] = useState('dayGridMonth')

  usePageView()

  // Selectors -----------------------------------------------------------------
  const { jobs } = useSelector((state) => state.jobs)
  const { estimates } = useSelector((state) => state.estimates)
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const calendarRef = useRef(null)
  const eventPopperOpen = Boolean(eventAnchor)

  useEffect(() => {
    if (events === null) {
      getCalendarData()
    }
  }, [user])

  useEffect(() => {
    if (!jobs || !estimates) return
    generateCalendarData()
  }, [jobs, estimates])

  useEffect(() => {
    handleScreenResize()
  }, [mdUp])

  const getCalendarData = () => {
    dispatch(getJobs(user?.company))
    dispatch(getEstimates(user?.company))
  }
  // Handlers -------------------------------------------------------------------
  const handleEventMouseEnter = (e) => {
    setEventAnchor(e.jsEvent.target)
    const event = events.find((event) => event.id === e.event.id)
    setCurrentEvent(event)
  }

  const handleEventMouseLeave = () => {
    setEventAnchor(null)
    setCurrentEvent(null)
  }
  const generateCalendarData = () => {
    if (!jobs || !estimates) return

    const tempJobData = _.reject(jobs, (j) => j?.jobDate === null).map(
      (job) => {
        if (job.jobDate === null) return
        return {
          id: job._id,
          title: job.customer.customerName,
          start: job.jobDate ? job.jobDate : null,
          end: job.jobStartTime ? job.jobStartTime : null,
          allDay: true,
          color: '#06AED4',
          type: 'job',
          jobTime: job.jobStartTime ? new Date(job.jobStartTime) : null,
        }
      }
    )

    const tempEstimateData = _.reject(
      jobs,
      (j) => j?.estimateDate === null
    ).map((job) => {
      return {
        id: `${job._id}-${job.estimateDate}-${job.estimateTime}}`,
        title: job.customer.customerName,
        start: job.estimateDate ? job.estimateDate : null,
        end: job.estimateTime ? job.estimateTime : null,
        allDay: true,
        color: '#10B981',
        type: 'estimate',
        jobTime: job.estimateTime ? new Date(job.estimateTime) : null,
      }
    })

    const tempPackData = _.reject(
      estimates,
      (e) => e?.packing?.packDate === null
    ).map((estimate) => {
      return {
        id: estimate._id,
        title: estimate.customer.customerName,
        start: estimate?.packing?.packDate ? estimate.packing.packDate : null,
        end: estimate?.packing?.packTime ? estimate.packing.packTime : null,
        allDay: true,
        color: '#F79009',
        type: 'packing',
        jobTime: estimate?.packing?.packTime ? estimate.packing.packTime : null,
      }
    })

    setEvents([...tempJobData, ...tempPackData, ...tempEstimateData])
  }
  const handleEventHoverToggle = (e) => {
    if (eventAnchor) {
      setEventAnchor(null)
      setCurrentEvent(null)
    } else {
      setEventAnchor(e.jsEvent.target)
      // Set current event
      const event = events.find((event) => event.id === e.event.id)
      setCurrentEvent(event)
    }
  }
  const handleScreenResize = useCallback(() => {
    const calendarEl = calendarRef.current

    if (calendarEl) {
      const calendarApi = calendarEl.getApi()
      const newView = mdUp ? 'dayGridMonth' : 'timeGridDay'

      calendarApi.changeView(newView)
      setView(newView)
    }
  }, [calendarRef, mdUp])

  const handleViewChange = useCallback((view) => {
    const calendarEl = calendarRef.current

    if (calendarEl) {
      const calendarApi = calendarEl.getApi()

      calendarApi.changeView(view)
      setView(view)
    }
  }, [])

  const handleDateToday = useCallback(() => {
    const calendarEl = calendarRef.current

    if (calendarEl) {
      const calendarApi = calendarEl.getApi()

      calendarApi.today()
      setDate(calendarApi.getDate())
    }
  }, [])

  const handleDatePrev = useCallback(() => {
    const calendarEl = calendarRef.current

    if (calendarEl) {
      const calendarApi = calendarEl.getApi()

      calendarApi.prev()
      setDate(calendarApi.getDate())
    }
  }, [])

  const handleDateNext = useCallback(() => {
    const calendarEl = calendarRef.current

    if (calendarEl) {
      const calendarApi = calendarEl.getApi()

      calendarApi.next()
      setDate(calendarApi.getDate())
    }
  }, [])

  if (!jobs || !estimates || !events) return <Spinner />
  return (
    <>
      <Seo title='Dashboard: Calendar' />
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth='xl'>
          <Stack spacing={3}>
            <CalendarToolbar
              date={date}
              onDateNext={handleDateNext}
              onDatePrev={handleDatePrev}
              onDateToday={handleDateToday}
              onViewChange={handleViewChange}
              view={view}
            />
            <Card>
              <CalendarContainer>
                <Calendar
                  allDayMaintainDuration
                  dayMaxEventRows={3}
                  eventMouseEnter={handleEventMouseEnter}
                  eventMouseLeave={handleEventMouseLeave}
                  eventDisplay='block'
                  eventResizableFromStart
                  events={events || []}
                  headerToolbar={false}
                  height={800}
                  initialDate={date}
                  initialView={view}
                  plugins={[
                    dayGridPlugin,
                    // interactionPlugin,
                    // listPlugin,
                    // timeGridPlugin,
                    // timelinePlugin,
                  ]}
                  ref={calendarRef}
                  rerenderDelay={10}
                  weekends
                />
              </CalendarContainer>
            </Card>
          </Stack>
        </Container>
      </Box>
      {/*----- Event Popper -----*/}
      <EventDetailPopper
        currentEvent={currentEvent}
        eventPopperOpen={eventPopperOpen}
        eventAnchor={eventAnchor}
        handleEventHoverToggle={handleEventHoverToggle}
      />
    </>
  )
}

export default Page
