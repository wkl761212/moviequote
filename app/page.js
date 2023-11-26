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
    : "bg-[#f5cb40] hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded";

  
  return (
    <div style={{ backgroundColor: '#7c2d12', minHeight: '100vh' }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Parisienne&display=swap');
      `}</style>
      <main className="flex min-h-screen flex-col items-center justify-center pt-8">
        
        <div>
          <p className="text-6xl text-black p-1 m-1 z-10" style={{ fontFamily: "'Parisienne', cursive" }}>Who said this quote?</p>
        </div>
        <div className="relative w-full h-96  m-6 text-center" > {/* Adjust the height as needed */}
          {/* The Image as Background */}
          <Image src="/parchment-bg.png" alt="Background" layout="fill" objectFit="contain" priority />

          {/* The Quote */}
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <p className="text-2xl text-black z-10 max-w-xl mx-auto" style={{ wordWrap: "break-word" }}>{quote.q}</p>
          </div>
        </div>
        <div className="flex justify-center space-x-4">
          <div>
            <button onClick={handleOptionClick} className={optionButtonClass}>{options.option1}</button>
          </div>
          <div>
            <button onClick={handleOptionClick} className="bg-[#f5cb40] hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded">{quote.a}</button>
          </div>
          <div>
            <button onClick={handleOptionClick} className={optionButtonClass}>{options.option2}</button>
          </div>
        </div>
        <div>
          <button onClick={handleNewQuote} className="bg-[#ea580c] hover:from-blue-600 hover:to-blue-700 text-white font-bold my-8 py-2 px-4 rounded">Next Quote</button>
        </div>
      </main>
    </div>
  );
};

export default Home;