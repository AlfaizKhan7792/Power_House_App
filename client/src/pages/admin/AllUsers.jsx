import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AllUsers } from '../../features/Admin/AdminSlice'

const SareUsers = () => {
  const dispatch = useDispatch()
  const { All_Users, isLoading } = useSelector(state => state.Admin)

  useEffect(() => {
    dispatch(AllUsers())
  }, [dispatch])

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black text-white">

      <div className="flex-1 p-4 md:p-10">
        <h1 className="text-center text-2xl sm:text-3xl font-bold mb-6">All Users</h1>

        {/* Table for Desktop (lg and above) */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full border border-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-yellow-600 text-black">
              <tr>
                {['S/No.', 'Name', 'Email', 'Password', 'Date', 'Time', 'User ID',
                //  'Actions'
                ].map((head, idx) => (
                  <th key={idx} className="px-4 py-3 border-b border-gray-700 text-left">{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="8" className="text-center py-6 text-gray-400">Loading users...</td>
                </tr>
              ) : All_Users.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-6 text-red-400">No users found.</td>
                </tr>
              ) : (
                All_Users.map((user, index) => {
                  const createdAt = new Date(user.createdAt)
                  const date = createdAt.toLocaleDateString()
                  const time = createdAt.toLocaleTimeString()

                  return (
                    <tr key={user._id} className="hover:bg-yellow-500 transition duration-200 border-b border-gray-700">
                      <td className="px-4 py-3">{index + 1}</td>
                      <td className="px-4 py-3">{user.name}</td>
                      <td className="px-4 py-3">{user.email}</td>
                      <td className="px-4 py-3 text-yellow-400">********</td>
                      <td className="px-4 py-3">{date}</td>
                      <td className="px-4 py-3">{time}</td>
                      <td className="px-4 py-3 break-all text-sm">{user._id}</td>
                      {/* <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-2">
                          <button className="bg-blue-600 hover:bg-blue-800 text-white px-3 py-1 rounded text-sm">Edit</button>
                          <button className="bg-red-600 hover:bg-red-800 text-white px-3 py-1 rounded text-sm">Delete</button>
                        </div>
                      </td> */}
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Card Style for Mobile & Tablet (below lg) */}
        <div className="block lg:hidden space-y-4 px-4 sm:px-6 md:px-8">
          {isLoading ? (
            <p className="text-center text-gray-400">Loading users...</p>
          ) : All_Users.length === 0 ? (
            <p className="text-center text-red-400">No users found.</p>
          ) : (
            All_Users.map((user, index) => {
              const createdAt = new Date(user.createdAt)
              const date = createdAt.toLocaleDateString()
              const time = createdAt.toLocaleTimeString()

              return (
                <div
                  key={user._id}
                  className="border overflow-scroll border-gray-700 p-4 rounded-lg bg-gray-900 shadow-md hover:shadow-yellow-600 transition duration-300"
                >
                  <p><span className="font-semibold text-yellow-400">S/No:</span> {index + 1}</p>
                  <p><span className="font-semibold">Name:</span> {user.name}</p>
                  <p><span className="font-semibold">Email:</span> {user.email}</p>
                  <p><span className="font-semibold">Password:</span> ********</p>
                  <p><span className="font-semibold">Date:</span> {date}</p>
                  <p><span className="font-semibold">Time:</span> {time}</p>
                  <p><span className="font-semibold">User ID:</span> <span className="break-all text-sm">{user._id}</span></p>
                  {/* <div className="flex gap-3 mt-3">
                    <button className="bg-blue-600 hover:bg-blue-800 text-white px-3 py-1 rounded text-sm w-full">Edit</button>
                    <button className="bg-red-600 hover:bg-red-800 text-white px-3 py-1 rounded text-sm w-full">Delete</button>
                  </div> */}
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

export default SareUsers
