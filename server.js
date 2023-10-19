require('dotenv').config()
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json());

const posts = [
  {
    username: "Kyle",
    title: "Post 1",
  },
  {
    username: "Jim",
    title: "Post 2"
  }
];

app.get('/posts/', authenticateToken, (req, res) => {
  console.log(req.user.name);
  res.json(posts.filter(post => post.username === req.user.name));
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(req.body)

  const user = {
    name: username,
    password: password
  };

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken: accessToken });
});


function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  console.log('Authorization header:', authHeader);

  const token = authHeader && authHeader.split(' ')[1];
  console.log('Extracted token:', token);

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.error('Error during token verification:', err);
      return res.sendStatus(403);
    }

    console.log('Verified user:', user);
    req.user = user;
    next();
  });
}


// app.get("/check", (req, res) => { 
//   res.json(posts);
// });

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
