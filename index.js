import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;
const TOKEN = process.env.ROYALE_API_TOKEN;

app.get('/v1/players/:tag', async (req, res) => {
  const tag = req.params.tag;
  const url = `https://api.clashroyale.com/v1/players/%23${tag}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Proxy request failed', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy listening on port ${PORT}`);
});
