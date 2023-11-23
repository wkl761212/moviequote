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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">      
      <div>
        <p>{quote.q}</p>
        <p>{quote.a}</p>
      </div>
      <button onClick={handleNewQuote} className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded">Next Quote</button>
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <p className="absolute top-0 left-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Under Construction...
        </p>
      </div>

    </main>
  );
};

export default Home;