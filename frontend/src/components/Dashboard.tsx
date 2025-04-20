import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Auction {
  id: number;
  title: string;
  category: string;
  currentBid?: number;
  retailPrice?: number;
  bidCount: number;
  timeRemaining: number;
  description?: string;
  imageUrl?: string;
}

const Dashboard: React.FC = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showOnlyActive, setShowOnlyActive] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<string>('newest');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startingPrice: '',
    retailPrice: '',
    category: 'TECH',
    timeRemaining: '3600',
    imageUrl: ''
  });
  const [statusMessage, setStatusMessage] = useState<{message: string, isError: boolean} | null>(null);
  const [idToDelete, setIdToDelete] = useState<string>('');

  // Fetch auctions when component mounts
  useEffect(() => {
    fetchAuctions();
  }, []);

  // Fetch auctions from API
  const fetchAuctions = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`/api/auctions?active=${showOnlyActive}&sort=${sortOption}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      
      if (response.data.success) {
        setAuctions(response.data.auctions || []);
        showStatus('Data retrieved successfully', false);
      } else {
        setError(response.data.error || 'Unknown error');
        showStatus(`Error: ${response.data.error}`, true);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch auctions');
      showStatus(`Error: ${err.message}`, true);
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  // Send auction data to database
  const handleSendToDb = async () => {
    if (!formData.title || !formData.startingPrice || !formData.retailPrice) {
      showStatus('Please fill in all required fields', true);
      return;
    }

    try {
      const auctionData = {
        title: formData.title,
        description: formData.description,
        startingPrice: parseFloat(formData.startingPrice),
        retailPrice: parseFloat(formData.retailPrice),
        category: formData.category,
        timeRemaining: parseInt(formData.timeRemaining),
        imageUrl: formData.imageUrl
      };

      const response = await axios.post('/api/admin/auctions', auctionData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });

      if (response.data.success) {
        showStatus('Auction added successfully!', false);
        // Reset form
        setFormData({
          title: '',
          description: '',
          startingPrice: '',
          retailPrice: '',
          category: 'TECH',
          timeRemaining: '3600',
          imageUrl: ''
        });
        // Refresh auction list
        fetchAuctions();
      } else {
        showStatus(`Error: ${response.data.error}`, true);
      }
    } catch (err: any) {
      showStatus(`Error: ${err.message}`, true);
    }
  };

  // Delete auction
  const handleDelete = async () => {
    if (!idToDelete) {
      showStatus('Please enter an auction ID to delete', true);
      return;
    }

    if (!window.confirm(`Are you sure you want to delete auction #${idToDelete}?`)) {
      return;
    }

    try {
      const response = await axios.delete(`/api/admin/auctions/${idToDelete}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });

      if (response.data.success) {
        showStatus('Auction deleted successfully!', false);
        setIdToDelete('');
        fetchAuctions();
      } else {
        showStatus(`Error: ${response.data.error}`, true);
      }
    } catch (err: any) {
      showStatus(`Error: ${err.message}`, true);
    }
  };

  // Show status message
  const showStatus = (message: string, isError: boolean) => {
    setStatusMessage({ message, isError });
    setTimeout(() => {
      setStatusMessage(null);
    }, 3000);
  };

  // Format time function
  const formatTime = (seconds: number | undefined) => {
    if (!seconds && seconds !== 0) return 'N/A';
    if (seconds <= 0) return 'Ended';
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Get category color
  const getCategoryBgColor = (category: string) => {
    const colors: {[key: string]: string} = {
      'TECH': 'bg-blue-100 text-blue-800',
      'WELLNESS': 'bg-green-100 text-green-800',
      'AUDIO': 'bg-orange-100 text-orange-800',
      'HOME': 'bg-yellow-100 text-yellow-800',
      'WEARABLE': 'bg-purple-100 text-purple-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  // Edit auction function
  const handleEdit = (id: number) => {
    alert(`Edit auction ${id} - This would open an edit form`);
  };

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        {/* Database Controls Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Send to Database Box */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold mb-4">Send Data to Database</h2>
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Auction Title</label>
                <input 
                  type="text" 
                  id="title" 
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" 
                  placeholder="Enter auction title" 
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  id="description" 
                  rows={3} 
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" 
                  placeholder="Enter auction description"
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Starting Price</label>
                  <input 
                    type="number" 
                    id="startingPrice" 
                    value={formData.startingPrice}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" 
                    placeholder="0.00" 
                    step="0.01" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Retail Price</label>
                  <input 
                    type="number" 
                    id="retailPrice" 
                    value={formData.retailPrice}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" 
                    placeholder="0.00" 
                    step="0.01" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select 
                    id="category" 
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="TECH">Tech</option>
                    <option value="WELLNESS">Wellness</option>
                    <option value="AUDIO">Audio</option>
                    <option value="HOME">Home</option>
                    <option value="WEARABLE">Wearable</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration (seconds)</label>
                  <input 
                    type="number" 
                    id="timeRemaining" 
                    value={formData.timeRemaining}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" 
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input 
                  type="text" 
                  id="imageUrl" 
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" 
                  placeholder="https://example.com/image.jpg" 
                />
              </div>
              <button 
                type="button" 
                onClick={handleSendToDb}
                className="w-full py-3 bg-primary text-white font-medium rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Send to Database
              </button>
            </div>
          </div>
          
          {/* Retrieve & Delete Box */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold mb-4">Database Actions</h2>
            
            <div className="mb-6">
              <button 
                onClick={fetchAuctions}
                className="w-full py-3 mb-3 bg-secondary text-white font-medium rounded-lg hover:bg-green-600 transition duration-200"
              >
                <i className="material-icons align-middle mr-1" style={{ fontSize: '18px' }}>cloud_download</i>
                Retrieve All Auctions
              </button>
              
              <div id="retrieveOptions" className="mb-4">
                <div className="flex items-center mb-2">
                  <input 
                    id="filterActive" 
                    type="checkbox" 
                    checked={showOnlyActive}
                    onChange={(e) => setShowOnlyActive(e.target.checked)}
                    className="mr-2" 
                  />
                  <label htmlFor="filterActive" className="text-sm text-gray-700">Show only active auctions</label>
                </div>
                <select 
                  id="sortOption" 
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary mb-2"
                >
                  <option value="newest">Sort by newest</option>
                  <option value="price_high">Sort by price (high to low)</option>
                  <option value="price_low">Sort by price (low to high)</option>
                  <option value="bids">Sort by bid count</option>
                </select>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-700 mb-3">Delete Controls</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Auction ID to Delete</label>
                <input 
                  type="number" 
                  id="deleteId" 
                  value={idToDelete}
                  onChange={(e) => setIdToDelete(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" 
                  placeholder="Enter ID" 
                />
              </div>
              <button 
                onClick={handleDelete}
                className="w-full py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition duration-200"
              >
                <i className="material-icons align-middle mr-1" style={{ fontSize: '18px' }}>delete</i>
                Delete Auction
              </button>
            </div>
          </div>
        </div>
        
        {/* Database Results Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Database Results</h2>
            {loading && (
              <div className="text-blue-500">
                <i className="material-icons align-middle mr-1">hourglass_empty</i>
                <span>Loading...</span>
              </div>
            )}
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Price</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Retail Price</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bids</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Left</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {auctions.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                      {loading ? 'Loading...' : error ? `Error: ${error}` : 'Click "Retrieve All Auctions" to load data'}
                    </td>
                  </tr>
                ) : (
                  auctions.map(auction => (
                    <tr key={auction.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{auction.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{auction.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getCategoryBgColor(auction.category)}`}>
                          {auction.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${auction.currentBid?.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${auction.retailPrice?.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{auction.bidCount}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatTime(auction.timeRemaining)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          className="text-indigo-600 hover:text-indigo-900 mr-2"
                          onClick={() => handleEdit(auction.id)}
                        >
                          Edit
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-900"
                          onClick={() => {
                            setIdToDelete(auction.id.toString());
                            handleDelete();
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Status Messages */}
        {statusMessage && (
          <div className="fixed bottom-4 right-4 max-w-md">
            <div className={`p-4 rounded-lg shadow-lg mb-2 ${statusMessage.isError ? 'bg-red-500' : 'bg-green-500'} text-white`}>
              {statusMessage.message}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
