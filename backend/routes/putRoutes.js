const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      letter_name,
      sender_name,
      receiver_name,
      department_id,
      received_date,
      status,
    } = req.body;

    const query = `UPDATE letters SET letter_name = ?, sender_name = ?, receiver_name = ?, department_id = ?, received_date = ?, status = ? WHERE letter_id = ?`;
    const data = [
      letter_name,
      sender_name,
      receiver_name,
      department_id,
      received_date,
      status,
      id,
    ];

    if (id == id) {
      result = await conn.query(query, data);
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Letter not found" });
    }

    res.status(201).json({ message: "Letter updated" });
    console.log("Letter updated");
  } catch (err) {
    console.error("Database Error:", err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในการสร้างข้อมูล", error: err.message });
  }
});

module.exports = router; // ต้องมี
