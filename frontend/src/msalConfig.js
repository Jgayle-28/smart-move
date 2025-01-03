import { PublicClientApplication } from '@azure/msal-browser'
const REDIRECT_URI =
  process.env.NODE_ENV === 'production'
    ? 'https://www.deliverlypro.com'
    : 'http://localhost:3000'

const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_AZURE_CLIENT_ID,
    authority: 'https://login.microsoftonline.com/common',
    redirectUri: REDIRECT_URI,
  },
}

export const msalInstance = new PublicClientApplication(msalConfig)
