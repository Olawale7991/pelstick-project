import axios from "axios";
import { createContext, useState } from "react";
import {toast} from 'react-toastify'



export const AdminContext =createContext()

const AdminContextProvider = (props) => {

    const [aToken, setAtoken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'): "")
    const [doctors, setDoctors] = useState([])

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getAllDoctors = async () => {
        try {
            const {data} = await axios.post(backendUrl + '/api/admin/all-caregivers',{}, {headers:{aToken}})
            if (data.success) {
                setDoctors(data.caregivers)
                console.log(data.caregivers);
                
                
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    
    const changeAvailability = async (docId)=> {
        try {
            
            const {data} = await axios.post(backendUrl + '/api/admin/update-availability', {docId}, {headers:{aToken}})

            if (data.success) {
                toast.success(data.message)
                getAllDoctors()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message) 
        }
    }
    const value = {
        aToken, setAtoken,
        backendUrl, doctors, getAllDoctors, changeAvailability,
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider