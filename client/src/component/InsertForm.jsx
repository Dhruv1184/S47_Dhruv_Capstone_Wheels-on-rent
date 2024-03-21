import React from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import form from '../css/form.module.css';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router';
const InsertForm = ({ formTitle, formUrl }) => {
  const { user, isAuthenticated } = useAuth0();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    alert('Data inserted successfully');
    navigate('/profile');

    const formData = new FormData();
    formData.append('owner', data.owner);
    formData.append('registration', data.registration);
    formData.append('vehicle', data.vehicle);
    formData.append('model', data.model);
    formData.append('year', data.year);
    formData.append('price', data.price);
    formData.append('address', data.address);
    formData.append('pincode', data.pincode);
    formData.append('contact', data.contact);
    formData.append('ownerImg', data.ownerImg[0]);
    formData.append('vehicleImg', data.vehicleImg[0]);
    formData.append('email', user.email);

    axios({
      method: 'post',
      url: formUrl,
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData
    }).then((res) => {
      console.log("Data inserted successfully", formData);
    }).catch((err) => console.log(err));
  };
  return (
    <div>
      {/* {isAuthenticated ? */}
      <div className={form.body}>
        <div className={form.box}>
          <h1 className={form.heading}>{formTitle}</h1>
          <form onSubmit={handleSubmit(onSubmit)} method="post" encType="multipart/form-data">
            <div className={form.data}>
              <label htmlFor="owner">Owner Name:</label>
              <input type="text" placeholder='Enter a owner name' id='owner' {...register("owner",
                {
                  required: "Owner name is required", minLength: {
                    value: 3,
                    message: "Owner name must be at least 3 characters"
                  }
                })} />
            </div>
            {errors.owner && <p className={form.error}>{errors.owner.message}</p>}
            <div className={form.data}>
              <label htmlFor="registration">Vehicle No.: </label>
              <input type="text" placeholder='Enter a registration number' id='registration' {...register("registration", { required: "Registration is required" })} />
            </div>
            {errors.registration && <p className={form.error}>{errors.registration.message}</p>}
            <div className={form.data}>
              <label htmlFor="company">Vehicle company:</label>
              <input type="text" placeholder='Enter a vehicle company' id='company' {...register("vehicle", { required: "Vehicle company is required" })} />
            </div>
            {errors.vehicle && <p className={form.error}>{errors.vehicle.message}</p>}
            <div className={form.data}>
              <label htmlFor="model">Vehicle model: </label>
              <input type="text" placeholder='Enter a model' id='model' {...register("model", { required: "Model is required" })} />
            </div>
            {errors.model && <p className={form.error}>{errors.model.message}</p>}
            <div className={form.data}>
              <label htmlFor="year">Registration Year: </label>
              <input type="month" placeholder='Enter a registration year' id='year' {...register("year", { required: "Year is required" })} />
            </div>
            {errors.year && <p className={form.error}>{errors.year.message}</p>}
            <div className={form.data}>
              <label htmlFor="price">Price/hr: </label>
              <input type="number" placeholder='Enter a price in Rs.' id='price' {...register("price", { required: "Price is required" })} />
            </div>
            {errors.price && <p className={form.error}>{errors.price.message}</p>}
            <div className={form.data}>
              <label htmlFor="address">Address: </label>
              <input type="text" placeholder='Enter your address' id='address' {...register("address", { required: "Address is required" })} />
            </div>
            {errors.address && <p className={form.error}>{errors.address.message}</p>}
            <div className={form.data}>
              <label htmlFor="pincode">Pincode: </label>
              <input type="text" placeholder='Enter your area pincode' id='pincode'
                {...register("pincode", {
                  required: "Pincode is required",
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: "Pincode must be a valid"
                  }
                })} />
            </div>
            {errors.pincode && <p className={form.error}>{errors.pincode.message}</p>}
            <div className={form.data}>
              <label htmlFor="contact">WhatsApp No.: </label>
              <input type="number" placeholder='Enter your WhatsApp no.' id='contact'
                {...register("contact", {
                  required: "Contact No. is required",
                  minLength: {
                    value: 10,
                    message: "contact no. must be 10 digits"
                  }, maxLength: {
                    value: 10,
                    message: "contact no. must be 10 digits"
                  }
                })} />
            </div>
            {errors.contact && <p className={form.error}>{errors.contact.message}</p>}
            <div className={form.data}>
              <label htmlFor="ownerImg">Owner Image: </label>
              <input type="file" id='ownerImg' {...register("ownerImg", { required: "Owner Image is required" })} />

            </div>
            {errors.ownerImg && <p className={form.error}>{errors.ownerImg.message}</p>}
            <div className={form.data}>
              <label htmlFor="vehicleImg">Vehicle Image: </label>
              <input type="file" id='vehicleImg' {...register("vehicleImg", { required: "Vehicle Image is required" })} />
            </div>
            {errors.vehicleImg && <p className={form.error}>{errors.vehicleImg.message}</p>}
            <div className={form.btn}>
              <button type='submit' className={form.submit}  >Insert</button>
              <button className={form.cancel}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
      {/* : <p>Please login</p>} */}
    </div>
  )
}

export default InsertForm
