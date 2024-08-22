const OnlineConsulting = require('../models/onlineConsultingModel');
const ZoomApiHelper = require('../../../services/ZoomApiHelper');
const Doctor = require('../models/doctorModel');
const { sendWhatsAppMessage } = require('../../../services/whatsappService');
const { sendConfirmationEmailToDoctor,sendConfirmationEmail,sendEmailToUser,sendOnlineConfirmationEmail } = require('../../../services/emailService');
// Create a new online consultation
exports.createOnlineConsulting = async (req, res) => {
  try {
    const newConsulting = new OnlineConsulting(req.body);
    const savedConsulting = await newConsulting.save();
    const doctorEmail = req.body.doctorEmail;

    const {name, petName, disease, email, time, date } = newConsulting;
    console.log(doctorEmail,name,petName,disease,email,time,date);

    const appointmentDetails = { name, email, petName, disease, date, time };
    await sendConfirmationEmailToDoctor(doctorEmail, appointmentDetails);

    res.status(201).json({ message: "Online consultation created successfully", data: newConsulting });
  } catch (error) {
    res.status(500).json({ message: "Error creating online consultation", error });
  }
};
// Delete an online consultation
exports.deleteOnlineConsulting = async (req, res) => {
  try {
    const consultingId = req.params.consultingID;
    const deletedConsulting = await OnlineConsulting.findByIdAndDelete(consultingId);
    if (!deletedConsulting) {
      return res.status(404).json({ message: "Online consultation not found" });
    }
    res.status(200).json({ message: "Online consultation deleted successfully", data: deletedConsulting });
  } catch (error) {
    res.status(500).json({ message: "Error deleting online consultation", error });
  }
};

// Update an online consultation
exports.updateOnlineConsulting = async (req, res) => {
  try {
    const consultingId = req.params.consultingID;
    const updatedData = req.body;

    // Populate the userId field correctly
    const updatedConsulting = await OnlineConsulting.findByIdAndUpdate(consultingId, updatedData, { new: true }).populate('userId');
    
    if (!updatedConsulting) {
      return res.status(404).json({ message: "Online consultation not found" });
    }

    if (updatedData.approveByDoctor) {
      const consultationDetails = {
        date: updatedConsulting.date,
        time: updatedConsulting.time
      };
      await sendEmailToUser(updatedConsulting.userId.email, consultationDetails);
    }

    res.status(200).json({ message: "Online consultation updated successfully", data: updatedConsulting });
  } catch (error) {
    console.error('Error updating online consultation details:', error);
    res.status(500).json({ message: "Error updating online consultation", error });
  }
};

// Get an online consultation by ID
exports.getOnlineConsultingById = async (req, res) => {
  try {
    const consultingId = req.params.consultingID;
    const consulting = await OnlineConsulting.findById(consultingId).populate('userId doctorId');
    if (!consulting) {
      return res.status(404).json({ message: "Online consultation not found" });
    }
    res.status(200).json({ message: "Online consultation retrieved successfully", data: consulting });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving online consultation", error });
  }
};

// Get all online consultations
exports.getAllOnlineConsultings = async (req, res) => {
  try {
    const consultings = await OnlineConsulting.find().populate('userId doctorId');
    res.status(200).json({ message: "All online consultations retrieved successfully", data: consultings });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving online consultations", error });
  }
};

exports.getOnlineConsultingByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const consultings = await OnlineConsulting.find({ userId }).populate('doctorId');
    if (!consultings) {
      return res.status(404).json({ message: "Online consultations not found" });
    }
    res.status(200).json({ message: "Online consultations retrieved successfully", data: consultings });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving online consultations", error });
  }
};

exports.getOnlineConsultingByDoctorId = async (req, res) => {
  try {
    const doctorId = req.params.doctorId;
    const consultings = await OnlineConsulting.find({ doctorId }).populate('userId doctorId');
    if (!consultings) {
      return res.status(404).json({ message: "Online consultations not found" });
    }
    res.status(200).json({ message: "Online consultations retrieved successfully", data: consultings });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving online consultations", error });
  }
};

exports.approvePayment = async (req, res) => {
  try {
    const consultingId = req.params.consultingID;

    // Find the consultation and check if it exists
    const consulting = await OnlineConsulting.findById(consultingId).populate('userId');
    if (!consulting) {
      return res.status(404).json({ message: "Online consultation not found" });
    }

    // Generate the Zoom token
    const zoomApi = new ZoomApiHelper();
    const token = await zoomApi.generateToken();

    // Create the Zoom meeting
    const meetingDetails = {
      topic: `Consultation with ${consulting.userId.name}`,
      type: 2,
      start_time: `${consulting.date}T${consulting.time}`, // Assuming date and time are in ISO 8601 format
      duration: 60, // Duration in minutes
      timezone: 'UTC'
    };
    const meetingLink = await zoomApi.createMeeting(token, meetingDetails);

    // Update the consultation with the payment status and meeting link
    consulting.isPayed = true;
    consulting.zoomLink = meetingLink; // Assuming you have a zoomLink field in the model
    await consulting.save();

    const doctor = await Doctor.findById(consulting.doctorId);
    const emailDetails = {
      date: consulting.date,
      time: consulting.time,
      meetingLink: meetingLink,
    };
    sendOnlineConfirmationEmail(consulting.userId.email, emailDetails);
    sendOnlineConfirmationEmail(doctor.email, emailDetails);

   // Send WhatsApp message to the user
    const whatsappMessage = `
    Dear ${consulting.userId.name},

    Your payment for the online consultation has been approved. The consultation details are as follows:

    Date: ${consulting.date}
    Time: ${consulting.time}
    Meeting Link: ${meetingLink}

  Please make sure to join the meeting on time.

  Best regards,
  Pet Medi Connect
    `;

    await sendWhatsAppMessage(consulting.phone, whatsappMessage);

    res.status(200).json({ message: "Payment approved and Zoom meeting created successfully", data: consulting });
    
  } catch (error) {
    console.error("Error approving payment and creating Zoom meeting:", error);
    res.status(500).json({ message: "Error approving payment and creating Zoom meeting", error });
  }
};


// exports.updateOnlineConsultingStatus = async (req, res) => {
//   try {
//     const consultingId = req.params.consultingID;
//     const updatedConsulting = await OnlineConsulting.findByIdAndUpdate(
//       consultingId,
//       { approveByDoctor: true },
//       { new: true }
//     );
//     if (!updatedConsulting) {
//       return res.status(404).json({ message: "Online consultation not found" });
//     }
//     res.status(200).json({ message: "Online consultation updated successfully", data: updatedConsulting });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating online consultation", error });
//   }
// };