import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { toast } from 'react-hot-toast';
import TwitterAuth from '../components/TwitterAuth';
import NftCard from '../components/NftCard';

const Profile = () => {
  const { isConnected } = useAccount();
  const [activeTab, setActiveTab] = useState('nfts');
  const [socialTokenActive, setSocialTokenActive] = useState(false);
  const [showTokenForm, setShowTokenForm] = useState(false);
  const [isCreatingToken, setIsCreatingToken] = useState(false);
  
  // Mock data - in production this would come from API/blockchain
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
    }
  ];

  const statistics = {
    followers: 12500,
    totalEarnings: 2.45,
    totalTips: 0.85,
    nftSales: 1.60
  };
  
  const handleCreateSocialToken = (e) => {
    e.preventDefault();
    setIsCreatingToken(true);
    
    // Simulate token creation
    setTimeout(() => {
      setIsCreatingToken(false);
      setSocialTokenActive(true);
      setShowTokenForm(false);
      toast.success('Social token successfully created!');
    }, 2000);
  };

  if (!isConnected) {
    return (
      <div className="text-center py-20">
        <svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
        </svg>
        <h2 className="text-2xl font-bold text-white mb-2">Connect Your Wallet</h2>
        <p className="text-gray-400 mb-8">You need to connect your wallet to view your profile</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column */}
        <div className="w-full md:w-1/3 space-y-6">
          <TwitterAuth />
          
          <div className="card p-6">
            <h2 className="text-xl font-bold text-white mb-4">Creator Stats</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-dark-100 p-4 rounded-lg">
                <p className="text-gray-400 text-sm">Followers</p>
                <p className="text-white text-2xl font-bold">{statistics.followers.toLocaleString()}</p>
              </div>
              <div className="bg-dark-100 p-4 rounded-lg">
                <p className="text-gray-400 text-sm">Total Earnings</p>
                <p className="text-white text-2xl font-bold flex items-center">
                  <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
                    <path d="M12.9 15.5L12.9 14.5C14.28 14.3 15.01 13.24 15.04 12.12C15.07 10.82 14.04 9.9 12.38 9.65L12.1 9.61L12.1 7.5L11.1 7.5L11.1 9.5C10.85 9.5 10.59 9.51 10.32 9.53L10.32 10.53L11.1 10.5L11.1 14.5L10.33 14.5L10.33 15.5L12.9 15.5ZM11.1 10.5L11.1 13.5C10.11 13.45 9.64 12.78 9.65 12.05C9.64 11.35 10.11 10.66 11.1 10.5ZM12.1 13.5L12.1 10.6C13.09 10.75 13.55 11.42 13.55 12.06C13.54 12.8 13.08 13.45 12.1 13.5Z" fill="currentColor"/>
                  </svg>
                  {statistics.totalEarnings}
                </p>
              </div>
              <div className="bg-dark-100 p-4 rounded-lg">
                <p className="text-gray-400 text-sm">From Tips</p>
                <p className="text-white text-2xl font-bold flex items-center">
                  <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
                    <path d="M12.9 15.5L12.9 14.5C14.28 14.3 15.01 13.24 15.04 12.12C15.07 10.82 14.04 9.9 12.38 9.65L12.1 9.61L12.1 7.5L11.1 7.5L11.1 9.5C10.85 9.5 10.59 9.51 10.32 9.53L10.32 10.53L11.1 10.5L11.1 14.5L10.33 14.5L10.33 15.5L12.9 15.5ZM11.1 10.5L11.1 13.5C10.11 13.45 9.64 12.78 9.65 12.05C9.64 11.35 10.11 10.66 11.1 10.5ZM12.1 13.5L12.1 10.6C13.09 10.75 13.55 11.42 13.55 12.06C13.54 12.8 13.08 13.45 12.1 13.5Z" fill="currentColor"/>
                  </svg>
                  {statistics.totalTips}
                </p>
              </div>
              <div className="bg-dark-100 p-4 rounded-lg">
                <p className="text-gray-400 text-sm">From NFT Sales</p>
                <p className="text-white text-2xl font-bold flex items-center">
                  <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
                    <path d="M12.9 15.5L12.9 14.5C14.28 14.3 15.01 13.24 15.04 12.12C15.07 10.82 14.04 9.9 12.38 9.65L12.1 9.61L12.1 7.5L11.1 7.5L11.1 9.5C10.85 9.5 10.59 9.51 10.32 9.53L10.32 10.53L11.1 10.5L11.1 14.5L10.33 14.5L10.33 15.5L12.9 15.5ZM11.1 10.5L11.1 13.5C10.11 13.45 9.64 12.78 9.65 12.05C9.64 11.35 10.11 10.66 11.1 10.5ZM12.1 13.5L12.1 10.6C13.09 10.75 13.55 11.42 13.55 12.06C13.54 12.8 13.08 13.45 12.1 13.5Z" fill="currentColor"/>
                  </svg>
                  {statistics.nftSales}
                </p>
              </div>
            </div>
          </div>
          
          <div className="card p-6">
            <h2 className="text-xl font-bold text-white mb-4">Social Token</h2>
            
            {socialTokenActive ? (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-primary-600 to-twitter p-4 rounded-lg flex items-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-3">
                    <span className="text-primary-600 font-bold">$TWT</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">$TWT Token</p>
                    <p className="text-white/70 text-sm">Your social token is active!</p>
                  </div>
                </div>
                
                <div className="bg-dark-100 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-gray-400 text-sm">Current Price</p>
                    <p className="text-white font-medium">$0.42</p>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-gray-400 text-sm">Holders</p>
                    <p className="text-white font-medium">42</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-400 text-sm">Market Cap</p>
                    <p className="text-white font-medium">$4,200</p>
                  </div>
                </div>
                
                <button className="btn-primary w-full">Manage Token</button>
              </div>
            ) : showTokenForm ? (
              <form onSubmit={handleCreateSocialToken} className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm block mb-2">Token Name</label>
                  <input 
                    type="text"
                    placeholder="e.g., MyToken"
                    defaultValue="TwitterToken"
                    className="w-full bg-dark-100 text-white px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  />
                </div>
                
                <div>
                  <label className="text-gray-400 text-sm block mb-2">Token Symbol</label>
                  <input 
                    type="text"
                    placeholder="e.g., MTK"
                    defaultValue="TWT"
                    className="w-full bg-dark-100 text-white px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  />
                </div>
                
                <div>
                  <label className="text-gray-400 text-sm block mb-2">Initial Supply</label>
                  <input 
                    type="number"
                    placeholder="e.g., 10000"
                    defaultValue="10000"
                    className="w-full bg-dark-100 text-white px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  />
                </div>
                
                <div>
                  <label className="text-gray-400 text-sm block mb-2">Initial Price (USD)</label>
                  <input 
                    type="number"
                    placeholder="e.g., 0.1"
                    defaultValue="0.1"
                    step="0.01"
                    className="w-full bg-dark-100 text-white px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  />
                </div>
                
                <div className="flex space-x-3">
                  <button 
                    type="button" 
                    onClick={() => setShowTokenForm(false)}
                    className="btn-outline flex-1"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={isCreatingToken}
                    className="btn-primary flex-1 flex justify-center items-center"
                  >
                    {isCreatingToken ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating...
                      </>
                    ) : (
                      'Create Token'
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-400">
                  Launch your own social token to give your followers a way to support you and access exclusive perks.
                </p>
                <button 
                  onClick={() => setShowTokenForm(true)}
                  className="btn-primary w-full"
                >
                  Create Social Token
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Right Column - NFTs and Subscriptions */}
        <div className="w-full md:w-2/3">
          <div className="card">
            <div className="border-b border-gray-800 p-4">
              <div className="flex space-x-6">
                <button 
                  className={`pb-3 px-1 font-medium ${activeTab === 'nfts' ? 'text-twitter border-b-2 border-twitter' : 'text-gray-400 hover:text-white'}`}
                  onClick={() => setActiveTab('nfts')}
                >
                  My NFTs
                </button>
                <button 
                  className={`pb-3 px-1 font-medium ${activeTab === 'subscriptions' ? 'text-twitter border-b-2 border-twitter' : 'text-gray-400 hover:text-white'}`}
                  onClick={() => setActiveTab('subscriptions')}
                >
                  Exclusive Content
                </button>
              </div>
            </div>
            
            <div className="p-4">
              {activeTab === 'nfts' ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-white font-medium">Your NFT Collection</h3>
                    <button onClick={() => window.location.href = '/create'} className="text-twitter text-sm hover:underline flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                      Create New NFT
                    </button>
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
                    <h3 className="text-white font-medium">Exclusive Content for Subscribers</h3>
                    <button className="text-twitter text-sm hover:underline flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                      Add Content
                    </button>
                  </div>
                  
                  <div className="text-center py-12 border border-dashed border-gray-700 rounded-lg">
                    <svg className="w-12 h-12 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                    <h3 className="text-white font-medium mb-2">No Exclusive Content Yet</h3>
                    <p className="text-gray-400 max-w-md mx-auto">
                      Create your social token first to unlock the ability to offer exclusive content to your token holders and subscribers.
                    </p>
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

export default Profile; 