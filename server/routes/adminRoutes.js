const express = require('express');

const router = express.Router();
const filtersController = require('../controllers/filtersController');
const productsController = require('../controllers/productsController');

// products
router.route('/products').post(productsController.createProduct);

router
  .route('/products/:id?')
  .get(productsController.getProducts)
  .patch(productsController.patchProduct)
  .delete(productsController.deleteProduct);


// filters
router
  .route('/filters')
  .get(filtersController.loadFilters)
  .post(filtersController.createFilter);

router
  .route('/filters/:id?')
  .patch(filtersController.updateFilter)
  .delete(filtersController.deleteFilter);



module.exports = router;
