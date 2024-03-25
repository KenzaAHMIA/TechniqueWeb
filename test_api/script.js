// API endpoint requiring authentication
const apiUrl = "https://api.translateplus.io/v1/translate"

// API key for authentication
const apiKey = '83168afac2c13b8117482eb869bf5872f144ae5c';

const data = {
  text: "My client speaks only French. Will you translate for me?",
  source: "en",
  target: "fr"
};

// SUPPORTED : bn, ar, fr, zh-CN

// Make a GET request with authentication using the Fetch API
fetch(apiUrl, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-API-KEY": apiKey
  },
  body: JSON.stringify(data)
})
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(protectedData => {
    // Process the protected data
    console.log('Protected Data:', protectedData);
  })
  .catch(error => {
    console.error('Error:', error);
  });
