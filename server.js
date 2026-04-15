const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// PostgreSQL connection
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "student_system",
  password: "YOUR_POSTGRES_PASSWORD",
  port: 5433,
});

// TEST ROUTE
// app.get("/", (req, res) => {
// res.send("API is running");
// });

// GET all students
app.get("/students", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM students");
    res.json(result.rows);
  } catch (err) {
    console.error("GET /students error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// GET FULL Student Report
app.get("/report", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        s.first_name,
        s.last_name,
        c.course_name,
        e.grade
      FROM enrollments e
      JOIN students s ON e.student_id = s.student_id
      JOIN courses c ON e.course_id = c.course_id
    `);
    res.json(result.rows);
  } catch (err) {
    console.error("GET /report error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// PUT
app.put("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email } = req.body;

    const result = await pool.query(
      "UPDATE students SET first_name=$1, last_name=$2, email=$3 WHERE student_id=$4 RETURNING *",
      [first_name, last_name, email, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error updating student");
  }
});

// DELETE
app.delete("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM students WHERE student_id=$1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student deleted", student: result.rows[0] });
  } catch (err) {
    console.error("DELETE /students/:id error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// POST new student
app.post("/students", async (req, res) => {
  try {
    const { first_name, last_name, email } = req.body;

    console.log("Incoming body:", req.body);

    const result = await pool.query(
      "INSERT INTO students (first_name, last_name, email) VALUES ($1, $2, $3) RETURNING *",
      [first_name, last_name, email]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("POST /students error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// LISTEN
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
