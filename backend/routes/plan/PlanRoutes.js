const express = require('express');
const { addPlan, updatePlan, getPlans, getPlan, deletePlan } = require('../../controllers/plan/PlanControllers');
const Protect = require('../../MiddleWere/AuthMiddleWere');

const router = express.Router()

router.get("/:id" , Protect , getPlans)

router.get("/view/:pid" , getPlan)

router.post("/" , Protect , addPlan)

router.put("/:id" , Protect , updatePlan)

router.delete("/:id" , Protect , deletePlan)

module.exports = router