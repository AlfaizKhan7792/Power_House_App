import axios from "axios"
import { API_URL } from "../../config"

// All-Users
const userss = async (token) =>{
    const options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }
    const response = await axios.get(`${API_URL}/api/admin/all-users` , options)
    return await response.data
}

// All-Plans
export const planss = async (token) =>{
    const options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }
    const response = await axios.get(`${API_URL}/api/admin/all-plans`, options)
    return await response.data
}

const adminService = {userss}
export default adminService