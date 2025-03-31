const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.put("/updateName/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, department } = req.body;

    const query =
      "UPDATE name SET firstName = ?, lastName = ?, department = ? WHERE idName = ?";
    const data = [firstName, lastName, department, id];

    result = await conn.query(query, data);

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "ไม่เจอ" });
    } else {
      res.status(200).json({ message: "แก้ไขสำเร็จ" });
    }
    console.log("✅ Updated success");
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

module.exports = router; // ต้องมี
