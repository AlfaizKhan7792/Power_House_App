import axios from "axios"
import { toast } from "react-toastify";
import { API_URL } from "../../config";

export const Login = async (formData) =>{
    try {
        const res = await axios.post(`${API_URL}/api/user/login` , formData)
        localStorage.setItem("user" , JSON.stringify(res.data))
        return res.data   
    } catch (error) {
        toast.error
    }
}

export const Register = async (formData) =>{
   try {
    const res = await axios.post(`${API_URL}/api/user/register`, formData)
    console.log(res.data);
  localStorage.setItem("user" , JSON.stringify(res.data))
    return res.data
   } 
   catch (error) {
          const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Registration failed. Please try again.";
      toast.error(errorMessage);
      console.error(errorMessage);
   }
} 