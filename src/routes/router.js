const { Router } = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const {
  getAllProducts, getProductById, sellProduct, buyProduct,
} = require('./products');
const { getTransactions } = require('./transactions');

const router = new Router();

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.get('/productInventory/:id', getProductById);
router.get('/productInventory', getAllProducts);
router.put('/productInventory/sell', sellProduct);
router.put('/productInventory/receive', buyProduct);
router.get('/reports', getTransactions);

module.exports = router;
