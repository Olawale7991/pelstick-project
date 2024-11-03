import validator from "validator";
import bcrypt from 'bcrypt'
import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'


// API for user registration
const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body

        if(!name || !email || !password) {
            return res.status(400).json({success: false, message: 'Please fill in all fields' });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({success: false, message: 'Please enter a valid email' });

        }
        if (password.length < 8) {
            return res.status(400).json({success: false, message: 'Please enter a strong password' });
        }

        // hashing the user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword,   
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
        res.json({success: true, token})
        

    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: error.message})
    }
}

// API for admin login
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        
        if(!email || !password) {
            return res.status(400).json({success: false, message: 'Please fill in all fields' });
        }
        const user = await userModel.findOne({email})

        if(!user) {
            return res.status(404).json({success: false, message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
            return res.status(200).json({success:true, token})
        } else {
            return res.status(400).json({success:false, message:"invalid email or password"})
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: error.message})
    }
}

// API to fetch user profile
const getProfile = async (req, res) => {
    try {
        const {userId} = req.body
        const userData = await userModel.findById(userId).select('-password')
        res.json({success: true, userData})

    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: error.message})
    }
}

// API to update user profile

const updateProfile = async (req, res) => {
    try {
        const {userId, name, phone, address, dob, gender} = req.body
        const imageFile = req.file;

        if (!name || !phone || !address || !dob || !gender) {
            return res.status(400).json({success: false, message: 'Data Missing' });
            
        }
        await userModel.findByIdAndUpdate(userId, {name, phone, address:JSON.parse(address), dob, gender})
        

        if(imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
            const imageUrl = imageUpload.secure_url;

            await userModel.findByIdAndUpdate(userId, {image: imageUrl})

        }
        res.json({success: true, message: 'Profile updated successfully'})

    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: error.message})
    }
}
export {registerUser, loginUser, getProfile, updateProfile}