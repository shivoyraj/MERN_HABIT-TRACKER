const express = require("express");
const router = express.Router();
const habitController = require("../controllers/habitController");


// default route to homepage
router.get("/loadhabits",habitController.homePage);
// routes http get request for update status
router.get("/updateStatus/:habitId/:statusId", habitController.updateHabitStatus);
// routes http post request for add new habit
router.post("/createHabit", habitController.createHabit);
// routes http delete request for removing existing habit
router.delete("/delete/:habitId", habitController.deleteHabit);

module.exports = router;