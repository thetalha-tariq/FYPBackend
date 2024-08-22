const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users', 
        required: true 
    },
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String 
    },
    image:{
        type: String
    },
    upvotes: { 
        type: Number, 
        default: 0 
    },
    downvotes: { 
        type: Number, 
        default: 0 
    },
    upvotedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    downvotedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    category:{
        type:String
    },
    //tags: [String],  // Optional: Tags for categorizing questions
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Question', questionSchema);
