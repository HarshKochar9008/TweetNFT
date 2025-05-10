import React from 'react';
import { useNetwork } from 'wagmi';

const BlockchainInfo = () => {
  const { chain } = useNetwork();

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Network Info</h2>
      </div>
      <div className="card-content">
        {chain ? (
          <>
            <div className="info-item">
              <span className="info-label">Network:</span>
              <span className="info-value">{chain.name}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Chain ID:</span>
              <span className="info-value">{chain.id}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Native Currency:</span>
              <span className="info-value">{chain.nativeCurrency?.symbol}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Block Explorer:</span>
              <a 
                href={chain.blockExplorers?.default.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="explorer-link"
              >
                {chain.blockExplorers?.default.name}
              </a>
            </div>
          </>
        ) : (
          <p>Connect your wallet to view network information</p>
        )}
      </div>
    </div>
  );
};

export default BlockchainInfo; 