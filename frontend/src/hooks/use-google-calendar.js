// useGoogleCalendar.js
import { useState, useEffect } from 'react'
import { gapi } from 'gapi-script'

// Put these constants here or import from a config file
const CLIENT_ID = process.env.REACT_APP_GOOGLE_0AUTH_CLIENT_ID
const API_KEY = process.env.REACT_APP_GOOGLE_0AUTH_API_KEY
const SCOPES = 'https://www.googleapis.com/auth/calendar.events'

// 1. Utility function for Move Event
function generateGoogleCalendarMoveEvent(focusJob) {
  return {
    title: focusJob.jobTitle,
    description: focusJob.jobComments,
    location: focusJob.pickUpAddress || focusJob.dropOffAddress,
    startDate: focusJob.jobDate,
    startTime: focusJob.jobStartTime,
    endDate: focusJob.jobDate,
    endTime: focusJob.jobStartTime,
  }
}

// 2. Utility function for Estimate Event
function generateGoogleCalendarEstimateEvent(focusJob) {
  return {
    title: `Estimate for ${focusJob.customer?.customerName || ''}`,
    description: focusJob.jobComments,
    location: focusJob.pickUpAddress || focusJob.dropOffAddress,
    startDate: focusJob.estimateDate,
    startTime: focusJob.estimateTime,
    endDate: focusJob.estimateDate,
    endTime: focusJob.estimateTime,
  }
}

export function useGoogleCalendar() {
  const [tokenObj, setTokenObj] = useState(null)

  useEffect(() => {
    // Initialize the GAPI client once on mount
    const initClient = () => {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: [
            'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
          ],
          scope: SCOPES,
        })
        .then(() => {
          // On successful init, check localStorage for an existing token
          const storedToken = getStoredToken()
          if (storedToken && !isTokenExpired(storedToken)) {
            gapi.client.setToken({ access_token: storedToken.access_token })
            setTokenObj(storedToken)
          }
        })
        .catch((error) => {
          console.error('Error initializing GAPI client:', error)
        })
    }

    gapi.load('client:auth2', initClient)
  }, [])

  // -- AUTHENTICATION HANDLER --
  const handleAuthClick = async () => {
    try {
      // If we already have a valid token, reuse it
      const storedToken = getStoredToken()
      if (storedToken && !isTokenExpired(storedToken)) {
        gapi.client.setToken({ access_token: storedToken.access_token })
        setTokenObj(storedToken)
      } else {
        // Otherwise, prompt the user to sign in
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

  // -- CREATE EVENT HANDLER --
  // You pass in a Google Calendar event resource object
  const createEvent = async (eventResource) => {
    if (!tokenObj) {
      throw new Error('No valid token. Please sign in first.')
    }
    try {
      const response = await gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: eventResource,
      })
      return response
    } catch (error) {
      console.error('Error creating event:', error)
      throw error
    }
  }

  // -- TOKEN UTILITIES --
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

  return {
    tokenObj, // null or the current token object
    handleAuthClick,
    createEvent, // function to create calendar events
    isTokenExpired, // exposed if other components need it
    generateGoogleCalendarMoveEvent,
    generateGoogleCalendarEstimateEvent,
  }
}
