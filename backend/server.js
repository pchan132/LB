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

// เพื่มชื่อ
const getName = require("./routesName/getName");
const postName = require("./routesName/postName");
const putName = require("./routesName/putName");
const deleteName = require("./routesName/deleteName");

app.use(cors());
app.use(express.json());

// เชื่อมต่อฐานข้อมูล
db();
// เรียกใช้งาน routes api สำหรับจดหมาย
app.use(getRoutes);
app.use(postRoutes);
app.use(putRoutes);
app.use(deleteRoutes);

// // เรียกใช้งาน routes สำหรับ เพิ่มชื่อ
app.use(getName);
app.use(postName);
app.use(deleteName);
app.use(putName);

app.listen(port, (req, res) => {
  console.log(`${host}${port}`);
});
