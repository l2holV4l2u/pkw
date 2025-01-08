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

// add user
app.post("/adduser", async (req, res) => {
  try {
    const { email, password } = req.body;
    const password_hash = sha256(password);
    const newUser = await pool.query(
      "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *",
      [email, password_hash]
    );
    res.status(201).json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// get user's events
app.get("/getevent/:id", async (req, res) => {
  try {
    const events = await pool.query(
      "SELECT * FROM events WHERE $1 = ANY(admins)",
      [req.params.id]
    );
    return res.json(events.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// add event
app.post("/addevent", async (req, res) => {
  try {
    const { user, name, description, location, start, end } = req.body;
    if (!user || !name || !description || !location || !start || !end) {
      return res.status(400).send("Missing required event details");
    }
    const newEvent = await pool.query(
      "INSERT INTO events (name, description, location, start_time, end_time, created_by, admins) " +
        "VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [name, description, location, start, end, user, [user]]
    );
    res.status(201).json(newEvent.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// start the server
app.listen(5000, () => {
  console.log("Server has started on port 5000");
});

/*
// template
app.get("/", async (req, res) => {
  try {

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
*/
