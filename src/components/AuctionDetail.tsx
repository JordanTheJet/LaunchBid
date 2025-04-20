import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import * as ethers from 'ethers';

// Define the interface for the item component props
interface ItemProps {
  itemName: string;
  itemDescription: string;
  itemDetails: {
    [key: string]: {
      icon: string;
      title: string;
      description: string;
    };
  };
  companyName: string;
  companyLocation: string;
  companySummary: string;
  currentAuctionPrice: number;
  auctionTimeLeft: string;
  retailPrice: number;
  numberOfBids: number;
}

// Default props for development and testing
const defaultProps: ItemProps = {
  itemName: "Wireless Earbuds Pro",
  itemDescription: "Premium noise-canceling earbuds with spatial audio and adaptive EQ. Industry-leading battery life of up to 30 hours with the charging case. Water and sweat resistant for all your adventures.",
  itemDetails: {
    noiseCancellation: {
      icon: "sensors",
      title: "Active Noise Cancellation",
      description: "Industry-leading noise cancellation adapts to your environment in real-time."
    },
    batteryLife: {
      icon: "battery_full",
      title: "Battery Life",
      description: "Up to 8 hours of listening time, 30 hours with charging case."
    },
    waterResistance: {
      icon: "water_drop",
      title: "Water Resistance",
      description: "IPX4 rated for sweat and water resistance during workouts or in light rain."
    },
    spatialAudio: {
      icon: "surround_sound",
      title: "Spatial Audio",
      description: "Dynamic head tracking for an immersive, theater-like sound experience."
    }
  },
  companyName: "SoundCore Tech",
  companyLocation: "San Francisco, CA",
  companySummary: "SoundCore Tech is redefining audio experiences with their innovative approach to sound engineering and sustainable manufacturing.",
  currentAuctionPrice: 5.00,
  auctionTimeLeft: "30s",
  retailPrice: 179.99,
  numberOfBids: 1
};

const AuctionDetail: React.FC = () => {
  // State variables
  const [item, setItem] = useState<ItemProps>(defaultProps);
  const [socket, setSocket] = useState<any>(null);
  const [bidHistory, setBidHistory] = useState<Array<{
    bidderWallet: string;
    newBid: number;
    time: string;
  }>>([
    {
      bidderWallet: "Initial Bid",
      newBid: 5.00,
      time: "00:00"
    }
  ]);
  const [isAuctionEnded, setIsAuctionEnded] = useState<boolean>(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [walletConnected, setWalletConnected] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string>("");

  // Connect to socket.io when component mounts
  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);

    // Listen for timer updates
    newSocket.on('timerUpdate', (data: { timeRemaining: string }) => {
      setItem(prev => ({ ...prev, auctionTimeLeft: `${data.timeRemaining}s` }));
    });

    // Listen for auction end event
    newSocket.on('auctionEnded', (data: { winner: string }) => {
      setIsAuctionEnded(true);
      setWinner(data.winner);
    });

    // Listen for new bids
    newSocket.on('newBid', (data: { 
      newBidPrice: number;
      bidderWallet: string;
      bidCount: number;
    }) => {
      // Update item state with new bid info
      setItem(prev => ({
        ...prev,
        currentAuctionPrice: data.newBidPrice,
        numberOfBids: data.bidCount
      }));

      // Add bid to history
      const now = new Date();
      const timeString = now.getHours() + ":" + now.getMinutes().toString().padStart(2, '0');
      
      setBidHistory(prev => [
        {
          bidderWallet: data.bidderWallet || "Anonymous",
          newBid: data.newBidPrice,
          time: timeString
        },
        ...prev
      ]);
    });

    // Cleanup on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Connect wallet function
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const address = accounts[0];
        setWalletAddress(address);
        setWalletConnected(true);
        window.currentWallet = address;
      } catch (error) {
        console.error('User denied account access', error);
      }
    } else {
      alert("Please install MetaMask to use this feature.");
    }
  };

  // Disconnect wallet function
  const disconnectWallet = () => {
    setWalletAddress("");
    setWalletConnected(false);
    window.currentWallet = null;
  };

  // Place bid function
  const placeBid = async () => {
    if (!walletConnected) {
      alert("Please connect your wallet first.");
      return;
    }
    
    // Calculate the new bid amount
    let newBid = item.currentAuctionPrice + 0.01; // new bid in USDT
    let bidFeeEth = (newBid * 0.0005).toFixed(6);
    
    const companyWallet = "0x4b19581c2bA3e781f834b25C11D81A590AfACEA4"; // Company wallet hard coded
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const tx = {
        from: walletAddress,
        to: companyWallet,
        value: ethers.utils.parseEther(bidFeeEth)
      };
      
      const transactionResponse = await signer.sendTransaction(tx);
      console.log("Transaction sent:", transactionResponse.hash);
      
      // Notify backend of the bid
      await fetch('/api/placeBid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bidAmount: 0.01,  // fixed increment for the auction
          bidderWallet: walletAddress,
          txHash: transactionResponse.hash
        })
      });
      
      // Bid placement handled by server and broadcast back via socket events
    } catch (error) {
      console.error("Error sending transaction:", error);
      alert("Error placing bid. Please try again.");
    }
  };

  return (
    <div className="bg-white">
      {/* Connect/Disconnect Wallet Section */}
      <div className="p-4 bg-gray-50 rounded-xl my-4 mx-8 flex items-center">
        {!walletConnected ? (
          <button 
            onClick={connectWallet}
            className="py-2 px-4 bg-green-500 rounded text-white mr-4"
          >
            Connect Wallet
          </button>
        ) : (
          <>
            <button 
              onClick={disconnectWallet}
              className="py-2 px-4 bg-red-500 rounded text-white mr-4"
            >
              Disconnect Wallet
            </button>
            <button 
              onClick={connectWallet}
              className="py-2 px-4 bg-blue-500 rounded text-white mr-4"
            >
              Reselect Wallet
            </button>
            <span className="text-black font-medium">{walletAddress}</span>
          </>
        )}
      </div>

      {/* Timer Display Section */}
      <div className="p-4 bg-gray-50 rounded-xl my-4 mx-8 text-center">
        {!isAuctionEnded ? (
          <div className="text-4xl font-bold text-red-500">Time Remaining: {item.auctionTimeLeft}</div>
        ) : (
          <div>
            <div className="winner-banner text-4xl font-bold text-green-600">Auction Ended!</div>
            <div className="text-2xl text-blue-600">Winner: {winner}</div>
          </div>
        )}
      </div>

      {/* Main Auction Content */}
      <div className="flex h-full">
        {/* Left Section: Product Details */}
        <div className="w-2/3 p-8">
          <div className="flex items-center mb-6">
            <Link to="/auctions" className="mr-4 flex items-center text-black opacity-70">
              <i className="material-icons mr-1" style={{ fontSize: '18px' }}>arrow_back</i>
              Back to Auctions
            </Link>
            <span className="text-xs bg-blue-100 text-primary px-2 py-1 rounded-full">TECH</span>
          </div>

          <div className="flex mb-8">
            <div className="w-1/2 pr-8">
              <div className="w-full h-80 rounded-xl overflow-hidden mb-4">
                <img src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt={item.itemName} className="w-full h-full object-cover" />
              </div>
              <div className="grid grid-cols-4 gap-2">
                <div className="cursor-pointer rounded-lg overflow-hidden border-2 border-primary">
                  <img src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Earbuds thumbnail" className="w-full h-16 object-cover" />
                </div>
                <div className="cursor-pointer rounded-lg overflow-hidden border border-gray-200">
                  <img src="https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Earbuds thumbnail" className="w-full h-16 object-cover" />
                </div>
                <div className="cursor-pointer rounded-lg overflow-hidden border border-gray-200">
                  <img src="https://images.unsplash.com/photo-1584670747947-3dc98b4c7ca2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Earbuds thumbnail" className="w-full h-16 object-cover" />
                </div>
                <div className="cursor-pointer rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center bg-gray-100">
                  <i className="material-icons text-gray-400">play_circle_filled</i>
                </div>
              </div>
            </div>

            <div className="w-1/2">
              <div className="flex items-center mb-4">
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center mr-2">
                  <i className="material-icons mr-1" style={{ fontSize: '12px' }}>schedule</i>
                  Ending Soon
                </span>
                <span className="bg-purple-100 text-accent text-xs px-2 py-1 rounded-full">
                  {item.numberOfBids} {item.numberOfBids === 1 ? 'bid' : 'bids'}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-black mb-2">{item.itemName}</h1>
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-4">
                  <span className="text-yellow-400 mr-1">★★★★★</span>
                  <span className="text-black opacity-70 text-sm">4.9</span>
                </div>
                <span className="text-black opacity-70 text-sm">By <span className="text-black font-medium">{item.companyName}</span></span>
              </div>

              <p className="text-black opacity-70 mb-6">
                {item.itemDescription}
              </p>

              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-black opacity-70">Retail Price</div>
                  <div className="text-black font-semibold">${item.retailPrice.toFixed(2)}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-primary font-medium">Current Bid</div>
                  <div className="text-2xl font-bold text-black">
                    ${item.currentAuctionPrice.toFixed(2)} USDT / {(item.currentAuctionPrice * 0.0005).toFixed(5)} ETH
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button 
                  onClick={placeBid}
                  disabled={isAuctionEnded}
                  className={`flex-1 py-3 rounded-xl text-white font-medium ${isAuctionEnded ? 'bg-gray-400' : 'bg-primary'}`}
                >
                  <i className="material-icons mr-2" style={{ verticalAlign: 'middle' }}>gavel</i>
                  Place Bid (will bid ${(item.currentAuctionPrice + 0.01).toFixed(2)})
                </button>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold text-black mb-4">Product Details</h2>
            <div className="grid grid-cols-2 gap-6">
              {Object.entries(item.itemDetails).map(([key, detail]) => (
                <div key={key} className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center mb-3">
                    <i className="material-icons text-primary mr-2">{detail.icon}</i>
                    <h3 className="font-medium text-black">{detail.title}</h3>
                  </div>
                  <p className="text-black opacity-70 text-sm">{detail.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-black mb-4">About the Startup</h2>
            <div className="flex">
              <img src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt={item.companyName} className="w-16 h-16 rounded-xl object-cover mr-4" />
              <div>
                <h3 className="font-medium text-black">{item.companyName}</h3>
                <p className="text-black opacity-70 text-sm mb-2">Founded in 2021 • {item.companyLocation}</p>
                <p className="text-black opacity-70 text-sm">{item.companySummary}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Bid History & Related Auctions */}
        <div className="w-1/3 border-l border-gray-100 p-8">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-black mb-4">Bid History</h2>
            <div className="bid-history-list max-h-80 overflow-y-auto pr-2">
              {bidHistory.map((bid, index) => (
                <div key={index} className="bid-entry flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center">
                    <img src="https://via.placeholder.com/32" alt="Bidder" className="w-8 h-8 rounded-full mr-3" />
                    <div className="text-black">{bid.bidderWallet}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-black">${bid.newBid.toFixed(2)} USDT</div>
                    {bid.time && <div className="text-black opacity-60 text-xs">{bid.time}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-black mb-4">Related Auctions</h2>
            <div className="space-y-4">
              <div className="flex rounded-xl overflow-hidden shadow-sm border border-gray-100">
                <img src="https://images.unsplash.com/photo-1547949003-9792a18a2601?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Portable Speaker" className="w-20 h-20 object-cover" />
                <div className="p-3 flex-1">
                  <h3 className="text-black font-medium">Portable Bluetooth Speaker</h3>
                  <div className="flex justify-between mt-1">
                    <div className="text-primary font-medium">$9.64</div>
                    <div className="text-black opacity-60 text-xs">04:23:59</div>
                  </div>
                </div>
              </div>
              <div className="flex rounded-xl overflow-hidden shadow-sm border border-gray-100">
                <img src="https://images.unsplash.com/photo-1575311373937-040b8e1fd6b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Fitness Tracker" className="w-20 h-20 object-cover" />
                <div className="p-3 flex-1">
                  <h3 className="text-black font-medium">Smart Fitness Tracker</h3>
                  <div className="flex justify-between mt-1">
                    <div className="text-primary font-medium">$8.75</div>
                    <div className="text-black opacity-60 text-xs">03:45:01</div>
                  </div>
                </div>
              </div>
              <div className="flex rounded-xl overflow-hidden shadow-sm border border-gray-100">
                <img src="https://images.unsplash.com/photo-1517231925375-bf2cb42917a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Smart Coffee Maker" className="w-20 h-20 object-cover" />
                <div className="p-3 flex-1">
                  <h3 className="text-black font-medium">Smart Coffee Maker</h3>
                  <div className="flex justify-between mt-1">
                    <div className="text-primary font-medium">$5.42</div>
                    <div className="text-black opacity-60 text-xs">05:12:37</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionDetail;
