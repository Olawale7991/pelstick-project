import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'olawalelokoso000@gmail.com',
    pass: 'eko4real'
  }
});

export default transporter;
