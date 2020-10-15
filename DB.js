const mongoose = require("mongoose");
const db = mongoose.connection;

const dbPassword = process.env.DB_PASSWORD;

mongoose.connect(
  `mongodb+srv://JoeKooler:${dbPassword}@line-todo.rgzdo.mongodb.net/<dbname>?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("DB Connected!");
});
