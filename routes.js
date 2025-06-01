const express = require("express");
const router = express.Router();
const accountsRouter = require("./accounts/router");
const destinationsRouter = require("./destination/router");
const { validateBody } = require("./utils");
const { serverIncomingData } = require("./destination/controller");

router.use("/accounts", accountsRouter);
router.use("/destinations", destinationsRouter);
router.post("/server/incoming_data", validateBody, serverIncomingData);
module.exports = router;
