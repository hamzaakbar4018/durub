import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Settings, User, Calendar, Clock, MessageCircle } from 'lucide-react';

const Sidebar = ({ isopen }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={`bg-white border-l border-gray-200 w-64 h-full fixed right-0 top-0 flex flex-col transition-all duration-300 z-10 ${
        isopen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* User profile */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col items-center">
          <div className="relative">
            <img 
              src="https://api.dicebear.com/7.x/adventurer/svg?seed=JohnDoe" 
              alt="Profile" 
              className="w-20 h-20 rounded-full border-2 border-green-500"
            />
            <div className="absolute bottom-0 right-0 bg-green-500 text-white rounded-full p-1">
              <User className="h-4 w-4" />
            </div>
          </div>
          <h2 className="mt-4 font-bold text-lg">محمد أحمد</h2>
          <div className="text-sm text-green-500 font-medium">Premium Subscription</div>
        </div>
      </div>

      {/* Date and time */}
      <div className="px-4 py-3 border-b border-gray-200 flex flex-col">
        <div className="flex items-center text-sm text-gray-600 mb-1">
          <Calendar className="w-4 h-4 ml-2" />
          {currentTime.toLocaleDateString('ar-SA', { day: 'numeric', month: 'long', year: 'numeric' })}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="w-4 h-4 ml-2" />
          {currentTime.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {/* Navigation menu */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="p-2">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => 
                `flex items-center w-full py-3 px-4 rounded-lg transition-colors ${
                  isActive ? 'bg-green-100 text-green-500' : 'hover:bg-gray-100'
                }`
              }
              end
            >
              <span className="font-medium">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/prompts"
              className={({ isActive }) => 
                `flex items-center w-full py-3 px-4 rounded-lg transition-colors ${
                  isActive ? 'bg-green-100 text-green-500' : 'hover:bg-gray-100'
                }`
              }
            >
              <span className="font-medium">Prompts</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/gpt-assistants"
              className={({ isActive }) => 
                `flex items-center w-full py-3 px-4 rounded-lg transition-colors ${
                  isActive ? 'bg-green-100 text-green-500' : 'hover:bg-gray-100'
                }`
              }
            >
              <span className="font-medium">GPT Assistants</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Settings */}
      <div className="p-4 border-t border-gray-200">
        <button className="flex items-center w-full py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors">
          <Settings className="h-5 w-5 ml-3 text-gray-500" />
          <span className="font-medium">Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;