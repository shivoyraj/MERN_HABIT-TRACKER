const express = require("express");
const router = express.Router();

const habitRoutes = require("./habits_routes");
const statusRoutes = require("./status_routes");

//redirecting 'habits.*' url to habitRoutes
router.use("/habits", habitRoutes);
//redirecting 'status.*' url to statusRoutes
router.use("/status", statusRoutes);

module.exports = router;