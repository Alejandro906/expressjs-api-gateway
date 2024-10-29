const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/register',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('username').notEmpty(),
    body('firstName').notEmpty(),
    body('lastName').notEmpty()
  ],
  userController.register
);

router.post('/login',
  [
    body('email').isEmail(),
    body('password').notEmpty()
  ],
  userController.login
);

router.get('/profile', auth, userController.getProfile);
router.put('/profile', auth, userController.updateProfile);

router.get('/addresses', auth, userController.getAddresses);
router.post('/addresses',
  auth,
  [
    body('street').notEmpty(),
    body('city').notEmpty(),
    body('state').notEmpty(),
    body('country').notEmpty(),
    body('zipCode').notEmpty()
  ],
  userController.addAddress
);

router.put('/addresses/:addressId', auth, userController.updateAddress);
router.delete('/addresses/:addressId', auth, userController.deleteAddress);

module.exports = router;