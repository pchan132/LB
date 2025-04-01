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

    const query = `
      UPDATE letters 
      SET sender_name = ?, receiver_name = ?, department_id = ?, received_date = ?, status = ? 
      WHERE letter_id = ?
    `;
    const data = [
      sender_name,
      receiver_name,
      department_id,
      received_date,
      status,
      id,
    ];

    // Use a connection pool for better performance
    const [result] = await conn.query(query, data);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Letter not found" });
    }

    res.status(200).json({ message: "Letter updated successfully" });
    console.log("Letter updated successfully");
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).json({
      message: "An error occurred while updating the letter",
      error: err.message,
    });
  }
});

module.exports = router;
