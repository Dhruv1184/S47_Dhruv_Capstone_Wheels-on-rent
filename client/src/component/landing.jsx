import React from 'react'
import landing from '../css/landing.module.css'
import logo from '../assets/logo (2).png'
import {brand} from '../jsFile/brand'
const Landing = () => {
  console.log(brand)
  return (
    <div>
      <div className={landing.main}>
        <div className={landing.header}>
            <div className={landing.logoDiv}>
                <img src={logo} alt="logo" className={landing.logo} />
                <h1 className={landing.title}>Wheels on rent</h1>
            </div>
            <div className={landing.btns}>
                <button className={landing.loginBtn}>Login</button>
                <button className={landing.signupBtn}>Sign Up</button>
            </div>
        </div>
        <h1 className={landing.heading}>Ride Your Adventure: Rent, Ride, and Own with Ease!</h1>
      </div>
      <div>
        <h1 className={landing.brandHeading}>Top Brands</h1>
        <div className={landing.brands}>
          {brand.map((data,index) => {
            return (
              <div key={index} className={landing.box}>
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
