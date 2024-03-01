import React from 'react'
import Navigation from './navigation'
import rent from '../css/rentList.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
const RentList = () => {
    const [rentData, setData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:7000/rent/data')
            .then(res => {
                setData(res.data)
            }).catch(err => {
                console.log(err)
            })
    }, [])
    console.log(rentData)

    return (
        <div className={rent.main}>
            <Navigation />
            <div className={rent.body}>
                <h1>Rent List</h1>
                <div>
                    {rentData.map((data) => {
                        return (
                            <div key={data._id} className={rent.box}>
                                <div>
                                    {data.vehicleImg.length > 0 && (
                                        <img src={`http://localhost:7000/${data.vehicleImg[0].replace(/\\/g, '/')}`} alt="Vehicle Image" className={rent.vehicleImg}/>
                                        )}
                                </div>
                                <div className={rent.info}>
                                    <h3>Vehicle no. : <span>{data.registration}</span></h3>
                                    <h1>Price/hr : Rs <span>{data.price}</span></h1>
                                    <h3>Vehicle company : <span>{data.vehicle}</span></h3>
                                    <h3>Model : <span>{data.model}</span></h3>
                                    <h3>Available at: <span>{data.address}</span></h3>
                                    <h3>Contact no. : <span>{data.contact}</span></h3>
                                    <button>Book now</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default RentList
