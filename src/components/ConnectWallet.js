import React, { useState, useEffect } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

const ConnectWallet = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { isConnected, address } = useAccount();
  
  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isModalOpen && event.target.classList.contains('modal-overlay')) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);
  
  const metamaskConnector = new InjectedConnector({ 
    name: 'MetaMask'
  });
  
  const phantomConnector = new InjectedConnector({ 
    name: 'Phantom'
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConnectMetaMask = () => {
    connect({ connector: metamaskConnector });
    setIsModalOpen(false);
  };
  
  const handleConnectPhantom = () => {
    connect({ connector: phantomConnector });
    setIsModalOpen(false);
  };

  const handleDisconnect = () => {
    disconnect();
  };
  
  // Format address for display
  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div>
      {isConnected ? (
        <button 
          onClick={handleDisconnect}
          className="btn-outline flex items-center space-x-2 px-4 py-2 text-sm border border-gray-700 rounded-lg"
        >
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>{formatAddress(address)}</span>
          <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      ) : (
        <button 
          onClick={handleOpenModal}
          className="btn-primary flex items-center space-x-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="6" width="18" height="15" rx="2" stroke="currentColor" strokeWidth="2"/>
            <path d="M16 10C16 8.93913 15.5786 7.92172 14.8284 7.17157C14.0783 6.42143 13.0609 6 12 6C10.9391 6 9.92172 6.42143 9.17157 7.17157C8.42143 7.92172 8 8.93913 8 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M12 14V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span>Connect Wallet</span>
        </button>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center modal-overlay bg-black/70 backdrop-blur-sm">
          <div className="bg-dark-200 rounded-xl shadow-xl w-full max-w-md mx-4 overflow-hidden transform transition-all animate-fadeIn">
            <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white font-poppins">Connect Wallet</h2>
              <button 
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <p className="text-gray-400 text-sm mb-4">Choose your preferred wallet to connect to our platform</p>
              
              <div className="space-y-3">
                <button 
                  onClick={handleConnectMetaMask}
                  className="w-full p-4 rounded-lg bg-dark-100 hover:bg-dark-300 border border-gray-800 flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center mr-3 shadow-lg">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.3152 3L13.1631 8.81673L14.5815 5.15224L21.3152 3Z" fill="#E17726" stroke="#E17726" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2.68472 3L10.7684 8.87212L9.41843 5.15224L2.68472 3Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M18.4272 16.764L16.3261 20.2568L20.7702 21.5376L22.0778 16.8479L18.4272 16.764Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M1.93359 16.8479L3.23073 21.5376L7.66499 20.2568L5.57343 16.764L1.93359 16.8479Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7.38292 10.6445L6.17969 12.7138L10.5684 12.9261L10.4007 8.08148L7.38292 10.6445Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16.6172 10.6445L13.5431 8.02607L13.4316 12.9261L17.8204 12.7138L16.6172 10.6445Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7.66504 20.2568L10.2622 18.8616L8.02146 16.8756L7.66504 20.2568Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M13.7378 18.8616L16.335 20.2568L15.9786 16.8756L13.7378 18.8616Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-medium">MetaMask</h3>
                      <p className="text-gray-400 text-xs">Connect to your MetaMask wallet</p>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                <button 
                  onClick={handleConnectPhantom}
                  className="w-full p-4 rounded-lg bg-dark-100 hover:bg-dark-300 border border-gray-800 flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center mr-3 shadow-lg">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5Z" fill="#8338EC"/>
                        <path d="M14.7013 7.65054C14.2741 7.65054 13.927 8.00046 13.927 8.42525C13.927 8.85004 14.2741 9.19996 14.7013 9.19996C15.1284 9.19996 15.4755 8.85004 15.4755 8.42525C15.4755 8.00046 15.1284 7.65054 14.7013 7.65054Z" fill="white"/>
                        <path d="M8.27867 9.19996C7.57223 9.19996 7 9.77219 7 10.4786V13.5714C7 14.2778 7.57223 14.85 8.27867 14.85H15.7213C16.4278 14.85 17 14.2778 17 13.5714V10.4786C17 9.77219 16.4278 9.19996 15.7213 9.19996H15.089V11.2857C15.089 12.3454 14.2315 13.2 13.1689 13.2H10.8311C9.76846 13.2 8.91104 12.3454 8.91104 11.2857V9.19996H8.27867Z" fill="white"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-medium">Phantom</h3>
                      <p className="text-gray-400 text-xs">Connect to your Phantom wallet</p>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-800">
                <p className="text-xs text-gray-500 text-center">
                  By connecting your wallet, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectWallet; 