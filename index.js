const express = require("express");
const { default: mongoose } = require("mongoose");
const Product = require("./models/product.model");
const app = express();
const port = 3000;
app.use(express.json());

const uri =
  "mongodb+srv://mh19115:xpNrmCImfJzeXJes@mvc1.t7slf8z.mongodb.net/?retryWrites=true&w=majority&appName=mvc1";

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/products", async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json(product);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: err.message });
  }
});

app.get("/api/product/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching product", error: err.message });
  }
});

app.post("/api/product", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    console.log("Error creating product:", err);
    res
      .status(500)
      .json({ message: "Error creating product", error: err.message });
  }
});

app.patch("/api/product/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const updatedProduct = await Product.findById(id);
    res
      .status(200)
      .json({ message: "Product updated successfully", updatedProduct });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating product", error: err.message });
  }
});

app.delete("/api/product/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully", product });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting product", error: err.message });
  }
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
