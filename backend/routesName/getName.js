const express = require("express");
const router = express.Router();
const pool = require("../config/db"); // Use connection pool

router.get("/getName", async (req, res) => {
  try {
    const [result] = await conn.query("SELECT * FROM name"); // Use pool for querying
    res.json(result);
  } catch (err) {
    console.error("Database Error:", err);
    res // Fix typo: req.status -> res.status
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในการสร้างข้อมูล", error: err.message });
  }
});

module.exports = router; // ต้องมี


