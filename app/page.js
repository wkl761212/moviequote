'use client';
import Image from 'next/image'
import React, { useState, useEffect } from 'react';

const Home = () => {
  // State to store the quote
  const [quote, setQuote] = useState({ q: '', a: '' });
  const [randomAuthor1, setAuthor1] = useState({ a: '' });
  const [randomAuthor2, setAuthor2] = useState({ a: '' });
  // Fetch data from the API
  async function getQuote() {
    try {
      const response = await fetch('/api/quote');
      const data = await response.json();
      if (data.quote && data.randomAuthor1 && data.randomAuthor2) {
        setQuote({ q: data.quote.q, a: data.quote.a });
        setAuthor1({ a: data.randomAuthor1 });
        setAuthor2({ a: data.randomAuthor2 });
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  async function getAuthor1() {
    try {
      const response2 = await fetch('/api/quote');
      const data2 = await response2.json();
      if (data2.length > 0) {
        // Assuming the first element in the array is the quote we need
        setAuthor1({ a: data2[0].a });
      }
    } catch (error) {
      console.error("Error fetching author1: ", error);
    }
  }

  async function getAuthor2() {
    try {
      const response3 = await fetch('/api/quote');
      const data3 = await response3.json();
      if (data3.length > 0) {
        // Assuming the first element in the array is the quote we need
        setAuthor2({ a: data3[0].a });
      }
    } catch (error) {
      console.error("Error fetching author2: ", error);
    }
  }
    

// Use useEffect to fetch data when the component mounts
  useEffect(() => {
    getQuote();
    getAuthor1();
    getAuthor2();
  }, []);

  const handleNewQuote = () => {
    getQuote();
    getAuthor1();
    getAuthor2();
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">      
      <div>
        <p>Quote: {quote.q}</p>
        <p>Author: {quote.a}</p>
        <p>{randomAuthor1.a}</p>
        <p>{randomAuthor2.a}</p>
      </div>
      <button onClick={handleNewQuote} className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded">Next Quote</button>
      

    </main>
  );
};

export default Home;
