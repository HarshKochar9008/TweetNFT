import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { toast } from 'react-hot-toast';
import TweetCard from '../components/TweetCard';
import TwitterAuth from '../components/TwitterAuth';

const TweetToNFT = () => {
  const { isConnected } = useAccount();
  const [tweetUrl, setTweetUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tweets, setTweets] = useState([]);

  // Mock data - in production this would come from Twitter API
  const mockTweets = [
    {
      id: '1675183492001972225',
      name: 'Web3 User',
      username: 'twitteruser',
      profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
      date: 'Jul 1, 2023',
      content: "Web3 is not just a technological evolution; it's a paradigm shift. The decentralized internet will return power to users and create new economic models. This is the future we're building together!",
      image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7',
      likes: 2543,
      retweets: 876,
      comments: 145
    },
    {
      id: '1674829103847362694',
      name: 'Web3 User',
      username: 'twitteruser',
      profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
      date: 'Jun 30, 2023',
      content: "NFTs are more than just digital art. They're the fundamental building blocks of digital ownership in the metaverse. We're still early, but the potential is limitless.",
      image: '',
      likes: 1876,
      retweets: 542,
      comments: 97
    },
    {
      id: '1673715042947385346',
      name: 'Web3 User',
      username: 'twitteruser',
      profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
      date: 'Jun 27, 2023',
      content: 'Just finished a deep dive into Ethereum scaling solutions. Layer 2s like Optimism and Arbitrum are game-changers. The future is bright for web3 usability!',
      image: 'https://images.unsplash.com/photo-1639762681057-408e52192e55',
      likes: 3412,
      retweets: 1203,
      comments: 256
    }
  ];

  const handleFetchTweet = (e) => {
    e.preventDefault();
    
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }
    
    if (!tweetUrl) {
      toast.error('Please enter a valid tweet URL');
      return;
    }
    
    // Check if URL is from Twitter
    if (!tweetUrl.includes('twitter.com') && !tweetUrl.includes('x.com')) {
      toast.error('Please enter a valid Twitter URL');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      
      // Extract tweet ID from URL
      const tweetId = tweetUrl.split('/').pop().split('?')[0];
      
      // Find the tweet in our mock data
      const foundTweet = mockTweets.find(t => t.id === tweetId);
      
      if (foundTweet) {
        if (!tweets.some(t => t.id === foundTweet.id)) {
          setTweets(prevTweets => [foundTweet, ...prevTweets]);
          toast.success('Tweet found and ready to mint!');
        } else {
          toast.error('This tweet has already been added');
        }
      } else {
        // If no exact match found, just show the first mock tweet
        if (tweets.length === 0) {
          setTweets([mockTweets[0]]);
          toast.success('Tweet found and ready to mint!');
        } else {
          toast.error('Tweet not found. Please try another URL.');
        }
      }
    }, 1500);
  };

  const handleLoadMyTweets = () => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      setTweets(mockTweets);
      toast.success('Your tweets have been loaded!');
    }, 1500);
  };

  if (!isConnected) {
    return (
      <div className="text-center py-20">
        <svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
        </svg>
        <h2 className="text-2xl font-bold text-white mb-2">Connect Your Wallet</h2>
        <p className="text-gray-400 mb-8">You need to connect your wallet to create Tweet NFTs</p>
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
            <h2 className="text-xl font-bold text-white mb-4">NFT Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm block mb-2">Royalty Percentage</label>
                <div className="flex items-center">
                  <input 
                    type="range" 
                    min="0" 
                    max="10"
                    defaultValue="5"
                    className="w-full h-2 bg-dark-100 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="ml-2 text-white min-w-[30px] text-right">5%</span>
                </div>
              </div>
              
              <div>
                <label className="text-gray-400 text-sm block mb-2">Network</label>
                <select className="w-full bg-dark-100 text-white px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-1 focus:ring-primary-500">
                  <option>Ethereum</option>
                  <option>Polygon</option>
                  <option>Optimism</option>
                  <option>Arbitrum</option>
                  <option>Base</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="card p-6">
            <h2 className="text-xl font-bold text-white mb-4">Find Tweet</h2>
            <form onSubmit={handleFetchTweet} className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm block mb-2">Tweet URL</label>
                <input 
                  type="text"
                  value={tweetUrl}
                  onChange={(e) => setTweetUrl(e.target.value)}
                  placeholder="https://twitter.com/username/status/1675183492001972225"
                  className="w-full bg-dark-100 text-white px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>
              
              <button 
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full flex justify-center items-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Fetching Tweet...
                  </>
                ) : (
                  'Fetch Tweet'
                )}
              </button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-dark-200 text-gray-400">or</span>
                </div>
              </div>
              
              <button 
                type="button"
                onClick={handleLoadMyTweets}
                disabled={isLoading}
                className="btn-twitter w-full flex justify-center items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
                Load My Tweets
              </button>
            </form>
          </div>
        </div>
        
        {/* Right Column - Tweets */}
        <div className="w-full md:w-2/3">
          <div className="card p-6">
            <h2 className="text-xl font-bold text-white mb-4">Tweet Selection</h2>
            {tweets.length > 0 ? (
              <div className="space-y-6">
                {tweets.map((tweet) => (
                  <TweetCard key={tweet.id} tweet={tweet} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border border-dashed border-gray-700 rounded-lg">
                <svg className="w-12 h-12 text-gray-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
                <h3 className="text-white font-medium mb-2">No Tweets Selected</h3>
                <p className="text-gray-400 max-w-md mx-auto">
                  Enter a Tweet URL to fetch a specific Tweet, or click "Load My Tweets" to browse your recent tweets.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetToNFT; 