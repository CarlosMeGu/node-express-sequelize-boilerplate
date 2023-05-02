const { Router } = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const { getProduct, getAll } = require('./products');

const router = new Router();

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.get('/productInventory/:id', getProduct);
router.get('/productInventory', getAll);
module.exports = router;
