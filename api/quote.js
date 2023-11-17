module.exports = async (req, res) => {
 
  const response1 = await fetch('https://zenquotes.io/api/random');
  const data1 = await response1.json();

  let data2, data3;
  do {
   
    const response2 = await fetch('https://zenquotes.io/api/random');
    data2 = await response2.json();
  } while (data1[0].a === data2[0].a);

  do {
  
    const response3 = await fetch('https://zenquotes.io/api/random');
    data3 = await response3.json();
  } while (data3[0].a === data1[0].a || data3[0].a === data2[0].a);


  res.status(200).json({
    quote: data1[0], 
    randomAuthor1: data2[0].a,
    randomAuthor2: data3[0].a
  });
};
