import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Auth0Provider
      domain="dev-kypde41qyfc3vbdm.us.auth0.com"
      clientId="KL91BytUOCbJOptUuCknJYCcReTrQUYh"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
      audience="https://wheelsOnRent"
      scope="openid profile email"
      >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0Provider>
  // </React.StrictMode>,
)
