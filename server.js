import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Izinkan semua domain
app.use(express.json());

// Endpoint proxy ke KeyAuth
app.get("/login", async (req, res) => {
  const { username, license } = req.query;

  if (!username || !license) {
    return res.status(400).json({ success: false, message: "Missing parameters" });
  }

  try {
    const keyauthURL = `https://keyauth.win/api/reseller/?app=288ba642558e502bdbfd0609328a28c8a859063d399b5677e5b1ec4517dc2718&username=${encodeURIComponent(username)}&key=${encodeURIComponent(license)}`;
    const response = await fetch(keyauthURL);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
