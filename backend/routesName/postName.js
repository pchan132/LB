const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.post("/createName", async (req, res) => {
  try {
    const {
        firstName,
        lastName,
        department,
    } = req.body;

    if (!firstName) {
      console.log("ใส่ชื่อ");
      return res.status(400).json({
        message: "ใส่ชื่อ",
      });
    }
    if (!lastName) {
      console.log("ใส่นามสกุล");
      return res.status(400).json({
        message: "ใส่นามสกุล",
      });
    }
    if (!department) {
      console.log("ใส่แผนก");
      return res.status(400).json({
        message: "ใส่แผนก",
      });
    }

    const query = `INSERT INTO name (firstName, lastName, department) VALUES (?,?,?)`;
    const data = [firstName, lastName, department];

    await conn.query(query, data);

    res.status(201).json({ message: "เพิ่มข้อมูลสำเร็จ" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "เกิดข้อผิดพลาด", error:error.message
    });
  }
});

module.exports = router;
