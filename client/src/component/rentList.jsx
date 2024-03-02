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
                <h1 className={rent.heading}>Choose a vehicle for rent</h1>
                <div className={rent.container}>
                    {rentData.map((data) => {
                        return (
                            <div key={data._id} className={rent.box}>
                                <div>
                                    {data.vehicleImg.length > 0 && (
                                        <img src={`http://localhost:7000/${data.vehicleImg[0].replace(/\\/g, '/')}`} alt="Vehicle Image" className={rent.vehicleImg}/>
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
        </div>
    )
}

export default RentList