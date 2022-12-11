const express = require("express")
const app = express()
const cors = require("cors")

app.use(express.json());

//use cors
app.use(cors());

// Route Imports
const todoItem = require("./routes/todoItems");

app.use(todoItem);

module.exports = app
