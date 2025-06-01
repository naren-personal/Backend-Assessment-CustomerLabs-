const { Account, Destination } = require("../database/config");
const { httpsRequest, sendMultipleRequest } = require("../utils");

const createDestination = async (req, res) => {
  try {
    const { url, http_method, headers, accountid } = req.body;
    if (!accountid) {
      return res.status(400).json({ message: "AccountId is required" });
    }

    if (!url || !http_method || !headers) {
      return res
        .status(400)
        .json({ message: "url, http_method, and headers are required." });
    }
    const account = await Account.findByPk(accountid);
    if (!account) return res.status(404).json({ message: "Account not found" });

    const destination = await Destination.create({
      url,
      http_method,
      headers,
      accountid: accountid,
    });
    res.status(201).json(destination);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getDestinationById = async (req, res) => {
  try {
    const destinationid = req.query["id"];
    if (!destinationid) {
      res.status(400).json({ message: "DestinationId is Required" });
      return;
    }
    const destination = await Destination.findByPk(destinationid);
    if (!destination)
      return res.status(404).json({ message: "Destination not found" });

    res.json(destination);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateDestination = async (req, res) => {
  try {
    const { url, http_method, headers, id } = req.body;
    if (!id) {
      res.status(400).json({ message: "DestinationId is Required" });
      return;
    }
    if (
      (req.body.url && !url) ||
      (req.body.http_method && !http_method) ||
      (req.body.headers && !headers)
    ) {
      return res
        .status(400)
        .json({ message: "url, http_method, and headers are required." });
    }
    const destination = await Destination.findByPk(id);
    if (!destination)
      return res.status(404).json({ message: "Destination not found" });

    if (url) destination.url = url;
    if (http_method) destination.http_method = http_method;
    if (headers) destination.headers = headers;

    await destination.save();
    res.json(destination);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleleDestination = async (req, res) => {
  try {
    const destinationid = req.query["id"];
    if (!destinationid) {
      res.status(400).json({ message: "AccountId is Required" });
      return;
    }
    const destination = await Destination.findByPk(destinationid);
    if (!destination)
      return res.status(404).json({ message: "Destination not found" });

    await destination.destroy();
    res.json({ message: "Destination deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllDestinationByAccountId = async (req, res) => {
  try {
    let { page = 1, accountid } = req.query;
    // Basic validations
    if (!accountid) {
      return res.status(400).json({ message: "Account ID is required." });
    }

    const limit = 10;
    const sortBy = "updatedAt";
    const order = "DESC";
    // Parse to integer and validate
    page = parseInt(page);
    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(limit) || limit < 1 || limit > 100) limit = 10;

    // Validate sortBy and order
    const validSortFields = ["updatedAt", "createdAt"];
    const validOrder = ["ASC", "DESC"];

    if (!validSortFields.includes(sortBy)) sortBy = "updatedAt";
    if (!validOrder.includes(order.toUpperCase())) order = "DESC";

    const offset = (page - 1) * limit;

    const destinations = await Destination.findAndCountAll({
      where: { AccountId: accountid },
      order: [
        [sortBy, order],
        ["createdAt", order],
      ],
      limit,
      offset,
    });

    res.json({
      total: destinations.count,
      page,
      limit,
      sortBy,
      order,
      destinations: destinations.rows,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const serverIncomingData = async (req, res) => {
  const token = req.headers["cl-x-token"];
  const contentType =
    (req["headers"] && req["headers"]["content-type"]) ||
    req["headers"]["Content-Type"];
  if (!token) {
    return res.status(401).json({ message: "Un Authenticate" });
  }

  if (contentType !== "application/json") {
    return res.status(400).json({ message: "Invalid Data" });
  }

  const data = req.body;

  try {
    const account = await Account.findOne({
      where: { app_secret_token: token },
    });
    if (!account) {
      return res.status(401).json({ message: "Un Authenticate" });
    }

    const destinations = await Destination.findAll({
      where: { AccountId: account.id },
    });

    if (destinations.length) {
      await sendMultipleRequest(destinations, data);
      return res.status(200).json({ message: "Data forwarded successfully" });
    }
    return res.status(200).json({ message: "No Data Found to Forward" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createDestination,
  getDestinationById,
  updateDestination,
  deleleDestination,
  getAllDestinationByAccountId,
  serverIncomingData,
};
