import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

const SingleUser = () => {
  const [search, setSearch] = useState('');
  const [filteredUser, setFilteredUser] = useState(null);

  const {All_Users , All_Plans} = useSelector((state) => state.Admin); 

  const handleSearch = () => {
    const user = All_Users.find(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUser(user);
    setSearch("")
  };

  const filteredPlans = filteredUser
    ? All_Plans.filter((plan) => plan.user === filteredUser._id)
    : [];

    console.log(filteredPlans , filteredUser , All_Plans)

  return (
    <div className='dashh flex min-h-screen bg-gray-50'>
    <div className=" flex-1 px-4 sm:px-10 py-8 max-w-6xl mx-auto">

<h1 className='text-black font-bold text-3xl mb-5' >Single User Search Here</h1>

      {/* Search Section */}
      <div className="flex flex-col justify-center sm:flex-row items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search user by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 text-black rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <button
          onClick={handleSearch}
          className="px-6 py-2 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-black hover:text-yellow-400 duration-300"
        >
          Search
        </button>
      </div>

      {/* Result Section */}
      {filteredUser && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h2 className="text-xl font-bold mb-2">User: {filteredUser.name}</h2>
          <p className="text-gray-600 mb-4">Email: {filteredUser.email}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlans.length > 0 ? (
              filteredPlans.map((plan) => (
                <motion.div
                  key={plan._id}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-lg shadow-lg p-4 border-2 border-gray-200 hover:shadow-xl transition duration-300"
                >
                  <h3 className="text-lg font-bold mb-2 text-yellow-600">
                    Goal: {plan.goal}
                  </h3>
                  <p className="text-gray-500 text-sm mb-1">
                    Preference: {plan.preference}
                  </p>
                  <p className="text-sm text-gray-400">
                    Created: {new Date(plan.createdAt).toDateString()}
                  </p>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-500">No plans found for this user.</p>
            )}
          </div>
        </motion.div>
      )}
    </div>
    </div>
  );
};

export default SingleUser;
