// Import the required modules
const express = require('express');
const nodemailer = require('nodemailer');

// Create an instance of Express
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Replace with your SMTP server
    port: 587, // Usually 587 for TLS
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'verificatmail231@gmail.com', // Your email
        pass: 'zwoc wcve ibrc ixtb' // Your email password or app password
    },
    tls: {
        rejectUnauthorized: false // This can help avoid issues with self-signed certificates
    }
});

// Set up a basic route
app.get('/', (req, res) => {
    res.send('Welcome to the Email API!');
});
// Endpoint to send an email with OTP using a POST request
app.post('/email/otp/:email/:otp', (req, res) => {
    const { email, otp } = req.params;
    
    const mailOptions = {
        from: '"Meri Tees" <verificatmail231@gmail.com>',
        to: email,
        subject: 'Your Meri Tees Verification Code',
        text: `Your verification code is: ${otp}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333;">Welcome to Meri Tees!</h2>
                <p>Thank you for signing up. Please use the following code to verify your account:</p>
                <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; text-align: center; margin: 20px 0;">
                    <span style="font-size: 24px; font-weight: bold; letter-spacing: 2px;">${otp}</span>
                </div>
                <p>This code will expire in 10 minutes.</p>
                <p>If you didn't request this code, please ignore this email.</p>
                <p>Best regards,<br>The Meri Tees Team</p>
            </div>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Email error:', error);
            return res.status(500).json({ error: 'Failed to send verification code' });
        }
        res.status(200).json({ success: true });
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
