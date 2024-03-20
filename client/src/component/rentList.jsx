import React from 'react'
import Navigation from './navigation'
import rent from '../css/rentList.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'
const RentList = () => {
    const navigate = useNavigate()
    const [rentData, setData] = useState([])
    const [error, setError] = useState("")
    const { isAuthenticated, user, getAccessTokenSilently } = useAuth0()
    // const [profilePosted, setProfilePosted] = useState(false);
    useEffect(() => {
        const getRentData = async () => {
            const token = isAuthenticated ? await getAccessTokenSilently() : localStorage.getItem('token')
            console.log("ls", token);
            if (token) {
                axios.get('http://localhost:7000/rent/data', {
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(res => {
                        console.log(res)
                        setData(res.data.Data)
                    }).catch(err => {
                        console.log(err)
                    })
            } else {
                setError("Please Login First")
            }

        }

        const AuthDataInsert = async () => {
            try {
                    await axios.post('http://localhost:7000/user/insert', {
                        email: user.email,
                        name: user.name,
                        img: user.picture,
                        contact: "",
                        address: "",
                        pincode: ""
                    }).then(res => {
                        console.log(res)
                    }).catch(err => {
                        console.log(err)
                    })
                await getRentData()
            } catch (error) {
                console.log(error);
            }
        }
        getRentData()
        if(isAuthenticated){
            AuthDataInsert()
        }
    }, [isAuthenticated, getAccessTokenSilently])
    
    return (
        <div className={rent.main}>
            {error ? <h1>{error}</h1> :
                <div>
                    <Navigation />
                    {/* {isAuthenticated ? */}
                    <div className={rent.body}>
                        {/* {user.name &&
                        <div className={rent.userName}>
                            <span >Welcome... </span>
                            <span className={rent.usname}> {user.nickname}</span>
                        </div>} */}
                        <h1 className={rent.heading}>Choose a vehicle for rent</h1>
                        <div className={rent.container}>
                            {rentData.map((data) => {
                                return (
                                    <div key={data._id} className={rent.box}>
                                        <div>
                                            {data.vehicleImg.length > 0 && (
                                                <img src={`http://localhost:7000/${data.vehicleImg[0].replace(/\\/g, '/')}`} alt="Vehicle Image" className={rent.vehicleImg} />
                                            )}
                                        </div>
                                        <div className={rent.info}>
                                            <h3 className={rent.key}>Vehicle no. : <span className={rent.value}>{data.registration}</span></h3>
                                            <h1 className={rent.key}>Price/hr : Rs <span className={rent.value}>{data.price}</span></h1>
                                            <h3 className={rent.key}>Vehicle company : <span className={rent.value}>{data.vehicle}</span></h3>
                                            <h3 className={rent.key}>Model : <span className={rent.value}>{data.model}</span></h3>
                                            <h3 className={rent.key}>Available at: <span className={rent.value}>{data.address}</span></h3>
                                            <h3 className={rent.key}>Contact no. : <span className={rent.value}>{data.contact}</span></h3>
                                            <button className={rent.bookbtn} onClick={() => navigate(`/book/${data._id}`)}>Book now</button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    {/* :
                <p className={rent.error}>Please login</p>
            } */}
                </div>
            }
        </div>
    )
}

export default RentList
