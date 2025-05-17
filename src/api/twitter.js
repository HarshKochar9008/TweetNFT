import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Get user profile information
export const getUserProfile = async (accessToken) => {
  try {
    const response = await axios.get(`${API_URL}/api/twitter/profile`, {
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
    localStorage.removeItem('twitter_user');
    return { success: true };
  } catch (error) {
    console.error('Error disconnecting Twitter:', error.response?.data || error.message);
    throw error;
  }
}; 