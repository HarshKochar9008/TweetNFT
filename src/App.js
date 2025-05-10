import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { WagmiConfig } from 'wagmi';
import { config } from './wagmi';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import TweetToNFT from './pages/TweetToNFT';
import Marketplace from './pages/Marketplace';
import Profile from './pages/Profile';
import NFTDetail from './pages/NFTDetail';
import TwitterCallback from './components/TwitterCallback';

function App() {
  return (
    <WagmiConfig config={config}>
      <div className="flex flex-col min-h-screen bg-dark-300">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8 mt-16 fade-in">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create" element={<TweetToNFT />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/nft/:id" element={<NFTDetail />} />
            <Route path="/twitter/callback" element={<TwitterCallback />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </WagmiConfig>
  );
}

export default App;
