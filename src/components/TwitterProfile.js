import React, { useState, useEffect } from 'react';
import { getUserProfile, getUserTweets } from '../services/twitterService';

const TwitterProfile = ({ username }) => {
  const [profile, setProfile] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const userProfile = await getUserProfile(username);
        setProfile(userProfile);
        
        if (userProfile.data) {
          const userTweets = await getUserTweets(userProfile.data.id, 100);
          setTweets(userTweets.data || []);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchProfile();
    }
  }, [username]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div>No profile found</div>;

  const avatar = profile.data.profile_image_url || '';

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-white mb-2">Profile Stats</h2>
        {profile.data.public_metrics && (
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-gray-400 w-full">
            <div>Followers: <span className="text-white font-bold">{profile.data.public_metrics.followers_count}</span></div>
            <div>Following: <span className="text-white font-bold">{profile.data.public_metrics.following_count}</span></div>
            <div>Tweets: <span className="text-white font-bold">{profile.data.public_metrics.tweet_count}</span></div>
            <div>Listed: <span className="text-white font-bold">{profile.data.public_metrics.listed_count}</span></div>
          </div>
        )}
        {profile.data.description && (
          <div className="mt-2 text-gray-300">{profile.data.description}</div>
        )}
      </div>
      
      {/* <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recent Tweets</h3>
        {tweets.map((tweet) => (
          <div key={tweet.id} className="border p-4 rounded-lg">
            <p>{tweet.text}</p>
            <p className="text-sm text-gray-500">
              {new Date(tweet.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default TwitterProfile; 