const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 4444;
const LOG_FILE = path.join(__dirname, "logs.txt");

// Middleware to parse JSON body
app.use(express.json());

// POST endpoint to write logs
app.post("/log", (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Content field is required" });
  }

  // Append content to log file with a new line
  fs.appendFile(LOG_FILE, content + "\n\n", (err) => {
    if (err) {
      console.error("Error writing to log file:", err);
      return res.status(500).json({ error: "Failed to write log" });
    }

    res.status(200).json({ message: "Log written successfully" });
  });
});

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ status: "Server is running", port: PORT });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Log file location: ${LOG_FILE}`);
});
