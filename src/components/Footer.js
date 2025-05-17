import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark-100 border-t border-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center">
              <div className="w-10 h-10 flex items-center justify-center">
                <img src="/logo.png" alt="TweetNFT" className="w-full h-full object-cover text-shadow-lg shadow-primary-500/50" />
              </div>
              <span className="ml-2 text-xl font-bold gradient-text font-poppins bg-gradient-to-r from-primary-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                TweetNFT
              </span>
            </div>
            <p className="mt-4 text-gray-400 text-sm leading-relaxed">
              The ultimate platform for Twitter users to tokenize their best tweets, 
              create digital collectibles, and earn from their social media presence.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="https://x.com/tweet_nft31409" target="_blank" rel="noopener noreferrer" 
                className="w-10 h-10 flex items-center justify-center bg-dark-200 hover:bg-twitter text-gray-400 hover:text-white rounded-full transition-all duration-300">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="https://github.com/HarshKochar9008/TweetNFT" target="_blank" rel="noopener noreferrer" 
                className="w-10 h-10 flex items-center justify-center bg-dark-200 hover:bg-gray-700 text-gray-400 hover:text-white rounded-full transition-all duration-300">
                <span className="sr-only">GitHub</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-medium text-lg mb-5 font-poppins">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'Marketplace', path: '/marketplace' },
                { name: 'Create NFT', path: '/create' },
                { name: 'Dashboard', path: '/dashboard' },
                { name: 'My Profile', path: '/profile' }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-gray-400 hover:text-white text-sm transition-colors flex items-center group"
                  >
                    <span className="w-2 h-2 bg-primary-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium text-lg mb-5 font-poppins">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to our newsletter for the latest updates and news.
            </p>
            <div className="relative">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-3 bg-dark-200 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 border border-gray-700"
              />
              <button className="absolute right-1.5 top-1.5 bg-primary-600 hover:bg-primary-700 text-white px-4 py-1.5 rounded-lg transition-colors text-sm font-medium">
                Subscribe
              </button>
            </div>
            
          </div>
        </div>
        
        <div className="mt-10 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} TweetNFT. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 