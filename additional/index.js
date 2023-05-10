const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

let user = {
  id: "someid123456",
  email: "johndoe@gmail.com",
  password: "hashed-password",
};

const JWT_SECRET = "some_secret";

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/forgot-password", (req, res, next) => {
  res.render("forgot-password");
});

app.post("/forgot-password", (req, res, next) => {
  const { email } = req.body;

  if (user.email !== email) {
    res.send("User not registered");
    return;
  }

  const secret = JWT_SECRET + user.password;
  const payload = {
    email: user.email,
    id: user.id,
  };

  const token = jwt.sign(payload, secret, { expiresIn: "15m" });

  const link = `http://localhost:3000/reset-password/${user.id}/${token}`;
  console.log(link);
  res.send("Password reset link has been set to your email... ");
});

app.get("/reset-password/:id/:token", (req, res, next) => {
  const { id, token } = req.params;

  if (id !== user.id) {
    res.send("Invalid id");
    return;
  }

  const secret = JWT_SECRET + user.password;

  try {
    const payload = jwt.verify(token, secret);
    res.render("reset-password", { email: user.email });
  } catch (err) {
    res.send(err.message);
  }

  res.send(req.params);
});

app.post("/reset-password/:id/:token", (req, res, next) => {
  const { id, token } = req.params;
  const { password, password2 } = req.body;

  if (id !== user.id) {
    res.send("Invalid id");
    return;
  }

  const secret = JWT_SECRET + user.password;

  try {
    const payload = jwt.verify(token, secret);
    // if(password === password2)
    user.password = password;
    res.send(user);
    res.render("reset-password", { email: user.email });
  } catch (err) {
    res.send(err.message);
  }
});

app.listen(10000, () => console.log("Server started on port 10000"));
