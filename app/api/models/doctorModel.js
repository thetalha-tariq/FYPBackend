const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        specialization: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        experience: {
            type: Number,
            required: true,
        },
        qualifications: {
            type: [String],
            required: true,
        },
        userRole: {
            type: String,
            trim: true,
            default: "doctor",
        },
        timings: {
            type: Object,
            required: true,
        },

    }
);

const doctorModel = mongoose.model("doctors", doctorSchema);

module.exports = doctorModel;
