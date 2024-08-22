const Question = require('../models/questionModel');
const Answer = require('../models/answerModel');


module.exports = {
    postQuestion: async (req, res) => {
        try {
            const questionData = {
                userId: req.body.userId,
                title: req.body.title,
                description: req.body.description,
                category:req.body.category
            };

            if (req.file) {
                questionData.image = req.file.filename; 
            }

            const question = new Question(questionData);
            await question.save();
            res.status(201).json({ success: true, data: question });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    },
    getAllQuestion: async (req, res) => {
        try {
            const questions = await Question.find().populate('userId', 'name');
            res.status(200).json({ success: true, data: questions });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    },
    getQuestionById: async (req, res) => {
        try {
            const question = await Question.findById(req.params.id).populate('userId', 'name');
            const answers = await Answer.find({ questionId: req.params.id }).populate('userId', 'name');
            res.status(200).json({ success: true, data: { question, answers } });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    },
    postAnswer: async (req, res) => {
        try {
            const answer = new Answer(req.body);
            await answer.save();
            res.status(201).json({ success: true, data: answer });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    },
    getQuestionsByCategory: async (req, res) => {
        try {
            const questions = await Question.find({ category: req.params.category }).populate('userId', 'name');
            res.status(200).json({ success: true, data: questions });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    }
};
