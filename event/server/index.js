const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Define a sample GET route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Start the server
app.listen(5000, () => {
  console.log("Server has started on port 5000");
});
