const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const PORT = process.env.PORT || 5000;

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// db connection
connectDB();

// routes
app.use("/api/user", userRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
