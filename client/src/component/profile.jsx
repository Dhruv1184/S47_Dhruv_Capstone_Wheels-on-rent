import React from 'react'
import Navigation from './navigation'
import { useAuth0 } from '@auth0/auth0-react'
const Profile = () => {
    const {user, isAuthenticated} = useAuth0()
    console.log(user )
  return (
    <div>
      <Navigation />
      {/* <h1>Profile</h1> */}
      <div>
        <h1>{isAuthenticated ?  
        <div>
            <h1>Profile</h1>
            <div>
                <img src="https://lh3.googleusercontent.com/a/ACg8ocKIGHSTjmJn80P0CA6KI-c7wlvxwNnz36NWqVYrSUj-=s96-c" alt="" />
            </div>
            <div>
                <h3>Name : {user.name}</h3>
                <h3>Email : {user.email}</h3>
            </div>
        </div>
           : 'Please Login'}</h1>
      </div>

    </div>
  )
}

export default Profile
