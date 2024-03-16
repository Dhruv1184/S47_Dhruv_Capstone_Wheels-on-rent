import React from 'react'
import logo from '../assets/WebLogo-removebg-preview.png'
import login from '../css/login.module.css'
import { useAuth0 } from '@auth0/auth0-react'
import RentList from './rentList'

const Login = () => {
    const { loginWithRedirect, user, isAuthenticated, logout,isLoading } = useAuth0()
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
    {isAuthenticated ? <RentList/>: 
    <div className={login.body}>
      <div className={login.main}>
        <h1 className={login.heading}>Login</h1>
        <img src={logo} className={login.logo} alt="Logo" />
        <form>
            <div className={login.inputbox}>
                <label htmlFor="email">Email: </label>
                <input type="email" required placeholder='Enter Email' id="email" className={login.input} />
            </div>
            <div className={login.inputbox}>
                <label htmlFor="password">Password: </label>
                <input type="password" required placeholder='Enter Password' id="password" className={login.input} />
            </div>
            <button type="submit" className={login.loginBtn}>Login</button>
        </form>
        <p className={login.p}>Don't have an account? <a href="/signup">Signup</a></p>
        <div className={login.or}>
            <hr />
            <span>OR</span>
            <hr />
        </div>
        <div>
            <button className={login.LoginWithGoogle} 
            onClick={() => loginWithRedirect({
                appState: {
                  returnTo: window.location.origin+"/rent"
                }
            })}>Login in with Google</button>
        </div>

      </div>
    </div>
    }
    </div>
  )
}

export default Login
