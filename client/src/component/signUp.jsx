import React from 'react'
import logo from '../assets/WebLogo-removebg-preview.png'
import signup from '../css/signup.module.css'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
    const { loginWithRedirect, isAuthenticated,isLoading } = useAuth0()
    const navigate = useNavigate()
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if(isAuthenticated){
    navigate('/rent')
  }
  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    return regex.test(password)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword ) {
      alert('Passwords do not match')
    }else if (!validatePassword(password)) {
      alert('Password must be at least 8 characters long and must contain at least one letter, one number, and one special character')
    }else {
      axios.post('http://localhost:7000/signup', { name, email, password }, {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
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
    <div className={signup.body}>
      <div className={signup.main}>
        <h1 className={signup.heading}>SignUp</h1>
        <img src={logo} className={signup.logo} alt="Logo" />
        <form>
            <div className={signup.inputbox}>
                <label htmlFor="name">Name:</label>
                <input type="text" required placeholder='Enter Name' id="name" onChange={(e) => setName(e.target.value)} className={signup.input} />
            </div>
            <div className={signup.inputbox}>
                <label htmlFor="email">Email: </label>
                <input type="email" required placeholder='Enter Email' id="email" onChange={(e) => setEmail(e.target.value)} className={signup.input} />
            </div>
            <div className={signup.inputbox}>
                <label htmlFor="password">Password: </label>
                <input type="password" required placeholder='Enter Password' id="password" onChange={(e) => setPassword(e.target.value )} className={signup.input} />
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
    </div>
  )
}

export default SignUp
