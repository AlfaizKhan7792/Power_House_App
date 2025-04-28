const express = require('express');
const { generatePlan } = require('../../controllers/Gemini_AI/GeminiAiController');
const Protect = require('../../MiddleWere/AuthMiddleWere');

const router = express.Router()

router.post("/generate-plan" , Protect , generatePlan)


module.exports = router