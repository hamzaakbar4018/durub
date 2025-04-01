import React from 'react';
import { Search, Filter, Plus, Copy } from 'lucide-react';

const Prompts = () => {
  // Sample data
  const prompts = [
    { 
      id: 1, 
      title: "Business Plan Generator", 
      description: "Create a comprehensive business plan for your startup with financial projections", 
      category: "Business", 
      platform: "ChatGPT" 
    },
    { 
      id: 2, 
      title: "Marketing Strategy", 
      description: "Generate a complete marketing strategy for your product launch", 
      category: "Marketing", 
      platform: "ChatGPT" 
    },
    { 
      id: 3, 
      title: "SEO Keyword Research", 
      description: "Find the best keywords for your website to improve search ranking", 
      category: "SEO", 
      platform: "Claude" 
    },
    { 
      id: 4, 
      title: "Content Calendar", 
      description: "Create a monthly content calendar for your social media platforms", 
      category: "Content", 
      platform: "ChatGPT" 
    },
    { 
      id: 5, 
      title: "Product Description", 
      description: "Generate compelling product descriptions for your e-commerce store", 
      category: "E-commerce", 
      platform: "Claude" 
    },
    { 
      id: 6, 
      title: "Email Newsletter", 
      description: "Create engaging email newsletters to connect with your audience", 
      category: "Email", 
      platform: "ChatGPT" 
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Prompts</h2>
        <div className="flex space-x-4">
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center">
            <Plus className="w-5 h-5 ml-2" />
            Create
          </button>
          <div className="relative">
            <Search className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search prompts..."
              className="pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg">
            <Filter className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {prompts.map(prompt => (
          <div key={prompt.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg">{prompt.title}</h3>
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
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
              <button className="text-green-500 hover:text-green-600">
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