require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { TwitterApi } = require('twitter-api-v2');

const app = express();
const port = process.env.PORT || 5000;

// Simple in-memory cache
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Rate limiting
const rateLimits = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 450; // Twitter's rate limit for user timeline

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
};

app.use(cors(corsOptions));
app.use(express.json());

// Rate limiting middleware
const rateLimiter = (req, res, next) => {
  const accessToken = req.headers.authorization?.split(' ')[1];
  if (!accessToken) {
    return next();
  }

  const now = Date.now();
  const userLimits = rateLimits.get(accessToken) || { count: 0, resetTime: now + RATE_LIMIT_WINDOW };

  // Reset counter if window has passed
  if (now > userLimits.resetTime) {
    userLimits.count = 0;
    userLimits.resetTime = now + RATE_LIMIT_WINDOW;
  }

  // Check if rate limit exceeded
  if (userLimits.count >= MAX_REQUESTS) {
    const retryAfter = Math.ceil((userLimits.resetTime - now) / 1000);
    return res.status(429).json({
      message: 'Rate limit exceeded',
      retryAfter: Math.min(retryAfter, 900), // Cap at 15 minutes
      resetTime: new Date(userLimits.resetTime).toISOString()
    });
  }

  // Increment counter
  userLimits.count++;
  rateLimits.set(accessToken, userLimits);

  // Add rate limit headers
  res.setHeader('X-RateLimit-Limit', MAX_REQUESTS);
  res.setHeader('X-RateLimit-Remaining', MAX_REQUESTS - userLimits.count);
  res.setHeader('X-RateLimit-Reset', userLimits.resetTime);

  next();
};

// Cache middleware
const cacheMiddleware = (duration = CACHE_TTL) => {
  return (req, res, next) => {
    const key = `${req.method}-${req.originalUrl}-${req.headers.authorization}`;
    const cachedResponse = cache.get(key);

    if (cachedResponse && Date.now() - cachedResponse.timestamp < duration) {
      return res.json(cachedResponse.data);
    }

    // Store original res.json
    const originalJson = res.json;
    res.json = function(data) {
      cache.set(key, {
        data,
        timestamp: Date.now()
      });
      return originalJson.call(this, data);
    };

    next();
  };
};

// Apply rate limiting to all routes
app.use(rateLimiter);

// Twitter token exchange endpoint
app.post('/api/twitter/token', async (req, res) => {
  try {
    const { code, redirect_uri, code_verifier } = req.body;

    if (!code || !redirect_uri || !code_verifier) {
      return res.status(400).json({ 
        message: 'Missing required parameters',
        details: { code: !code, redirect_uri: !redirect_uri, code_verifier: !code_verifier }
      });
    }

    // Create Twitter client with client credentials
    const client = new TwitterApi({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
    });

    try {
      // Exchange code for tokens
      const { accessToken, refreshToken } = await client.loginWithOAuth2({
        code,
        codeVerifier: code_verifier,
        redirectUri: redirect_uri,
      });

      // Create a new client with the access token
      const userClient = new TwitterApi(accessToken);

      // Get user profile
      const userProfile = await userClient.v2.me({
        'user.fields': ['profile_image_url', 'description', 'public_metrics']
      });

      // Return tokens and user data
      res.json({
        access_token: accessToken,
        refresh_token: refreshToken,
        user: userProfile.data
      });
    } catch (error) {
      console.error('Twitter API error:', error);
      // Check for specific Twitter API errors
      if (error.code === 'ECONNREFUSED') {
        return res.status(503).json({ message: 'Twitter API is currently unavailable' });
      }
      if (error.data?.errors) {
        return res.status(400).json({ 
          message: 'Twitter API error',
          details: error.data.errors
        });
      }
      throw error;
    }
  } catch (error) {
    console.error('Token exchange error:', error);
    res.status(500).json({ 
      message: error.message || 'Failed to exchange code for token',
      details: error.data || error
    });
  }
});

// Get user profile endpoint
app.get('/api/twitter/profile', cacheMiddleware(), async (req, res) => {
  try {
    const accessToken = req.headers.authorization?.split(' ')[1];
    
    if (!accessToken) {
      return res.status(401).json({ message: 'No access token provided' });
    }

    const client = new TwitterApi(accessToken);
    const userProfile = await client.v2.me({
      'user.fields': ['profile_image_url', 'description', 'public_metrics']
    });

    res.json(userProfile);
  } catch (error) {
    console.error('Profile fetch error:', error);
    if (error.code === 429) {
      const retryAfter = Math.min(error.rateLimit?.reset || 900, 900);
      return res.status(429).json({
        message: 'Rate limit exceeded',
        retryAfter
      });
    }
    res.status(500).json({ 
      message: error.message || 'Failed to fetch user profile'
    });
  }
});

// Get user tweets endpoint
app.get('/api/twitter/tweets', cacheMiddleware(60 * 1000), async (req, res) => {
  try {
    const accessToken = req.headers.authorization?.split(' ')[1];
    const { userId, maxResults = 10 } = req.query;
    
    if (!accessToken) {
      return res.status(401).json({ message: 'No access token provided' });
    }

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const client = new TwitterApi(accessToken);
    const tweets = await client.v2.userTimeline(userId, {
      max_results: maxResults,
      'tweet.fields': ['created_at', 'public_metrics', 'text']
    });

    res.json(tweets);
  } catch (error) {
    console.error('Tweets fetch error:', error);
    if (error.code === 429) {
      const retryAfter = Math.min(error.rateLimit?.reset || 900, 900);
      return res.status(429).json({
        message: 'Rate limit exceeded',
        retryAfter
      });
    }
    res.status(500).json({ 
      message: error.message || 'Failed to fetch tweets'
    });
  }
});

// Post tweet endpoint
app.post('/api/twitter/tweets', async (req, res) => {
  try {
    const accessToken = req.headers.authorization?.split(' ')[1];
    const { text } = req.body;
    
    if (!accessToken) {
      return res.status(401).json({ message: 'No access token provided' });
    }

    if (!text) {
      return res.status(400).json({ message: 'Tweet text is required' });
    }

    const client = new TwitterApi(accessToken);
    const tweet = await client.v2.tweet(text);

    res.json(tweet);
  } catch (error) {
    console.error('Tweet post error:', error);
    if (error.code === 429) {
      const retryAfter = Math.min(error.rateLimit?.reset || 900, 900);
      return res.status(429).json({
        message: 'Rate limit exceeded',
        retryAfter
      });
    }
    res.status(500).json({ 
      message: error.message || 'Failed to post tweet'
    });
  }
});

// Get tweet details endpoint
app.get('/api/twitter/tweets/:tweetId', cacheMiddleware(60 * 1000), async (req, res) => {
  try {
    const accessToken = req.headers.authorization?.split(' ')[1];
    const { tweetId } = req.params;
    
    if (!accessToken) {
      return res.status(401).json({ message: 'No access token provided' });
    }

    const client = new TwitterApi(accessToken);
    const tweet = await client.v2.singleTweet(tweetId, {
      'tweet.fields': ['created_at', 'public_metrics', 'text', 'author_id']
    });

    res.json(tweet);
  } catch (error) {
    console.error('Tweet details fetch error:', error);
    if (error.code === 429) {
      const retryAfter = Math.min(error.rateLimit?.reset || 900, 900);
      return res.status(429).json({
        message: 'Rate limit exceeded',
        retryAfter
      });
    }
    res.status(500).json({ 
      message: error.message || 'Failed to fetch tweet details'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 