import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { exchangeCodeForToken, getUserProfile } from '../api/twitter';

const TwitterCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the authorization code from URL
        const params = new URLSearchParams(location.search);
        const code = params.get('code');
        const error = params.get('error');

        if (error) {
          throw new Error(error);
        }

        if (!code) {
          throw new Error('No authorization code received');
        }

        // Exchange code for access token with retry logic
        let retryCount = 0;
        const maxRetries = 3;
        let tokenResponse;

        while (retryCount < maxRetries) {
          try {
            tokenResponse = await exchangeCodeForToken(code);
            break;
          } catch (error) {
            retryCount++;
            if (retryCount === maxRetries) {
              throw error;
            }
            // Wait for 1 second before retrying
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }
        
        // Store tokens
        localStorage.setItem('twitter_access_token', tokenResponse.access_token);
        if (tokenResponse.refresh_token) {
          localStorage.setItem('twitter_refresh_token', tokenResponse.refresh_token);
        }

        // Get user profile with retry logic
        retryCount = 0;
        let userProfile;

        while (retryCount < maxRetries) {
          try {
            userProfile = await getUserProfile(tokenResponse.access_token);
            break;
          } catch (error) {
            retryCount++;
            if (retryCount === maxRetries) {
              throw error;
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }
        
        // Store user data
        localStorage.setItem('twitter_user', JSON.stringify(userProfile.data));

        toast.success('Twitter account connected successfully!');
        navigate('/dashboard', { replace: true });
      } catch (error) {
        console.error('Error in Twitter callback:', error.message);
        toast.error(error.message || 'Failed to connect Twitter account');
        navigate('/dashboard', { replace: true });
      }
    };

    handleCallback();
  }, [location, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-twitter mx-auto mb-4"></div>
        <p className="text-gray-400">Connecting your Twitter account...</p>
      </div>
    </div>
  );
};

export default TwitterCallback; 