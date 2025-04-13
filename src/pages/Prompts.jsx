"use client"

import { useState, useEffect } from "react"
import { Search, Filter, Copy, ArrowLeft, Heart, Star, Lock } from "lucide-react"
import { IoSparklesSharp } from "react-icons/io5"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import CategoryFilter from "../components/CategoryFilter"
import chatgpt from "../assets/chatgpt.png"
import gemini from "../assets/gemini.png"
import midhourney from "../assets/midjourney.png"
import claude from "../assets/claude.png"
import { useNavigate, useLocation } from "react-router-dom"

const Prompts = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  const [selectedPrompt, setSelectedPrompt] = useState(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [userInputs, setUserInputs] = useState({})
  const [newPromptDescription, setNewPromptDescription] = useState("")
  const [generatedPrompt, setGeneratedPrompt] = useState("")
  const [isCreateButtonHovered, setIsCreateButtonHovered] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState(null)
  const [favorites, setFavorites] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [userCreatedPrompts, setUserCreatedPrompts] = useState([])

  // Read state from URL on component mount and when URL changes
  useEffect(() => {
    const platform = searchParams.get("platform")
    const promptId = searchParams.get("promptId")
    const form = searchParams.get("form") === "create"

    if (platform) {
      setSelectedPlatform(platform)
    }

    if (form) {
      setShowCreateForm(true)
      setSelectedPrompt(null)
    } else if (promptId) {
      const prompt = allPrompts.find((p) => p.id.toString() === promptId)
      if (prompt) {
        setSelectedPrompt(prompt)
        setShowCreateForm(false)

        // Initialize inputs for the selected prompt
        const initialInputs = {}
        prompt.inputs.forEach((input) => {
          const preferenceValue = userPreferences[input.id]
          initialInputs[input.id] = preferenceValue || ""
        })
        setUserInputs(initialInputs)
      }
    } else if (!platform) {
      setSelectedPlatform(null)
      setSelectedPrompt(null)
      setShowCreateForm(false)
    } else {
      setSelectedPrompt(null)
      setShowCreateForm(false)
    }
  }, [location.search])

  // Function to update URL with current state
  const updateURL = (params) => {
    const urlParams = new URLSearchParams(location.search)

    // Update or remove parameters
    if (params.platform) {
      urlParams.set("platform", params.platform)
    } else {
      urlParams.delete("platform")
    }

    if (params.promptId) {
      urlParams.set("promptId", params.promptId)
    } else {
      urlParams.delete("promptId")
    }

    if (params.form) {
      urlParams.set("form", params.form)
    } else {
      urlParams.delete("form")
    }

    // Update the URL without refreshing the page
    navigate(`${location.pathname}?${urlParams.toString()}`, { replace: true })
  }

  // Modified handlers to update URL
  const handleSelectPlatform = (platform) => {
    setSelectedPlatform(platform)
    setSelectedCategory("all")
    updateURL({ platform, promptId: null, form: null })
  }

  const handlePromptClick = (prompt) => {
    if (prompt.subscriptionRequired === null) {
      setSelectedPrompt(prompt)
      const initialInputs = {}
      prompt.inputs.forEach((input) => {
        const preferenceValue = userPreferences[input.id]
        initialInputs[input.id] = preferenceValue || ""
      })
      setUserInputs(initialInputs)
      updateURL({ platform: selectedPlatform, promptId: prompt.id.toString(), form: null })
    } else {
      toast.error(`This prompt requires a ${prompt.subscriptionRequired} subscription to access.`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    }
  }

  const handleShowCreateForm = () => {
    setShowCreateForm(true)
    updateURL({ platform: selectedPlatform, promptId: null, form: "create" })
  }

  const handleGoBack = () => {
    if (selectedPrompt) {
      setSelectedPrompt(null)
      updateURL({ platform: selectedPlatform, promptId: null, form: null })
    } else if (showCreateForm) {
      setShowCreateForm(false)
      updateURL({ platform: selectedPlatform, promptId: null, form: null })
    } else if (selectedPlatform) {
      setSelectedPlatform(null)
      setSelectedCategory("all")
      updateURL({ platform: null, promptId: null, form: null })
    }
  }

  const platforms = [
    { id: "chatgpt", name: "ChatGPT", icon: chatgpt },
    { id: "claude", name: "Claude", icon: claude },
    { id: "midjourney", name: "MidJourney", icon: midhourney },
    { id: "gemini", name: "Gemini", icon: gemini },
  ]

  const designStyles = [
    { id: "realistic", name: "Realistic" },
    { id: "cartoon", name: "Cartoon" },
    { id: "abstract", name: "Abstract" },
    { id: "minimalist", name: "Minimalist" },
    { id: "cyberpunk", name: "Cyberpunk" },
  ]

  const userPreferences = {
    projectName: "Durub AlRiyada",
    branchCount: "3",
    businessName: "Fitness Center",
    newsletterTopic: "Health Tips",
    productName: "FitTrack Pro",
    targetMarket: "Saudi Arabia",
  }

  useEffect(() => {
    setUserCreatedPrompts([
      {
        id: 101,
        title: "My Custom Marketing Plan",
        description: "A personalized marketing strategy for my business",
        category: "Marketing",
        platform: "ChatGPT",
        dateCreated: new Date().toISOString(),
        prompt: "Create a marketing plan for a fitness center focusing on social media and local advertising...",
      },
      {
        id: 102,
        title: "Product Launch Email",
        description: "Email template for new product announcements",
        category: "Email",
        platform: "Claude",
        dateCreated: new Date(Date.now() - 86400000).toISOString(),
        prompt: "Write an email announcing the launch of our new fitness tracking app...",
      },
    ])
  }, [])

  const allPrompts = [
    {
      id: 1,
      title: "Business Plan Generator",
      description:
        "Create a comprehensive business plan for your startup with financial projections and detailed market analysis, along with implementation strategies and risk assessment.",
      category: "Business",
      platform: "ChatGPT",
      code: "I want you to create a detailed business plan for a {projectName} with {branchCount} branches. Include the following sections: Executive Summary, Company Description, Market Analysis, Organization & Management, Service/Product Line, Marketing & Sales, Financial Projections for 3 years, and Funding Request if applicable.",
      inputs: [
        { id: "projectName", label: "Project Name", example: "Durub AlRiyada", type: "text" },
        { id: "branchCount", label: "Number of Branches", example: "3", type: "number" },
      ],
      subscriptionRequired: "premium",
    },
    {
      id: 2,
      title: "Marketing Strategy",
      description: "Generate a complete marketing strategy for your product launch",
      category: "Marketing",
      platform: "ChatGPT",
      code: "Create a comprehensive marketing strategy for launching {productName} in the {targetMarket} market. Include digital marketing tactics, content strategy, and budget allocation.",
      inputs: [
        { id: "productName", label: "Product Name", example: "FitTrack Pro", type: "text" },
        { id: "targetMarket", label: "Target Market", example: "Saudi Arabia", type: "text" },
      ],
      subscriptionRequired: null,
    },
    {
      id: 3,
      title: "SEO Keyword Research",
      description: "Find the best keywords for your website to improve search ranking",
      category: "SEO",
      platform: "Claude",
      code: "Perform keyword research for a {industryType} website focused on {topicFocus}. Identify primary keywords, long-tail variations, and include search volume estimates and competition level.",
      inputs: [
        { id: "industryType", label: "Industry Type", example: "Fitness", type: "text" },
        { id: "topicFocus", label: "Topic Focus", example: "Home Workouts", type: "text" },
      ],
      subscriptionRequired: null,
    },
    {
      id: 4,
      title: "Content Calendar",
      description: "Create a monthly content calendar for your social media platforms",
      category: "Content",
      platform: "Claude",
      code: "Create a {duration} content calendar for {platformName} focusing on {contentTheme}. Include post types, posting frequency, and content themes.",
      inputs: [
        { id: "duration", label: "Duration (e.g., 1 month)", example: "3 months", type: "text" },
        { id: "platformName", label: "Platform Name", example: "Instagram", type: "text" },
        { id: "contentTheme", label: "Content Theme", example: "Fitness Tips", type: "text" },
      ],
      subscriptionRequired: "premium",
    },
    {
      id: 5,
      title: "Product Description",
      description: "Generate compelling product descriptions for your e-commerce store",
      category: "E-commerce",
      platform: "Gemini",
      code: "Write a compelling product description for AirFlex Mat, a Yoga Mat priced at 199 SAR. Focus on benefits, features, and include a call to action.",
      inputs: [],
      subscriptionRequired: null,
    },
    {
      id: 6,
      title: "Email Newsletter",
      description: "Create engaging email newsletters to connect with your audience",
      category: "Email",
      platform: "ChatGPT",
      code: "Write an email newsletter for {businessName} focusing on {newsletterTopic}. Include an engaging subject line, introduction, main content sections, and a clear call to action.",
      inputs: [
        { id: "businessName", label: "Business Name", example: "Durub AlRiyada", type: "text" },
        { id: "newsletterTopic", label: "Newsletter Topic", example: "Monthly Fitness Challenge", type: "text" },
      ],
      subscriptionRequired: "basic",
    },
    {
      id: 7,
      title: "Futuristic City Scene",
      description: "Generate a detailed image prompt for a futuristic cityscape",
      category: "Art",
      platform: "MidJourney",
      code: "A futuristic cityscape with tall skyscrapers, flying vehicles, holographic advertisements, in {style} style, detailed lighting, 8k resolution",
      inputs: [
        {
          id: "style",
          label: "Art Style",
          example: "Cyberpunk",
          type: "select",
          options: designStyles.map((style) => style.name),
        },
      ],
      subscriptionRequired: "premium",
    },
    {
      id: 8,
      title: "Fantasy Character",
      description: "Create a detailed fantasy character concept art prompt",
      category: "Art",
      platform: "MidJourney",
      code: "Fantasy character portrait, {race} {profession}, intricate armor, {style} style, detailed face, magical effects, dramatic lighting, 4k resolution",
      inputs: [
        { id: "race", label: "Character Race", example: "Elf", type: "text" },
        { id: "profession", label: "Character Class", example: "Warrior", type: "text" },
        {
          id: "style",
          label: "Art Style",
          example: "Realistic",
          type: "select",
          options: designStyles.map((style) => style.name),
        },
      ],
      subscriptionRequired: "premium",
    },
    {
      id: 9,
      title: "Data Analysis Report",
      description: "Generate a comprehensive data analysis report",
      category: "Analytics",
      platform: "Gemini",
      code: "Create a comprehensive data analysis report for quarterly sales data, including trend analysis, key insights, and visual representation recommendations.",
      inputs: [],
      subscriptionRequired: null,
    },
  ]

  const prompts = selectedPlatform
    ? allPrompts.filter((prompt) => prompt.platform.toLowerCase() === selectedPlatform.toLowerCase())
    : allPrompts

  const getUniqueCategories = (platformPrompts) => {
    const categories = new Set(platformPrompts.map((prompt) => prompt.category))
    return ["all", ...Array.from(categories)]
  }

  const filteredPrompts =
    searchQuery || selectedCategory !== "all"
      ? prompts.filter((prompt) => {
          const matchesSearch =
            searchQuery === "" ||
            prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            prompt.category.toLowerCase().includes(searchQuery.toLowerCase())

          const matchesCategory = selectedCategory === "all" || prompt.category === selectedCategory

          return matchesSearch && matchesCategory
        })
      : prompts

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
  }

  const handleInputChange = (inputId, value) => {
    setUserInputs({
      ...userInputs,
      [inputId]: value,
    })
  }

  const getFormattedPromptCode = () => {
    if (!selectedPrompt) return ""

    let formattedCode = selectedPrompt.code
    Object.keys(userInputs).forEach((key) => {
      const value = userInputs[key] || `[${key}]`
      formattedCode = formattedCode.replace(`{${key}}`, value)
    })

    return formattedCode
  }

  const handleCreatePrompt = () => {
    setGeneratedPrompt(
      `Generated prompt based on: "${newPromptDescription}"\n\nThis is where the AI-generated prompt would appear. In a real implementation, this would call an API to generate the prompt using ChatGPT.`,
    )
  }

  const toggleFavorite = (promptId) => {
    if (favorites.includes(promptId)) {
      setFavorites(favorites.filter((id) => id !== promptId))
      toast.info("The prompt has been removed from your favorites.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    } else {
      setFavorites([...favorites, promptId])
      toast.success("The prompt has been added to your favorites.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    }
  }

  const handleSavePrompt = () => {
    toast.success("The prompt has been saved to your profile.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })

    const newPrompt = {
      id: Date.now(),
      title: "New Custom Prompt",
      description: newPromptDescription.substring(0, 100) + (newPromptDescription.length > 100 ? "..." : ""),
      category: "Custom",
      platform: selectedPlatform || "ChatGPT",
      dateCreated: new Date().toISOString(),
      prompt: generatedPrompt,
    }

    setUserCreatedPrompts([newPrompt, ...userCreatedPrompts])
    setShowCreateForm(false)
    updateURL({ platform: selectedPlatform, promptId: null, form: null })
  }

  const SearchBar = () => (
    <div className="flex flex-col sm:flex-row gap-4 w-full">
      <div className="flex gap-4 w-full sm:w-auto">
        <button
          className="relative bg-[#26f4a8] hover:bg-green-400 text-white px-4 py-2 rounded-lg flex items-center"
          onClick={handleShowCreateForm}
        >
          <span className="font-medium">Create</span>
          <IoSparklesSharp className="w-5 h-5 ml-2 mt-[2px]" />
        </button>

        <button className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg sm:hidden">
          <Filter className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="relative w-full">
        <Search className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search prompts..."
          className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#26f4a8]"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
      </div>

      <button className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg hidden sm:block">
        <Filter className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  )

  if (!selectedPlatform && !selectedPrompt && !showCreateForm) {
    return (
      <div className="container mx-auto md:px-4 sm:px-6">
        <ToastContainer className={"z-50"} rtl />
        <div className="flex flex-col gap-4 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold">Select a Platform</h2>
          <div className="w-full">
            <SearchBar />
          </div>
        </div>

        <div className="flex justify-center items-center mt-[12%]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {platforms.map((platform) => (
              <div
                key={platform.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer flex flex-col items-center"
                onClick={() => handleSelectPlatform(platform.id)}
              >
                <div className="text-4xl mb-4">
                  <img
                    className="max-h-12"
                    src={platform.icon || "/placeholder.svg?height=48&width=48"}
                    alt={platform.name}
                  />
                </div>
                <h3 className="font-bold text-lg">{platform.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (selectedPlatform && !selectedPrompt && !showCreateForm) {
    return (
      <div className="container mx-auto px-4 sm:px-6">
        <ToastContainer rtl />
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex gap-2 items-center">
            <button onClick={handleGoBack} className="text-gray-600 hover:text-gray-800 mr-3">
              <ArrowLeft className="w-5 h-5 mt-[2px]" />
            </button>
            <h2 onClick={handleGoBack} className="text-xl cursor-pointer text-nowrap sm:text-2xl font-bold">
              {platforms.find((p) => p.id === selectedPlatform)?.name} Prompts
            </h2>
          </div>
          <SearchBar />
        </div>

        {filteredPrompts.length > 0 && (
          <CategoryFilter
            categories={getUniqueCategories(prompts)}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategoryChange}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrompts.length > 0 ? (
            filteredPrompts.map((prompt) => (
              <div
                key={prompt.id}
                className={`bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow relative ${
                  prompt.subscriptionRequired ? "" : "cursor-pointer"
                }`}
                onClick={() => handlePromptClick(prompt)}
              >
                {prompt.subscriptionRequired && (
                  <div className="absolute top-0 right-0 bg-yellow-500 text-white text-xs px-2 py-1 rounded-bl-lg rounded-tr-lg">
                    {prompt.subscriptionRequired.charAt(0).toUpperCase() + prompt.subscriptionRequired.slice(1)}
                  </div>
                )}

                <div className="">
                  <button
                    className={`text-gray-400 hover:text-red-500 ${favorites.includes(prompt.id) ? "text-red-500" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(prompt.id)
                    }}
                  >
                    <Heart className="w-5 h-5" fill={favorites.includes(prompt.id) ? "red" : "none"} />
                  </button>
                </div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg flex gap-1 items-center">
                    {prompt.title}
                    {prompt.subscriptionRequired && <Lock className="w-4 h-4 ml-2 text-yellow-500" />}
                  </h3>
                  <span className="bg-green-100 text-black text-xs px-2 py-1 rounded-full mt-1 ml-2">
                    {prompt.category}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">
                  {prompt.description.length > 80 ? prompt.description.substring(0, 80) + "..." : prompt.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{prompt.platform}</span>
                  <button
                    className={`text-[#26f4a8] hover:text-green-400 ${prompt.subscriptionRequired ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      if (!prompt.subscriptionRequired) {
                        navigator.clipboard.writeText(prompt.code)
                        toast.success("The prompt has been copied to your clipboard.", {
                          position: "top-right",
                          autoClose: 3000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                        })
                      } else {
                        toast.error(`This prompt requires a ${prompt.subscriptionRequired} subscription to access.`, {
                          position: "top-right",
                          autoClose: 3000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                        })
                      }
                    }}
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-gray-500 text-lg">No prompts found for this platform. Try creating a new one!</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (showCreateForm) {
    return (
      <div className="container mx-auto px-4 sm:px-6">
        <ToastContainer rtl />
        <button
          onClick={handleGoBack}
          className="flex items-center cursor-pointer text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to prompts
        </button>

        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-6">Create New Prompt</h2>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Describe what you need</label>
            <textarea
              value={newPromptDescription}
              onChange={(e) => setNewPromptDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#26f4a8]"
              placeholder="Describe the type of prompt you want to create..."
              rows={5}
            />
          </div>

          <button
            onClick={handleCreatePrompt}
            className="bg-[#26f4a8] hover:bg-green-400 text-white px-6 py-2 rounded-lg mb-6"
          >
            Generate Prompt
          </button>

          {generatedPrompt && (
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-3">Generated Prompt</h3>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 overflow-x-auto">
                <pre className="whitespace-pre-wrap">{generatedPrompt}</pre>
              </div>

              {userCreatedPrompts.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold text-lg mb-3">Your Previous Prompts</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userCreatedPrompts.map((prompt) => (
                      <div key={prompt.id} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <h4 className="font-medium">{prompt.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{prompt.description}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-gray-500">
                            {new Date(prompt.dateCreated).toLocaleDateString()}
                          </span>
                          <span className="bg-green-100 text-xs px-2 py-1 rounded-full">{prompt.platform}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                className="mt-4 bg-[#26f4a8] hover:bg-green-400 text-white px-6 py-2 rounded-lg"
                onClick={handleSavePrompt}
              >
                Save Prompt
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (selectedPrompt) {
    if (selectedPrompt.platform === "ChatGPT" || selectedPrompt.platform === "Claude") {
      return (
        <div className="container mx-auto px-4 sm:px-6">
          <ToastContainer rtl />
          <button
            onClick={handleGoBack}
            className="flex items-center cursor-pointer text-gray-600 hover:text-gray-800 mb-6"
          >
            <ArrowLeft className="w-5 h-5 cursor-pointer mr-2" />
            Back to prompts
          </button>

          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-0">{selectedPrompt.title}</h2>
              <div className="flex gap-2 items-center">
                <span className="bg-green-100 text-black text-xs px-2 py-1 rounded-full mr-2">
                  {selectedPrompt.category}
                </span>
                
              </div>
            </div>

            <p className="text-gray-600 mb-6">{selectedPrompt.description}</p>

            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-3">Customize Prompt</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {selectedPrompt.inputs.map((input) => (
                  <div key={input.id} className="mb-4">
                    <label className="block text-gray-700 mb-2">{input.label}</label>
                    {input.type === "select" ? (
                      <select
                        value={userInputs[input.id] || ""}
                        onChange={(e) => handleInputChange(input.id, e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#26f4a8]"
                      >
                        <option value="">Select {input.label}</option>
                        {input.options?.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={input.type}
                        value={userInputs[input.id] || ""}
                        onChange={(e) => handleInputChange(input.id, e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#26f4a8]"
                        placeholder={`Example: ${input.example}`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                <h3 className="font-semibold text-lg mb-2 sm:mb-0">Generated Prompt</h3>
                <div className="flex gap-2 items-center">
                  <span className="mr-2 text-sm text-gray-500">{selectedPrompt.platform}</span>
                  <button
                    className="text-[#26f4a8] hover:bg-green-400 flex items-center mr-2"
                    onClick={() => {
                      navigator.clipboard.writeText(getFormattedPromptCode())
                      toast.success("The prompt has been copied to your clipboard.", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                      })
                    }}
                  >
                    <Copy className="w-5 h-5 mr-1" />
                    Copy
                  </button>
                  <button
                    className="bg-[#26f4a8] hover:bg-green-400 text-white px-3 py-1 rounded-lg flex items-center"
                    onClick={handleSavePrompt}
                  >
                    <Star className="w-4 h-4 mr-1" />
                    Save
                  </button>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 overflow-x-auto">
                <pre className="whitespace-pre-wrap">{getFormattedPromptCode()}</pre>
              </div>
            </div>
          </div>
        </div>
      )
    } else if (selectedPrompt.platform === "MidJourney") {
      return (
        <div className="container mx-auto px-4 sm:px-6">
          <ToastContainer rtl />
          <button
            onClick={handleGoBack}
            className="flex items-center cursor-pointer text-gray-600 hover:text-gray-800 mb-6"
          >
            <ArrowLeft className="w-5 h-5 cursor-pointer mr-2" />
            Back to prompts
          </button>

          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-0">{selectedPrompt.title}</h2>
              <div className="flex gap-2 items-center">
                <span className="bg-green-100 text-black text-xs px-2 py-1 rounded-full mr-2">
                  {selectedPrompt.category}
                </span>
                
              </div>
            </div>

            <p className="text-gray-600 mb-6">{selectedPrompt.description}</p>

            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-3">Customize Prompt</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {selectedPrompt.inputs.map((input) => (
                  <div key={input.id} className="mb-4">
                    <label className="block text-gray-700 mb-2">{input.label}</label>
                    {input.type === "select" ? (
                      <select
                        value={userInputs[input.id] || ""}
                        onChange={(e) => handleInputChange(input.id, e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#26f4a8]"
                      >
                        <option value="">Select {input.label}</option>
                        {input.options?.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={input.type}
                        value={userInputs[input.id] || ""}
                        onChange={(e) => handleInputChange(input.id, e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#26f4a8]"
                        placeholder={`Example: ${input.example}`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {userInputs.style && (
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-3">Style Preview</h3>
                <div className="bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src="/placeholder.svg?height=400&width=600"
                    alt={`${userInputs.style} style example`}
                    className="w-full object-cover"
                  />
                  <div className="p-3 text-center text-gray-700">Sample {userInputs.style} style image</div>
                </div>
              </div>
            )}

            <div className="mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                <h3 className="font-semibold text-lg mb-2 sm:mb-0">Generated Prompt</h3>
                <div className="flex gap-2 items-center">
                  <span className="mr-2 text-sm text-gray-500">{selectedPrompt.platform}</span>
                  <button
                    className="text-[#26f4a8] hover:bg-green-400 flex items-center mr-2"
                    onClick={() => {
                      navigator.clipboard.writeText(getFormattedPromptCode())
                      toast.success("The prompt has been copied to your clipboard.", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                      })
                    }}
                  >
                    <Copy className="w-5 h-5 mr-1" />
                    Copy
                  </button>
                  <button
                    className="bg-[#26f4a8] hover:bg-green-400 text-white px-3 py-1 rounded-lg flex items-center"
                    onClick={handleSavePrompt}
                  >
                    <Star className="w-4 h-4 mr-1" />
                    Save
                  </button>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 overflow-x-auto">
                <pre className="whitespace-pre-wrap">{getFormattedPromptCode()}</pre>
              </div>
            </div>
          </div>
        </div>
      )
    } else if (selectedPrompt.platform === "Gemini") {
      return (
        <div className="container mx-auto px-4 sm:px-6">
          <ToastContainer className={"z-50"} rtl />
          <button
            onClick={handleGoBack}
            className="flex items-center cursor-pointer text-gray-600 hover:text-gray-800 mb-6"
          >
            <ArrowLeft className="w-5 h-5 cursor-pointer mr-2" />
            Back to prompts
          </button>

          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-0">{selectedPrompt.title}</h2>
              <div className="flex gap-2 items-center">
                <span className="bg-green-100 text-black text-xs px-2 py-1 rounded-full mr-2">
                  {selectedPrompt.category}
                </span>
              </div>
            </div>

            <p className="text-gray-600 mb-6">{selectedPrompt.description}</p>

            <div className="mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                <h3 className="font-semibold text-lg mb-2 sm:mb-0">Generated Prompt</h3>
                <div className="flex gap-2 items-center">
                  <span className="mr-2 text-sm text-gray-500">{selectedPrompt.platform}</span>
                  <button
                    className="text-[#26f4a8] hover:bg-green-400 flex items-center mr-2"
                    onClick={() => {
                      navigator.clipboard.writeText(selectedPrompt.code)
                      toast.success("The prompt has been copied to your clipboard.", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                      })
                    }}
                  >
                    <Copy className="w-5 h-5 mr-1" />
                    Copy
                  </button>
                  <button
                    className="bg-[#26f4a8] hover:bg-green-400 text-white px-3 py-1 rounded-lg flex items-center"
                    onClick={handleSavePrompt}
                  >
                    <Star className="w-4 h-4 mr-1" />
                    Save
                  </button>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 overflow-x-auto">
                <pre className="whitespace-pre-wrap">{selectedPrompt.code}</pre>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  return null
}

export default Prompts
