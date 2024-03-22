import React from 'react'
import logo from '../assets/whiteLogo.png'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import footer from '../css/footer.module.css'
import { faLinkedin,faInstagram,faFacebook,faSquareXTwitter,faGithub,faTelegram } from '@fortawesome/free-brands-svg-icons'
const Footer = () => {
  return (
    <div className={footer.footer}>
      <div>
        <div className={footer.logoDiv}>
            <img src={logo} className={footer.logo} alt="logo" />
          <h1>Wheels on rent</h1>
        </div>
        <div className={footer.info}>
            <h1>Developed by <span className={footer.usname}>Dhruv Khandelwal</span></h1>
            <h1>dhruvkhandelwal1184@gmail.com</h1>
            <h1>Connect with me</h1>
            <div className={footer.icons}>
                <h1 className={footer.icon}><a href="https://www.linkedin.com/in/dhruv-khandelwal-76121a291/"><FontAwesomeIcon icon={faLinkedin} style={{color: "#e3e1ea"}} /></a></h1>
                <h1 className={footer.icon}><a href="https://www.facebook.com/profile.php?id=100069932894124 "><FontAwesomeIcon icon={faFacebook} style={{color: "#e3e1ea",}} /></a></h1>
                <h1 className={footer.icon}><a href="https://www.instagram.com/dhruvkhandelwal1184?utm_source=qr&igsh=MTN3aGs2am1paDU2Yw== "><FontAwesomeIcon icon={faInstagram} style={{color: "#e3e1ea",}} /></a></h1>
                <h1 className={footer.icon}><a href="https://twitter.com/dkhandelwal1184?t=WdEvalcoRWvDvA-eRrom9A&s=09"><FontAwesomeIcon icon={faSquareXTwitter} style={{color: "#e3e1ea",}}  /></a></h1>
                <h1 className={footer.icon}><a href="https://github.com/Dhruv1184"><FontAwesomeIcon icon={faGithub} style={{color: "#e3e1ea",}} /></a></h1>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
