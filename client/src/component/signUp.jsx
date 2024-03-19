import React from 'react'
import logo from '../assets/WebLogo-removebg-preview.png'
import signup from '../css/signup.module.css'
import { useAuth0 } from '@auth0/auth0-react'
import RentList from './rentList'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
const SignUp = () => {
  const [signupData, setSignup] = useState({ name: '', email: '', password: '' })
  const [confirmPassword, setConfirmPassword] = useState('')
    const { loginWithRedirect, isAuthenticated,isLoading } = useAuth0()
    const navigate = useNavigate()
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if(isAuthenticated){
    navigate('/rent')
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (signupData.password !== confirmPassword) {
      alert('Passwords do not match')
    }
    else {
      console.log(signupData)
      axios.post('http://localhost:7000/signup', signupData)
        .then(res => {
          console.log(res)
          localStorage.setItem('token', res.data.token)
          navigate('/rent')
        })
        .catch(err => console.log(err))
    }
  }
  return (
    <div>
    {/* {isAuthenticated ? <RentList/>:  */}
    <div className={signup.body}>
      <div className={signup.main}>
        <h1 className={signup.heading}>SignUp</h1>
        <img src={logo} className={signup.logo} alt="Logo" />
        <form>
            <div className={signup.inputbox}>
                <label htmlFor="name">Name:</label>
                <input type="text" required placeholder='Enter Name' id="name" onChange={(e) => setSignup({ ...signupData, name: e.target.value })} className={signup.input} />
            </div>
            <div className={signup.inputbox}>
                <label htmlFor="email">Email: </label>
                <input type="email" required placeholder='Enter Email' id="email" onChange={(e) => setSignup({ ...signupData, email: e.target.value })} className={signup.input} />
            </div>
            <div className={signup.inputbox}>
                <label htmlFor="password">Password: </label>
                <input type="password" required placeholder='Enter Password' id="password" onChange={(e) => setSignup({ ...signupData, password: e.target.value })} className={signup.input} />
            </div>
            <div className={signup.inputbox}>
                <label htmlFor="confirmPassword">Confirm Password: </label>
                <input type="password" required placeholder='Enter Password' id="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)} className={signup.input} />
            </div>
            <button type="submit" className={signup.signupBtn} onClick={(e)=>handleSubmit(e)}>signup</button>
        </form>
        <p className={signup.p}>Already have an account? <a href="/login">login</a></p>
        <div className={signup.or}>
            <hr />
            <span>OR</span>
            <hr />
        </div>
        <div>
            <button className={signup.signupWithGoogle}
            onClick={()=>loginWithRedirect({
                authorizationParams: {
                   'screen_hint': 'signup',
                }})} >SignUp with Google</button>
        </div>

      </div>
    </div>
    {/* } */}
    </div>
  )
}

export default SignUp
