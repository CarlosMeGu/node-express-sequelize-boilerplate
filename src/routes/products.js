const {
  getById,
  getAll, sellById, buyById, createProduct,
} = require('../database/repositories/productInventory');
const { RESPONSES } = require('../utils/httpResponses');

const getProductById = async (req, res) => {
  const { id: productId } = req.params;

  const product = await getById({ productId });

  if (!product) return res.status(RESPONSES.NOT_FOUND_ERR.STATUS).end();

  return res.json(product);
};

const getAllProducts = async (req, res) => {
  const products = await getAll();

  if (!products) return res.status(RESPONSES.NOT_FOUND_ERR.STATUS).end();

  return res.json(products);
};

const sellProduct = async (req, res) => {
  const { id: productId, amount, price } = req.body;

  const product = await getById({ productId });
  if (!product) return res.status(RESPONSES.NOT_FOUND_ERR.STATUS).end();

  const result = await sellById({ productId, amount, price });
  return res.json(result);
};

const buyProduct = async (req, res) => {
  const {
    id: productId, amount, price, name,
  } = req.body;
  let product;
  if (productId) { product = await getById({ productId }); }
  if (!product) {
    if (!name) {
      res.status(RESPONSES.NOT_FOUND_ERR.STATUS);
      return res.json({
        error: {
          description: 'Product not found, add the name to create it. Not sure? Check all the products with GET /productInventory',
        },
        status: RESPONSES.NOT_FOUND_ERR.STATUS,
      }).end();
    }
    product = await createProduct({ name });
  }
  const result = await buyById({ productId: product.id, amount, price });
  return res.json(result);
};

module.exports = {
  buyProduct,
  getProductById,
  getAllProducts,
  sellProduct,
};
