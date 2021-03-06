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
  res.send(todos);
});

app.post("/addTodo", Auth, async (req, res) => {
  const user = req.user;
  user.todos.push(req.body.todo);
  await user.save();
  res.send(user.todos);
});

app.post("/deleteTodo", async (req, res) => {
  res.send("POST request to the homepage");
});

app.post("/editTodo", async (req, res) => {
  res.send("POST request to the homepage");
});

app.listen(port, () => console.log(`listening on port ${port}!`));
