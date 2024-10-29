const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Rate limiter configuration
const limiter = rateLimit({
  windowMs: 1000, // 1 second
  max: 1, // 1 request per second
  skipSuccessfulRequests: false,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      error: 'Too many requests, please try again after 5 minutes'
    });
  }
});

app.use(limiter);

// Service routes configuration
const routes = {
  '/api/products': 'http://localhost:3001',
  '/api/categories': 'http://localhost:3002',
  '/api/users': 'http://localhost:3003',
  '/api/cart': 'http://localhost:3004',
  '/api/orders': 'http://localhost:3005',
  '/api/reviews': 'http://localhost:3006',
  '/api/search': 'http://localhost:3007',
  '/api/pets': 'http://localhost:3008'
};

// Setup proxy middleware
Object.entries(routes).forEach(([path, target]) => {
  app.use(path, createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      [`^${path}`]: ''
    }
  }));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});