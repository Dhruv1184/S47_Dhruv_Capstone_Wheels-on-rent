import React, { useEffect } from 'react'
import landing from '../css/landing.module.css'
import logo from '../assets/WebLogo.png'
import {brand} from '../jsFile/brand.jsx'
import { useNavigate } from 'react-router'
import { useAuth0 } from '@auth0/auth0-react'
import Footer from './footer'
import RE from '../../assets/RE.png'
import bajaj from '../../assets/bajaj.png'
import bmw from '../../assets/BMW.png'
import harley from '../../assets/harley-davidson.png'
import honda from '../../assets/Honda.png'
import ktm from '../../assets/KTM.png'
import hero from '../../assets/hero.png'
import ola from '../../assets/ola.png'
import suzuki from '../../assets/Suzuki.png'
import triumph from '../../assets/triumph.png'
import tvs from '../../assets/TVS.png'
import yamaha from '../../assets/Yamaha.png'
import java from '../../assets/Java.png'
import mahindra from '../../assets/Mahindra.png'
import revolt from '../../assets/Revolt.png'
const Landing = () => {
  const navigate = useNavigate()
  const { isLoading,isAuthenticated } = useAuth0()
  // console.log(brand);
  if (isLoading) {
    return <div className={landing.loading}>Loading...</div>;
  }
  if(isAuthenticated || localStorage.getItem('token')) {
    navigate('/rent')
  }
  return (
    <div>
        <div>
          <div className={landing.main}>
            <div className={landing.header}>
              <div className={landing.logoDiv}>
                <img src={logo} alt="logo" className={landing.logo} />
                <h1 className={landing.title}>Wheels on rent</h1>
              </div>
              <div className={landing.btns}>
                <button className={landing.loginBtn} onClick={()=>navigate('/login')}>Login</button>
                <button className={landing.signupBtn} onClick={()=>navigate('/signup')}> Sign Up</button>
              </div>
            </div>
            <h1 className={landing.heading}>Embark on Your Adventure: Rent, Ride, and Own with Effortless Ease!</h1>
          </div>
          <div>
            <h1 className={landing.brandHeading}>Top Brands</h1>
            <div className={landing.brands}>
              {brand.map((data, index) => {
                return (
                  <div key={index} className={landing.box} onClick={() => navigate('/login')}>
                    <img src={data.img} className={landing.brandLogo} alt="" />
                    <h1 className={landing.brandName}>{data.name}</h1>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
     <br />
     <Footer/>
    </div>
  )
}

export default Landing
