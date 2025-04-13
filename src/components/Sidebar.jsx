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
  X,
} from "lucide-react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Sidebar = ({ isopen, setIsOpen }) => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [setting, setSetting] = useState(false)
  const [activeModal, setActiveModal] = useState(null)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!isopen) {
      setSetting(false)
      setActiveModal(null)
    }

    const handleClickOutside = (event) => {
      const settingsSection = document.getElementById("settings-section")
      if (setting && settingsSection && !settingsSection.contains(event.target)) {
        setSetting(false)
      }

      const modalElement = document.getElementById("settings-modal")
      if (activeModal && modalElement && !modalElement.contains(event.target)) {
        setActiveModal(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [setting, isopen, activeModal])

  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      setIsOpen(false)
    }
  }

  const toggleSetting = () => {
    setSetting(!setting)
  }

  const handleSettingClick = (action) => {
    setActiveModal(action)
    setSetting(false)

    // toast.info(`Opening ${action} settings`, {
    //   position: "top-right",
    //   autoClose: 3000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    // })
  }

  const handleLogout = () => {
    toast.success("You have been logged out successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
    setSetting(false)
  }

  const closeModal = () => {
    setActiveModal(null)
  }

  const renderModal = () => {
    if (!activeModal) return null

    let modalTitle = ""
    let modalContent = null

    switch (activeModal) {
      case "edit-name":
        modalTitle = "تعديل الاسم"
        modalContent = (
          <div className="p-4">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">الاسم الأول</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#26f4a8]"
                defaultValue="محمد"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">الاسم الأخير</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#26f4a8]"
                defaultValue="أحمد"
              />
            </div>
            <button
              className="bg-[#26f4a8] hover:bg-green-400 text-white px-4 py-2 rounded-lg w-full"
              onClick={() => {
                // toast.success("تم تحديث الاسم بنجاح", {
                //   position: "top-right",
                //   autoClose: 3000,
                // })
                closeModal()
              }}
            >
              حفظ التغييرات
            </button>
          </div>
        )
        break
      case "email":
        modalTitle = "البريد الإلكتروني"
        modalContent = (
          <div className="p-4">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">البريد الإلكتروني الحالي</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#26f4a8]"
                defaultValue="example@domain.com"
                disabled
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">البريد الإلكتروني الجديد</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#26f4a8]"
                placeholder="أدخل البريد الإلكتروني الجديد"
              />
            </div>
            <button
              className="bg-[#26f4a8] hover:bg-green-400 text-white px-4 py-2 rounded-lg w-full"
              onClick={() => {
                // toast.success("تم إرسال رابط التأكيد إلى بريدك الإلكتروني", {
                //   position: "top-right",
                //   autoClose: 3000,
                // })
                closeModal()
              }}
            >
              تحديث البريد الإلكتروني
            </button>
          </div>
        )
        break
      case "phone":
        modalTitle = "رقم الهاتف"
        modalContent = (
          <div className="p-4">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">رقم الهاتف الحالي</label>
              <input
                type="tel"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#26f4a8]"
                defaultValue="+966 50 123 4567"
                disabled
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">رقم الهاتف الجديد</label>
              <input
                type="tel"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#26f4a8]"
                placeholder="أدخل رقم الهاتف الجديد"
              />
            </div>
            <button
              className="bg-[#26f4a8] hover:bg-green-400 text-white px-4 py-2 rounded-lg w-full"
              onClick={() => {
                // toast.success("تم إرسال رمز التحقق إلى رقم هاتفك", {
                //   position: "top-right",
                //   autoClose: 3000,
                // })
                closeModal()
              }}
            >
              تحديث رقم الهاتف
            </button>
          </div>
        )
        break
      case "subscription":
        modalTitle = "الاشتراك"
        modalContent = (
          <div className="p-4">
            <div className="bg-green-50 p-3 rounded-lg mb-4 border border-green-200">
              <div className="font-bold text-green-700 mb-1">الاشتراك الحالي: مميز</div>
              <div className="text-sm text-green-600">تاريخ التجديد: 15 يونيو 2025</div>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">باقات الاشتراك</h3>
              <div className="space-y-3">
                <div className="border border-gray-200 p-3 rounded-lg flex justify-between items-center">
                  <div>
                    <div className="font-medium">الباقة الأساسية</div>
                    <div className="text-sm text-gray-500">50 ريال / شهر</div>
                  </div>
                  <button className="text-[#26f4a8] hover:underline">ترقية</button>
                </div>
                <div className="border border-green-300 bg-green-50 p-3 rounded-lg flex justify-between items-center">
                  <div>
                    <div className="font-medium">الباقة المميزة</div>
                    <div className="text-sm text-gray-500">100 ريال / شهر</div>
                  </div>
                  <div className="text-green-600 font-medium">مفعل</div>
                </div>
                <div className="border border-gray-200 p-3 rounded-lg flex justify-between items-center">
                  <div>
                    <div className="font-medium">الباقة الاحترافية</div>
                    <div className="text-sm text-gray-500">200 ريال / شهر</div>
                  </div>
                  <button className="text-[#26f4a8] hover:underline">ترقية</button>
                </div>
              </div>
            </div>

            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg w-full"
              onClick={() => {
                // toast.info("تم إلغاء الاشتراك. سيظل نشطًا حتى نهاية الفترة الحالية.", {
                //   position: "top-right",
                //   autoClose: 3000,
                // })
                closeModal()
              }}
            >
              إلغاء الاشتراك
            </button>
          </div>
        )
        break
      default:
        return null
    }

    return (
      <div
        className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50"
        style={{ backdropFilter: 'blur(2px)' }}
      >
        <div
          id="settings-modal"
          className="bg-white rounded-lg shadow-xl w-full max-w-md rtl mx-4" // Added mx-4 for small screens
        >
          <div className="flex justify-between items-center border-b border-gray-200 p-4">
            <h3 className="font-bold text-lg">{modalTitle}</h3>
            <button
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {modalContent}
        </div>
      </div>
    )
  }

  return (
    <>
      {renderModal()}
      <div
        className={`bg-white border-l border-gray-200 md:pt-0 pt-16 backdrop-blur md:w-64 w-full h-full fixed right-0 top-0 flex flex-col transition-all duration-300 z-10 ${isopen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <ToastContainer className={'z-40'} rtl />
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

        <nav className="flex-1 overflow-y-auto">
          <ul className="p-2">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center w-full py-3 px-4 rounded-lg transition-colors ${isActive ? "bg-green-100 text-green-500" : "hover:bg-gray-100"
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
                  `flex items-center w-full py-3 px-4 rounded-lg transition-colors ${isActive ? "bg-green-100 text-green-500" : "hover:bg-gray-100"
                  }`
                }
                onClick={handleLinkClick}
              >
                <MessageSquareText className="h-5 w-5 ml-3 text-gray-500" />
                <span className="font-medium">المحتوى الجاهز</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/user-prompts"
                className={({ isActive }) =>
                  `flex items-center w-full py-3 px-4 rounded-lg transition-colors ${isActive ? "bg-green-100 text-green-500" : "hover:bg-gray-100"
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
                  `flex items-center w-full py-3 px-4 rounded-lg transition-colors ${isActive ? "bg-green-100 text-green-500" : "hover:bg-gray-100"
                  }`
                }
                onClick={handleLinkClick}
              >
                <Bot className="h-5 w-5 ml-3 text-gray-500" />
                <span className="font-medium">مساعدي GPT</span>
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  `flex items-center w-full py-3 px-4 rounded-lg transition-colors ${isActive ? "bg-green-100 text-green-500" : "hover:bg-gray-100"
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
                  `flex items-center w-full py-3 px-4 rounded-lg transition-colors ${isActive ? "bg-green-100 text-green-500" : "hover:bg-gray-100"
                  }`
                }
                onClick={handleLinkClick}
              >
                <Bookmark className="h-5 w-5 ml-3 text-gray-500" />
                <span className="font-medium">التفضيلات المحفوظة</span>
              </NavLink>
            </li> */}
          </ul>
        </nav>

        <div className="">
          <ul className="p-2">
           
            <li>
              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  `flex items-center w-full py-3 px-4 rounded-lg transition-colors ${isActive ? "bg-green-100 text-green-500" : "hover:bg-gray-100"
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
                  `flex items-center w-full py-3 px-4 rounded-lg transition-colors ${isActive ? "bg-green-100 text-green-500" : "hover:bg-gray-100"
                  }`
                }
                onClick={handleLinkClick}
              >
                <Bookmark className="h-5 w-5 ml-3 text-gray-500" />
                <span className="font-medium">التفضيلات المحفوظة</span>
              </NavLink>
            </li>
          </ul>
        </div>

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
              <button
                className="flex items-center w-full py-2 px-4 hover:bg-gray-100 text-right"
                onClick={() => handleSettingClick("edit-name")}
              >
                <Edit className="h-4 w-4 ml-3 text-gray-500" />
                <span className="font-medium">تعديل الاسم</span>
              </button>
              <button
                className="flex items-center w-full py-2 px-4 hover:bg-gray-100 text-right"
                onClick={() => handleSettingClick("email")}
              >
                <Mail className="h-4 w-4 ml-3 text-gray-500" />
                <span className="font-medium">البريد الإلكتروني</span>
              </button>
              <button
                className="flex items-center w-full py-2 px-4 hover:bg-gray-100 text-right"
                onClick={() => handleSettingClick("phone")}
              >
                <Phone className="h-4 w-4 ml-3 text-gray-500" />
                <span className="font-medium">رقم الهاتف</span>
              </button>
              <button
                className="flex items-center w-full py-2 px-4 hover:bg-gray-100 text-right"
                onClick={() => handleSettingClick("subscription")}
              >
                <CreditCard className="h-4 w-4 ml-3 text-gray-500" />
                <span className="font-medium">الاشتراك</span>
              </button>
              {/* <div className="border-t border-gray-200 my-1"></div>
              <button
                className="flex items-center w-full py-2 px-4 hover:bg-gray-100 text-right text-red-500"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 ml-3 text-red-500" />
                <span className="font-medium">تسجيل الخروج</span>
              </button> */}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Sidebar
