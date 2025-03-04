const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const authRouter = require("./Routers/authRouter")

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use("/api/restricted", authRouter)

server.get("/", (req, res) => {
  res.status(200).json({ Hello: "from server.js" });
});

module.exports = server;
