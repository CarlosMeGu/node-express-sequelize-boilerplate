const { ProductInventory, Transaction } = require('../src/database/model');

async function seed() {
  // create tables
  await ProductInventory.sync({ force: true });
  await Transaction.sync({ force: true });

  await Promise.all([

    ProductInventory.create(
      {
        id: 1,
        name: 'Cereal box',
        stock: 10,
      },
    ), ProductInventory.create(
      {
        id: 2,
        name: 'Milk carton',
        stock: 20,
      },
    ), ProductInventory.create(
      {
        id: 3,
        name: 'Bread loaf',
        stock: 15,
      },
    ), ProductInventory.create(
      {
        id: 4,
        name: 'Eggs carton',
        stock: 30,
      },
    ),
    Transaction.create(
      {
        productId: 1,
        cost: 3,
        quantity: 13,
        type: 'RECEIVE',
      },
    ),
    Transaction.create(
      {
        productId: 1,
        cost: 5,
        quantity: 3,
        type: 'SELL',
      },
    ),
    Transaction.create(
      {
        productId: 3,
        cost: 5,
        quantity: 27,
        type: 'RECEIVE',
      },
    ),
    Transaction.create(
      {
        productId: 3,
        cost: 10,
        quantity: 12,
        type: 'SELL',
      },
    ),

  ]);
}

try {
  seed();
} catch (err) {
  console.log('Error while seeding database: ', err);
}
