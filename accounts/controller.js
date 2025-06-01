const { Account } = require("../database/config");
const { CommonUtils } = require("../utils");

const creatNewAccount = async (req, res) => {
  try {
    const { email, account_name, website } = req.body;

    if (!email || !account_name) {
      return res
        .status(400)
        .json({ message: "Email and Account Name are required." });
    }
    const id = CommonUtils.generateUUID();
    const isValid = CommonUtils.isValidEmail(email);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid Email" });
    }
    const newAccount = await Account.create({
      email,
      account_name,
      website,
      id,
    });
    res.status(201).json(newAccount);
  } catch (err) {
    console.log("[ERROR][creatNewAccount]", err);

    res
      .status(500)
      .json({ message: "Please Check Email or Email already Exists" });
  }
};

const getAccountById = async (req, res) => {
  try {
    const accountId = req.query["id"];
    if (!accountId) {
      res.status(400).json({ message: "AccountId is Required" });
      return;
    }
    const account = await Account.findByPk(accountId, {});
    if (!account) return res.status(404).json({ message: "Account not found" });
    res.json(account);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

const updateAccount = async (req, res) => {
  try {
    const { email, account_name, website, id } = req.body;
    if (!id) {
      res.status(400).json({ message: "AccountId is Required" });
      return;
    }
    if (
      (req.body.email && !email) ||
      (req.body.account_name && !account_name)
    ) {
      return res
        .status(400)
        .json({ message: "Email and Account Name are required." });
    }
    const isValid = CommonUtils.isValidEmail(email);
    if (req.body.email && !isValid) {
      return res.status(400).json({ message: "Invalid Email" });
    }
    const account = await Account.findByPk(id);
    if (!account) return res.status(404).json({ message: "Account not found" });
    if (email) account.email = email;
    if (account_name) account.account_name = account_name;
    if (website !== undefined) account.website = website;

    await account.save();
    res.json(account);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const accountId = req.query["id"];
    if (!accountId) {
      res.status(400).json({ message: "AccountId is Required" });
      return;
    }
    const account = await Account.findByPk(accountId);
    if (!account) return res.status(404).json({ message: "Account not found" });

    await account.destroy();
    res.json({ message: "Account deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  creatNewAccount,
  getAccountById,
  updateAccount,
  deleteAccount,
};
