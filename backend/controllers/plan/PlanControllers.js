const expressAsyncHandler = require("express-async-handler");
const Plan = require("../../models/Plan/PlanModels")
const User = require("../../models/user/UserModels")

// Create Plan
const addPlan = expressAsyncHandler(async (req,res) =>{
    const {height , weight , preference , goal} = req.body

    if(!height || !weight || !preference || !goal){
        res.status(400)
        throw new Error("Fill All Details");        
    }

    // Create Plan
const plan = await Plan.create({
    user : req.user._id , height , weight , preference , goal
})
if(!plan){
    res.status(401)
    throw new Error("Plan Not Created!!");
}else{
    res.status(200).json(plan)
}
 
})

// Update Plan
const updatePlan = expressAsyncHandler(async (req,res) =>{

// check if user exists
const user = await User.findById(req.user._id)
if(user._id.toString() !==  req.user._id.toString()){
    res.status(401)
    throw new Error("User Not Same");
}

    const updatedPlan = await Plan.findByIdAndUpdate(req.params.id , req.body , {new : true})
    if(!updatedPlan){
        res.status(401)
        throw new Error("Plan Not UPdated!!");
    }else{
        res.status(200).json(updatedPlan)
    }
})


// // Get Plans
const getPlans = expressAsyncHandler(async (req,res) =>{
    const user = await User.findById(req.params.id)
    // console.log(user);
    if(user._id.toString() !== req.user._id.toString()){
        res.status(401)
        throw new Error("User Not Same!!");        
    }

    const plans = await Plan.find({user : user._id})
    if(!plans){
        res.status(404)
        throw new Error("No Plans Here!!");        
    }else{
        res.status(200).json(plans)
    }
})


// Get Single Plan
const getPlan = expressAsyncHandler(async (req,res) =>{
    const plan = await Plan.findById(req.params.pid)
    if(!Plan){
        res.status(404)
        throw new Error("Plan Not Same!!");        
    }else{
        res.status(200).json(plan)
    }
})

// Remove Plan
const deletePlan = expressAsyncHandler(async (req,res) =>{
    const planRemove = await Plan.findByIdAndDelete(req.params.id);
    if(!planRemove){
        return res.status(404).json({message : "Plan Not Found!!"})
    }
    res.status(200).json({message : "Plan Deleted Successfully!!"})
})



module.exports = {addPlan , updatePlan , getPlans , getPlan , deletePlan}