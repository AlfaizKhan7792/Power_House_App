import React, { useEffect, useState } from 'react'
import BackButton from '../components/BackButton'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Loading from './Loading'
import { GeneratePlan, GetPlan } from '../features/plans/PlansSlice'
import { useParams } from 'react-router-dom'

const ViewPlan = () => {
  const { user } = useSelector((state) => state.Auth)
  const { Plan, isLoading, isErrro, message } = useSelector((state) => state.Plan)
  const dispatch = useDispatch()
  const { pid } = useParams()

  // ✅ Local state for generated plan
  const [generatedPlan, setGeneratedPlan] = useState(null)

  const generatePlan = async () => {
    // setisGenerating(true)
    const userInfo = {
      name: user.name,
      height: Plan.height,
      weight: Plan.weight,
      goal: Plan.goal,
      preference: Plan.preference,
    }

    try {
      const response = await dispatch(GeneratePlan(userInfo)).unwrap()
      setGeneratedPlan(response.Plan) // ✅ Store generated plan in local state
    } catch (error) {
      toast.error(error , "Failed to generate plan")
    }
  }

  const printPlan = () => {
    window.print()
  }

  useEffect(() => {
    dispatch(GetPlan(pid))
    if (isErrro && message) {
      toast.error(message)
    }
  }, [dispatch, isErrro, message, pid])

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="min-h-[83.1vh] p-10 text-white">
      <BackButton url={"/view-plans"} />
      <h1 className="text-center my-5 text-2xl font-bold">Your Plan</h1>

      <div className="p-5 border rounded-md">
        <div className="card text-white mb-3 border rounded-lg shadow-lg flex items-center justify-between">
          <img
            src="https://tse4.mm.bing.net/th?id=OIP.GZRK8Yc7q3M77004FwmdVQHaHa&pid=Api&P=0&h=180"
            alt="..."
            className="w-[25%] rounded-t-lg"
          />
          <div className="border rounded-md p-4 me-60">
            <p className="text-2xl text-center mb-5">Your Personal Information</p>
            <div className="flex items-center justify-around gap-10">
              <span className="me-5">
                <h1 className="text-5xl font-semibold my-2 uppercase">{user?.name}</h1>
                <h1 className="text-2xl font-semibold my-2"> {Plan?.goal}</h1>
              </span>
              <span className="ms-5 text-xl">
                <p className="my-2">Height :- {Plan?.height} ft </p>
                <p className="my-2">Weight :- {Plan?.weight} kg </p>
                <p className="my-2">{Plan?.preference}</p>
              </span>
            </div>
          </div>
        </div>

        {/* ✅ Use local state for displaying generated plan */}
        <div className="card border rounded-md mt-5">
          <p
            dangerouslySetInnerHTML={{ __html: generatedPlan || "Click 'Generate My Plan' to create a plan." }}
            className="text-sm"
          ></p>
        </div>

        <div className="flex justify-between items-center px-4 py-2 mt-3">
          <button onClick={printPlan} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Print My Plan
          </button>
          <button onClick={generatePlan} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Generate My Plan
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
            Mark As Completed
          </button>
        </div>
      </div>
    </div>
  )
}

export default ViewPlan
