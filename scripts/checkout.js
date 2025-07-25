import { cart, removeFromCart } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions } from '../data/deliveryOption.js';


let summaryCartHTML = '';

let todayDate = dayjs();
let deliveryDate = todayDate.add(7, 'days');
console.log(deliveryDate.format('dddd, MMMM D YYYY '));

cart.forEach((cartItem) => {
  // Looping through cart to generate cart page details
  const productId = cartItem.productId;
  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  const deliveryOptionId = cartItem.deliveryOptionId;
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  })

  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');

  const dateString = deliveryDate.format('dddd, MMMM D');


  summaryCartHTML += `
   <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">Delivery date: ${dateString}</div>

      <div class="cart-item-details-grid">
        <img
          class="product-image"
          src="${matchingProduct.image}"
        />

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">$${formatCurrency(matchingProduct.priceCents)}</div>
          <div class="product-quantity">
            <span> Quantity: <span class="quantity-label">${cartItem.quantity}</span> </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link"  data-product-id ="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option
          </div>
          ${deliveryOptionsHTML(matchingProduct, cartItem)}
        </div>
      </div>
    </div>
  `;
});

function deliveryOptionsHTML(matchingProduct, cartItem) {
  let html = ''
  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');

    const dateString = deliveryDate.format('dddd, MMMM D');

    const priceString = deliveryOption.priceCent === 0
      ? 'FREE'
      : `$${formatCurrency(deliveryOption.priceCent)} -`;

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    html += `
      <div class="delivery-options">
          <div class="delivery-option">
            <input
              type="radio"
              ${isChecked ? 'checked' : ''}
              class="delivery-option-input" 
              name="${matchingProduct.id}" // All six radio share the same name.
            />
            <div>
              <div class="delivery-option-date">${dateString}</div>
              <div class="delivery-option-price">${priceString} Shipping</div>
            </div>
          </div>
      </div>
    `
  })
  return html;
}

document.querySelector('.js-order-summary').innerHTML = summaryCartHTML;

document.querySelectorAll('.js-delete-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    removeFromCart(productId)

    document.querySelector(`.js-cart-item-container-${productId}`).remove();
    updateCartQuantity();

  });

  function updateCartQuantity() {
    let cartQuantity = 0;
    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });

    document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} items`;
  }

  updateCartQuantity()

});