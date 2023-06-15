const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// Middleware
app.use(bodyParser.json());

// Mock database
let products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
];

// Routes
app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find((prod) => prod.id === id);

  if (!product) {
    res.status(404).json({ error: "Product not found" });
  } else {
    res.json(product);
  }
});

app.post("/products", (req, res) => {
  const product = req.body;
  products.push(product);
  res.status(201).json(product);
});

app.put("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex((prod) => prod.id === id);

  if (productIndex === -1) {
    res.status(404).json({ error: "Product not found" });
  } else {
    const updatedProduct = { id, ...req.body };
    products[productIndex] = updatedProduct;
    res.json(updatedProduct);
  }
});

app.delete("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex((prod) => prod.id === id);

  if (productIndex === -1) {
    res.status(404).json({ error: "Product not found" });
  } else {
    const deletedProduct = products.splice(productIndex, 1)[0];
    res.json(deletedProduct);
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
