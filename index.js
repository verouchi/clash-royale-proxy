import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;
const TOKEN = process.env.ROYALE_API_TOKEN;

app.get("/v1/players/:tag", async (req, res) => {
  const playerTag = req.params.tag.replace("#", "%23");
  const url = `https://api.clashroyale.com/v1/players/${playerTag}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error("Error fetching from RoyaleAPI:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/", (req, res) => {
  res.send("Clash Royale Proxy is running.");
});

app.listen(PORT, () => {
  console.log(`Proxy listening on port ${PORT}`);
});
