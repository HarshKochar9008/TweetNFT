import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import WalletConnect from './WalletConnect';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Create NFT', path: '/create' },
    { name: 'Marketplace', path: '/marketplace' },
    { name: 'My Profile', path: '/profile' },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-dark-100/90 backdrop-blur-xl shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-20 items-center">
          <Link 
            to="/" 
            className="flex items-center group"
          >
            <div className="w-12 h-15 flex items-center justify-center transition-all duration-300">
            <img src="/logo.png" alt="TweetNFT" className="w-full h-full object-cover" />
            </div>
            <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-primary-400 to-twitter bg-clip-text text-transparent font-poppins transition-all duration-300">
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-4 py-2 mx-1 text-sm font-medium rounded-full transition-all duration-200 ${
                  isActive(item.path)
                    ? 'text-white bg-gradient-to-r from-primary-600 to-twitter shadow-md'
                    : 'text-gray-300 hover:text-white hover:bg-dark-200/60'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="ml-4">
              <WalletConnect />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <div className="mr-2">
              <WalletConnect />
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-lg transition-all duration-300 focus:outline-none ${
                isMenuOpen 
                  ? 'bg-dark-100 text-white' 
                  : 'text-gray-400 hover:text-white bg-dark-200/50 hover:bg-dark-200'
              }`}
              aria-label="Toggle menu"
            >
              <span className="sr-only">Menu</span>
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute w-full bg-dark-100/95 backdrop-blur-xl border-b border-gray-800 animate-fadeIn shadow-lg">
          <div className="px-4 py-3 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-4 py-3 text-base font-medium rounded-xl transition-all duration-200 ${
                  isActive(item.path)
                    ? 'text-white bg-gradient-to-r from-primary-600/80 to-twitter/80'
                    : 'text-gray-300 hover:text-white hover:bg-dark-200/60'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 