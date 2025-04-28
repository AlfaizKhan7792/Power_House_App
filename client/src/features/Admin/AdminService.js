import axios from "axios"

// All-Users
const userss = async (token) =>{
    const options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }
    const response = await axios.get(`/api/admin/all-users` , options)
    return await response.data
}

// All-Plans
export const planss = async (token) =>{
    const options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }
    const response = await axios.get(`/api/admin/all-plans`, options)
    return await response.data
}

const adminService = {userss}
export default adminService