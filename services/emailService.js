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
    text: `Your appointment is confirmed for ${slotDetails.date} at ${slotDetails.startTime} - ${slotDetails.endTime}.
    Thank you for choosing our service.

  Best regards,
  Pet Medi Connect

  This is an automated message`
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
    text: `The user with the following details has booked an appointment:\n\nName: ${name}\nEmail: ${email}\nPet Name: ${petName}\n${details}\n\nPlease log in to your portal to approve the appointment.
    Thank you for choosing our service.

  Best regards,
  Pet Medi Connect

  This is an automated message`
  };
  return transporter.sendMail(mailOptions);
};
const sendEmailToUser = (to, consultationDetails) => {
  const { date, time } = consultationDetails;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Online Consultation Approved',
    text: `Your online consultation for ${date} at ${time} has been approved by the doctor. Kindly pay for the appointment to receive the meeting link.
    Thank you for choosing our service.
    You have to send whatsapp message of "join gift-baseball" to +14155238886 for receiving message upadte 
  Best regards,
  Pet Medi Connect

  This is an automated message`
  };
  return transporter.sendMail(mailOptions);
};
const sendOnlineConfirmationEmail = (to, { date, time, meetingLink }) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Online Consultation Appointment Details',
    text: `
Dear Customer,

Your online consultation appointment has been confirmed with the following details:

Date: ${date}
Time: ${time}
Meeting Link: ${meetingLink}

Please make sure to join the meeting on time. If you have any questions, feel free to contact us.

Thank you for choosing our service.

Best regards,
Pet Medi Connect

This is an automated message, please do not reply.
`,
  };
  return transporter.sendMail(mailOptions);
};

const sendContactDataFromUserForm =(to, name,email,phone,message)=>{
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Contact Form Data From User',
    text: `The Message from ${name} with Email: ${email} and phone: ${phone} and message is : ${message}`,
  };
  return transporter.sendMail(mailOptions);
}
const sendContactDataFromDoctorForm =(to ,name,email,phone,message )=>{
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Contact Form Data From Doctor',
    text: `The Message from ${name} with Email: ${email} and phone: ${phone} and message is : ${message}`,
  };
  return transporter.sendMail(mailOptions);
}

module.exports = { sendConfirmationEmail, sendConfirmationEmailToDoctor,sendEmailToUser,sendOnlineConfirmationEmail,sendContactDataFromUserForm,sendContactDataFromDoctorForm };
