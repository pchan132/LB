const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const query = `DELETE FROM letters WHERE letter_id = ?`;
    const data = [id];

    if (id == id) {
      result = await conn.query(query, data);
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Letter not found" });
    } else {
      res.status(201).json({ message: "Letter deleted successfully" });
      console.log("Letter deleted successfully");
    }
  } catch (err) {
    console.error("Database Error:", err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในการสร้างข้อมูล", error: err.message });
  }
});

module.exports = router; // ต้องมี
