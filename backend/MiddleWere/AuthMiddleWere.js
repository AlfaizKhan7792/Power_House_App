const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken")
const User = require("../models/user/UserModels")

const Protect = expressAsyncHandler(async (req,res , next) =>{

    let token;
    
try {
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        // Store in token variable by Slicing word Bearer
        token = req.headers.authorization.split(" ")[1]
        // Decode the token
        const decoded = jwt.verify(token , process.env.JWT_SECRET)
        // Search the User in DB & Store into Request Object
        // req.user = await User.findById(decoded.id).select("-password")
        req.user = {_id : decoded.id}
            // Proceed to Next Function
            next()  
    }else{
        res.status(401)
            throw new Error("User Not Authorized!!")
    }

} catch (error) {
    res.status(401)
    throw new Error("User Not Authorized!!", error)
}


})


module.exports = Protect