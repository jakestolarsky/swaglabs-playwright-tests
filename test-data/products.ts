export const products = {
  backpack: {
    title: 'Sauce Labs Backpack',
    price: '$29.99',
  },
  bikeLight: {
    title: 'Sauce Labs Bike Light',
    price: '$9.99',
  },
  boltTShirt: {
    title: 'Sauce Labs Bolt T-Shirt',
    price: '$15.99',
  },
  fleeceJacket: {
    title: 'Sauce Labs Fleece Jacket',
    price: '$49.99',
  },
  onesie: {
    title: 'Sauce Labs Onesie',
    price: '$7.99',
  },
  redTShirt: {
    title: 'Test.allTheThings() T-Shirt (Red)',
    price: '$15.99',
  },
} as const;

export type ProductKey = keyof typeof products;
export type Product = typeof products[ProductKey];