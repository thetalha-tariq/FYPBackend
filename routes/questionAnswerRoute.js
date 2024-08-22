const express = require('express');
const multer = require('multer'); // Make sure multer is imported here
const path = require('path');
const questionAnswerController = require('../app/api/controller/questionAnswerController');
const router = express.Router();
const Question = require('../app/api/models/questionModel');

// Set up multer for file storage
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Specify the directory where images will be stored
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Rename the file
    }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

//router.post('/createQuestion',questionAnswerController.postQuestion);
router.post('/createQuestion', upload.single('image'), questionAnswerController.postQuestion);
router.get('/getAllQuestion',questionAnswerController.getAllQuestion);
router.get('/getQuestion/:id',questionAnswerController.getQuestionById);
router.post('/createAnswer',questionAnswerController.postAnswer);
router.get('/getQuestionsByCategory/:category', questionAnswerController.getQuestionsByCategory);

router.post('/upvote/:id', async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        const userId = req.body.userId;

        // Check if the user has already upvoted
        if (question.upvotedBy.includes(userId)) {
            // User has already upvoted, remove the upvote
            question.upvotes -= 1;
            question.upvotedBy = question.upvotedBy.filter(id => id.toString() !== userId);
        } else {
            // Check if the user has downvoted before
            if (question.downvotedBy.includes(userId)) {
                // Remove the downvote
                question.downvotes -= 1;
                question.downvotedBy = question.downvotedBy.filter(id => id.toString() !== userId);
            }

            // Add the upvote
            question.upvotes += 1;
            question.upvotedBy.push(userId);
        }

        await question.save();
        res.status(200).json({ success: true, data: question });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

router.post('/downvote/:id', async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        const userId = req.body.userId;

        // Check if the user has already downvoted
        if (question.downvotedBy.includes(userId)) {
            // User has already downvoted, remove the downvote
            question.downvotes -= 1;
            question.downvotedBy = question.downvotedBy.filter(id => id.toString() !== userId);
        } else {
            // Check if the user has upvoted before
            if (question.upvotedBy.includes(userId)) {
                // Remove the upvote
                question.upvotes -= 1;
                question.upvotedBy = question.upvotedBy.filter(id => id.toString() !== userId);
            }

            // Add the downvote
            question.downvotes += 1;
            question.downvotedBy.push(userId);
        }

        await question.save();
        res.status(200).json({ success: true, data: question });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

module.exports = router;
