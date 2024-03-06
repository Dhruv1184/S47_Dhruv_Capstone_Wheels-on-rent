import React from 'react'
import Navigation from './navigation'
import rent from '../css/rentList.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react'
const SaleList = () => {
    const [rentData, setData] = useState([])
    const { isAuthenticated, user } = useAuth0()
    useEffect(() => {
        axios.get('http://localhost:7000/sale/data')
            .then(res => {
                setData(res.data)
            }).catch(err => {
                console.log(err)
            })
    }, [])
    console.log(isAuthenticated)
    console.log(user)
    return (
        <div className={rent.main}>
            <Navigation />
            {isAuthenticated ?
                <div className={rent.body}>
                    {user.name && 
                    <div className={rent.userName}>
                        <span >Welcome... </span> 
                        <span className={rent.usname}> {user.nickname}</span>
                    </div>}
                    <h1 className={rent.heading}>Choose a vehicle for buy</h1>
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
                                        <button className={rent.bookbtn}>Book now</button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                :
                <p className={rent.error}>Please login</p>
            }
        </div>
    )
}

export default SaleList
