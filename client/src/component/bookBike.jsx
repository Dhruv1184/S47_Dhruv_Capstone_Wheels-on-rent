import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import book from '../css/book.module.css'
const BookBike = () => {
    const { id } = useParams()
    const [name, setName] = useState("")
    const [contact, setContact] = useState("")
    const [address, setAddress] = useState("")
    const [returnDate, setReturn] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [duration, setDuration] = useState("")
    const [data, setData] = useState([])
    const [error, setError] = useState("")

    useEffect(()=>{
        axios.get(`http://localhost:7000/rent/${id}`)
        .then(res=>{
            setData(res.data)
        }).catch(err=>{
            console.log(err)
        })
    },[])
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(contact.length < 10 || contact.length > 10){
            setError("Please enter a valid contact number")
        }
        else{
            const message = `Hi ${data.owner},I am ${name} I am interested in booking a bike on ${date} at ${time} and I will return on ${returnDate} at ${duration}`
            const encodedmesage = encodeURIComponent(message)
            const WhatsappUrl = `https://wa.me/91${data.contact}?text=${encodedmesage}`
            window.open(WhatsappUrl,'_blank')
        }
    }
    console.log(data)
  return (
    <div className={book.main}>
        <div className={book.bikeDetail} >
            <h1>Bike Detail</h1>
            <div className={book.bikeContainer}>
                <div className={book.images}>
                    {data.vehicleImg && <img src={`http://localhost:7000/${data.vehicleImg[0].replace(/\\/g, '/')}`} alt="bike Image" className={book.img} />}
                    {data.ownerImg && <img src={`http://localhost:7000/${data.ownerImg[0].replace(/\\/g, '/')}`} alt="bike Image"  className={book.img}/>}
                </div>
                <p>Owner name: <span className={book.detail}>{data.owner}</span> </p>
                <p>Model: <span className={book.detail}>{data.model}</span> </p>
                <p>Registration: <span className={book.detail}>{data.registration}</span> </p>
                <p>Price: Rs. <span className={book.detail}>{data.price}</span> </p>
                <p>Vehicle company: <span className={book.detail}>{data.vehicle}</span> </p>
                <p>Available at: <span className={book.detail}>{data.address}</span> </p>
                <p>Contact no. : <span className={book.detail}>{data.contact}</span> </p>
                {/* <button>Book Now</button> */}
            </div>
        </div>
        <div className={book.bookingDetail}>
            <h1>Booking form</h1>
            <div className={book.form}>
                <form className={book.form}>
                    <div className={book.inputs}>
                        <label htmlFor="name">Your name:</label>
                        <input type="text" id="name" required onChange={(e)=>setName(e.target.value)}/>
                    </div>
                    <div className={book.inputs}>
                        <label htmlFor="contact">Contact no.:</label>
                        <input type="number" id="contact" required onChange={(e)=>setContact(e.target.value)}/>
                    </div>
                    {error && <p className={book.error}>{error}</p>}
                    <div className={book.inputs}>
                        <label htmlFor="address">Address:- </label>
                        <input type="text" id="address" required onChange={(e)=>setAddress(e.target.value)} />
                    </div>
                    <div className={book.inputs}>
                        <label htmlFor="date">Date:- </label>
                        <input type="date" id="date" required onChange={(e)=>setDate(e.target.value)} />
                    </div>
                    <div className={book.inputs}>
                        <label htmlFor="time">Pickup time:- </label>
                        <input type="time" id="time" required onChange={(e)=>setTime(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="return">Return date:-</label>
                        <input type="date" id="return" required onChange={(e)=>setReturn(e.target.value)} />
                    </div>
                    <div className={book.inputs}>
                        <label htmlFor="duration">Return time:- </label>
                        <input type="time" id="duration" required onChange={(e)=>setDuration(e.target.value)} />
                    </div>
                    <button className={book.bookbtn} onClick={(e) => handleSubmit(e)}>Book</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default BookBike
