import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { toast } from 'react-hot-toast';

const TwitterAuth = ({ onAuthSuccess }) => {
  const { isConnected } = useAccount();
  const [isTwitterConnected, setIsTwitterConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [twitterUser, setTwitterUser] = useState(null);

  // Twitter OAuth configuration
  const TWITTER_CLIENT_ID = process.env.REACT_APP_TWITTER_CLIENT_ID;
  const TWITTER_REDIRECT_URI = process.env.REACT_APP_TWITTER_REDIRECT_URI;
  const TWITTER_SCOPE = 'tweet.read users.read offline.access';

  useEffect(() => {
    // Check if user is already authenticated with Twitter
    const checkTwitterAuth = async () => {
      try {
        const accessToken = localStorage.getItem('twitter_access_token');
        if (accessToken) {
          const userData = localStorage.getItem('twitter_user');
          if (userData) {
            const parsedUserData = JSON.parse(userData);
            setIsTwitterConnected(true);
            setTwitterUser(parsedUserData);
            onAuthSuccess?.(parsedUserData.username);
          }
        }
      } catch (error) {
        console.error('Error checking Twitter auth:', error);
      }
    };

    checkTwitterAuth();
  }, [onAuthSuccess]);

  const generateCodeVerifier = () => {
    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  };

  const generateCodeChallenge = async (verifier) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const hash = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode(...new Uint8Array(hash)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  };

  const handleTwitterConnect = async () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Generate and store code verifier
      const codeVerifier = generateCodeVerifier();
      localStorage.setItem('code_verifier', codeVerifier);
      
      // Generate code challenge
      const codeChallenge = await generateCodeChallenge(codeVerifier);
      
      // Generate random state
      const state = Math.random().toString(36).substring(2, 15);
      localStorage.setItem('twitter_state', state);

      // Generate Twitter OAuth URL
      const twitterAuthUrl = `https://twitter.com/i/oauth2/authorize?` +
        `response_type=code` +
        `&client_id=${TWITTER_CLIENT_ID}` +
        `&redirect_uri=${encodeURIComponent(TWITTER_REDIRECT_URI)}` +
        `&scope=${encodeURIComponent(TWITTER_SCOPE)}` +
        `&state=${state}` +
        `&code_challenge=${codeChallenge}` +
        `&code_challenge_method=S256`;

      // Redirect to Twitter OAuth page
      window.location.href = twitterAuthUrl;
    } catch (error) {
      console.error('Error initiating Twitter auth:', error);
      toast.error('Failed to connect to Twitter');
      setIsLoading(false);
    }
  };

  const handleTwitterDisconnect = async () => {
    try {
      localStorage.removeItem('twitter_access_token');
      localStorage.removeItem('twitter_refresh_token');
      localStorage.removeItem('twitter_user');
      setIsTwitterConnected(false);
      setTwitterUser(null);
      toast.success('Twitter account disconnected');
    } catch (error) {
      console.error('Error disconnecting Twitter:', error);
      toast.error('Failed to disconnect Twitter account');
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Twitter Account</h2>
        <div className={`flex items-center px-2 py-1 rounded-full text-xs ${
          isTwitterConnected ? 'bg-green-900/30 text-green-400' : 'bg-gray-800 text-gray-400'
        }`}>
          <div className={`w-2 h-2 rounded-full mr-1 ${
            isTwitterConnected ? 'bg-green-400' : 'bg-gray-500'
          }`}></div>
          {isTwitterConnected ? 'Connected' : 'Disconnected'}
        </div>
      </div>

      {isTwitterConnected ? (
        <div className="space-y-4">
          {twitterUser && (
            <div className="flex items-center space-x-3">
              <img 
                src={twitterUser.profile_image_url} 
                alt={twitterUser.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-white font-medium">{twitterUser.name}</p>
                <p className="text-gray-400 text-sm">@{twitterUser.username}</p>
              </div>
            </div>
          )}
          
          <button
            onClick={handleTwitterDisconnect}
            className="btn-outline w-full flex justify-center items-center"
          >
            <svg className="w-5 h-5 mr-2 text-twitter" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
            Disconnect Twitter
          </button>
        </div>
      ) : (
        <div>
          <p className="text-gray-400 mb-4">
            Connect your Twitter account to mint your tweets as NFTs, earn from your content, and build your Web3 presence.
          </p>
          
          <button
            onClick={handleTwitterConnect}
            disabled={isLoading}
            className="btn-twitter w-full flex justify-center items-center"
          >
            {isLoading ? (
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            )}
            {isLoading ? 'Connecting...' : 'Connect Twitter'}
          </button>
        </div>
      )}
    </div>
  );
};

export default TwitterAuth; 