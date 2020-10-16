const axios = require("axios");

const User = require("../Models/User");
const channel_id = process.env.LINE_CHANNEL_ID;

const UserVerify = async (access_token) => {
  let resData = "";
  await axios
    .get(
      `https://api.line.me/oauth2/v2.1/verify?access_token=${access_token}`,
      { json: true }
    )
    .then((res) => {
      console.log(res.data);
      resData = res.data;
    });
  return resData === channel_id;
};
const GetUserID = async (access_token) => {
  let user = "";
  await axios({
    method: "get",
    url: "https://api.line.me/v2/profile",
    headers: { Authorization: `Bearer ${access_token}` },
    json: true,
  }).then((res) => {
    console.log(res.data);
    user = res.data;
  });
  return user.userId;
};

const Auth = async (req, res, next) => {
  let userID = "";
  console.log("Token " + req.body.access_token);
  await UserVerify(req.body.access_token);
  userID = await GetUserID(req.body.access_token);
  let user = await User.findOne({
    userID: userID,
  });

  if (!user) {
    const newUser = new User({ userID: user.userId });
    await newUser.save();
    user = newUser;
  }
  req.user = user;
  next();
};

module.exports = Auth;
