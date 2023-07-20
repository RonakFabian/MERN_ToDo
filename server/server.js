const { json } = require("body-parser");
const PORT = process.env.PORT || 3000;
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Todos = require("./model/todoModel");

const app = express();
app.use(express.json());
app.use(cors());

//Home Page
app.get("/", (req, res) => {
  res.send("Home");
});

//Get all todo
app.get("/todo", async (req, res) => {
  try {
    const todos = await Todos.find({});
    res.status(200).json(todos);
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
});

//Get a product by ID
app.get("/todo/:id", async (req, res) => {
  try {
    const todos = await Todos.findById(req.params.id);
    res.status(200).json(todos);
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
});
//Update a todo by ID
app.put("/todo/:id", async (req, res) => {
  try {
    const todo = await Todos.findByIdAndUpdate(req.params.id, req.body);

    if (!todo) {
      return res.status(404).json("Product Not Found");
    }
    const updatedTodo = await Todos.findById(req.params.id);
    res.status(200).json(updatedTodo);
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
});

//Create a new todo
app.post("/todo", async (req, res) => {
  try {
    const todo = await Todos.create(req.body);
    res.status(200).json(todo);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

//Delete a todo by ID
app.delete("/todo/:id", async (req, res) => {
  try {
    const todo = await Todos.findByIdAndDelete(req.params.id);

    if (!todo) {
      return res.status(404).json("Todo Not Found");
    }
    res.status(200).json(todo);
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
});

mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb+srv://admin:12345@cluster0.0fgonrx.mongodb.net/MERN_ToDo")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log("Server running on:" + PORT);
    });
  })
  .catch((e) => console.log(e));
