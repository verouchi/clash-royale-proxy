import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

const API_TOKEN = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjM5OGRjNDFiLTVjMjktNDIwNC1hMTlhLTc5ZTM4YzgyNTJmNSIsImlhdCI6MTc1MzgwNTE2NSwic3ViIjoiZGV2ZWxvcGVyL2NlYTJiZWUzLWUwMTQtY2QyNi0zZTljLWZkYjVhYjA2ZGM0NSIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyI3MC4xODMuMjAxLjIzOSJdLCJ0eXBlIjoiY2xpZW50In1dfQ.22V4Wh8ogZVRtaGX34TAgZDgaN39QzSfJKmZptKe6bWGdRW2htW81r6hhJ922mmSMPCAfuBEYMt9vSppZ0oaZA';

app.use(cors());

app.get('/v1/players/:tag', async (req, res) => {
  const tag = req.params.tag;
  const url = `https://api.clashroyale.com/v1/players/%23${tag}`;

  try {
    const response = await fetch(url, {
      headers: { Authorization: API_TOKEN },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).send(errorText);
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
