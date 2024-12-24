// AddToOutlookButton.jsx

import React from 'react'
import { Button } from '@mui/material'
import { parseISO, formatISO } from 'date-fns'
import toast from 'react-hot-toast'
import { useMsalOutlook } from '../../hooks/use-msal-outlook' // your updated hook

// Example Outlook icon
const outlookIcon = (
  <svg width='20' height='20' viewBox='0 0 512 512'>
    <path fill='#0078D4' d='M512 128v256H256V128h256z' />
    <path fill='#eee' d='M256 128H0v256h256V128z' />
  </svg>
)

const AddToOutlookButton = ({
  eventDetails,
  type = 'Move',
  callBack = null,
}) => {
  const { initialized, accessToken, login, createOutlookEvent } =
    useMsalOutlook({
      scopes: ['Calendars.ReadWrite'],
    })

  const handleLogin = async () => {
    await login()
  }

  const addEventToOutlook = async () => {
    if (!accessToken) {
      console.error('No access token. Please sign in first.')
      return
    }
    // Combine date/time
    const startDate = parseISO(eventDetails.startDate)
    const startTime = parseISO(eventDetails.startTime)
    // ...
    const combinedStart = new Date(
      Date.UTC(
        startDate.getUTCFullYear(),
        startDate.getUTCMonth(),
        startDate.getUTCDate(),
        startTime.getUTCHours(),
        startTime.getUTCMinutes(),
        startTime.getUTCSeconds(),
        startTime.getUTCMilliseconds()
      )
    )
    const startISO = formatISO(combinedStart)
    const combinedEnd = new Date(combinedStart.getTime() + 60 * 60 * 1000)
    const endISO = formatISO(combinedEnd)

    // Create Outlook event
    const outlookEvent = {
      subject: eventDetails.title || type,
      body: { contentType: 'HTML', content: eventDetails.description || '' },
      start: { dateTime: startISO, timeZone: 'UTC' },
      end: { dateTime: endISO, timeZone: 'UTC' },
      location: { displayName: eventDetails.location || '' },
    }

    try {
      const data = await createOutlookEvent(outlookEvent)
      if (callBack) callBack(data)
      toast.success(`Successfully added ${type} to Outlook Calendar!`)
      console.log('Event created in Outlook:', data)
    } catch (error) {
      console.error('Error creating event:', error)
      toast.error('Error adding event to Outlook Calendar')
    }
  }

  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      {!accessToken ? (
        <Button
          fullWidth
          variant='outlined'
          color='primary'
          onClick={handleLogin}
          startIcon={outlookIcon}
          disabled={!initialized}
        >
          Sign In to Outlook
        </Button>
      ) : (
        <Button
          fullWidth
          variant='outlined'
          color='primary'
          onClick={addEventToOutlook}
          startIcon={outlookIcon}
        >
          Add {type} to Outlook Calendar
        </Button>
      )}
    </div>
  )
}

export default AddToOutlookButton