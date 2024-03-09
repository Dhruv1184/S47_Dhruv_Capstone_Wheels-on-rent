import React from 'react'
import Navigation from './navigation'
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import profile from '../css/profile.module.css'
const Profile = () => {
  const { user, isAuthenticated } = useAuth0()
  const [data, setData] = useState([])
  const [profileData, setProfileData] = useState(null);
  // const [isDataFetched, setIsDataFetched] = useState(false);
   useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await axios.get('http://localhost:7000/user');
        const profile = res.data.find(profile => profile.email === user.email);
        setProfileData(profile)
      }
      catch (error) {
        console.log(error);
      }
    }
    if (isAuthenticated) {
      fetchProfileData();
    }
  }, [isAuthenticated]);


  // console.log(profileData)
  return (
    <div>
      <Navigation />
      {isAuthenticated ?
        <div >
          {profileData ?
            <div>
              <div className={profile.profile}>
                <div className={profile.logo}>
                  <div></div>
                  <h1 className={profile.heading}>Profile</h1>
                  <lord-icon
                    src="https://cdn.lordicon.com/wuvorxbv.json"
                    trigger="hover"
                    style={{ width: "50px", height: "50px" }}>
                  </lord-icon>
                </div>
                <div className={profile.profileData}>
                  <div>
                    <img src={profileData.img} alt="Profile" className={profile.profileImg} />
                  </div>
                  <div className={profile.text}>
                    <h3>Name : {profileData.name}</h3>
                    <h3>Email : {profileData.email}</h3>
                    {profileData.contact ?
                      <h3>Contact : {profileData.contact}</h3>
                      : <h3>Contact : ----</h3>}
                    {profileData.address ?
                      <h3>Address : {profileData.address}</h3>
                      : <h3>Address : ----</h3>}
                    {profileData.pincode ?
                      <h3>Pincode : {profileData.pincode}</h3>
                      : <h3>Pincode : ----</h3>}
                  </div>
                </div>
              </div>
              <h1>Previous Data </h1>
            </div>
            : <h1>'Please Login'</h1>}
        </div>
        : <h1>'Please Login'</h1>}
    </div>
  )
}

export default Profile
