import React, { useState } from 'react';
import NftCard from '../components/NftCard';

const Marketplace = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock NFT data - in production this would come from API/blockchain
  const nfts = [
    {
      id: '1',
      title: 'Web3 is the Future!',
      description: 'The future is decentralized. Web3 will change how we interact with the internet forever.',
      image: 'https://images.unsplash.com/photo-1639762681057-408e52192e55',
      price: 0.15,
      views: 423,
      creator: {
        username: 'web3enthusiast',
        image: 'https://randomuser.me/api/portraits/men/32.jpg'
      },
      category: 'tech'
    },
    {
      id: '2',
      title: 'NFTs are more than just JPEGs',
      description: "NFTs are the fundamental building blocks of the new creator economy. They're not just expensive images.",
      image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e',
      price: 0.08,
      views: 219,
      creator: {
        username: 'digitalartist',
        image: 'https://randomuser.me/api/portraits/women/44.jpg'
      },
      category: 'art'
    },
    {
      id: '3',
      title: 'Crypto Market Analysis',
      description: 'My thoughts on the current market conditions and where we might be headed in the coming months.',
      image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040',
      price: 0.24,
      views: 567,
      creator: {
        username: 'cryptoanalyst',
        image: 'https://randomuser.me/api/portraits/men/45.jpg'
      },
      category: 'finance'
    },
    {
      id: '4',
      title: 'The Rise of DAOs',
      description: 'Decentralized Autonomous Organizations are redefining corporate structures and collective decision-making.',
      image: 'https://images.unsplash.com/photo-1616047504229-0d113f8d86ac',
      price: 0.35,
      views: 892,
      creator: {
        username: 'daoenthusiast',
        image: 'https://randomuser.me/api/portraits/women/22.jpg'
      },
      category: 'tech'
    },
    {
      id: '5',
      title: 'Sustainable Blockchains',
      description: 'How the industry is moving towards more environmentally friendly consensus mechanisms.',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b',
      price: 0.18,
      views: 340,
      creator: {
        username: 'ecosustainability',
        image: 'https://randomuser.me/api/portraits/men/67.jpg'
      },
      category: 'environment'
    },
    {
      id: '6',
      title: 'Metaverse Fashion Trends',
      description: "Digital fashion is becoming as important as physical fashion. Here's what's trending in the metaverse.",
      image: 'https://images.unsplash.com/photo-1634796553190-55fb8732b1f1',
      price: 0.12,
      views: 623,
      creator: {
        username: 'digitalfashion',
        image: 'https://randomuser.me/api/portraits/women/39.jpg'
      },
      category: 'fashion'
    }
  ];

  const categories = [
    { id: 'all', name: 'All NFTs' },
    { id: 'tech', name: 'Technology' },
    { id: 'art', name: 'Digital Art' },
    { id: 'finance', name: 'Finance' },
    { id: 'environment', name: 'Environment' },
    { id: 'fashion', name: 'Fashion' },
  ];

  const filteredNFTs = nfts
    .filter(nft => {
      // Filter by category
      if (activeFilter !== 'all' && nft.category !== activeFilter) {
        return false;
      }
      
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          nft.title.toLowerCase().includes(query) ||
          nft.description.toLowerCase().includes(query) ||
          nft.creator.username.toLowerCase().includes(query)
        );
      }
      
      return true;
    });

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl h-64">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-twitter to-primary-800"></div>
        <div className="absolute inset-0 opacity-20" style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1639762681057-408e52192e55")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: 'overlay'
        }}></div>
        <div className="relative h-full flex flex-col justify-center px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Tweet NFT Marketplace
          </h1>
          <p className="text-white/80 md:w-2/3 lg:w-1/2">
            Discover, collect, and trade the best tweets from creators around the world. Own a piece of social media history.
          </p>
        </div>
      </div>
      
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="w-full md:w-2/3 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search NFTs, creators, or keywords..."
            className="w-full bg-dark-100 text-white pl-10 pr-4 py-3 rounded-lg border border-gray-800 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
          <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        
        <div className="w-full md:w-1/3 flex">
          <div className="relative w-full">
            <select 
              className="w-full appearance-none bg-dark-100 text-white pl-4 pr-10 py-3 rounded-lg border border-gray-800 focus:outline-none focus:ring-1 focus:ring-primary-500"
              onChange={(e) => setActiveFilter(e.target.value)}
              value={activeFilter}
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <svg className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
      </div>
      
      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveFilter(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === category.id
                ? 'bg-primary-600 text-white'
                : 'bg-dark-100 text-gray-400 hover:bg-dark-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      {/* NFT Grid */}
      {filteredNFTs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNFTs.map(nft => (
            <NftCard key={nft.id} nft={nft} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h2 className="text-white text-xl font-bold mb-2">No NFTs Found</h2>
          <p className="text-gray-400">
            No NFTs match your current filters. Try adjusting your search or browse a different category.
          </p>
        </div>
      )}
    </div>
  );
};

export default Marketplace; 