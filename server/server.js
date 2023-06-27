const { json } = require("body-parser");
const express = require("express");
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const Product = require("./model/productModel");


const app = express();
app.use(express.json());

//Home Page
app.get("/", (req, res) =>
{
  res.send("Home");
})

//Get all products
app.get("/product", async (req, res) =>
{
  try
  {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error)
  {
    console.log(error);
    res.status(404).json(error);
  }
}
)

//Get a products by ID
app.get("/product/:id", async (req, res) =>
{
  try
  {

    const products = await Product.findById(req.params.id);
    res.status(200).json(products);
  } catch (error)
  {
    console.log(error);
    res.status(404).json(error);
  }
}
)
//Update a product by ID
app.put("/product/:id", async (req, res) =>
{
  try
  {

    const product = await Product.findByIdAndUpdate(req.params.id, req.body);

    if (!product)
    {
      return res.status(404).json("Product Not Found");

    }
    const updatedProduct = await Product.findById(req.params.id);
    res.status(200).json(updatedProduct);
  } catch (error)
  {
    console.log(error);
    res.status(404).json(error);
  }
})

//Create a new product 
app.post("/product", async (req, res) =>
{
  try
  {
    const product = await Product.create(req.body);
    res.status(200).json(product);


  } catch (error)
  {
    console.log(error)
    res.status(404).send(error);
  }
})

//Delete a product by ID
app.delete("/product/:id", async (req, res) =>
{

  try
  {

    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product)
    {
      return res.status(404).json("Product Not Found");

    }
    res.status(200).json(product);
  } catch (error)
  {
    console.log(error);
    res.status(404).json(error);
  }

})




mongoose.set("strictQuery", false);
mongoose.connect("mongodb+srv://admin:12345@cluster0.0fgonrx.mongodb.net/MERN_ToDo")
  .then(() =>
  {
    console.log("Connected to MongoDB");
    app.listen(PORT, () =>
    {
      console.log("Server running on:" + PORT);
    })
  })
  .catch(e => console.log(e));