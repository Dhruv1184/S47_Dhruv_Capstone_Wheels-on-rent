import React, { useState } from 'react'
import logo from '../assets/WebLogo-removebg-preview.png'
import login from '../css/login.module.css'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { loginWithRedirect, user, isAuthenticated, logout,isLoading } = useAuth0()
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if(isAuthenticated || localStorage.getItem('token')){
    navigate('/rent')
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const response = await axios.post(`${import.meta.env.VITE_SERVER_LINK}/login`, {email, password},
        {headers: {
          "Content-Type":"application/json",
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }}
      )
      // console.log(response.data)
      localStorage.setItem('token', response.data)
      navigate('/rent')
    } catch (error) {
      alert("Invalid Credentials")
      console.log(error);
    }

  }
  
  return (
    <div>
    <div className={login.body}>
      <div className={login.main}>
        <h1 className={login.heading}>Login</h1>
        <img src={logo} className={login.logo} alt="Logo" />
        <form>
            <div className={login.inputbox}>
                <label htmlFor="email" className={login.label}>Email: </label>
                <input type="email" required placeholder='Enter Email' id="email" onChange={(e) => setEmail(e.target.value)} className={login.input} />
            </div>
            <div className={login.inputbox}>
                <label htmlFor="password" className={login.label}>Password: </label>
                <input type="password" required placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} id="password" className={login.input} />
            </div>
            <button type="submit" className={login.loginBtn} onClick={(e)=>handleSubmit(e)}>Login</button>
        </form>
        <span className={login.p}>Don't have an account? <span className={login.signup} onClick={() => navigate('/signup')}>Signup</span></span>
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
    </div>
  )
}

export default Login
