const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');

router.post('/',
  auth,
  [
    body('shippingAddress').notEmpty(),
    body('paymentMethod').notEmpty()
  ],
  orderController.createOrder
);

router.get('/', auth, orderController.listOrders);
router.get('/:orderId', auth, orderController.getOrder);
router.post('/:orderId/cancel', auth, orderController.cancelOrder);

module.exports = router;