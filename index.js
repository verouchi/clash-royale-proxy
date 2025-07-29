const express = require('express');
const fetch = require('node-fetch');
const app = express();

const API_KEY = process.env.API_KEY;
const PORT = process.env.PORT || 3000;

app.get('/player/:tag', async (req, res) => {
  const tag = encodeURIComponent(`#${req.params.tag}`);
  const url = `https://api.clashroyale.com/v1/players/${tag}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  const data = await response.json();
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Proxy running on port ${PORT}`);
});
