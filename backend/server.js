    const express = require('express');
const connectDB = require('./config/db_config');
const MiddleWere = require('./MiddleWere/ErrorHandler');
require('dotenv').config()
const cors = require("cors")



const app = express()
app.use(cors({allowOrigin : "*"}))

// DB Connection
connectDB()

// Body Parser
app.use(express.json())
app.use(express.urlencoded({extended : true}))

const PORT = process.env.PORT || 8040

// Single Root Route
app.get("/" , (req,res) =>{
res.json({
    msg : "Welcom To PowerHouse API 1.0"
})
})

// Root-Routes
app.use("/api/user" , require("./routes/user/UserRoutes"))

// Plan Routes
app.use("/api/plan" , require("./routes/plan/PlanRoutes"))

// Admin Route
app.use("/api/admin" , require("./routes/admin/AdminRoute"))

// Gemini_AI Route
app.use("/api/gemini" , require("./routes/Gemini_AI/GeminiAiRoutes"))


// Error-Handler
app.use(MiddleWere)


app.listen(PORT , () =>{
    console.log("SERVER IS RUNNING AT :" , PORT);
})

module.exports = app