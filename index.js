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
        Authorization: `Bearer ${ROYALE_API_TOKEN}`,
        Accept: "application/json"
      }
    });

    const text = await response.text();

    // Try parsing the JSON. If it's invalid or empty, throw an error.
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      throw new Error("Invalid JSON received from Clash Royale API: " + text);
    }

    if (response.ok) {
      res.status(200).json(data);
    } else {
      res.status(response.status).json(data);
    }
  } catch (error) {
    console.error("Proxy error:", error.message);
    res.status(500).json({
      error: "Proxy request failed",
      details: error.message
    });
  }
});

app.listen(port, () => {
  console.log(`Proxy listening on port ${port}`);
});
