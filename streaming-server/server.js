const express = require("express");
const app = express();

app.post("/stream", (req, res) => {
  // Set headers for streaming
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Transfer-Encoding", "chunked");

  let count = 1;

  // Function to send each count
  const sendCount = () => {
    const data = { count };
    res.write(JSON.stringify(data) + "\n");

    count++;

    if (count <= 10) {
      // Schedule next count after 1 second
      setTimeout(sendCount, 1000);
    } else {
      res.end(); // End the stream after 10 counts
    }
  };

  // Start sending counts
  sendCount();
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
