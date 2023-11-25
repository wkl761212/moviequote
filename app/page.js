'use client';
import Image from 'next/image'
import React, { useState, useEffect } from 'react';
import authorsList from './authors.json';
const Home = () => {
  // State to store the quote
  const [quote, setQuote] = useState({ q: '', a: '' });
  const [options, setOptions] = useState({ option1: '', option2: '' });
  const [isRed, setIsRed] = useState(false);
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
  function getRandomAuthors() {
    const shuffled = authorsList.authors.sort(() => 0.5 - Math.random());
    return { option1: shuffled[0].name, option2: shuffled[1].name };
  }

// Use useEffect to fetch data when the component mounts
  useEffect(() => {
    getQuote();
    setOptions(getRandomAuthors());
  }, []);

  const handleNewQuote = () => {
    getQuote();
    setOptions(getRandomAuthors());
    setIsRed(false);
  };

  const handleOptionClick = () => {
    setIsRed(true); // Set the isRed state to true when specific buttons are clicked
  };

  const optionButtonClass = isRed 
    ? "bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" 
    : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded";

  
  return (
    <div>

      
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div>
          <p>{quote.q}</p>          
        </div>

        {/* Flex container for buttons */}
        <div className="flex justify-center space-x-4">
          <div>
            <button onClick={handleOptionClick} className={optionButtonClass}>{options.option1}</button>
          </div>
          <div>
          <button onClick={handleOptionClick} className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded">{quote.a}</button>
          </div>
          <div>
            <button onClick={handleOptionClick} className={optionButtonClass}>{options.option2}</button>
          </div>
        </div>
        <div>
          <button onClick={handleNewQuote} className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded">Next Quote</button>
        </div>
      </main>
    </div>
  );
};

export default Home;