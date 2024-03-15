import React from 'react'
import Navigation from './navigation'
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import profile from '../css/profile.module.css'
import {Link} from 'react-router-dom'
// import rent from '../css/rentList.module.css'
const Profile = () => {
  const { user, isAuthenticated } = useAuth0()
  const [data, setData] = useState([])
  const [profileData, setProfileData] = useState(null);
  const [history, setHistory] = useState([]);
  // const [isDataFetched, setIsDataFetched] = useState(false);
   useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await axios.get('http://localhost:7000/user');
        const history = await axios.get('http://localhost:7000/rent/data');
        const profile = res.data.find(profile => profile.email === user.email);
        const historyData = history.data.filter(item => item.email === user.email);
        setHistory(historyData);
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
  console.log(profileData)

  
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
                  <Link to={`/updateProfile/${profileData._id}`}>
                  <lord-icon
                    src="https://cdn.lordicon.com/wuvorxbv.json"
                    trigger="hover"
                    
                    style={{ width: "50px", height: "50px" }}>
                  </lord-icon>
                  </Link>
                  
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
              <h1 className={profile.heading}> History </h1>
              <div className={profile.container}>
                        {history.length > 0 ? history.map((data) => {
                            return (
                                <div key={data._id} className={profile.box}>
                                    <div>
                                        {data.vehicleImg.length > 0 && (
                                            <img src={`http://localhost:7000/${data.vehicleImg[0].replace(/\\/g, '/')}`} alt="Vehicle Image" className={profile.vehicleImg} />
                                        )}
                                    </div>
                                    <div className={profile.info}>
                                      <div>
                                        <h3 className={profile.key}>Vehicle no. : <span className={profile.value}>{data.registration}</span></h3>
                                        <h1 className={profile.key}>Price/hr : Rs <span className={profile.value}>{data.price}</span></h1>
                                        <h3 className={profile.key}>Vehicle company : <span className={profile.value}>{data.vehicle}</span></h3>
                                        <h3 className={profile.key}>Model : <span className={profile.value}>{data.model}</span></h3>
                                        <h3 className={profile.key}>Available at: <span className={profile.value}>{data.address}</span></h3>
                                        <h3 className={profile.key}>Contact no. : <span className={profile.value}>{data.contact}</span></h3>
                                      </div>
                                        <button className={profile.bookbtn}>Delete</button>
                                    </div>
                                </div>
                            )
                        }): <h1 className={profile.heading}>Data not found</h1>}
                    </div>
            </div>
            : <h1>'Please Login'</h1>}
        </div>
        : <h1>'Please Login'</h1>}
    </div>
  )
}

export default Profile
