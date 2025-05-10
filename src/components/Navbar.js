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
      scrolled ? 'bg-dark-100/95 backdrop-blur-md shadow-lg' : 'bg-dark-100'
    } border-b border-gray-800`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <Link 
            to="/" 
            className="text-2xl font-extrabold tracking-tight text-white font-poppins hover:text-twitter transition-colors duration-200"
          >
            TweetNFT
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 py-2 text-base font-medium rounded transition-all duration-200 relative group ${
                  isActive(item.path)
                    ? 'text-twitter bg-dark-200'
                    : 'text-gray-300 hover:text-white hover:bg-dark-200'
                }`}
              >
                {item.name}
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-twitter transition-all duration-300 ${
                  isActive(item.path) ? 'w-full' : 'group-hover:w-full'
                }`}></span>
              </Link>
            ))}
            <div className="ml-6">
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
              className="text-gray-400 hover:text-white p-2 rounded-lg bg-dark-200/80 hover:bg-dark-200 transition-all duration-200 focus:outline-none"
              aria-label="Toggle menu"
            >
              <span className="text-lg font-bold">{isMenuOpen ? '✕' : '☰'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden glass-effect animate-fadeIn absolute w-full">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 ${
                  isActive(item.path)
                    ? 'text-white bg-dark-200 border-l-4 border-l-twitter'
                    : 'text-gray-300 hover:text-white hover:bg-dark-200'
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