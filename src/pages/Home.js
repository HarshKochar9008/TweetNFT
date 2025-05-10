import React from 'react';
import { Link } from 'react-router-dom';
import { useAccount, useConnect } from 'wagmi';

const Home = () => {
  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();

  const features = [
    {
      title: 'Tweet to NFT',
      description: 'Transform your viral tweets into valuable NFTs that can be bought, sold, and traded on our marketplace.',
      icon: (
        <svg className="w-6 h-6 text-twitter" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      )
    },
    {
      title: 'Creator Economy',
      description: 'Earn rewards when your tweet NFTs are traded on the marketplace. Start monetizing your social media presence today.',
      icon: (
        <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      )
    },
    {
      title: 'Social Tokens',
      description: 'Launch your own social token to give your followers a way to support you and access exclusive perks.',
      icon: (
        <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
      )
    },
    {
      title: 'Trending Tweets',
      description: 'Discover and collect the most viral and influential tweets from around the Twitter ecosystem.',
      icon: (
        <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
        </svg>
      )
    }
  ];

  return (
    <div className="space-y-20 py-8">
      {/* Hero Section */}
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
        <div className="lg:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Turn Your Best Tweets into <span className="bg-gradient-to-r from-primary-400 to-twitter bg-clip-text text-transparent">Valuable NFTs</span>
          </h1>
          <p className="text-gray-400 text-lg">
            TweetNFT is the premier platform for Twitter users to tokenize their best content, build their Web3 presence, and earn rewards from their social media influence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            {isConnected ? (
              <Link to="/create" className="btn-primary px-6 py-3 font-medium text-center">
                Start Creating
              </Link>
            ) : (
              <button 
                onClick={() => connect({ connector: connectors[0] })} 
                className="btn-primary px-6 py-3 font-medium text-center"
              >
                Connect Wallet
              </button>
            )}
            <Link to="/marketplace" className="btn-outline px-6 py-3 font-medium text-center">
              Explore Marketplace
            </Link>
          </div>
        </div>
        <div className="lg:w-1/2">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-twitter/20 rounded-lg blur-xl"></div>
            <div className="relative  rounded-lg overflow-hidden p-1">
              <img 
                src="/X-home.png" 
                alt="Tweet NFT Platform" 
                className="rounded-lg w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">How TweetNFT Works</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our platform makes it easy to transform your Twitter presence into Web3 assets
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card p-6 flex items-start">
              <div className="mr-4 bg-dark-100 p-3 rounded-lg">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-twitter/80"></div>
        <div className="relative p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Web3 Journey?</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of Twitter creators who are already monetizing their content through NFTs and building their presence in the decentralized web.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isConnected ? (
              <Link to="/dashboard" className="bg-white text-dark-300 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium">
                Go to Dashboard
              </Link>
            ) : (
              <button 
                onClick={() => connect({ connector: connectors[0] })} 
                className="bg-white text-dark-300 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium"
              >
                Connect Wallet
              </button>
            )}
            <Link to="/marketplace" className="bg-dark-300/30 backdrop-blur-sm text-white hover:bg-dark-300/50 px-6 py-3 rounded-lg font-medium border border-white/20">
              Browse NFTs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 