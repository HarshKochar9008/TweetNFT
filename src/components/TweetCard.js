import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const TweetCard = ({ tweet }) => {
  const [isMinting, setIsMinting] = useState(false);
  const [isMinted, setIsMinted] = useState(false);

  const handleMintNFT = () => {
    setIsMinting(true);
    // Simulate minting process
    setTimeout(() => {
      setIsMinting(false);
      setIsMinted(true);
      toast.success('Tweet successfully minted as NFT!');
    }, 2000);
  };

  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="card overflow-hidden hover:shadow-card transition-all duration-300 group">
      <div className="absolute inset-x-0 -top-px h-0.5 bg-gradient-to-r from-transparent via-twitter to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="p-6">
        <div className="flex items-start mb-4">
          <div className="mr-3 relative">
            <img 
              src={tweet.author.profile_image_url} 
              alt={tweet.author.username} 
              className="w-12 h-12 rounded-full border-2 border-dark-100 object-cover"
            />
            <div className="absolute -bottom-1 -right-1 bg-twitter rounded-full w-5 h-5 flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center flex-wrap">
              <p className="font-semibold text-white mr-2">{tweet.author.name}</p>
              <div className="flex items-center text-gray-400 text-sm">
                <span>@{tweet.author.username}</span>
                <span className="mx-2 text-gray-500">·</span>
                <span>{formatDate(tweet.created_at)}</span>
              </div>
              <div className="ml-auto">
                <svg className="w-5 h-5 text-twitter" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </div>
            </div>
            
            <div className="mt-3">
              <p className="text-white leading-relaxed text-base">{tweet.text}</p>
            </div>
            
            {tweet.attachments?.media && (
              <div className="mt-4 rounded-xl overflow-hidden border border-gray-800">
                <img 
                  src={tweet.attachments.media[0].url} 
                  alt="Tweet media" 
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            )}
            
            <div className="mt-4 flex items-center space-x-6">
              <div className="flex items-center group cursor-pointer">
                <div className="p-1.5 rounded-full group-hover:bg-blue-500/10 group-hover:text-blue-400 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                  </svg>
                </div>
                <span className="ml-1 group-hover:text-blue-400">{tweet.public_metrics.reply_count}</span>
              </div>
              
              <div className="flex items-center group cursor-pointer">
                <div className="p-1.5 rounded-full group-hover:bg-green-500/10 group-hover:text-green-400 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                </div>
                <span className="ml-1 group-hover:text-green-400">{tweet.public_metrics.retweet_count}</span>
              </div>
              
              <div className="flex items-center group cursor-pointer">
                <div className="p-1.5 rounded-full group-hover:bg-red-500/10 group-hover:text-red-400 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </div>
                <span className="ml-1 group-hover:text-red-400">{tweet.public_metrics.like_count}</span>
              </div>
              
              <div className="flex items-center text-xs bg-dark-100 px-2.5 py-1 rounded-full">
                <svg className="w-3 h-3 mr-1 text-primary-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                {tweet.public_metrics.impression_count || "1.2K"}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-6 pb-6">
        {isMinted ? (
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <div className="flex items-center text-green-400">
              <div className="mr-3 w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
              </div>
              <div>
                <div className="font-medium">NFT Successfully Minted</div>
                <div className="text-xs text-green-400/70 mt-0.5">Transaction hash: 0x3f5...a2e1</div>
              </div>
            </div>
            <button className="btn-primary text-sm px-4 py-2 w-full sm:w-auto flex items-center justify-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
              View on Marketplace
            </button>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="text-sm bg-dark-300/70 px-3 py-1.5 rounded-lg flex items-center">
                <svg className="w-4 h-4 mr-1.5 text-twitter" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
                <span className="font-medium">Tweet ID:</span>
                <span className="ml-1">{tweet.id}</span>
              </div>
              
              <div className="hidden sm:flex text-sm px-3 py-1.5 rounded-lg bg-dark-300/70 items-center space-x-1">
                <span className="inline-block w-2 h-2 rounded-full bg-green-400"></span>
                <span className="text-green-400 font-medium">Eligible for NFT</span>
              </div>
            </div>
            
            <button 
              onClick={handleMintNFT} 
              disabled={isMinting}
              className="btn-twitter text-sm px-4 py-2 w-full sm:w-auto flex items-center justify-center"
            >
              {isMinting ? (
                <>
                  <svg className="animate-spin -ml-0.5 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Minting NFT...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.947 8.305a6.53 6.53 0 0 1-1.622.88 3.06 3.06 0 0 0-5.135-2.76 3.06 3.06 0 0 0-.884 2.12c-2.329-.18-4.518-1.205-5.949-3.019a3.06 3.06 0 0 0 .948 4.083 3.06 3.06 0 0 1-1.386-.384v.039a3.06 3.06 0 0 0 2.455 2.999 3.06 3.06 0 0 1-1.383.052 3.06 3.06 0 0 0 2.856 2.123 6.13 6.13 0 0 1-3.81 1.314c-.246 0-.49-.014-.73-.043A8.68 8.68 0 0 0 12 15.966c5.045 0 7.83-4.18 7.83-7.83 0-.12-.002-.24-.008-.356A5.55 5.55 0 0 0 21 6.47c-.5.221-1.04.371-1.607.442a2.62 2.62 0 0 0 1.156-1.454 5.31 5.31 0 0 1-1.78.702 2.598 2.598 0 0 0-4.42 2.37 7.4 7.4 0 0 1-5.373-2.727 2.6 2.6 0 0 0 .803 3.464 2.6 2.6 0 0 1-1.176-.323v.032a2.6 2.6 0 0 0 2.082 2.544 2.6 2.6 0 0 1-1.174.044 2.6 2.6 0 0 0 2.431 1.806 5.23 5.23 0 0 1-3.858 1.077A7.37 7.37 0 0 0 12 14.83c4.6 0 7.13-3.81 7.13-7.13z" strokeWidth="0"></path>
                  </svg>
                  <span>Mint as NFT</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TweetCard; 