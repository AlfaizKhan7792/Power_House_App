import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RegisterUser } from "../features/auth/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { toast } from "react-toastify";

const RegisterPage = () => {

    const {user , isLoading , isError , message} = useSelector((state) => state.Auth)
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [formData , setFormData] = useState({
        name : "",
        email : "",
        phone : "",
        password : "",
        confirmPassword : ""
    })

    const {name , email , phone , password , confirmPassword} = formData

    const handleChange = (e) =>{
        setFormData({...formData , [e.target.name] : e.target.value})
    }

    const handleSubmit = (e) =>{
e.preventDefault()

// Chech Password
if(password !== confirmPassword){
    return toast.error("Password Not Matched!!")
  }


// Check if phone is correct
if(phone.length <= 10){
 toast.error("Enter a valid Number")
}

dispatch(RegisterUser(formData))
    }


useEffect(() => {
    if (user) {
      if (user.admin) {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    }
  
    if (isError && message) {
      toast.error(message);
    }
  }, [user, isError, message]);
  
  


    if(isLoading){
        return <Loading />
    }

    return (
        <div
        className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
        style={{
            backgroundImage: "url('https://img.freepik.com/premium-photo/modern-gym-interior-yellow-black-concept_832479-8386.jpg')",
        }}
    >
        {/* Overlay */}
        <div className="absolute inset-1 bg-black bg-opacity-50"></div>

        {/* Register Page */}
        <div className="relative z-10 flex items-center justify-center w-full min-h-screen ">
            <div className="w-full max-w-sm p-8 bg-yellow-500 rounded-lg shadow-md">
                <h2 className="mb-6 text-2xl font-semibold text-center text-black">
                    Register
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-black"
                        >
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={handleChange}
                            className="w-full p-3 mt-2 border border-black rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-black"
                        >
                            Phone
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={phone}
                            onChange={handleChange}
                            className="w-full p-3 mt-2 border border-black rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-black"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            className="w-full p-3 mt-2 border border-black rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-black"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            className="w-full p-3 mt-2 border border-black rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-black"
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleChange}
                            className="w-full p-3 mt-2 border border-black rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-3 text-black bg-yellow-600 rounded-lg hover:bg-yellow-700"
                    >
                        Register
                    </button>
                </form>
                <p className="mt-4 text-sm text-center text-black">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-bold text-black underline hover:text-yellow-700"
                    >
                        Login here
                    </Link>
                </p>
            </div>
        </div>
        </div>
    );
};

export default RegisterPage;
