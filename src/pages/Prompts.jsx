import React, { useState } from 'react';
import { Search, Filter, Plus, Copy, X, ArrowLeft } from 'lucide-react';

const Prompts = () => {
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [userInputs, setUserInputs] = useState({});
  const [newPromptDescription, setNewPromptDescription] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isCreateButtonHovered, setIsCreateButtonHovered] = useState(false);

  // Sample data
  const prompts = [
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
      platform: "ChatGPT",
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
      platform: "Claude",
      code: "Write a compelling product description for {productName}, a {productType} priced at {productPrice}. Focus on benefits, features, and include a call to action.",
      inputs: [
        { id: "productName", label: "Product Name", example: "AirFlex Mat", type: "text" },
        { id: "productType", label: "Product Type", example: "Yoga Mat", type: "text" },
        { id: "productPrice", label: "Product Price", example: "199 SAR", type: "text" }
      ]
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
    }
  ];

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

  // Render detailed prompt view
  if (selectedPrompt) {
    return (
      <div className="container mx-auto px-4 sm:px-6">
        <button
          onClick={() => setSelectedPrompt(null)}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
        >
          Back to prompts
          <ArrowLeft className="w-5 mt-[2px] h-5 mr-2" />
        </button>

        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-0">{selectedPrompt.title}</h2>
            <span className="bg-green-100 text-[#26f4a8] text-xs px-2 py-1 rounded-full">
              {selectedPrompt.category}
            </span>
          </div>

          <p className="text-gray-600 mb-6">{selectedPrompt.description}</p>

          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-3">Customize Prompt</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {selectedPrompt.inputs.map(input => (
                <div key={input.id} className="mb-4">
                  <label className="block text-gray-700 mb-2">{input.label}</label>
                  <input
                    type={input.type}
                    value={userInputs[input.id] || ""}
                    onChange={(e) => handleInputChange(input.id, e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#26f4a8]"
                    placeholder={`Example: ${input.example}`}
                  />
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
                  className="text-[#26f4a8] hover:text-green-400 flex items-center"
                  onClick={() => navigator.clipboard.writeText(getFormattedPromptCode())}
                >
                  <Copy className="w-5 h-5 mr-1" />
                  Copy
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

  // Render create prompt form
  if (showCreateForm) {
    return (
      <div className="container mx-auto px-4 sm:px-6">
        <button
          onClick={() => setShowCreateForm(false)}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
        >
          Back to prompts
          <ArrowLeft className="w-5 mt-[2px] h-5 mr-2" />
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

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Prompt Title</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#26f4a8]"
                    placeholder="Enter a title for your prompt"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Category</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#26f4a8]">
                    <option value="">Select category</option>
                    <option value="Business">Business</option>
                    <option value="Marketing">Marketing</option>
                    <option value="SEO">SEO</option>
                    <option value="Content">Content</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Email">Email</option>
                  </select>
                </div>
              </div>

              <button className="mt-4 bg-[#26f4a8] hover:bg-green-400 text-white px-6 py-2 rounded-lg">
                Save Prompt
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Render main prompts grid
  return (
    <div className="container mx-auto px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl sm:text-2xl font-bold">Prompts</h2>
        <div className="flex flex-wrap gap-4 w-full sm:w-auto">
          <button
            className="relative bg-[#26f4a8] hover:bg-green-400 text-white px-4 py-2 rounded-lg flex items-center overflow-hidden group"
            onClick={() => setShowCreateForm(true)}
            onMouseEnter={() => setIsCreateButtonHovered(true)}
            onMouseLeave={() => setIsCreateButtonHovered(false)}
          >
            <div className="w-16 flex justify-center items-center inset-0 bg-gradient-to-r from-[#26f4a8] to-green-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`transform transition-transform duration-500 ${isCreateButtonHovered ? 'scale-110' : 'scale-100'} flex justify-center items-center`}>
                <span className="mb-[3px] font-medium">Create</span>
                <Plus className="w-5 h-5 mr-2 " />
              </div>
            </div>
           
          </button>

          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search prompts..."
              className="w-full sm:w-auto pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#26f4a8]"
            />
          </div>
          <button className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg">
            <Filter className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {prompts.map(prompt => (
          <div
            key={prompt.id}
            className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handlePromptClick(prompt)}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg">{prompt.title}</h3>
              <span className="bg-green-100 text-[#26f4a8] text-xs px-2 py-1 rounded-full">
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
};

export default Prompts;