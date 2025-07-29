import express from 'express';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 3000;

// Replace with your actual API token
const TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjM5OGRjNDFiLTVjMjktNDIwNC1hMTlhLTc5ZTM4YzgyNTJmNSIsImlhdCI6MTc1MzgwNTE2NSwic3ViIjoiZGV2ZWxvcGVyL2NlYTJiZWUzLWUwMTQtY2QyNi0zZTljLWZkYjVhYjA2ZGM0NSIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyI3MC4xODMuMjAxLjIzOSJdLCJ0eXBlIjoiY2xpZW50In1dfQ.22V4Wh8ogZVRtaGX34TAgZDgaN39QzSfJKmZptKe6bWGdRW2htW81r6hhJ922mmSMPCAfuBEYMt9vSppZ0oaZA';

const API_BASE = 'https://api.clashroyale.com/v1';

// Allow JSON response
app.use(express.json());

// Root test
app.get('/', (req, res) => {
  res.send('Clash Royale Proxy is running.');
});

// Proxy player data request
app.get('/player/:tag', async (req, res) => {
  const tag = req.params.tag.replace('#', '%23'); // URL encode #
  try {
    const response = await axios.get(`${API_BASE}/players/${tag}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching tag #${tag}:`, error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch player data' });
  }
});

app.listen(PORT, () => {
  console.log(`Clash Royale Proxy is live on port ${PORT}`);
});
