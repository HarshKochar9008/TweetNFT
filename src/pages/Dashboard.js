import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAccount } from 'wagmi';
import TwitterAuth from '../components/TwitterAuth';
import NftCard from '../components/NftCard';

const Dashboard = () => {
  const { isConnected, address } = useAccount();
  const [activeTab, setActiveTab] = useState('nfts');

  // Mock data - in a real app, this would come from API calls
  const userStats = {
    nftsCreated: 12,
    nftsSold: 7,
    totalEarnings: 1.45,
    followers: 235
  };

  const userNfts = [
    {
      id: '1',
      title: 'Web3 is the Future!',
      description: 'The future is decentralized. Web3 will change how we interact with the internet forever.',
      image: 'https://images.unsplash.com/photo-1639762681057-408e52192e55',
      price: 0.15,
      views: 423,
      creator: {
        username: 'twitteruser',
        image: 'https://randomuser.me/api/portraits/men/32.jpg'
      }
    },
    {
      id: '2',
      title: 'NFTs are more than just JPEGs',
      description: "NFTs are the fundamental building blocks of the new creator economy. They're not just expensive images.",
      image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e',
      price: 0.08,
      views: 219,
      creator: {
        username: 'twitteruser',
        image: 'https://randomuser.me/api/portraits/men/32.jpg'
      }
    },
    {
      id: '3',
      title: 'Crypto Market Analysis',
      description: 'My thoughts on the current market conditions and where we might be headed in the coming months.',
      image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040',
      price: 0.24,
      views: 567,
      creator: {
        username: 'twitteruser',
        image: 'https://randomuser.me/api/portraits/men/32.jpg'
      }
    }
  ];

  const transactions = [
    {
      id: 'tx1',
      type: 'Sale',
      nftTitle: 'Web3 is the Future!',
      amount: 0.15,
      timestamp: '2 days ago',
      buyer: '0x1a2...3b4c'
    },
    {
      id: 'tx2',
      type: 'Mint',
      nftTitle: 'NFTs are more than just JPEGs',
      amount: 0.01,
      timestamp: '4 days ago',
      buyer: '-'
    },
    {
      id: 'tx3',
      type: 'Sale',
      nftTitle: 'The Future of Social Media',
      amount: 0.2,
      timestamp: '1 week ago',
      buyer: '0xab1...c23d'
    }
  ];

  if (!isConnected) {
    return (
      <div className="text-center py-20">
        <svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
        </svg>
        <h2 className="text-2xl font-bold text-white mb-2">Connect Your Wallet</h2>
        <p className="text-gray-400 mb-8">You need to connect your wallet to view your dashboard</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Left Column - Profile and Stats */}
        <div className="w-full md:w-1/3 space-y-6">
          <TwitterAuth />
          
          <div className="card p-6">
            <h2 className="text-xl font-bold text-white mb-4">Your Stats</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-dark-100 p-4 rounded-lg">
                <p className="text-gray-400 text-sm">NFTs Created</p>
                <p className="text-white text-2xl font-bold">{userStats.nftsCreated}</p>
              </div>
              <div className="bg-dark-100 p-4 rounded-lg">
                <p className="text-gray-400 text-sm">NFTs Sold</p>
                <p className="text-white text-2xl font-bold">{userStats.nftsSold}</p>
              </div>
              <div className="bg-dark-100 p-4 rounded-lg">
                <p className="text-gray-400 text-sm">Total Earnings</p>
                <p className="text-white text-2xl font-bold flex items-center">
                  <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
                    <path d="M12.9 15.5L12.9 14.5C14.28 14.3 15.01 13.24 15.04 12.12C15.07 10.82 14.04 9.9 12.38 9.65L12.1 9.61L12.1 7.5L11.1 7.5L11.1 9.5C10.85 9.5 10.59 9.51 10.32 9.53L10.32 10.53L11.1 10.5L11.1 14.5L10.33 14.5L10.33 15.5L12.9 15.5ZM11.1 10.5L11.1 13.5C10.11 13.45 9.64 12.78 9.65 12.05C9.64 11.35 10.11 10.66 11.1 10.5ZM12.1 13.5L12.1 10.6C13.09 10.75 13.55 11.42 13.55 12.06C13.54 12.8 13.08 13.45 12.1 13.5Z" fill="currentColor"/>
                  </svg>
                  {userStats.totalEarnings}
                </p>
              </div>
              <div className="bg-dark-100 p-4 rounded-lg">
                <p className="text-gray-400 text-sm">Followers</p>
                <p className="text-white text-2xl font-bold">{userStats.followers}</p>
              </div>
            </div>
            
            <div className="mt-6">
              <p className="text-gray-400 text-sm mb-2">Wallet Address</p>
              <div className="bg-dark-100 p-3 rounded-lg flex items-center justify-between">
                <p className="text-white text-sm font-mono truncate">
                  {address}
                </p>
                <button className="text-gray-400 hover:text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="mt-6">
              <Link to="/create" className="btn-twitter w-full flex justify-center items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
                Create New Tweet NFT
              </Link>
            </div>
          </div>
        </div>
        
        {/* Right Column - NFTs and Transactions */}
        <div className="w-full md:w-2/3">
          <div className="card">
            <div className="border-b border-gray-800 p-4">
              <div className="flex space-x-6">
                <button 
                  className={`pb-3 px-1 font-medium ${activeTab === 'nfts' ? 'text-twitter border-b-2 border-twitter' : 'text-gray-400 hover:text-white'}`}
                  onClick={() => setActiveTab('nfts')}
                >
                  Your NFTs
                </button>
                <button 
                  className={`pb-3 px-1 font-medium ${activeTab === 'transactions' ? 'text-twitter border-b-2 border-twitter' : 'text-gray-400 hover:text-white'}`}
                  onClick={() => setActiveTab('transactions')}
                >
                  Transactions
                </button>
              </div>
            </div>
            
            <div className="p-4">
              {activeTab === 'nfts' ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-white font-medium">Your NFT Collection</h3>
                    <Link to="/marketplace" className="text-twitter text-sm hover:underline">
                      View All
                    </Link>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {userNfts.map(nft => (
                      <NftCard key={nft.id} nft={nft} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-white font-medium">Recent Transactions</h3>
                    <button className="text-twitter text-sm hover:underline">
                      Export CSV
                    </button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-gray-400 text-sm">
                          <th className="pb-3 pl-4">Type</th>
                          <th className="pb-3">NFT</th>
                          <th className="pb-3">Amount</th>
                          <th className="pb-3">Buyer</th>
                          <th className="pb-3 pr-4">Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.map(tx => (
                          <tr key={tx.id} className="border-t border-gray-800 hover:bg-dark-100">
                            <td className="py-3 pl-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                tx.type === 'Sale' ? 'bg-green-900/30 text-green-400' : 'bg-blue-900/30 text-blue-400'
                              }`}>
                                {tx.type}
                              </span>
                            </td>
                            <td className="py-3 text-white">
                              {tx.nftTitle}
                            </td>
                            <td className="py-3">
                              <div className="flex items-center text-white">
                                <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
                                  <path d="M12.9 15.5L12.9 14.5C14.28 14.3 15.01 13.24 15.04 12.12C15.07 10.82 14.04 9.9 12.38 9.65L12.1 9.61L12.1 7.5L11.1 7.5L11.1 9.5C10.85 9.5 10.59 9.51 10.32 9.53L10.32 10.53L11.1 10.5L11.1 14.5L10.33 14.5L10.33 15.5L12.9 15.5ZM11.1 10.5L11.1 13.5C10.11 13.45 9.64 12.78 9.65 12.05C9.64 11.35 10.11 10.66 11.1 10.5ZM12.1 13.5L12.1 10.6C13.09 10.75 13.55 11.42 13.55 12.06C13.54 12.8 13.08 13.45 12.1 13.5Z" fill="currentColor"/>
                                </svg>
                                {tx.amount}
                              </div>
                            </td>
                            <td className="py-3 text-gray-400 font-mono text-sm">
                              {tx.buyer}
                            </td>
                            <td className="py-3 pr-4 text-gray-400 text-sm">
                              {tx.timestamp}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 