import React from 'react'
import { Link } from 'react-router-dom'

const BackButton = ({url}) => {
  return (
    <div>
      <Link to={url} ><button className='py-2 text-center bg-black px-3 rounded-md text-yellow-500 hover:bg-yellow-500 hover:text-black hover:font-semibold duration-300 float-start my-3'>Go Back</button></Link>
    </div>
  )
}

export default BackButton
