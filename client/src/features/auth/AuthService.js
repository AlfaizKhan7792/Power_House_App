import axios from "axios"
import { toast } from "react-toastify";

export const Login = async (formData) =>{
    try {
        const res = await axios.post("/api/user/login" , formData)
        // const res = await fetch.post("/api/user/login" , formData)
        // const data = await res.json()
        // console.log(res.data);
        localStorage.setItem("user" , JSON.stringify(res.data))
        return res.data   
    } catch (error) {
        toast.error
    }
}

export const Register = async (formData) =>{
   try {
    const res = await axios.post("/api/user/register", formData)
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
      console.error(errorMessage); // Log the error for debugging
   }
} 


// export const Register = async (formData) => {
//     try {
//       const res = await axios.post("/api/user/register", formData);
//       console.log(res.data);
//       localStorage.setItem("user", JSON.stringify(res.data));
//       return res.data;
//     } catch (error) {
//       const errorMessage =
//         error.response && error.response.data && error.response.data.message
//           ? error.response.data.message
//           : "Registration failed. Please try again.";
//       toast.error(errorMessage);
//       console.error(errorMessage); // Log the error for debugging
//     }
//   };