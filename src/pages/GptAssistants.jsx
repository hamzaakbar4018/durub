import React from 'react';
import { Search, Filter } from 'lucide-react';

const GptAssistants = () => {
  // Sample data
  const gptAssistants = [
    { 
      id: 1, 
      name: "Financial Advisor", 
      description: "Get professional advice on investments and financial planning", 
      category: "Finance", 
      image: "/api/placeholder/80/80" 
    },
    { 
      id: 2, 
      name: "Fitness Coach", 
      description: "Personal training and nutrition guidance tailored to your goals", 
      category: "Health", 
      image: "/api/placeholder/80/80" 
    },
    { 
      id: 3, 
      name: "Language Tutor", 
      description: "Learn any language with personalized lessons and practice", 
      category: "Education", 
      image: "/api/placeholder/80/80" 
    },
    { 
      id: 4, 
      name: "Travel Planner", 
      description: "Create customized travel itineraries for any destination", 
      category: "Travel", 
      image: "/api/placeholder/80/80" 
    },
    { 
      id: 5, 
      name: "Code Reviewer", 
      description: "Get expert feedback on your code and implementation", 
      category: "Development", 
      image: "/api/placeholder/80/80" 
    },
    { 
      id: 6, 
      name: "Legal Assistant", 
      description: "Get help with legal document preparation and research", 
      category: "Legal", 
      image: "/api/placeholder/80/80" 
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">GPT Assistants</h2>
        <div className="flex space-x-4">
          <div className="relative">
            <Search className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search assistants..."
              className="pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg">
            <Filter className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gptAssistants.map(gpt => (
          <div key={gpt.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-4">
              <div className="flex items-center mb-4">
                <img src={gpt.image} alt={gpt.name} className="w-12 h-12 rounded-full ml-4" />
                <div>
                  <h3 className="font-bold text-lg">{gpt.name}</h3>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    {gpt.category}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{gpt.description}</p>
              <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg">
                Go to Assistant
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GptAssistants;