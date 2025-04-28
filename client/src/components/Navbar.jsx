import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PowerHouseImg from "../../public/PowerHousePNG.png"
import { LogOutUser } from "../features/auth/AuthSlice";

const Navbar = () => {
const {user} = useSelector((state) => state.Auth)
const dispatch = useDispatch()

const ExistUser = (e) =>{
dispatch(LogOutUser())
}

    return (
        <nav className="bg-black text-white px-4 py-3">
            <div className="container mx-auto flex justify-between items-center">
                {/* Left Side */}
                <Link to={"/"} className="text-2xl font-bold">
               <span className="flex items-center"> <img src={PowerHouseImg} style={{width : "30px"}} className="me-3" alt="" />
                    <span className="text-yellow-500">{`{`}</span>
                    POWER_<span className="text-yellow-500">H</span>OUSE
                    <span className="text-yellow-500">{`}`}</span>
                    </span>
                </Link>

                <h1 className="text-center border border-black font-bold text-2xl uppercase text-yellow-500 ">{user?.name}</h1>

                {/* Right Side */}
                <div className="space-x-4">
                    {!user ? (
                        <>
                           <Link to={"/login"}>  <button className="px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600">
                                Login
                            </button></Link>
                          <Link to={"/register"}>  <button className="px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600">
                                Register
                            </button></Link>
                        </>
                    ) : (
                        <button
                        type="submit"
                            className="px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600"
                            onClick={ExistUser}
                        >
                            LogOut
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
