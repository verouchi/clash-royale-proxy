const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

const API_KEY = process.env.API_KEY || "your_api_key_here"; // Replace only if testing locally

app.get("/player/:tag", async (req, res) => {
  const tag = req.params.tag;
  const url = `https://api.clashroyale.com/v1/players/%23${tag}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${API_KEY}`
      }
    });

    if (!response.ok) {
      return res.status(response.status).send(await response.text());
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching player data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// ✅ Listen on the port Render provides (usually 10000)
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
