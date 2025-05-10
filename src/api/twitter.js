import axios from 'axios';

const TWITTER_API_URL = 'https://api.twitter.com/2';
const TWITTER_CLIENT_ID = process.env.REACT_APP_TWITTER_CLIENT_ID;
const TWITTER_CLIENT_SECRET = process.env.REACT_APP_TWITTER_CLIENT_SECRET;
const TWITTER_REDIRECT_URI = process.env.REACT_APP_TWITTER_REDIRECT_URI;

// Exchange authorization code for access token
export const exchangeCodeForToken = async (code) => {
  try {
    const params = new URLSearchParams();
    params.append('code', code);
    params.append('grant_type', 'authorization_code');
    params.append('client_id', TWITTER_CLIENT_ID);
    params.append('redirect_uri', TWITTER_REDIRECT_URI);
    params.append('code_verifier', localStorage.getItem('code_verifier'));

    const response = await axios.post('https://api.twitter.com/2/oauth2/token', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${btoa(`${TWITTER_CLIENT_ID}:${TWITTER_CLIENT_SECRET}`)}`,
        'Access-Control-Allow-Origin': '*'
      },
      withCredentials: true
    });

    if (!response.data || !response.data.access_token) {
      throw new Error('Invalid response from Twitter API');
    }

    return response.data;
  } catch (error) {
    console.error('Error exchanging code for token:', error.response?.data || error.message);
    if (error.response?.status === 401) {
      throw new Error('Authentication failed. Please try again.');
    } else if (error.response?.status === 400) {
      throw new Error('Invalid request. Please check your credentials.');
    }
    throw new Error('Failed to connect to Twitter. Please try again later.');
  }
};

// Get user profile information
export const getUserProfile = async (accessToken) => {
  try {
    const response = await axios.get(`${TWITTER_API_URL}/users/me`, {
      params: {
        'user.fields': 'profile_image_url,description,public_metrics'
      },
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error.response?.data || error.message);
    throw error;
  }
};

// Verify if user is authenticated
export const verifyAuth = async () => {
  try {
    const accessToken = localStorage.getItem('twitter_access_token');
    if (!accessToken) {
      return { isAuthenticated: false };
    }

    const userProfile = await getUserProfile(accessToken);
    return {
      isAuthenticated: true,
      user: userProfile.data
    };
  } catch (error) {
    console.error('Error verifying auth:', error.response?.data || error.message);
    return { isAuthenticated: false };
  }
};

// Disconnect Twitter account
export const disconnectTwitter = async () => {
  try {
    localStorage.removeItem('twitter_access_token');
    localStorage.removeItem('twitter_refresh_token');
    return { success: true };
  } catch (error) {
    console.error('Error disconnecting Twitter:', error.response?.data || error.message);
    throw error;
  }
}; 