require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;
const API_TOKEN = process.env.ROYALE_API_TOKEN;

app.get("/player/:tag", async (req, res) => {
  const tag = req.params.tag.replace("#", "%23");
  const url = `https://api.clashroyale.com/v1/players/${tag}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: "Request failed" });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal error" });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
