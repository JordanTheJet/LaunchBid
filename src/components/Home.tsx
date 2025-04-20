import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to Launchbid</h1>
        <p className="text-xl text-gray-600">Connecting startups with early supporters through innovative funding mechanisms.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <div className="bg-blue-100 text-primary w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="material-icons">gavel</i>
          </div>
          <h2 className="text-xl font-bold mb-2">Auctions</h2>
          <p className="text-gray-600 mb-4">Bid on innovative products from emerging startups.</p>
          <Link to="/auctions" className="text-primary font-medium hover:underline">Browse Auctions</Link>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <div className="bg-purple-100 text-accent w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="material-icons">trending_up</i>
          </div>
          <h2 className="text-xl font-bold mb-2">Equity</h2>
          <p className="text-gray-600 mb-4">Invest in promising startups and own a piece of their future.</p>
          <Link to="/equity" className="text-primary font-medium hover:underline">Explore Equity Offerings</Link>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <div className="bg-green-100 text-secondary w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="material-icons">account_balance</i>
          </div>
          <h2 className="text-xl font-bold mb-2">Microloans</h2>
          <p className="text-gray-600 mb-4">Support entrepreneurs with small loans that make a big difference.</p>
          <Link to="/loans" className="text-primary font-medium hover:underline">View Loan Opportunities</Link>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-8 mb-12">
        <h2 className="text-2xl font-bold mb-4">Featured Auctions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <img src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Wireless Earbuds" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-bold">Wireless Earbuds Pro</h3>
              <div className="flex justify-between mt-2">
                <div className="text-primary font-medium">$5.00</div>
                <div className="text-gray-500 text-sm">30s left</div>
              </div>
              <Link to="/auction-detail/wireless-earbuds" className="block text-center bg-primary text-white py-2 rounded-lg mt-3">View Auction</Link>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <img src="https://images.unsplash.com/photo-1547949003-9792a18a2601?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Portable Speaker" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-bold">Portable Bluetooth Speaker</h3>
              <div className="flex justify-between mt-2">
                <div className="text-primary font-medium">$9.64</div>
                <div className="text-gray-500 text-sm">4h 23m left</div>
              </div>
              <Link to="/auction-detail/portable-speaker" className="block text-center bg-primary text-white py-2 rounded-lg mt-3">View Auction</Link>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <img src="https://images.unsplash.com/photo-1575311373937-040b8e1fd6b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Fitness Tracker" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-bold">Smart Fitness Tracker</h3>
              <div className="flex justify-between mt-2">
                <div className="text-primary font-medium">$8.75</div>
                <div className="text-gray-500 text-sm">3h 45m left</div>
              </div>
              <Link to="/auction-detail/fitness-tracker" className="block text-center bg-primary text-white py-2 rounded-lg mt-3">View Auction</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
