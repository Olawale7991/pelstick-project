import express from "express";
import { addCaregiver,allCaregivers,loginAdmin } from "../controller/adminController.js";
import upload from '../middlewares/multer.js'
import authAdmin from "../middlewares/authAdmin.js";
import { changeAvailability } from "../controller/caregiverController.js";

const adminRouter = express.Router()

adminRouter.post("/add-caregiver",authAdmin, upload.single('image'), addCaregiver)
adminRouter.post("/login",loginAdmin)
adminRouter.post("/all-caregivers",authAdmin,allCaregivers)
adminRouter.post("/update-availability",authAdmin,changeAvailability)

export default adminRouter;