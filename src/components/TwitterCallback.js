import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { getUserProfile } from '../api/twitter';

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

        const codeVerifier = localStorage.getItem('code_verifier');
        if (!codeVerifier) {
          throw new Error('No code verifier found. Please try connecting again.');
        }

        const redirectUri = process.env.REACT_APP_TWITTER_REDIRECT_URI;
        if (!redirectUri) {
          throw new Error('Twitter redirect URI not configured');
        }

        // Exchange code for access token with retry logic
        let retryCount = 0;
        const maxRetries = 3;
        let tokenData;

        while (retryCount < maxRetries) {
          try {
            const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
            const tokenResponse = await fetch(`${apiUrl}/api/twitter/token`, {
              method: 'POST',
              headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              credentials: 'include',
              body: JSON.stringify({
                code,
                redirect_uri: redirectUri,
                code_verifier: codeVerifier
              }),
            });
            
            const responseData = await tokenResponse.json();
            
            if (!tokenResponse.ok) {
              throw new Error(responseData.message || `HTTP error! Status: ${tokenResponse.status}`);
            }
            
            tokenData = responseData;
            break;
          } catch (error) {
            retryCount++;
            if (retryCount === maxRetries) {
              throw new Error(`Failed to exchange code for token: ${error.message}`);
            }
            await new Promise(resolve => setTimeout(resolve, 1000 * retryCount)); // Exponential backoff
          }
        }
        
        if (!tokenData || !tokenData.access_token) {
          throw new Error('No access token received from server');
        }
        
        // Store tokens
        localStorage.setItem('twitter_access_token', tokenData.access_token);
        if (tokenData.refresh_token) {
          localStorage.setItem('twitter_refresh_token', tokenData.refresh_token);
        }

        // Store user data if provided in the token response
        if (tokenData.user) {
          localStorage.setItem('twitter_user', JSON.stringify(tokenData.user));
        } else {
          // If user data wasn't included in token response, fetch it
          const userProfile = await getUserProfile(tokenData.access_token);
          localStorage.setItem('twitter_user', JSON.stringify(userProfile.data));
        }

        // Clear the code verifier as it's no longer needed
        localStorage.removeItem('code_verifier');

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