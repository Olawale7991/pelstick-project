import express from 'express'
import { cancelAppointment, caregiverAppointments, caregiverLogins, doctorList, markAppointment } from '../controller/caregiverController.js'
import authCaregiver from '../middlewares/authCaregiver.js'

const doctorRouter = express.Router()


doctorRouter.get('/list', doctorList)
doctorRouter.post('/login', caregiverLogins)
doctorRouter.get('/appointments', authCaregiver, caregiverAppointments)
doctorRouter.post('/mark-appointment', authCaregiver, markAppointment)
doctorRouter.post('/cancel-appointment', authCaregiver, cancelAppointment)

export default doctorRouter