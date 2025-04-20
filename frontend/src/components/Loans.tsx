import React from 'react';

const Loans: React.FC = () => {
  return (
    <div className="container mx-auto px-8 py-8">
      <h1 className="text-3xl font-bold mb-6">Microloans</h1>
      
      <div className="bg-green-50 p-6 rounded-xl mb-8">
        <h2 className="text-xl font-bold mb-2">Support Entrepreneurs with Microloans</h2>
        <p className="text-gray-700 mb-4">
          Microloans provide essential capital to entrepreneurs who might not qualify for traditional financing.
          Your loan can help a small business grow and succeed.
        </p>
        <div className="flex space-x-4">
          <button className="bg-secondary text-white px-6 py-2 rounded-lg">How It Works</button>
          <button className="border border-secondary text-secondary px-6 py-2 rounded-lg">Lending Guide</button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <img src="https://images.unsplash.com/photo-1556742031-c6961e8560b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
            alt="Coffee Shop" className="w-full h-48 object-cover" />
          <div className="p-4">
            <div className="flex items-center mb-2">
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full mr-2">Food & Beverage</span>
              <span className="bg-green-100 text-secondary text-xs px-2 py-1 rounded-full">85% Funded</span>
            </div>
            <h3 className="font-bold">Sunrise Coffee Shop</h3>
            <p className="text-gray-600 text-sm mb-3">Portland, OR • Maria Rodriguez</p>
            <p className="text-gray-700 text-sm mb-4">
              Expanding our local coffee shop with new equipment to increase production capacity and add a small bakery section.
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div className="bg-secondary h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
            <div className="flex justify-between text-sm mb-4">
              <span className="text-gray-600">$8,500 of $10,000</span>
              <span className="text-gray-600">12 days left</span>
            </div>
            <button className="w-full bg-secondary text-white py-2 rounded-lg">Lend Now</button>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <img src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
            alt="Handmade Jewelry" className="w-full h-48 object-cover" />
          <div className="p-4">
            <div className="flex items-center mb-2">
              <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full mr-2">Artisan Crafts</span>
              <span className="bg-green-100 text-secondary text-xs px-2 py-1 rounded-full">62% Funded</span>
            </div>
            <h3 className="font-bold">Artisan Jewelry Studio</h3>
            <p className="text-gray-600 text-sm mb-3">Austin, TX • James Chen</p>
            <p className="text-gray-700 text-sm mb-4">
              Purchasing materials and tools to expand our handmade jewelry line and establish an online presence.
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div className="bg-secondary h-2 rounded-full" style={{ width: '62%' }}></div>
            </div>
            <div className="flex justify-between text-sm mb-4">
              <span className="text-gray-600">$3,100 of $5,000</span>
              <span className="text-gray-600">18 days left</span>
            </div>
            <button className="w-full bg-secondary text-white py-2 rounded-lg">Lend Now</button>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <img src="https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
            alt="Urban Farm" className="w-full h-48 object-cover" />
          <div className="p-4">
            <div className="flex items-center mb-2">
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-2">Agriculture</span>
              <span className="bg-green-100 text-secondary text-xs px-2 py-1 rounded-full">41% Funded</span>
            </div>
            <h3 className="font-bold">Urban Micro Farm</h3>
            <p className="text-gray-600 text-sm mb-3">Detroit, MI • Marcus Johnson</p>
            <p className="text-gray-700 text-sm mb-4">
              Expanding our urban farm with a greenhouse to grow produce year-round and serve our local community.
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div className="bg-secondary h-2 rounded-full" style={{ width: '41%' }}></div>
            </div>
            <div className="flex justify-between text-sm mb-4">
              <span className="text-gray-600">$5,330 of $13,000</span>
              <span className="text-gray-600">25 days left</span>
            </div>
            <button className="w-full bg-secondary text-white py-2 rounded-lg">Lend Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loans;
