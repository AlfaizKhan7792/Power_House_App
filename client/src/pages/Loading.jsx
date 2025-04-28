import React from 'react'

const Loading = () => {
  return (
    <>
         <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-yellow-500 to-black overflow-hidden">
            {/* Rotating Background Image */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-96 h-96 rounded-full bg-gradient-to-r from-yellow-400 to-black animate-spin-slow blur-xl"></div>
            </div>

            {/* Static Logo Text */}
            <div className="relative z-10 text-center">
                <h1 className="text-6xl font-bold text-yellow-500 drop-shadow-lg">
                    <span className="text-white">{`{`}</span>
                   <span className="text-black"> POWER_HOUSE </span>
                    <span className="text-white">{`}`}</span>
                </h1>



                {/* Pulsating Glow */}
                <div className="absolute -inset-2 blur-lg bg-yellow-500 opacity-20 rounded-full animate-pulse"></div>

                {/* Loading Text */}
                <p className="mt-6 text-xl text-gray-200 font-medium animate-bounce">
                    Loading Awesomeness...
                </p>
            </div>
        </div>
    </>
  )
}

export default Loading
