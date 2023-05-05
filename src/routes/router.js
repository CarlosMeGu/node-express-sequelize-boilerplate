const { Router } = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const {
  getAllProducts, getProductById, sellProduct, buyProduct,
} = require('./products');
const { getTransactions, getBuyAndSellTransactions, getInventory } = require('./reports');

const router = new Router();

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.get('/productInventory/:id', getProductById);
router.get('/productInventory', getAllProducts);
router.get('/reports/profit', getInventory);
router.put('/productInventory/sell', sellProduct);
router.put('/productInventory/receive', buyProduct);
router.get('/reports', getTransactions);
router.get('/reports/buyAndSell', getBuyAndSellTransactions);

module.exports = router;
