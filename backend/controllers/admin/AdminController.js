const expressAsyncHandler = require("express-async-handler")
const User = require ("../../models/user/UserModels")
const Plan = require("../../models/Plan/PlanModels")

const GetAllUsers = expressAsyncHandler(async (req,res) =>{

const users = await User.find()
if(!users){
    res.status(404)
    throw new Error("Users Not Found!!");   
}else{
    res.status(200).json(users)
}

})


const GetAllPlans = expressAsyncHandler(async (req,res) =>{

    const plans = await Plan.find()
    if(!plans){
        res.status(404)
        throw new Error("Plans Not Found!!");        
    }else{
        res.status(200).json(plans)
    }
})


const UpdateUser = expressAsyncHandler(async (req,res) =>{

    const updateUser = await User.findByIdAndUpdate(req.params.id , req.body , {new : true})
    console.log(updateUser);
    if(!updateUser){
        res.status(404)
        throw new Error("User Not Updated!!")
    }else{
        res.status(200).json(updateUser)
    }

})


const GetUserPlans = expressAsyncHandler(async (req,res) =>{
const user = await User.findById(req.params.id)
const plan = await Plan.findOne({email : email})
console.log(plan);
if(user._id !== plan.user){
    res.status(401)
    throw new Error("User Not Plan Get!!");
}else{
    res.status(200).json(plan)
}

    })


module.exports = {GetAllUsers , GetAllPlans , UpdateUser , GetUserPlans}