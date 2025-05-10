import React from 'react';
import { Link } from 'react-router-dom';

const NftCard = ({ nft }) => {
  return (
    <div className="card overflow-hidden animate-hover group hover:shadow-card relative bg-gradient-to-b from-dark-200 to-dark-300">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative overflow-hidden">
        <img 
          src={nft.image} 
          alt={nft.title} 
          className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black/60 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
        
        <div className="absolute top-3 right-3 bg-dark-300/80 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full flex items-center shadow-md">
          <svg className="w-3.5 h-3.5 mr-1.5 text-twitter" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
          </svg>
          Tweet NFT
        </div>
        
        <div className="absolute top-3 left-3 bg-primary-500/90 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-md">
          #{nft.id}
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <Link to={`/nft/${nft.id}`} className="block">
            <h3 className="text-white font-semibold text-lg font-poppins line-clamp-1 group-hover:text-primary-400 transition-colors">{nft.title}</h3>
          </Link>
          <div className="flex items-center text-gray-400 text-xs bg-dark-100 rounded-full py-1 px-2">
            <svg className="w-3.5 h-3.5 mr-1 text-primary-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
            {nft.views}
          </div>
        </div>
        
        <Link to={`/nft/${nft.id}`} className="text-gray-400 text-sm line-clamp-2 hover:text-gray-300 transition-colors leading-relaxed block mb-4">
          {nft.description}
        </Link>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-800">
          <div className="flex items-center">
            <div className="relative">
              <img
                src={nft.creator.image}
                alt={nft.creator.name}
                className="w-8 h-8 rounded-full border-2 border-dark-100 object-cover"
              />
              <div className="absolute -bottom-1 -right-1 bg-primary-500 rounded-full w-3.5 h-3.5 flex items-center justify-center">
                <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
            </div>
            <div className="ml-2">
              <span className="text-xs font-medium text-white">@{nft.creator.username}</span>
              <p className="text-xs text-gray-500">Creator</p>
            </div>
          </div>
        
          <div className="text-right">
            <p className="text-xs text-gray-400">Price</p>
            <p className="text-white font-medium flex items-center justify-end text-lg">
              <svg className="w-4 h-4 mr-1.5 text-primary-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
                <path d="M12.9 15.5L12.9 14.5C14.28 14.3 15.01 13.24 15.04 12.12C15.07 10.82 14.04 9.9 12.38 9.65L12.1 9.61L12.1 7.5L11.1 7.5L11.1 9.5C10.85 9.5 10.59 9.51 10.32 9.53L10.32 10.53L11.1 10.5L11.1 14.5L10.33 14.5L10.33 15.5L12.9 15.5ZM11.1 10.5L11.1 13.5C10.11 13.45 9.64 12.78 9.65 12.05C9.64 11.35 10.11 10.66 11.1 10.5ZM12.1 13.5L12.1 10.6C13.09 10.75 13.55 11.42 13.55 12.06C13.54 12.8 13.08 13.45 12.1 13.5Z" fill="currentColor"/>
              </svg>
              {nft.price} ETH
            </p>
          </div>
        </div>
        
        <Link 
          to={`/nft/${nft.id}`} 
          className="btn-primary w-full mt-4 text-sm font-medium"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default NftCard; 