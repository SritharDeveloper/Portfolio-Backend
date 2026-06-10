const express = require("express");
const router = express.Router();
const pool = require("../db/db");

// GET all experience
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM experience ORDER BY sort_order ASC"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
