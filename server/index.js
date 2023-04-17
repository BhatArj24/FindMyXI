require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const setupRoutes = require("./routes/setup");
const teamRoutes = require("./routes/teams");
const playerRoutes = require("./routes/players");
const profileRoutes = require("./routes/profile");
const resetRoutes = require("./routes/reset");

connection();

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/setup", setupRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/players", playerRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/reset", resetRoutes);
app.get("/", (req, res) => {
    res.send({message:"Welcome to the Fantasy Football API"});
});


const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

