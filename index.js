const express = require("express");
const app = express();
const cors = require('cors');
const ejs = require("ejs");
const https = require("https");
const bodyParser = require("body-parser");
const path = require("path");
const nodemailer = require("nodemailer");
const _ = require("lodash");
require("dotenv").config();
const port = 3000;

// setting views & use cases
app.use(cors()); 
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Nodemailer configuration
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.senderEmail, // Corrected Gmail address
      pass: process.env.pass, // Use the app-specific password here
    },
    tls: {
      rejectUnauthorized: false,
    },
});
  
// Route directory
app.route("/sendemail")
    // getting verification
    .get(function (req, res) {
        res.send("Success");
    })
    // send a new mail
    .post(function (req, res) {
        const requestData = req.body;
        console.log(requestData);

        if (requestData.name && requestData.pickup) {
            // Create email options
            const mailOptions = {
                from: process.env.senderEmail, // Corrected Gmail address
                to: requestData.recepient, // Replace with the recipient's email address
                subject: `New Ride Booking: ${requestData.name}`,
                html: `
                <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>New Ride Booking</title>
                </head>
                <body style="font-family: 'Arial', sans-serif; background-color: #f4f4f4; color: #333; line-height: 1.6; padding: 20px;">
                <div style="background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1); max-width: 600px; margin: 20px auto;">
                    <h2 style="color: #444; border-bottom: 2px solid #444; padding-bottom: 10px; margin-bottom: 20px;">New Ride Booking</h2>
                    <div style="background: #f9f9f9; border-left: 4px solid #007bff; padding: 10px; margin: 10px 0;">
                        <p style="margin: 10px 0;"><strong style="font-weight: bold;">Name:</strong> ${requestData.name}</p>
                        <p style="margin: 10px 0;"><strong style="font-weight: bold;">Email:</strong> ${requestData.email}</p>
                        <p style="margin: 10px 0;"><strong style="font-weight: bold;">Pickup Location:</strong> ${requestData.pickup}</p>
                        <p style="margin: 10px 0;"><strong style="font-weight: bold;">Stops:</strong> ${requestData.via}</p>
                        <p style="margin: 10px 0;"><strong style="font-weight: bold;">Drop-off Location:</strong> ${requestData.dropoff}</p>
                        <p style="margin: 10px 0;"><strong style="font-weight: bold;">Phone Number:</strong> ${requestData.phone}</p>
                        <p style="margin: 10px 0;"><strong style="font-weight: bold;">Fleet:</strong> ${requestData.fleet}</p>
                        <p style="margin: 10px 0;"><strong style="font-weight: bold;">Date:</strong> ${requestData.date}</p>
                        <p style="margin: 10px 0;"><strong style="font-weight: bold;">Time:</strong> ${requestData.time}</p>
                        <p style="margin: 10px 0;"><strong style="font-weight: bold;">Payment Method:</strong> ${requestData.paymentMethod}</p>
                    </div>
                </div>
                </body>
                `,
            };

            // Send email
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.error(error);
                    res.send("Error sending email");
                } else {
                    console.log('Email sent: ' + info.response);
                    res.send("Success");
                }
            });
        } else {
            res.send("Invalid Parameters!");
        }
    });

app.listen(process.env.PORT || port, function () {
    if (process.env.PORT) {
        console.log(`App live on port:${process.env.PORT}`)
    } else {
        console.log(`App live on http://localhost:${port}`);
    }
});
