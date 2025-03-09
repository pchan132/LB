const express = require("express");
const cors = require("cors");
const app = express();
// port and host
const port = 3000;
const host = "http://localhost:";
const db = require("./config/db");
// Routes
const getRoutes = require("./routes/getRoutes");
const postRoutes = require("./routes/postRoutes");
const putRoutes = require("./routes/putRoutes");
const deleteRoutes = require("./routes/deleteRoutes");

app.use(cors());
app.use(express.json());

// เชื่อมต่อฐานข้อมูล
db();
// เรียกใช้งาน routes api
app.use(getRoutes);
app.use(postRoutes);
app.use(putRoutes);
app.use(deleteRoutes);

app.listen(port, (req, res) => {
  console.log(`${host}${port}`);
});
