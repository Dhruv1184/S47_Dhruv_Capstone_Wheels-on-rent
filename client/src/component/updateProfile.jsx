import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import updateStyle from '../css/updateProfile.module.css'
const UpdateProfile = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [contact, setContact] = useState('')
    const [address, setAddress] = useState('')
    const [pincode, setPincode] = useState('')
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_SERVER_LINK}/user/${id}`)
            .then(res => {
                setData(res.data)
                setName(res.data.name)
                setEmail(res.data.email)
                // setImg(res.data.img)
                setContact(res.data.contact)
                setAddress(res.data.address)
                setPincode(res.data.pincode)
            }).catch(err => {
                console.log(err)
            })
    }, [])
    // console.log(data)
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`${import.meta.env.VITE_SERVER_LINK}/user/update/${id}`, { name, contact, address, pincode })
            .then(res => {
                // console.log(res)
                navigate('/profile')
                alert('Profile updated successfully')
            }).catch(err => {
                console.log(err)
            })
    }
    return (
        <div className={updateStyle.body}>
            <div className={updateStyle.form}>
                <h1 className={updateStyle.heading}>Update Profile</h1>
                <form onSubmit={(e) => handleSubmit(e)} className={updateStyle.update}>
                    <div className={updateStyle.inputData}>
                        <label htmlFor="name">Name:</label>
                        <input type="text" value={name} id='name' className={updateStyle.input} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className={updateStyle.inputData}>
                        <label htmlFor="email">Email:</label>
                        <input type="text" value={email} id='email' className={updateStyle.input} onChange={(e) => setEmail(email)} />
                    </div>
                    <div className={updateStyle.inputData}>
                        <label htmlFor="contact">Contact:</label>
                        <input type="text" value={contact} className={updateStyle.input} placeholder='Enter a contact' id='contact' onChange={(e) => setContact(e.target.value)} />
                    </div>
                    <div className={updateStyle.inputData}>
                        <label htmlFor="address">Address:</label>
                        <input type="text" value={address} className={updateStyle.input} placeholder='Enter a address' id='address' onChange={(e) => setAddress(e.target.value)} />
                    </div>
                    <div className={updateStyle.inputData}>
                        <label htmlFor="pincode">Pincode:</label>
                        <input type="text" value={pincode} className={updateStyle.input} placeholder='Enter a pincode' id='pincode' onChange={(e) => setPincode(e.target.value)} />
                    </div>
            <button type='submit' className={updateStyle.btn}>Update</button>
        </form>
        </div >
    </div >
  )
}

export default UpdateProfile
