import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { useENSReverseRegistrar } from '../contracts/ENSReverseRegistrar';
import { toast } from 'react-hot-toast';

const ENSReverseRegistrar = () => {
  const { address } = useAccount();
  const { setName, isLoading, isError, error } = useENSReverseRegistrar();
  const [ensName, setEnsName] = useState('');

  const handleSetName = async () => {
    if (!ensName) {
      toast.error('Please enter an ENS name');
      return;
    }

    try {
      await setName({
        args: [ensName],
      });
      toast.success('ENS name set successfully!');
    } catch (err) {
      console.error('Error setting ENS name:', err);
      toast.error(err.message || 'Failed to set ENS name');
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Set ENS Reverse Record</h2>
      </div>
      <div className="card-content">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Your Address
            </label>
            <div className="bg-dark-100 p-3 rounded-lg text-gray-400 font-mono text-sm">
              {address || 'Not connected'}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              ENS Name
            </label>
            <input
              type="text"
              value={ensName}
              onChange={(e) => setEnsName(e.target.value)}
              placeholder="Enter your ENS name (e.g., alice.eth)"
              className="w-full bg-dark-100 text-white px-4 py-2 rounded-lg border border-gray-800 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>

          <button
            onClick={handleSetName}
            disabled={isLoading || !address}
            className="btn-primary w-full flex items-center justify-center"
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Set ENS Name'
            )}
          </button>

          {isError && (
            <div className="text-red-500 text-sm">
              Error: {error?.message || 'Failed to set ENS name'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ENSReverseRegistrar; 