import React from 'react';

const Equity: React.FC = () => {
  return (
    <div className="container mx-auto px-8 py-8">
      <h1 className="text-3xl font-bold mb-6">Equity Offerings</h1>
      
      <div className="bg-blue-50 p-6 rounded-xl mb-8">
        <h2 className="text-xl font-bold mb-2">Invest in Promising Startups</h2>
        <p className="text-gray-700 mb-4">
          Equity offerings allow you to own a piece of innovative startups with high growth potential.
          Each investment opportunity is thoroughly vetted by our team.
        </p>
        <div className="flex space-x-4">
          <button className="bg-primary text-white px-6 py-2 rounded-lg">How It Works</button>
          <button className="border border-primary text-primary px-6 py-2 rounded-lg">Investment Guide</button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <img src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Company Logo" className="w-16 h-16 rounded-xl object-cover mr-4" />
              <div>
                <h3 className="font-bold text-xl">SoundCore Tech</h3>
                <p className="text-gray-600 text-sm">Audio Technology • San Francisco, CA</p>
              </div>
              <div className="ml-auto bg-green-100 text-secondary text-xs px-3 py-1 rounded-full">
                75% Funded
              </div>
            </div>
            
            <p className="text-gray-700 mb-4">
              SoundCore Tech is redefining audio experiences with their innovative approach to sound engineering and sustainable manufacturing.
            </p>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Funding Goal</span>
                <span className="font-medium">$500,000</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Minimum Investment</span>
                <span className="font-medium">$1,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Equity Offered</span>
                <span className="font-medium">8%</span>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div className="bg-secondary h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
            
            <div className="flex justify-between text-sm mb-4">
              <span className="text-gray-600">$375,000 raised</span>
              <span className="text-gray-600">15 days left</span>
            </div>
            
            <button className="w-full bg-primary text-white py-3 rounded-lg">View Opportunity</button>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Company Logo" className="w-16 h-16 rounded-xl object-cover mr-4" />
              <div>
                <h3 className="font-bold text-xl">GreenHarvest</h3>
                <p className="text-gray-600 text-sm">AgTech • Portland, OR</p>
              </div>
              <div className="ml-auto bg-blue-100 text-primary text-xs px-3 py-1 rounded-full">
                42% Funded
              </div>
            </div>
            
            <p className="text-gray-700 mb-4">
              GreenHarvest is developing vertical farming solutions that use 95% less water and increase crop yields by 300% compared to traditional farming.
            </p>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Funding Goal</span>
                <span className="font-medium">$750,000</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Minimum Investment</span>
                <span className="font-medium">$2,500</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Equity Offered</span>
                <span className="font-medium">12%</span>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div className="bg-primary h-2 rounded-full" style={{ width: '42%' }}></div>
            </div>
            
            <div className="flex justify-between text-sm mb-4">
              <span className="text-gray-600">$315,000 raised</span>
              <span className="text-gray-600">28 days left</span>
            </div>
            
            <button className="w-full bg-primary text-white py-3 rounded-lg">View Opportunity</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Equity;
