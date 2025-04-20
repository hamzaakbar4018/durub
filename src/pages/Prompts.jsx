// "use client"

// import { useState, useEffect } from "react"
// import { Search, Filter, Copy, ArrowLeft, Heart, Star, Lock } from "lucide-react"
// import { IoSparklesSharp } from "react-icons/io5"
// import { toast, ToastContainer } from "react-toastify"
// import "react-toastify/dist/ReactToastify.css"
// import CategoryFilter from "../components/CategoryFilter"
// import chatgpt from "../assets/chatgpt.png"
// import gemini from "../assets/gemini.png"
// import midhourney from "../assets/midjourney.png"
// import claude from "../assets/claude.png"
// import { useNavigate, useLocation } from "react-router-dom"
// import { BiLike } from "react-icons/bi"

// // Category color mapping
// const categoryColors = {
//   Business: { bg: "#E3F2FD", text: "#1565C0" },
//   Marketing: { bg: "#E8F5E9", text: "#2E7D32" },
//   SEO: { bg: "#FFF3E0", text: "#E65100" },
//   Content: { bg: "#F3E5F5", text: "#7B1FA2" },
//   "E-commerce": { bg: "#FFEBEE", text: "#C62828" },
//   Email: { bg: "#E0F7FA", text: "#00838F" },
//   Art: { bg: "#F9FBE7", text: "#827717" },
//   Analytics: { bg: "#EFEBE9", text: "#4E342E" },
//   Custom: { bg: "#E8EAF6", text: "#3949AB" },
//   // Default color for any new categories
//   default: { bg: "#F5F5F5", text: "#616161" },
// }

// // Function to get category color or default if not found
// const getCategoryColor = (category) => {
//   return categoryColors[category] || categoryColors.default
// }

// const Prompts = () => {
//   const navigate = useNavigate()
//   const location = useLocation()
//   const searchParams = new URLSearchParams(location.search)

//   const [selectedPrompt, setSelectedPrompt] = useState(null)
//   const [showCreateForm, setShowCreateForm] = useState(false)
//   const [userInputs, setUserInputs] = useState({})
//   const [newPromptDescription, setNewPromptDescription] = useState("")
//   const [generatedPrompt, setGeneratedPrompt] = useState("")
//   const [isCreateButtonHovered, setIsCreateButtonHovered] = useState(false)
//   const [selectedPlatform, setSelectedPlatform] = useState(null)
//   const [favorites, setFavorites] = useState([])
//   const [searchQuery, setSearchQuery] = useState("")
//   const [selectedCategory, setSelectedCategory] = useState("all")
//   const [userCreatedPrompts, setUserCreatedPrompts] = useState([])

//   // Read state from URL on component mount and when URL changes
//   useEffect(() => {
//     const platform = searchParams.get("platform")
//     const promptId = searchParams.get("promptId")
//     const form = searchParams.get("form") === "create"

//     if (platform) {
//       setSelectedPlatform(platform)
//     }

//     if (form) {
//       setShowCreateForm(true)
//       setSelectedPrompt(null)
//     } else if (promptId) {
//       const prompt = allPrompts.find((p) => p.id.toString() === promptId)
//       if (prompt) {
//         setSelectedPrompt(prompt)
//         setShowCreateForm(false)

//         // Initialize inputs for the selected prompt
//         const initialInputs = {}
//         prompt.inputs.forEach((input) => {
//           const preferenceValue = userPreferences[input.id]
//           initialInputs[input.id] = preferenceValue || ""
//         })
//         setUserInputs(initialInputs)
//       }
//     } else if (!platform) {
//       setSelectedPlatform(null)
//       setSelectedPrompt(null)
//       setShowCreateForm(false)
//     } else {
//       setSelectedPrompt(null)
//       setShowCreateForm(false)
//     }
//   }, [location.search])

//   // Function to update URL with current state
//   const updateURL = (params) => {
//     const urlParams = new URLSearchParams(location.search)

//     // Update or remove parameters
//     if (params.platform) {
//       urlParams.set("platform", params.platform)
//     } else {
//       urlParams.delete("platform")
//     }

//     if (params.promptId) {
//       urlParams.set("promptId", params.promptId)
//     } else {
//       urlParams.delete("promptId")
//     }

//     if (params.form) {
//       urlParams.set("form", params.form)
//     } else {
//       urlParams.delete("form")
//     }

//     // Update the URL without refreshing the page
//     navigate(`${location.pathname}?${urlParams.toString()}`, { replace: true })
//   }

//   // Modified handlers to update URL
//   const handleSelectPlatform = (platform) => {
//     setSelectedPlatform(platform)
//     setSelectedCategory("all")
//     updateURL({ platform, promptId: null, form: null })
//   }

//   const handlePromptClick = (prompt) => {
//     if (prompt.subscriptionRequired === null) {
//       setSelectedPrompt(prompt)
//       const initialInputs = {}
//       prompt.inputs.forEach((input) => {
//         const preferenceValue = userPreferences[input.id]
//         initialInputs[input.id] = preferenceValue || ""
//       })
//       setUserInputs(initialInputs)
//       updateURL({ platform: selectedPlatform, promptId: prompt.id.toString(), form: null })
//     } else {
//       toast.error(`This prompt requires a ${prompt.subscriptionRequired} subscription to access.`, {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       })
//     }
//   }

//   const handleShowCreateForm = () => {
//     setShowCreateForm(true)
//     updateURL({ platform: selectedPlatform, promptId: null, form: "create" })
//   }

//   const handleGoBack = () => {
//     if (selectedPrompt) {
//       setSelectedPrompt(null)
//       updateURL({ platform: selectedPlatform, promptId: null, form: null })
//     } else if (showCreateForm) {
//       setShowCreateForm(false)
//       updateURL({ platform: selectedPlatform, promptId: null, form: null })
//     } else if (selectedPlatform) {
//       setSelectedPlatform(null)
//       setSelectedCategory("all")
//       updateURL({ platform: null, promptId: null, form: null })
//     }
//   }

//   const platforms = [
//     { id: "chatgpt", name: "ChatGPT", icon: chatgpt },
//     { id: "claude", name: "Claude", icon: claude },
//     { id: "midjourney", name: "MidJourney", icon: midhourney },
//     { id: "gemini", name: "Gemini", icon: gemini },
//   ]

//   const designStyles = [
//     { id: "realistic", name: "Realistic" },
//     { id: "cartoon", name: "Cartoon" },
//     { id: "abstract", name: "Abstract" },
//     { id: "minimalist", name: "Minimalist" },
//     { id: "cyberpunk", name: "Cyberpunk" },
//   ]

//   const userPreferences = {
//     projectName: "Durub AlRiyada",
//     branchCount: "3",
//     businessName: "Fitness Center",
//     newsletterTopic: "Health Tips",
//     productName: "FitTrack Pro",
//     targetMarket: "Saudi Arabia",
//   }

//   useEffect(() => {
//     setUserCreatedPrompts([
//       {
//         id: 101,
//         title: "My Custom Marketing Plan",
//         description: "A personalized marketing strategy for my business",
//         category: "Marketing",
//         platform: "ChatGPT",
//         dateCreated: new Date().toISOString(),
//         prompt: "Create a marketing plan for a fitness center focusing on social media and local advertising...",
//       },
//       {
//         id: 102,
//         title: "Product Launch Email",
//         description: "Email template for new product announcements",
//         category: "Email",
//         platform: "Claude",
//         dateCreated: new Date(Date.now() - 86400000).toISOString(),
//         prompt: "Write an email announcing the launch of our new fitness tracking app...",
//       },
//     ])
//   }, [])

//   const allPrompts = [
//     {
//       id: 1,
//       title: "Business Plan Generator",
//       description:
//         "Create a comprehensive business plan for your startup with financial projections and detailed market analysis, along with implementation strategies and risk assessment.",
//       category: "Business",
//       platform: "ChatGPT",
//       code: "I want you to create a detailed business plan for a {projectName} with {branchCount} branches. Include the following sections: Executive Summary, Company Description, Market Analysis, Organization & Management, Service/Product Line, Marketing & Sales, Financial Projections for 3 years, and Funding Request if applicable.",
//       inputs: [
//         { id: "projectName", label: "Project Name", example: "Durub AlRiyada", type: "text" },
//         { id: "branchCount", label: "Number of Branches", example: "3", type: "number" },
//       ],
//       subscriptionRequired: "premium",
//     },
//     {
//       id: 2,
//       title: "Marketing Strategy",
//       description: "Generate a complete marketing strategy for your product launch",
//       category: "Marketing",
//       platform: "ChatGPT",
//       code: "Create a comprehensive marketing strategy for launching {productName} in the {targetMarket} market. Include digital marketing tactics, content strategy, and budget allocation.",
//       inputs: [
//         { id: "productName", label: "Product Name", example: "FitTrack Pro", type: "text" },
//         { id: "targetMarket", label: "Target Market", example: "Saudi Arabia", type: "text" },
//       ],
//       subscriptionRequired: null,
//     },
//     {
//       id: 3,
//       title: "SEO Keyword Research",
//       description: "Find the best keywords for your website to improve search ranking",
//       category: "SEO",
//       platform: "Claude",
//       code: "Perform keyword research for a {industryType} website focused on {topicFocus}. Identify primary keywords, long-tail variations, and include search volume estimates and competition level.",
//       inputs: [
//         { id: "industryType", label: "Industry Type", example: "Fitness", type: "text" },
//         { id: "topicFocus", label: "Topic Focus", example: "Home Workouts", type: "text" },
//       ],
//       subscriptionRequired: null,
//     },
//     {
//       id: 4,
//       title: "Content Calendar",
//       description: "Create a monthly content calendar for your social media platforms",
//       category: "Content",
//       platform: "Claude",
//       code: "Create a {duration} content calendar for {platformName} focusing on {contentTheme}. Include post types, posting frequency, and content themes.",
//       inputs: [
//         { id: "duration", label: "Duration (e.g., 1 month)", example: "3 months", type: "text" },
//         { id: "platformName", label: "Platform Name", example: "Instagram", type: "text" },
//         { id: "contentTheme", label: "Content Theme", example: "Fitness Tips", type: "text" },
//       ],
//       subscriptionRequired: "premium",
//     },
//     {
//       id: 5,
//       title: "Product Description",
//       description: "Generate compelling product descriptions for your e-commerce store",
//       category: "E-commerce",
//       platform: "Gemini",
//       code: "Write a compelling product description for AirFlex Mat, a Yoga Mat priced at 199 SAR. Focus on benefits, features, and include a call to action.",
//       inputs: [],
//       subscriptionRequired: null,
//     },
//     {
//       id: 6,
//       title: "Email Newsletter",
//       description: "Create engaging email newsletters to connect with your audience",
//       category: "Email",
//       platform: "ChatGPT",
//       code: "Write an email newsletter for {businessName} focusing on {newsletterTopic}. Include an engaging subject line, introduction, main content sections, and a clear call to action.",
//       inputs: [
//         { id: "businessName", label: "Business Name", example: "Durub AlRiyada", type: "text" },
//         { id: "newsletterTopic", label: "Newsletter Topic", example: "Monthly Fitness Challenge", type: "text" },
//       ],
//       subscriptionRequired: "basic",
//     },
//     {
//       id: 7,
//       title: "Futuristic City Scene",
//       description: "Generate a detailed image prompt for a futuristic cityscape",
//       category: "Art",
//       platform: "MidJourney",
//       code: "A futuristic cityscape with tall skyscrapers, flying vehicles, holographic advertisements, in {style} style, detailed lighting, 8k resolution",
//       inputs: [
//         {
//           id: "style",
//           label: "Art Style",
//           example: "Cyberpunk",
//           type: "select",
//           options: designStyles.map((style) => style.name),
//         },
//       ],
//       subscriptionRequired: "premium",
//     },
//     {
//       id: 8,
//       title: "Fantasy Character",
//       description: "Create a detailed fantasy character concept art prompt",
//       category: "Art",
//       platform: "MidJourney",
//       code: "Fantasy character portrait, {race} {profession}, intricate armor, {style} style, detailed face, magical effects, dramatic lighting, 4k resolution",
//       inputs: [
//         { id: "race", label: "Character Race", example: "Elf", type: "text" },
//         { id: "profession", label: "Character Class", example: "Warrior", type: "text" },
//         {
//           id: "style",
//           label: "Art Style",
//           example: "Realistic",
//           type: "select",
//           options: designStyles.map((style) => style.name),
//         },
//       ],
//       subscriptionRequired: "premium",
//     },
//     {
//       id: 9,
//       title: "Data Analysis Report",
//       description: "Generate a comprehensive data analysis report",
//       category: "Analytics",
//       platform: "Gemini",
//       code: "Create a comprehensive data analysis report for quarterly sales data, including trend analysis, key insights, and visual representation recommendations.",
//       inputs: [],
//       subscriptionRequired: null,
//     },
//   ]

//   const prompts = selectedPlatform
//     ? allPrompts.filter((prompt) => prompt.platform.toLowerCase() === selectedPlatform.toLowerCase())
//     : allPrompts

//   const getUniqueCategories = (platformPrompts) => {
//     const categories = new Set(platformPrompts.map((prompt) => prompt.category))
//     return ["all", ...Array.from(categories)]
//   }

//   const filteredPrompts =
//     searchQuery || selectedCategory !== "all"
//       ? prompts.filter((prompt) => {
//           const matchesSearch =
//             searchQuery === "" ||
//             prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             prompt.category.toLowerCase().includes(searchQuery.toLowerCase())

//           const matchesCategory = selectedCategory === "all" || prompt.category === selectedCategory

//           return matchesSearch && matchesCategory
//         })
//       : prompts

//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category)
//   }

//   const handleInputChange = (inputId, value) => {
//     setUserInputs({
//       ...userInputs,
//       [inputId]: value,
//     })
//   }

//   const getFormattedPromptCode = () => {
//     if (!selectedPrompt) return ""

//     let formattedCode = selectedPrompt.code
//     Object.keys(userInputs).forEach((key) => {
//       const value = userInputs[key] || `[${key}]`
//       formattedCode = formattedCode.replace(`{${key}}`, value)
//     })

//     return formattedCode
//   }

//   const handleCreatePrompt = () => {
//     setGeneratedPrompt(
//       `Generated prompt based on: "${newPromptDescription}"\n\nThis is where the AI-generated prompt would appear. In a real implementation, this would call an API to generate the prompt using ChatGPT.`,
//     )
//   }

//   const toggleFavorite = (promptId) => {
//     if (favorites.includes(promptId)) {
//       setFavorites(favorites.filter((id) => id !== promptId))
//       toast.info("The prompt has been removed from your favorites.", {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       })
//     } else {
//       setFavorites([...favorites, promptId])
//       toast.success("The prompt has been added to your favorites.", {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       })
//     }
//   }

//   const handleSavePrompt = () => {
//     toast.success("The prompt has been saved to your profile.", {
//       position: "top-right",
//       autoClose: 3000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//     })

//     const newPrompt = {
//       id: Date.now(),
//       title: "New Custom Prompt",
//       description: newPromptDescription.substring(0, 100) + (newPromptDescription.length > 100 ? "..." : ""),
//       category: "Custom",
//       platform: selectedPlatform || "ChatGPT",
//       dateCreated: new Date().toISOString(),
//       prompt: generatedPrompt,
//     }

//     setUserCreatedPrompts([newPrompt, ...userCreatedPrompts])
//     setShowCreateForm(false)
//     updateURL({ platform: selectedPlatform, promptId: null, form: null })
//   }

//   const SearchBar = () => (
//     <div className="flex flex-col sm:flex-row gap-4 w-full">
//       <div className="flex gap-4 w-full sm:w-auto">
//         <button
//           className="relative bg-[#26f4a8] hover:bg-green-400 text-white px-4 py-2 rounded-lg flex items-center"
//           onClick={handleShowCreateForm}
//         >
//           <span className="font-medium">Create</span>
//           <IoSparklesSharp className="w-5 h-5 ml-2 mt-[2px]" />
//         </button>

//         <button className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg sm:hidden">
//           <Filter className="w-5 h-5 text-gray-600" />
//         </button>
//       </div>

//       <div className="relative w-full">
//         <Search className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
//         <input
//           type="text"
//           placeholder="Search prompts..."
//           className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#26f4a8]"
//           onChange={(e) => setSearchQuery(e.target.value)}
//           value={searchQuery}
//         />
//       </div>

//       <button className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg hidden sm:block">
//         <Filter className="w-5 h-5 text-gray-600" />
//       </button>
//     </div>
//   )

//   // Category Badge component with dynamic colors
//   const CategoryBadge = ({ category }) => {
//     const colorStyle = getCategoryColor(category)
//     return (
//       <span
//         className="text-xs px-2 py-1 rounded-full"
//         style={{
//           backgroundColor: colorStyle.bg,
//           color: colorStyle.text,
//         }}
//       >
//         {category}
//       </span>
//     )
//   }

//   if (!selectedPlatform && !selectedPrompt && !showCreateForm) {
//     return (
//       <div className="container mx-auto md:px-4 sm:px-6">
//         <ToastContainer className={"z-50"} rtl />
//         <div className="flex flex-col gap-4 mb-6">
//           <h2 className="text-xl sm:text-2xl font-bold">Select a Platform</h2>
//           <div className="w-full">
//             <SearchBar />
//           </div>
//         </div>

//         <div className="flex justify-center items-center mt-[12%]">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
//             {platforms.map((platform) => (
//               <div
//                 key={platform.id}
//                 className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer flex flex-col items-center"
//                 onClick={() => handleSelectPlatform(platform.id)}
//               >
//                 <div className="text-4xl mb-4">
//                   <img
//                     className="max-h-12"
//                     src={platform.icon || "/placeholder.svg?height=48&width=48"}
//                     alt={platform.name}
//                   />
//                 </div>
//                 <h3 className="font-bold text-lg">{platform.name}</h3>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     )
//   }

//   if (selectedPlatform && !selectedPrompt && !showCreateForm) {
//     return (
//       <div className={`container mx-auto px-4 sm:px-6 `}>
//         <ToastContainer rtl className={"z-50"} />
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//           <div className="flex gap-2 items-center">
//             <button onClick={handleGoBack} className="text-gray-600 hover:text-gray-800 mr-3">
//               <ArrowLeft className="w-5 h-5 mt-[2px]" />
//             </button>
//             <h2 onClick={handleGoBack} className="text-xl cursor-pointer text-nowrap sm:text-2xl font-bold">
//               {platforms.find((p) => p.id === selectedPlatform)?.name} Prompts [{filteredPrompts.length}]
//             </h2>
//           </div>
//           <SearchBar />
//         </div>

//         {filteredPrompts.length > 0 && (
//           <CategoryFilter
//             categories={getUniqueCategories(prompts)}
//             selectedCategory={selectedCategory}
//             onSelectCategory={handleCategoryChange}
//             categoryColors={categoryColors}
//           />
//         )}

//         <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 }`}>
//           {filteredPrompts.length > 0 ? (
//             filteredPrompts.map((prompt) => (
//               <div
//                 key={prompt.id}
//                 className={`bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow relative ${
//                   prompt.subscriptionRequired ? "" : "cursor-pointer"
//                 }`}
//                 onClick={() => handlePromptClick(prompt)}
//               >
//                 {prompt.subscriptionRequired && (
//                   <div className="absolute top-0 left-0 bg-yellow-500 text-white text-xs px-2 py-1 rounded-br-lg rounded-tl-lg">
//                     {prompt.subscriptionRequired.charAt(0).toUpperCase() + prompt.subscriptionRequired.slice(1)}
//                   </div>
//                 )}

//                 <div className="">
//                   <button
//                     className={`text-gray-400 hover:text-red-500 ${favorites.includes(prompt.id) ? "text-red-500" : ""}`}
//                     onClick={(e) => {
//                       e.stopPropagation()
//                       toggleFavorite(prompt.id)
//                     }}
//                   >
//                     <Heart className="w-5 h-5" fill={favorites.includes(prompt.id) ? "red" : "none"} />
//                   </button>
//                 </div>
//                 <div className="flex justify-between items-start mb-2">
//                   <h3 className="font-bold text-lg flex gap-1 items-center">
//                     {prompt.title}
//                     {prompt.subscriptionRequired && <Lock className="w-4 h-4 ml-2 text-yellow-500" />}
//                   </h3>
//                   <CategoryBadge category={prompt.category} />
//                 </div>
//                 <p className="text-gray-600 mb-4">
//                   {prompt.description.length > 80 ? prompt.description.substring(0, 80) + "..." : prompt.description}
//                 </p>
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm text-gray-500">{prompt.platform}</span>
//                   <button
//                     className={`text-[#26f4a8] hover:text-green-400 ${prompt.subscriptionRequired ? "opacity-50 cursor-not-allowed" : ""}`}
//                     onClick={(e) => {
//                       e.stopPropagation()
//                       if (!prompt.subscriptionRequired) {
//                         navigator.clipboard.writeText(prompt.code)
//                         toast.success("The prompt has been copied to your clipboard.", {
//                           position: "top-right",
//                           autoClose: 3000,
//                           hideProgressBar: false,
//                           closeOnClick: true,
//                           pauseOnHover: true,
//                           draggable: true,
//                         })
//                       } else {
//                         toast.error(`This prompt requires a ${prompt.subscriptionRequired} subscription to access.`, {
//                           position: "top-right",
//                           autoClose: 3000,
//                           hideProgressBar: false,
//                           closeOnClick: true,
//                           pauseOnHover: true,
//                           draggable: true,
//                         })
//                       }
//                     }}
//                   >
//                     <Copy className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="col-span-3 text-center py-12">
//               <p className="text-gray-500 text-lg">No prompts found for this platform. Try creating a new one!</p>
//             </div>
//           )}
//         </div>
//       </div>
//     )
//   }

//   if (showCreateForm) {
//     return (
//       <div className="container mx-auto px-4 sm:px-6">
//         <ToastContainer rtl />
//         <button
//           onClick={handleGoBack}
//           className="flex items-center cursor-pointer text-gray-600 hover:text-gray-800 mb-6"
//         >
//           <ArrowLeft className="w-5 h-5 mr-2" />
//           Back to prompts
//         </button>

//         <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
//           <h2 className="text-xl sm:text-2xl font-bold mb-6">Create New Prompt</h2>

//           <div className="mb-6">
//             <label className="block text-gray-700 mb-2">Describe what you need</label>
//             <textarea
//               value={newPromptDescription}
//               onChange={(e) => setNewPromptDescription(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#26f4a8]"
//               placeholder="Describe the type of prompt you want to create..."
//               rows={5}
//             />
//           </div>

//           <button
//             onClick={handleCreatePrompt}
//             className="bg-[#26f4a8] hover:bg-green-400 text-white px-6 py-2 rounded-lg mb-6"
//           >
//             Generate Prompt
//           </button>

//           {generatedPrompt && (
//             <div className="mb-6">
//               <h3 className="font-semibold text-lg mb-3">Generated Prompt</h3>
//               <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 overflow-x-auto">
//                 <pre className="whitespace-pre-wrap">{generatedPrompt}</pre>
//               </div>

//               {userCreatedPrompts.length > 0 && (
//                 <div className="mt-6">
//                   <h3 className="font-semibold text-lg mb-3">Your Previous Prompts</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {userCreatedPrompts.map((prompt) => (
//                       <div key={prompt.id} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
//                         <div className="flex justify-between items-start">
//                           <h4 className="font-medium">{prompt.title}</h4>
//                           <CategoryBadge category={prompt.category} />
//                         </div>
//                         <p className="text-sm text-gray-600 mt-1">{prompt.description}</p>
//                         <div className="flex justify-between items-center mt-2">
//                           <span className="text-xs text-gray-500">
//                             {new Date(prompt.dateCreated).toLocaleDateString()}
//                           </span>
//                           <span className="text-xs text-gray-600">{prompt.platform}</span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               <button
//                 className="mt-4 bg-[#26f4a8] hover:bg-green-400 text-white px-6 py-2 rounded-lg"
//                 onClick={handleSavePrompt}
//               >
//                 Save Prompt
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     )
//   }

//   if (selectedPrompt) {
//     if (selectedPrompt.platform === "ChatGPT" || selectedPrompt.platform === "Claude") {
//       return (
//         <div className="container mx-auto px-4 sm:px-6">
//           <ToastContainer rtl />
//           <button
//             onClick={handleGoBack}
//             className="flex items-center cursor-pointer text-gray-600 hover:text-gray-800 mb-6"
//           >
//             <ArrowLeft className="w-5 h-5 cursor-pointer mr-2" />
//             Back to prompts
//           </button>

         
//           <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
//               <div className="flex items-center gap-2">
//                 <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-0">{selectedPrompt.title}</h2>
//                 <button
//                   onClick={(e)=>{
//                   }}
//                   className={`text-gray-400 hover:text-red-500 ${favorites.includes(selectedPrompt.id) ? "text-red-500" : ""}`}
//                 >
//                   <BiLike className="w-5 h-5 cursor-pointer" />
//                 </button>
//               </div>
//               <div className="flex gap-2 items-center">
//                 <CategoryBadge category={selectedPrompt.category} />
//               </div>
//             </div>

//             <p className="text-gray-600 mb-6">{selectedPrompt.description}</p>

//             <div className="mb-6">
//               <h3 className="font-semibold text-lg mb-3">Customize Prompt</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                 {selectedPrompt.inputs.map((input) => (
//                   <div key={input.id} className="mb-4">
//                     <label className="block text-gray-700 mb-2">{input.label}</label>
//                     {input.type === "select" ? (
//                       <select
//                         value={userInputs[input.id] || ""}
//                         onChange={(e) => handleInputChange(input.id, e.target.value)}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#26f4a8]"
//                       >
//                         <option value="">Select {input.label}</option>
//                         {input.options?.map((option, index) => (
//                           <option key={index} value={option}>
//                             {option}
//                           </option>
//                         ))}
//                       </select>
//                     ) : (
//                       <input
//                         type={input.type}
//                         value={userInputs[input.id] || ""}
//                         onChange={(e) => handleInputChange(input.id, e.target.value)}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#26f4a8]"
//                         placeholder={`Example: ${input.example}`}
//                       />
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="mb-6">
//               <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
//                 <h3 className="font-semibold text-lg mb-2 sm:mb-0">Generated Prompt</h3>
//                 <div className="flex gap-2 items-center">
//                   <span className="mr-2 text-sm text-gray-500">{selectedPrompt.platform}</span>
//                   <button
//                     className="text-[#26f4a8] hover:bg-green-400 flex items-center mr-2"
//                     onClick={() => {
//                       navigator.clipboard.writeText(getFormattedPromptCode())
//                       toast.success("The prompt has been copied to your clipboard.", {
//                         position: "top-right",
//                         autoClose: 3000,
//                         hideProgressBar: false,
//                         closeOnClick: true,
//                         pauseOnHover: true,
//                         draggable: true,
//                       })
//                     }}
//                   >
//                     <Copy className="w-5 h-5 mr-1" />
//                     Copy
//                   </button>
//                   <button
//                     className="bg-[#26f4a8] hover:bg-green-400 text-white px-3 py-1 rounded-lg flex items-center"
//                     onClick={handleSavePrompt}
//                   >
//                     <Star className="w-4 h-4 mr-1" />
//                     Save
//                   </button>
//                 </div>
//               </div>
//               <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 overflow-x-auto">
//                 <pre className="whitespace-pre-wrap">{getFormattedPromptCode()}</pre>
//               </div>
//             </div>
//           </div>
//         </div>
//       )
//     } else if (selectedPrompt.platform === "MidJourney") {
//       return (
//         <div className="container mx-auto px-4 sm:px-6">
//           <ToastContainer rtl />
//           <button
//             onClick={handleGoBack}
//             className="flex items-center cursor-pointer text-gray-600 hover:text-gray-800 mb-6"
//           >
//             <ArrowLeft className="w-5 h-5 cursor-pointer mr-2" />
//             Back to prompts
//           </button>

//           <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
//               <div className="flex items-center gap-2">
//                 <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-0">{selectedPrompt.title}</h2>
//                 <button
//                   className={`text-gray-400 hover:text-red-500 ${favorites.includes(selectedPrompt.id) ? "text-red-500" : ""}`}
//                   onClick={(e) => {
//                     e.stopPropagation()
//                     // toggleFavorite(selectedPrompt.id)
//                   }}
//                 >
//                   <BiLike className="w-5 h-5 cursor-pointer" />

//                   {/* <Heart className="w-5 h-5" fill={favorites.includes(selectedPrompt.id) ? "red" : "none"} /> */}
//                 </button>
//               </div>
//               <div className="flex gap-2 items-center">
//                 <CategoryBadge category={selectedPrompt.category} />
//               </div>
//             </div>

//             <p className="text-gray-600 mb-6">{selectedPrompt.description}</p>

//             <div className="mb-6">
//               <h3 className="font-semibold text-lg mb-3">Customize Prompt</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                 {selectedPrompt.inputs.map((input) => (
//                   <div key={input.id} className="mb-4">
//                     <label className="block text-gray-700 mb-2">{input.label}</label>
//                     {input.type === "select" ? (
//                       <select
//                         value={userInputs[input.id] || ""}
//                         onChange={(e) => handleInputChange(input.id, e.target.value)}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#26f4a8]"
//                       >
//                         <option value="">Select {input.label}</option>
//                         {input.options?.map((option, index) => (
//                           <option key={index} value={option}>
//                             {option}
//                           </option>
//                         ))}
//                       </select>
//                     ) : (
//                       <input
//                         type={input.type}
//                         value={userInputs[input.id] || ""}
//                         onChange={(e) => handleInputChange(input.id, e.target.value)}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#26f4a8]"
//                         placeholder={`Example: ${input.example}`}
//                       />
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {userInputs.style && (
//               <div className="mb-6">
//                 <h3 className="font-semibold text-lg mb-3">Style Preview</h3>
//                 <div className="bg-gray-100 rounded-lg overflow-hidden">
//                   <img
//                     src="/placeholder.svg?height=400&width=600"
//                     alt={`${userInputs.style} style example`}
//                     className="w-full object-cover"
//                   />
//                   <div className="p-3 text-center text-gray-700">Sample {userInputs.style} style image</div>
//                 </div>
//               </div>
//             )}

//             <div className="mb-6">
//               <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
//                 <h3 className="font-semibold text-lg mb-2 sm:mb-0">Generated Prompt</h3>
//                 <div className="flex gap-2 items-center">
//                   <span className="mr-2 text-sm text-gray-500">{selectedPrompt.platform}</span>
//                   <button
//                     className="text-[#26f4a8] hover:bg-green-400 flex items-center mr-2"
//                     onClick={() => {
//                       navigator.clipboard.writeText(getFormattedPromptCode())
//                       toast.success("The prompt has been copied to your clipboard.", {
//                         position: "top-right",
//                         autoClose: 3000,
//                         hideProgressBar: false,
//                         closeOnClick: true,
//                         pauseOnHover: true,
//                         draggable: true,
//                       })
//                     }}
//                   >
//                     <Copy className="w-5 h-5 mr-1" />
//                     Copy
//                   </button>
//                   <button
//                     className="bg-[#26f4a8] hover:bg-green-400 text-white px-3 py-1 rounded-lg flex items-center"
//                     onClick={handleSavePrompt}
//                   >
//                     <Star className="w-4 h-4 mr-1" />
//                     Save
//                   </button>
//                 </div>
//               </div>
//               <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 overflow-x-auto">
//                 <pre className="whitespace-pre-wrap">{getFormattedPromptCode()}</pre>
//               </div>
//             </div>
//           </div>
//         </div>
//       )
//     } else if (selectedPrompt.platform === "Gemini") {
//       return (
//         <div className="container mx-auto px-4 sm:px-6">
//           <ToastContainer className={"z-50"} rtl />
//           <button
//             onClick={handleGoBack}
//             className="flex items-center cursor-pointer text-gray-600 hover:text-gray-800 mb-6"
//           >
//             <ArrowLeft className="w-5 h-5 cursor-pointer mr-2" />
//             Back to prompts
//           </button>

//           <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
//               <div className="flex items-center gap-2">
//                 <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-0">{selectedPrompt.title}</h2>
//                 <button
//                   className={`text-gray-400 hover:text-red-500 ${favorites.includes(selectedPrompt.id) ? "text-red-500" : ""}`}
//                   onClick={(e) => {
//                     e.stopPropagation()
//                     // toggleFavorite(selectedPrompt.id)
//                   }}
//                 >
//                   <BiLike className="w-5 h-5 cursor-pointer" />

//                   {/* <Heart className="w-5 h-5" fill={favorites.includes(selectedPrompt.id) ? "red" : "none"} /> */}
//                 </button>
//               </div>
//               <div className="flex gap-2 items-center">
//                 <CategoryBadge category={selectedPrompt.category} />
//               </div>
//             </div>

//             <p className="text-gray-600 mb-6">{selectedPrompt.description}</p>

//             <div className="mb-6">
//               <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
//                 <h3 className="font-semibold text-lg mb-2 sm:mb-0">Generated Prompt</h3>
//                 <div className="flex gap-2 items-center">
//                   <span className="mr-2 text-sm text-gray-500">{selectedPrompt.platform}</span>
//                   <button
//                     className="text-[#26f4a8] hover:bg-green-400 flex items-center mr-2"
//                     onClick={() => {
//                       navigator.clipboard.writeText(selectedPrompt.code)
//                       toast.success("The prompt has been copied to your clipboard.", {
//                         position: "top-right",
//                         autoClose: 3000,
//                         hideProgressBar: false,
//                         closeOnClick: true,
//                         pauseOnHover: true,
//                         draggable: true,
//                       })
//                     }}
//                   >
//                     <Copy className="w-5 h-5 mr-1" />
//                     Copy
//                   </button>
//                   <button
//                     className="bg-[#26f4a8] hover:bg-green-400 text-white px-3 py-1 rounded-lg flex items-center"
//                     onClick={handleSavePrompt}
//                   >
//                     <Star className="w-4 h-4 mr-1" />
//                     Save
//                   </button>
//                 </div>
//               </div>
//               <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 overflow-x-auto">
//                 <pre className="whitespace-pre-wrap">{selectedPrompt.code}</pre>
//               </div>
//             </div>
//           </div>
//         </div>
//       )
//     }
//   }

//   return null
// }

// export default Prompts
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
import { BiLike } from "react-icons/bi"

// تعيين ألوان الفئات
const categoryColors = {
  Business: { bg: "#E3F2FD", text: "#1565C0" },
  Marketing: { bg: "#E8F5E9", text: "#2E7D32" },
  SEO: { bg: "#FFF3E0", text: "#E65100" },
  Content: { bg: "#F3E5F5", text: "#7B1FA2" },
  "E-commerce": { bg: "#FFEBEE", text: "#C62828" },
  Email: { bg: "#E0F7FA", text: "#00838F" },
  Art: { bg: "#F9FBE7", text: "#827717" },
  Analytics: { bg: "#EFEBE9", text: "#4E342E" },
  Custom: { bg: "#E8EAF6", text: "#3949AB" },
  // لون افتراضي لأي فئات جديدة
  default: { bg: "#F5F5F5", text: "#616161" },
}

// دالة للحصول على لون الفئة أو اللون الافتراضي إذا لم يتم العثور عليه
const getCategoryColor = (category) => {
  return categoryColors[category] || categoryColors.default
}

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

  // قراءة الحالة من عنوان URL عند تحميل المكون وعند تغيير عنوان URL
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

        // تهيئة المدخلات للنموذج المحدد
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

  // دالة لتحديث عنوان URL بالحالة الحالية
  const updateURL = (params) => {
    const urlParams = new URLSearchParams(location.search)

    // تحديث أو إزالة المعلمات
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

    // تحديث عنوان URL بدون تحديث الصفحة
    navigate(`${location.pathname}?${urlParams.toString()}`, { replace: true })
  }

  // معالجات معدلة لتحديث عنوان URL
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
      toast.error(`هذا النموذج يتطلب اشتراك ${prompt.subscriptionRequired} للوصول إليه.`, {
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
    { id: "realistic", name: "واقعي" },
    { id: "cartoon", name: "كرتوني" },
    { id: "abstract", name: "تجريدي" },
    { id: "minimalist", name: "بسيط" },
    { id: "cyberpunk", name: "سايبربانك" },
  ]

  const userPreferences = {
    projectName: "دروب الرياضة",
    branchCount: "3",
    businessName: "مركز لياقة بدنية",
    newsletterTopic: "نصائح صحية",
    productName: "فيت تراك برو",
    targetMarket: "المملكة العربية السعودية",
  }

  useEffect(() => {
    setUserCreatedPrompts([
      {
        id: 101,
        title: "خطة التسويق المخصصة",
        description: "استراتيجية تسويق مخصصة لعملي",
        category: "Marketing",
        platform: "ChatGPT",
        dateCreated: new Date().toISOString(),
        prompt: "قم بإنشاء خطة تسويق لمركز لياقة بدنية تركز على وسائل التواصل الاجتماعي والإعلانات المحلية...",
      },
      {
        id: 102,
        title: "بريد إلكتروني لإطلاق المنتج",
        description: "قالب بريد إلكتروني لإعلانات المنتجات الجديدة",
        category: "Email",
        platform: "Claude",
        dateCreated: new Date(Date.now() - 86400000).toISOString(),
        prompt: "اكتب بريدًا إلكترونيًا يعلن عن إطلاق تطبيق تتبع اللياقة البدنية الجديد...",
      },
    ])
  }, [])

  const allPrompts = [
    {
      id: 1,
      title: "منشئ خطة العمل",
      description:
        "قم بإنشاء خطة عمل شاملة لشركتك الناشئة مع توقعات مالية وتحليل سوق مفصل، إلى جانب استراتيجيات التنفيذ وتقييم المخاطر.",
      category: "Business",
      platform: "ChatGPT",
      code: "أريد منك إنشاء خطة عمل مفصلة لـ {projectName} مع {branchCount} فروع. قم بتضمين الأقسام التالية: الملخص التنفيذي، وصف الشركة، تحليل السوق، التنظيم والإدارة، خط الخدمة/المنتج، التسويق والمبيعات، التوقعات المالية لمدة 3 سنوات، وطلب التمويل إذا كان ذلك ممكنًا.",
      inputs: [
        { id: "projectName", label: "اسم المشروع", example: "دروب الرياضة", type: "text" },
        { id: "branchCount", label: "عدد الفروع", example: "3", type: "number" },
      ],
      subscriptionRequired: "premium",
    },
    {
      id: 2,
      title: "استراتيجية التسويق",
      description: "قم بإنشاء استراتيجية تسويق كاملة لإطلاق منتجك",
      category: "Marketing",
      platform: "ChatGPT",
      code: "قم بإنشاء استراتيجية تسويق شاملة لإطلاق {productName} في سوق {targetMarket}. قم بتضمين تكتيكات التسويق الرقمي، واستراتيجية المحتوى، وتخصيص الميزانية.",
      inputs: [
        { id: "productName", label: "اسم المنتج", example: "فيت تراك برو", type: "text" },
        { id: "targetMarket", label: "السوق المستهدف", example: "المملكة العربية السعودية", type: "text" },
      ],
      subscriptionRequired: null,
    },
    {
      id: 3,
      title: "بحث كلمات مفتاحية SEO",
      description: "ابحث عن أفضل الكلمات المفتاحية لموقعك لتحسين ترتيب البحث",
      category: "SEO",
      platform: "Claude",
      code: "قم بإجراء بحث عن الكلمات المفتاحية لموقع {industryType} يركز على {topicFocus}. حدد الكلمات المفتاحية الأساسية، والاختلافات طويلة الذيل، وقم بتضمين تقديرات حجم البحث ومستوى المنافسة.",
      inputs: [
        { id: "industryType", label: "نوع الصناعة", example: "اللياقة البدنية", type: "text" },
        { id: "topicFocus", label: "التركيز الموضوعي", example: "تمارين منزلية", type: "text" },
      ],
      subscriptionRequired: null,
    },
    {
      id: 4,
      title: "تقويم المحتوى",
      description: "قم بإنشاء تقويم محتوى شهري لمنصات التواصل الاجتماعي الخاصة بك",
      category: "Content",
      platform: "Claude",
      code: "قم بإنشاء تقويم محتوى لمدة {duration} لـ {platformName} يركز على {contentTheme}. قم بتضمين أنواع المنشورات، وتكرار النشر، ومواضيع المحتوى.",
      inputs: [
        { id: "duration", label: "المدة (مثال: شهر واحد)", example: "3 أشهر", type: "text" },
        { id: "platformName", label: "اسم المنصة", example: "انستغرام", type: "text" },
        { id: "contentTheme", label: "موضوع المحتوى", example: "نصائح اللياقة البدنية", type: "text" },
      ],
      subscriptionRequired: "premium",
    },
    {
      id: 5,
      title: "وصف المنتج",
      description: "قم بإنشاء أوصاف منتجات جذابة لمتجرك الإلكتروني",
      category: "E-commerce",
      platform: "Gemini",
      code: "اكتب وصفًا جذابًا لمنتج AirFlex Mat، وهو سجادة يوغا بسعر 199 ريال سعودي. ركز على الفوائد والميزات، وقم بتضمين دعوة للعمل.",
      inputs: [],
      subscriptionRequired: null,
    },
    {
      id: 6,
      title: "النشرة الإخبارية عبر البريد الإلكتروني",
      description: "قم بإنشاء رسائل إخبارية جذابة عبر البريد الإلكتروني للتواصل مع جمهورك",
      category: "Email",
      platform: "ChatGPT",
      code: "اكتب نشرة إخبارية عبر البريد الإلكتروني لـ {businessName} تركز على {newsletterTopic}. قم بتضمين عنوان جذاب، ومقدمة، وأقسام المحتوى الرئيسية، ودعوة واضحة للعمل.",
      inputs: [
        { id: "businessName", label: "اسم العمل", example: "دروب الرياضة", type: "text" },
        { id: "newsletterTopic", label: "موضوع النشرة الإخبارية", example: "تحدي اللياقة الشهري", type: "text" },
      ],
      subscriptionRequired: "basic",
    },
    {
      id: 7,
      title: "مشهد مدينة مستقبلية",
      description: "قم بإنشاء نص مفصل لصورة مدينة مستقبلية",
      category: "Art",
      platform: "MidJourney",
      code: "منظر مدينة مستقبلية مع ناطحات سحاب طويلة، ومركبات طائرة، وإعلانات ثلاثية الأبعاد، بأسلوب {style}، إضاءة مفصلة، دقة 8k",
      inputs: [
        {
          id: "style",
          label: "النمط الفني",
          example: "سايبربانك",
          type: "select",
          options: designStyles.map((style) => style.name),
        },
      ],
      subscriptionRequired: "premium",
    },
    {
      id: 8,
      title: "شخصية خيالية",
      description: "قم بإنشاء نص مفصل لفن مفهوم شخصية خيالية",
      category: "Art",
      platform: "MidJourney",
      code: "صورة شخصية خيالية، {race} {profession}، درع معقد، أسلوب {style}، وجه مفصل، تأثيرات سحرية، إضاءة درامية، دقة 4k",
      inputs: [
        { id: "race", label: "عرق الشخصية", example: "جني", type: "text" },
        { id: "profession", label: "فئة الشخصية", example: "محارب", type: "text" },
        {
          id: "style",
          label: "النمط الفني",
          example: "واقعي",
          type: "select",
          options: designStyles.map((style) => style.name),
        },
      ],
      subscriptionRequired: "premium",
    },
    {
      id: 9,
      title: "تقرير تحليل البيانات",
      description: "قم بإنشاء تقرير تحليل بيانات شامل",
      category: "Analytics",
      platform: "Gemini",
      code: "قم بإنشاء تقرير تحليل بيانات شامل لبيانات المبيعات الفصلية، بما في ذلك تحليل الاتجاهات، والرؤى الرئيسية، وتوصيات التمثيل المرئي.",
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
      `نموذج تم إنشاؤه بناءً على: "${newPromptDescription}"\n\nهنا سيظهر النموذج المنشأ بواسطة الذكاء الاصطناعي. في التطبيق الفعلي، سيتم استدعاء واجهة برمجة التطبيقات لإنشاء النموذج باستخدام ChatGPT.`,
    )
  }

  const toggleFavorite = (promptId) => {
    if (favorites.includes(promptId)) {
      setFavorites(favorites.filter((id) => id !== promptId))
      toast.info("تمت إزالة النموذج من المفضلة لديك.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    } else {
      setFavorites([...favorites, promptId])
      toast.success("تمت إضافة النموذج إلى المفضلة لديك.", {
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
    toast.success("تم حفظ النموذج في ملفك الشخصي.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })

    const newPrompt = {
      id: Date.now(),
      title: "نموذج مخصص جديد",
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
          <span className="font-medium">إنشاء</span>
          <IoSparklesSharp className="w-5 h-5 mr-2 mt-[2px]" />
        </button>

        <button className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg sm:hidden">
          <Filter className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="relative w-full">
        <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="البحث عن النماذج..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#26f4a8]"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
      </div>

      <button className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg hidden sm:block">
        <Filter className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  )

  // مكون شارة الفئة مع ألوان ديناميكية
  const CategoryBadge = ({ category }) => {
    const colorStyle = getCategoryColor(category)
    return (
      <span
        className="text-xs px-2 py-1 rounded-full"
        style={{
          backgroundColor: colorStyle.bg,
          color: colorStyle.text,
        }}
      >
        {category}
      </span>
    )
  }

  if (!selectedPlatform && !selectedPrompt && !showCreateForm) {
    return (
      <div className="container mx-auto md:px-4 sm:px-6">
        <ToastContainer className={"z-50"} rtl />
        <div className="flex flex-col gap-4 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold">اختر منصة</h2>
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
      <div className={`container mx-auto px-4 sm:px-6 `}>
        <ToastContainer rtl className={"z-50"} />
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex gap-2 items-center">
            <button onClick={handleGoBack} className="text-gray-600 hover:text-gray-800 mr-3">
              <ArrowLeft className="w-5 h-5 mt-[2px]" />
            </button>
            <h2 onClick={handleGoBack} className="text-xl cursor-pointer text-nowrap sm:text-2xl font-bold">
              نماذج {platforms.find((p) => p.id === selectedPlatform)?.name} [{filteredPrompts.length}]
            </h2>
          </div>
          <SearchBar />
        </div>

        {filteredPrompts.length > 0 && (
          <CategoryFilter
            categories={getUniqueCategories(prompts)}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategoryChange}
            categoryColors={categoryColors}
          />
        )}

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 }`}>
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
                    {prompt.subscriptionRequired && <Lock className="w-4 h-4 mr-2 text-yellow-500" />}
                  </h3>
                  <CategoryBadge category={prompt.category} />
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
                        toast.success("تم نسخ النموذج إلى الحافظة الخاصة بك.", {
                          position: "top-right",
                          autoClose: 3000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                        })
                      } else {
                        toast.error(`هذا النموذج يتطلب اشتراك ${prompt.subscriptionRequired} للوصول إليه.`, {
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
              <p className="text-gray-500 text-lg">لم يتم العثور على نماذج لهذه المنصة. جرب إنشاء نموذج جديد!</p>
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
          <ArrowLeft className="w-5 h-5 ml-2" />
          العودة إلى النماذج
        </button>

        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-6">إنشاء نموذج جديد</h2>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">صف ما تحتاجه</label>
            <textarea
              value={newPromptDescription}
              onChange={(e) => setNewPromptDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#26f4a8]"
              placeholder="صف نوع النموذج الذي تريد إنشاءه..."
              rows={5}
            />
          </div>

          <button
            onClick={handleCreatePrompt}
            className="bg-[#26f4a8] hover:bg-green-400 text-white px-6 py-2 rounded-lg mb-6"
          >
            إنشاء النموذج
          </button>

          {generatedPrompt && (
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-3">النموذج المنشأ</h3>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 overflow-x-auto">
                <pre className="whitespace-pre-wrap">{generatedPrompt}</pre>
              </div>

              {userCreatedPrompts.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold text-lg mb-3">النماذج السابقة الخاصة بك</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userCreatedPrompts.map((prompt) => (
                      <div key={prompt.id} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">{prompt.title}</h4>
                          <CategoryBadge category={prompt.category} />
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{prompt.description}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-gray-500">
                            {new Date(prompt.dateCreated).toLocaleDateString()}
                          </span>
                          <span className="text-xs text-gray-600">{prompt.platform}</span>
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
                حفظ النموذج
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
            <ArrowLeft className="w-5 h-5 cursor-pointer ml-2" />
            العودة إلى النماذج
          </button>

          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-0">{selectedPrompt.title}</h2>
                <button
                  onClick={(e) => {}}
                  className={`text-gray-400 hover:text-red-500 ${favorites.includes(selectedPrompt.id) ? "text-red-500" : ""}`}
                >
                  <BiLike className="w-5 h-5 cursor-pointer" />
                </button>
              </div>
              <div className="flex gap-2 items-center">
                <CategoryBadge category={selectedPrompt.category} />
              </div>
            </div>

            <p className="text-gray-600 mb-6">{selectedPrompt.description}</p>

            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-3">تخصيص النموذج</h3>
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
                        <option value="">اختر {input.label}</option>
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
                        placeholder={`مثال: ${input.example}`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                <h3 className="font-semibold text-lg mb-2 sm:mb-0">النموذج المنشأ</h3>
                <div className="flex gap-2 items-center">
                  <span className="ml-2 text-sm text-gray-500">{selectedPrompt.platform}</span>
                  <button
                    className="text-[#26f4a8] hover:bg-green-400 flex items-center ml-2"
                    onClick={() => {
                      navigator.clipboard.writeText(getFormattedPromptCode())
                      toast.success("تم نسخ النموذج إلى الحافظة الخاصة بك.", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                      })
                    }}
                  >
                    <Copy className="w-5 h-5 ml-1" />
                    نسخ
                  </button>
                  <button
                    className="bg-[#26f4a8] hover:bg-green-400 text-white px-3 py-1 rounded-lg flex items-center"
                    onClick={handleSavePrompt}
                  >
                    <Star className="w-4 h-4 ml-1" />
                    حفظ
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
            <ArrowLeft className="w-5 h-5 cursor-pointer ml-2" />
            العودة إلى النماذج
          </button>

          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-0">{selectedPrompt.title}</h2>
                <button
                  className={`text-gray-400 hover:text-red-500 ${favorites.includes(selectedPrompt.id) ? "text-red-500" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    // toggleFavorite(selectedPrompt.id)
                  }}
                >
                  <BiLike className="w-5 h-5 cursor-pointer" />

                  {/* <Heart className="w-5 h-5" fill={favorites.includes(selectedPrompt.id) ? "red" : "none"} /> */}
                </button>
              </div>
              <div className="flex gap-2 items-center">
                <CategoryBadge category={selectedPrompt.category} />
              </div>
            </div>

            <p className="text-gray-600 mb-6">{selectedPrompt.description}</p>

            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-3">تخصيص النموذج</h3>
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
                        <option value="">اختر {input.label}</option>
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
                        placeholder={`مثال: ${input.example}`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {userInputs.style && (
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-3">معاينة النمط</h3>
                <div className="bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src="/placeholder.svg?height=400&width=600"
                    alt={`مثال على نمط ${userInputs.style}`}
                    className="w-full object-cover"
                  />
                  <div className="p-3 text-center text-gray-700">صورة نموذجية بنمط {userInputs.style}</div>
                </div>
              </div>
            )}

            <div className="mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                <h3 className="font-semibold text-lg mb-2 sm:mb-0">النموذج المنشأ</h3>
                <div className="flex gap-2 items-center">
                  <span className="ml-2 text-sm text-gray-500">{selectedPrompt.platform}</span>
                  <button
                    className="text-[#26f4a8] hover:bg-green-400 flex items-center ml-2"
                    onClick={() => {
                      navigator.clipboard.writeText(getFormattedPromptCode())
                      toast.success("تم نسخ النموذج إلى الحافظة الخاصة بك.", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                      })
                    }}
                  >
                    <Copy className="w-5 h-5 ml-1" />
                    نسخ
                  </button>
                  <button
                    className="bg-[#26f4a8] hover:bg-green-400 text-white px-3 py-1 rounded-lg flex items-center"
                    onClick={handleSavePrompt}
                  >
                    <Star className="w-4 h-4 ml-1" />
                    حفظ
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
            <ArrowLeft className="w-5 h-5 cursor-pointer ml-2" />
            العودة إلى النماذج
          </button>

          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-0">{selectedPrompt.title}</h2>
                <button
                  className={`text-gray-400 hover:text-red-500 ${favorites.includes(selectedPrompt.id) ? "text-red-500" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    // toggleFavorite(selectedPrompt.id)
                  }}
                >
                  <BiLike className="w-5 h-5 cursor-pointer" />

                  {/* <Heart className="w-5 h-5" fill={favorites.includes(selectedPrompt.id) ? "red" : "none"} /> */}
                </button>
              </div>
              <div className="flex gap-2 items-center">
                <CategoryBadge category={selectedPrompt.category} />
              </div>
            </div>

            <p className="text-gray-600 mb-6">{selectedPrompt.description}</p>

            <div className="mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                <h3 className="font-semibold text-lg mb-2 sm:mb-0">النموذج المنشأ</h3>
                <div className="flex gap-2 items-center">
                  <span className="ml-2 text-sm text-gray-500">{selectedPrompt.platform}</span>
                  <button
                    className="text-[#26f4a8] hover:bg-green-400 flex items-center ml-2"
                    onClick={() => {
                      navigator.clipboard.writeText(selectedPrompt.code)
                      toast.success("تم نسخ النموذج إلى الحافظة الخاصة بك.", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                      })
                    }}
                  >
                    <Copy className="w-5 h-5 ml-1" />
                    نسخ
                  </button>
                  <button
                    className="bg-[#26f4a8] hover:bg-green-400 text-white px-3 py-1 rounded-lg flex items-center"
                    onClick={handleSavePrompt}
                  >
                    <Star className="w-4 h-4 ml-1" />
                    حفظ
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
