const mongoose = require("mongoose");

const timingsSchema = new mongoose.Schema({
  monday: {
    slot1: {
      slot_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'slots', // assuming you have a separate Slot model
        required: true,
      },
      booked: {
        type: Boolean,
        default: false,
      },
    },
    slot2: {
      slot_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'slots',
        required: true,
      },
      booked: {
        type: Boolean,
        default: false,
      },
    },
    slot3: {
      slot_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'slots',
        required: true,
      },
      booked: {
        type: Boolean,
        default: false,
      },
    },
    slot4: {
      slot_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'slots',
        required: true,
      },
      booked: {
        type: Boolean,
        default: false,
      },
    },
  },
  tuesday: {
    slot1: {
      slot_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'slots',
        required: true,
      },
      booked: {
        type: Boolean,
        default: false,
      },
    },
    slot2: {
      slot_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'slots',
        required: true,
      },
      booked: {
        type: Boolean,
        default: false,
      },
    },
    slot3: {
      slot_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'slots',
        required: true,
      },
      booked: {
        type: Boolean,
        default: false,
      },
    },
    slot4: {
      slot_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'slots',
        required: true,
      },
      booked: {
        type: Boolean,
        default: false,
      },
    },
  },
  wednesday: {
    slot1: {
      slot_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'slots',
        required: true,
      },
      booked: {
        type: Boolean,
        default: false,
      },
    },
    slot2: {
      slot_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'slots',
        required: true,
      },
      booked: {
        type: Boolean,
        default: false,
      },
    },
    slot3: {
      slot_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'slots',
        required: true,
      },
      booked: {
        type: Boolean,
        default: false,
      },
    },
    slot4: {
      slot_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'slots',
        required: true,
      },
      booked: {
        type: Boolean,
        default: false,
      },
    },
  },
  thursday: {
    slot1: {
      slot_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'slots',
        required: true,
      },
      booked: {
        type: Boolean,
        default: false,
      },
    },
    slot2: {
      slot_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'slots',
        required: true,
      },
      booked: {
        type: Boolean,
        default: false,
      },
    },
    slot3: {
      slot_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'slots',
        required: true,
      },
      booked: {
        type: Boolean,
        default: false,
      },
    },
    slot4: {
      slot_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'slots',
        required: true,
      },
      booked: {
        type: Boolean,
        default: false,
      },
    },
  },
  friday: {
    slot1: {
      slot_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'slots',
        required: true,
      },
      booked: {
        type: Boolean,
        default: false,
      },
    },
    slot2: {
      slot_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'slots',
        required: true,
      },
      booked: {
        type: Boolean,
        default: false,
      },
    },
    slot3: {
      slot_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'slots',
        required: true,
      },
      booked: {
        type: Boolean,
        default: false,
      },
    },
    slot4: {
      slot_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'slots',
        required: true,
      },
      booked: {
        type: Boolean,
        default: false,
      },
    },
  },
  saturday: {
    slot1: {
      slot_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'slots',
        required: true,
      },
      booked: {
        type: Boolean,
        default: false,
      },
    },
    slot2: {
      slot_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'slots',
        required: true,
      },
      booked: {
        type: Boolean,
        default: false,
      },
    },
    slot3: {
      slot_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'slots',
        required: true,
      },
      booked: {
        type: Boolean,
        default: false,
      },
    },
    slot4: {
      slot_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'slots',
        required: true,
      },
      booked: {
        type: Boolean,
        default: false,
      },
    },
  },
});

const doctorSchema = new mongoose.Schema({
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
    type: timingsSchema,
    required: true,
  },
});

const doctorModel = mongoose.model("doctors", doctorSchema);

module.exports = doctorModel;
