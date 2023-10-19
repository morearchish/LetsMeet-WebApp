require('dotenv').config()
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json());

// app.get('/posts/', generateAccessToken, (req, res) => {
//   console.log(req.user.name);
//   res.json(posts.filter(post => post.username === req.user.name));
// });

let refreshTokens = []

app.post('/token', (req, res) => {
  const refreshToken = req.body.token
  if(refreshToken == null) return res.sendStatus(401)
  if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken({name: user.name})
    res.json({ accessToken: accessToken})
  })
})

app.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(204)
})

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(req.body)

  const user = {
    name: username,
    password: password
  };

  const accessToken = generateAccessToken(user)
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
  refreshTokens.push(refreshToken)
  res.json({ accessToken: accessToken, refreshToken: refreshToken })
})

function generateAccessToken(user){
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' })
}


// app.get("/check", (req, res) => { 
//   res.json(posts);
// });

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
