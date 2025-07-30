import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 10000;
const ROYALE_API_TOKEN = process.env.ROYALE_API_TOKEN;

app.get("/v1/players/:tag", async (req, res) => {
  const tag = req.params.tag;
  const url = `https://api.clashroyale.com/v1/players/${tag}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${ROYALE_API_TOKEN}`
      }
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Proxy request failed", details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Proxy listening on port ${port}`);
});
