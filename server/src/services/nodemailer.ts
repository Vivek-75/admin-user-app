import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()


export const sendEmail = (email: string, subject: string, message: string) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'vkumar.75way@gmail.com',
      pass: process.env.NODEMAILER_PASSWORD
    }
  });


  let mailOptions = {
    from: 'vkumar.75way@gmail.com',
    to: email,
    subject: subject,
    text: message
  };

  transporter.sendMail(mailOptions, function(error: unknown, info: unknown){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info);
    }
  });
}