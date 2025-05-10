import React, { useState } from 'react';
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { ethers } from 'ethers';

const sampleContract = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 private value;
    event ValueChanged(uint256 newValue);
    
    function setValue(uint256 _value) public {
        value = _value;
        emit ValueChanged(_value);
    }
    
    function getValue() public view returns (uint256) {
        return value;
    }
}`;

const SolidityInteraction = () => {
  const { isConnected } = useAccount();
  const [contractCode, setContractCode] = useState(sampleContract);
  const [contractAddress, setContractAddress] = useState('');
  const [storageValue, setStorageValue] = useState('');
  const [deployStatus, setDeployStatus] = useState('');
  const [interactionStatus, setInteractionStatus] = useState('');
  const [activeTab, setActiveTab] = useState('code');

  // This is a simplified mock since we can't actually deploy contracts in this demo
  const handleDeploy = () => {
    setDeployStatus('Deploying...');
    
    // Simulate contract deployment
    setTimeout(() => {
      const mockAddress = '0x' + Array(40).fill(0).map(() => 
        Math.floor(Math.random() * 16).toString(16)
      ).join('');
      
      setContractAddress(mockAddress);
      setDeployStatus('Deployed successfully!');
    }, 2000);
  };

  const handleInteraction = () => {
    if (!storageValue) {
      setInteractionStatus('Please enter a value');
      return;
    }
    
    setInteractionStatus('Processing transaction...');
    
    // Simulate contract interaction
    setTimeout(() => {
      setInteractionStatus(`Successfully stored value: ${storageValue}`);
    }, 1500);
  };

  const handleCodeChange = (e) => {
    setContractCode(e.target.value);
  };

  return (
    <div className="card solidity-card">
      <div className="card-header">
        <h2 className="card-title">Solidity Interaction</h2>
      </div>
      <div className="card-content">
        {isConnected ? (
          <>
            <div className="tab-navigation">
              <button 
                className={`tab-button ${activeTab === 'code' ? 'active' : ''}`}
                onClick={() => setActiveTab('code')}
              >
                Contract Code
              </button>
              <button 
                className={`tab-button ${activeTab === 'interact' ? 'active' : ''}`}
                onClick={() => setActiveTab('interact')}
              >
                Interact
              </button>
            </div>
            
            {activeTab === 'code' && (
              <div className="code-container">
                <div className="code-editor-header">
                  <span>SimpleStorage.sol</span>
                </div>
                <textarea 
                  className="code-editor"
                  value={contractCode}
                  onChange={handleCodeChange}
                  spellCheck={false}
                ></textarea>
                <button onClick={handleDeploy} className="deploy-button">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 15V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 9L12 5L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 5V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Deploy Contract
                </button>
                {deployStatus && <div className="status-message">{deployStatus}</div>}
                {contractAddress && (
                  <div className="contract-address">
                    <span>Contract Address:</span>
                    <code>{contractAddress}</code>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'interact' && (
              <div className="interact-container">
                <div className="function-box">
                  <h3 className="function-title">setValue(uint256 _value)</h3>
                  <div className="function-input">
                    <input 
                      type="number" 
                      placeholder="Enter value" 
                      value={storageValue}
                      onChange={(e) => setStorageValue(e.target.value)}
                    />
                    <button onClick={handleInteraction}>Execute</button>
                  </div>
                  {interactionStatus && <div className="status-message">{interactionStatus}</div>}
                </div>
                
                <div className="function-box read-only">
                  <h3 className="function-title">getValue()</h3>
                  <div className="function-input">
                    <button>Call</button>
                    <div className="result-display">
                      <span className="result-label">Result:</span>
                      <span className="result-value">{storageValue || '0'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="events-container">
                  <h3 className="events-title">Contract Events</h3>
                  <div className="events-list">
                    {storageValue && (
                      <div className="event-item">
                        <div className="event-header">
                          <span className="event-name">ValueChanged</span>
                          <span className="event-timestamp">{new Date().toLocaleString()}</span>
                        </div>
                        <div className="event-data">
                          <span className="event-param">newValue:</span>
                          <span className="event-value">{storageValue}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <p>Connect your wallet to interact with Solidity contracts</p>
        )}
      </div>
    </div>
  );
};

export default SolidityInteraction; 