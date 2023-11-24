'use client';
import Image from 'next/image'
import React, { useState, useEffect } from 'react';

const Home = () => {
  // State to store the quote
  const [quote, setQuote] = useState({ q: '', a: '' });
  // Fetch data from the API
  async function getQuote() {
    try {
      const response = await fetch('/api/quote');
      const data = await response.json();
      if (data.length > 0) {
        // Assuming the first element in the array is the quote we need
        setQuote({ q: data[0].q, a: data[0].a });
      }
    } catch (error) {
      console.error("Error fetching quote: ", error);
    }
  }

// Use useEffect to fetch data when the component mounts
  useEffect(() => {
    getQuote();
  }, []);

  const handleNewQuote = () => {
    getQuote();
  };
  const parisienneStyle = {
    fontFamily: "'Parisienne', cursive",
    // You can add more styles here as needed
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
  <div>
  <p style={parisienneStyle}>{quote.q}</p> {/* Apply the Parisienne font here */}
    <p>{quote.a}</p>
  </div>

  {/* Flex container for buttons */}
  <div className="flex justify-center space-x-4">
    <div>
      <button onClick={handleNewQuote} className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded">Option 1</button>
    </div>
    <div>
      <button onClick={handleNewQuote} className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded">{quote.a}</button>
    </div>
    <div>
      <button onClick={handleNewQuote} className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded">Option 3</button>
    </div>
  </div>
  <div>
      <button onClick={handleNewQuote} className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded">Next Quote</button>
    </div>
</main>

  );
};

export default Home;