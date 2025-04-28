const {GoogleGenerativeAI} = require("@google/generative-ai")
const expressAsyncHandler = require("express-async-handler")
const getAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model = getAI.getGenerativeModel({model : "gemini-1.5-flash", systemInstruction : "You are expert dietician and fitness trainer"})

const generatePlan = expressAsyncHandler(async (req,res) =>{
    const {name , height , weight , goal , preference} = req.body
        if(!name || !height || !weight || !goal || !preference){
            res.status(400)
            throw new Error("Please Fill All Details!!");        
        }

        const promt = `My name is ${name} and my fitness goal is to ${goal} and my current height is ${height} ft and my current Weight is ${weight} kgs and I am ${preference}, give me customised fitness plan response should be in html`;
        const result = await model.generateContent(promt)
        res.json({
            Plan : result.response.text()
        })
})

module.exports = {generatePlan}