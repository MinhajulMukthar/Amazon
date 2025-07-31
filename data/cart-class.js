class Cart {
  //Properties
  // cartItem = undefined;
  // cartkey = undefined;
  // ShortHand for writing above expression code
  cartItem;
  #cartkey;

  //Creating a constructor
  constructor(cartkey) {
    this.#cartkey = cartkey
    this.loadFromStorage();
  }

  // Method
  loadFromStorage() {
    this.cartItem = JSON.parse(localStorage.getItem(this.#cartkey));
    if (!this.cartItem) {
      this.cartItem = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
      }];
    }
  }

  saveToStorage() {
    localStorage.setItem(this.#cartkey, JSON.stringify(cart));
  }

  addToCart(productId) {
    let matchingItem;

    this.cartItem.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      this.cartItem.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: '1'
      });
    }

    this.saveToStorage();
  }

  removeFromCart(productId) {
    const newCart = [];

    this.cartItem.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });

    this.cartItem = newCart;

    this.saveToStorage();
  }


  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    this.cartItem.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    this.saveToStorage();
  }

}


// const cart = Cart('cart-oop');
// const busniessCart = Cart('cart-business');
const cart = new Cart('cart-oop');
const busniessCart = new Cart('cart-business');

// No use of intilaizig code here we can use constrcutor here 
// cart.cartkey = 'cart-oop';
// busniessCart.cartkey = 'cart-business';

// Instead of loading this setup code here we can use constructor
// cart.loadFromStorage();
// busniessCart.loadFromStorage();


// cart.addToCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');

console.log(cart.#cartkey);
console.log(cart);
console.log(busniessCart);
