import React from 'react';
import { Search, Filter, ExternalLink } from 'lucide-react';
import img from '../assets/react.svg'
const GptAssistants = () => {
  const gptAssistants = [
    { 
      id: 1, 
      name: "Financial Advisor", 
      description: "Get professional advice on investments and financial planning", 
      category: "Finance", 
      image: "/api/placeholder/80/80",
      externalUrl: "https://chat.openai.com/g/g-abcdefg"
    },
    { 
      id: 2, 
      name: "Fitness Coach", 
      description: "Personal training and nutrition guidance tailored to your goals", 
      category: "Health", 
      image: "/api/placeholder/80/80",
      externalUrl: "https://chat.openai.com/g/g-hijklmn" 
    },
    { 
      id: 3, 
      name: "Language Tutor", 
      description: "Learn any language with personalized lessons and practice", 
      category: "Education", 
      image: "/api/placeholder/80/80",
      externalUrl: "https://chat.openai.com/g/g-opqrstu" 
    },
    { 
      id: 4, 
      name: "Travel Planner", 
      description: "Create customized travel itineraries for any destination", 
      category: "Travel", 
      image: "/api/placeholder/80/80",
      externalUrl: "https://chat.openai.com/g/g-vwxyz12" 
    },
    { 
      id: 5, 
      name: "Code Reviewer", 
      description: "Get expert feedback on your code and implementation", 
      category: "Development", 
      image: "/api/placeholder/80/80",
      externalUrl: "https://chat.openai.com/g/g-345678a" 
    },
    { 
      id: 6, 
      name: "Legal Assistant", 
      description: "Get help with legal document preparation and research", 
      category: "Legal", 
      image: "/api/placeholder/80/80",
      externalUrl: "https://chat.openai.com/g/g-9bcdefg" 
    }
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl sm:text-2xl font-bold">GPT Assistants</h2>
        <div className="flex flex-wrap gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search assistants..."
              className="w-full sm:w-auto pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#26f4a8]"
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
              <div className="flex gap-2 items-center mb-4">
                <img src={img} alt={gpt.name} className="w-10 h-10 rounded-full mr-4" />
                <div>
                  <h3 className="font-bold text-lg">{gpt.name}</h3>
                  <span className="bg-green-100 text-[#26f4a8] text-xs px-2 py-1 rounded-full">
                    {gpt.category}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{gpt.description}</p>
              <a 
                href={gpt.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#26f4a8] hover:bg-green-400 text-white py-2 rounded-lg flex items-center justify-center"
              >
                Go to Assistant
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GptAssistants;