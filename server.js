const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
app.use(express.json());
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");

app.use("/api/product",productRoute);
app.use("/api/user", userRoute);
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
