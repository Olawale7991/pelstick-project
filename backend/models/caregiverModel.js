import mongoose from "mongoose";

const caregiverSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    speciality: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    },
    fees: {
        type: Number,
        required: true
    },
    address: {
        type: Object,
        required: true,
    },
    date: {
        type: Number,
        required: true,
    },
    slots_booked: {
        type: Object,
        default: {}
    }, 


}, {minimize: false}) //so i can use empty object as default and store caregivers appointment there

const caregiverModel = mongoose.model.caregivers || mongoose.model('caregivers', caregiverSchema);

export default caregiverModel