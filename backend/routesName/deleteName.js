const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.delete("/deleteName/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const query = `DELETE FROM name WHERE idName = ?`;
    const data = [id];

    if (id == id) {
      result = await conn.query(query, data);
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "ไม่เจอ" });
    } else {
      res.status(200).json({ message: "ลบสำเร็จ" });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในการสร้างข้อมูล", error: err.message });
  }
});

module.exports = router;
