import React from 'react';
import { Link } from 'react-router-dom';

const Auctions: React.FC = () => {
  return (
    <div className="container mx-auto px-8 py-8">
      <h1 className="text-3xl font-bold mb-6">Auctions</h1>
      
      <div className="flex mb-6">
        <div className="flex space-x-2 mr-4">
          <button className="bg-primary text-white px-4 py-2 rounded-lg">All</button>
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg">Tech</button>
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg">Home</button>
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg">Lifestyle</button>
        </div>
        <div className="ml-auto">
          <select className="border border-gray-300 rounded-lg px-4 py-2">
            <option>Ending Soon</option>
            <option>Newest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <img src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Wireless Earbuds" className="w-full h-48 object-cover" />
          <div className="p-4">
            <div className="flex items-center mb-2">
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center mr-2">
                <i className="material-icons mr-1" style={{ fontSize: '12px' }}>schedule</i>
                Ending Soon
              </span>
              <span className="bg-purple-100 text-accent text-xs px-2 py-1 rounded-full">5 bids</span>
            </div>
            <h3 className="font-bold">Wireless Earbuds Pro</h3>
            <p className="text-gray-600 text-sm mb-2">By SoundCore Tech</p>
            <div className="flex justify-between mt-2">
              <div className="text-primary font-medium">$5.00</div>
              <div className="text-gray-500 text-sm">30s left</div>
            </div>
            <Link to="/auction-detail" className="block text-center bg-primary text-white py-2 rounded-lg mt-3">View Auction</Link>
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <img src="https://images.unsplash.com/photo-1547949003-9792a18a2601?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Portable Speaker" className="w-full h-48 object-cover" />
          <div className="p-4">
            <div className="flex items-center mb-2">
              <span className="bg-blue-100 text-primary text-xs px-2 py-1 rounded-full mr-2">Tech</span>
              <span className="bg-purple-100 text-accent text-xs px-2 py-1 rounded-full">12 bids</span>
            </div>
            <h3 className="font-bold">Portable Bluetooth Speaker</h3>
            <p className="text-gray-600 text-sm mb-2">By AudioWave</p>
            <div className="flex justify-between mt-2">
              <div className="text-primary font-medium">$9.64</div>
              <div className="text-gray-500 text-sm">4h 23m left</div>
            </div>
            <Link to="/auction-detail" className="block text-center bg-primary text-white py-2 rounded-lg mt-3">View Auction</Link>
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <img src="https://images.unsplash.com/photo-1575311373937-040b8e1fd6b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Fitness Tracker" className="w-full h-48 object-cover" />
          <div className="p-4">
            <div className="flex items-center mb-2">
              <span className="bg-blue-100 text-primary text-xs px-2 py-1 rounded-full mr-2">Tech</span>
              <span className="bg-purple-100 text-accent text-xs px-2 py-1 rounded-full">8 bids</span>
            </div>
            <h3 className="font-bold">Smart Fitness Tracker</h3>
            <p className="text-gray-600 text-sm mb-2">By FitTech</p>
            <div className="flex justify-between mt-2">
              <div className="text-primary font-medium">$8.75</div>
              <div className="text-gray-500 text-sm">3h 45m left</div>
            </div>
            <Link to="/auction-detail" className="block text-center bg-primary text-white py-2 rounded-lg mt-3">View Auction</Link>
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <img src="https://images.unsplash.com/photo-1517231925375-bf2cb42917a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Smart Coffee Maker" className="w-full h-48 object-cover" />
          <div className="p-4">
            <div className="flex items-center mb-2">
              <span className="bg-green-100 text-secondary text-xs px-2 py-1 rounded-full mr-2">Home</span>
              <span className="bg-purple-100 text-accent text-xs px-2 py-1 rounded-full">3 bids</span>
            </div>
            <h3 className="font-bold">Smart Coffee Maker</h3>
            <p className="text-gray-600 text-sm mb-2">By BrewTech</p>
            <div className="flex justify-between mt-2">
              <div className="text-primary font-medium">$5.42</div>
              <div className="text-gray-500 text-sm">5h 12m left</div>
            </div>
            <Link to="/auction-detail" className="block text-center bg-primary text-white py-2 rounded-lg mt-3">View Auction</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auctions;
