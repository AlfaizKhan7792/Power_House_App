import React from 'react'
import { Link } from 'react-router-dom'
import PowerHouseImg from "../../public/PowerHousePNG.png"
import { useDispatch } from 'react-redux'
import { RemovePlan } from '../features/plans/PlansSlice'
import { X } from 'lucide-react'

const PlanCard = ({plan}) => {

  const dispatch = useDispatch()
  const handleRemove = (id) =>{
dispatch(RemovePlan(id))
  }

  const getColor = (goal) => {
    switch (goal) {
      case "gain":
        return "text-green-500"; 
      case "loose":
        return "text-red-500";
      case "maintain":
        return "text-yellow-500";
      default:
        return "text-black";
    }
  };


  const getImageByGoal = (goal) => {
    switch (goal) {
      case "gain":
        return "https://tse4.mm.bing.net/th?id=OIP.0P5REugIWoo6QQnqnuM-sAHaJX&pid=Api&P=0&h=180";
      case "maintain":
        return "https://tse4.mm.bing.net/th?id=OIP.GZRK8Yc7q3M77004FwmdVQHaHa&pid=Api&P=0&h=180";
      case "loose":
        return "https://media.tenor.com/images/190d95559eacabe9ada06ce6e4bb7645/tenor.gif";
      default:
        return PowerHouseImg; // fallback image
    }
  };
  

  return (
    <>
      {/* <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white"> */}
      <div className={`max-w-sm rounded-lg overflow-hidden shadow-lg bg-white border-2 ${getColor(plan?.goal)}`}>
        <button onClick={() => handleRemove(plan?._id)} className="float-end p-1 rounded border border-black me-3 mt-2 hover:bg-black duration:200 "><X /></button>
  {/* <!-- Card Image --> */}
  <img
src={getImageByGoal(plan?.goal)}
    alt={`${plan?.goal} plan`}
    className="w-full h-48 object-contain"
  />
  {/* <!-- Card Body --> */}
  <div className="p-4">
    <h5 className="text-2xl font-semibold mb-2">Weight {plan?.goal} Plan</h5>
    <p className="text-sm text-gray-300 mb-1">{plan?.preference}</p>
    <p className="text-gray-700 mb-3 text-sm">
Date : {new Date(plan?.createdAt).toDateString("en-In")}
    </p>
    <Link to={`/plan/${plan?._id}`}>
    <button className="text-lg w-full rounded-md border border-black bg-yellow-500 text-black hover:bg-black hover:text-yellow-500 hover:border-yellow-500 duration-500"> View Plan
    </button></Link>
  </div>
</div>

    </>
  )
}

export default PlanCard
