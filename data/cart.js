export const cart = [];

export function addToCart(productId) {
  let alreadyExist;
  cart.forEach((item) => {
    if (productId === item.productId) {
      alreadyExist = item;
    }
  });

  if (alreadyExist) {
    alreadyExist.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
    });
  }
}