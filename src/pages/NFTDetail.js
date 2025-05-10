import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { toast } from 'react-hot-toast';

const NFTDetail = () => {
  const { id } = useParams();
  const { isConnected, address } = useAccount();
  const [bidAmount, setBidAmount] = useState('');
  const [isPlacingBid, setIsPlacingBid] = useState(false);

  // Mock NFT data - in production this would come from API/blockchain
  const nft = {
    id,
    title: 'Web3 is the Future!',
    description: "The future is decentralized. Web3 will change how we interact with the internet forever. This tweet captures the essence of the Web3 movement and the shift towards a more user-centric internet where individuals have control over their data and digital identity.",
    content: "Web3 is not just a technological evolution; it's a paradigm shift. The decentralized internet will return power to users and create new economic models. This is the future we're building together!",
    image: 'https://images.unsplash.com/photo-1639762681057-408e52192e55',
    price: 0.15,
    highestBid: 0.18,
    views: 423,
    likes: 56,
    created: 'July 12, 2023',
    tokenId: '42069',
    contractAddress: '0x1234...7890',
    blockchain: 'Ethereum',
    creator: {
      username: 'web3enthusiast',
      name: 'Web3 Enthusiast',
      address: '0xabc...def0',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      verified: true
    },
    owner: {
      username: 'cryptocollector',
      name: 'Crypto Collector',
      address: '0xfed...cba0',
      image: 'https://randomuser.me/api/portraits/women/29.jpg',
      verified: false
    },
    bidHistory: [
      { bidder: '0x123...456', amount: 0.18, time: '2 days ago' },
      { bidder: '0x789...012', amount: 0.16, time: '3 days ago' },
      { bidder: '0x345...678', amount: 0.15, time: '5 days ago' }
    ]
  };

  const handlePlaceBid = (e) => {
    e.preventDefault();
    
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }
    
    if (!bidAmount) {
      toast.error('Please enter a bid amount');
      return;
    }
    
    const bidValue = parseFloat(bidAmount);
    if (isNaN(bidValue)) {
      toast.error('Please enter a valid number');
      return;
    }
    
    if (bidValue <= nft.highestBid) {
      toast.error(`Bid must be higher than ${nft.highestBid} ETH`);
      return;
    }
    
    setIsPlacingBid(true);
    
    // Simulate bid transaction
    setTimeout(() => {
      setIsPlacingBid(false);
      toast.success(`Bid of ${bidAmount} ETH placed successfully!`);
      setBidAmount('');
    }, 2000);
  };

  const handleBuyNow = () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }
    
    toast.success('Purchase initiated! Check your wallet to confirm the transaction.');
  };

  return (
    <div className="space-y-8">
      {/* NFT Content */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column - Image */}
        <div className="w-full md:w-1/2">
          <div className="card p-3 overflow-hidden">
            <div className="relative">
              <img 
                src={nft.image} 
                alt={nft.title} 
                className="w-full rounded-lg"
              />
              <div className="absolute top-2 right-2 bg-dark-300/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center">
                <svg className="w-3 h-3 mr-1 text-twitter" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
                Tweet NFT
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-dark-100 rounded-lg">
              <p className="text-white mb-2">Original Tweet:</p>
              <div className="flex">
                <img 
                  src={nft.creator.image} 
                  alt={nft.creator.name} 
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <div className="flex items-center">
                    <p className="font-semibold text-white">{nft.creator.name}</p>
                    {nft.creator.verified && (
                      <svg className="w-4 h-4 ml-1 text-twitter" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5c-1.51 0-2.816.917-3.437 2.25-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
                      </svg>
                    )}
                    <p className="ml-2 text-gray-400">@{nft.creator.username}</p>
                  </div>
                  <p className="mt-1 text-white">{nft.content}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column - Details */}
        <div className="w-full md:w-1/2 space-y-6">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-white">{nft.title}</h1>
              <div className="flex space-x-2">
                <button className="p-2 bg-dark-100 rounded-full text-gray-400 hover:text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </button>
                <button className="p-2 bg-dark-100 rounded-full text-gray-400 hover:text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                  </svg>
                </button>
              </div>
            </div>
            
            <p className="text-gray-400 mb-6">
              {nft.description}
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-gray-400 text-sm mb-1">Creator</p>
                <div className="flex items-center">
                  <img 
                    src={nft.creator.image} 
                    alt={nft.creator.name} 
                    className="w-6 h-6 rounded-full mr-2"
                  />
                  <span className="text-white">@{nft.creator.username}</span>
                </div>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Owner</p>
                <div className="flex items-center">
                  <img 
                    src={nft.owner.image} 
                    alt={nft.owner.name} 
                    className="w-6 h-6 rounded-full mr-2"
                  />
                  <span className="text-white">@{nft.owner.username}</span>
                </div>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Blockchain</p>
                <p className="text-white">{nft.blockchain}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Token ID</p>
                <p className="text-white font-mono">{nft.tokenId}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Created</p>
                <p className="text-white">{nft.created}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Views</p>
                <p className="text-white">{nft.views}</p>
              </div>
            </div>
            
            <div className="border-t border-gray-800 pt-4 mb-6">
              <div className="flex justify-between mb-2">
                <p className="text-gray-400">Price</p>
                <p className="text-white font-bold flex items-center">
                  <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
                    <path d="M12.9 15.5L12.9 14.5C14.28 14.3 15.01 13.24 15.04 12.12C15.07 10.82 14.04 9.9 12.38 9.65L12.1 9.61L12.1 7.5L11.1 7.5L11.1 9.5C10.85 9.5 10.59 9.51 10.32 9.53L10.32 10.53L11.1 10.5L11.1 14.5L10.33 14.5L10.33 15.5L12.9 15.5ZM11.1 10.5L11.1 13.5C10.11 13.45 9.64 12.78 9.65 12.05C9.64 11.35 10.11 10.66 11.1 10.5ZM12.1 13.5L12.1 10.6C13.09 10.75 13.55 11.42 13.55 12.06C13.54 12.8 13.08 13.45 12.1 13.5Z" fill="currentColor"/>
                  </svg>
                  {nft.price} ETH
                </p>
              </div>
              <div className="flex justify-between mb-4">
                <p className="text-gray-400">Highest Bid</p>
                <p className="text-white font-bold flex items-center">
                  <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
                    <path d="M12.9 15.5L12.9 14.5C14.28 14.3 15.01 13.24 15.04 12.12C15.07 10.82 14.04 9.9 12.38 9.65L12.1 9.61L12.1 7.5L11.1 7.5L11.1 9.5C10.85 9.5 10.59 9.51 10.32 9.53L10.32 10.53L11.1 10.5L11.1 14.5L10.33 14.5L10.33 15.5L12.9 15.5ZM11.1 10.5L11.1 13.5C10.11 13.45 9.64 12.78 9.65 12.05C9.64 11.35 10.11 10.66 11.1 10.5ZM12.1 13.5L12.1 10.6C13.09 10.75 13.55 11.42 13.55 12.06C13.54 12.8 13.08 13.45 12.1 13.5Z" fill="currentColor"/>
                  </svg>
                  {nft.highestBid} ETH
                </p>
              </div>
              
              {address === nft.owner.address ? (
                <div className="space-y-3">
                  <button 
                    onClick={() => toast.success('Listing updated successfully!')}
                    className="btn-primary w-full"
                  >
                    Update Listing
                  </button>
                  <button 
                    onClick={() => toast.success('NFT removed from marketplace!')}
                    className="btn-outline w-full"
                  >
                    Remove from Sale
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <button 
                    onClick={handleBuyNow}
                    className="btn-primary w-full"
                  >
                    Buy Now for {nft.price} ETH
                  </button>
                  
                  <form onSubmit={handlePlaceBid} className="flex space-x-2">
                    <div className="relative flex-1">
                      <input 
                        type="text"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        placeholder={`Min bid: ${nft.highestBid + 0.01} ETH`}
                        className="w-full bg-dark-100 text-white pl-9 pr-4 py-2 rounded-lg border border-gray-800 focus:outline-none focus:ring-1 focus:ring-primary-500"
                      />
                      <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
                        <path d="M12.9 15.5L12.9 14.5C14.28 14.3 15.01 13.24 15.04 12.12C15.07 10.82 14.04 9.9 12.38 9.65L12.1 9.61L12.1 7.5L11.1 7.5L11.1 9.5C10.85 9.5 10.59 9.51 10.32 9.53L10.32 10.53L11.1 10.5L11.1 14.5L10.33 14.5L10.33 15.5L12.9 15.5ZM11.1 10.5L11.1 13.5C10.11 13.45 9.64 12.78 9.65 12.05C9.64 11.35 10.11 10.66 11.1 10.5ZM12.1 13.5L12.1 10.6C13.09 10.75 13.55 11.42 13.55 12.06C13.54 12.8 13.08 13.45 12.1 13.5Z" fill="currentColor"/>
                      </svg>
                    </div>
                    <button 
                      type="submit"
                      disabled={isPlacingBid}
                      className="btn-outline px-4 flex items-center"
                    >
                      {isPlacingBid ? (
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        'Place Bid'
                      )}
                    </button>
                  </form>
                </div>
              )}
            </div>
            
            <a 
              href={`https://etherscan.io/token/${nft.contractAddress}?a=${nft.tokenId}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-twitter text-sm hover:underline flex items-center justify-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
              View on Etherscan
            </a>
          </div>
          
          <div className="card p-6">
            <h2 className="text-xl font-bold text-white mb-4">Bid History</h2>
            
            {nft.bidHistory.length > 0 ? (
              <div className="space-y-3">
                {nft.bidHistory.map((bid, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-gray-800 last:border-0">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-dark-100 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-mono text-sm">{bid.bidder}</p>
                        <p className="text-gray-400 text-xs">{bid.time}</p>
                      </div>
                    </div>
                    <div className="text-white font-medium flex items-center">
                      <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
                        <path d="M12.9 15.5L12.9 14.5C14.28 14.3 15.01 13.24 15.04 12.12C15.07 10.82 14.04 9.9 12.38 9.65L12.1 9.61L12.1 7.5L11.1 7.5L11.1 9.5C10.85 9.5 10.59 9.51 10.32 9.53L10.32 10.53L11.1 10.5L11.1 14.5L10.33 14.5L10.33 15.5L12.9 15.5ZM11.1 10.5L11.1 13.5C10.11 13.45 9.64 12.78 9.65 12.05C9.64 11.35 10.11 10.66 11.1 10.5ZM12.1 13.5L12.1 10.6C13.09 10.75 13.55 11.42 13.55 12.06C13.54 12.8 13.08 13.45 12.1 13.5Z" fill="currentColor"/>
                      </svg>
                      {bid.amount} ETH
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center py-4">No bids placed yet.</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex justify-center">
        <Link to="/marketplace" className="text-twitter hover:underline flex items-center">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Marketplace
        </Link>
      </div>
    </div>
  );
};

export default NFTDetail; 