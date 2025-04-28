import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PowerHouseImg from "../../public/PowerHousePNG.png"
import { useDispatch, useSelector } from 'react-redux'
import Loading from './Loading'
import { toast } from 'react-toastify'
import { restore } from '../features/plans/PlansSlice'

const Home = () => {
  const {user , isLoading , isError , message} = useSelector(state => state.Auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() =>{
    if(!user){
      navigate("/login")
    }else if(user.admin){
navigate("/dashboard")
    }else{
      navigate("/")
    }
    if(isError && message){
    return toast.error(message)
    }
    dispatch(restore())
  },[user , isError , message])


  if(isLoading){
    return <Loading />
  }

  return (
    <>
     <div  style={{
    backgroundImage: `url(${PowerHouseImg})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    minHeight: '83.1vh',
    backgroundRepeat : 'no-repeat',
  }}  
  className=" 
  min-h-[83.1vh] 
  flex items-center 
  justify-center 
  p-10
  ">
       <div className="border rounded-md w-full border-black p-4">
      <h1 className="text-4xl font-bold text-gray-50">
                    Welcome to  <span className="font-bold">
                    <span className="text-white">{`{`}</span>
                    <span className='text-black'><span className="text-yellow-500">P</span>OWER_<span className="text-yellow-500">H</span>OUSE</span>
                    <span className="text-white">{`}`}</span>
                </span>
                </h1>
                <p className="mt-4 text-lg text-gray-400">Create AI Powered Fitness Plan</p>

             <Link to={"/create-plan"}> <button type='submit' className='py-2 px-6 text-black bg-yellow-500 border-black border my-3 w-full rounded-md font-semibold hover:text-yellow-500 hover:bg-black duration-300 hover:border hover:border-yellow-500'>Create New Fitness Plans</button></Link>
<Link to={"/view-plans"}><button type='submit' className='py-2 px-6 text-black rounded-md w-full bg-yellow-500 border border-black font-semibold hover:bg-black hover:text-yellow-500 duration-300 hover:border hover:border-yellow-500'>View Plans</button></Link>                
       </div>
     </div>
    </>
  )
}

export default Home
