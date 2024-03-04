import React from 'react'
import landing from '../css/landing.module.css'
import logo from '../assets/WebLogo.png'
import {brand} from '../jsFile/brand'
import { useNavigate } from 'react-router'
import { useAuth0 } from '@auth0/auth0-react'

const Landing = () => {
  // const navigate = useNavigate()
  const {loginWithRedirect, user,isAuthenticated,logout} = useAuth0()
  console.log(user)
  console.log(isAuthenticated)
  return (
    <div>
      <div className={landing.main}>
        <div className={landing.header}>
            <div className={landing.logoDiv}>
                <img src={logo} alt="logo" className={landing.logo} />
                <h1 className={landing.title}>Wheels on rent</h1>
            </div>
            <div className={landing.btns}>
                <button className={landing.loginBtn} onClick={() => loginWithRedirect()}>Login</button>
                <button className={landing.signupBtn} onClick={()=>logout()}>Sign Up</button>
            </div>
        </div>
        <h1 className={landing.heading}>Ride Your Adventure: Rent, Ride, and Own with Ease!</h1>
      </div>
      <div>
        <h1 className={landing.brandHeading}>Top Brands</h1>
        <div className={landing.brands}>
          {brand.map((data,index) => {
            return (
              <div key={index} className={landing.box} onClick={()=>loginWithRedirect()}>
                  <img src={data.img} className={landing.brandLogo} alt="" />
                  <h1 className={landing.brandName}>{data.name}</h1>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Landing
