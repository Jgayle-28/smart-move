// useMsalOutlook.js
import { useEffect, useState } from 'react'
import { InteractionRequiredAuthError } from '@azure/msal-browser'
import { msalInstance } from '../msalConfig' // or wherever you export msalInstance
// Default scopes
const defaultLoginRequest = {
  scopes: ['Calendars.ReadWrite'],
}

export function useMsalOutlook(loginRequest = defaultLoginRequest) {
  const [initialized, setInitialized] = useState(false)
  const [accessToken, setAccessToken] = useState(null)
  console.log('msalInstance :>> ', msalInstance)
  useEffect(() => {
    msalInstance
      .initialize()
      .then(() => {
        setInitialized(true)

        // If there's an existing account from a previous session, set it active
        const allAccounts = msalInstance.getAllAccounts()
        if (allAccounts?.length > 0) {
          msalInstance.setActiveAccount(allAccounts[0])
        }
      })
      .catch((error) => {
        console.error('MSAL Initialization failed:', error)
      })
  }, [])

  const login = async () => {
    if (!initialized) {
      console.warn('MSAL is not initialized. Wait or show a loading state.')
      return
    }

    // 1) Check if there's an active account or any account at all
    let activeAccount = msalInstance.getActiveAccount()
    if (!activeAccount) {
      const allAccounts = msalInstance.getAllAccounts()
      if (allAccounts.length > 0) {
        activeAccount = allAccounts[0]
        msalInstance.setActiveAccount(activeAccount)
      }
    }

    // 2) If we still have no account, do popup login immediately
    if (!activeAccount) {
      try {
        const popupResult = await msalInstance.acquireTokenPopup(loginRequest)
        setAccessToken(popupResult.accessToken)
        if (popupResult.account) {
          msalInstance.setActiveAccount(popupResult.account)
        }
      } catch (popupErr) {
        console.error('MSAL Popup Error:', popupErr)
      }
      return
    }

    // 3) If we do have an account, try silent
    try {
      const silentResult = await msalInstance.acquireTokenSilent({
        ...loginRequest,
        account: activeAccount, // explicitly provide the account
      })
      setAccessToken(silentResult.accessToken)
    } catch (silentErr) {
      // If silent fails (e.g., token expired or no session), fallback to popup
      if (
        silentErr instanceof InteractionRequiredAuthError ||
        silentErr.errorMessage?.includes('no_account_error')
      ) {
        try {
          const popupResult = await msalInstance.acquireTokenPopup(loginRequest)
          setAccessToken(popupResult.accessToken)
          if (popupResult.account) {
            msalInstance.setActiveAccount(popupResult.account)
          }
        } catch (popupErr) {
          console.error('MSAL Popup Error:', popupErr)
        }
      } else {
        console.error('MSAL Silent Error:', silentErr)
      }
    }
  }

  const createOutlookEvent = async (eventObject) => {
    if (!accessToken) {
      throw new Error('No access token found. Please log in first.')
    }
    try {
      const response = await fetch(
        'https://graph.microsoft.com/v1.0/me/events',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(eventObject),
        }
      )

      if (!response.ok) {
        throw new Error(`Failed to create event. Status: ${response.status}`)
      }

      return response.json()
    } catch (error) {
      console.error('Error creating Outlook event:', error)
      throw error
    }
  }

  return {
    initialized,
    accessToken,
    login,
    createOutlookEvent,
  }
}
