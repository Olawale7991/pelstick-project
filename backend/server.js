import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'

//config 
const app = express()
const PORT = process.env.PORT || 5000
connectDB()
connectCloudinary()

//middlewares
app.use(express.json())
app.use(cors())

//API endpoint
app.use('/api/admin',adminRouter)
app.get('/', (req, res)=> {
    res.send('API WORKING')
})

app.listen(PORT, ()=> {
    console.log(`App is running at ${PORT}`);
    
})
