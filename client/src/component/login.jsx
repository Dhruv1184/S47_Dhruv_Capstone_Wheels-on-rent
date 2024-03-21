import React, { useState } from 'react'
import logo from '../assets/WebLogo-removebg-preview.png'
import login from '../css/login.module.css'
import { useAuth0 } from '@auth0/auth0-react'
import RentList from './rentList'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Login = () => {
  const navigate = useNavigate()
  const [loginData, setLogin] = useState({})
  const { loginWithRedirect, user, isAuthenticated, logout,isLoading } = useAuth0()
  const [error, setError] = useState('')
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if(isAuthenticated){
    navigate('/rent')
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      console.log(loginData)
      const response = await axios.post('http://localhost:7000/login', loginData,
        {headers: {
          "Content-Type":"application/json",
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }}
      )
      console.log(response.data)
      localStorage.setItem('token', response.data)
      navigate('/rent')
    } catch (error) {
      console.log(error);
    }

  }
  
  return (
    <div>
    {/* {isAuthenticated ? <RentList/>:  */}
    <div className={login.body}>
      <div className={login.main}>
        <h1 className={login.heading}>Login</h1>
        <img src={logo} className={login.logo} alt="Logo" />
        <form>
            <div className={login.inputbox}>
                <label htmlFor="email">Email: </label>
                <input type="email" required placeholder='Enter Email' id="email" onChange={(e) => setLogin({email: e.target.value})} className={login.input} />
            </div>
            <div className={login.inputbox}>
                <label htmlFor="password">Password: </label>
                <input type="password" required placeholder='Enter Password' onChange={(e) => setLogin({ ...loginData, password: e.target.value })} id="password" className={login.input} />
            </div>
            <button type="submit" className={login.loginBtn} onClick={(e)=>handleSubmit(e)}>Login</button>
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
     {/* }  */}
    </div>
  )
}

export default Login
