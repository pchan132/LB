const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/get", async (req, res) => {
  try {
    const [result] = await conn.query("SELECT * FROM letters");
    res.json(result);
  } catch (err) {
    console.error("Database Error:", err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในการสร้างข้อมูล", error: err.message });
  }
});

module.exports = router; // ต้องมี
