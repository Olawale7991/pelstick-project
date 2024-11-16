import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import {toast} from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {
  
  const [docImg, setDocImg] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('General caregiver')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')

  const {backendUrl, aToken} = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
      event.preventDefault()

      try {
        if (!docImg) {
          return toast.error('Image Not Selected')
        }

        const formData = new FormData()

        formData.append('name', name)
        formData.append('email', email)
        formData.append('image', docImg)
        formData.append('password', password)
        formData.append('speciality', speciality)
        formData.append('degree', degree)
        formData.append('experience', experience)
        formData.append('about', about)
        formData.append('fees', Number(fees))
        formData.append('address', JSON.stringify({line1:address1, line2:address2}))

        //console log fomrdata
        formData.forEach((value,key)=> {
          console.log(`${key} : ${value}`);
          
        })
        
        const {data} = await axios.post(backendUrl + '/api/admin/add-caregiver', formData, {headers:{aToken}})
          console.log(data);
          
        if (data.success) {
          toast.success(data.message)
          setDocImg(false)
          setName('')
          setEmail('')
          setPassword('')
          setAddress1('')
          setAddress2('')
          setDegree('')
          setAbout('')
          setFees('')

        } else {
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
        console.log(error);
        
      }
  }

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Caregiver</p>

      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img className="w-16 bg-gray-100 rounded-full cursor-pointer" src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e)=>setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
          <p>
            Upload caregiver <br /> picture
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex-col flex gap-1">
              <p>Caregiver name</p>
              <input onChange={(e)=>setName(e.target.value)} value={name} className="border rounded px-3 py-2" type="text" placeholder="Enter your name" required />
            </div>

            <div className="flex-1 flex-col flex gap-1">
              <p>Caregiver email</p>
              <input onChange={(e)=>setEmail(e.target.value)} value={email} className="border rounded px-3 py-2" type="email" placeholder="Enter your email" required />
            </div>

            <div className="flex-1 flex-col flex gap-1">
              <p>Caregiver password</p>
              <input onChange={(e)=>setPassword(e.target.value)} value={password} className="border rounded px-3 py-2"
                type="password"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex-1 flex-col flex gap-1">
              <p>Experience</p>
              <select onChange={(e)=>setExperience(e.target.value)} value={experience} className="border rounded px-3 py-2" name="" id="">
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Years</option>
                <option value="3 Year">3 Years</option>
                <option value="4 Year">4 Years</option>
                <option value="5 Year">5 Years</option>
                <option value="6 Year">6 Years</option>
                <option value="7 Year">7 Years</option>
                <option value="8 Year">8 Years</option>
                <option value="9 Year">9 Years</option>
                <option value="10 Year">10 Years</option>
              </select>
            </div>

            <div className="flex-1 flex-col flex gap-1">
              <p>Caregiver fees</p>
              <input onChange={(e)=>setFees(e.target.value)} value={fees} className="border rounded px-3 py-2" type="number" placeholder="Fees" required />
            </div>
          </div>

          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex-col flex gap-1">
              <p>Speciality</p>
              <select onChange={(e)=>setSpeciality(e.target.value)} value={speciality} className="border rounded px-3 py-2" name="" id="">
                <option value="General caregiver">General caregiver</option>
                <option value="Volunteer caregiver">Volunteer caregiver</option>
                <option value="Independent caregiver">
                  Independent caregiver
                </option>
                <option value="Professional caregiver">
                  Professional caregiver
                </option>
                <option value="Family caregiver">Family caregiver</option>
                <option value="Companion caregiver">Companion caregiver</option>
              </select>
            </div>

            <div className="flex-1 flex-col flex gap-1">
              <p>Education</p>
              <input onChange={(e)=>setDegree(e.target.value)} value={degree} className="border rounded px-3 py-2" type="text" placeholder="Education" required />
            </div>

            <div className="flex-1 flex-col flex gap-1">
              <p>Address</p>
              <input onChange={(e)=>setAddress1(e.target.value)} value={address1} className="border rounded px-3 py-2" type="text" placeholder="address 1" required />
              <input onChange={(e)=>setAddress2(e.target.value)} value={address2} className="border rounded px-3 py-2" type="text" placeholder="address 2" required />
            </div>
          </div>
        </div>

        <div>
          <p className="mt-4 mb-2">About Caregiver</p>
          <textarea onChange={(e)=>setAbout(e.target.value)} value={about} className="w-full px-4 pt-2 border rounded"
            placeholder="write about caregiver"
            rows={5}
            required
          ></textarea>
        </div>

        <button type="submit" className="bg-primary px-10 py-3 mt-4 text-white rounded-full">Add Caregiver</button>
      </div>
    </form>
  );
};

export default AddDoctor;
