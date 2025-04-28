import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../features/auth/AuthSlice";
import Loading from "./Loading";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
    const { isLoading, user, isError, message } = useSelector((state) => state.Auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Form Data State
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    // // Error State
    // const [formErrors, setFormErrors] = useState({
    //     email : "",
    //     password : "",
    // })

    // const {email , password} = formErrors


    // Handle Changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // setFormErrors({...formErrors , [e.target.name] : ""})
    };

    // Validate Form Data
    // const validateForm = () =>{
    //     let isValid = true;
    //     const newErrors = {...formErrors}

    //     // Validate Email
    //     if(!email){
    //         newErrors.email = "Email is Required!!"
    //         isValid = false;
    //     }else if(!/\S+@\S+\.\S+/.test(email)){
    //         newErrors.email = "Email is invalid"
    //         isValid = false
    //     }

    //     // Validate Password
    //     if(!password){
    //         newErrors.password = "Password is Required!!"
    //         isValid = false
    //     } else if(password.length < 6){
    //         newErrors.password = "Password Must Be At Least 6 Characters!!"
    //     }

    //     setFormErrors(newErrors)
    //     return isValid
    // }

    const handleSubmit = (e) => {
        e.preventDefault();

        // if(validateForm()){
            dispatch(LoginUser(formData))
        //     .unwrap()
        //     .then(() =>{
        //         toast.success("LoggedIn Successful!!")
        //         setFormData({email : "", password : ""})
        //     })
        //     .catch((error) =>{
        //         if(error.includes("User Not LoggedIn")){
        //             toast.error("User Not LoggedIn!!")
        //         }else{
        //             toast.error(error || "LoggedIn Failed!!")
        //         }
        //     })
        // }else{
        //     const errorMessages = Object.values(formErrors).filter(msg => msg !== "")
        // if(errorMessages.length > 0){
        //     toast.error(errorMessages[0])
        // }
        // }

    };


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
      
      

    if (isLoading) {
        return <Loading />;
    }

    return (

        <>
         <div className="flex items-center justify-center min-h-[83.1vh] bg-cover bg-center relative"
         style={{
                backgroundImage: "url('https://img.freepik.com/premium-photo/modern-gym-interior-yellow-black-concept_832479-8385.jpg?w=2000')",
            }}
        >
            <div className="absolute inset-1 bg-black bg-opacity-50"></div>

            <div className="relative z-10 w-full max-w-md p-8 bg-yellow-500 rounded-lg shadow-lg">
                <h2 className="mb-6 text-2xl font-semibold text-center text-black">Login</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
{isError && message && (
    <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm ">
{message}
    </div>
) }


                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-black">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 mt-2 border border-black rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600"
                            required
                        />
                        {/* {formErrors.email && <p className="mt-1 text-xs text-red-500">{email}</p> } */}
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-black">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-3 mt-2 border border-black rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600"
                            required
                        />
                        {/* {formErrors.password && <p className="mt-1 text-xs text-red-500">{password}</p> } */}
                    </div>
                    <button
                        type="submit"
                        className="w-full p-3 text-black bg-yellow-600 rounded-lg hover:bg-yellow-700"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-sm text-center text-black">
                    Don't have an account?{" "}
                    <Link to="/register" className="font-bold text-black underline hover:text-yellow-700">
                        Register here
                    </Link>
                </p>
            </div>


        </div>


{/* visme Login form */}
{/* <iframe src="https://forms.visme.co/formsPlayer/90dkyxop-simple-subscription-sign-up-form"  width="1500" height="577" style={{"border" : "none" }} frameborder="0"></iframe> */}

</>
    );
};

export default LoginPage;








