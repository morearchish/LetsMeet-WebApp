require('dotenv').config()
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');

app.use(bodyParser.json(), cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

const posts = [
  {
    username: "Sanjana",
    password: "0092",
    access_token: ""
  },
  {
    username: "Archish",
    password: "0210",
    access_token: ""
  },
  {
    username: "harmanpreet",
    password: "0239",
    access_token: ""
  },
  {
    username: "riya",
    password: "0091",
    access_token: ""
  }
];

app.get('/posts/', authenticateToken, (req, res) => {
  console.log(req.user.name);
  res.json(posts.filter(post => post.username === req.user.name));
});

// app.post('/login', (req, res) => {
//   const username = req.body.username;
//   const password = req.body.password;
//   console.log(req.body)

//   const user = {
//     name: username,
//     password: password
//   };

//   const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
//   res.json({ accessToken: accessToken });
// });


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


app.post("/login", (req, res) => {
  let check = false;
  let userIndex = -1;
  const { username, password} = req.body;

  for (let i = 0; i < posts.length; i++) {
    if (posts[i].username === username && posts[i].password === password) {
      userIndex = i;
      check = true;
      break;
    }
  }

  if (check) {
    const user = {
      username: username,
      password: password
    };

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

    posts[userIndex].access_token = accessToken;

    res.json(posts[userIndex]);
  } else {
    res.json(null);
  }
});



app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
