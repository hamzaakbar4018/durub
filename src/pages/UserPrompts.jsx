"use client"

import { useState } from "react"
import { Search, Plus, Copy, ArrowLeft, Heart, Edit, Trash2, AlertCircle } from "lucide-react"
import { IoSparklesSharp } from "react-icons/io5"

const UserPrompts = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPrompt, setSelectedPrompt] = useState(null)
  const [showEditForm, setShowEditForm] = useState(false)
  const [editPromptData, setEditPromptData] = useState(null)
  const [favorites, setFavorites] = useState([])
  const [confirmDelete, setConfirmDelete] = useState(null)

  // Sample data for user-created prompts - simplified
  const [userPrompts, setUserPrompts] = useState([
    {
      id: 1,
      title: "Product Launch Email Sequence",
      description: "A 5-email sequence for launching a new product to an existing customer base",
      category: "Email Marketing",
      platform: "ChatGPT",
      code: "Create a 5-email sequence for launching {productName} to an existing customer base. The product is {productDescription}. The emails should be sent over a period of {timeframe} days. Include subject lines and email body content for each email.",
      inputs: [
        { id: "productName", label: "Product Name", example: "FitTrack Pro", type: "text" },
        { id: "productDescription", label: "Product Description", example: "A fitness tracker with heart rate monitoring", type: "text" },
        { id: "timeframe", label: "Timeframe (days)", example: "7", type: "number" },
      ],
      dateCreated: "2023-05-15",
    },
    {
      id: 2,
      title: "Social Media Content Calendar",
      description: "Monthly content calendar for Instagram with post ideas and hashtags",
      category: "Social Media",
      platform: "Claude",
      code: "Create a monthly content calendar for Instagram for {businessType}. Include post ideas, captions, best posting times, and relevant hashtags. The target audience is {targetAudience}.",
      inputs: [
        { id: "businessType", label: "Business Type", example: "Fitness Studio", type: "text" },
        { id: "targetAudience", label: "Target Audience", example: "Women 25-40 interested in fitness", type: "text" },
      ],
      dateCreated: "2023-05-10",
    },
    {
      id: 3,
      title: "Fantasy Landscape",
      description: "Generate a detailed fantasy landscape image with mountains and castles",
      category: "Art",
      platform: "MidJourney",
      code: "Fantasy landscape with towering mountains, ancient castle, {timeOfDay} lighting, mystical atmosphere, {weatherCondition}, highly detailed, 8k resolution, cinematic",
      inputs: [
        { id: "timeOfDay", label: "Time of Day", example: "Sunset", type: "text" },
        { id: "weatherCondition", label: "Weather Condition", example: "Foggy", type: "text" },
      ],
      dateCreated: "2023-05-05",
    },
    {
      id: 4,
      title: "Customer Persona Generator",
      description: "Create detailed customer personas for marketing strategy",
      category: "Marketing",
      platform: "Gemini",
      code: "Generate a detailed customer persona for a {businessType} targeting {targetMarket}. Include demographics, psychographics, goals, pain points, and buying behavior.",
      inputs: [
        { id: "businessType", label: "Business Type", example: "Online Fitness Coaching", type: "text" },
        { id: "targetMarket", label: "Target Market", example: "Working professionals in Saudi Arabia", type: "text" },
      ],
      dateCreated: "2023-04-28",
    },
  ])

  // Get unique categories for filtering
  const uniqueCategories = ["all", ...Array.from(new Set(userPrompts.map((prompt) => prompt.category)))]

  // Filter prompts based on search query and category
  const filteredPrompts = userPrompts.filter((prompt) => {
    const matchesSearch =
      searchQuery === "" ||
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.category.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "all" || prompt.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  // Event handlers
  const handlePromptClick = (prompt) => {
    setSelectedPrompt(prompt)
  }

  const toggleFavorite = (e, promptId) => {
    e.stopPropagation()
    setFavorites(favorites.includes(promptId) 
      ? favorites.filter(id => id !== promptId)
      : [...favorites, promptId]
    )
  }

  const handleEditPrompt = (prompt) => {
    setEditPromptData({ ...prompt, inputs: [...prompt.inputs] })
    setShowEditForm(true)
  }

  const handleDeletePrompt = (promptId) => {
  }


  const handleCopyPrompt = (e, code) => {
    e.stopPropagation()
    navigator.clipboard.writeText(code)
  }

  const handleUpdatePrompt = (e) => {
    e.preventDefault()
    const updatedPrompts = userPrompts.map((prompt) => 
      prompt.id === editPromptData.id ? editPromptData : prompt
    )
    
    setUserPrompts(updatedPrompts)
    
    if (selectedPrompt && selectedPrompt.id === editPromptData.id) {
      setSelectedPrompt(editPromptData)
    }
    
    setShowEditForm(false)
    setEditPromptData(null)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditPromptData({ ...editPromptData, [name]: value })
  }

  const handlePromptInputChange = (index, field, value) => {
    const updatedInputs = [...editPromptData.inputs]
    updatedInputs[index] = { ...updatedInputs[index], [field]: value }
    setEditPromptData({ ...editPromptData, inputs: updatedInputs })
  }

  const addPromptInput = () => {
    setEditPromptData({
      ...editPromptData,
      inputs: [
        ...editPromptData.inputs, 
        { id: `input_${Date.now()}`, label: "", example: "", type: "text" }
      ]
    })
  }

  const removePromptInput = (index) => {
    const updatedInputs = [...editPromptData.inputs]
    updatedInputs.splice(index, 1)
    setEditPromptData({ ...editPromptData, inputs: updatedInputs })
  }

  // Render edit form
  if (showEditForm && editPromptData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => setShowEditForm(false)}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to My Prompts
        </button>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-6">Edit Prompt</h2>

          <form onSubmit={handleUpdatePrompt}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 mb-2">Prompt Title</label>
                <input
                  type="text"
                  name="title"
                  value={editPromptData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Category</label>
                <input
                  type="text"
                  name="category"
                  value={editPromptData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                value={editPromptData.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                rows={2}
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Prompt Template</label>
              <textarea
                name="code"
                value={editPromptData.code}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 font-mono"
                rows={4}
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Use {"{variableName}"} for variables that will be replaced with user inputs.
              </p>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-gray-700">Input Variables</label>
                <button
                  type="button"
                  onClick={addPromptInput}
                  className="text-green-500 hover:text-green-600 flex items-center text-sm"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Input
                </button>
              </div>

              {editPromptData.inputs.map((input, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium">Input #{index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removePromptInput(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                    <div>
                      <label className="block text-gray-700 text-sm mb-1">Variable ID</label>
                      <input
                        type="text"
                        value={input.id}
                        onChange={(e) => handlePromptInputChange(index, "id", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm mb-1">Label</label>
                      <input
                        type="text"
                        value={input.label}
                        onChange={(e) => handlePromptInputChange(index, "label", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 text-sm mb-1">Example</label>
                      <input
                        type="text"
                        value={input.example}
                        onChange={(e) => handlePromptInputChange(index, "example", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm mb-1">Type</label>
                      <select
                        value={input.type}
                        onChange={(e) => handlePromptInputChange(index, "type", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                      >
                        <option value="text">Text</option>
                        <option value="number">Number</option>
                        <option value="select">Select</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setShowEditForm(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="bg-green-400 hover:bg-green-500 text-white px-6 py-2 rounded-lg"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  // Render prompt details
  if (selectedPrompt) {
    return (
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => setSelectedPrompt(null)}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to My Prompts
        </button>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <h2 className="text-xl font-bold mb-2 sm:mb-0">{selectedPrompt.title}</h2>
            <div className="flex gap-2 items-center">
              <span className="bg-green-100 text-black text-xs px-2 py-1 rounded-full mr-2">
                {selectedPrompt.category}
              </span>
              <span className="text-sm text-gray-500">{selectedPrompt.platform}</span>
            </div>
          </div>

          <p className="text-gray-600 mb-4">{selectedPrompt.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => handleEditPrompt(selectedPrompt)}
              className="flex items-center text-gray-600 hover:text-green-500 px-3 py-1 rounded-md border border-gray-300 hover:border-green-500"
            >
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </button>
            <button
              onClick={() => handleDeletePrompt(selectedPrompt.id)}
              className="flex items-center text-gray-600 hover:text-red-500 px-3 py-1 rounded-md border border-gray-300 hover:border-red-500"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Delete
            </button>
            <button
              onClick={() => navigator.clipboard.writeText(selectedPrompt.code)}
              className="flex items-center text-gray-600 hover:text-green-500 px-3 py-1 rounded-md border border-gray-300 hover:border-green-500"
            >
              <Copy className="w-4 h-4 mr-1" />
              Copy
            </button>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-3">Prompt Template</h3>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 overflow-x-auto">
              <pre className="whitespace-pre-wrap">{selectedPrompt.code}</pre>
            </div>
          </div>

          {selectedPrompt.inputs.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-3">Input Variables</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedPrompt.inputs.map((input, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="font-medium mb-1">{input.label}</div>
                    <div className="text-sm text-gray-600 mb-1">Variable: {input.id}</div>
                    <div className="text-sm text-gray-600 mb-1">Type: {input.type}</div>
                    {input.example && <div className="text-sm text-gray-600">Example: {input.example}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="text-sm text-gray-500">
            Created on {new Date(selectedPrompt.dateCreated).toLocaleDateString()}
          </div>
        </div>
      </div>
    )
  }

  // Render prompts list
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">My Prompts</h1>
        <div className="flex flex-wrap gap-4 w-full sm:w-auto">
          

          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search your prompts..."
              className="w-full sm:w-auto pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
            />
          </div>
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {uniqueCategories.map((category) => (
              <option key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Confirmation dialog for delete */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center text-red-500 mb-4">
              <AlertCircle className="w-6 h-6 mr-2" />
              <h3 className="text-lg font-bold">Confirm Delete</h3>
            </div>
            <p className="mb-6">Are you sure you want to delete this prompt? This action cannot be undone.</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeletePrompt}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {filteredPrompts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrompts.map((prompt) => (
            <div
              key={prompt.id}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer relative"
              onClick={() => handlePromptClick(prompt)}
            >
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  className={`text-gray-400 hover:text-red-500 ${favorites.includes(prompt.id) ? "text-red-500" : ""}`}
                  onClick={(e) => toggleFavorite(e, prompt.id)}
                >
                  <Heart className="w-5 h-5" fill={favorites.includes(prompt.id) ? "red" : "none"} />
                </button>
              </div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg pr-8">{prompt.title}</h3>
              </div>
              <div className="flex gap-2 mb-2">
                <span className="bg-green-100 text-black text-xs px-2 py-1 rounded-full">{prompt.category}</span>
                <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">{prompt.platform}</span>
              </div>
              <p className="text-gray-600 mb-4">
                {prompt.description.length > 80 ? prompt.description.substring(0, 80) + "..." : prompt.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  Created {new Date(prompt.dateCreated).toLocaleDateString()}
                </span>
                <div className="flex gap-2">
                  <button
                    className="text-gray-500 hover:text-green-500"
                    onClick={(e) => handleCopyPrompt(e, prompt.code)}
                    title="Copy Prompt"
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
          <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <IoSparklesSharp className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No prompts found</h3>
          <p className="text-gray-500 mb-6">You haven't created any prompts yet, or none match your current filters.</p>
          <a
            href="/prompts"
            className="inline-flex items-center bg-green-400 hover:bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Your First Prompt
          </a>
        </div>
      )}
    </div>
  )
}

export default UserPrompts