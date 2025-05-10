import React, { useState } from 'react';

const TransactionHistory = () => {
  // Mock transaction data - in a real app, you would fetch this from the blockchain
  const [transactions] = useState([
    {
      id: '0x1234...5678',
      type: 'Send',
      amount: '0.05 ETH',
      status: 'Completed',
      date: '2023-06-15',
    },
    {
      id: '0xabcd...efgh',
      type: 'Receive',
      amount: '0.1 ETH',
      status: 'Completed',
      date: '2023-06-14',
    },
    {
      id: '0x9876...5432',
      type: 'Contract Interaction',
      amount: '0.01 ETH',
      status: 'Pending',
      date: '2023-06-13',
    },
  ]);

  return (
    <div className="card transaction-card">
      <div className="card-header">
        <h2 className="card-title">Transaction History</h2>
      </div>
      <div className="card-content">
        {transactions.length > 0 ? (
          <div className="transaction-list">
            {transactions.map((tx) => (
              <div key={tx.id} className="transaction-item">
                <div className="transaction-icon">
                  {tx.type === 'Send' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 15L12 9L6 15" stroke="#E5383B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                  {tx.type === 'Receive' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 9L12 15L18 9" stroke="#38B000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                  {tx.type === 'Contract Interaction' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 9H4" stroke="#3A86FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M20 15H4" stroke="#3A86FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M4 5V19C4 19.5304 4.21071 20.0391 4.58579 20.4142C4.96086 20.7893 5.46957 21 6 21H18C18.5304 21 19.0391 20.7893 19.4142 20.4142C19.7893 20.0391 20 19.5304 20 19V5C20 4.46957 19.7893 3.96086 19.4142 3.58579C19.0391 3.21071 18.5304 3 18 3H6C5.46957 3 4.96086 3.21071 4.58579 3.58579C4.21071 3.96086 4 4.46957 4 5Z" stroke="#3A86FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <div className="transaction-details">
                  <div className="transaction-type">{tx.type}</div>
                  <div className="transaction-date">{tx.date}</div>
                </div>
                <div className="transaction-amount">{tx.amount}</div>
                <div className={`transaction-status ${tx.status.toLowerCase()}`}>
                  {tx.status}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No transactions found</p>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory; 