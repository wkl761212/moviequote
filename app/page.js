'use client';
import Image from 'next/image'
import React, { useState, useEffect } from 'react';

const Home = () => {
  // State to store the quote
  const [quote, setQuote] = useState({ q: '', a: '' });
  const [options, setOptions] = useState([]);

  const getRandomAuthors = (actualAuthor) => {
    let randomAuthors = [];
    const allAuthors = authorsData.authors.map(author => author.name);

    while (randomAuthors.length < 2) {
      const randomAuthor = allAuthors[Math.floor(Math.random() * allAuthors.length)];
      if (randomAuthor !== actualAuthor && !randomAuthors.includes(randomAuthor)) {
        randomAuthors.push(randomAuthor);
      }
    }
    return randomAuthors;
  };

  // Fetch data from the API
  async function getQuote() {
    try {
      const response = await fetch('/api/quote');
      const data = await response.json();
      if (data.length > 0) {
        // Assuming the first element in the array is the quote we need
        setQuote({ q: data[0].q, a: data[0].a });
        const newOptions = getRandomAuthors(data[0].a);
        setOptions([data[0].a, ...newOptions].sort(() => Math.random() - 0.5)); // Shuffle the options
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
      </div>
      <div>
        {options.map((author, index) => (
          <button key={index} className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded">
            {author}
          </button>
        ))}
      </div>
      <button onClick={handleNewQuote} className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded">Next Quote</button>
    </main>
  );
};

export default Home;
