const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const sha256 = require("js-sha256");
app.use(cors());
app.use(express.json());

// ROUTES
// get all user
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashed = sha256(password).toString();
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (user.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    const dbPassword = user.rows[0].password;
    if (hashed !== dbPassword) {
      return res.status(401).json({ error: "Password incorrect" });
    }
    res.json({
      message: "Login successful",
      user: {
        id: user.rows[0].id,
        email: user.rows[0].email,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// add user
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashed = sha256(password).toString();
    const newUser = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
      [email, hashed]
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
      "SELECT * FROM event_admins WHERE $1 = user_id",
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
