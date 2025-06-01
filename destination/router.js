const express = require("express");
const { validateBody, validateQueryString } = require("../utils");
const {
  createDestination,
  getDestinationById,
  updateDestination,
  deleleDestination,
  getAllDestinationByAccountId,
} = require("./controller");
const destinationsRouter = express.Router();

destinationsRouter.post("/create", validateBody, createDestination);
destinationsRouter.get("/get", validateQueryString, getDestinationById);
destinationsRouter.put("/update", validateBody, updateDestination);
destinationsRouter.put("/delete", validateQueryString, deleleDestination);
destinationsRouter.get(
  "/byaccount",
  validateQueryString,
  getAllDestinationByAccountId
);

module.exports = destinationsRouter;
