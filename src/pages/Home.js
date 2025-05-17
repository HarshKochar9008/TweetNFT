import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAccount, useConnect } from 'wagmi';

const Home = () => {
  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();

  // Parallax state for hero image
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  // Hover state for feature cards
  const [hoveredCard, setHoveredCard] = useState(null);
  // Scroll position state
  const [scrollY, setScrollY] = useState(0);

  // Parallax handler
  const handleHeroMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30; // max 15deg
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 30;
    setParallax({ x, y });
  };
  
  // Scroll handler for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      title: 'Tweet to NFT',
      description: 'Transform your viral tweets into valuable NFTs that can be bought, sold, and traded on our marketplace.',
      icon: (
        <svg className="w-7 h-7 text-twitter" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      )
    },
    {
      title: 'Creator Economy',
      description: 'Earn rewards when your tweet NFTs are traded on the marketplace. Start monetizing your social media presence today.',
      icon: (
        <svg className="w-7 h-7 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      )
    },
    {
      title: 'Social Tokens',
      description: 'Launch your own social token to give your followers a way to support you and access exclusive perks.',
      icon: (
        <svg className="w-7 h-7 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
      )
    },
    {
      title: 'Trending Tweets',
      description: 'Discover and collect the most viral and influential tweets from around the Twitter ecosystem.',
      icon: (
        <svg className="w-7 h-7 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
        </svg>
      )
    }
  ];

  return (
    <div className="space-y-24 py-8">
      {/* Hero Section */}
      <div
        className="min-h-[90vh] flex flex-col-reverse lg:flex-row items-center justify-between gap-10 relative"
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={() => setParallax({ x: 0, y: 0 })}
      >
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-primary-500/20 rounded-full filter blur-3xl opacity-50 animate-float"></div>
          <div className="absolute top-40 -right-20 w-72 h-72 bg-twitter/20 rounded-full filter blur-3xl opacity-50 animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute -bottom-20 left-1/3 w-72 h-72 bg-purple-500/20 rounded-full filter blur-3xl opacity-50 animate-float" style={{animationDelay: '4s'}}></div>
        </div>
        
        <div className="lg:w-1/2 space-y-8 z-10" style={{transform: `translateY(${scrollY * 0.1}px)`}}>
          <div className="inline-block px-4 py-1.5 bg-dark-200/80 backdrop-blur-sm rounded-full text-sm font-medium text-primary-400 border border-primary-500/20">
            Web3 × Twitter
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
            Turn Your Best Tweets into <br />
            <span className="bg-gradient-to-r from-primary-400 to-twitter bg-clip-text text-transparent animate-gradient bg-300">
              Valuable NFTs
            </span>
          </h1>
          <p className="text-gray-300 text-xl max-w-xl leading-relaxed">
            TweetNFT is the premier platform for Twitter users to tokenize their best content, build their Web3 presence, and earn rewards from their social media influence.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 pt-6">
            {isConnected ? (
              <Link to="/create" className="btn-primary px-8 py-4 font-medium text-center rounded-full bg-gradient-to-r from-primary-600 to-twitter hover:shadow-xl hover:shadow-primary-500/20 hover:from-primary-500 hover:to-twitter/90 transition-all duration-300 text-white">
                Start Creating
              </Link>
            ) : (
              <button 
                onClick={() => connect({ connector: connectors[0] })} 
                className="btn-primary px-8 py-4 font-medium text-center rounded-full bg-gradient-mix hover:shadow-xl hover:shadow-primary-500/20 hover:from-primary-500 hover:to-twitter/90 transition-all duration-300 text-white"
              >
                Connect Wallet
              </button>
            )}
            <Link to="/marketplace" className="btn-outline px-8 py-4 font-medium text-center rounded-full border-2 border-gray-700 text-white hover:border-primary-500/50 hover:bg-dark-200/50 transition-all duration-300">
              Explore Marketplace
            </Link>
          </div>
        </div>
        <div className="lg:w-1/2 z-10">
          <div className="relative w-2/12 lg:w-3/4 mx-auto h-96 bottom-20">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-twitter/20 rounded-2xl blur-2xl"></div>
            <div
              className="relative rounded-2xl overflow-hidden p-2 bg-dark-200/50 backdrop-blur-sm border border-gray-700/50 shadow-2xl"
              style={{
                transform: `perspective(1000px) rotateY(${-parallax.x}deg) rotateX(${parallax.y}deg) scale(1.02)`,
                transition: 'transform 0.2s cubic-bezier(0.4,0,0.2,1)',
                willChange: 'transform',
              }}
            >
              <img 
                src="/X-home.png" 
                alt="Tweet NFT Platform" 
                className="rounded-xl w-full"
              />
              <div className="absolute inset-0 rounded-xl border border-white/5"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-10">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 bg-dark-200/80 backdrop-blur-sm rounded-full text-sm font-medium text-primary-400 border border-primary-500/20 mb-4">
            Platform Features
          </div>
          <h2 className="text-4xl font-bold text-white mb-6">How TweetNFT Works</h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Our platform makes it easy to transform your Twitter presence into Web3 assets
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group card p-8 flex flex-col items-start transition-all duration-300 rounded-2xl bg-dark-200/50 backdrop-blur-sm border border-gray-800 hover:border-primary-500/30 ${hoveredCard === index ? 'scale-105 shadow-2xl' : ''}`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                zIndex: hoveredCard === index ? 2 : 1,
                transform: `translateY(${scrollY * 0.02 * (index % 2 ? 1 : -1)}px)`
              }}
            >
              <div className="p-4 mb-5 rounded-2xl bg-gradient-to-br from-dark-100 to-dark-200 border border-gray-700/30 group-hover:from-primary-600/10 group-hover:to-twitter/10 group-hover:border-primary-500/20 transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-300 text-lg leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative overflow-hidden rounded-3xl mb-10">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/90 to-twitter/90"></div>
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-twitter rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-primary-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        
        <div className="relative p-12 md:p-16 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Your Web3 Journey?</h2>
          <p className="text-white/90 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
            Join thousands of Twitter creators who are already monetizing their content through NFTs and building their presence in the decentralized web.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            {isConnected ? (
              <Link to="/dashboard" className="bg-white text-dark-300 hover:bg-gray-100 px-8 py-4 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                Go to Dashboard
              </Link>
            ) : (
              <button 
                onClick={() => connect({ connector: connectors[0] })} 
                className="bg-white text-dark-300 hover:bg-gray-100 px-8 py-4 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Connect Wallet
              </button>
            )}
            <Link to="/marketplace" className="bg-dark-300/30 backdrop-blur-sm text-white hover:bg-dark-300/50 px-8 py-4 rounded-full font-medium border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
              Browse NFTs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 