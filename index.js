import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;
const TOKEN = process.env.ROYALE_API_TOKEN;

if (!TOKEN) {
  console.error("ROYALE_API_TOKEN not set in environment variables.");
  process.exit(1);
}

app.get("/player/:tag", async (req, res) => {
  const playerTag = encodeURIComponent(req.params.tag);
  const url = `https://api.clashroyale.com/v1/players/%23${playerTag}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("Clash Royale Proxy is running!");
});

app.listen(PORT, () => {
  console.log(`Proxy running on port ${PORT}`);
});
