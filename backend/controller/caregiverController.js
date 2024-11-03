import caregiverModel from "../models/caregiverModel.js";


const changeAvailability = async (req, res) => {
    try {
        
        const {docId} = req.body
        const docData = await caregiverModel.findById(docId)
        await caregiverModel.findByIdAndUpdate(docId, {available: !docData.available})
        res.json({success:true, message: "Availability status updated"})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
        
    }
}

const doctorList = async (req, res) => {
    try {
        const doctors = await caregiverModel.find({}).select(['-password', '-email'])

        res.json({success: true, doctors})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

export {changeAvailability, doctorList}