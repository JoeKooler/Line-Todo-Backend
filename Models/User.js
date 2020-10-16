const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userID: {
    type: String,
    required: true,
  },
  todos: [
    {
      todo: {
        content: {
          type: String,
        },
      },
    },
  ],
});
const User = mongoose.model("User", UserSchema);
module.exports = User;
