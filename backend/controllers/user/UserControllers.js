const expressAsyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../../models/user/UserModels")

// Login User
const LoginUser = expressAsyncHandler(async (req,res) =>{

    const {email , password} = req.body

    // Check if all conditions is comming
    if( !email || !password ){
        res.status(400)
        throw new Error("Fill All Details!!");        
    } 

    // Find the user by email
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password , user.password)) {
        res.status(200).json({
            id : user._id,
            email : user.email,
            phone : user.phone,
            name : user.name,
            admin : user.isAdmin,
            token : generateToken(user._id)
        })
    }else{
        res.status(404); // User not found
        throw new Error("User not found!");
    }

  

})

// Register User
const RegisterUser = expressAsyncHandler(async (req,res) =>{

    const {name , email , password , phone} = req.body

    // Check if all conditions is comming
    if(!name || !email || !password || !phone){
        res.status(400)
        throw new Error("Fill All Details!!");        
    }

    // Check if Phone Number is 10
    if(phone.length !== 10){
        res.status(400)
        throw new Error("PLease Fill Valid Number");        
    }

    // Check if Email and Phone is Different
    const emailExist = await User.findOne({email : email})
    const phoneExist = await User.findOne({phone : phone})
    if(emailExist || phoneExist){
        res.status(400)             
        throw new Error("Enter a Different Details, User Already Exist!!");        
    }

    // Hash Password
    const salt = bcrypt.genSaltSync(10)
    const handedPassword = bcrypt.hashSync(password , salt)

    // Check if User Exist
    const userExist = await User.findOne({email : email})
    if(userExist){
        res.status(400)
        throw new Error("User Already Exist!!");        
    }

    // Create User Register
    const user = await User.create({name , email , phone , password : handedPassword})
    if(!user){
        res.status(400)
        throw new Error("User Not Created!!");
    }else{
        res.status(200).json({
            id : user._id,
            name : user.name,
            email : user.email,
            phone : user.phone,
            admin : user.isAdmin,
            token : generateToken(user._id)
        })
    }

})


// Private Route
const PrivateController = async (req , res) =>{
res.json(req.user)
} 

// Token-Generate

const generateToken = (id) =>{
    return jwt.sign({id} , process.env.JWT_SECRET , {expiresIn : '30d'})
}


module.exports = {LoginUser , RegisterUser , PrivateController}