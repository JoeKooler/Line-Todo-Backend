const axios = require("axios");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
require("./DB");

const channel_id = process.env.LINE_CHANNEL_ID;
console.log("Hi" + process.env.HI);

app.post("/check", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.post("/", async (req, res) => {
  let eiei = "";
  console.log("eiei");
  await axios
    .get(
      `https://api.line.me/oauth2/v2.1/verify?access_token=${req.body.access_token}`,
      { json: true }
    )
    .then((res) => {
      console.log(res);
      eiei = res.data;
    });

  res.send(eiei.client_id + " & " + channel_id);
});

app.get("/profile", async (req, res) => {
  axios({
    method: "get",
    url: "https://api.line.me/v2/profile",
    headers: { Authorization: `Bearer ${access_token}` },
    json: true,
  }).then((res) => console.log(res.data));
  res.send("eiei");
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
