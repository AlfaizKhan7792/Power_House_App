const express = require('express');
const AdminProtect = require('../../MiddleWere/AdminProtect');
const {GetAllUsers , GetAllPlans, UpdateUser, GetUserPlans} = require("../../controllers/admin/AdminController")


const Router = express.Router()

Router.get("/all-users" , AdminProtect , GetAllUsers)

Router.get("/all-plans" , AdminProtect , GetAllPlans)

Router.put("/update/:id" , UpdateUser)

Router.get("/plan/:id" , GetUserPlans)

module.exports = Router