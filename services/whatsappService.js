const twilio = require('twilio');

// Twilio credentials from environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = 'whatsapp:+14155238886'; // This is the Twilio sandbox number for WhatsApp

// Initialize Twilio client
const client = new twilio(accountSid, authToken);

// Function to send WhatsApp message
const sendWhatsAppMessage = (to, message) => {
    console.log(message)
    console.log("From Number:",fromNumber)
    console.log("To Number:",to)
  return client.messages.create({
    from: fromNumber,
    to: `whatsapp:${to}`, // WhatsApp number in international format
    body: message,
  });
};

module.exports = {
  sendWhatsAppMessage,
};
