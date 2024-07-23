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
const productRoute = require("./routes/productRoutes");
const doctorRoute = require("./routes/doctorRoute");
const slotRoute = require("./routes/slotRoute");
const doctorSlotRoute = require("./routes/doctorSlotRoutes");
const appointmentRoute = require("./routes/appointmentRoute");
const userContactDataRoute = require("./routes/userContactDataRoute");
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

app.post('/api/chat', (req, res) => {
    const userQuestion = req.body.question;
    exec(`python "C:\\Final Year Project\\backend\\scripts\\answer_question.py" "${userQuestion}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).send('Server error');
        }
        res.json({ answer: stdout.trim() });
    });
});

app.use("/api/user", userRoute);
app.use("/api/doctor", doctorRoute);
app.use("/api/slot",slotRoute);
app.use("/api/doctorSlot",doctorSlotRoute);
app.use("/api/appointment",appointmentRoute);
app.use("/api/product",productRoute)
app.use("/api/userContactData",userContactDataRoute)


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