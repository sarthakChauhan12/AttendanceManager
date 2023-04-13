const express = require("express");
const cors = require("cors");


require("./db/config.js");
const User = require("./db/Users");

const allRoutes = require("./routes/all-routes");

const app = express();


app.use(cors());
app.use(express.json());
app.use(allRoutes);

app.listen(5000);