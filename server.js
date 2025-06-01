const express = require("express");
const app = express();
const db = require("./database/config");
const mainRoutes = require("./routes");
app.use(express.json());
app.use(mainRoutes);
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server running" });
});

app.listen(3000, () => {
  console.log("Server running on 3000 PORT");
});

// Sync DB
db.sequelize
  .sync({ alter: true }) // or { force: true } for development only
  .then(() => {
    console.log("Database synced");
    app.listen(3000, () => console.log("Server running on port 3000"));
  })
  .catch(() => {});
