import { useEffect, useState } from 'react'
import BackButton from '../components/BackButton'
import { useDispatch, useSelector } from 'react-redux'
import { AddPlan } from '../features/plans/PlansSlice'
import Loading from './Loading'
import { useNavigate } from 'react-router-dom'

const CreatePlan = () => {

  const {Plans , isSuccess , isLoading , isError , message} = useSelector((state) => state.Plan)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formData , setFormData] = useState({
    height : "",
    weight : "",
    goal : "",
    preference : ""
  })

  const {height , weight , goal , preference} = formData

  const handleChange = (e) =>{
    setFormData({...formData , [e.target.name] : e.target.value})
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
dispatch(AddPlan(formData))
setFormData("")
  }

  useEffect(() =>{
if(Plans && isSuccess){
  navigate("/view-plans")
}
  },[Plans , isSuccess , isError , message])

  if(isLoading){
    return <Loading />
  }


  return (
   <>
    <div className='min-h-[83.1vh] p-10'>
<div className="border p-5 rounded-md">
    <h1 className='text-center text-lg font-bold text-white'>Enter Your Details</h1>
    <form onSubmit={handleSubmit}>
        <input name='height' value={height} onChange={handleChange} type="text" required className='border p-1 my-2 w-full' placeholder='Enter Your Height ' />
        <input name='weight' value={weight} onChange={handleChange} type="text" required className='border p-1 my-2 w-full' placeholder='Enter Your Weight ' />
        <select name='goal' value={goal} onChange={handleChange} className='border p-1 w-full my-1'>
            <option value="#">Select Your Goal</option>
            <option value="gain">Gain</option>
            <option value="maintain">Maintain</option>
            <option value="loose">Loose</option>
        </select>


<div>
      <h2 className="text-2xl font-semibold text-white my-3">
        Select Your Food Preference
      </h2>

      <div className="flex items-center justify-evenly">
        {/* PURE_VEG */}
        <div className="flex items-center mb-4">
          <input
            name="preference"
            value="Vagetarian"
            onChange={handleChange}
            checked={preference === "Vagetarian"}
            type="radio"
            id="Vegetarian"
            className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500"
          />
          <label
            htmlFor="Vegetarian"
            className="ml-2 text-sm font-medium text-white"
          >
            PURE_VEG
          </label>
        </div>

        {/* NON_VEG */}
        <div className="flex items-center mb-4">
          <input
            name="preference"
            value="Non-Vagetarian"
            onChange={handleChange}
            checked={preference === "Non-Vagetarian"}
            type="radio"
            id="Non-Vegetarian"
            className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500"
          />
          <label
            htmlFor="Non-Vegetarian"
            className="ml-2 text-sm font-medium text-white"
          >
            NON_VEG
          </label>
        </div>

        {/* VEGAN */}
        <div className="flex items-center mb-4">
          <input
            name="preference"
            value="Vegan"
            onChange={handleChange}
            checked={preference === "Vegan"}
            type="radio"
            id="Vegan"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
          />
          <label htmlFor="Vegan" className="ml-2 text-sm font-medium text-white">
            VEGAN
          </label>
        </div>
      </div>

      {/* Selected Preference */}
      <div className="mt-4">
        <p className="text-sm text-white">
          Selected Preference:{" "}
          <span className="font-semibold text-gray-800">{preference}</span>
        </p>
      </div>
    </div>

<button type='submit' className="border py-2 mt-2 w-full font-bold duration-300 bg-white text-black">Create My Fitness Plan</button>


    </form>
</div>
<BackButton url={"/"} />
    </div>
   </>
  )
}

export default CreatePlan
