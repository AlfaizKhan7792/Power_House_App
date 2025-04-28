import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "/api/plan";

// Fetch All Plans
const fetchPlans = async (id , token) =>{
const options = {
    headers : {
        authorization : `Bearer ${token}`
    }
}
try {
    const response = await axios.get(`${API_URL}/${id}`, options)
return response.data
} catch (error) {
    toast.error(error)
}
}

// Fetch Single Plan
const fetchPlan = async (pid , token) =>{
    const options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }
    const response = await axios.get(`${API_URL}/view/${pid}`, options)
    return response.data
}


// Create Plan
const createPlan = async (formData , token) =>{
    const options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    };
    const response = await axios.post(API_URL , formData , options)
    return response.data
}


// Generate AI Plan
const generate = async (userInfo , token) =>{
    const options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }
    const response = await axios.post("/api/gemini/generate-plan", userInfo, options)
    // console.log(response.data);
    return response.data
}

// Remove Plan
const deletee = async (id , token) =>{
    const options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }
    const response = await axios.delete(`${API_URL}/${id}`, options)
    console.log(response)   
    return await response.data
}


// Export the PlanService object
const planService = { fetchPlans , createPlan , fetchPlan, generate , deletee };
export default planService;
