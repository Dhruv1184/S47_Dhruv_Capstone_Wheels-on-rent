import React from 'react'
import logo from '../assets/WebLogo-removebg-preview.png'
import signup from '../css/signup.module.css'
import { useAuth0 } from '@auth0/auth0-react'
import RentList from './rentList'

const SignUp = () => {
    const { loginWithRedirect, isAuthenticated,isLoading } = useAuth0()
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
    {isAuthenticated ? <RentList/>: 
    <div className={signup.body}>
      <div className={signup.main}>
        <h1 className={signup.heading}>SignUp</h1>
        <img src={logo} className={signup.logo} alt="Logo" />
        <form>
            <div className={signup.inputbox}>
                <label htmlFor="name">Name:</label>
                <input type="text" required placeholder='Enter Name' id="name" className={signup.input} />
            </div>
            <div className={signup.inputbox}>
                <label htmlFor="email">Email: </label>
                <input type="email" required placeholder='Enter Email' id="email" className={signup.input} />
            </div>
            <div className={signup.inputbox}>
                <label htmlFor="password">Password: </label>
                <input type="password" required placeholder='Enter Password' id="password" className={signup.input} />
            </div>
            <div className={signup.inputbox}>
                <label htmlFor="confirmPassword">Confirm Password: </label>
                <input type="password" required placeholder='Enter Password' id="confirmPassword" className={signup.input} />
            </div>
            <button type="submit" className={signup.signupBtn}>signup</button>
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
    }
    </div>
  )
}

export default SignUp
