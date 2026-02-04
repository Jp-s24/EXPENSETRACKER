require("dns").setDefaultResultOrder("ipv4first");
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const path = require("path");


const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use(express.json());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes); 
app.use("/api/v1/expense", expenseRoutes);


//Serve uploads folder 
app.use("/uploads", express.static(path.join(__dirname, "uploads")));



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
