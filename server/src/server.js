const express = require("express");
const cors = require("cors");
const ENV = require("./config/env");
const initRoute = require("./routes");
const app = express();

const PORT = ENV.PORT || 8080;

app.use(cors());
app.use(express.json());

initRoute(app);

app.get("/", (req, res) => {
  res.send("Server is runnning...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
