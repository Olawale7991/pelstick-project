import express from "express";
import { addCaregiver,loginAdmin } from "../controller/adminController.js";
import upload from '../middlewares/multer.js'
import authAdmin from "../middlewares/authAdmin.js";

const adminRouter = express.Router()

adminRouter.post("/add-caregiver",authAdmin, upload.single('image'), addCaregiver)
adminRouter.post("/login",loginAdmin)

export default adminRouter;