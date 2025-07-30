require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
const app = express();

const PORT = process.env.PORT || 10000;
const API_BASE = "https://api.clashroyale.com/v1";

app.get("/v1/players/:tag", async (req, res) => {
  const tag = req.params.tag.replace("#", "");
  try {
    const response = await fetch(`${API_BASE}/players/%23${tag}`, {
      headers: {
        Authorization: `Bearer ${process.env.ROYALE_API_TOKEN}`,
        Accept: "application/json"
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: "Proxy request failed", details: errorText });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Proxy request failed", details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy listening on port ${PORT}`);
});
