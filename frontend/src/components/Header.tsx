import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<{ name: string } | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setIsLoggedIn(true);
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  return (
    <header className="bg-white px-8 py-4 border-b border-gray-100 flex justify-between items-center">
      <div className="flex items-center">
        <Link to="/" className="text-2xl font-bold text-primary mr-2">Launchbid</Link>
        <div className="bg-blue-100 text-primary text-xs px-2 py-1 rounded-full">BETA</div>
      </div>
      <nav className="hidden md:flex space-x-6">
        <Link 
          to="/auctions" 
          className={`${location.pathname === '/auctions' ? 'text-black font-medium' : 'text-black opacity-70 hover:opacity-100'}`}
        >
          Auctions
        </Link>
        <Link 
          to="/equity" 
          className={`${location.pathname === '/equity' ? 'text-black font-medium' : 'text-black opacity-70 hover:opacity-100'}`}
        >
          Equity
        </Link>
        <Link 
          to="/loans" 
          className={`${location.pathname === '/loans' ? 'text-black font-medium' : 'text-black opacity-70 hover:opacity-100'}`}
        >
          Loans
        </Link>
        <Link 
          to="/dashboard" 
          className={`${location.pathname === '/dashboard' ? 'text-black font-medium' : 'text-black opacity-70 hover:opacity-100'}`}
        >
          Dashboard
        </Link>
      </nav>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <i className="material-icons" style={{ fontSize: '20px' }}>shopping_bag</i>
          <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">2</span>
        </div>
        <div className="relative">
          <i className="material-icons" style={{ fontSize: '20px' }}>notifications</i>
          <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">5</span>
        </div>
        <div className="flex items-center">
          <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80" alt="Profile" className="w-8 h-8 rounded-full" />
          <span className="ml-2 text-black">{isLoggedIn && userData ? userData.name : 'Guest'}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
