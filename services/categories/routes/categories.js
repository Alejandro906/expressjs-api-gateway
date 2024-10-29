const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const categoryController = require('../controllers/categoryController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/', categoryController.listCategories);
router.get('/:id', categoryController.getCategory);

router.post('/',
  auth,
  admin,
  [
    body('name').notEmpty().trim(),
    body('description').notEmpty().trim()
  ],
  categoryController.createCategory
);

router.put('/:id',
  auth,
  admin,
  categoryController.updateCategory
);

router.delete('/:id',
  auth,
  admin,
  categoryController.deleteCategory
);

module.exports = router;