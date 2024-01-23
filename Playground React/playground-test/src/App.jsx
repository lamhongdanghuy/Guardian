import React, { useState, useEffect } from 'react';

const App = () => {

  const [postData1, setData1] = useState({
    name: 'IM TESTING SENDING DATA TO FLASK',
    url: 'This is from the front end to flask',
  });

  const [postData, setData] = useState({
    name: 'Initial Load',
    url: 'This is from the front end',
  });

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/get_data'); // Update the URL with your Flask API endpoint
      const result = await response.json();
      setData(result);
      console.log("got data")
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSendData = async () => {
    try {
      const response = await fetch('http://localhost:5000/send_data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData1),
      });

      const result = await response.json();
      console.log(result); // Handle the response as needed
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <div>

      <h1>Your React App</h1>
      <h1> HI</h1>
      <h1>{postData.name}</h1>
      <h1>{postData.url}</h1>
      <button onClick={fetchData}> Fetch Data</button>
      <button onClick={handleSendData}>Send Data</button>
    </div>
  );
};

export default App