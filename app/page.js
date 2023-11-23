'use client';
//import authors from authors.json
import authorsData from './authors.json';
import React, { useState, useEffect } from 'react';
import fetchQuote from '../api/quote';

const Home = () => {
  // State to store the quote
  const [quote, setQuote] = useState({ q: '', a: '' });
  const [randomAuthors, setRandomAuthors] = useState([]);

  const getRandomAuthors = () => {
    let randomAuthors = [];
    
    const allAuthors = authorsData.authors.map(author => author.name);

    while (randomAuthors.length < 2) {
      const randomAuthor = allAuthors[Math.floor(Math.random() * allAuthors.length)];
      if (!randomAuthors.includes(randomAuthor)) {
        randomAuthors.push(randomAuthor);
      }
    }
    return randomAuthors;
  };

  // Fetch data from the 
  async function getQuote() {
    try {
      const data = await fetchQuote();
      if (data) {       
        setQuote({ q: data.q, a: data.a });
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error("Error fetching quote: ", error);
    }
  }

// Use useEffect to fetch data when the component mounts
  useEffect(() => {
    getQuote();
  }, []);

  

  return (
  <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div>
      <p>{quote.q}</p>
      <p>{quote.a}</p>
    </div>
    <div>
    </div>
    <button  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
      Next Quote
    </button>
  </main>
  );
};
export default Home;
