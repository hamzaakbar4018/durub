import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, Copy, X, ArrowLeft, Heart, Star } from 'lucide-react';

const Prompts = () => {
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [userInputs, setUserInputs] = useState({});
  const [newPromptDescription, setNewPromptDescription] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isCreateButtonHovered, setIsCreateButtonHovered] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [designStyle, setDesignStyle] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data for platforms
  const platforms = [
    { id: 'chatgpt', name: 'ChatGPT', icon: '🤖' },
    { id: 'claude', name: 'Claude', icon: '🧠' },
    { id: 'midjourney', name: 'MidJourney', icon: '🎨' },
    { id: 'gemini', name: 'Gemini', icon: '👁️' }
  ];

  // Sample design styles for MidJourney
  const designStyles = [
    { id: 'realistic', name: 'Realistic' },
    { id: 'cartoon', name: 'Cartoon' },
    { id: 'abstract', name: 'Abstract' },
    { id: 'minimalist', name: 'Minimalist' },
    { id: 'cyberpunk', name: 'Cyberpunk' }
  ];

  // Sample data for prompts
  const allPrompts = [
    {
      id: 1,
      title: "Business Plan Generator",
      description: "Create a comprehensive business plan for your startup with financial projections and detailed market analysis, along with implementation strategies and risk assessment.",
      category: "Business",
      platform: "ChatGPT",
      code: "I want you to create a detailed business plan for a {projectName} with {branchCount} branches. Include the following sections: Executive Summary, Company Description, Market Analysis, Organization & Management, Service/Product Line, Marketing & Sales, Financial Projections for 3 years, and Funding Request if applicable.",
      inputs: [
        { id: "projectName", label: "Project Name", example: "Durub AlRiyada", type: "text" },
        { id: "branchCount", label: "Number of Branches", example: "3", type: "number" }
      ]
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
        { id: "targetMarket", label: "Target Market", example: "Saudi Arabia", type: "text" }
      ]
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
        { id: "topicFocus", label: "Topic Focus", example: "Home Workouts", type: "text" }
      ]
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
        { id: "contentTheme", label: "Content Theme", example: "Fitness Tips", type: "text" }
      ]
    },
    {
      id: 5,
      title: "Product Description",
      description: "Generate compelling product descriptions for your e-commerce store",
      category: "E-commerce",
      platform: "Gemini",
      code: "Write a compelling product description for AirFlex Mat, a Yoga Mat priced at 199 SAR. Focus on benefits, features, and include a call to action.",
      inputs: []
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
        { id: "newsletterTopic", label: "Newsletter Topic", example: "Monthly Fitness Challenge", type: "text" }
      ]
    },
    {
      id: 7,
      title: "Futuristic City Scene",
      description: "Generate a detailed image prompt for a futuristic cityscape",
      category: "Art",
      platform: "MidJourney",
      code: "A futuristic cityscape with tall skyscrapers, flying vehicles, holographic advertisements, in {style} style, detailed lighting, 8k resolution",
      inputs: [
        { id: "style", label: "Art Style", example: "Cyberpunk", type: "select", options: designStyles.map(style => style.name) }
      ]
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
        { id: "style", label: "Art Style", example: "Realistic", type: "select", options: designStyles.map(style => style.name) }
      ]
    },
    {
      id: 9,
      title: "Data Analysis Report",
      description: "Generate a comprehensive data analysis report",
      category: "Analytics",
      platform: "Gemini",
      code: "Create a comprehensive data analysis report for quarterly sales data, including trend analysis, key insights, and visual representation recommendations.",
      inputs: []
    }
  ];

  // Filter prompts based on selected platform
  const prompts = selectedPlatform
    ? allPrompts.filter(prompt => prompt.platform.toLowerCase() === selectedPlatform.toLowerCase())
    : allPrompts;

  // Further filter based on search query
  const filteredPrompts = searchQuery
    ? prompts.filter(prompt =>
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : prompts;

  const handlePromptClick = (prompt) => {
    setSelectedPrompt(prompt);
    // Initialize inputs
    const initialInputs = {};
    prompt.inputs.forEach(input => {
      initialInputs[input.id] = "";
    });
    setUserInputs(initialInputs);
  };

  const handleInputChange = (inputId, value) => {
    setUserInputs({
      ...userInputs,
      [inputId]: value
    });
  };

  const getFormattedPromptCode = () => {
    if (!selectedPrompt) return "";

    let formattedCode = selectedPrompt.code;
    Object.keys(userInputs).forEach(key => {
      const value = userInputs[key] || `[${key}]`;
      formattedCode = formattedCode.replace(`{${key}}`, value);
    });

    return formattedCode;
  };

  const handleCreatePrompt = () => {
    // Simulating prompt generation
    setGeneratedPrompt(`Generated prompt based on: "${newPromptDescription}"\n\nThis is where the AI-generated prompt would appear. In a real implementation, this would call an API to generate the prompt using ChatGPT.`);
  };

  const toggleFavorite = (promptId) => {
    if (favorites.includes(promptId)) {
      setFavorites(favorites.filter(id => id !== promptId));
    } else {
      setFavorites([...favorites, promptId]);
    }
  };

  const handleSavePrompt = () => {
    // Simulate saving the prompt to user profile
    alert("Prompt saved to your profile!");

    // In a real implementation, this would call an API to save the prompt
  };

  // Render platform selection view
  if (!selectedPlatform && !selectedPrompt && !showCreateForm) {
    return (
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-xl sm:text-2xl font-bold">Select a Platform</h2>
          <div className="flex flex-wrap gap-4 w-full sm:w-auto">
            <button
              className="relative bg-[#26f4a8] hover:bg-green-400 text-white px-4 py-2 rounded-lg flex items-center"
              onClick={() => setShowCreateForm(true)}
              onMouseEnter={() => setIsCreateButtonHovered(true)}
              onMouseLeave={() => setIsCreateButtonHovered(false)}
            >
              <span className="font-medium">Create</span>
              <Plus className="w-5 h-5 ml-2" />
            </button>

            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search prompts..."
                className="w-full sm:w-auto pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#26f4a8]"
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
              />
            </div>
            <button className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg">
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {platforms.map(platform => (
            <div
              key={platform.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer flex flex-col items-center"
              onClick={() => setSelectedPlatform(platform.id)}
            >
              <div className="text-4xl mb-4">{platform.icon}</div>
              <h3 className="font-bold text-lg">{platform.name}</h3>
            </div>
          ))}
        </div>

        <h3 className="text-xl font-bold mb-4">All Prompts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrompts.map(prompt => (
            <div
              key={prompt.id}
              className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow cursor-pointer relative"
              onClick={() => handlePromptClick(prompt)}
            >
              <div className="">
                <button
                  className={`text-gray-400 hover:text-red-500 ${favorites.includes(prompt.id) ? 'text-red-500' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(prompt.id);
                  }}
                >
                  <Heart className="w-5 h-5" fill={favorites.includes(prompt.id) ? "red" : "none"} />
                </button>
              </div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{prompt.title}</h3>
                <span className="bg-green-100 text-[#26f4a8] text-xs px-2 py-1 rounded-full mt-1 ml-2">
                  {prompt.category}
                </span>
              </div>
              <p className="text-gray-600 mb-4">
                {prompt.description.length > 80
                  ? prompt.description.substring(0, 80) + '...'
                  : prompt.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{prompt.platform}</span>
                <button
                  className="text-[#26f4a8] hover:text-green-400"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText(prompt.code);
                  }}
                >
                  <Copy className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Render prompts list when a platform is selected but no prompt is selected
  if (selectedPlatform && !selectedPrompt && !showCreateForm) {
    return (
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex items-center">
            <h2 className="text-xl sm:text-2xl font-bold">
              {platforms.find(p => p.id === selectedPlatform)?.name} Prompts
            </h2>
            <button
              onClick={() => setSelectedPlatform(null)}
              className="text-gray-600 hover:text-gray-800 mr-3"
            >
              <ArrowLeft className="w-5 h-5 mt-[2px]" />
            </button>
          </div>
          <div className="flex flex-wrap gap-4 w-full sm:w-auto">
            <button
              className="relative bg-[#26f4a8] hover:bg-green-400 text-white px-4 py-2 rounded-lg flex items-center"
              onClick={() => setShowCreateForm(true)}
              onMouseEnter={() => setIsCreateButtonHovered(true)}
              onMouseLeave={() => setIsCreateButtonHovered(false)}
            >
              <span className="font-medium">Create</span>
              <Plus className="w-5 h-5 ml-2" />
            </button>

            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search prompts..."
                className="w-full sm:w-auto pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#26f4a8]"
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
              />
            </div>
            <button className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg">
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrompts.length > 0 ? (
            filteredPrompts.map(prompt => (
              <div
                key={prompt.id}
                className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow cursor-pointer relative"
                onClick={() => handlePromptClick(prompt)}
              >
                <div className="">
                  <button
                    className={`text-gray-400 hover:text-red-500 ${favorites.includes(prompt.id) ? 'text-red-500' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(prompt.id);
                    }}
                  >
                    <Heart className="w-5 h-5" fill={favorites.includes(prompt.id) ? "red" : "none"} />
                  </button>
                </div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{prompt.title}</h3>
                  <span className="bg-green-100 text-[#26f4a8] text-xs px-2 py-1 rounded-full mt-1 ml-2">
                    {prompt.category}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">
                  {prompt.description.length > 80
                    ? prompt.description.substring(0, 80) + '...'
                    : prompt.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{prompt.platform}</span>
                  <button
                    className="text-[#26f4a8] hover:text-green-400"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigator.clipboard.writeText(prompt.code);
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
    );
  }

  // Render detailed prompt view based on platform
  if (selectedPrompt) {
    // ChatGPT and Claude view (with input fields)
    if (selectedPrompt.platform === "ChatGPT" || selectedPrompt.platform === "Claude") {
      return (
        <div className="container mx-auto px-4 sm:px-6">
          <button
            onClick={() => setSelectedPrompt(null)}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
          >
             Back to prompts
             <ArrowLeft className="w-5 h-5 mr-2 mt-[2px]" />
          </button>

          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-0">{selectedPrompt.title}</h2>
              <div className="flex gap-2 items-center">
                <span className="bg-green-100 text-[#26f4a8] text-xs px-2 py-1 rounded-full mr-2">
                  {selectedPrompt.category}
                </span>
                <button
                  className={`text-gray-400 hover:text-red-500 ${favorites.includes(selectedPrompt.id) ? 'text-red-500' : ''}`}
                  onClick={() => toggleFavorite(selectedPrompt.id)}
                >
                  <Heart className="w-5 h-5" fill={favorites.includes(selectedPrompt.id) ? "red" : "none"} />
                </button>
              </div>
            </div>

            <p className="text-gray-600 mb-6">{selectedPrompt.description}</p>

            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-3">Customize Prompt</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {selectedPrompt.inputs.map(input => (
                  <div key={input.id} className="mb-4">
                    <label className="block text-gray-700 mb-2">{input.label}</label>
                    {input.type === 'select' ? (
                      <select
                        value={userInputs[input.id] || ""}
                        onChange={(e) => handleInputChange(input.id, e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#26f4a8]"
                      >
                        <option value="">Select {input.label}</option>
                        {input.options.map((option, index) => (
                          <option key={index} value={option}>{option}</option>
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
                <div className="flex items-center">
                  <span className="mr-2 text-sm text-gray-500">{selectedPrompt.platform}</span>
                  <button
                    className="text-[#26f4a8] hover:text-green-400 flex items-center mr-2"
                    onClick={() => navigator.clipboard.writeText(getFormattedPromptCode())}
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
      );
    }

    // MidJourney view (with style selection and sample image)
    else if (selectedPrompt.platform === "MidJourney") {
      return (
        <div className="container mx-auto px-4 sm:px-6">
          <button
            onClick={() => setSelectedPrompt(null)}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
          >
             Back to prompts
             <ArrowLeft className="w-5 h-5 mr-2 mt-[2px]" />
          </button>

          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-0">{selectedPrompt.title}</h2>
              <div className="flex gap-2 items-center">
                <span className="bg-green-100 text-[#26f4a8] text-xs px-2 py-1 rounded-full mr-2">
                  {selectedPrompt.category}
                </span>
                <button
                  className={`text-gray-400 hover:text-red-500 ${favorites.includes(selectedPrompt.id) ? 'text-red-500' : ''}`}
                  onClick={() => toggleFavorite(selectedPrompt.id)}
                >
                  <Heart className="w-5 h-5" fill={favorites.includes(selectedPrompt.id) ? "red" : "none"} />
                </button>
              </div>
            </div>

            <p className="text-gray-600 mb-6">{selectedPrompt.description}</p>

            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-3">Customize Prompt</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {selectedPrompt.inputs.map(input => (
                  <div key={input.id} className="mb-4">
                    <label className="block text-gray-700 mb-2">{input.label}</label>
                    {input.type === 'select' ? (
                      <select
                        value={userInputs[input.id] || ""}
                        onChange={(e) => handleInputChange(input.id, e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#26f4a8]"
                      >
                        <option value="">Select {input.label}</option>
                        {input.options.map((option, index) => (
                          <option key={index} value={option}>{option}</option>
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
                    src="/api/placeholder/600/400"
                    alt={`${userInputs.style} style example`}
                    className="w-full object-cover"
                  />
                  <div className="p-3 text-center text-gray-700">
                    Sample {userInputs.style} style image
                  </div>
                </div>
              </div>
            )}

            <div className="mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                <h3 className="font-semibold text-lg mb-2 sm:mb-0">Generated Prompt</h3>
                <div className="flex items-center">
                  <span className="mr-2 text-sm text-gray-500">{selectedPrompt.platform}</span>
                  <button
                    className="text-[#26f4a8] hover:text-green-400 flex items-center mr-2"
                    onClick={() => navigator.clipboard.writeText(getFormattedPromptCode())}
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
      );
    }

    // Gemini view 
    else if (selectedPrompt.platform === "Gemini") {
      return (
        <div className="container mx-auto px-4 sm:px-6">
          <button
            onClick={() => setSelectedPrompt(null)}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
          >
            Back to prompts
            <ArrowLeft className="w-5 h-5 mr-2 mt-[2px]" />
          </button>

          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-0">{selectedPrompt.title}</h2>
              <div className="flex gap-2 items-center">
                <span className="bg-green-100 text-[#26f4a8] text-xs px-2 py-1 rounded-full mr-2">
                  {selectedPrompt.category}
                </span>
                <button
                  className={`text-gray-400 hover:text-red-500 ${favorites.includes(selectedPrompt.id) ? 'text-red-500' : ''}`}
                  onClick={() => toggleFavorite(selectedPrompt.id)}
                >
                  <Heart className="w-5 h-5" fill={favorites.includes(selectedPrompt.id) ? "red" : "none"} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}


export default Prompts;