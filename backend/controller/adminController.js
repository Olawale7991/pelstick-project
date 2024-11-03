import validator from "validator"
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import caregiverModel from "../models/caregiverModel.js"
import jwt from 'jsonwebtoken'


//API for adding caregivers
const addCaregiver = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file;

        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.status(400).json({ success: false, message: 'Please fill in all fields' });
        }

        // Email validation
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: 'Please enter a valid email format' });
        }

        // Password validation
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: 'Please enter a strong password' });
        }

        // Hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Uploading to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
        const imageUrl = imageUpload.secure_url;

        const caregiverData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now(),
        };

        const newCaregiver = new caregiverModel(caregiverData);
        await newCaregiver.save();

        res.json({ success: true, message: 'Caregiver added successfully' });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

//API for admin login
const loginAdmin = async (req, res) =>{
    try {
        const {email, password} = req.body

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            return res.status(200).json({success:true,token})

        } else{
          return res.status(400).json({success:false,message:"invalid email or password"})
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message: error.message})
    }
}

//API for admin add-caregiver

const allCaregivers =async (req, res) => {
    try {
        const caregivers = await caregiverModel.find({}).select('-password')
        res.json({ success:true, caregivers })

    } catch (error) {
        console.log(error);
        
        res.json({success:false, message:error.message})
    }
}

export {addCaregiver, loginAdmin, allCaregivers}