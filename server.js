const express = require("express");
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Todo = require("./models/Todo");
const colors = require("colors");
const cors = require("cors");

dotenv.config({ path: './.env' });

const app = express();

app.use(cors());

const PORT = process.env.PORT || 7000;

//connect to database
mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log(`Database connected on port ${PORT}`.green.bold))
.catch((err) => console.log(err));

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
  
  app.listen(PORT, console.log(`Server running on port ${PORT}`.green.bold));


  app.get("/todos", (req, res) => {
  Todo.find({}, (err, data) => {
    if (err) res.send(err);
    else res.send(data);
  });
});

app.post("/todos", (req, res) => {
  if (req.body.title) {
    const todo = new Todo({
      title: req.body.title,
      completed: req.body.completed || false,
    });
    todo
      .save()
      .then((data) => res.json(data))
      .catch((err) => res.json({ error: err }));
  } else {
    res.json({
      error: "The input field 'title' is empty",
    });
  }
});

app.patch("/todos/:id", async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { completed: req.body.completed } },
      { new: true }
    );
    if (!todo) return res.status(404).send("Todo not found");
    res.json(todo);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete("/todos/:id", async (req, res) => {
  await Todo.findOneAndRemove({ _id: req.params.id })
    .then(() => {
      res.json({ message: "Todo silindi." });
    })
    .catch((error) => {
      res.json({ error: error });
    });
});

app.delete("/todos", async (req, res) => {
  await Todo.deleteMany({ completed: true })
    .then(() => {
      res.json({ message: "Completed todos silindi." });
    })
    .catch((error) => {
      res.json({ error: error });
    });
});
