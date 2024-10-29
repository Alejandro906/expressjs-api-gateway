const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const cartController = require('../controllers/cartController');
const auth = require('../middleware/auth');

router.get('/', auth, cartController.getCart);

router.post('/items',
  auth,
  [
    body('productId').notEmpty(),
    body('quantity').isInt({ min: 1 })
  ],
  cartController.addItem
);

router.put('/items/:itemId',
  auth,
  [
    body('quantity').isInt({ min: 1 })
  ],
  cartController.updateItem
);

router.delete('/items/:itemId', auth, cartController.removeItem);
router.delete('/', auth, cartController.clearCart);

module.exports = router;