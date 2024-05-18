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
const productRoute = require("./routes/productRoute");


function validateUser(req, res, next) {
    console.log("in the middleware", req.headers["x-access-token"]);
    jwt.verify(
        req.headers["x-access-token"],
        req.app.get("secretKey"),
        function (err, decoded) {
            if (err) {
                res.json({ status: "error", message: err.message, data: null });
            } else {
                // add user id to request
                req.body.userId = decoded.id;
                next();
            }
        }
    );
}

app.use("/api/product", validateUser, productRoute);
app.use("/api/user", userRoute);
const port = process.env.PORT || 5000;



// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use(function (req, res, next) {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
});
// handle errors
app.use(function (err, req, res, next) {
    console.log(err);

    if (err.status === 404) res.status(404).json({ message: "Not found" });
    else res.status(500).json({ message: "Something looks wrong :( !!!" });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
