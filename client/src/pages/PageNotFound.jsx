import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
    {/* Go Back Button */}
    <Link to={"/"}>
      <button className="absolute top-5 left-5 py-2 px-4 bg-black text-yellow-500 rounded hover:bg-yellow-500 hover:text-black hover:font-semibold duration-300 z-10">
        Go Back
      </button>
    </Link>

    {/* Fullscreen Image */}
    <img
      src="https://i.pinimg.com/originals/a3/59/56/a35956ec9f42082d3eeee4ba1b506060.gif"
      alt="Full Screen"
      className="w-full h-full object-cover"
    />
  </div>
  )
}

export default PageNotFound
