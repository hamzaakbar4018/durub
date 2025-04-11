
import { useState } from "react"
import { Search, Filter, Copy, Heart, Tag, X } from "lucide-react"

const Favorites = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPlatform, setSelectedPlatform] = useState("all")

  // Sample data for favorite prompts
  const favoritePrompts = [
    {
      id: 1,
      title: "Business Plan Generator",
      description:
        "Create a comprehensive business plan for your startup with financial projections and detailed market analysis.",
      category: "Business",
      platform: "ChatGPT",
      code: "I want you to create a detailed business plan for a startup with 3 branches...",
      dateAdded: "2023-04-15",
    },
    {
      id: 2,
      title: "Marketing Strategy",
      description: "Generate a complete marketing strategy for your product launch",
      category: "Marketing",
      platform: "ChatGPT",
      code: "Create a comprehensive marketing strategy for launching FitTrack Pro in the Saudi Arabia market...",
      dateAdded: "2023-04-10",
    },
    {
      id: 3,
      title: "SEO Keyword Research",
      description: "Find the best keywords for your website to improve search ranking",
      category: "SEO",
      platform: "Claude",
      code: "Perform keyword research for a Fitness website focused on Home Workouts...",
      dateAdded: "2023-04-05",
    },
    {
      id: 7,
      title: "Futuristic City Scene",
      description: "Generate a detailed image prompt for a futuristic cityscape",
      category: "Art",
      platform: "MidJourney",
      code: "A futuristic cityscape with tall skyscrapers, flying vehicles, holographic advertisements, in Cyberpunk style...",
      dateAdded: "2023-03-20",
    },
  ]

  // Get unique categories and platforms for filters
  const categories = ["all", ...new Set(favoritePrompts.map((prompt) => prompt.category))]
  const platforms = ["all", ...new Set(favoritePrompts.map((prompt) => prompt.platform))]

  // Filter prompts based on search query, category, and platform
  const filteredPrompts = favoritePrompts.filter((prompt) => {
    const matchesSearch =
      searchQuery === "" ||
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "all" || prompt.category === selectedCategory
    const matchesPlatform = selectedPlatform === "all" || prompt.platform === selectedPlatform

    return matchesSearch && matchesCategory && matchesPlatform
  })

  const handleRemoveFavorite = (id) => {
    // In a real implementation, this would remove the prompt from favorites
    alert(`Removed prompt ${id} from favorites`)
  }

  const handleCopyPrompt = (code) => {
    navigator.clipboard.writeText(code)
    alert("Prompt copied to clipboard!")
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 rtl">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">المفضلة</h1>

      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex flex-wrap gap-4 w-full">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="البحث في المفضلة..."
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

      {/* Favorites list */}
      {filteredPrompts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrompts.map((prompt) => (
            <div
              key={prompt.id}
              className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow relative"
            >
              <div className="mb-2 justify-end top-4 left-4 flex gap-2">
                <button
                  className="text-red-500 hover:text-red-600"
                  onClick={() => handleRemoveFavorite(prompt.id)}
                  title="إزالة من المفضلة"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{prompt.title}</h3>
                <span className="bg-green-100 text-[#26f4a8] text-xs px-2 py-1 rounded-full mt-1 ml-2">
                  {prompt.category}
                </span>
              </div>

              <p className="text-gray-600 mb-4">
                {prompt.description.length > 80 ? prompt.description.substring(0, 80) + "..." : prompt.description}
              </p>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Tag className="w-4 h-4 mr-1 text-gray-500" />
                  <span className="text-sm text-gray-500">{prompt.platform}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">
                    {new Date(prompt.dateAdded).toLocaleDateString("ar-SA")}
                  </span>
                  <button
                    className="text-[#26f4a8] hover:text-green-400"
                    onClick={() => handleCopyPrompt(prompt.code)}
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
          <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">لا توجد مفضلات</h3>
          <p className="text-gray-500">
            لم تقم بإضافة أي محتوى إلى المفضلة بعد. يمكنك إضافة المحتوى بالضغط على أيقونة القلب.
          </p>
        </div>
      )}
    </div>
  )
}

export default Favorites
