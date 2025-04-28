// For Only All Plans Check Here
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import Sidebar from './Sidebar';
// import { AllPlans, AllUsers } from '../../features/Admin/AdminSlice';
// import PlanCard from '../../components/PlanCard';
// import Loading from '../Loading';

// const SarePlans = () => {
//   const dispatch = useDispatch();
//   const { All_Plans , isLoading } = useSelector(state => state.Admin);

//   console.log(All_Plans)

//   useEffect(() => {
//     dispatch(AllUsers());
//   }, [dispatch]);

//   const handleLogOut = () => {
//     console.log("Logout");
//   };

//   if(isLoading){
//     <Loading />
//   }

//   return (
//     <div className="dashh flex bg-gray-50 text-white min-h-screen">
//       <Sidebar handleLogOut={handleLogOut} />

//       <div className="flex-1 p-4 md:p-8 space-y-6">
//         <h1 className="text-3xl text-gray-900 font-bold text-center mb-6">All User Plans</h1>

//               <div className="border bg-gray-900 border-gray-600 rounded-md p-4 mt-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//                 {All_Plans && AllPlans.length > 0 ? (
//                   All_Plans.map((plan , index) => (
//                     <PlanCard plan={plan} key={index.id} />
//                   ))
//                 ) : (
//                   <p className="text-gray-400 text-sm">No plans found for this user.</p>
//                 )}
//               </div>
//             </div>
//     </div>
//   );
// };

// export default SarePlans;




// FOr User Wise All Plans Check Here
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AllPlans, AllUsers } from '../../features/Admin/AdminSlice';
import PlanCard from '../../components/PlanCard';

const SarePlans = () => {
  const dispatch = useDispatch();

  const { All_Users, All_Plans, isLoading } = useSelector(state => state.Admin);

  useEffect(() => {
    dispatch(AllUsers());
    dispatch(AllPlans());
  }, [dispatch]);


  return (
    <div className="flex bg-black text-white min-h-screen">

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center mb-6">All <span className="text-yellow-500">User</span>'s Plan</h1>

        {isLoading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : (
          All_Users.map(user => {
            const userPlans = All_Plans.filter(plan => {
              return plan.user === user._id || plan.user?._id === user._id;
            });

            return (
              <div key={user._id} className="relative border border-gray-700 rounded-xl p-5">
                {/* Floating User Name */}
                <div className="absolute -top-4 left-6 border border-yellow-500 bg-black px-3 py-1 text-yellow-400 font-semibold rounded shadow">
                  {user.name}
                </div>

                {/* Plans Grid */}
                <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {userPlans.length > 0 ? (
                    userPlans.map(plan => (
                      <PlanCard plan={plan} key={plan.id} />

                    ))
                  ) : (
                    <p className="text-gray-400 text-sm">No plans found for this user.</p>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SarePlans;
