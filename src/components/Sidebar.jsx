"use client"

import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import {
  Settings,
  User,
  Calendar,
  Clock,
  Edit,
  Mail,
  Phone,
  CreditCard,
  Heart,
  Bookmark,
  LayoutDashboard,
  MessageSquareText,
  Bot,
  LogOut,
  FilePlus,
} from "lucide-react"

const Sidebar = ({ isopen, setIsOpen }) => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [setting, setSetting] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    // Close settings dropdown when sidebar is closed
    if (!isopen) {
      setSetting(false)
    }

    // Close settings dropdown when clicking outside
    const handleClickOutside = (event) => {
      const settingsSection = document.getElementById("settings-section")
      if (setting && settingsSection && !settingsSection.contains(event.target)) {
        setSetting(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [setting, isopen])

  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      setIsOpen(false) // Close the sidebar on mobile view when a link is clicked
    }
  }

  const toggleSetting = () => {
    setSetting(!setting)
  }

  return (
    <div
      className={`bg-white border-l border-gray-200 md:pt-0 pt-16 backdrop-blur md:w-64 w-full h-full fixed right-0 top-0 flex flex-col transition-all duration-300 z-10 ${
        isopen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* User profile */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src="https://api.dicebear.com/7.x/adventurer/svg?seed=JohnDoe"
              alt="الصورة الشخصية"
              className="w-20 h-20 rounded-full border-2 border-green-400"
            />
            <div className="absolute bottom-0 right-0 bg-green-400 text-white rounded-full p-1">
              <User className="h-4 w-4" />
            </div>
          </div>
          <h2 className="mt-4 font-bold text-lg">محمد أحمد</h2>
          <div className="text-sm text-green-500 font-medium">اشتراك مميز</div>
        </div>
      </div>

      {/* Date and time */}
      <div className="px-4 py-3 border-b border-gray-200 flex flex-col">
        <div className="flex items-center text-sm text-gray-600 mb-1">
          <Calendar className="w-4 h-4 ml-2" />
          {currentTime.toLocaleDateString("ar-SA", { day: "numeric", month: "long", year: "numeric" })}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="w-4 h-4 ml-2" />
          {currentTime.toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" })}
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
                  isActive ? "bg-green-100 text-green-500" : "hover:bg-gray-100"
                }`
              }
              end
              onClick={handleLinkClick}
            >
              <LayoutDashboard className="h-5 w-5 ml-3 text-gray-500" />
              <span className="font-medium">لوحة التحكم</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/prompts"
              className={({ isActive }) =>
                `flex items-center w-full py-3 px-4 rounded-lg transition-colors ${
                  isActive ? "bg-green-100 text-green-500" : "hover:bg-gray-100"
                }`
              }
              onClick={handleLinkClick}
            >
              <MessageSquareText className="h-5 w-5 ml-3 text-gray-500" />
              <span className="font-medium">المحتوى الجاهز</span>
            </NavLink>
          </li>
          
          {/* New UserPrompts Link */}
          <li>
            <NavLink
              to="/user-prompts"
              className={({ isActive }) =>
                `flex items-center w-full py-3 px-4 rounded-lg transition-colors ${
                  isActive ? "bg-green-100 text-green-500" : "hover:bg-gray-100"
                }`
              }
              onClick={handleLinkClick}
            >
              <FilePlus className="h-5 w-5 ml-3 text-gray-500" />
              <span className="font-medium">إعدادات البرومبت</span>
            </NavLink>
          </li>
          
          <li>
            <NavLink
              to="/gpt-assistants"
              className={({ isActive }) =>
                `flex items-center w-full py-3 px-4 rounded-lg transition-colors ${
                  isActive ? "bg-green-100 text-green-500" : "hover:bg-gray-100"
                }`
              }
              onClick={handleLinkClick}
            >
              <Bot className="h-5 w-5 ml-3 text-gray-500" />
              <span className="font-medium">مساعدي GPT</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `flex items-center w-full py-3 px-4 rounded-lg transition-colors ${
                  isActive ? "bg-green-100 text-green-500" : "hover:bg-gray-100"
                }`
              }
              onClick={handleLinkClick}
            >
              <Heart className="h-5 w-5 ml-3 text-gray-500" />
              <span className="font-medium">المفضلة</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/saved-preferences"
              className={({ isActive }) =>
                `flex items-center w-full py-3 px-4 rounded-lg transition-colors ${
                  isActive ? "bg-green-100 text-green-500" : "hover:bg-gray-100"
                }`
              }
              onClick={handleLinkClick}
            >
              <Bookmark className="h-5 w-5 ml-3 text-gray-500" />
              <span className="font-medium">التفضيلات المحفوظة</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Settings */}
      <div id="settings-section" className="p-4 border-t border-gray-200 relative">
        <button
          onClick={toggleSetting}
          className="flex items-center w-full py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Settings
            className={`h-5 w-5 ml-3 text-gray-500 transition-transform duration-300 ${setting ? "rotate-90" : ""}`}
          />
          <span className="font-medium">الإعدادات</span>
        </button>

        {setting && (
          <div className="absolute bottom-16 right-4 bg-white shadow-lg rounded-lg w-56 py-2 border border-gray-200">
            <button className="flex items-center w-full py-2 px-4 hover:bg-gray-100 text-right">
              <Edit className="h-4 w-4 ml-3 text-gray-500" />
              <span className="font-medium">تعديل الاسم</span>
            </button>
            <button className="flex items-center w-full py-2 px-4 hover:bg-gray-100 text-right">
              <Mail className="h-4 w-4 ml-3 text-gray-500" />
              <span className="font-medium">البريد الإلكتروني</span>
            </button>
            <button className="flex items-center w-full py-2 px-4 hover:bg-gray-100 text-right">
              <Phone className="h-4 w-4 ml-3 text-gray-500" />
              <span className="font-medium">رقم الهاتف</span>
            </button>
            <button className="flex items-center w-full py-2 px-4 hover:bg-gray-100 text-right">
              <CreditCard className="h-4 w-4 ml-3 text-gray-500" />
              <span className="font-medium">الاشتراك</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Sidebar