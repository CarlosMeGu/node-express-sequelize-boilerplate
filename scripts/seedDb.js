const { General, ProductInventory, Transaction } = require('../src/database/model');

async function seed() {
  // create tables
  await ProductInventory.sync({ force: true });
  await Transaction.sync({ force: true });
  await General.sync({ force: true });

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
        productAmount: 13,
        totalCost: 39,
        type: 'RECEIVE',
      },
    ),
    Transaction.create(
      {
        productId: 1,
        cost: 5,
        productAmount: 3,
        totalCost: 15,
        type: 'SELL',
      },
    ),
    Transaction.create(
      {
        productId: 3,
        cost: 5,
        productAmount: 27,
        totalCost: 135,
        type: 'RECEIVE',
      },
    ),
    Transaction.create(
      {
        productId: 3,
        cost: 10,
        productAmount: 12,
        totalCost: 120,
        type: 'SELL',
      },
    ),
    General.create(
      {
        balance: 100,
      },
    ),
  ]);
}

try {
  seed();
} catch (err) {
  console.log('Error while seeding database: ', err);
}
