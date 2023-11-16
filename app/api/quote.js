// api/quote.js
module.exports = async (req, res) => {
    const response = await fetch('https://zenquotes.io/api/random');
    const data = await response.json();
    res.status(200).json(data);
  };
  