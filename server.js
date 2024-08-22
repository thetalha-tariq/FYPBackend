const express = require("express");
const cors = require("cors");
const app = express();
var jwt = require("jsonwebtoken");
app.set("secretKey", "nodeRestApi");
app.use(cors());
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
app.use(express.json());
const userRoute = require("./routes/userRoute");
//const productRoute = require("./routes/productRoutes");
const doctorRoute = require("./routes/doctorRoute");
const slotRoute = require("./routes/slotRoute");
const doctorSlotRoute = require("./routes/doctorSlotRoutes");
const appointmentRoute = require("./routes/appointmentRoute");
const userContactDataRoute = require("./routes/userContactDataRoute");
const doctorContactDataRoute = require("./routes/doctorContactDataRoute");
const bodyParser = require('body-parser');
const orderRoutes = require("./routes/orderRoutes")
const productRoute = require("./routes/productRoutes");
const onlineConsultingRoutes = require("./routes/onlineConsultingRoute");
const questionAnswerRoute = require("./routes/questionAnswerRoute")
const axios = require('axios');
const { exec } = require('child_process');

function validateUser(req, res, next) {
    console.log("in the middleware", req.headers["x-access-token"]);
    jwt.verify(
        req.headers["x-access-token"],
        req.app.get("secretKey"),
        function (err, decoded) {
            if (err) {
                res.json({ status: "error", message: err.message, data: null });
            } else {
                req.body.userId = decoded.id;
                next();
            }
        }
    );
}
app.use(express.json());


app.use("/api/user", userRoute);
app.use("/api/doctor", doctorRoute);
app.use("/api/slot",slotRoute);
app.use("/api/doctorSlot",doctorSlotRoute);
app.use("/api/appointment",appointmentRoute);
//app.use("/api/product",productRoute);
app.use("/api/userContactData",userContactDataRoute);
app.use("/api/doctorContactData",doctorContactDataRoute);
app.use('/api/onlineConsulting', onlineConsultingRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/product", productRoute);
app.use("/api/questionAnswer", questionAnswerRoute);
app.use('/uploads', express.static('uploads'));

app.post('/api/chatbot', async (req, res) => {
    const { prompt } = req.body;
    console.log("Chat Bot Api Call")
    if (!prompt) {
        return res.status(400).send({ message: "Prompt is required" });
    }

    console.log(prompt);
    const modifiedPrompt = `PetMedi is a proposed web application that will allow pet owners to effectively take care of their pet through the efficient management of their health. This platform intends to solve the various problems that exist within the pet care market, especially for new homeowners or people with busy schedules, by creating a simple online marketplace. PetMedi has provisions for user sign-up/login, appointment with veterinary doctors, booking appointments with qualified veterinarians, grooming services, and ordering of good quality pet food and medicines. Also, there is a payment system for secure payments, the ability to customize the profile and manage it, a rating for choosing a veterinarian, repeat customer benefits, and a chatbot for quick answers to frequently asked questions. Through the provision of multiple services under one umbrella, PetMedi seeks to increase the efficiency and quality of pet care, hence providing a better experience for pet owners. The introduction of this platform will help in offering an efficient solution for pet owners on how to take care of their pets. Any question out of this scope should be answered like "This is out of context question" and also response should be in maximum 10 words or two sentence.And Besides this you can answer any question that is related to Pet life,care,haelth or anything and the question is =  ${prompt}`;
    console.log(modifiedPrompt);
    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                contents: [{parts: [{text: modifiedPrompt }]}]
            }
        );

        res.status(200).send(response.data);
    } catch (error) {
        console.error('Error calling Google Gemini API:', error);
        res.status(500).send({ message: "Error calling Google Gemini API", error });
    }
});


const port = process.env.PORT || 5000;


// app.use(function (req, res, next) {
//     let err = new Error("Not Found");
//     err.status = 404;
//     next(err);
// });
// // handle errors
// app.use(function (err, req, res, next) {
//     console.log(err);

//     if (err.status === 404) res.status(404).json({ message: "Not found" });
//     else res.status(500).json({ message: "Something looks wrong :( !!!" });
// });

app.listen(port, () => console.log(`Listening on port ${port}`));