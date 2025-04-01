require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();
// port and host from environment variables
const port = process.env.PORT ;
const host = process.env.HOST ;

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
app.use(helmet()); // Add security headers
app.use(morgan("dev")); // Log HTTP requests
app.use(express.json());

// เชื่อมต่อฐานข้อมูล
db().catch((err) => {
  console.error("Failed to connect to the database:", err);
  process.exit(1); // Exit the process if the database connection fails
});

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

app.listen(port, () => {
  console.log(`${host}${port}`);
}).on("error", (err) => {
  console.error("Failed to start the server:", err);
});
