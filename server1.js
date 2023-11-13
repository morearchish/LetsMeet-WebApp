const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
const port = 3001; 

const apiProxy = createProxyMiddleware({
    target: 'https://elitefit4you.com', 
    changeOrigin: true, 
    pathRewrite: {
        '^/api': '', 
    },
});


app.use(cors());


app.use('/api', apiProxy);

app.listen(port, () => {
    console.log(`Proxy server is running on http://localhost:${port}`);
});
