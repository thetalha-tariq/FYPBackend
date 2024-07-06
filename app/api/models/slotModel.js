const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema(
    {
        startTime: {
            type: String,
            required: true,
        },
        endTime: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const slotModel = mongoose.model("slots", slotSchema);

module.exports = slotModel;
