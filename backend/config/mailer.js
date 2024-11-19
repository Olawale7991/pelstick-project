import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net', 
  port: 587,                
  secure: false,            
  auth: {
    user: 'apikey',        
    pass: process.env.SENDGRID_API_KEY, 
  },
});

export default transporter;
