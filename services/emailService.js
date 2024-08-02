const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use any email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendConfirmationEmail = (to, slotDetails) => {
    console.log("Email Service Called");
    console.log("Slot Details:",slotDetails.date,slotDetails.startTime,slotDetails.endTime)
    console.log("Sender Email",process.env.EMAIL_USER)
    console.log("Sender Password",process.env.EMAIL_PASS)
    console.log("Receiver Email:",to)
    console.log(slotDetails)
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Appointment Confirmation',
    text: `Your appointment is confirmed for ${slotDetails.date} at ${slotDetails.startTime} - ${slotDetails.endTime}.`
  };
  console.log(mailOptions);
  return transporter.sendMail(mailOptions);
};

const sendConfirmationEmailToDoctor = (to, appointmentDetails) => {
  const { name, email, petName, disease, groomingServices } = appointmentDetails;
  const details = disease ? `Disease: ${disease}` : `Grooming Services: ${groomingServices}`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'New Appointment Booking',
    text: `The user with the following details has booked an appointment:\n\nName: ${name}\nEmail: ${email}\nPet Name: ${petName}\n${details}\n\nPlease log in to your portal to approve the appointment.`
  };
  return transporter.sendMail(mailOptions);
};



module.exports = { sendConfirmationEmail, sendConfirmationEmailToDoctor };
