const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/getName", async (req, res) => {
  try {
    const [result] = await conn.query("SELECT * FROM name");
    res.json(result);

  } catch (err) {
    console.error("Database Error:", err);
    req
      .status(500)
      .json({ massage: "เกิดข้อผิดพลาดในการสร้างข้อมูล", error: err.message });
  }
});

module.exports = router; // ต้องมี


