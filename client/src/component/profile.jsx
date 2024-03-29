import React from 'react'
import Navigation from './navigation'
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import profile from '../css/profile.module.css'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Footer from './footer'

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [dropdown, setDropdown] = useState('Add')
  const { user, isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0()
  const [profileData, setProfileData] = useState(null);
  const [RentHistory, setHistory] = useState([]);
  const [sellHistory, setSellHistory] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [isDataFetched, setIsDataFetched] = useState(false);
  const DropDown = (e) => {
    setDropdown(e.target.value)
    if (e.target.value === 'AddForRent') {
      navigate('/rentForm')
    }
    else if (e.target.value === 'AddForSale') {
      navigate('/saleForm')
    }
  }
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = isAuthenticated ? await getAccessTokenSilently() : localStorage.getItem('token');
        const res = await axios.get(`${import.meta.env.VITE_SERVER_LINK}/user`);
        const history = await axios.get(`${import.meta.env.VITE_SERVER_LINK}/rent/data`, {
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          }
        });
        const sellHistory = await axios.get(`${import.meta.env.VITE_SERVER_LINK}/sale/data`, {
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(history.data);
        if (isAuthenticated) {
          setUserEmail(user.email);
        } else {
          setUserEmail(history.data.user.email);
        }
        setIsDataFetched(true);
        const profile = res.data.find(profile => profile.email === userEmail);
        const historyData = history.data.Data.filter(item => item.email === userEmail);
        const sellHistoryData = sellHistory.data.filter(item => item.email === userEmail);
        setHistory(historyData);
        setSellHistory(sellHistoryData);
        setProfileData(profile)
      }
      catch (error) {
        console.log(error);
      }
    }
    fetchProfileData();

  }, [isDataFetched, isAuthenticated]);

  if (isLoading) {
    return <div className={profile.loading}>Loading...</div>
  }
  const deleteRentItem = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_SERVER_LINK}/rent/delete/${id}`);
      const token = isAuthenticated ? await getAccessTokenSilently() : localStorage.getItem('token');
      const history = await axios.get(`${import.meta.env.VITE_SERVER_LINK}/rent/data`, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      }
    });
    const historyData = history.data.Data.filter(item => item.email === userEmail);
    setHistory(historyData);
    }
    catch (error) {
      console.log(error);
    }
  }
  const deleteSellItem = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_SERVER_LINK}/sale/delete/${id}`);
      const token = isAuthenticated ? await getAccessTokenSilently() : localStorage.getItem('token');
      const sellHistory = await axios.get(`${import.meta.env.VITE_SERVER_LINK}/sale/data`, {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        }
      });
      const sellHistoryData = sellHistory.data.filter(item => item.email === userEmail);
      setSellHistory(sellHistoryData);
    }
    catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
        {profileData ?
        <div >
          <Navigation />
          <div>
            <div className={profile.profile}>
              <div className={profile.logo}>
                <div></div>
                <h1 className={profile.heading2}>Profile</h1>
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
            <div className={profile.head}>
              <h1 className={profile.heading}> History </h1>
              <select className={profile.select} onChange={(e) => DropDown(e)}>
                <option value="Add" className={profile.option}>Add</option>
                <option value="AddForRent" className={profile.option}>Add for rent</option>
                <option value="AddForSale" className={profile.option}>Add for sell</option>
              </select>
            </div>
            <h1 className={profile.title}>For Rent:-</h1>
            <div className={profile.container}>
              {RentHistory.length > 0 ? RentHistory.map((data) => {
                return (
                  <div key={data._id} className={profile.box}>
                    <div>
                      {data.vehicleImg.length > 0 && (
                        <img src={`${import.meta.env.VITE_SERVER_LINK}/${data.vehicleImg[0].replace(/\\/g, '/')}`} alt="Vehicle Image" className={profile.vehicleImg} />
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
                      <button className={profile.bookbtn} onClick={() => deleteRentItem(data._id)}>Delete</button>
                    </div>
                  </div>
                )
              }) : <h1 className={profile.heading2}>Data not found</h1>}
            </div>
            <h1 className={profile.title}>For Sell:-</h1>
            <div className={profile.container}>
              {sellHistory.length > 0 ? sellHistory.map((data) => {
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
                      <button className={profile.bookbtn} onClick={() => deleteSellItem(data._id)}>Delete</button>
                    </div>
                  </div>
                )
              }) : <h1 className={profile.heading2}>Data not found</h1>}
            </div>
            <br />
            <br />
            <Footer />
          </div>
          </div>
          : 
          <div className={profile.error}>
            <h1 ><lord-icon
              src="https://cdn.lordicon.com/usownftb.json"
              trigger="hover"
              colors="primary:#03254c,secondary:#66eece"
              style={{ width: "200px", height: "200px" }}>
            </lord-icon></h1>
            <h1>Please login first</h1>
          </div>}
    </div>
  )
}


export default Profile
