"use client"

import { useState } from "react"
import { Search, Filter, Copy, Edit, Trash2, Bookmark, Play, Tag } from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const SavedPreferences = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPlatform, setSelectedPlatform] = useState("all")

  const savedPreferences = [
    {
      id: 1,
      title: "Business Plan - Durub AlRiyada",
      description: "Business plan template with 3 branches",
      category: "Business",
      platform: "ChatGPT",
      prompt: "I want you to create a detailed business plan for a Durub AlRiyada with 3 branches...",
      inputs: {
        projectName: "Durub AlRiyada",
        branchCount: "3",
      },
      dateCreated: "2023-04-15",
    },
    {
      id: 2,
      title: "FitTrack Pro Marketing",
      description: "Marketing strategy for Saudi market",
      category: "Marketing",
      platform: "ChatGPT",
      prompt: "Create a comprehensive marketing strategy for launching FitTrack Pro in the Saudi Arabia market...",
      inputs: {
        productName: "FitTrack Pro",
        targetMarket: "Saudi Arabia",
      },
      dateCreated: "2023-04-10",
    },
    {
      id: 3,
      title: "Fitness Website SEO",
      description: "Keyword research for home workouts",
      category: "SEO",
      platform: "Claude",
      prompt: "Perform keyword research for a Fitness website focused on Home Workouts...",
      inputs: {
        industryType: "Fitness",
        topicFocus: "Home Workouts",
      },
      dateCreated: "2023-04-05",
    },
    {
      id: 4,
      title: "Cyberpunk City",
      description: "Futuristic cityscape image prompt",
      category: "Art",
      platform: "MidJourney",
      prompt:
        "A futuristic cityscape with tall skyscrapers, flying vehicles, holographic advertisements, in Cyberpunk style...",
      inputs: {
        style: "Cyberpunk",
      },
      dateCreated: "2023-03-20",
    },
  ]

  const categories = ["all", ...new Set(savedPreferences.map((pref) => pref.category))]
  const platforms = ["all", ...new Set(savedPreferences.map((pref) => pref.platform))]

  const filteredPreferences = savedPreferences.filter((pref) => {
    const matchesSearch =
      searchQuery === "" ||
      pref.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pref.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "all" || pref.category === selectedCategory
    const matchesPlatform = selectedPlatform === "all" || pref.platform === selectedPlatform

    return matchesSearch && matchesCategory && matchesPlatform
  })

  const handleDeletePreference = (id) => {
    toast.success(`Preference ${id} has been deleted.`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  }

  const handleEditPreference = (id) => {
    toast.info(`Editing preference ${id}.`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  }

  const handleUsePreference = (preference) => {
    toast.success(`Using preference: ${preference.title}`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  }

  const handleCopyPrompt = (prompt) => {
    navigator.clipboard.writeText(prompt)
    toast.success("The prompt has been copied to your clipboard.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  }

  const formatInputs = (inputs) => {
    return Object.entries(inputs)
      .map(([key, value]) => {
        const formattedKey = key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())
        return `${formattedKey}: ${value}`
      })
      .join(", ")
  }

  return (
    <div className="container mx-auto md:px-4 sm:px-6 py-8 rtl">
      <ToastContainer rtl />
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">التفضيلات المحفوظة</h1>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex flex-wrap gap-4 w-full">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="البحث في التفضيلات المحفوظة..."
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#26f4a8]"
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
            />
          </div>

          <div className="flex gap-2">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#26f4a8]"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "جميع الفئات" : category}
                </option>
              ))}
            </select>

            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#26f4a8]"
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
            >
              {platforms.map((platform) => (
                <option key={platform} value={platform}>
                  {platform === "all" ? "جميع المنصات" : platform}
                </option>
              ))}
            </select>

            <button className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg">
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {filteredPreferences.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPreferences.map((preference) => (
            <div
              key={preference.id}
              className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{preference.title}</h3>
                <span className="bg-green-100 text-black text-xs px-2 py-1 rounded-full mt-1 ml-2">
                  {preference.category}
                </span>
              </div>

              <p className="text-gray-600 mb-3">{preference.description}</p>

              <div className="bg-gray-50 p-3 rounded-md mb-4 text-sm">
                <div className="font-semibold mb-1">المدخلات:</div>
                <div className="text-gray-600">{formatInputs(preference.inputs)}</div>
              </div>

              <div className="flex justify-between items-center mb-3">
                <div className="flex gap-2 items-center">
                  <Tag className="w-4 h-4 mr-1 text-gray-500" />
                  <span className="text-sm text-gray-500">{preference.platform}</span>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(preference.dateCreated).toLocaleDateString("ar-SA")}
                </span>
              </div>

              <div className="flex justify-between">
                <div className="flex gap-2">
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => handleEditPreference(preference.id)}
                    title="تعديل"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    className="text-gray-500 hover:text-red-500"
                    onClick={() => handleDeletePreference(preference.id)}
                    title="حذف"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    className="text-[#26f4a8] hover:text-green-400"
                    onClick={() => handleCopyPrompt(preference.prompt)}
                    title="نسخ"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <Bookmark className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">لا توجد تفضيلات محفوظة</h3>
          <p className="text-gray-500">لم تقم بحفظ أي تفضيلات بعد. يمكنك حفظ التفضيلات عند استخدام المحتوى.</p>
        </div>
      )}
    </div>
  )
}

export default SavedPreferences
