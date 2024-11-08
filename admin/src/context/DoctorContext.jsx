import { createContext, useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'



export const DoctorContext =createContext()

const DoctorContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [dToken, setDToken] = useState(localStorage.getItem('dToken')?localStorage.getItem('dToken'): "")

    const [appointments, setAppointments] = useState([])

    const getAppointments = async () => {
        try {
            const { data } = await axios.get( backendUrl + '/api/caregiver/appointments', { headers: { dToken } })
            if (data.success) {
                setAppointments(data.appointments.reverse())
                console.log(data.appointments.reverse());
                
            } else {
                toast.error(data.message)
                
            }
            
        } catch (error) {
            toast.error(error.message)
            console.log(error.message);
            
        }
    }

    const markAppointment = async (appointmentId) => {

        try {

            const { data } = await axios.post(backendUrl + '/api/caregiver/mark-appointment', { appointmentId }, { headers: { dToken } })

            if (data.success) {
                toast.success(data.message)
                getAppointments()
                
            } else {
                toast.error(data.message)
                
            }
            
        } catch (error) {
            toast.error(error.message)
            console.log(error.message);
        }

    }
    const cancelAppointment = async (appointmentId) => {

        try {

            const { data } = await axios.post(backendUrl + '/api/caregiver/cancel-appointment', { appointmentId }, { headers: { dToken } })

            if (data.success) {
                toast.success(data.message)
                getAppointments()
                
            } else {
                toast.error(data.message)
                
            }
            
        } catch (error) {
            toast.error(error.message)
            console.log(error.message);
        }

    }



    const value = {
        dToken, setDToken,
        backendUrl, appointments,
        setAppointments, getAppointments,
        markAppointment, cancelAppointment,
        
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider