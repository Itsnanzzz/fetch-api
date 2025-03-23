"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BitcoinTransactions = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://rest.cryptoapis.io/blocks/utxo/bitcoin/testnet/hash/00000000000000127080d8bcf84f4ad830a71ea0aadce3632579b6b2f26cd94b/transactions',
          {
            params: {
              context: 'yourExampleString',
              limit: 50,
              offset: 0,
            },
            headers: {
              'X-API-Key': "f0429448933dfb54869ecb6b08aafc87b1415aad", // Ganti dengan API Key Anda
              'Access-Control-Allow-Origin': '*', // Menambahkan header CORS
            },
          }
        );

        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Bitcoin Transactions</h1>
      <p>API Version: {data.apiVersion}</p>
      <p>Request ID: {data.requestId}</p>
      <p>Context: {data.context}</p>
      <p>Total Transactions: {data.data.total}</p>

      <ul>
        {data.data.items.map((transaction, index) => (
          <li key={index}>
            <h2>Transaction ID: {transaction.id}</h2>
            <p>Hash: {transaction.hash}</p>
            <p>Size: {transaction.size}</p>
            <p>Fee: {transaction.fee.amount} {transaction.fee.unit}</p>
            <h3>Inputs:</h3>
            <ul>
              {transaction.inputs.map((input, i) => (
                <li key={i}>
                  <p>Coinbase: {input.coinbase}</p>
                </li>
              ))}
            </ul>
            <h3>Outputs:</h3>
            <ul>
              {transaction.outputs.map((output, i) => (
                <li key={i}>
                  <p>Addresses: {output.addresses.join(', ')}</p>
                  <p>Value: {output.value.amount} {output.value.unit}</p>
                  <p>Is Spent: {output.isSpent ? 'Yes' : 'No'}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BitcoinTransactions;