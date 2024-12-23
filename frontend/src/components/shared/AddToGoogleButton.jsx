import React, { useEffect, useState } from 'react'
import { gapi } from 'gapi-script'
import { Button, Tooltip } from '@mui/material'
import { parseISO } from 'date-fns'
import { toast } from 'react-hot-toast'

const CLIENT_ID = process.env.REACT_APP_GOOGLE_0AUTH_CLIENT_ID
const apiKey = process.env.REACT_APP_GOOGLE_0AUTH_API_KEY
const SCOPES = 'https://www.googleapis.com/auth/calendar.events'

// Inline Google “G” icon – you can replace with an <img> or your own SVG file
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

const AddToGoogleButton = ({ eventDetails, type = 'Move' }) => {
  const [tokenObj, setTokenObj] = useState(null)

  // 1. Safely parse the date/time
  const tempDate = parseISO(eventDetails.startDate)
  const tempTime = parseISO(eventDetails.startTime)

  // 2. Check if both are valid Date objects
  const isDateTimeValid =
    tempDate instanceof Date &&
    !isNaN(tempDate.valueOf()) &&
    tempTime instanceof Date &&
    !isNaN(tempTime.valueOf())

  // 3. Disable buttons if invalid
  const isDisabled = !isDateTimeValid

  // 4. Combine date + time (only if valid)
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

  useEffect(() => {
    const initClient = () => {
      gapi.client
        .init({
          apiKey: apiKey,
          clientId: CLIENT_ID,
          discoveryDocs: [
            'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
          ],
          scope: SCOPES,
        })
        .then(() => {
          const storedToken = getStoredToken()
          if (storedToken && !isTokenExpired(storedToken)) {
            gapi.client.setToken({ access_token: storedToken.access_token })
            setTokenObj(storedToken)
          }
        })
    }
    gapi.load('client:auth2', initClient)
  }, [])

  const handleAuthClick = async () => {
    try {
      const storedToken = getStoredToken()
      if (storedToken && !isTokenExpired(storedToken)) {
        // Reuse valid token
        gapi.client.setToken({ access_token: storedToken.access_token })
        setTokenObj(storedToken)
      } else {
        // Prompt sign-in
        const authInstance = gapi.auth2.getAuthInstance()
        const user = await authInstance.signIn()
        const authResponse = user.getAuthResponse(true)

        const newToken = {
          access_token: authResponse.access_token,
          expires_at: authResponse.expires_at,
        }
        storeToken(newToken)
        gapi.client.setToken({ access_token: newToken.access_token })
        setTokenObj(newToken)
      }
    } catch (error) {
      console.error('Authentication failed:', error)
    }
  }

  const addEventToCalendar = async () => {
    if (!tokenObj) {
      console.error('No valid token. Please sign in first.')
      return
    }
    try {
      const event = {
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

      const response = await gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: event,
      })
      toast.success('Successfully added event to Google Calendar')
      console.log('Event created:', response)
    } catch (error) {
      toast.error('Error adding event to Google Calendar')
      console.error('Error creating event:', error)
    }
  }

  // --- TOKEN UTILITIES ---
  const storeToken = (token) => {
    localStorage.setItem('google_auth_token', JSON.stringify(token))
  }

  const getStoredToken = () => {
    const stored = localStorage.getItem('google_auth_token')
    return stored ? JSON.parse(stored) : null
  }

  const isTokenExpired = (token) => {
    const now = Date.now()
    return now >= token.expires_at
  }

  const tooltipText =
    'Both a date and time are required before adding to google calendar.'

  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      {/** If no token, show sign-in; otherwise show "Add Event". */}
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
              Sign In to To Add To Google Calendar
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
