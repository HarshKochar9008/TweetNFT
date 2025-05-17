import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Helper function to handle rate limiting
const handleRateLimit = async (error) => {
  if (error.response?.status === 429) {
    const retryAfter = Math.min(error.response.data.retryAfter || 900, 900);
    console.log(`Rate limit exceeded. Retrying after ${retryAfter} seconds...`);
    await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
    return true;
  }
  return false;
};

// Helper function for retry logic
const withRetry = async (fn, maxRetries = 3) => {
  let retries = 0;
  while (true) {
    try {
      return await fn();
    } catch (error) {
      retries++;
      if (retries >= maxRetries) {
        throw error;
      }
      
      // Handle rate limiting
      if (await handleRateLimit(error)) {
        continue;
      }
      
      // Exponential backoff for other errors
      const backoffTime = Math.min(Math.pow(2, retries) * 1000, 30000); // Cap at 30 seconds
      console.log(`Retrying after ${backoffTime/1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, backoffTime));
    }
  }
};

// Get user profile
export const getUserProfile = async (username) => {
  return withRetry(async () => {
    const accessToken = localStorage.getItem('twitter_access_token');
    if (!accessToken) {
      throw new Error('No access token found');
    }

    const response = await axios.get(`${API_URL}/api/twitter/profile`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    return response.data;
  });
};

// Get user tweets
export const getUserTweets = async (userId, maxResults = 10) => {
  return withRetry(async () => {
    const accessToken = localStorage.getItem('twitter_access_token');
    if (!accessToken) {
      throw new Error('No access token found');
    }

    const response = await axios.get(`${API_URL}/api/twitter/tweets`, {
      params: {
        userId,
        maxResults
      },
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    return response.data;
  });
};

// Post a tweet
export const postTweet = async (text) => {
  return withRetry(async () => {
    const accessToken = localStorage.getItem('twitter_access_token');
    if (!accessToken) {
      throw new Error('No access token found');
    }

    const response = await axios.post(`${API_URL}/api/twitter/tweets`, 
      { text },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  });
};

// Get tweet details
export const getTweetDetails = async (tweetId) => {
  return withRetry(async () => {
    const accessToken = localStorage.getItem('twitter_access_token');
    if (!accessToken) {
      throw new Error('No access token found');
    }

    const response = await axios.get(`${API_URL}/api/twitter/tweets/${tweetId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    return response.data;
  });
}; 