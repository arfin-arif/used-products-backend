const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const productsRoute = require("./routes/products.route");
const usersRoutes = require("./routes/user.routes");
const locationRoutes = require("./routes/location.route");
const siteNameRoute = require("./routes/sitename.route");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const uri = process.env.MONGO_URL;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`DB Connected to ${uri}`);
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/users", usersRoutes);
app.use("/api/products", productsRoute);
app.use("/api/site-name", siteNameRoute);
app.use("/api/locations", locationRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);

app.get("/", async (req, res) => {
  res.send("Product catalogue  Server is Running");
});

app.all("*", (req, res) => {
  res.send("No Route Found");
});
