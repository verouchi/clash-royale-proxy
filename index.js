const express = require("express");
const axios = require("axios");
const app = express();

const PORT = process.env.PORT || 3000;

// 🛡️ Your Supercell API token
const API_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjM5OGRjNDFiLTVjMjktNDIwNC1hMTlhLTc5ZTM4YzgyNTJmNSIsImlhdCI6MTc1MzgwNTE2NSwic3ViIjoiZGV2ZWxvcGVyL2NlYTJiZWUzLWUwMTQtY2QyNi0zZTljLWZkYjVhYjA2ZGM0NSIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyI3MC4xODMuMjAxLjIzOSJdLCJ0eXBlIjoiY2xpZW50In1dfQ.22V4Wh8ogZVRtaGX34TAgZDgaN39QzSfJKmZptKe6bWGdRW2htW81r6hhJ922mmSMPCAfuBEYMt9vSppZ0oaZA";

// ⚔️ Endpoint to proxy Clash Royale player stats
app.get("/player/:tag", async (req, res) => {
  const playerTag = req.params.tag.replace("#", "%23");

  try {
    const response = await axios.get(`https://api.clashroyale.com/v1/players/${playerTag}`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Error retrieving player data");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
