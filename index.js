const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const Auth = require("./MiddleWares/Auth");
const User = require("./Models/User");
app.use(express.json());
app.use(cors());

require("./DB");

app.post("/", Auth, async (req, res) => {
  const { todos } = req.user;
  console.log("User " + req.user);
  res.send(todos);
});

app.post("/addTodo", Auth, async (req, res) => {
  const user = req.user;
  console.log("Add todo " + user);
  const newTodo = {
    content: req.body.todo.content,
  };
  user.todos.push(newTodo);
  await user.save();
  console.log("Check todo " + user);
  res.send(user.todos);
});

app.post("/deleteTodo", async (req, res) => {
  res.send("POST request to the homepage");
});

app.post("/editTodo", async (req, res) => {
  res.send("POST request to the homepage");
});

app.listen(port, () => console.log(`listening on port ${port}!`));
