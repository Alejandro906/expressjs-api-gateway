const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// GET /api/products
router.get('/', productController.listProducts);

// GET /api/products/:id
router.get('/:id', productController.getProduct);

// POST /api/products (admin only)
router.post('/',
  auth,
  admin,
  [
    body('name').notEmpty(),
    body('price').isNumeric(),
    body('description').notEmpty(),
    body('stock').isInt({ min: 0 })
  ],
  productController.createProduct
);

// PUT /api/products/:id (admin only)
router.put('/:id',
  auth,
  admin,
  productController.updateProduct
);

// DELETE /api/products/:id (admin only)
router.delete('/:id',
  auth,
  admin,
  productController.deleteProduct
);

module.exports = router;