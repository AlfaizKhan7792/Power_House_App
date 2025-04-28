const express = require('express');
const { LoginUser, RegisterUser, PrivateController } = require('../../controllers/user/UserControllers');
const Protect = require('../../MiddleWere/AuthMiddleWere');

const Router = express.Router()

// Login User
// EndPoint : /api/user/login
// Method : post
// Access : Public 
Router.post("/login" , LoginUser)

// Register User
// EndPoin : /api/user/register
// Method : post
// Access : Public
Router.post("/register" , RegisterUser)

// Private Route
// EndPoin : /api/user/private
// Method : post
// Access : private
Router.post("/private" , Protect , PrivateController)

module.exports = Router 