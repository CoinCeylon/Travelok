const router = require("express").Router();
const { createBooking } = require("../controllers/bookingController");

router.post("/", createBooking);

module.exports = router;
