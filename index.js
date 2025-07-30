const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const API_BASE_URL = "https://api.clashroyale.com/v1";
const API_TOKEN = process.env.ROYALE_API_TOKEN;

app.get("/v1/*", async (req, res) => {
  const path = req.params[0];
  const url = `${API_BASE_URL}/${path}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: "Proxy error", details: err.message });
  }
});

// Listen on the port Render automatically assigns
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
 
