import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AuctionDetail from './components/AuctionDetail';
import Auctions from './components/Auctions';
import Equity from './components/Equity';
import Loans from './components/Loans';
import Home from './components/Home';
import Dashboard from './components/Dashboard'; // Add import for Dashboard

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auctions" element={<Auctions />} />
          <Route path="/auction-detail/:id" element={<AuctionDetail />} />
          <Route path="/equity" element={<Equity />} />
          <Route path="/loans" element={<Loans />} />
          <Route path="/dashboard" element={<Dashboard />} /> {/* Add route for Dashboard */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
