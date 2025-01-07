const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const bcrypt = require("bcrypt");
const sha256 = require("js-sha256");

app.use(cors());
app.use(express.json());

// ROUTES
// get all user
app.get("/getuser", async (req, res) => {
  try {
    const event = await pool.query("SELECT * FROM users");
    res.json(event.rows);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

// Add user
app.post("/adduser", async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    // Hash the password using SHA-256
    const password_hash = sha256(password); // Hash the password

    // Add user
    const newUser = await pool.query(
      "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *",
      [email, password_hash]
    );

    res.status(201).json(newUser.rows[0]); // Respond with the new user's data
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// start the server
app.listen(5000, () => {
  console.log("Server has started on port 5000");
});
