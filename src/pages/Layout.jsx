// import React, { useState } from 'react';
// import { Link, Outlet } from 'react-router-dom';
// import { Menu, X, MessageCircle } from 'lucide-react';
// import Sidebar from '../components/Sidebar';

// const Layout = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   return (
//     <div className="flex h-screen bg-gray-100" dir="rtl">
//       <Sidebar isopen={sidebarOpen} setIsOpen={setSidebarOpen} />

//       <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'md:mr-64' : 'mr-0'}`}>
//         <header className="bg-white shadow-sm z-10">
//           <div className="px-4 py-3 flex justify-between items-center">
//             <button 
//               id="sidebar-toggle"
//               onClick={toggleSidebar} 
//               className="p-2 rounded-md hover:bg-gray-200"
//             >
//               {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </button>
//             <h1 className="text-xl font-semibold text-gray-800">Durub Alriyada</h1>
//             <div className="w-6"></div> {/* Placeholder for symmetry */}
//           </div>
//         </header>

//         <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
//           <Outlet />
//         </main>
        
//         <a
//           href="https://api.whatsapp.com/send?phone=966534416844"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <div className="fixed bottom-6 left-6 bg-green-500 text-white rounded-full p-3 shadow-lg cursor-pointer hover:bg-green-600 transition-colors">
//             <MessageCircle className="h-6 w-6" />
//           </div>
//         </a>
//       </div>
//     </div>
//   );
// };

// export default Layout;
"use client"

import { useState } from "react"
import { Outlet } from "react-router-dom"
import { Menu, X, MessageCircle } from "lucide-react"
import Sidebar from "../components/Sidebar"

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="flex h-screen bg-gray-100" dir="rtl">
      <Sidebar isopen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? "md:mr-64" : "mr-0"}`}>
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 py-3 flex justify-between items-center">
            <button id="sidebar-toggle" onClick={toggleSidebar} className="p-2 rounded-md hover:bg-gray-200">
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <h1 className="text-xl font-semibold text-gray-800">Durub Alriyada</h1>
            <div className="w-6"></div> {/* Placeholder for symmetry */}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
          <Outlet />
        </main>

        <a href="https://api.whatsapp.com/send?phone=966534416844" target="_blank" rel="noopener noreferrer">
          <div className="fixed bottom-6 left-6 bg-green-500 text-white rounded-full p-3 shadow-lg cursor-pointer hover:bg-green-600 transition-colors">
            <MessageCircle className="h-6 w-6" />
          </div>
        </a>
      </div>
    </div>
  )
}

export default Layout
