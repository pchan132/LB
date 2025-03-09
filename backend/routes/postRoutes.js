const express = require("express");
const router = express.Router();
const db = require("../config/db");
const e = require("express");

router.post("/add", async (req, res) => {
  try {
    // รับค่าจาก Body
    const {
      letter_name: letter_name,
      sender_name: sender_name,
      receiver_name: receiver_name,
      department_id: department_id,
      received_date: received_date,
      status: status,
    } = req.body;

    // ตรวจสอบข้อมูล
    if (!receiver_name) {
  console.log("ใส่ชื่อผู้รับ");
  return res.status(400).json({ message: "ใส่ชื่อผู้รับ" }); // ✅ ใส่ return เพื่อหยุดโค้ด
} 
if (!sender_name) {
  console.log("ใส่ชื่อผู้ส่ง");
  return res.status(400).json({ message: "ใส่ชื่อผู้ส่ง" });
} 
if (!department_id) {
  console.log("ใส่ชื่อแผนก");
  return res.status(400).json({ message: "ใส่ชื่อแผนก" });
} 
if (!received_date) {
  console.log("ใส่วันที่รับ");
  return res.status(400).json({ message: "ใส่วันที่รับ" });
} 
if (!status) {
  console.log("ใส่สถานะ");
  return res.status(400).json({ message: "ใส่สถานะ" });
}
    // SQL Query
    const query = `INSERT INTO letters (letter_name, sender_name, receiver_name, department_id, received_date, status) VALUES (?, ?, ?, ?, ?, ?)`;
    const data = [
      letter_name || "",
      sender_name,
      receiver_name,
      department_id,
      received_date,
      status,
    ];

    // เอาข้อมูมไปเก็บในฐานข้อมูล  // รันคำสั่ง SQL
    await conn.query(query, data);

    res.status(201).json({ message: "Letter created" });
  } catch (err) {
    console.error("Database Error:", err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในการสร้างข้อมูล", error: err.message });
  }
});

module.exports = router;
