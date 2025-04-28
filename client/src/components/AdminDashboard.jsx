import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Bell, User, User2, Users, Dumbbell } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../pages/admin/Sidebar';
import { LogOutUser } from '../features/auth/AuthSlice';
import { AllPlans, AllUsers } from '../features/Admin/AdminSlice';
import Loading from '../pages/Loading';
import SareUsers from '../pages/admin/AllUsers';
import SarePlans from '../pages/admin/AllPlans';
import SingleUser from '../pages/admin/SingleUser';

// Sample activity data for the line chart
const activityData = [
  { day: 'Mon', Users: 4, Plans: 2 },
  { day: 'Tue', Users: 6, Plans: 3 },
  { day: 'Wed', Users: 5, Plans: 4 },
  { day: 'Thu', Users: 3, Plans: 5 },
  { day: 'Fri', Users: 4, Plans: 3 },
  { day: 'Sat', Users: 2, Plans: 2 },
  { day: 'Sun', Users: 6, Plans: 3 },
];

// CircularProgress component for the gauge charts
const CircularProgress = ({ value, maxValue, color, icon, label, unit, size = 'large' }) => {
  const [progress, setProgress] = useState(0);
  const percentage = (value / maxValue) * 100;
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(percentage);
    }, 300);
    return () => clearTimeout(timer);
  }, [percentage]);
  
  const strokeWidth = size === 'large' ? 8 : 6;
  const radius = size === 'large' ? 70 : 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  
  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg className={`transform -rotate-90 ${size === 'large' ? 'w-40 h-40' : 'w-28 h-28'}`}>
        <circle
          cx={size === 'large' ? 80 : 56}
          cy={size === 'large' ? 80 : 56}
          r={radius}
          stroke="#ffff"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size === 'large' ? 80 : 56}
          cy={size === 'large' ? 80 : 56}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        {icon}
        <div className={`${size === 'large' ? 'text-5xl' : 'text-2xl'} font-bold mt-1`}>
          {value}
        </div>
        <div className="text-xs text-gray-400">{unit}</div>
      </div>
      {size === 'large' && (
        <div className="mt-2 text-xs text-gray-400">
          {label}
        </div>
      )}
    </div>
  );
};

// Progress bar component
const ProgressBar = ({ value, goal, color, percentDisplay }) => {
  const [progress, setProgress] = useState(0);
  const percentage = (value / goal) * 100;
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(percentage);
    }, 500);
    return () => clearTimeout(timer);
  }, [percentage]);
  
  return (
    <div className="w-full mt-2">
      <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} transition-all duration-1000 ease-out`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="flex justify-end mt-1">
        <span className="text-xs text-gray-400">{percentDisplay}%</span>
      </div>
    </div>
  );
};

// Activity Rating Chart (Donut)
const ActivityRatingChart = () => {
  const [animationProgress, setAnimationProgress] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationProgress(100);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  
  // Activities data with colors and segments
  const activities = [
    { name: 'Users', color: '#4ade80', segment: 25, start: 0 },
    { name: 'Plans', color: '#f87171', segment: 25, start: 25 },
    { name: 'User', color: '#facc15', segment: 25, start: 50 },
    { name: 'Walking', color: '#60a5fa', segment: 25, start: 100 }
  ];
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-48">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle 
            cx="50" 
            cy="50" 
            r="40" 
            fill="#1f2937" 
            stroke="none" 
          />
          
          {/* Activity segments */}
          {activities.map((activity, index) => {
            const circumference = 2 * Math.PI * 40;
            const dashArray = (circumference * activity.segment) / 100;
            const dashOffset = circumference - (circumference * activity.start) / 100;
            const visibleDashArray = (dashArray * animationProgress) / 100;
            
            return (
              <circle
                key={index}
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke={activity.color}
                strokeWidth="12"
                strokeDasharray={`${visibleDashArray} ${circumference}`}
                strokeDashoffset={dashOffset}
                transform="rotate(-90 50 50)"
                className="transition-all duration-1000 ease-out"
              />
            );
          })}
          
          {/* Inner circle to create donut effect */}
          <circle 
            cx="50" 
            cy="50" 
            r="32" 
            fill="#1f2937" 
          />
        </svg>
      </div>
      
      {/* Activity legend */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-6">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: activity.color }}
            ></div>
            <span className="text-xs">{activity.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const FitnessDashboard = () => {

  const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.Auth)
    const {All_Users , All_Plans , isLoading , isError , message} = useSelector(state => state.Admin)



    const handleLogOut = () =>{
      dispatch(LogOutUser())
          }

  useEffect(() => {
    if(!user){
navigate("/login")
}else{
    navigate("/dashboard");
}

if(user?.token){
  dispatch(AllUsers())
  dispatch(AllPlans())
}

if(isError){
  return message
}
  }, [user , isError , message]);


  if(isLoading){
    <Loading />
  }

  return (
    <div className="dashh min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar - Fixed at left */}
      <Sidebar handleLogOut={handleLogOut} />

      
      {/* Main content area */}
      <div className="flex-1">
        {/* Header */}
<header className="flex items-center justify-end p-4 border-b border-yellow-500 bg-black sticky top-0 z-10">
  <div className="flex items-center space-x-4">
    <button className="text-yellow-400 relative hover:text-yellow-300 transition">
      <Bell size={20} />
      <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-2 h-2"></span>
    </button>
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black">
        <User size={16} />
      </div>
      <span className="text-sm text-yellow-300">{user?.name}</span>
    </div>
  </div>
</header>

{/* Main */}
<main className="p-4 bg-black min-h-screen">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
    <Link to="/all-users">
      <div className="bg-gray-900 border border-yellow-400 p-4 rounded-lg flex flex-col items-center text-yellow-400">
        <h3 className="text-xs uppercase mb-2">All_Users</h3>
        <CircularProgress 
          value={`${All_Users?.length}`} 
          maxValue={Math.ceil((All_Users?.length || 1) / 10) * 10} 
          color="#f87171" 
          icon={<Users size={24} className="text-red-400" />}
          label="Reference: Users"
          unit="users"
        />
      </div>
    </Link>

    <Link to="/all-plans">
      <div className="bg-gray-900 border border-yellow-400 p-4 rounded-lg flex flex-col items-center text-yellow-400">
        <h3 className="text-xs uppercase mb-2">All_Plans</h3>
        <CircularProgress 
          value={`${All_Plans?.length}`} 
          maxValue={Math.ceil((All_Users?.length || 1) / 10) * 10} 
          color="#facc15" 
          icon={<Dumbbell size={24} className="text-yellow-400" />}
          label="Goal: Body-Builder"
          unit="Plans"
        />
      </div>
    </Link>

    <Link to="/user-plans">
      <div className="bg-gray-900 border border-yellow-400 p-4 rounded-lg flex flex-col items-center text-yellow-400">
        <h3 className="text-xs uppercase mb-2">User</h3>
        <CircularProgress 
          value={`12.K`} 
          maxValue={Math.ceil((All_Users?.length || 1) / 10) * 10} 
          color="#4ade80" 
          icon={<User2 size={24} className="text-green-400" />}
          label="Goal: 20K+ Users"
          unit="User"
        />
      </div>
    </Link>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
    <div className="bg-gray-900 border border-yellow-400 p-4 rounded-lg text-yellow-400">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-bold">{All_Users?.length}</div>
          <div className="text-xs uppercase">Users</div>
        </div>
        <div className="text-yellow-400">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 12l3-3 3 3 4-4M7 17h10M7 5h10" />
          </svg>
        </div>
      </div>
      <ProgressBar value={`${All_Users?.length}`} goal={Math.ceil((All_Users?.length || 1) / 10) * 10} color="bg-red-400" percentDisplay={`${All_Users?.length}`} />
    </div>

    <div className="bg-gray-900 border border-yellow-400 p-4 rounded-lg text-yellow-400">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-bold">{All_Plans?.length}</div>
          <div className="text-xs uppercase">Plans</div>
        </div>
        <div className="text-yellow-400">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 12l3-3 3 3 4-4M7 17h10M7 5h10" />
          </svg>
        </div>
      </div>
      <ProgressBar value={`${All_Plans?.length}`} goal={Math.ceil((All_Users?.length || 1) / 10) * 20} color="bg-yellow-400" percentDisplay={`${All_Plans?.length}`} />
    </div>

    <div className="bg-gray-900 border border-yellow-400 p-4 rounded-lg text-yellow-400">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-bold">1.2</div>
          <div className="text-xs uppercase">User</div>
        </div>
        <div className="text-yellow-400">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 12l3-3 3 3 4-4M7 17h10M7 5h10" />
          </svg>
        </div>
      </div>
      <ProgressBar value={1200} goal={2000} color="bg-green-400" percentDisplay={45} />
    </div>
  </div>

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <div className="bg-gray-900 border border-yellow-400 p-4 rounded-lg text-yellow-400">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs uppercase">Activity Chart</h3>
        <div className="flex space-x-2">
          <button className="text-yellow-400">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
          <button className="text-yellow-400">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={activityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#d4d4d4" />
            <XAxis 
              dataKey="day" 
              stroke="#facc15"
              tick={{ fill: '#facc15', fontSize: 12 }}
            />
            <YAxis 
              stroke="#facc15"
              tick={{ fill: '#facc15', fontSize: 12 }}
              ticks={[0, 2, 4, 6, 8]}
              domain={[0, 8]}
              tickFormatter={(value) => `${value}km`}
            />
            <Line 
              type="monotone" 
              dataKey="Users" 
              stroke="#4ade80" 
              strokeWidth={2}
              dot={{ r: 0 }}
              activeDot={{ r: 6 }}
              animationDuration={1500}
            />
            <Line 
              type="monotone" 
              dataKey="Plans" 
              stroke="#60a5fa" 
              strokeWidth={2}
              dot={{ r: 0 }}
              activeDot={{ r: 6 }}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center mt-4 space-x-6">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
          <span className="text-xs">Users</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
          <span className="text-xs">Plans</span>
        </div>
      </div>
    </div>

    <div className="bg-gray-900 border border-yellow-400 p-4 rounded-lg text-yellow-400">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs uppercase">Activity Rating</h3>
        <div className="flex space-x-2">
          <button className="text-yellow-400">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
          <button className="text-yellow-400">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <ActivityRatingChart />
    </div>
  </div>
</main>
          <SareUsers />
          <SingleUser />
          <SarePlans />
      </div>
    </div>
  );
}


export default FitnessDashboard