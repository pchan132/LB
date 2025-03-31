const express = require("express");
const router = express.Router();
const pool = require("../config/db"); // Use a connection pool

router.post("/createName", async (req, res) => {
  try {
    const { firstName, lastName, department } = req.body;

    // Combine input validation checks
    if (!firstName || !lastName || !department) {
      const missingFields = [];
      if (!firstName) missingFields.push("ชื่อ");
      if (!lastName) missingFields.push("นามสกุล");
      if (!department) missingFields.push("แผนก");

      return res.status(400).json({
        message: `กรุณาใส่ ${missingFields.join(", ")}`,
      });
    }

    const query = `INSERT INTO name (firstName, lastName, department) VALUES (?,?,?)`;
    const data = [firstName, lastName, department];

    // Use the connection pool for the query
    await conn.query(query, data);

    res.status(201).json({ message: "เพิ่มข้อมูลสำเร็จ" });
  } catch (error) {
    console.error(error); // Use console.error for errors
    res.status(500).json({
      message: "เกิดข้อผิดพลาด",
      error: error.message,
    });
  }
});

module.exports = router;
