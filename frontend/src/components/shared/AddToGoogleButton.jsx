// AddToGoogleButton.jsx
import React from 'react'
import { Button, Tooltip } from '@mui/material'
import { parseISO } from 'date-fns'
import { toast } from 'react-hot-toast'
import { useGoogleCalendar } from '../../hooks/use-google-calendar' // <-- custom hook
import { gapi } from 'gapi-script'

// Inline Google “G” icon – or your own
const googleIcon = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='20'
    height='20'
    viewBox='0 0 488 512'
  >
    <path
      fill='#4285F4'
      d='M488 261.8C488 403.3 391.9 496 245.9 496 114.2 496 0 381.8 0 250.2 0 118.6 114.2 4.4 245.9 4.4c66.7 0 124.9 24.5 168.2 64.9l-68.3 68.3C323.8 117 285.3 103 245.9 103c-77 0-139.3 60.7-139.3 137.2 0 76.5 62.3 137.2 139.3 137.2 70.8 0 117.6-37.6 127.5-89h-127.5v-90h222.1c2.1 12.7 3.3 25.3 3.3 38.4z'
    />
  </svg>
)

const AddToGoogleButton = ({
  eventDetails,
  type = 'Move',
  callBack = null,
}) => {
  // 1) Use the custom hook
  const { tokenObj, handleAuthClick, createEvent } = useGoogleCalendar()

  // 2) Parse date/time from props
  const tempDate = parseISO(eventDetails.startDate)
  const tempTime = parseISO(eventDetails.startTime)

  // Check if both are valid Date objects
  const isDateTimeValid =
    tempDate instanceof Date &&
    !isNaN(tempDate.valueOf()) &&
    tempTime instanceof Date &&
    !isNaN(tempTime.valueOf())

  const isDisabled = !isDateTimeValid

  // 3) Combine the date + time if valid
  let finalISO = ''
  if (isDateTimeValid) {
    const combinedDate = new Date(
      Date.UTC(
        tempDate.getUTCFullYear(),
        tempDate.getUTCMonth(),
        tempDate.getUTCDate(),
        tempTime.getUTCHours(),
        tempTime.getUTCMinutes(),
        tempTime.getUTCSeconds(),
        tempTime.getUTCMilliseconds()
      )
    )
    finalISO = combinedDate.toISOString()
  }

  // 4) Add event using the hook’s createEvent
  const addEventToCalendar = async () => {
    try {
      if (!tokenObj) {
        console.error('No valid token. Please sign in first.')
        return
      }

      // Build the event object
      const eventResource = {
        summary: eventDetails.title,
        location: eventDetails.location,
        description: eventDetails.description || '',
        start: {
          dateTime: finalISO,
          timeZone: 'UTC',
        },
        end: {
          dateTime: finalISO,
          timeZone: 'UTC',
        },
      }

      const response = await createEvent(eventResource)
      if (callBack) callBack()
      toast.success('Successfully added event to Google Calendar')
    } catch (error) {
      toast.error('Error adding event to Google Calendar')
      console.error('Error creating event:', error)
    }
  }

  const tooltipText =
    'Both a date and time are required before adding to Google Calendar.'

  // 5) Conditionally render the buttons
  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      {!tokenObj ? (
        <Tooltip
          title={isDisabled ? tooltipText : ''}
          disableFocusListener={!isDisabled}
          disableHoverListener={!isDisabled}
          disableTouchListener={!isDisabled}
        >
          <span style={{ width: '100%' }}>
            <Button
              fullWidth
              color='primary'
              variant='outlined'
              onClick={handleAuthClick}
              startIcon={googleIcon}
              disabled={isDisabled}
            >
              Sign In to Add to Google Calendar
            </Button>
          </span>
        </Tooltip>
      ) : (
        <Tooltip
          title={isDisabled ? tooltipText : ''}
          disableFocusListener={!isDisabled}
          disableHoverListener={!isDisabled}
          disableTouchListener={!isDisabled}
        >
          <span style={{ width: '100%' }}>
            <Button
              fullWidth
              color='primary'
              variant='outlined'
              onClick={addEventToCalendar}
              startIcon={googleIcon}
              disabled={isDisabled}
            >
              Add {type} to Google Calendar
            </Button>
          </span>
        </Tooltip>
      )}
    </div>
  )
}

export default AddToGoogleButton
