const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.delete("/deleteName/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const query = `DELETE FROM name WHERE idName = ?`;
    const data = [id];

    const [result] = await conn.query(query, data); // Use db object and destructure result
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Record not found" }); // Improved message
    }
    res.status(200).json({ message: "Record deleted successfully" }); // Improved message
  } catch (err) {
    console.error(err); // Use console.error for better logging
    res.status(500).json({
      message: "An error occurred while deleting the record",
      error: err.message,
    });
  }
});

module.exports = router;
