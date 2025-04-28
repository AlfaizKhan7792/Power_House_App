import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { DumbbellIcon, User, Menu } from 'lucide-react'

const Sidebar = ({ handleLogOut }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <aside
    className={`${
      isSidebarOpen ? 'w-60' : 'w-16'
    } hidden md:flex bg-gray-900 border-r border-gray-800 flex-col h-[100vh] sticky top-0 transition-all duration-300 ease-in-out`}
  >
  
      {/* Logo + Menu Button */}
      <div className="flex border-b border-yellow-500 items-center space-x-2 p-4 top-0 z-10">
        <button
          className="text-yellow-400 hover:text-yellow-300 transition"
          onClick={() => setIsSidebarOpen(prev => !prev)}
        >
          <Menu size={20} />
        </button>

        {isSidebarOpen && (
          <h1 className="text-xl font-bold">
            <span className="text-yellow-400">Fitness</span>
            <span className="text-gray-300">pro</span>
          </h1>
        )}
      </div>

      {/* Menu Links */}
      <div className="mt-10 flex flex-col space-y-6 px-4">
        <SidebarLink
          to="/dashboard"
          icon={
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
          }
          label="Dashboard"
          isOpen={isSidebarOpen}
        />

        <SidebarLink
          to="/all-users"
          icon={
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 00-3-3.87"></path>
              <path d="M16 3.13a4 4 0 010 7.75"></path>
            </svg>
          }
          label="All Users"
          isOpen={isSidebarOpen}
        />

        <SidebarLink
          to="/all-plans"
          icon={<DumbbellIcon />}
          label="All Plans"
          isOpen={isSidebarOpen}
        />

        <SidebarLink
          to="/user-plans"
          icon={<User />}
          label="User"
          isOpen={isSidebarOpen}
        />
      </div>

      {/* Dark Mode Toggle */}
      <div className="mt-auto px-4 py-4 flex items-center space-x-3">
        {isSidebarOpen && <span className="text-sm text-gray-400">Dark mode</span>}
        <button className="w-10 h-5 bg-blue-600 rounded-full flex items-center px-1">
          <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
        </button>
      </div>

      {/* Logout */}
      <div onClick={handleLogOut} className="px-4 py-4 border-t border-yellow-500">
        <a href="#" className="flex items-center text-gray-400 space-x-3 hover:text-white transition-colors">
          <div className="w-8 h-8 flex items-center justify-center">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </div>
          {isSidebarOpen && <span>Log Out</span>}
        </a>
      </div>
    </aside>
  )
}

// SidebarLink Component
const SidebarLink = ({ to, icon, label, isOpen }) => (
  <Link to={to} className="flex items-center text-gray-400 space-x-3 hover:text-white transition-colors">
    <div className="w-8 h-8 flex items-center justify-center">{icon}</div>
    {isOpen && <span>{label}</span>}
  </Link>
)

export default Sidebar
