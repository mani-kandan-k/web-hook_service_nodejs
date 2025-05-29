const express = require("express");
const accountRoute = require("./routes/accout.routes");
const destinationRoute = require("./routes/destination.routes");
const incomingRoute = require("./routes/incoming.routes");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/account", accountRoute);
app.use("/destination", destinationRoute);
app.use("/server/incoming_data", incomingRoute);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
