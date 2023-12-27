const express = require("express");
const cors = require("cors");
const cookieParser= require('cookie-parser');
const bodyParser = require('body-parser');

const connection = require("./db");
const userRoutes = require("../routes/userRoutes");
const accountRoutes = require("../routes/accuntRoutes");
const settingRoutes = require("../routes/settingRoutes");
const bucketRoutes = require("../routes/bucketRoutes");

// Instantiate express
const server = express();

// Database connection
connection();

server.use(express.json());
server.use(cors());
server.use(cookieParser());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use("/api/public", express.static('public'));

// Routes
server.use("/api/users", userRoutes);

// Account
server.use("/api/accounts", accountRoutes);

// Profile
server.use("/api/settings", settingRoutes);

// Bucket
server.use("/api/buckets", bucketRoutes);

module.exports = server;