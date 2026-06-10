const express = require("express");
const router = express.Router();
const pool = require("../db/db");

// GET all skills
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM skills ORDER BY level DESC, id ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
