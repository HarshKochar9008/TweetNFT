import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark-100 border-t border-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center">
              <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-primary-500 to-twitter rounded-xl shadow-glow">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.947 8.305a6.53 6.53 0 0 1-1.622.88 3.06 3.06 0 0 0-5.135-2.76 3.06 3.06 0 0 0-.884 2.12c-2.329-.18-4.518-1.205-5.949-3.019a3.06 3.06 0 0 0 .948 4.083 3.06 3.06 0 0 1-1.386-.384v.039a3.06 3.06 0 0 0 2.455 2.999 3.06 3.06 0 0 1-1.383.052 3.06 3.06 0 0 0 2.856 2.123 6.13 6.13 0 0 1-3.81 1.314c-.246 0-.49-.014-.73-.043A8.68 8.68 0 0 0 12 15.966c5.045 0 7.83-4.18 7.83-7.83 0-.12-.002-.24-.008-.356A5.55 5.55 0 0 0 21 6.47c-.5.221-1.04.371-1.607.442a2.62 2.62 0 0 0 1.156-1.454 5.31 5.31 0 0 1-1.78.702 2.598 2.598 0 0 0-4.42 2.37 7.4 7.4 0 0 1-5.373-2.727 2.6 2.6 0 0 0 .803 3.464 2.6 2.6 0 0 1-1.176-.323v.032a2.6 2.6 0 0 0 2.082 2.544 2.6 2.6 0 0 1-1.174.044 2.6 2.6 0 0 0 2.431 1.806 5.23 5.23 0 0 1-3.858 1.077A7.37 7.37 0 0 0 12 14.83c4.6 0 7.13-3.81 7.13-7.13z" />
                </svg>
              </div>
              <span className="ml-2 text-xl font-bold gradient-text font-poppins">
                TweetNFT
              </span>
            </div>
            <p className="mt-4 text-gray-400 text-sm leading-relaxed">
              The ultimate platform for Twitter users to tokenize their best tweets, 
              create digital collectibles, and earn from their social media presence.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                className="w-10 h-10 flex items-center justify-center bg-dark-200 hover:bg-twitter text-gray-400 hover:text-white rounded-full transition-all duration-300">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" 
                className="w-10 h-10 flex items-center justify-center bg-dark-200 hover:bg-indigo-500 text-gray-400 hover:text-white rounded-full transition-all duration-300">
                <span className="sr-only">Discord</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                </svg>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
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
            
            <div className="mt-6">
              <h4 className="text-white font-medium mb-3">We Accept</h4>
              <div className="flex space-x-3">
                <div className="w-8 h-8 bg-dark-200 rounded-md flex items-center justify-center">
                  <svg className="h-5 w-5 text-primary-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.999 0L7.473 7.5H16.525L11.999 0Z" fill="currentColor"/>
                    <path d="M16.524 7.5L11.998 0L7.473 7.5H16.524Z" fill="currentColor" fillOpacity="0.5"/>
                    <path d="M7.473 7.5L11.999 15L16.525 7.5H7.473Z" fill="currentColor" fillOpacity="0.8"/>
                    <path d="M11.999 15L7.473 7.5H16.525L11.999 15Z" fill="currentColor" fillOpacity="0.6"/>
                    <path d="M11.999 24L16.525 16.5H7.473L11.999 24Z" fill="currentColor"/>
                    <path d="M7.473 16.5L11.999 24L16.525 16.5H7.473Z" fill="currentColor" fillOpacity="0.5"/>
                    <path d="M16.525 16.5L11.999 9L7.473 16.5H16.525Z" fill="currentColor" fillOpacity="0.8"/>
                    <path d="M11.999 9L16.525 16.5H7.473L11.999 9Z" fill="currentColor" fillOpacity="0.6"/>
                  </svg>
                </div>
                <div className="w-8 h-8 bg-dark-200 rounded-md flex items-center justify-center">
                  <svg className="h-5 w-5 text-twitter" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0z"/>
                  </svg>
                </div>
                <div className="w-8 h-8 bg-dark-200 rounded-md flex items-center justify-center">
                  <svg className="h-4 w-4 text-yellow-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-10 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} TweetNFT. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="/faq" className="text-gray-400 hover:text-white text-sm transition-colors">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 