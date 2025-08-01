const express = require("express");
const { default: mongoose } = require("mongoose");
const productsRoutes = require("./routes/product.route");
const dotEnv = require("dotenv");
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
dotEnv.config();

app.use("/api/products", productsRoutes);

const uri = process.env.MONGODB_CONNECTION_URL;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
