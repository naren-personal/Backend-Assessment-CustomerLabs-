const express = require("express");
const { validateBody, validateQueryString } = require("../utils");
const {
  creatNewAccount,
  getAccountById,
  updateAccount,
  deleteAccount,
} = require("./controller");
const accountsRouter = express.Router();

accountsRouter.post("/create", validateBody, creatNewAccount);
accountsRouter.get("/get", validateQueryString, getAccountById);
accountsRouter.put("/update", validateBody, updateAccount);
accountsRouter.delete("/delete", validateQueryString, deleteAccount);

module.exports = accountsRouter;
