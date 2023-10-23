const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // e.g., 'Gmail', 'Outlook', 'Yahoo', etc.
  auth: {
    user: "texticketsexchange@gmail.com", // Your email address
    pass: "oaio wtpw fglm xssn" // Your email password or app-specific password 
}
});

// Email data
function sendEmailWithAttachment(
    from,
    to,
    subject,
    text,
    pdfFileName,
    pdfFilePath
  ) {
    // Email data
    const mailOptions = {
      from,
      to,
      subject,
      text,
      attachments: [
        {
          filename: pdfFileName,
          path: pdfFilePath,
          contentType: 'application/pdf'
        }
      ]
    };
  
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email: ' + error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
  
  // Example usage:
  const from = "texticketsexchange@gmail.com";
  const to = 'jvinicius2002@gmail.com';
  const subject = 'Email Subject';
  const text = 'Email Text';
  const pdfFileName = 'example.pdf';
  const pdfFilePath = path.join("C:/Users/sammy/Downloads/joao - 991080.pdf");
  
  sendEmailWithAttachment(from, to, subject, text, pdfFileName, pdfFilePath);
