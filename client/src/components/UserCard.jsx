import React from 'react'

const UserCard = () => {
  return (
    <div className='max-w-sm rounded-lg overflow-hidden shadow-lg bg-white border-2'>
<img src="https://tse4.mm.bing.net/th?id=OIP.GZRK8Yc7q3M77004FwmdVQHaHa&pid=Api&P=0&h=180" className='w-full h-48 object-contain' alt="" />

{/* Card Body */}
<div className="p-4">
    <h5 className="text-2xl font-semibold mb-2">
        Name
    </h5>
<h3>Phone</h3>
<p>Email</p>
<h1>Plan Length</h1>
<button>View Plans</button>

</div>
    </div>
  )
}

export default UserCard
