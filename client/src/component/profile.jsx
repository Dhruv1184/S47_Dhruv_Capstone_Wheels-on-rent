import React from 'react'
import Navigation from './navigation'
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'
import { useEffect,useState } from 'react'
const Profile = () => {
  const { user, isAuthenticated } = useAuth0()
  const [profileData, setProfileData] = useState(null);
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await axios.get('http://localhost:7000/user');
        const profile = res.data.find(profile => profile.email === user.email);
        if (profile) {
          setProfileData(profile);
        } else {
          await axios.post('http://localhost:7000/user/insert', {
            email: user.email,
            name: user.name,
            img: user.picture
          });
          setProfileData({ email: user.email, name: user.name, img: user.picture });
        }
      } catch (error) {
        console.log(error);
      }
    };
    // if (isAuthenticated && user.email && user.name && !profileData) {
      fetchProfileData();
      // }
    }, [isAuthenticated]);
  console.log(profileData)
  return (
    <div>
      <Navigation />
      {/* <h1>Profile</h1> */}
      <div>
        {isAuthenticated ?
          <div>
            <h1>Profile</h1>
            {profileData ?
              <div>
                <div>
                  <img src={profileData.img} alt="Profile" className='profileImg'/>
                </div>
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
              : <h1>'Please Login'</h1>}
              </div>
          : <h1>'Please Login'</h1>}
      </div>

    </div>
  )
}

export default Profile
